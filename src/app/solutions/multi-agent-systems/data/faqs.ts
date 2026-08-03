export const faqs = [
  {
    id: 1,
    serial: "question 01",
    question:
      "When is a multi-agent system the right architecture vs a single agent or workflow?",
    answer:
      "Use multi-agent when work needs specialization and handoffs across tools, departments, or decision points. Prefer a single agent or a linear workflow when the path is simple, low-risk, and does not require parallel roles coordinating shared state.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "What is a multi-agent system, and how does Softree build one?",
    answer:
      "A multi-agent system is a team of specialized AI agents that plan, negotiate, and execute together under an orchestration layer. Softree designs role contracts, shared memory, tool access, governance gates, and production operations so agent teams finish enterprise work reliably.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How do you stop agents from conflicting, looping, or stalling?",
    answer:
      "We use role contracts, shared state, orchestration graphs, confidence thresholds, loop detection, and human approval on high-risk actions. Monitoring flags stalled runs so operators can intervene before cost or cycle time spirals.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How is security and compliance handled in multi-agent systems?",
    answer:
      "Entra ID / SSO, RBAC, encrypted traffic, audit logging, permission-aware retrieval, and scoped tool access per agent are baseline controls. We align governance to your compliance requirements before production deployment.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What do you need from our team to start a multi-agent engagement?",
    answer:
      "Access to target systems or sandboxes, sample workflows, decision owners for approvals, and clear success metrics. Discovery typically takes one to two weeks before a pilot agent graph is scoped and prioritized.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "What does a typical multi-agent project timeline look like?",
    answer:
      "Most programs move from discovery to a pilot agent team in roughly four to eight weeks, then harden integrations and governance before production rollout with evaluation and cost monitoring. Length depends on system count and risk tier.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "Who owns the agents and IP after go-live?",
    answer:
      "You own the IP and production environment. Softree can provide runbooks, training, and optional managed monitoring, prompt and graph optimization, and knowledge updates so your team can operate and extend the system.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "Which stacks do Softree multi-agent systems typically integrate?",
    answer:
      "Microsoft 365, Dynamics 365, SharePoint, Teams, Azure OpenAI / AI Foundry, Power Platform, CRMs, ERPs, REST APIs, and databases—wired into one governed orchestration layer with shared context across agents.",
  },
];
