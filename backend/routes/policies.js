const express = require('express');
const router = express.Router();
const { createPolicy, getPolicies } = require('../controllers/policyController');
const auth = require('../middleware/authMiddleware');

// @route   POST api/policies
// @desc    Create a new policy from a quote
// @access  Private
router.post('/', auth, createPolicy);

// @route   GET api/policies
// @desc    Get all policies for a user
// @access  Private
router.get('/', auth, getPolicies);

module.exports = router;
