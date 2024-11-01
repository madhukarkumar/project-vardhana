import React from 'react';
import { Bot, Zap, TrendingUp, DollarSign, Target, CheckCircle } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { PerformanceCharts } from '../components/dashboard/PerformanceCharts';

export function Dashboard() {
  const stats = [
    {
      title: 'Active Campaigns',
      value: 11,
      icon: Zap,
      color: 'bg-indigo-600',
    },
    {
      title: 'Current Q Spend',
      value: '$12,899',
      icon: DollarSign,
      color: 'bg-purple-600',
    },
    {
      title: 'Qualified Opportunities',
      value: '$350,000',
      subtitle: '6 Accounts',
      icon: Target,
      color: 'bg-emerald-600',
    },
    {
      title: 'Closed Won Opportunities',
      value: '$280,000',
      subtitle: '2 Customers',
      icon: CheckCircle,
      color: 'bg-blue-600',
    },
  ];

  const interventions = [
    {
      title: 'Campaign Budget Adjustment',
      description: 'LinkedIn campaign exceeded daily budget by 20%',
      time: '2 hours ago',
    },
    {
      title: 'New Account Qualification',
      description: 'Enterprise lead requires manual verification',
      time: '4 hours ago',
    },
    {
      title: 'Content Approval',
      description: 'New email sequence ready for review',
      time: '5 hours ago',
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Welcome back, John!</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">Here's what's happening with your marketing co-agents.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="mt-8 space-y-8">
        {/* Human Intervention Needed - Full Width */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Human Intervention Needed</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {interventions.map((item, i) => (
              <div key={i} className="flex flex-col gap-4 rounded-lg border border-gray-100 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{item.time}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Review
                  </button>
                  <button className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors">
                    Approve
                  </button>
                  <button className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Charts */}
        <PerformanceCharts />
      </div>
    </>
  );
}