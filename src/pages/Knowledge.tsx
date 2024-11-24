import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Building2, Users2, LineChart, ArrowRight, Plus, X, Send, Bot, MessageSquare, Search } from 'lucide-react';
import { Card } from '../components/ui/Card';

const cards = [
  {
    title: 'Product',
    description: 'Product information, features, and technical specifications',
    icon: Package,
    stats: { total: '156 entries', updated: 'Updated 2h ago' },
    color: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    span: 'col-span-2',
    link: '/dashboard/knowledge/product'
  },
  {
    title: 'Companies',
    description: 'Customer and competitor company profiles',
    icon: Building2,
    stats: { total: '2,847 profiles', updated: 'Updated 4h ago' },
    color: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
    span: 'col-span-1'
  },
  {
    title: 'People',
    description: 'Contact information and interaction history',
    icon: Users2,
    stats: { total: '12,847 contacts', updated: 'Updated 1h ago' },
    color: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    span: 'col-span-1'
  },
  {
    title: 'Opportunities',
    description: 'Sales opportunities and pipeline data',
    icon: LineChart,
    stats: { total: '847 active', updated: 'Updated 30m ago' },
    color: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    span: 'col-span-2'
  }
];

const messages = [
  { role: 'assistant', content: "Welcome! How can I help you with the knowledge base?" },
  { role: 'user', content: 'Can you explain the technical architecture?' },
  { role: 'assistant', content: 'The system uses a microservices architecture with the following key components...' }
];

export function Knowledge() {
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
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Knowledge Base</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Manage and explore your organization's knowledge</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500 transition-colors">
            <Plus className="h-5 w-5" />
            Add Knowledge
          </button>
        </div>

        <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="h-10 w-full rounded-lg border border-border-card-light dark:border-border-card-dark bg-white dark:bg-background-card-dark pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.link || '#'}
              className={`${card.span} group`}
            >
              <Card className="h-full transition-all hover:border-primary-300 dark:hover:border-primary-600">
                <Card.Body>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`rounded-lg ${card.color} p-3`}>
                      <card.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{card.stats.total}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{card.stats.updated}</p>
                    </div>
                    <div className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                      <ArrowRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Chat Toggle Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed right-6 bottom-6 p-4 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-500 transition-colors"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Chat Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen w-96 bg-background-card-light dark:bg-background-card-dark border-l border-border-card-light dark:border-border-card-dark transform transition-transform duration-300 ${
          isChatOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border-card-light dark:border-border-card-dark">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                <Bot className="h-5 w-5 text-primary-600 dark:text-primary-400" />
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
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border-card-light dark:border-border-card-dark">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask about the documentation..."
                className="flex-1 rounded-lg border border-border-card-light dark:border-border-card-dark bg-white dark:bg-background-card-dark px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-primary-600 text-white hover:bg-primary-500 transition-colors"
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