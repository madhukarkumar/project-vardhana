import React, { useState, useCallback, useEffect } from 'react';
import { Package, Building2, Users2, LineChart, ArrowRight, Plus, X, Send, Bot, MessageSquare, Search, Upload } from 'lucide-react';
import { Card } from '../components/ui/Card';
import ReactMarkdown from 'react-markdown';

const cards = [
  {
    title: 'Product',
    description: 'Product information, features, and technical specifications',
    icon: Package,
    stats: { total: '156 entries', updated: 'Updated 2h ago' },
    color: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    span: 'col-span-2'
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

interface Message {
  role: 'user' | 'assistant';
  content: string;
  metadata?: {
    source?: string;
    confidence?: string;
  };
}

// Webhook URL for file uploads
const FILE_UPLOAD_WEBHOOK_URL = 'https://madhukar.app.n8n.cloud/webhook/44dc1d91-4557-415c-a167-9599f4feb78a';

export function Knowledge() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [newMessage, setNewMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [
      { role: 'assistant', content: "Welcome! How can I help you with the knowledge base?" }
    ];
  });

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [addType, setAddType] = useState<'file' | 'url'>('file');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Load session ID from localStorage if exists
  useEffect(() => {
    const savedSessionId = localStorage.getItem('chatSessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
    }
  }, []);

  // Generate new session ID when chat is opened and no session exists
  useEffect(() => {
    if (!sessionId) {
      const newSessionId = crypto.randomUUID();
      setSessionId(newSessionId);
      localStorage.setItem('chatSessionId', newSessionId);
    }
  }, [sessionId]);

  const simulateStreaming = (text: string) => {
    setIsStreaming(true);
    const words = text.split(' ');
    let currentIndex = 0;

    const streamInterval = setInterval(() => {
      if (currentIndex < words.length) {
        setStreamingMessage(prev => prev + (currentIndex === 0 ? '' : ' ') + words[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        setIsStreaming(false);
      }
    }, 50);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message to chat
    const userMessage: Message = { role: 'user', content: newMessage };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsProcessing(true);
    setStreamingMessage('');

    try {
      const payload = { 
        chatInput: newMessage,
        sessionId: sessionId
      };
      console.log('Sending request to webhook:', {
        url: 'https://madhukar.app.n8n.cloud/webhook/a3e23432-a46d-4de8-a271-709108bc43f0/chat',
        payload
      });

      const response = await fetch('https://madhukar.app.n8n.cloud/webhook/a3e23432-a46d-4de8-a271-709108bc43f0/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Webhook response status:', response.status);

      if (!response.ok) {
        throw new Error(`Failed to get response from chatbot: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Webhook response data:', data);
      
      // Format the response content
      let content = '';
      if (data.output) {
        const parts = [];
        if (data.source) parts.push(`**Source:** ${data.source}`);
        if (data.output) parts.push(`**Answer:** ${data.output}`);
        if (data.confidence) parts.push(`**Confidence:** ${data.confidence}`);
        content = parts.join('\n\n');
      } else {
        content = 'Sorry, I could not process your request.';
      }

      // Create assistant message object
      const assistantMessage: Message = {
        role: 'assistant',
        content,
        metadata: {
          source: data.source,
          confidence: data.confidence
        }
      };

      // Start streaming only after we have the full response
      simulateStreaming(content);
      
      // Add message to chat history after streaming completes
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMessage]);
      }, (content.split(' ').length * 50) + 100); // Wait for streaming to complete
      
    } catch (error) {
      console.error('Error in handleSendMessage:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      const errorMessage: Message = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error while processing your message.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
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
    
    if (addType === 'file' && selectedFile) {
      setIsUploading(true);
      setUploadError(null);
      
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch(FILE_UPLOAD_WEBHOOK_URL, {
          method: 'POST',
          body: formData,
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Upload failed:', {
            status: response.status,
            statusText: response.statusText
          });
          throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }

        try {
          const data = await response.json();
          console.log('Upload response:', data);
        } catch (e) {
          console.log('Upload successful but response is not JSON');
        }

        // Reset and close modal after successful upload
        resetModal();
        alert('File uploaded successfully!');
      } catch (error) {
        console.error('Upload error:', error);
        let errorMessage = 'Failed to upload file';
        
        if (error instanceof Error) {
          if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
          } else {
            errorMessage = error.message;
          }
        }
        
        setUploadError(errorMessage);
      } finally {
        setIsUploading(false);
      }
    } else if (addType === 'url') {
      // TODO: Implement URL addition logic here
      console.log('Adding URL:', url);
    }
  };

  const resetModal = () => {
    setSelectedFile(null);
    setUrl('');
    setAddType('file');
    setIsUploadModalOpen(false);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleClearChat = () => {
    setMessages([
      { role: 'assistant', content: "Welcome! How can I help you with the knowledge base?" }
    ]);
    localStorage.removeItem('chatMessages');
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
              placeholder="Search Knowledge base..."
              className="h-10 w-full rounded-lg border border-border-card-light dark:border-border-card-dark bg-white dark:bg-background-card-dark pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
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
            </div>
          ))}
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
                <h3 className="font-semibold text-gray-900 dark:text-white">Knowledge Agent</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Chat with your knowledge base</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearChat}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                title="Clear chat history"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
              <button
                onClick={handleCloseChat}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
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
                  <ReactMarkdown className="text-sm prose dark:prose-invert max-w-none">
                    {message.content}
                  </ReactMarkdown>
                  {message.metadata?.confidence && (
                    <div className={`mt-2 text-xs ${
                      message.role === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      Confidence: {message.metadata.confidence}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            {isStreaming && !isProcessing && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
                  <ReactMarkdown className="text-sm prose dark:prose-invert max-w-none">
                    {streamingMessage}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border-card-light dark:border-border-card-dark">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask about the knowledge base..."
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Knowledge</h2>
              <button onClick={resetModal} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setAddType('file')}
                  className={`flex-1 py-2 px-4 rounded-md ${
                    addType === 'file'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  disabled={isUploading}
                >
                  File
                </button>
                <button
                  onClick={() => setAddType('url')}
                  className={`flex-1 py-2 px-4 rounded-md ${
                    addType === 'url'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  disabled={isUploading}
                >
                  URL
                </button>
              </div>

              {addType === 'file' ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center ${
                    dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="fileInput"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {selectedFile
                        ? selectedFile.name
                        : "Drag and drop or click to select a file"}
                    </span>
                  </label>
                </div>
              ) : (
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter URL"
                  className="w-full p-2 border rounded-md"
                  disabled={isUploading}
                />
              )}

              {uploadError && (
                <div className="text-red-500 text-sm mt-2">{uploadError}</div>
              )}

              <button
                onClick={handleAdd}
                disabled={isUploading || (addType === 'file' ? !selectedFile : !url)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isUploading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </div>
                ) : (
                  'Add'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}