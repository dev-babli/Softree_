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
  label: 'AI AGENTS DEVELOPMENT',
  heading: {
    prefix: 'Build Intelligent ',
    highlight: 'AI Agents',
    suffix: ' That Drive Real Outcomes',
  },
  paragraph:
    'We design and build enterprise AI agents that automate workflows, make smarter decisions, and deliver exceptional customer experiences at scale.',
  ctaButtons: {
    primary: {
      text: 'Talk to an Expert',
      href: 'https://www.softreetechnology.com/contact',
    },
    secondary: { text: 'Case Studies', href: 'https://www.softreetechnology.com/case-studies' },
  },
  features: [
    {
      icon: Zap,
      title: 'Automate Workflows',
      subtitle: 'Built secure by design',
    },
    {
      icon: Target,
      title: 'Smarter Decisions',
      subtitle: 'Tailored to your business',
    },
    {
      icon: Users,
      title: 'Better Experiences',
      subtitle: 'Real results. Real ROI.',
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
