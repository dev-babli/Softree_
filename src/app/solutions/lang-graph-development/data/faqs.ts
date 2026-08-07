export const faqs = [
  {
    id: 1,
    serial: "question 01",
    question: "What is LangGraph development, and how does Softree deliver it?",
    answer:
      "LangGraph development means building production agent systems as stateful graphs—nodes, edges, checkpoints, multi-agent teams, tool calling, and human-in-the-loop controls. Softree covers strategy, architecture, engineering, observability, and ongoing optimization so solutions ship governed and measurable.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "When should we use LangGraph instead of simple LangChain chains?",
    answer:
      "Use LangGraph when workflows need cycles, durable state, multi-agent collaboration, or mid-run human approval. Simple LCEL chains fit linear RAG or single-pass tasks. Softree helps you choose—or combine—based on complexity and production requirements.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How do you keep multi-agent LangGraph systems under control?",
    answer:
      "We define clear agent roles, shared typed state, scoped tools, loop limits, token budgets, evaluation suites, and human approval for high-risk actions. LangSmith tracing makes every handoff and tool call auditable.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can LangGraph agents integrate with our CRM, ERP, and internal APIs?",
    answer:
      "Yes. We build scoped tool kits that connect agents to REST APIs, SQL databases, SaaS platforms, and custom services—with credential management, audit logging, and least-privilege access controls.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How do checkpoints and human-in-the-loop work in production?",
    answer:
      "LangGraph checkpoints persist graph state so runs can pause for approval, resume after failure, or continue across sessions. Softree designs approval UX, timeout policies, and recovery paths that fit your compliance and ops model.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "How do you monitor and evaluate LangGraph apps in production?",
    answer:
      "We instrument graphs with LangSmith tracing, automated eval suites in CI/CD, token cost dashboards, and regression tests against golden datasets. Continuous monitoring helps catch drift, loops, latency spikes, and quality regressions before users do.",
  },
];
