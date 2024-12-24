import React from 'react';
import { 
  Puzzle, 
  User, 
  Twitter, 
  Linkedin,
  Github,
  Plus
} from 'lucide-react';
import { Card } from '../components/ui/Card';

const integrations = [
  {
    name: 'GitHub',
    icon: Github,
    status: 'connected',
    lastSync: '2 hours ago'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    status: 'connected',
    lastSync: '1 hour ago'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    status: 'disconnected',
    lastSync: 'Never'
  }
];

export function Settings() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">Manage your account settings and integrations</p>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
        {/* Profile Settings */}
        <Card>
          <Card.Body>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Settings</h2>
            </div>

            <form className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
                <button className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                  Change Avatar
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue="John Doe"
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="john@example.com"
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    defaultValue="Acme Inc"
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    defaultValue="https://example.com"
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </Card.Body>
        </Card>

        {/* Integrations */}
        <Card>
          <Card.Body>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Puzzle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Integrations</h2>
              </div>
              <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <Plus className="h-4 w-4" />
                Add New
              </button>
            </div>

            <div className="space-y-4">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800/50">
                      <integration.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{integration.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Last sync: {integration.lastSync}</p>
                    </div>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      integration.status === 'connected'
                        ? 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
                        : 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-800/50'
                    }`}
                  >
                    {integration.status === 'connected' ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}