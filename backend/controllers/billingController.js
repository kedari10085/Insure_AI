const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Billing = require('../models/Billing');
const User = require('../models/User');
const Policy = require('../models/Policy');

// @desc    Create a Stripe checkout session
exports.createCheckoutSession = async (req, res) => {
  const { policyId, paymentFrequency } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const policy = await Policy.findById(policyId);

    if (!policy || policy.user.toString() !== userId) {
      return res.status(404).json({ msg: 'Policy not found' });
    }

    // Create a Stripe customer if one doesn't exist
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({ email: user.email });
      stripeCustomerId = customer.id;
      user.stripeCustomerId = stripeCustomerId;
      await user.save();
    }

    // Create a product and price for the policy
    const product = await stripe.products.create({ name: `Insurance Policy #${policy.policyNumber}` });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: policy.price * 100, // Price in cents
      currency: 'usd',
      recurring: { interval: paymentFrequency === 'yearly' ? 'year' : 'month' }, // Or 'day'
    });

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: price.id, quantity: 1 }],
      mode: 'subscription',
      customer: stripeCustomerId,
      success_url: `${process.env.FRONTEND_URL}/dashboard?payment_success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard?payment_cancelled=true`,
      metadata: {
        userId,
        policyId,
        paymentFrequency,
      },
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Stripe webhook handler
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { userId, policyId, paymentFrequency } = session.metadata;

    // Create a new billing record
    const newBilling = new Billing({
      user: userId,
      policy: policyId,
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
      paymentFrequency,
    });

    await newBilling.save();
  }

  res.json({ received: true });
};
