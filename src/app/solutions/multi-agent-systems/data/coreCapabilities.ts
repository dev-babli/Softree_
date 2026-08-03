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
  IconNetwork,
  IconUsersGroup,
  IconArrowsShuffle,
} from '@tabler/icons-react';

export const coreCapabilitiesData = [
  {
    id: '01',
    title: 'Multi-Agent Orchestration',
    shortDesc:
      'Coordinate specialized agents with planners, routers, and execution graphs that keep complex work moving reliably.',
    icon: IconNetwork,
    color: 'bg-indigo-100 text-indigo-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/llm-integration.jpg',
    description:
      'We design orchestration layers that decompose goals, assign work to the right agents, and resolve conflicts so multi-step processes complete with clear ownership and state.',
    highlights: [
      {
        title: 'Planner–Executor Graphs',
        desc: 'Structure agent collaboration with LangGraph, AutoGen, or Semantic Kernel patterns.',
        icon: IconRobot,
      },
      {
        title: 'Role Contracts',
        desc: 'Define responsibilities, tools, and escalation rules per agent.',
        icon: IconMessageCircle,
      },
      {
        title: 'Parallel Execution',
        desc: 'Run independent agent tasks concurrently to cut cycle time.',
        icon: IconTrendingUp,
      },
    ],
    illustration: 'strategy',
    kpis: [
      { label: 'Agents Coordinated', value: '2–20+' },
      { label: 'Cycle Time Cut', value: '45%' },
      { label: 'Handoff Errors', value: '-70%' },
      { label: 'Orchestration Uptime', value: '99.9%' },
    ],
  },
  {
    id: '02',
    title: 'Shared Memory & Context',
    shortDesc:
      'Give every agent a shared, permission-aware view of enterprise knowledge, session state, and prior decisions.',
    icon: IconDatabase,
    color: 'bg-emerald-100 text-emerald-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/rag-integration.jpg',
    description:
      'Eliminate contradictory agent behavior by grounding teams in shared RAG indexes, working memory, and audited state stores.',
    highlights: [
      {
        title: 'Team Working Memory',
        desc: 'Persist goals, intermediate results, and decisions across agents.',
        icon: IconDatabase,
      },
      {
        title: 'Permission-Aware RAG',
        desc: 'Retrieve only what each agent is allowed to see.',
        icon: IconServer,
      },
      {
        title: 'Cited Grounding',
        desc: 'Keep multi-agent answers auditable with source references.',
        icon: IconChartBar,
      },
    ],
    illustration: 'architecture',
    kpis: [
      { label: 'Context Sync', value: 'Real-time' },
      { label: 'Hallucinations', value: 'Near-zero' },
      { label: 'Retrieval Latency', value: '<50ms' },
      { label: 'Sources', value: 'Enterprise' },
    ],
  },
  {
    id: '03',
    title: 'Tool Mesh & API Actions',
    shortDesc:
      'Equip agent teams with secure tool calling across CRMs, ERPs, Microsoft 365, and custom APIs.',
    icon: IconApi,
    color: 'bg-violet-100 text-violet-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/api-integration.jpg',
    description:
      'Specialized agents take governed actions—create tickets, update records, trigger workflows—while orchestration enforces who can call what.',
    highlights: [
      {
        title: 'Scoped Tool Access',
        desc: 'Grant each agent only the APIs it needs.',
        icon: IconApi,
      },
      {
        title: 'Enterprise System Sync',
        desc: 'Integrate Salesforce, SAP, Dynamics, and custom apps.',
        icon: IconServer,
      },
      {
        title: 'Multi-Step Actions',
        desc: 'Chain agent actions into durable business workflows.',
        icon: IconActivity,
      },
    ],
    illustration: 'automation',
    kpis: [
      { label: 'Integrations', value: '200+' },
      { label: 'Action Success', value: '99%' },
      { label: 'Manual Tasks', value: '-80%' },
      { label: 'Workflow Speed', value: '10x' },
    ],
  },
  {
    id: '04',
    title: 'Inter-Agent Collaboration',
    shortDesc:
      'Enable agents to negotiate, escalate, and hand off work with structured protocols—not ad-hoc prompts.',
    icon: IconUsersGroup,
    color: 'bg-amber-100 text-amber-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/memory-context.jpg',
    description:
      'Build collaboration patterns where research, planning, and execution agents communicate with clear message schemas and conflict resolution.',
    highlights: [
      {
        title: 'Structured Messaging',
        desc: 'Typed handoffs between planner, critic, and executor agents.',
        icon: IconArrowsShuffle,
      },
      {
        title: 'Debate & Critique',
        desc: 'Use critic agents to improve quality before actions run.',
        icon: IconBrain,
      },
      {
        title: 'Escalation Paths',
        desc: 'Route ambiguous cases to supervisors or humans.',
        icon: IconUserCheck,
      },
    ],
    illustration: 'microsoft',
    kpis: [
      { label: 'Handoff Clarity', value: 'High' },
      { label: 'Rework Rate', value: '-55%' },
      { label: 'Decision Quality', value: '+40%' },
      { label: 'Loop Detection', value: 'Built-in' },
    ],
  },
  {
    id: '05',
    title: 'Human-in-the-Loop Governance',
    shortDesc:
      'Keep humans in control of high-risk multi-agent decisions with approvals, thresholds, and rich handoffs.',
    icon: IconUserCheck,
    color: 'bg-blue-100 text-blue-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/human-in-loop.jpg',
    description:
      'Route financial, legal, or safety-critical multi-agent outcomes to operators with full context before execution continues.',
    highlights: [
      {
        title: 'Approval Gates',
        desc: 'Mandatory sign-offs for sensitive multi-agent actions.',
        icon: IconShieldLock,
      },
      {
        title: 'Confidence Thresholds',
        desc: 'Escalate when agents disagree or confidence is low.',
        icon: IconTrendingUp,
      },
      {
        title: 'Context-Rich Handoffs',
        desc: 'Show operators the full agent trail and evidence.',
        icon: IconUserCheck,
      },
    ],
    illustration: 'automation',
    kpis: [
      { label: 'Risky Auto-Actions', value: '0%' },
      { label: 'Oversight', value: 'Active' },
      { label: 'Safety', value: '100%' },
      { label: 'Resolution', value: 'Fast' },
    ],
  },
  {
    id: '06',
    title: 'Security & Observability',
    shortDesc:
      'Monitor agent teams with audit trails, RBAC, cost controls, and responsible AI governance.',
    icon: IconShieldLock,
    color: 'bg-pink-100 text-pink-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/security-governance.jpg',
    description:
      'Operate multi-agent systems in production with enterprise authentication, logging, evaluation loops, and continuous optimization.',
    highlights: [
      {
        title: 'Agent Telemetry',
        desc: 'Track latency, cost, tool calls, and failure modes per agent.',
        icon: IconActivity,
      },
      {
        title: 'Continuous Evaluation',
        desc: 'Improve orchestration quality with evals and prompt/graph updates.',
        icon: IconBrain,
      },
      {
        title: 'Lifecycle Management',
        desc: 'Version, deploy, and scale agent teams with confidence.',
        icon: IconTrendingUp,
      },
    ],
    illustration: 'security',
    kpis: [
      { label: 'Audit Coverage', value: '100%' },
      { label: 'Optimization', value: '24/7' },
      { label: 'Cost Visibility', value: 'Per-agent' },
      { label: 'Governance', value: 'Enterprise' },
    ],
  },
];
