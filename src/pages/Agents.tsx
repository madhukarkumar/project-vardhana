import React from 'react';
import { Plus, Search, Filter, Bot, MoreVertical } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';

const agents = [
  {
    id: 1,
    name: 'Social Media Manager',
    type: 'marketing',
    status: 'active',
    description: 'Manages social media content and engagement across platforms',
    successRate: 95,
  },
  {
    id: 2,
    name: 'Content Writer',
    type: 'content',
    status: 'active',
    description: 'Creates engaging blog posts and articles',
    successRate: 88,
  },
  {
    id: 3,
    name: 'SEO Optimizer',
    type: 'analytics',
    status: 'training',
    description: 'Optimizes content for search engines',
    successRate: 92,
  },
  {
    id: 4,
    name: 'Email Campaign Manager',
    type: 'marketing',
    status: 'inactive',
    description: 'Manages email marketing campaigns and analytics',
    successRate: 85,
  },
];

interface StatusColors {
  [key: string]: string;
}

const statusColors: StatusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300',
  training: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
};

export function Agents() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">AI Agents</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Manage and monitor your AI marketing agents</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500 transition-colors">
          <Plus className="h-5 w-5" />
          New Agent
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search agents..."
            className="h-10 w-full rounded-lg border border-border-card-light dark:border-border-card-dark bg-white dark:bg-background-card-dark pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border-card-light dark:border-border-card-dark px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-background-card-light dark:hover:bg-background-card-dark transition-colors">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className="group relative transition-all hover:border-primary-300 dark:hover:border-primary-600"
          >
            <Card.Body>
              <div className="absolute right-4 top-4">
                <button 
                  onClick={() => navigate(`/dashboard/agents/${agent.id}`)}
                  className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all"
                >
                  <MoreVertical className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[agent.status]}`}>
                  {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                </span>
              </div>
              <Link to={`/dashboard/agents/${agent.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400">
                  {agent.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{agent.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{agent.successRate}%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-100 dark:bg-gray-700/50">
                <div
                  className="h-2 rounded-full bg-primary-600"
                  style={{ width: `${agent.successRate}%` }}
                />
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}