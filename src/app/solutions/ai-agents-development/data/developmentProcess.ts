import {
  Search, GitMerge, Lightbulb, Database, Target, Map,
  PenTool, Workflow, MessageSquare, Book, ShieldCheck, Plug,
  Cpu, Layers, Wrench, BrainCircuit, Server, Network,
  TestTube, MessageCircle, CheckCircle, Shield, Gauge, UserCheck,
  Rocket, Cloud, Activity, Lock, Link, Users,
  LineChart, TrendingUp, Sparkles, RefreshCcw, DollarSign, GraduationCap
} from 'lucide-react';

export const developmentProcessData = {
  badge: 'AI AGENT DEVELOPMENT PROCESS',
  heading: {
    prefix: 'Our Proven ',
    highlight: 'AI Agent Development Process',
    suffix: '',
  },
  subheading: 'From discovery to continuous optimization, our structured AI agent development methodology ensures secure, scalable, and production-ready enterprise AI solutions.',
  tabs: [
    '01 Discovery',
    '02 Solution Design',
    '03 AI Development',
    '04 Testing & Validation',
    '05 Deployment',
    '06 Continuous Optimization',
  ] as const,
  capabilities: {
    '01 Discovery': [
      { name: 'Business Requirement Analysis', icon: Search },
      { name: 'Process Mapping', icon: GitMerge },
      { name: 'AI Opportunity Assessment', icon: Lightbulb },
      { name: 'Data & System Audit', icon: Database },
      { name: 'Success Metrics', icon: Target },
      { name: 'Project Roadmap', icon: Map },
    ],
    '02 Solution Design': [
      { name: 'AI Architecture', icon: PenTool },
      { name: 'Agent Workflow Design', icon: Workflow },
      { name: 'Prompt Engineering', icon: MessageSquare },
      { name: 'Knowledge Base Planning', icon: Book },
      { name: 'Security Design', icon: ShieldCheck },
      { name: 'Integration Planning', icon: Plug },
    ],
    '03 AI Development': [
      { name: 'LLM Integration', icon: Cpu },
      { name: 'RAG Implementation', icon: Layers },
      { name: 'Tool Calling', icon: Wrench },
      { name: 'Memory Management', icon: BrainCircuit },
      { name: 'API Integration', icon: Server },
      { name: 'Multi-Agent Workflows', icon: Network },
    ],
    '04 Testing & Validation': [
      { name: 'Functional Testing', icon: TestTube },
      { name: 'Prompt Evaluation', icon: MessageCircle },
      { name: 'Hallucination Reduction', icon: CheckCircle },
      { name: 'Security Testing', icon: Shield },
      { name: 'Performance Benchmarking', icon: Gauge },
      { name: 'User Acceptance Testing', icon: UserCheck },
    ],
    '05 Deployment': [
      { name: 'Production Deployment', icon: Rocket },
      { name: 'Cloud Infrastructure', icon: Cloud },
      { name: 'Monitoring Setup', icon: Activity },
      { name: 'Authentication', icon: Lock },
      { name: 'Enterprise Integration', icon: Link },
      { name: 'User Enablement', icon: Users },
    ],
    '06 Continuous Optimization': [
      { name: 'AI Performance Monitoring', icon: LineChart },
      { name: 'Model Improvements', icon: TrendingUp },
      { name: 'Prompt Optimization', icon: Sparkles },
      { name: 'Knowledge Base Updates', icon: RefreshCcw },
      { name: 'Cost Optimization', icon: DollarSign },
      { name: 'Continuous Learning', icon: GraduationCap },
    ],
  }
};
