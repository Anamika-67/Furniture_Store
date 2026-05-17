const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('../models/Product');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Chat with AI Assistant
// @route   POST /api/chatbot/message
// @access  Private
const chatWithAssistant = async (req, res, next) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      res.status(400);
      throw new Error('Message is required');
    }

    // Optional: Fetch some featured or relevant products to give context to the AI
    // For a real app, you might do a vector search or text search based on the user's message
    const relevantProducts = await Product.find({}).select('name price category description').limit(10);
    
    let productContext = 'Current Store Products (for context):\n';
    relevantProducts.forEach(p => {
      productContext += `- ${p.name} (${p.category}): $${p.price}. ${p.description.substring(0, 50)}...\n`;
    });

    const systemPrompt = `You are an expert AI furniture assistant for the store "FurniQ".
Your job is to help users find furniture, answer questions about products, materials, dimensions, and provide interior design suggestions.
Be polite, helpful, and concise.

Here is some context about our current inventory:
${productContext}

Only recommend products from this store. If they ask for something not in the context, gently explain you can help them find similar items.`;

    // Use Gemini Pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Format history for Gemini
    const formattedHistory = history ? history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    })) : [];

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    // Send the system prompt first if history is empty (a bit of a workaround for Gemini system instructions)
    let finalMessage = message;
    if (!history || history.length === 0) {
      finalMessage = `${systemPrompt}\n\nUser: ${message}`;
    }

    const result = await chat.sendMessage(finalMessage);
    const response = await result.response;
    const text = response.text();

    res.json({
      reply: text,
    });

  } catch (error) {
    console.error('Chatbot Error:', error);
    res.status(500).json({ message: 'Failed to communicate with AI Assistant' });
  }
};

module.exports = {
  chatWithAssistant,
};
