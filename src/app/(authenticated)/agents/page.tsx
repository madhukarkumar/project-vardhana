import { Plus, Search, Filter } from 'lucide-react';
import AgentCard from '@/components/agents/AgentCard';

interface Agent {
  id: number;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'training';
  description: string;
  successRate: number;
}

const agents: Agent[] = [
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

export default function AgentsPage() {
  return (
    <div className="p-6 min-h-screen bg-background dark:bg-background-dark">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">AI Agents</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Manage and monitor your AI marketing agents</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary-600 hover:bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-colors">
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
            className="h-10 w-full rounded-lg border border-border-card-light dark:border-border-card-dark bg-background-card-light dark:bg-background-card-dark pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border-card-light dark:border-border-card-dark bg-background-card-light dark:bg-background-card-dark px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-background-secondary-dark transition-colors">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
