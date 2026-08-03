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
  IconMap,
  IconLock,
} from "@tabler/icons-react";

export const coreCapabilitiesData = [
  {
    id: "01",
    title: "Enterprise AI Strategy & Roadmaps",
    shortDesc:
      "Prioritize high-ROI use cases and design a governed path from pilot to production.",
    icon: IconMap,
    color: "bg-indigo-100 text-indigo-600",
    image: "/images/solutions/ai-agents-development/core-capabilities/llm-integration.jpg",
    description:
      "We align business outcomes, data readiness, and risk posture so leadership funds the right AI portfolio—not scattered experiments.",
    highlights: [
      {
        title: "Use-Case Prioritization",
        desc: "Score impact, feasibility, and risk for every candidate.",
        icon: IconChartBar,
      },
      {
        title: "Target Architecture",
        desc: "Define platforms, models, and integration patterns.",
        icon: IconServer,
      },
      {
        title: "Operating Model",
        desc: "Roles, funding, and governance for sustained delivery.",
        icon: IconUserCheck,
      },
    ],
    illustration: "strategy",
    kpis: [
      { label: "Roadmap Horizon", value: "12–24 mo" },
      { label: "Use Cases Ranked", value: "Clear" },
      { label: "ROI Framing", value: "Built-in" },
      { label: "Exec Ready", value: "Yes" },
    ],
  },
  {
    id: "02",
    title: "Custom Agentic & Copilot Systems",
    shortDesc:
      "Build production agents and copilots that act in your enterprise systems.",
    icon: IconRobot,
    color: "bg-violet-100 text-violet-600",
    image: "/images/solutions/ai-agents-development/core-capabilities/api-integration.jpg",
    description:
      "From task agents to Microsoft copilots, we deliver solutions that plan, call tools, and complete work with human oversight where it matters.",
    highlights: [
      {
        title: "Agent Design",
        desc: "Roles, tools, memory, and escalation contracts.",
        icon: IconBrain,
      },
      {
        title: "Copilot Experiences",
        desc: "Teams, Outlook, Dynamics, and custom surfaces.",
        icon: IconMessageCircle,
      },
      {
        title: "Tool Calling",
        desc: "CRM, ERP, M365, and custom API actions.",
        icon: IconApi,
      },
    ],
    illustration: "automation",
    kpis: [
      { label: "Systems Linked", value: "Enterprise" },
      { label: "Human Gates", value: "Configurable" },
      { label: "Channels", value: "Multi" },
      { label: "Prod Ready", value: "Yes" },
    ],
  },
  {
    id: "03",
    title: "Enterprise RAG & Knowledge AI",
    shortDesc:
      "Ground answers in trusted documents, SharePoint, and business data.",
    icon: IconDatabase,
    color: "bg-emerald-100 text-emerald-600",
    image: "/images/solutions/ai-agents-development/core-capabilities/rag-integration.jpg",
    description:
      "Eliminate hallucinations with permission-aware retrieval, citations, and refresh pipelines that keep enterprise knowledge current.",
    highlights: [
      {
        title: "Secure Retrieval",
        desc: "Respect document and identity permissions.",
        icon: IconShieldLock,
      },
      {
        title: "Ingestion Pipelines",
        desc: "Docs, wikis, tickets, and structured sources.",
        icon: IconServer,
      },
      {
        title: "Cited Answers",
        desc: "Traceable responses leaders can trust.",
        icon: IconChartBar,
      },
    ],
    illustration: "architecture",
    kpis: [
      { label: "Grounding", value: "Enterprise" },
      { label: "Permissions", value: "Enforced" },
      { label: "Citations", value: "Optional" },
      { label: "Refresh", value: "Automated" },
    ],
  },
  {
    id: "04",
    title: "AI Workflow Automation",
    shortDesc:
      "Automate multi-step processes across Power Platform, APIs, and line-of-business apps.",
    icon: IconActivity,
    color: "bg-orange-100 text-orange-600",
    image: "/images/solutions/ai-agents-development/core-capabilities/memory-context.jpg",
    description:
      "Combine AI reasoning with durable workflows so documents, approvals, and handoffs move without manual re-entry.",
    highlights: [
      {
        title: "Process Mapping",
        desc: "Find friction and automate the highest ROI steps.",
        icon: IconTrendingUp,
      },
      {
        title: "Orchestration",
        desc: "Power Automate, custom services, and agent loops.",
        icon: IconApi,
      },
      {
        title: "Exception Handling",
        desc: "Route edge cases to the right humans.",
        icon: IconUserCheck,
      },
    ],
    illustration: "automation",
    kpis: [
      { label: "Cycle Time", value: "Down" },
      { label: "Manual Effort", value: "Reduced" },
      { label: "Exceptions", value: "Governed" },
      { label: "Auditability", value: "High" },
    ],
  },
  {
    id: "05",
    title: "AI Governance & Security",
    shortDesc:
      "Ship with identity, evaluation, monitoring, and compliance controls.",
    icon: IconShieldLock,
    color: "bg-rose-100 text-rose-600",
    image: "/images/solutions/ai-agents-development/core-capabilities/security-governance.jpg",
    description:
      "Enterprise AI only scales when security, audit, and quality gates are designed in—not bolted on after a pilot.",
    highlights: [
      {
        title: "Identity & RBAC",
        desc: "Entra ID, SSO, and least-privilege tools.",
        icon: IconLock,
      },
      {
        title: "Evaluation Loops",
        desc: "Quality, safety, and regression checks.",
        icon: IconChartBar,
      },
      {
        title: "Observability",
        desc: "Cost, latency, and incident visibility.",
        icon: IconActivity,
      },
    ],
    illustration: "security",
    kpis: [
      { label: "SSO", value: "Supported" },
      { label: "Audit Logs", value: "Yes" },
      { label: "Eval Gates", value: "Built-in" },
      { label: "Prod Ops", value: "Ready" },
    ],
  },
  {
    id: "06",
    title: "Adoption & Change Enablement",
    shortDesc:
      "Train teams, document runbooks, and drive usage so value is realized.",
    icon: IconUserCheck,
    color: "bg-sky-100 text-sky-600",
    image: "/images/solutions/ai-agents-development/core-capabilities/human-in-loop.jpg",
    description:
      "Technology alone fails. We equip champions, admins, and end users so enterprise AI becomes part of how work gets done.",
    highlights: [
      {
        title: "Role-Based Training",
        desc: "Business users, builders, and operators.",
        icon: IconMessageCircle,
      },
      {
        title: "Runbooks",
        desc: "Support, escalation, and content ownership.",
        icon: IconServer,
      },
      {
        title: "Adoption Metrics",
        desc: "Track usage against ROI targets.",
        icon: IconTrendingUp,
      },
    ],
    illustration: "enablement",
    kpis: [
      { label: "Enablement", value: "Included" },
      { label: "Handoff", value: "Documented" },
      { label: "Champions", value: "Activated" },
      { label: "Usage", value: "Measured" },
    ],
  },
];
