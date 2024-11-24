import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, Save, Bell, Search, Plus } from 'lucide-react';
import { WorkflowCanvas } from '../components/playbooks/WorkflowCanvas';
import { initialNodes, initialConnections } from '../data/playbook-workflow';
import { NodeData, Connection, Position } from '../types/workflow';

export function PlaybookDetails() {
  const [nodes, setNodes] = useState<NodeData[]>(initialNodes);
  const [connections, setConnections] = useState<Connection[]>(initialConnections);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
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
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  const startDragging = (e: React.MouseEvent, nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
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
    <div className="flex flex-col min-h-screen -m-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <Link to="/playbooks" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Stage 3 Pipeline Generation</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Build and customize your automation workflow</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
            <Plus className="h-4 w-4" />
            Add Node
          </button>
          <button className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
            Import
          </button>
          <button className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
            Export
          </button>
        </div>
        <div className="flex-1 flex justify-end items-center gap-4">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search nodes..."
              className="h-9 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <WorkflowCanvas
        nodes={nodes}
        connections={connections}
        draggedNode={draggedNode}
        connectionStart={connectionStart}
        mousePosition={mousePosition}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onStartDragging={startDragging}
        onNodeClick={handleNodeClick}
        onStartConnection={startConnection}
      />
    </div>
  );
}