import {
  ShieldCheck,
  Target,
  Network,
  FileText,
  Database,
  Cloud,
  Mail,
  Users,
  Code,
  FileBox,
  Layers,
  SearchCheck,
  Cpu,
} from 'lucide-react';

export interface FeatureItem {
  icon: any;
  title: string;
  description: string;
}

export interface KnowledgeSourceItem {
  title: string;
  icon: any;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  glowClass: string;
}

export const HERO_DATA = {
  label: 'ENTERPRISE RAG DEVELOPMENT SERVICES',
  heading: {
    prefix: 'Your Offshore RAG Development for',
    highlight: 'Accurate, Secure AI',
    suffix: '',
  },
  paragraph:
    'Strengthen your AI delivery capabilities with offshore RAG expertise that connects documents, databases, business applications, and knowledge sources to deliver accurate, grounded AI responses.',
  ctaButtons: {
    primary: {
      text: 'Talk to An Expert',
      href: '/contact',
    },
    secondary: { text: 'View Case Studies', href: '/case-studies' },
  },
  features: [
    {
      icon: Database,
      title: 'Data Integration',
      description: 'Connect all enterprise data sources.',
    },
    {
      icon: Target,
      title: 'Trusted AI',
      description: 'Ground outputs in internal knowledge.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure & Private',
      description: 'Enterprise-grade data protection.',
    },
    {
      icon: Cpu,
      title: 'Scalable RAG',
      description: 'Built for heavy enterprise workloads.',
    },
  ] as FeatureItem[],
  knowledgeSources: [
    { title: 'SharePoint', icon: Cloud, colorClass: 'text-teal-600', bgClass: 'bg-teal-100', borderClass: 'border-teal-200', glowClass: 'shadow-[0_4px_20px_rgba(13,148,136,0.25)]' },
    { title: 'PDFs', icon: FileText, colorClass: 'text-red-600', bgClass: 'bg-red-100', borderClass: 'border-red-200', glowClass: 'shadow-[0_4px_20px_rgba(220,38,38,0.25)]' },
    { title: 'SQL / DB', icon: Database, colorClass: 'text-blue-600', bgClass: 'bg-blue-100', borderClass: 'border-blue-200', glowClass: 'shadow-[0_4px_20px_rgba(37,99,235,0.25)]' },
    { title: 'Confluence', icon: Layers, colorClass: 'text-indigo-600', bgClass: 'bg-indigo-100', borderClass: 'border-indigo-200', glowClass: 'shadow-[0_4px_20px_rgba(79,70,229,0.25)]' },
    { title: 'Google Drive', icon: FileBox, colorClass: 'text-[#34A853]', bgClass: 'bg-[#34A853]/15', borderClass: 'border-[#34A853]/30', glowClass: 'shadow-[0_4px_20px_rgba(52,168,83,0.25)]' },
    { title: 'Emails', icon: Mail, colorClass: 'text-sky-600', bgClass: 'bg-sky-100', borderClass: 'border-sky-200', glowClass: 'shadow-[0_4px_20px_rgba(2,132,199,0.25)]' },
    { title: 'CRM', icon: Users, colorClass: 'text-violet-600', bgClass: 'bg-violet-100', borderClass: 'border-violet-200', glowClass: 'shadow-[0_4px_20px_rgba(124,58,237,0.25)]' },
    { title: 'APIs', icon: Code, colorClass: 'text-cyan-600', bgClass: 'bg-cyan-100', borderClass: 'border-cyan-200', glowClass: 'shadow-[0_4px_20px_rgba(8,145,178,0.25)]' },
  ] as KnowledgeSourceItem[],
};
