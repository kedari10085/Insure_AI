const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Handle chat messages
exports.sendMessage = async (req, res) => {
  const { message, history } = req.body;

  try {
    // Construct the conversation history for the AI
    const messages = [
      { role: 'system', content: 'You are an intelligent insurance agent for Insure AI. Your goal is to collect information to provide an insurance quote. Be conversational and helpful.' },
      ...history,
      { role: 'user', content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ reply: aiResponse });

  } catch (err) {
    console.error('Error communicating with AI:', err.message);
    res.status(500).send('Error communicating with AI');
  }
};
