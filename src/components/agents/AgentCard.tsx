'use client';

import { Bot, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

interface Agent {
  id: number;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'training';
  description: string;
  successRate: number;
}

interface AgentCardProps {
  agent: Agent;
}

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300',
  training: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
};

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="group relative transition-all hover:border-primary-500/50 dark:hover:border-primary-400/50 bg-background-card-light dark:bg-background-card-dark border-border-card-light dark:border-border-card-dark">
      <Card.Body>
        <div className="absolute right-4 top-4">
          <Link
            href={`/agents/${agent.id}`}
            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-background-secondary-dark transition-all"
          >
            <MoreVertical className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Link>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[agent.status]}`}>
            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
          </span>
        </div>
        <Link href={`/agents/${agent.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {agent.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{agent.description}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{agent.successRate}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-700/50">
          <div
            className="h-2 rounded-full bg-primary-600 dark:bg-primary-500 transition-all"
            style={{ width: `${agent.successRate}%` }}
          />
        </div>
      </Card.Body>
    </Card>
  );
}
