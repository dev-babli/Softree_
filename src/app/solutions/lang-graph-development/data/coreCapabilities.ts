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
    title: 'Stateful LangGraph Workflows',
    shortDesc:
      'Design production LangGraph graphs—nodes, edges, conditional routing, and checkpoints for complex agent flows.',
    icon: IconGitBranch,
    color: 'bg-indigo-100 text-indigo-600',
    image: '/images/solutions/lang-graph-development/core-capabilities/cap-01-graphs.jpg?v=lg-cap-2',
    description:
      'We design and ship LangGraph solutions that model real business processes as durable graphs—with typed state, branching logic, retries, and resumable runs your teams can trust in production.',
    highlights: [
      {
        title: 'Nodes, Edges & Routing',
        desc: 'Conditional paths and cycles for non-linear agent workflows.',
        icon: IconGitBranch,
      },
      {
        title: 'Checkpoints & Resume',
        desc: 'Persist state so long-running jobs recover cleanly.',
        icon: IconDatabase,
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
      { label: 'Graph Uptime', value: '99.9%' },
      { label: 'Eval Coverage', value: '100%' },
      { label: 'State Durability', value: 'Full' },
    ],
  },
  {
    id: '02',
    title: 'Multi-Agent LangGraph Teams',
    shortDesc:
      'Orchestrate specialized agents with LangGraph—shared state, handoffs, and coordinated tool use under clear roles.',
    icon: IconRobot,
    color: 'bg-orange-100 text-orange-600',
    image: '/images/solutions/lang-graph-development/core-capabilities/cap-02-agents.jpg?v=lg-cap-2',
    description:
      'We embed multi-agent LangGraph teams where work happens—research, support, ops, and sales—with governed actions, shared memory, and clear escalation paths.',
    highlights: [
      {
        title: 'Specialized Agents',
        desc: 'Planner, researcher, executor, and reviewer roles.',
        icon: IconRobot,
      },
      {
        title: 'Coordinated Handoffs',
        desc: 'Shared state and messages across agent nodes.',
        icon: IconGitBranch,
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
    id: '03',
    title: 'Tool Calling & Integrations',
    shortDesc:
      'Connect LangGraph agents to CRM, ERP, databases, and internal APIs with scoped tools and secure credential handling.',
    icon: IconPlugConnected,
    color: 'bg-red-100 text-red-600',
    image: '/images/solutions/lang-graph-development/core-capabilities/cap-03-tools.jpg?v=lg-cap-2',
    description:
      'Softree wires LangGraph tool kits to your systems—REST APIs, SQL, SaaS connectors, and custom functions—with least-privilege access from day one.',
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
    id: '04',
    title: 'Memory, State & Checkpoints',
    shortDesc:
      'Persist conversation state, checkpoint LangGraph runs, and resume long workflows without losing context.',
    icon: IconDatabase,
    color: 'bg-emerald-100 text-emerald-600',
    image: '/images/solutions/lang-graph-development/core-capabilities/cap-04-state.jpg?v=lg-cap-2',
    description:
      'Production LangGraph needs durable state. We design memory stores, thread-level checkpoints, and recovery patterns so agent runs survive failures and scale across sessions.',
    highlights: [
      {
        title: 'Conversation Memory',
        desc: 'Short-term buffers and long-term vector memory stores.',
        icon: IconDatabase,
      },
      {
        title: 'Thread Checkpoints',
        desc: 'Resume graphs mid-flight after pause or failure.',
        icon: IconServer,
      },
      {
        title: 'Shared Agent State',
        desc: 'Typed state schemas across multi-agent teams.',
        icon: IconGitBranch,
      },
    ],
    illustration: 'architecture',
    kpis: [
      { label: 'State Durability', value: 'Full' },
      { label: 'Resume Success', value: 'High' },
      { label: 'Context Retention', value: 'Tuned' },
      { label: 'Recovery Paths', value: 'Built-in' },
    ],
  },
  {
    id: '05',
    title: 'RAG Inside LangGraph Flows',
    shortDesc:
      'Ground LangGraph agents in vector stores and enterprise APIs so retrieval, reasoning, and actions stay permission-aware.',
    icon: IconSearch,
    color: 'bg-violet-100 text-violet-600',
    image: '/images/solutions/lang-graph-development/core-capabilities/cap-05-rag.jpg?v=lg-cap-2',
    description:
      'Combine retrieval nodes with agent graphs—hybrid search, ACL-aware loaders, and cited answers—so LangGraph workflows act on approved knowledge only.',
    highlights: [
      {
        title: 'Retrieval Nodes',
        desc: 'Vector + keyword search as first-class graph steps.',
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
    illustration: 'observability',
    kpis: [
      { label: 'Grounded Answers', value: '90%+' },
      { label: 'Search Latency', value: '<800ms' },
      { label: 'ACL Enforcement', value: 'Yes' },
      { label: 'Index Freshness', value: 'Near-real' },
    ],
  },
  {
    id: '06',
    title: 'Evaluation, Observability & Guardrails',
    shortDesc:
      'LangSmith tracing, CI eval suites, and guardrail nodes to keep LangGraph apps safe and measurable in production.',
    icon: IconShieldLock,
    color: 'bg-cyan-100 text-cyan-600',
    image: '/images/solutions/lang-graph-development/core-capabilities/cap-06-evals.jpg?v=lg-cap-2',
    description:
      'Ship with confidence—trace every node, regress against golden datasets, and insert validators and human review for high-risk actions.',
    highlights: [
      {
        title: 'LangSmith Tracing',
        desc: 'End-to-end spans for nodes, tools, and retrievers.',
        icon: IconActivity,
      },
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
    ],
    illustration: 'automation',
    kpis: [
      { label: 'Eval Pass Rate', value: '95%+' },
      { label: 'Trace Coverage', value: '100%' },
      { label: 'Review Gates', value: 'Configurable' },
      { label: 'Release Confidence', value: 'High' },
    ],
  },
];
