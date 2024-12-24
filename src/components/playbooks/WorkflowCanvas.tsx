import React from 'react';
import { WorkflowNode } from './WorkflowNode';
import { Connection, NodeData } from '../../types/workflow';

interface WorkflowCanvasProps {
  nodes: NodeData[];
  connections: Connection[];
  draggedNode: string | null;
  connectionStart: string | null;
  mousePosition: { x: number; y: number };
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onStartDragging: (e: React.MouseEvent, nodeId: string) => void;
  onNodeClick: (nodeId: string) => void;
  onStartConnection: (e: React.MouseEvent, nodeId: string) => void;
}

export function WorkflowCanvas({
  nodes,
  connections,
  draggedNode,
  connectionStart,
  mousePosition,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onStartDragging,
  onNodeClick,
  onStartConnection
}: WorkflowCanvasProps) {
  return (
    <div 
      className="flex-1 relative overflow-auto bg-gray-50 dark:bg-gray-900"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark"></div>

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
              stroke="#6366f1"
              strokeWidth="2"
            />
          );
        })}
        {connectionStart && (
          <line
            x1={(nodes.find(n => n.id === connectionStart)?.position?.x ?? 0) + 150}
            y1={(nodes.find(n => n.id === connectionStart)?.position?.y ?? 0) + 50}
            x2={mousePosition.x}
            y2={mousePosition.y}
            stroke="#6366f1"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        )}
      </svg>

      {nodes.map((node) => (
        <WorkflowNode
          key={node.id}
          {...node}
          isDragged={draggedNode === node.id}
          onMouseDown={(e) => onStartDragging(e, node.id)}
          onClick={() => onNodeClick(node.id)}
          onStartConnection={(e) => onStartConnection(e, node.id)}
        />
      ))}
    </div>
  );
}