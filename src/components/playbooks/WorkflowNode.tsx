import React from 'react';
import { Plus } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';

interface WorkflowNodeProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  position: { x: number; y: number };
  isDragged: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: () => void;
  onStartConnection: (e: React.MouseEvent) => void;
}

export function WorkflowNode({
  id,
  title,
  description,
  icon: Icon,
  position,
  isDragged,
  onMouseDown,
  onClick,
  onStartConnection
}: WorkflowNodeProps) {
  return (
    <Card
      onMouseDown={onMouseDown}
      onClick={onClick}
      className={`absolute w-[300px] cursor-move hover:border-indigo-500 ${
        isDragged ? 'border-indigo-500' : ''
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isDragged ? 10 : 1
      }}
    >
      <Card.Body>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
            <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
          </div>
          <button
            onMouseDown={onStartConnection}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Plus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}