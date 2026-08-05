import {
  IconBrain,
  IconDatabase,
  IconApi,
  IconMessageCircle,
  IconUserCheck,
  IconShieldLock,
  IconChartBar,
  IconTrendingUp,
  IconServer,
  IconRobot,
  IconActivity,
  IconCloud,
  IconSearch,
  IconKey,
} from '@tabler/icons-react';

export const coreCapabilitiesData = [
  {
    id: '01',
    title: 'Azure OpenAI Apps & APIs',
    shortDesc:
      'Production GPT applications on Azure—secure APIs, web experiences, and backend services with evaluation and cost controls.',
    icon: IconCloud,
    color: 'bg-indigo-100 text-indigo-600',
    image: '/images/solutions/azure-openai-development/core-capabilities/cap-01-apps-apis.jpg',
    description:
      'We design and ship Azure OpenAI solutions that call the right models for each task, stream responses when needed, and expose clean APIs your products and teams can trust.',
    highlights: [
      {
        title: 'Model Selection',
        desc: 'Match GPT and embedding models to latency, quality, and cost targets.',
        icon: IconBrain,
      },
      {
        title: 'Prompt & Tool Design',
        desc: 'Structured prompts, function calling, and safe tool scopes.',
        icon: IconRobot,
      },
      {
        title: 'Eval & Quality Gates',
        desc: 'Automated checks before every production release.',
        icon: IconTrendingUp,
      },
    ],
    illustration: 'strategy',
    kpis: [
      { label: 'Time to Pilot', value: '4–8 wks' },
      { label: 'API Uptime', value: '99.9%' },
      { label: 'Eval Coverage', value: '100%' },
      { label: 'Cost Visibility', value: 'Full' },
    ],
  },
  {
    id: '02',
    title: 'Enterprise RAG on Azure',
    shortDesc:
      'Ground Azure OpenAI in Azure AI Search, SharePoint, and Fabric so answers stay accurate and permission-aware.',
    icon: IconSearch,
    color: 'bg-emerald-100 text-emerald-600',
    image: '/images/solutions/azure-openai-development/core-capabilities/cap-02-rag.jpg',
    description:
      'Eliminate guesswork by retrieving only approved, permissioned content—with citations, chunking strategies, and continuous index hygiene.',
    highlights: [
      {
        title: 'Azure AI Search',
        desc: 'Hybrid and vector retrieval tuned for your corpora.',
        icon: IconSearch,
      },
      {
        title: 'Permission-Aware RAG',
        desc: 'Respect Entra groups and document ACLs at query time.',
        icon: IconServer,
      },
      {
        title: 'Cited Answers',
        desc: 'Keep outputs auditable with source references.',
        icon: IconChartBar,
      },
    ],
    illustration: 'architecture',
    kpis: [
      { label: 'Grounded Answers', value: '90%+' },
      { label: 'Search Latency', value: '<800ms' },
      { label: 'ACL Enforcement', value: 'Yes' },
      { label: 'Index Freshness', value: 'Near-real' },
    ],
  },
  {
    id: '03',
    title: 'Microsoft 365 & Dynamics Copilots',
    shortDesc:
      'Extend Teams, SharePoint, and Dynamics with Azure OpenAI copilots that act inside your Microsoft workflows.',
    icon: IconMessageCircle,
    color: 'bg-orange-100 text-orange-600',
    image: '/images/solutions/azure-openai-development/core-capabilities/cap-03-copilots.jpg',
    description:
      'We embed GPT experiences where work already happens—assistants for knowledge, sales, service, and operations with governed actions.',
    highlights: [
      {
        title: 'Teams & M365',
        desc: 'Side-panel and bot experiences connected to Graph.',
        icon: IconMessageCircle,
      },
      {
        title: 'Dynamics & Dataverse',
        desc: 'Copilots that read and write with scoped permissions.',
        icon: IconDatabase,
      },
      {
        title: 'Power Platform',
        desc: 'Low-code surfaces backed by Azure OpenAI services.',
        icon: IconApi,
      },
    ],
    illustration: 'automation',
    kpis: [
      { label: 'Adoption Lift', value: '3×' },
      { label: 'Task Time Cut', value: '40%' },
      { label: 'Human Handoffs', value: 'Clear' },
      { label: 'Action Safety', value: 'Gated' },
    ],
  },
  {
    id: '04',
    title: 'Security, Identity & Networking',
    shortDesc:
      'Entra ID, Key Vault, private endpoints, and content safety so Azure OpenAI stays enterprise-ready.',
    icon: IconShieldLock,
    color: 'bg-red-100 text-red-600',
    image: '/images/solutions/azure-openai-development/core-capabilities/cap-04-security.jpg',
    description:
      'Softree hardens Azure OpenAI deployments with identity, network isolation, secret management, and responsible AI controls from day one.',
    highlights: [
      {
        title: 'Entra SSO & RBAC',
        desc: 'Least-privilege access for users and service principals.',
        icon: IconKey,
      },
      {
        title: 'Private Networking',
        desc: 'Private Link and VNet patterns for regulated estates.',
        icon: IconShieldLock,
      },
      {
        title: 'Content Safety',
        desc: 'Filters and policies aligned to your risk profile.',
        icon: IconUserCheck,
      },
    ],
    illustration: 'security',
    kpis: [
      { label: 'SSO Coverage', value: '100%' },
      { label: 'Secrets in Vault', value: '100%' },
      { label: 'Audit Trails', value: 'On' },
      { label: 'Safety Filters', value: 'Enabled' },
    ],
  },
  {
    id: '05',
    title: 'Cost, Latency & Observability',
    shortDesc:
      'Monitor tokens, quality, and latency—then continuously optimize model mix and caching for ROI.',
    icon: IconActivity,
    color: 'bg-violet-100 text-violet-600',
    image: '/images/solutions/azure-openai-development/core-capabilities/cap-05-observability.jpg',
    description:
      'Production Azure OpenAI needs visibility. We instrument usage, set budgets, and tune prompts and models so spend tracks business value.',
    highlights: [
      {
        title: 'Token Telemetry',
        desc: 'Track cost by app, team, and use case.',
        icon: IconActivity,
      },
      {
        title: 'Model Routing',
        desc: 'Send simple tasks to cheaper models safely.',
        icon: IconTrendingUp,
      },
      {
        title: 'Azure Monitor',
        desc: 'Alerts on errors, latency spikes, and budget.',
        icon: IconChartBar,
      },
    ],
    illustration: 'microsoft',
    kpis: [
      { label: 'Cost Visibility', value: 'Full' },
      { label: 'Avg Latency', value: 'Tuned' },
      { label: 'Budget Alerts', value: 'Yes' },
      { label: 'Model Mix', value: 'Optimized' },
    ],
  },
  {
    id: '06',
    title: 'Document & Process Intelligence',
    shortDesc:
      'Combine Azure OpenAI with Document Intelligence and workflows to extract, summarize, and act on enterprise documents.',
    icon: IconDatabase,
    color: 'bg-cyan-100 text-cyan-600',
    image: '/images/solutions/azure-openai-development/core-capabilities/cap-06-documents.jpg',
    description:
      'Turn contracts, invoices, and SOPs into structured insight and guided actions—with human review where risk is high.',
    highlights: [
      {
        title: 'Document Intelligence',
        desc: 'Extract fields and structure before GPT reasoning.',
        icon: IconDatabase,
      },
      {
        title: 'Summaries & Q&A',
        desc: 'Fast comprehension over long enterprise documents.',
        icon: IconBrain,
      },
      {
        title: 'Human-in-the-Loop',
        desc: 'Approval gates for irreversible business actions.',
        icon: IconUserCheck,
      },
    ],
    illustration: 'automation',
    kpis: [
      { label: 'Doc Cycle Time', value: '-50%' },
      { label: 'Extraction Acc.', value: 'High' },
      { label: 'Review Gates', value: 'Configurable' },
      { label: 'Throughput', value: 'Scaled' },
    ],
  },
];
