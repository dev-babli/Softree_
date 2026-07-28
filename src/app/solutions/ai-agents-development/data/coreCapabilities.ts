import { 
  IconBrain, IconDatabase, IconApi, IconMessageCircle, IconUserCheck, IconShieldLock,
  IconChartBar, IconTrendingUp, IconServer, IconRobot, IconActivity, IconLock
} from '@tabler/icons-react';

export const coreCapabilitiesData = [
  {
    id: '01',
    title: 'LLM Integration',
    shortDesc: 'Integrate OpenAI, Claude, Gemini, Azure OpenAI, and other enterprise LLMs into intelligent AI agents.',
    icon: IconBrain,
    color: 'bg-indigo-100 text-indigo-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/llm-integration.jpg',
    description: 'We help enterprises integrate the most powerful foundation models, ensuring the right LLM is used for the right task to balance performance, cost, and latency.',
    highlights: [
      {
        title: 'Multi-Model Orchestration',
        desc: 'Seamlessly route tasks to optimal LLMs based on complexity.',
        icon: IconRobot
      },
      {
        title: 'Prompt Engineering',
        desc: 'Optimizing inputs for high-accuracy and reliable outputs.',
        icon: IconMessageCircle
      },
      {
        title: 'Model Fine-Tuning',
        desc: 'Customizing foundation models on enterprise datasets.',
        icon: IconTrendingUp
      }
    ],
    illustration: 'strategy',
    kpis: [
      { label: 'Models Supported', value: '10+' },
      { label: 'Latency Reduced', value: '40%' },
      { label: 'API Uptime', value: '99.9%' },
      { label: 'Cost Optimized', value: 'Yes' }
    ]
  },
  {
    id: '02',
    title: 'Retrieval Augmented Generation (RAG)',
    shortDesc: 'Provide AI agents with secure, real-time access to enterprise knowledge and documentation.',
    icon: IconDatabase,
    color: 'bg-emerald-100 text-emerald-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/rag-integration.jpg',
    description: 'Eliminate AI hallucinations by grounding your agents in proprietary enterprise data using advanced RAG architectures and vector databases.',
    highlights: [
      {
        title: 'Vector Search Indexing',
        desc: 'High-speed semantic retrieval across petabytes of data.',
        icon: IconDatabase
      },
      {
        title: 'Data Ingestion Pipelines',
        desc: 'Automated syncing of documents, wikis, and databases.',
        icon: IconServer
      },
      {
        title: 'Contextual Grounding',
        desc: 'Ensuring 100% accurate, cited, and trustworthy responses.',
        icon: IconChartBar
      }
    ],
    illustration: 'architecture',
    kpis: [
      { label: 'Hallucinations', value: '0%' },
      { label: 'Data Synced', value: 'Real-time' },
      { label: 'Search Speed', value: '<50ms' },
      { label: 'Sources', value: 'Unlimited' }
    ]
  },
  {
    id: '03',
    title: 'Tool Calling & API Integration',
    shortDesc: 'Connect AI agents with CRMs, ERPs, Microsoft 365, databases, REST APIs, and business applications.',
    icon: IconApi,
    color: 'bg-violet-100 text-violet-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/api-integration.jpg',
    description: 'Empower your AI agents to take autonomous action by equipping them with the ability to call external APIs, trigger workflows, and modify records.',
    highlights: [
      {
        title: 'API Orchestration',
        desc: 'Securely executing REST and GraphQL endpoints.',
        icon: IconApi
      },
      {
        title: 'Enterprise System Sync',
        desc: 'Direct integration with Salesforce, SAP, and custom apps.',
        icon: IconServer
      },
      {
        title: 'Autonomous Execution',
        desc: 'Executing multi-step processes without human intervention.',
        icon: IconActivity
      }
    ],
    illustration: 'automation',
    kpis: [
      { label: 'Integrations', value: '200+' },
      { label: 'Action Success', value: '99%' },
      { label: 'Workflow Speed', value: '10x' },
      { label: 'Manual Tasks', value: '-80%' }
    ]
  },
  {
    id: '04',
    title: 'Memory & Context Management',
    shortDesc: 'Enable conversational memory, user context, and personalized AI interactions across sessions.',
    icon: IconMessageCircle,
    color: 'bg-amber-100 text-amber-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/memory-context.jpg',
    description: 'Build sophisticated agents that remember past interactions, understand user preferences, and maintain deep conversational context across multiple sessions.',
    highlights: [
      {
        title: 'Persistent Memory',
        desc: 'Storing and recalling cross-session interaction history.',
        icon: IconDatabase
      },
      {
        title: 'Context Window Optimization',
        desc: 'Efficiently packing tokens for maximum context retention.',
        icon: IconChartBar
      },
      {
        title: 'Personalized Experiences',
        desc: 'Tailoring responses based on historical user behavior.',
        icon: IconUserCheck
      }
    ],
    illustration: 'microsoft',
    kpis: [
      { label: 'Context Length', value: '1M+' },
      { label: 'User Retention', value: '+35%' },
      { label: 'Satisfaction', value: '98%' },
      { label: 'Personalized', value: 'Yes' }
    ]
  },
  {
    id: '05',
    title: 'Human-in-the-Loop Workflows',
    shortDesc: 'Combine AI automation with human approvals for high-value enterprise processes.',
    icon: IconUserCheck,
    color: 'bg-blue-100 text-blue-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/human-in-loop.jpg',
    description: 'Ensure safety and compliance by routing complex decisions, high-risk actions, or edge cases to human operators before the AI proceeds.',
    highlights: [
      {
        title: 'Approval Gates',
        desc: 'Mandatory sign-offs for financial or sensitive actions.',
        icon: IconShieldLock
      },
      {
        title: 'Confidence Thresholds',
        desc: 'Automatically escalating low-confidence AI outputs.',
        icon: IconTrendingUp
      },
      {
        title: 'Seamless Handoffs',
        desc: 'Routing context-rich tickets directly to support teams.',
        icon: IconUserCheck
      }
    ],
    illustration: 'automation',
    kpis: [
      { label: 'Error Rate', value: '0%' },
      { label: 'Safety', value: '100%' },
      { label: 'Resolution', value: 'Fast' },
      { label: 'Oversight', value: 'Active' }
    ]
  },
  {
    id: '06',
    title: 'Security & Governance',
    shortDesc: 'Enterprise authentication, RBAC, compliance, monitoring, audit logs, and responsible AI controls.',
    icon: IconShieldLock,
    color: 'bg-pink-100 text-pink-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/security-governance.jpg',
    description: 'Deploy, monitor, optimize, and continuously improve AI agents using enterprise-grade observability, governance, and performance analytics.',
    highlights: [
      {
        title: 'AI Monitoring',
        desc: 'Track AI performance, latency, usage, and operational health.',
        icon: IconActivity
      },
      {
        title: 'Continuous Learning',
        desc: 'Improve AI agent quality through prompt refinement, evaluation, and knowledge updates.',
        icon: IconBrain
      },
      {
        title: 'Lifecycle Management',
        desc: 'Version, deploy, monitor, and scale enterprise AI agents with confidence.',
        icon: IconTrendingUp
      }
    ],
    illustration: 'security',
    kpis: [
      { label: 'Model Accuracy', value: '99%' },
      { label: 'Optimization Cycles', value: '24/7' },
      { label: 'Performance Gain', value: '30%' },
      { label: 'Cost Optimized', value: 'Yes' }
    ]
  }
];
