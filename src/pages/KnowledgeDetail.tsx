import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Bot, MessageSquare, FileText, Link as LinkIcon, ArrowUpRight, X, Send, Upload, Plus } from 'lucide-react';

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
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [addType, setAddType] = useState<'file' | 'url'>('file');

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
    if (addType === 'file' && !selectedFile) return;
    if (addType === 'url' && !url.trim()) return;
    
    if (addType === 'file') {
      // TODO: Implement file upload logic here
      console.log('Uploading file:', selectedFile);
    } else {
      // TODO: Implement URL addition logic here
      console.log('Adding URL:', url);
    }
    
    // Reset and close modal after upload
    setSelectedFile(null);
    setUrl('');
    setIsUploadModalOpen(false);
  };

  const resetModal = () => {
    setSelectedFile(null);
    setUrl('');
    setAddType('file');
    setIsUploadModalOpen(false);
  };

  return (
    <div className="relative">
      <div className={`transition-all duration-300 ${isChatOpen ? 'mr-96' : 'mr-0'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/knowledge" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Product Documentation</h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Everything you need to know about our product</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Knowledge
            </button>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              Ask AI
            </button>
          </div>
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
                  
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleAdd}
                      disabled={(addType === 'file' && !selectedFile) || (addType === 'url' && !url.trim())}
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