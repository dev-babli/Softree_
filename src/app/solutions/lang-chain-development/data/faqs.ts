export const faqs = [
  {
    id: 1,
    serial: "question 01",
    question: "What is LangChain development, and how does Softree deliver it?",
    answer:
      "LangChain development means building production AI applications using LangChain and LangGraph—RAG chains, agents, tool calling, memory, and evaluation harnesses. Softree covers strategy, architecture, engineering, observability, and ongoing optimization so solutions ship governed and measurable.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "When should we use LangChain vs. LangGraph?",
    answer:
      "LangChain excels at composable chains, retrievers, and tool kits for linear or branching workflows. LangGraph adds stateful, cyclic agent orchestration with checkpoints and human-in-the-loop. Softree helps you choose—or combine—based on workflow complexity and production requirements.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How do you prevent hallucinations in LangChain RAG apps?",
    answer:
      "We ground responses with hybrid retrieval, permission-aware document loaders, constrained tool scopes, evaluation suites, and human approval for high-risk actions. Output guardrails and prompt policies further reduce unsafe or off-policy responses.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Which vector stores and models do you support?",
    answer:
      "We work with Pinecone, pgvector, Chroma, Weaviate, and cloud-native options—paired with OpenAI, Anthropic, Azure OpenAI, and other providers. Softree selects the stack based on latency, cost, compliance, and your existing infrastructure.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Can LangChain agents integrate with our CRM, ERP, and internal APIs?",
    answer:
      "Yes. We build scoped tool kits that connect agents to REST APIs, SQL databases, SaaS platforms, and custom services—with credential management, audit logging, and least-privilege access controls.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "How do you monitor and evaluate LangChain apps in production?",
    answer:
      "We instrument chains with LangSmith tracing, automated eval suites in CI/CD, token cost dashboards, and regression tests against golden datasets. Continuous monitoring helps catch drift, latency spikes, and quality regressions before users do.",
  },
];
