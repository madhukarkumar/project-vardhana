import { Bot } from 'lucide-react';

interface WorkflowNodeProps {
  position: { x: number; y: number };
  title: string;
  description: string;
  isDragged?: boolean;
  onMouseDown?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  onStartConnection?: (e: React.MouseEvent) => void;
}

export function WorkflowNode({
  position,
  title,
  description,
  isDragged,
  onMouseDown,
  onClick,
  onStartConnection
}: WorkflowNodeProps) {
  return (
    <div
      className={`absolute w-60 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 cursor-move hover:shadow-lg transition-shadow ${
        isDragged ? 'opacity-50' : ''
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900">
          <Bot className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        {onStartConnection && (
          <button
            onClick={onStartConnection}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}