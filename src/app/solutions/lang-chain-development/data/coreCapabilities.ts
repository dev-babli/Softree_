import {
  IconDatabase,
  IconApi,
  IconUserCheck,
  IconShieldLock,
  IconChartBar,
  IconTrendingUp,
  IconServer,
  IconRobot,
  IconActivity,
  IconSearch,
  IconGitBranch,
  IconPlugConnected,
} from '@tabler/icons-react';

export const coreCapabilitiesData = [
  {
    id: '01',
    title: 'LangChain Apps & APIs',
    shortDesc:
      'Production LangChain applications—LCEL chains, streaming APIs, and backend services with evaluation and cost controls.',
    icon: IconApi,
    color: 'bg-indigo-100 text-indigo-600',
    image: '/images/solutions/lang-chain-development/core-capabilities/cap-01-apps-apis.jpg?v=lc-cap-2',
    description:
      'We design and ship LangChain solutions that compose the right models, retrievers, and tools for each task—streaming when needed and exposing clean APIs your products and teams can trust.',
    highlights: [
      {
        title: 'LCEL & Runnable Chains',
        desc: 'Composable pipelines with typed inputs, outputs, and batching.',
        icon: IconGitBranch,
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
    title: 'Enterprise RAG with LangChain',
    shortDesc:
      'Ground LangChain chains in vector stores, document loaders, and enterprise APIs so answers stay accurate and permission-aware.',
    icon: IconSearch,
    color: 'bg-emerald-100 text-emerald-600',
    image: '/images/solutions/lang-chain-development/core-capabilities/cap-02-rag.jpg?v=lc-cap-2',
    description:
      'Eliminate guesswork by retrieving only approved, permissioned content—with citations, chunking strategies, and continuous index hygiene built into LangChain retrievers.',
    highlights: [
      {
        title: 'Hybrid Retrieval',
        desc: 'Vector + keyword search tuned for your corpora.',
        icon: IconSearch,
      },
      {
        title: 'Permission-Aware RAG',
        desc: 'Respect ACLs and tenant boundaries at query time.',
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
    title: 'LangGraph Multi-Agent Workflows',
    shortDesc:
      'Orchestrate specialized agents with LangGraph—stateful graphs, human-in-the-loop checkpoints, and coordinated handoffs.',
    icon: IconGitBranch,
    color: 'bg-orange-100 text-orange-600',
    image: '/images/solutions/lang-chain-development/core-capabilities/cap-03-langgraph.jpg?v=lc-cap-2',
    description:
      'We embed LangGraph agents where work happens—research, support, ops, and sales—with governed actions, shared memory, and clear escalation paths.',
    highlights: [
      {
        title: 'Stateful Graphs',
        desc: 'Nodes, edges, and conditional routing for complex flows.',
        icon: IconGitBranch,
      },
      {
        title: 'Multi-Agent Teams',
        desc: 'Specialized agents that collaborate with scoped permissions.',
        icon: IconRobot,
      },
      {
        title: 'Human-in-the-Loop',
        desc: 'Approval gates before irreversible business actions.',
        icon: IconUserCheck,
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
    title: 'Tool Calling & Integrations',
    shortDesc:
      'Connect LangChain agents to CRM, ERP, databases, and internal APIs with scoped tools and secure credential handling.',
    icon: IconPlugConnected,
    color: 'bg-red-100 text-red-600',
    image: '/images/solutions/lang-chain-development/core-capabilities/cap-04-tools.jpg?v=lc-cap-2',
    description:
      'Softree wires LangChain tool kits to your systems—REST APIs, SQL, SaaS connectors, and custom functions—with least-privilege access from day one.',
    highlights: [
      {
        title: 'Structured Tool Schemas',
        desc: 'Typed inputs and outputs for reliable agent actions.',
        icon: IconApi,
      },
      {
        title: 'Enterprise Connectors',
        desc: 'CRM, ERP, ticketing, and data warehouse integrations.',
        icon: IconDatabase,
      },
      {
        title: 'Scoped Credentials',
        desc: 'Secrets management and per-tool permission boundaries.',
        icon: IconShieldLock,
      },
    ],
    illustration: 'security',
    kpis: [
      { label: 'Tool Coverage', value: 'Full' },
      { label: 'Action Latency', value: '<2s' },
      { label: 'Audit Trails', value: 'On' },
      { label: 'Scope Controls', value: 'Enabled' },
    ],
  },
  {
    id: '05',
    title: 'Memory, State & Observability',
    shortDesc:
      'Persist conversation state, checkpoint LangGraph runs, and trace chains with LangSmith for production visibility.',
    icon: IconActivity,
    color: 'bg-violet-100 text-violet-600',
    image: '/images/solutions/lang-chain-development/core-capabilities/cap-05-observability.jpg?v=lc-cap-2',
    description:
      'Production LangChain needs visibility. We instrument runs, set token budgets, and tune prompts and models so spend tracks business value.',
    highlights: [
      {
        title: 'Conversation Memory',
        desc: 'Short-term buffers and long-term vector memory stores.',
        icon: IconDatabase,
      },
      {
        title: 'LangSmith Tracing',
        desc: 'End-to-end spans for chains, tools, and retrievers.',
        icon: IconActivity,
      },
      {
        title: 'Token Telemetry',
        desc: 'Track cost by app, team, and use case.',
        icon: IconChartBar,
      },
    ],
    illustration: 'observability',
    kpis: [
      { label: 'Cost Visibility', value: 'Full' },
      { label: 'Avg Latency', value: 'Tuned' },
      { label: 'Trace Coverage', value: '100%' },
      { label: 'Model Mix', value: 'Optimized' },
    ],
  },
  {
    id: '06',
    title: 'Evaluation & Guardrails',
    shortDesc:
      'Automated eval suites, output validators, and guardrail chains to keep LangChain apps safe and on-policy in production.',
    icon: IconShieldLock,
    color: 'bg-cyan-100 text-cyan-600',
    image: '/images/solutions/lang-chain-development/core-capabilities/cap-06-guardrails.jpg?v=lc-cap-2',
    description:
      'Ship with confidence—regression tests, golden datasets, toxicity filters, and human review loops for high-risk outputs.',
    highlights: [
      {
        title: 'Eval Harnesses',
        desc: 'Regression suites tied to CI/CD before every release.',
        icon: IconTrendingUp,
      },
      {
        title: 'Output Guardrails',
        desc: 'Validators, classifiers, and policy filters on responses.',
        icon: IconShieldLock,
      },
      {
        title: 'Human-in-the-Loop',
        desc: 'Approval gates for irreversible business actions.',
        icon: IconUserCheck,
      },
    ],
    illustration: 'automation',
    kpis: [
      { label: 'Eval Pass Rate', value: '95%+' },
      { label: 'Guardrail Coverage', value: 'Full' },
      { label: 'Review Gates', value: 'Configurable' },
      { label: 'Release Confidence', value: 'High' },
    ],
  },
];
