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
  IconHeadset,
} from "@tabler/icons-react";

export const coreCapabilitiesData = [
  {
    id: "01",
    title: "Conversational LLM Integration",
    shortDesc:
      "Integrate OpenAI, Claude, Gemini, and Azure OpenAI into production-grade chat experiences.",
    icon: IconBrain,
    color: "bg-indigo-100 text-indigo-600",
    image: "/images/solutions/ai-agents-development/core-capabilities/llm-integration.jpg",
    description:
      "We select and integrate the right foundation models for latency, cost, and quality—so your chatbot sounds natural and stays reliable under load.",
    highlights: [
      {
        title: "Intent & Dialogue Design",
        desc: "Flows that handle multi-turn questions without dead ends.",
        icon: IconMessageCircle,
      },
      {
        title: "Prompt & Guardrail Engineering",
        desc: "Brand voice, safety filters, and refusal policies.",
        icon: IconRobot,
      },
      {
        title: "Model Routing",
        desc: "Route simple vs complex chats to the optimal model.",
        icon: IconTrendingUp,
      },
    ],
    illustration: "strategy",
    kpis: [
      { label: "Channels", value: "Web+App" },
      { label: "Latency Focus", value: "Low" },
      { label: "Uptime Target", value: "99.9%" },
      { label: "Brand Voice", value: "Tuned" },
    ],
  },
  {
    id: "02",
    title: "RAG Knowledge Grounding",
    shortDesc:
      "Ground chatbot answers in SharePoint, FAQs, wikis, and product docs with citations.",
    icon: IconDatabase,
    color: "bg-emerald-100 text-emerald-600",
    image: "/images/solutions/ai-agents-development/core-capabilities/rag-integration.jpg",
    description:
      "Eliminate hallucinations by connecting chatbots to permission-aware enterprise knowledge with retrieval, ranking, and source citations.",
    highlights: [
      {
        title: "Document Ingestion",
        desc: "Sync FAQs, manuals, and policy libraries.",
        icon: IconServer,
      },
      {
        title: "Permission-Aware Search",
        desc: "Users only see what they are allowed to access.",
        icon: IconDatabase,
      },
      {
        title: "Cited Responses",
        desc: "Transparent sources for trust and audit.",
        icon: IconChartBar,
      },
    ],
    illustration: "architecture",
    kpis: [
      { label: "Hallucinations", value: "Minimized" },
      { label: "Knowledge Sync", value: "Ongoing" },
      { label: "Citations", value: "Enabled" },
      { label: "Sources", value: "Enterprise" },
    ],
  },
  {
    id: "03",
    title: "Helpdesk & CRM Actions",
    shortDesc:
      "Let chatbots create tickets, update CRM records, and trigger workflows safely.",
    icon: IconApi,
    color: "bg-violet-100 text-violet-600",
    image: "/images/solutions/ai-agents-development/core-capabilities/api-integration.jpg",
    description:
      "Move beyond FAQ bots—connect chat to ServiceNow, Dynamics, Salesforce, Zendesk, and custom APIs with scoped permissions.",
    highlights: [
      {
        title: "Ticket Creation",
        desc: "Open and enrich tickets from chat context.",
        icon: IconHeadset,
      },
      {
        title: "CRM Updates",
        desc: "Capture leads and case notes automatically.",
        icon: IconApi,
      },
      {
        title: "Workflow Triggers",
        desc: "Kick off Power Automate or backend jobs.",
        icon: IconActivity,
      },
    ],
    illustration: "automation",
    kpis: [
      { label: "Integrations", value: "CRM+" },
      { label: "Action Success", value: "High" },
      { label: "Manual Work", value: "Reduced" },
      { label: "CSAT Lift", value: "Measurable" },
    ],
  },
  {
    id: "04",
    title: "Conversation Memory",
    shortDesc:
      "Remember session context and returning users for personalized, coherent chats.",
    icon: IconMessageCircle,
    color: "bg-amber-100 text-amber-600",
    image: "/images/solutions/ai-agents-development/core-capabilities/memory-context.jpg",
    description:
      "Build chatbots that retain conversation state, user preferences, and prior issues—without leaking sensitive data across tenants.",
    highlights: [
      {
        title: "Session Continuity",
        desc: "Keep multi-turn context coherent.",
        icon: IconDatabase,
      },
      {
        title: "Personalization",
        desc: "Adapt tone and suggestions to the user.",
        icon: IconUserCheck,
      },
      {
        title: "Privacy Boundaries",
        desc: "Isolate memory by tenant and role.",
        icon: IconShieldLock,
      },
    ],
    illustration: "microsoft",
    kpis: [
      { label: "Multi-turn", value: "Supported" },
      { label: "Personalization", value: "Optional" },
      { label: "Privacy", value: "Scoped" },
      { label: "Retention", value: "Policy-led" },
    ],
  },
  {
    id: "05",
    title: "Human Handoff",
    shortDesc:
      "Escalate to live agents with full chat transcript and confidence-based routing.",
    icon: IconUserCheck,
    color: "bg-blue-100 text-blue-600",
    image: "/images/solutions/ai-agents-development/core-capabilities/human-in-loop.jpg",
    description:
      "When confidence drops or the user asks for a person, hand off cleanly to your support desk with full context.",
    highlights: [
      {
        title: "Confidence Gates",
        desc: "Auto-escalate uncertain answers.",
        icon: IconTrendingUp,
      },
      {
        title: "Rich Transcripts",
        desc: "Live agents see the full conversation.",
        icon: IconMessageCircle,
      },
      {
        title: "Queue Routing",
        desc: "Send to the right skill group.",
        icon: IconUserCheck,
      },
    ],
    illustration: "automation",
    kpis: [
      { label: "Escalation", value: "Smooth" },
      { label: "Context Loss", value: "Near-zero" },
      { label: "Handoff Prep", value: "Faster" },
      { label: "CSAT", value: "Protected" },
    ],
  },
  {
    id: "06",
    title: "Security & Governance",
    shortDesc:
      "Authentication, RBAC, audit logs, PII handling, and responsible AI controls.",
    icon: IconShieldLock,
    color: "bg-pink-100 text-pink-600",
    image: "/images/solutions/ai-agents-development/core-capabilities/security-governance.jpg",
    description:
      "Deploy chatbots with enterprise identity, monitoring, content filters, and compliance-aligned logging.",
    highlights: [
      {
        title: "SSO & RBAC",
        desc: "Entra ID and role-based bot access.",
        icon: IconShieldLock,
      },
      {
        title: "PII Controls",
        desc: "Redaction and retention policies.",
        icon: IconActivity,
      },
      {
        title: "Analytics",
        desc: "Track deflection, CSAT, and failure modes.",
        icon: IconChartBar,
      },
    ],
    illustration: "security",
    kpis: [
      { label: "Audit Trail", value: "Yes" },
      { label: "SSO", value: "Supported" },
      { label: "Monitoring", value: "24/7" },
      { label: "Compliance", value: "Aligned" },
    ],
  },
];
