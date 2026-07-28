import { 
  IconBrain, IconCloud, IconHierarchy, IconShieldCheck, IconApps, IconChartLine,
  IconTargetArrow, IconChartBar, IconMap, IconServer, IconDatabase, IconBlocks,
  IconRobot, IconListCheck, IconBolt, IconShield, IconLock, IconChecklist,
  IconBrandAzure, IconMessageChatbot, IconDashboard, IconActivity, IconBulb, IconTrendingUp
} from '@tabler/icons-react';

export const coreCapabilitiesData = [
  {
    id: '01',
    title: 'AI Strategy & Consulting',
    shortDesc: 'Helping organizations identify high-value AI opportunities and define enterprise AI roadmaps.',
    icon: IconBrain,
    color: 'bg-indigo-100 text-indigo-600',
    image: '/images/ai-development-services/core-capabilities/ai-strategy.png',
    description: 'We help enterprises define the right AI strategy, identify high-impact use cases, and build a roadmap for sustainable AI transformation.',
    highlights: [
      {
        title: 'Business-Aligned AI Strategy',
        desc: 'Aligning AI initiatives with business goals for measurable impact.',
        icon: IconTargetArrow
      },
      {
        title: 'Use Case Prioritization',
        desc: 'Identifying high-value opportunities for maximum ROI.',
        icon: IconChartBar
      },
      {
        title: 'AI Transformation Roadmap',
        desc: 'Building a clear, scalable roadmap for long-term success.',
        icon: IconMap
      }
    ],
    illustration: 'strategy',
    kpis: [
      { label: 'AI Projects Delivered', value: '200+' },
      { label: 'Enterprise Readiness', value: '98%' },
      { label: 'Operational Reliability', value: '24/7' },
      { label: 'Microsoft Technology Stack', value: '100%' }
    ]
  },
  {
    id: '02',
    title: 'Enterprise AI Architecture',
    shortDesc: 'Designing scalable, secure, cloud-native AI platforms for long-term business growth.',
    icon: IconCloud,
    color: 'bg-emerald-100 text-emerald-600',
    image: '/images/ai-development-services/core-capabilities/enterprise-ai-architecture.png',
    description: 'Design resilient AI architectures using Azure AI, cloud-native infrastructure, APIs, enterprise data platforms, and scalable deployment models.',
    highlights: [
      {
        title: 'Cloud-native Architecture',
        desc: 'Building resilient foundations for modern AI applications.',
        icon: IconServer
      },
      {
        title: 'Enterprise Data Integration',
        desc: 'Connecting fragmented data silos into unified platforms.',
        icon: IconDatabase
      },
      {
        title: 'Modular AI Platforms',
        desc: 'Designing scalable systems that grow with your enterprise.',
        icon: IconBlocks
      }
    ],
    illustration: 'architecture',
    kpis: [
      { label: 'Cloud Deployments', value: '100%' },
      { label: 'Scalability', value: '10x' },
      { label: 'Data Processing', value: 'Petabytes' },
      { label: 'Uptime', value: '99.99%' }
    ]
  },
  {
    id: '03',
    title: 'Intelligent Automation',
    shortDesc: 'Automating business processes using AI Agents, Copilot, and enterprise workflows.',
    icon: IconHierarchy,
    color: 'bg-violet-100 text-violet-600',
    image: '/images/ai-development-services/core-capabilities/intelligent-automation.png',
    description: 'Build AI-powered workflows that automate repetitive business processes using Microsoft Copilot, AI Agents, Power Automate, and intelligent decision engines.',
    highlights: [
      {
        title: 'AI Agents',
        desc: 'Deploying autonomous agents for complex task resolution.',
        icon: IconRobot
      },
      {
        title: 'Workflow Automation',
        desc: 'Streamlining operations to eliminate manual overhead.',
        icon: IconListCheck
      },
      {
        title: 'Process Optimization',
        desc: 'Continuously refining business logic for peak efficiency.',
        icon: IconBolt
      }
    ],
    illustration: 'automation',
    kpis: [
      { label: 'Processes Automated', value: '500+' },
      { label: 'Hours Saved', value: '2M+' },
      { label: 'Accuracy', value: '99.9%' },
      { label: 'Cost Reduction', value: '40%' }
    ]
  },
  {
    id: '04',
    title: 'Secure AI & Governance',
    shortDesc: 'Implementing responsible AI with enterprise-grade security, compliance, and governance.',
    icon: IconShieldCheck,
    color: 'bg-amber-100 text-amber-600',
    image: '/images/ai-development-services/core-capabilities/secure-ai-governance.png',
    description: 'Ensure every AI solution follows enterprise governance, compliance, privacy, security, and responsible AI principles.',
    highlights: [
      {
        title: 'Responsible AI',
        desc: 'Ensuring ethical, unbiased, and transparent AI models.',
        icon: IconShield
      },
      {
        title: 'Enterprise Security',
        desc: 'Protecting intellectual property and sensitive data.',
        icon: IconLock
      },
      {
        title: 'Compliance Framework',
        desc: 'Adhering to strict global regulatory requirements.',
        icon: IconChecklist
      }
    ],
    illustration: 'security',
    kpis: [
      { label: 'Data Breaches', value: '0' },
      { label: 'Compliance Audits', value: 'Passed' },
      { label: 'Data Encrypted', value: '100%' },
      { label: 'Risk Mitigated', value: '99%' }
    ]
  },
  {
    id: '05',
    title: 'Microsoft AI Ecosystem',
    shortDesc: 'Integrating Azure AI, Microsoft Copilot, Power Platform, Microsoft 365, and Dynamics 365.',
    icon: IconApps,
    color: 'bg-blue-100 text-blue-600',
    image: '/images/ai-development-services/core-capabilities/microsoft-ai-ecosystem.png',
    description: 'Deliver fully integrated enterprise AI using Microsoft Azure AI, Copilot, Microsoft Fabric, Power Platform, Dynamics 365, and Microsoft 365.',
    highlights: [
      {
        title: 'Azure AI',
        desc: 'Leveraging world-class enterprise AI services.',
        icon: IconBrandAzure
      },
      {
        title: 'Copilot Integration',
        desc: 'Embedding intelligent assistants directly into workflows.',
        icon: IconMessageChatbot
      },
      {
        title: 'Power Platform',
        desc: 'Accelerating low-code AI development for rapid delivery.',
        icon: IconDashboard
      }
    ],
    illustration: 'microsoft',
    kpis: [
      { label: 'Ecosystems Integrated', value: '100%' },
      { label: 'User Adoption', value: '85%' },
      { label: 'Seamless Workflows', value: 'Yes' },
      { label: 'Deployment Time', value: '-50%' }
    ]
  },
  {
    id: '06',
    title: 'Continuous Optimization',
    shortDesc: 'Monitoring, improving, and evolving AI solutions through analytics and continuous innovation.',
    icon: IconChartLine,
    color: 'bg-pink-100 text-pink-600',
    image: '/images/ai-development-services/core-capabilities/continuous-optimization.png',
    description: 'Continuously monitor AI performance, improve accuracy, optimize costs, and evolve enterprise AI systems using real-time analytics.',
    highlights: [
      {
        title: 'AI Performance Monitoring',
        desc: 'Tracking model drift and operational metrics in real-time.',
        icon: IconActivity
      },
      {
        title: 'Continuous Learning',
        desc: 'Retraining models for perpetual capability enhancement.',
        icon: IconBulb
      },
      {
        title: 'Lifecycle Optimization',
        desc: 'Maximizing ROI across the entire AI software lifecycle.',
        icon: IconTrendingUp
      }
    ],
    illustration: 'optimization',
    kpis: [
      { label: 'Model Accuracy', value: '99%' },
      { label: 'Optimization Cycles', value: '24/7' },
      { label: 'Performance Gain', value: '30%' },
      { label: 'Cost Optimized', value: 'Yes' }
    ]
  }
];
