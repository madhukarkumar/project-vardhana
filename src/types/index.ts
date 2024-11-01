export interface Organization {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  type: 'marketing' | 'sales' | 'content' | 'analytics' | 'custom';
  status: 'active' | 'inactive' | 'training';
  metrics: {
    successRate: number;
    tasksCompleted: number;
    averageTime: number;
  };
}

export interface Playbook {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  steps: PlaybookStep[];
}

export interface PlaybookStep {
  id: string;
  type: 'agent' | 'condition' | 'delay' | 'integration';
  config: Record<string, unknown>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  avatar: string;
}