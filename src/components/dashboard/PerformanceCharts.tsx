import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';

// Generate 30 days of data
const leadsData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    leads: Math.floor(Math.random() * (80 - 30) + 30),
  };
});

const campaignData = [
  {
    name: 'Spring Sale 2024',
    cost: 1200,
    channels: ['LinkedIn', 'Facebook'],
    stage1: 245,
    stage2: 128,
    stage3: 45,
  },
  {
    name: 'Product Launch',
    cost: 2500,
    channels: ['LinkedIn', 'X', 'Instagram'],
    stage1: 389,
    stage2: 167,
    stage3: 72,
  },
  {
    name: 'Brand Awareness',
    cost: 800,
    channels: ['X', 'Facebook'],
    stage1: 156,
    stage2: 84,
    stage3: 31,
  },
  {
    name: 'Customer Referral',
    cost: 500,
    channels: ['LinkedIn'],
    stage1: 123,
    stage2: 67,
    stage3: 28,
  },
];

export function PerformanceCharts() {
  return (
    <div className="space-y-6">
      {/* Leads Chart */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Leads Generated</h2>
        </Card.Header>
        <Card.Body>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadsData} barSize={8}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  className="text-gray-600 dark:text-gray-400"
                  interval={4}
                />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(var(--background))', 
                    border: '1px solid rgb(var(--foreground), 0.1)',
                    borderRadius: '0.5rem' 
                  }}
                  labelStyle={{ color: 'rgb(var(--foreground))' }}
                  labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                />
                <Bar 
                  dataKey="leads" 
                  fill="#6366f1" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>

      {/* Campaign Performance Table */}
      <Card>
        <Card.Header>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Campaign Performance</h2>
        </Card.Header>
        <Card.Body>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Campaign</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Cost</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Channels</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Stage 1</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Stage 2</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">Stage 3</th>
                </tr>
              </thead>
              <tbody>
                {campaignData.map((campaign) => (
                  <tr 
                    key={campaign.name} 
                    className="border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{campaign.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                      ${campaign.cost.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {campaign.channels.map((channel) => (
                          <span
                            key={channel}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            {channel}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-white">
                      {campaign.stage1.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-white">
                      {campaign.stage2.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-white">
                      {campaign.stage3.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}