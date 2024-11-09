import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: string;
}

export function StatsCard({ title, value, subtitle, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 min-h-[160px] shadow-lg dark:shadow-gray-900/50">
      <div className="flex flex-col h-full">
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
      <div className={`absolute bottom-6 right-6 rounded-lg ${color} p-3`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  );
}