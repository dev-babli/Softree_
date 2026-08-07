const base = '/images/solutions/lang-chain-development';

export const workflowSteps = [
  {
    id: '01',
    title: 'LCEL Chain & Agent Architecture',
    description: 'We design custom, type-safe LangChain Expression Language (LCEL) pipelines and stateful graph agents that seamlessly orchestrate reasoning loops and document processing.',
    icon: 'search-document',
    image: `${base}/delivery-process/dp-01.jpg?v=dp-1`,
  },
  {
    id: '02',
    title: 'High-Recall Retrieval-Augmented Generation',
    description: 'We build advanced, context-grounded RAG pipelines featuring semantic vector search, parent-document retrieval, and custom rerankers to eliminate model hallucinations.',
    icon: 'development',
    image: `${base}/delivery-process/dp-02.jpg?v=dp-1`,
  },
  {
    id: '03',
    title: 'Secure Tool Calling & API Bindings',
    description: 'We equip runnables with secure database connectors, third-party API toolkits, and Pydantic schemas to execute actions and parse structured outputs reliably.',
    icon: 'workflow',
    image: `${base}/delivery-process/dp-03.jpg?v=dp-1`,
  },
  {
    id: '04',
    title: 'Production Tracing, Evals & Optimization',
    description: 'We integrate complete LangSmith execution tracing, CI/CD regression evaluation suites, safety guardrails, and token-cost dashboards to scale safely.',
    icon: 'analytics',
    image: `${base}/delivery-process/dp-04.jpg?v=dp-1`,
  },
];
