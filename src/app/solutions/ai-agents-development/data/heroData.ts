import type { LucideIcon } from 'lucide-react';
import {
  MessageSquare,
  Brain,
  GitFork,
  ShieldCheck,
  Database,
  Users,
  TrendingUp,
  Cpu,
} from 'lucide-react';

export interface CapabilityCardData {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  angle: number;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export const HERO_DATA = {
  label: 'OFFSHORE AI AGENT DEVELOPMENT SERVICES',
  heading: {
    line1: 'AI Agent',
    line2: 'Development',
    line3: 'Services for',
    prefix: 'AI Agent Development Solutions for',
    highlight: 'Enterprise Automation',
    suffix: '',
  },
  paragraph:
    'Softree helps businesses design and develop AI agents that understand business context, use enterprise data and tools, and take action across real-world workflows. Extend your capabilities with an offshore AI engineering team built to develop, integrate, and scale AI agents around your business needs.',
  ctaButtons: {
    primary: {
      text: 'Talk to an Expert',
      href: 'https://www.softreetechnology.com/contact',
    },
    secondary: { text: '', href: '' },
  },
  features: [
    {
      icon: Cpu,
      title: 'CUSTOM AI AGENTS',
      subtitle: 'Tailored to your workflows.',
    },
    {
      icon: Database,
      title: 'SYSTEM INTEGRATION',
      subtitle: 'Connect APIs and databases.',
    },
    {
      icon: ShieldCheck,
      title: 'SECURE BY DESIGN',
      subtitle: 'Enterprise security built-in.',
    },
    {
      icon: TrendingUp,
      title: 'END-TO-END DELIVERY',
      subtitle: 'Full-cycle AI deployment.',
    },
  ] as FeatureItem[],
  capabilities: [
    {
      id: 'understand',
      title: 'Understand',
      subtitle: 'Natural Language',
      icon: MessageSquare,
      angle: 270,
    },
    {
      id: 'reason',
      title: 'Reason',
      subtitle: 'Make Decisions',
      icon: Brain,
      angle: 330,
    },
    {
      id: 'act',
      title: 'Act',
      subtitle: 'Take Actions',
      icon: GitFork,
      angle: 30,
    },
    {
      id: 'learn',
      title: 'Learn',
      subtitle: 'Improve Continuously',
      icon: ShieldCheck,
      angle: 90,
    },
    {
      id: 'integrate',
      title: 'Integrate',
      subtitle: 'Connect Systems',
      icon: Database,
      angle: 150,
    },
    {
      id: 'interact',
      title: 'Interact',
      subtitle: 'Engage Users',
      icon: Users,
      angle: 210,
    },
  ] as CapabilityCardData[],
};
