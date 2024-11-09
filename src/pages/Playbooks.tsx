import React from 'react';
import { Plus, Search, Filter, Play, Pause, Archive, MoreVertical } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const playbooks = [
  {
    id: 1,
    name: 'Social Media Growth',
    description: 'Automated social media engagement and growth strategy',
    status: 'active',
    steps: 8,
    completedSteps: 3,
    lastRun: '2 hours ago',
  },
  {
    id: 2,
    name: 'Content Distribution',
    description: 'Multi-channel content distribution workflow',
    status: 'draft',
    steps: 12,
    completedSteps: 0,
    lastRun: 'Never',
  },
  {
    id: 3,
    name: 'Lead Generation',
    description: 'B2B lead generation and qualification process',
    status: 'active',
    steps: 6,
    completedSteps: 4,
    lastRun: '1 day ago',
  },
  {
    id: 4,
    name: 'Email Nurture',
    description: 'Customer nurture email campaign sequence',
    status: 'archived',
    steps: 10,
    completedSteps: 10,
    lastRun: '1 month ago',
  },
];

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
};

const statusIcons = {
  active: Play,
  draft: Pause,
  archived: Archive,
};

export function Playbooks() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Playbooks</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Create and manage your marketing automation playbooks</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors">
          <Plus className="h-5 w-5" />
          New Playbook
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search playbooks..."
            className="h-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {playbooks.map((playbook) => {
          const StatusIcon = statusIcons[playbook.status];
          return (
            <div
              key={playbook.id}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 relative group shadow-lg dark:shadow-gray-900/50 hover:shadow-xl transition-all"
            >
              <div className="absolute right-4 top-4">
                <button 
                  onClick={() => navigate(`/playbooks/${playbook.id}`)}
                  className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  <MoreVertical className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <Link 
                  to={`/playbooks/${playbook.id}`}
                  className="text-lg font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {playbook.name}
                </Link>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[playbook.status]}`}>
                  {playbook.status.charAt(0).toUpperCase() + playbook.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{playbook.description}</p>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {playbook.completedSteps} of {playbook.steps} steps
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                <div
                  className="h-2 rounded-full bg-indigo-600"
                  style={{ width: `${(playbook.completedSteps / playbook.steps) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <StatusIcon className="h-4 w-4" />
                  <span>Last run: {playbook.lastRun}</span>
                </div>
                <Link 
                  to={`/playbooks/${playbook.id}`}
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                >
                  View Details →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}