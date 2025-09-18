import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ topic }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Greet the user with the selected topic
    setMessages([
      { text: `Great! Let's get you a ${topic}. To start, what is your full name?`, sender: 'ai' },
    ]);
  }, [topic]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput('');

      try {
        const history = newMessages.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text }));
        const res = await axios.post('http://localhost:5000/api/chat', { message: input, history });
        const aiMessage = { text: res.data.reply, sender: 'ai' };
        setMessages([...newMessages, aiMessage]);
      } catch (err) {
        console.error('Error sending message:', err);
        const errorMessage = { text: 'Sorry, I am having trouble connecting. Please try again later.', sender: 'ai' };
        setMessages([...newMessages, errorMessage]);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`p-3 rounded-xl ${msg.sender === 'user' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 bg-white/10 border-t border-white/20 rounded-b-2xl">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="w-full rounded-full py-3 px-5 pr-16 bg-white/50 border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm placeholder-gray-600"
            placeholder="Type your message..."
          />
          <button 
            onClick={handleSend} 
            className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-gray-500 hover:text-teal-600 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.524l4.949-1.414a.75.75 0 00-.524-.95L3.105 2.289zM3.105 2.289c.106-.03.223-.03.33-.002l14.25 4.25a.75.75 0 010 1.328l-14.25 4.25a.75.75 0 01-.956-.956l1.414-4.949a.75.75 0 01.524-.524l4.949-1.414a.75.75 0 00-.95-.95l-4.95 1.414a.75.75 0 01-.524.524L2.15 17.05a.75.75 0 00.956.956l14.25-4.25a.75.75 0 000-1.328L3.105 2.289z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
