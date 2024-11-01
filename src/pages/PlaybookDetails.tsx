import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeft, Settings, Save, Bot, Pencil, Database, SplitSquareHorizontal, ArrowRight, Plus, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  icon?: React.ElementType;
}

const initialNodes: WorkflowNode[] = [
  {
    id: 'trigger1',
    type: 'trigger',
    title: 'When clicking "Test workflow"',
    description: 'Get data from airtable and format',
    position: { x: 100, y: 100 },
    icon: Zap
  },
  {
    id: 'node1',
    type: 'action',
    title: 'Set Ideal Customer Profile (ICP)',
    description: 'Format and prepare data',
    position: { x: 400, y: 100 },
    icon: Pencil
  },
  {
    id: 'node2',
    type: 'action',
    title: 'Aggregate for AI node',
    description: 'Combine and structure data',
    position: { x: 700, y: 100 },
    icon: Database
  },
  {
    id: 'node3',
    type: 'ai',
    title: 'AI Agent',
    description: 'Generate draft seed KW based on ICP',
    position: { x: 1000, y: 100 },
    icon: Bot
  },
  {
    id: 'node4',
    type: 'action',
    title: 'Split Out',
    description: 'Add data to database',
    position: { x: 1300, y: 100 },
    icon: SplitSquareHorizontal
  },
  {
    id: 'node5',
    type: 'action',
    title: 'Connect to your own database',
    description: 'Final data storage',
    position: { x: 1600, y: 100 },
    icon: ArrowRight
  }
];

const initialConnections: Connection[] = [
  { id: 'conn1', from: 'trigger1', to: 'node1' },
  { id: 'conn2', from: 'node1', to: 'node2' },
  { id: 'conn3', from: 'node2', to: 'node3' },
  { id: 'conn4', from: 'node3', to: 'node4' },
  { id: 'conn5', from: 'node4', to: 'node5' }
];

export function PlaybookDetails() {
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
  const [connections, setConnections] = useState<Connection[]>(initialConnections);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isConnecting) {
      setMousePosition({ x, y });
    }

    if (draggedNode) {
      setNodes(prev => prev.map(node => {
        if (node.id === draggedNode) {
          return {
            ...node,
            position: {
              x: x - dragOffset.x,
              y: y - dragOffset.y
            }
          };
        }
        return node;
      }));
    }
  }, [isConnecting, draggedNode, dragOffset]);

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  const startDragging = (e: React.MouseEvent, nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - rect.left - node.position.x;
    const offsetY = e.clientY - rect.top - node.position.y;

    setDragOffset({ x: offsetX, y: offsetY });
    setDraggedNode(nodeId);
  };

  const startConnection = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setIsConnecting(true);
    setConnectionStart(nodeId);
  };

  const handleNodeClick = (nodeId: string) => {
    if (isConnecting && connectionStart && connectionStart !== nodeId) {
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

  return (
    <div className="h-[calc(100vh-4rem)] -mt-6 -mx-6 flex flex-col bg-[#1a1a1a]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#1a1a1a]">
        <div className="flex items-center gap-4">
          <Link to="/playbooks" className="p-2 hover:bg-gray-800 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-white">ICP Generation Workflow</h1>
            <p className="mt-1 text-gray-400">Build and customize your automation workflow</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 border border-gray-700">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div 
        ref={canvasRef}
        className="flex-1 relative overflow-auto"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[#1a1a1a] bg-grid-dark"></div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 pointer-events-none">
          {connections.map((connection) => {
            const fromNode = nodes.find(n => n.id === connection.from);
            const toNode = nodes.find(n => n.id === connection.to);
            if (!fromNode || !toNode) return null;

            return (
              <line
                key={connection.id}
                x1={fromNode.position.x + 150}
                y1={fromNode.position.y + 50}
                x2={toNode.position.x}
                y2={toNode.position.y + 50}
                stroke="#4f46e5"
                strokeWidth="2"
              />
            );
          })}
          {isConnecting && connectionStart && (
            <line
              x1={nodes.find(n => n.id === connectionStart)?.position.x + 150}
              y1={nodes.find(n => n.id === connectionStart)?.position.y + 50}
              x2={mousePosition.x}
              y2={mousePosition.y}
              stroke="#4f46e5"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const Icon = node.icon || Bot;
          return (
            <div
              key={node.id}
              onMouseDown={(e) => startDragging(e, node.id)}
              onClick={() => handleNodeClick(node.id)}
              className={`absolute w-[300px] rounded-lg border ${
                draggedNode === node.id ? 'border-indigo-500' : 'border-gray-800'
              } bg-gray-850 p-4 cursor-move hover:border-indigo-500 transition-colors`}
              style={{
                left: `${node.position.x}px`,
                top: `${node.position.y}px`,
                backgroundColor: 'rgba(24, 24, 27, 0.8)',
                zIndex: draggedNode === node.id ? 10 : 1
              }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-800">
                  <Icon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-white">{node.title}</h3>
                  <p className="text-xs text-gray-400">{node.description}</p>
                </div>
                <button
                  onMouseDown={(e) => startConnection(e, node.id)}
                  className="p-1 rounded-full hover:bg-gray-700"
                >
                  <Plus className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}