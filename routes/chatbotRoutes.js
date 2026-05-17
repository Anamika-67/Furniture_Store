const express = require('express');
const router = express.Router();
const { chatWithAssistant } = require('../controllers/chatbotController');
const { protect } = require('../middleware/authMiddleware');

// Using protect middleware so only logged-in users can use the chatbot
// Remove 'protect' if you want it to be public
router.post('/message', protect, chatWithAssistant);

module.exports = router;
