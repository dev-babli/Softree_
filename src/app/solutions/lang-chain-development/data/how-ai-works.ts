const base = '/images/solutions/lang-chain-development';

export const workflowSteps = [
  {
    id: '01',
    title: 'LangChain Strategy & Use Cases',
    description:
      'We identify high-ROI LangChain use cases, select models and retrieval patterns, and design an architecture aligned to your data estate and compliance needs.',
    icon: 'search-document',
    image: `${base}/delivery-process/dp-01.jpg?v=dp-1`,
  },
  {
    id: '02',
    title: 'Chains, Agents & Prompt Engineering',
    description:
      'We build production LangChain apps—LCEL chains, LangGraph agents, tools, and APIs—with evaluation harnesses for quality, latency, and cost.',
    icon: 'development',
    image: `${base}/delivery-process/dp-02.jpg?v=dp-1`,
  },
  {
    id: '03',
    title: 'RAG, Tools & Enterprise Integrations',
    description:
      'We ground chains with vector stores, document loaders, and enterprise APIs so answers stay accurate, permission-aware, and auditable.',
    icon: 'workflow',
    image: `${base}/delivery-process/dp-03.jpg?v=dp-1`,
  },
  {
    id: '04',
    title: 'Deploy, Observe & Continuous Optimization',
    description:
      'We harden guardrails, LangSmith tracing, and CI eval suites—then tune tokens, caching, and model choice for production ROI.',
    icon: 'analytics',
    image: `${base}/delivery-process/dp-04.jpg?v=dp-1`,
  },
];
