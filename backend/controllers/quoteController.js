const Quote = require('../models/Quote');

// A simple pricing engine (will be replaced by AI)
const calculatePrice = (insuranceType, details) => {
  let basePrice = 0;
  switch (insuranceType) {
    case 'auto':
      basePrice = 500;
      break;
    case 'property':
      basePrice = 1000;
      break;
    case 'vpp':
      basePrice = 200;
      break;
    case 'umbrella':
      basePrice = 300;
      break;
    default:
      basePrice = 100;
  }
  // In a real app, we'd use 'details' to adjust the price
  return basePrice + Math.floor(Math.random() * 100);
};

// @desc    Create a new quote
exports.createQuote = async (req, res) => {
  const { insuranceType, quoteDetails } = req.body;

  try {
    const price = calculatePrice(insuranceType, quoteDetails);

    const newQuote = new Quote({
      user: req.user.id,
      insuranceType,
      quoteDetails,
      price,
    });

    const quote = await newQuote.save();
    res.json(quote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all quotes for a user
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
