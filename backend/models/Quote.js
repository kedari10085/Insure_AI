const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  insuranceType: {
    type: String,
    enum: ['auto', 'property', 'vpp', 'umbrella'],
    required: true,
  },
  quoteDetails: {
    type: Map,
    of: String,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'bound', 'expired'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Quote', QuoteSchema);
