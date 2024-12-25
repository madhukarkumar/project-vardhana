import React, { useState, useCallback, useEffect } from 'react';
import { Plus, X, Send, Bot, MessageSquare, Upload } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  metadata?: {
    source?: string;
    confidence?: string;
  };
}

interface GraphNode {
  id: string;
  group: number;
  color: string;
  x?: number;
  y?: number;
}

interface GraphLink {
  source: string;
  target: string;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface GraphDimensions {
  width: number;
  height: number;
}

// For better type safety, we can also create a runtime node type
interface RuntimeGraphNode extends GraphNode {
  x: number;
  y: number;
}

// Define links
const graphLinks: GraphLink[] = [
  { source: 'Knowledge Graph', target: 'Product' },
  { source: 'Knowledge Graph', target: 'Companies' },
  { source: 'Knowledge Graph', target: 'People' },
  { source: 'Knowledge Graph', target: 'Marketing' },
  { source: 'Knowledge Graph', target: 'Development' },
  { source: 'Knowledge Graph', target: 'Sales' },
  { source: 'Product', target: 'Features' },
  { source: 'Product', target: 'Specifications' },
  { source: 'Companies', target: 'Competitors' },
  { source: 'Companies', target: 'Customers' },
  { source: 'People', target: 'Team' },
  { source: 'People', target: 'Contacts' },
  { source: 'Marketing', target: 'Strategies' },
  { source: 'Marketing', target: 'Campaigns' },
  { source: 'Development', target: 'Architecture' },
  { source: 'Development', target: 'Technologies' },
  { source: 'Sales', target: 'Pipeline' },
  { source: 'Sales', target: 'Opportunities' }
];

// Create nodes with colors
const graphNodes: GraphNode[] = [
  { id: 'Knowledge Graph', group: 1, color: '#4f46e5' },
  { id: 'Product', group: 2, color: '#10b981' },
  { id: 'Companies', group: 2, color: '#10b981' },
  { id: 'People', group: 2, color: '#10b981' },
  { id: 'Marketing', group: 2, color: '#10b981' },
  { id: 'Development', group: 2, color: '#10b981' },
  { id: 'Sales', group: 2, color: '#10b981' },
  { id: 'Features', group: 3, color: '#6366f1' },
  { id: 'Specifications', group: 3, color: '#6366f1' },
  { id: 'Competitors', group: 3, color: '#6366f1' },
  { id: 'Customers', group: 3, color: '#6366f1' },
  { id: 'Team', group: 3, color: '#6366f1' },
  { id: 'Contacts', group: 3, color: '#6366f1' },
  { id: 'Strategies', group: 3, color: '#6366f1' },
  { id: 'Campaigns', group: 3, color: '#6366f1' },
  { id: 'Architecture', group: 3, color: '#6366f1' },
  { id: 'Technologies', group: 3, color: '#6366f1' },
  { id: 'Pipeline', group: 3, color: '#6366f1' },
  { id: 'Opportunities', group: 3, color: '#6366f1' }
];

const graphData: GraphData = {
  nodes: graphNodes,
  links: graphLinks
};

// Webhook URL for file uploads
const FILE_UPLOAD_WEBHOOK_URL = 'https://madhukar.app.n8n.cloud/webhook/44dc1d91-4557-415c-a167-9599f4feb78a';

export function Knowledge() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Add delayed opening of chat on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChatOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Graph ref for accessing graph methods
  const [highlightNodes, setHighlightNodes] = useState(new Set<string>());
  const [graphDimensions, setGraphDimensions] = useState<GraphDimensions>({
    width: 0,
    height: 0
  });

  // Update graph dimensions when chat sidebar or window size changes
  useEffect(() => {
    const updateDimensions = () => {
      const containerWidth = window.innerWidth - (isChatOpen ? 384 : 0);
      const containerHeight = window.innerHeight - 200;
      
      setGraphDimensions({
        width: Math.max(containerWidth - 48, 0),
        height: Math.max(containerHeight, 400)
      });
    };

    // Initial update
    updateDimensions();

    // Update on window resize
    window.addEventListener('resize', updateDimensions);
    
    // Update when chat opens/closes
    const timeout = setTimeout(updateDimensions, 300);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timeout);
    };
  }, [isChatOpen]);

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
        setStreamingMessage((prev: string) => prev + (currentIndex === 0 ? '' : ' ') + words[currentIndex]);
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
    setMessages((prev: Message[]) => [...prev, userMessage]);
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
        setMessages((prev: Message[]) => [...prev, assistantMessage]);
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
      setMessages((prev: Message[]) => [...prev, errorMessage]);
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

  const handleNodeHover = useCallback((node: GraphNode | null) => {
    if (node) {
      const neighbors = new Set<string>();
      graphLinks.forEach(link => {
        if (link.source === node.id) neighbors.add(link.target);
        if (link.target === node.id) neighbors.add(link.source);
      });
      setHighlightNodes(neighbors);
    } else {
      setHighlightNodes(new Set());
    }
  }, []);

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

        {/* Knowledge Graph */}
        <div className="rounded-lg bg-gray-900 p-4 relative min-h-[600px] overflow-hidden">
          <ForceGraph2D
            graphData={graphData}
            width={graphDimensions.width}
            height={graphDimensions.height}
            nodeRelSize={6}
            nodeColor={(node: GraphNode) => node.color}
            linkColor={() => '#4b5563'}
            backgroundColor="#111827"
            nodeLabel="id"
            linkWidth={2}
            linkDirectionalParticles={4}
            linkDirectionalParticleWidth={2}
            linkDirectionalParticleSpeed={0.005}
            cooldownTime={3000}
            onNodeDragEnd={(node: any) => {
              // Fix node position after drag
              node.fx = node.x;
              node.fy = node.y;
            }}
            onNodeDrag={(node: any) => {
              // Update position during drag
              node.fx = node.x;
              node.fy = node.y;
            }}
            onNodeClick={(node: any) => {
              // Release fixed position on click (if already fixed)
              if (node.fx !== undefined || node.fy !== undefined) {
                node.fx = undefined;
                node.fy = undefined;
              }
            }}
            d3VelocityDecay={0.3}
            d3AlphaDecay={0.02}
            onNodeHover={handleNodeHover}
            nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D) => {
              const graphNode = node as RuntimeGraphNode;
              const label = graphNode.id;
              const fontSize = graphNode.group === 1 ? 16 : 12;
              ctx.font = `${fontSize}px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
              ctx.fillStyle = highlightNodes.has(graphNode.id) ? '#f59e0b' : '#fff';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(label, graphNode.x, graphNode.y);
            }}
            nodePointerAreaPaint={(node: any, color: string, ctx: CanvasRenderingContext2D) => {
              const graphNode = node as RuntimeGraphNode;
              ctx.fillStyle = color;
              const size = graphNode.group === 1 ? 12 : 8;
              ctx.beginPath();
              ctx.arc(graphNode.x, graphNode.y, size, 0, 2 * Math.PI);
              ctx.fill();
            }}
          />
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
            {messages.map((message: Message, index: number) => (
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
