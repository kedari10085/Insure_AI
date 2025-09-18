const express = require('express');
const router = express.Router();
const { createQuote, getQuotes } = require('../controllers/quoteController');
const auth = require('../middleware/authMiddleware');

// @route   POST api/quotes
// @desc    Create a new quote
// @access  Private
router.post('/', auth, createQuote);

// @route   GET api/quotes
// @desc    Get all quotes for a user
// @access  Private
router.get('/', auth, getQuotes);

module.exports = router;
