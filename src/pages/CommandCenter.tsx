import React, { useState, useRef, useCallback } from 'react';
import { Bot, Send, X, Plus, Settings, Save, MessageSquare } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface Connection {
  id: string;
  from: string;
  to: string;
}

interface WorkflowNode {
  id: string;
  type: string;
  title: string;
  description: string;
  position: Position;
}

const nodeTemplates = [
  {
    type: 'trigger',
    title: 'Trigger',
    description: 'Schedule-based trigger',
  },
  {
    type: 'agent',
    title: 'Agent',
    description: 'Processing agent',
  }
];

const initialNodes: WorkflowNode[] = [
  {
    id: '1',
    type: 'trigger',
    title: 'Daily Trigger',
    description: 'Runs every day at 9 AM',
    position: { x: 100, y: 100 },
  }
];

const messages = [
  { role: 'assistant', content: "Welcome to the Command Center! How can I assist you today?" },
  { role: 'user', content: 'Show me active workflows' },
  { role: 'assistant', content: 'Currently, there are 3 active workflows. The main workflow is displayed on the canvas.' }
];

export function CommandCenter() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
  const [draggedNode, setDraggedNode] = useState<WorkflowNode | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setNewMessage('');
  };

  const handleDragStart = (e: React.DragEvent, nodeOrTemplate: WorkflowNode | typeof nodeTemplates[0]) => {
    e.preventDefault();
    if ('position' in nodeOrTemplate) {
      // It's a WorkflowNode
      setDraggedNode(nodeOrTemplate);
    } else {
      // It's a template
      const newNode: WorkflowNode = {
        id: Math.random().toString(36).substr(2, 9),
        type: nodeOrTemplate.type,
        title: nodeOrTemplate.title,
        description: nodeOrTemplate.description,
        position: { x: 0, y: 0 }
      };
      setDraggedNode(newNode);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isConnecting) {
      setMousePosition({ x, y });
    } else if (draggedNode) {
      setDraggedNode(prev => prev ? { ...prev, position: { x, y } } : null);
    }
  }, [draggedNode, isConnecting]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current || !draggedNode) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newNode = { ...draggedNode, position: { x, y } };
    
    setNodes(prev => {
      const existingNodeIndex = prev.findIndex(n => n.id === newNode.id);
      if (existingNodeIndex >= 0) {
        const updated = [...prev];
        updated[existingNodeIndex] = newNode;
        return updated;
      }
      return [...prev, newNode];
    });

    setDraggedNode(null);
  }, [draggedNode]);

  const startConnection = (nodeId: string) => {
    setIsConnecting(true);
    setConnectionStart(nodeId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current || !isConnecting) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleNodeClick = (nodeId: string) => {
    if (isConnecting && connectionStart && connectionStart !== nodeId) {
      // Create new connection
      const newConnection: Connection = {
        id: Math.random().toString(36).substr(2, 9),
        from: connectionStart,
        to: nodeId
      };
      setConnections(prev => [...prev, newConnection]);
      setIsConnecting(false);
      setConnectionStart(null);
    }
  };

  const getNodePosition = (nodeId: string): Position => {
    const node = nodes.find(n => n.id === nodeId);
    return node?.position || { x: 0, y: 0 };
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] -mt-6 -mx-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Command Center</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Build and manage your AI workflows</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
            <Save className="h-4 w-4" />
            Save Workflow
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 relative transition-all duration-300 ${isChatOpen ? 'mr-96' : 'mr-0'}`}>
        {/* Node Templates Sidebar */}
        <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Components</h2>
          <div className="space-y-3">
            {nodeTemplates.map((template, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, template)}
                className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-move hover:border-indigo-500 dark:hover:border-indigo-400"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    template.type === 'trigger' ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' :
                    'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                  }`}>
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{template.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{template.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div 
          ref={canvasRef}
          className="absolute left-64 right-0 top-0 bottom-0 bg-gray-50 dark:bg-gray-900 overflow-auto"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onMouseMove={handleMouseMove}
        >
          {/* Connection Lines */}
          <svg className="absolute inset-0 pointer-events-none">
            {/* Existing Connections */}
            {connections.map((connection) => {
              const fromPos = getNodePosition(connection.from);
              const toPos = getNodePosition(connection.to);
              return (
                <line
                  key={connection.id}
                  x1={fromPos.x + 240}
                  y1={fromPos.y + 40}
                  x2={toPos.x}
                  y2={toPos.y + 40}
                  stroke="#6366f1"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
            {/* Active Connection Line */}
            {isConnecting && connectionStart && (
              <line
                x1={getNodePosition(connectionStart).x + 240}
                y1={getNodePosition(connectionStart).y + 40}
                x2={mousePosition.x}
                y2={mousePosition.y}
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            )}
            {/* Arrow Marker Definition */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#6366f1"
                />
              </marker>
            </defs>
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              data-node-id={node.id}
              draggable
              onDragStart={(e) => handleDragStart(e, node)}
              onClick={() => handleNodeClick(node.id)}
              className="absolute w-60 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 cursor-move hover:shadow-lg transition-shadow"
              style={{
                left: `${node.position.x}px`,
                top: `${node.position.y}px`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  node.type === 'trigger' ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' :
                  'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                }`}>
                  <Bot className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{node.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{node.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startConnection(node.id);
                  }}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Plus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
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
                <h3 className="font-semibold text-gray-900 dark:text-white">Command Assistant</h3>
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
                placeholder="Type your command..."
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