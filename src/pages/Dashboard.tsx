import { Link } from 'react-router-dom';
import { Bot, Zap, TrendingUp, DollarSign, Target, CheckCircle, Database, BookOpen, ChevronRight } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { Card } from '../components/ui/Card';
import { PerformanceCharts } from '../components/dashboard/PerformanceCharts';

export function Dashboard() {
  const navCards = [
    {
      title: 'Knowledge',
      description: 'Manage and explore your organization\'s knowledge base',
      icon: Database,
      href: '/knowledge',
      color: 'bg-purple-600',
    },
    {
      title: 'Agents',
      description: 'Configure and monitor your AI marketing agents',
      icon: Bot,
      href: '/agents',
      color: 'bg-blue-600',
    },
    {
      title: 'Playbooks',
      description: 'Create and manage automation workflows',
      icon: BookOpen,
      href: '/playbooks',
      color: 'bg-emerald-600',
    },
  ];

  const stats = [
    {
      title: 'Active Campaigns',
      value: '11',
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

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {navCards.map((card) => (
          <Link
            key={card.title}
            to={card.href}
            className="group relative"
          >
            <Card className="h-full min-h-[180px] transition-all hover:border-gray-300 dark:hover:border-gray-600">
              <Card.Body>
                <div className={`rounded-lg ${card.color} p-3 inline-flex`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">{card.description}</p>
                <div className="absolute bottom-6 right-6">
                  <div className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                    <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="mt-8 space-y-8">
        {/* Human Intervention Needed */}
        <Card>
          <Card.Header>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Human Intervention Needed</h2>
          </Card.Header>
          <Card.Body>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {interventions.map((item, i) => (
                <Card key={i} className="h-full">
                  <Card.Body className="flex flex-col min-h-[200px]">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{item.time}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-auto pt-4">
                      <button className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        Review
                      </button>
                      <button className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors">
                        Approve
                      </button>
                      <button className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors">
                        Reject
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Performance Charts */}
        <PerformanceCharts />
      </div>
    </>
  );
}