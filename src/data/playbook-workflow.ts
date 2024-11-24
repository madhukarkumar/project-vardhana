import { Bot, Pencil, Database, SplitSquareHorizontal, ArrowRight, Zap } from 'lucide-react';
import { NodeData, Connection } from '../types/workflow';

export const initialNodes: NodeData[] = [
  {
    id: 'trigger1',
    type: 'trigger',
    title: 'When clicking "Test workflow"',
    description: 'Get data from airtable and format',
    position: { x: 100, y: 100 },
    icon: Zap
  },
  {
    id: 'node1',
    type: 'action',
    title: 'Set Ideal Customer Profile (ICP)',
    description: 'Format and prepare data',
    position: { x: 400, y: 100 },
    icon: Pencil
  },
  {
    id: 'node2',
    type: 'action',
    title: 'Aggregate for AI node',
    description: 'Combine and structure data',
    position: { x: 700, y: 100 },
    icon: Database
  },
  {
    id: 'node3',
    type: 'ai',
    title: 'AI Agent',
    description: 'Generate draft seed KW based on ICP',
    position: { x: 1000, y: 100 },
    icon: Bot
  },
  {
    id: 'node4',
    type: 'action',
    title: 'Split Out',
    description: 'Add data to database',
    position: { x: 1300, y: 100 },
    icon: SplitSquareHorizontal
  },
  {
    id: 'node5',
    type: 'action',
    title: 'Connect to your own database',
    description: 'Final data storage',
    position: { x: 1600, y: 100 },
    icon: ArrowRight
  }
];

export const initialConnections: Connection[] = [
  { id: 'conn1', from: 'trigger1', to: 'node1' },
  { id: 'conn2', from: 'node1', to: 'node2' },
  { id: 'conn3', from: 'node2', to: 'node3' },
  { id: 'conn4', from: 'node3', to: 'node4' },
  { id: 'conn5', from: 'node4', to: 'node5' }
];