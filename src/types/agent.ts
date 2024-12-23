export type AgentStatus = 'active' | 'training' | 'inactive';

export interface Agent {
  id: number;
  name: string;
  type: string;
  status: AgentStatus;
  description: string;
  successRate: number;
} 