const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/chatController');
const auth = require('../middleware/authMiddleware');

// @route   POST api/chat
// @desc    Send a message to the AI
// @access  Private
router.post('/', auth, sendMessage);

module.exports = router;
