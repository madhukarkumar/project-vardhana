import { notFound } from 'next/navigation';

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

interface AgentDetailPageProps {
  params: {
    id: string;
  };
}

export default function AgentDetailPage({ params }: AgentDetailPageProps) {
  const agent = agents.find((a) => a.id === parseInt(params.id));

  if (!agent) {
    notFound();
  }

  return (
    <div className="p-6 min-h-screen bg-background dark:bg-background-dark">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{agent.name}</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">{agent.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border-card-light dark:border-border-card-dark bg-background-card-light dark:bg-background-card-dark p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance</h2>
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
        </div>

        <div className="rounded-lg border border-border-card-light dark:border-border-card-dark bg-background-card-light dark:bg-background-card-dark p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Details</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Type</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white capitalize">{agent.type}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</dt>
              <dd className="mt-1">
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  agent.status === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : agent.status === 'inactive'
                    ? 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                }`}>
                  {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
