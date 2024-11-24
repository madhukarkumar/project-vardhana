import { LucideIcon } from 'lucide-react';

export interface Position {
  x: number;
  y: number;
}

export interface Connection {
  id: string;
  from: string;
  to: string;
}

export interface NodeData {
  id: string;
  type: string;
  title: string;
  description: string;
  position: Position;
  icon: LucideIcon;
}