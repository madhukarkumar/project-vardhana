import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: string;
}

export function StatsCard({ title, value, subtitle, icon: Icon, color }: StatsCardProps) {
  return (
    <Card className="min-h-[160px] relative group hover:border-primary-400/20 transition-colors">
      <Card.Body className="flex flex-col h-full">
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
        <div className={`absolute bottom-6 right-6 rounded-lg ${color} p-3 transition-transform group-hover:scale-110`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </Card.Body>
    </Card>
  );
}