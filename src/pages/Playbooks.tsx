import React from 'react';
import { Plus, Search, Filter, Play, Pause, Archive, MoreVertical, type LucideIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';

interface Playbook {
  id: number;
  name: string;
  description: string;
  status: PlaybookStatus;
  lastModified: string;
  steps?: number;
  completedSteps?: number;
  lastRun?: string;
}

const playbooks: Playbook[] = [
  {
    id: 1,
    name: 'Lead Generation',
    description: 'Automated lead generation workflow',
    status: 'active',
    lastModified: '2 hours ago',
    steps: 8,
    completedSteps: 3,
    lastRun: '2 hours ago',
  },
  {
    id: 2,
    name: 'Content Creation',
    description: 'AI-powered content creation pipeline',
    status: 'draft',
    lastModified: '1 day ago',
    steps: 12,
    completedSteps: 0,
    lastRun: 'Never',
  },
  {
    id: 3,
    name: 'Email Campaign',
    description: 'Automated email marketing workflow',
    status: 'archived',
    lastModified: '1 week ago',
    steps: 10,
    completedSteps: 10,
    lastRun: '1 month ago',
  },
];

type PlaybookStatus = 'active' | 'draft' | 'archived';

type StatusIconsType = Record<PlaybookStatus, LucideIcon>;
type StatusColorsType = Record<PlaybookStatus, string>;

const statusIcons: StatusIconsType = {
  active: Play,
  draft: Pause,
  archived: Archive,
};

const statusColors: StatusColorsType = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300',
  archived: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
};

export function Playbooks() {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    if (id === 3) {
      navigate('/dashboard/lead-generation');
    } else {
      navigate(`/dashboard/playbooks/${id}`);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Playbooks</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Create and manage your marketing automation playbooks</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500 transition-colors">
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
            className="h-10 w-full rounded-lg border border-border-card-light dark:border-border-card-dark bg-white dark:bg-background-card-dark pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border-card-light dark:border-border-card-dark px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-background-card-light dark:hover:bg-background-card-dark transition-colors">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {playbooks.map((playbook) => {
          const StatusIcon = statusIcons[playbook.status as PlaybookStatus];
          return (
            <Card
              key={playbook.id}
              className="group relative transition-all hover:border-primary-300 dark:hover:border-primary-600"
            >
              <Card.Body>
                <div className="absolute right-4 top-4">
                  <button 
                    onClick={() => handleNavigate(playbook.id)}
                    className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <Link 
                    to={playbook.id === 3 ? '/dashboard/lead-generation' : `/dashboard/playbooks/${playbook.id}`}
                    className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {playbook.name}
                  </Link>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[playbook.status as PlaybookStatus]}`}>
                    {playbook.status.charAt(0).toUpperCase() + playbook.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{playbook.description}</p>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 dark:bg-indigo-500"
                      style={{
                        width: `${playbook.steps && playbook.completedSteps ? (playbook.completedSteps / playbook.steps * 100) : 0}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {playbook.steps && playbook.completedSteps ? `${playbook.completedSteps}/${playbook.steps}` : 'No steps'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last run: {playbook.lastRun || 'Never'}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <StatusIcon className="h-4 w-4" />
                    <span>Last run: {playbook.lastRun}</span>
                  </div>
                  <Link 
                    to={playbook.id === 3 ? '/dashboard/lead-generation' : `/dashboard/playbooks/${playbook.id}`}
                    className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
                  >
                    View Details →
                  </Link>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}