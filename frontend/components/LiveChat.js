"use client";

import { useState, useEffect, useRef } from 'react';

const LiveChat = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Sarah from ShopHub support. How can I help you today?",
      sender: 'support',
      timestamp: new Date(),
      avatar: '👩‍💼'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "Track my order",
    "Return policy",
    "Shipping info",
    "Product question"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text = newMessage) => {
    if (!text.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      avatar: '👤'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const responses = {
        "Track my order": "I can help you track your order! Please provide your order number and I'll look it up for you.",
        "Return policy": "We offer a 30-day hassle-free return policy. Items must be in original condition. Would you like me to start a return for you?",
        "Shipping info": "We offer free shipping on orders over $50. Standard delivery takes 3-5 business days, express delivery 1-2 days.",
        "Product question": "I'd be happy to help with any product questions! Which product are you interested in?"
      };

      const supportMessage = {
        id: messages.length + 2,
        text: responses[text] || "Thanks for your message! Let me help you with that. Can you provide more details?",
        sender: 'support',
        timestamp: new Date(),
        avatar: '👩‍💼'
      };

      setIsTyping(false);
      setMessages(prev => [...prev, supportMessage]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg z-50 transition-all duration-300 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'btn-primary'
        } text-white flex items-center justify-center`}
      >
        {isOpen ? '✕' : '💬'}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 w-96 h-[500px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span>👩‍💼</span>
              </div>
              <div>
                <h3 className="font-semibold">ShopHub Support</h3>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`} />
                  {isOnline ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-1 hover:bg-white/20 rounded-full transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                <span className="text-sm">{message.avatar}</span>
              </div>
              <div className={`max-w-[70%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-md'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white rounded-bl-md'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <span className="text-sm">👩‍💼</span>
              </div>
              <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSendMessage(reply)}
                className="px-3 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-indigo-100 dark:hover:bg-slate-600 transition"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t dark:border-slate-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-200 dark:border-slate-600 rounded-xl dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!newMessage.trim()}
              className="p-3 btn-primary text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-sm">📤</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveChat;