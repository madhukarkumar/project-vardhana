import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Package, Building2, Users2, LineChart, ArrowRight, Plus, X, Send, Bot, MessageSquare, Search, Upload } from 'lucide-react';
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
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [addType, setAddType] = useState<'file' | 'url'>('file');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setNewMessage('');
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAdd = async () => {
    if (!selectedCategory) return;
    if (addType === 'file' && !selectedFile) return;
    if (addType === 'url' && !url.trim()) return;
    
    if (addType === 'file') {
      // TODO: Implement file upload logic here
      console.log('Uploading file:', selectedFile, 'for category:', selectedCategory);
    } else {
      // TODO: Implement URL addition logic here
      console.log('Adding URL:', url, 'for category:', selectedCategory);
    }
    
    // Reset and close modal after upload
    setSelectedFile(null);
    setUrl('');
    setSelectedCategory('');
    setIsUploadModalOpen(false);
  };

  const resetModal = () => {
    setSelectedFile(null);
    setUrl('');
    setAddType('file');
    setSelectedCategory('');
    setIsUploadModalOpen(false);
  };

  return (
    <div className="relative">
      <div className={`transition-all duration-300 ${isChatOpen ? 'mr-96' : 'mr-0'}`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Knowledge Base</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Manage and explore your organization's knowledge</p>
          </div>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
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

      {/* Add Knowledge Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={resetModal} />
            
            <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  className="rounded-md text-gray-400 hover:text-gray-500"
                  onClick={resetModal}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white mb-4">
                    Add Knowledge
                  </h3>

                  {/* Category Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Category
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {cards.map((card) => (
                        <button
                          key={card.title}
                          onClick={() => setSelectedCategory(card.title)}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${
                            selectedCategory === card.title
                              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                          }`}
                        >
                          <div className={`rounded-lg ${card.color} p-2`}>
                            <card.icon className="h-5 w-5" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {card.title}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedCategory && (
                    <>
                      <div className="flex gap-4 mb-6">
                        <button
                          onClick={() => setAddType('file')}
                          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                            addType === 'file'
                              ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          Upload File
                        </button>
                        <button
                          onClick={() => setAddType('url')}
                          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                            addType === 'url'
                              ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          Add URL
                        </button>
                      </div>
                      
                      {addType === 'file' ? (
                        <div
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                          className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700 px-6 py-10 ${
                            dragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : ''
                          }`}
                        >
                          <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={handleFileSelect}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            {selectedFile && (
                              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Selected: {selectedFile.name}
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <input
                            type="url"
                            placeholder="Enter URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleAdd}
                      disabled={!selectedCategory || (addType === 'file' && !selectedFile) || (addType === 'url' && !url.trim())}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 sm:mt-0 sm:w-auto"
                      onClick={resetModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}