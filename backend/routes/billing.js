const express = require('express');
const router = express.Router();
const { createCheckoutSession, stripeWebhook } = require('../controllers/billingController');
const auth = require('../middleware/authMiddleware');

// @route   POST api/billing/create-checkout-session
// @desc    Create a Stripe checkout session
// @access  Private
router.post('/create-checkout-session', auth, createCheckoutSession);

// @route   POST api/billing/webhook
// @desc    Stripe webhook handler
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;
