import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Bot, MessageSquare, FileText, Link as LinkIcon, ArrowUpRight, X, Send } from 'lucide-react';

const messages = [
  { role: 'assistant', content: "Welcome! How can I help you with the product documentation?" },
  { role: 'user', content: 'Can you explain the technical architecture?' },
  { role: 'assistant', content: 'The system uses a microservices architecture with the following key components...' }
];

const cards = [
  {
    id: 1,
    title: 'How To Build Better Conversational Apps with Next.js',
    type: 'article',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2940',
    span: 'col-span-2'
  },
  {
    id: 2,
    title: 'Product Roadmap Q1 2024',
    type: 'document',
    description: 'Upcoming features and improvements planned for the first quarter',
    span: 'col-span-1'
  },
  {
    id: 3,
    title: 'Technical Architecture',
    type: 'diagram',
    description: 'System architecture and component interactions',
    span: 'col-span-1'
  },
  {
    id: 4,
    title: 'API Documentation',
    type: 'api',
    description: 'Complete API reference with examples and use cases',
    span: 'col-span-1'
  },
  {
    id: 5,
    title: 'Integration Guide',
    type: 'guide',
    description: 'Step-by-step instructions for third-party integrations',
    span: 'col-span-2'
  },
  {
    id: 6,
    title: 'Product Demo',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2940',
    span: 'col-span-3'
  }
];

const getCardIcon = (type: string) => {
  switch (type) {
    case 'article':
      return FileText;
    case 'api':
      return LinkIcon;
    default:
      return Bot;
  }
};

export function KnowledgeDetail() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setNewMessage('');
  };

  return (
    <div className="relative">
      <div className={`transition-all duration-300 ${isChatOpen ? 'mr-96' : 'mr-0'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/knowledge" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Product Documentation</h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Everything you need to know about our product</p>
            </div>
          </div>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            Ask AI
          </button>
        </div>

        <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="h-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = getCardIcon(card.type);
            return (
              <div
                key={card.id}
                className={`${card.span} group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 overflow-hidden transition-all hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600`}
              >
                {card.image ? (
                  <div className="relative h-[200px] w-full">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <div>
                        <div className="flex items-center gap-2 text-white/80 mb-2">
                          <Icon className="h-4 w-4" />
                          <span className="text-sm">{card.type}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all">
                          <ArrowUpRight className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                        <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                        <ArrowUpRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {card.title}
                    </h3>
                    {card.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Toggle Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed right-6 bottom-6 p-4 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 transition-colors"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Chat Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ${
          isChatOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900">
                <Bot className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Documentation Assistant</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered help</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask about the documentation..."
                className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}