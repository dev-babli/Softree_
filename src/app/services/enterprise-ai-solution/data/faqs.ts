export const faqs = [
  {
    id: 1,
    serial: "question 01",
    question:
      "What is an Enterprise AI Solution, and how is it different from a standalone AI tool?",
    answer:
      "An Enterprise AI Solution combines AI models with governed business data, secure identities, workflows, integrations, user experiences, evaluation, and monitoring. Unlike a standalone chatbot, it operates within enterprise architecture, respects existing permissions, connects to systems of record, supports auditability, and is engineered for reliability, scale, security, and measurable business outcomes.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "Which business processes are best suited for Enterprise AI Solutions?",
    answer:
      "Strong candidates involve high-volume knowledge work, repetitive decisions, document-heavy operations, fragmented enterprise knowledge, customer or employee support, forecasting, and cross-system workflows. Prioritization should consider business value, process frequency, data readiness, integration effort, user impact, risk, and whether success can be measured against a clear operational baseline.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How should an organization measure the value and ROI of enterprise AI?",
    answer:
      "Value should be measured against the workflow being improved, not model activity alone. Useful metrics include cycle time, cost per transaction, resolution time, automation rate, error reduction, employee capacity, conversion, compliance quality, and user adoption. A baseline, target outcome, evaluation plan, and accountable business owner should be defined before production investment.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How can enterprise data be used without exposing sensitive information?",
    answer:
      "Enterprise AI should preserve identity, authorization, data classification, residency, retention, and least-privilege controls across the full data path. Permission-aware retrieval limits users and agents to approved content. Encryption, private networking, secret management, filtering, data-loss prevention, source-level auditing, and sensitive-data testing provide additional protection.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How are Enterprise AI Solutions kept accurate, grounded, and trustworthy?",
    answer:
      "Quality is managed through representative evaluation datasets and metrics for retrieval, groundedness, relevance, completeness, task adherence, and tool-call accuracy. Source citations, confidence behavior, content filtering, human review, and safe fallbacks reduce unsupported responses. Testing continues after launch because data, workflows, prompts, and models change over time.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "What governance and security controls should enterprise AI include?",
    answer:
      "Controls should reflect the solution's risk and authority. Common safeguards include accountable ownership, scoped agent identities, role-based access, approved data sources, content safety, prompt-injection defenses, deterministic policy checks, human approval for high-impact actions, prohibited-action boundaries, audit trails, incident procedures, and continuous security and compliance monitoring.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "How do Enterprise AI Solutions move successfully from pilot to production?",
    answer:
      "Production readiness requires more than a successful demonstration. The pilot must be converted into a supported architecture with secure integrations, quality thresholds, adversarial testing, observability, cost controls, fallback behavior, rollback procedures, user training, ownership, and service management. A phased rollout validates performance and adoption before wider deployment.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "How are Enterprise AI Solutions monitored, optimized, and scaled?",
    answer:
      "Observability should track quality, safety, retrieval performance, tool use, latency, failures, adoption, cost, and data or model drift. Automated evaluations can become CI/CD quality gates and run against production samples. Monitoring evidence guides prompt, retrieval, policy, model, capacity, and workflow improvements as the solution expands across teams and use cases.",
  },
];
