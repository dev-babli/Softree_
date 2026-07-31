import {
  MessageSquare,
  Brain,
  GitFork,
  ShieldCheck,
  Database,
  Users,
  Zap,
  Target,
  Shield,
  TrendingUp,
  Cpu,
} from 'lucide-react';

export interface CapabilityCardData {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  angle: number;
}

export interface FeatureItem {
  icon: any;
  title: string;
  subtitle: string;
}

export const HERO_DATA = {
  label: 'AI AGENT DEVELOPMENT SERVICES',
  heading: {
    prefix: 'AI Agent Development Solutions',
    highlight: 'for Enterprise Automation',
    suffix: '',
  },
  paragraph:
    'Softree Technology delivers custom AI agent development services for enterprises looking to automate operations, unlock organizational knowledge, and integrate agentic AI into existing business systems.',
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
