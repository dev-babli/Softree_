/**
 * Canonical Softree copy for /agentic-ai-platform (softree-agentic-exact).
 * Content agents edit THIS file only — components import from here.
 *
 * Story hierarchy (page scroll order):
 *  1. Loader + Hero     — Promise: production-grade agents on Microsoft stack
 *  2. Outcomes          — Proof: speed, predictability, governance (metrics)
 *  3. Agents (personas) — Who: technical leader vs business leader
 *  4. Programmable      — Why: Microsoft-stack advantage vs generic AI
 *  5. Pillars           — How: definitions + delivery architecture
 *  6. Build-Scale       — Motion: ship, run, improve in production
 *  7. Demo video        — Show: see delivery in action
 *  8. Scroll tabs       — Depth: nine capability proofs
 *  9. Get started       — Convert: talk to engineering
 */

export const PAGE_SECTION_ORDER = [
  "loader",
  "hero",
  "outcomes",
  "agents",
  "programmable",
  "pillars",
  "buildScaleOptimize",
  "demoVideo",
  "scrollTabs",
  "getStarted",
] as const

export const loaderContent = {
  meet: "Meet",
  brand: "Softree",
  ariaLabel: "Loading Softree Agentic AI",
} as const

export const heroContent = {
  eyebrow: "Softree Technology · Agentic AI",
  meet: "Meet",
  brand: "Softree",
  headline: "Autonomous agents built for",
  headlineAccent: "enterprise certainty.",
  subheadItalic: "Design, deploy, and govern AI on the Microsoft stack.",
  body: "Built for enterprise delivery from the ground up — Softree combines offshore velocity with Copilot Studio, Azure AI, and Power Platform expertise. Agents we ship thrive in complex, high-volume, regulated workflows with governance your IT team can audit.",
  ctaLabel: "Let's talk",
  ctaHref: "/contact",
  riveTabs: [
    { label: "{ Build }", phase: "build" as const },
    { label: "{ Scale }", phase: "scale" as const },
    { label: "{ Optimize }", phase: "optimize" as const },
  ],
  phases: {
    build: {
      title: "Build with Microsoft AI",
      body: "Copilot Studio, Azure AI, and Power Platform — from idea to governed agent in weeks, not quarters.",
    },
    scale: {
      title: "Scale with provable reliability",
      body: "Deploy across Teams, SharePoint, and line-of-business systems with observability from day one.",
    },
    optimize: {
      title: "Optimize with every run",
      body: "Trace decisions, tune prompts, and improve ROI using production signals, not guesswork.",
    },
  },
} as const

export const outcomesContent = {
  header: {
    line1: "What { Softree }",
    line2: "changes for agentic AI",
  },
  footer: {
    line1: "{ Softree }",
    line2: "delivers",
    line3: "certainty",
  },
  cards: [
    {
      title: "{ Outcomes in weeks }",
      body: "Softree handles Microsoft stack plumbing; your team starts at business logic. Agents ship faster with offshore velocity.",
      metric: "4×",
      label: "faster time to production",
    },
    {
      title: "{ Predictability at scale }",
      body: "Every agent is defined, tested, and validated before deployment — pilot success survives production load.",
      metric: "0",
      label: "surprises in production",
    },
    {
      title: "{ Security + governance }",
      body: "DLP, Entra ID, and approval gates keep every action within policy, with audit trails your IT team trusts.",
      metric: "100%",
      label: "audited agent sessions",
    },
  ],
} as const

export const agentsContent = {
  tabs: [
    {
      label: "{ technical leader }",
      lines: ["No more", "{pilot stall}", "in production"],
      body: "Softree delivers typed trace events, eval suites, DLP guardrails, and observability your IT team can audit on Copilot Studio and Azure AI.",
      ctaLabel: "Let's talk",
      ctaHref: "/contact",
    },
    {
      label: "{ business leader }",
      lines: ["AI agents", "that move", "metrics"],
      body: "Softree ships agents that move metrics in regulated, high-volume workflows — with offshore delivery speed and Microsoft stack governance built in.",
      ctaLabel: "Let's talk",
      ctaHref: "/contact",
    },
  ],
} as const

export const programmableContent = {
  brand: "{ Softree }",
  headlineDesigned: "designed for what<br>actually ships",
  headlineAdvantage: "Agentic AI on Microsoft<br>is the new enterprise advantage",
  bullets: [
    "Copilot Studio, Azure AI, and Power Automate: from idea to governed agent in weeks, not quarters.",
    "DLP, Entra ID, and approval gates with tracing and audit trails your IT team trusts.",
    "Delivery patterns built to outlast model churn on the Microsoft stack.",
  ],
  closing:
    "Built for the<br><em>agentic era</em>. Shaped by offshore delivery on Copilot Studio, Azure AI, and Power Platform.",
} as const

export const pillarsContent = {
  eyebrow: "{ Pillars }",
  headline:
    "The two pillars<br>behind governed<br>agentic AI<br>on Microsoft",
  pillar1: {
    title: "Agent definitions<br>+ governance patterns",
    body: "Structured specs for agent behavior, tools, guardrails, and handoffs — so business and engineering teams share one definition of done.",
  },
  pillar2: {
    title: "Delivery architecture",
    body: "Softree solution architects turn intent into Copilot Studio agents, Power Automate flows, and Azure integrations your IT team can audit and operate.",
  },
} as const

export const buildScaleContent = {
  headline: "Ship governed Copilot Studio agents in weeks, not quarters.",
  tabs: {
    build: {
      title: "Copilot Studio delivery",
      body: "Design agents, workflows, and approvals in Copilot Studio with pro-code extensions when you need them.",
      architect:
        "Move from workshop to production with Softree architects who map ROI, risk, and Microsoft stack fit.",
      specs:
        "Document agent behavior, tools, and guardrails in specs your compliance team can review.",
    },
    scale: {
      title: "Operate at scale",
      body: "Run agents in Teams, SharePoint, and line-of-business systems with observability from day one.",
      signals: "Turn every agent run into a signal for safer, cheaper, better automation.",
    },
    optimize: {
      inherit: "Your agents ride the model curve",
      inheritBody:
        "Model capabilities keep accelerating. Softree delivery keeps your Copilot and Azure agents current without rebuilding from scratch every release.",
      judges: "Sharper eval suites catch drift before users do.",
      loop: "CONTINUOUS IMPROVEMENT LOOP",
      loopTagline: "Every sprint improves; every release compounds",
      compound: "Same offshore squad, compounding ROI",
      stack: "Plugs into the Microsoft stack you already run",
    },
  },
} as const

export const demoVideoContent = {
  playLabel: "Play video",
  headline: "Start your next agentic AI program on Microsoft",
} as const

export const scrollTabsContent = {
  sectionTitle: "A real difference with AI",
  sectionIntro: "Nine ways Softree delivers agentic AI on the Microsoft stack.",
  tabs: [
    {
      id: "abl",
      title: "Copilot Studio patterns that ship in weeks",
      body: "Pre-built agent accelerators on Microsoft 365: HR, IT, finance, and customer ops with governance baked in.",
    },
    {
      id: "orchestrate",
      title: "Multi-agent handoffs your operators can trust",
      body: "Specialist agents with memory, escalation paths, and clear ownership — not one brittle mega-prompt.",
    },
    {
      id: "deterministic",
      title: "Deterministic guardrails, not probabilistic hope",
      body: "DLP, Entra ID, and approval gates enforced before agents act, with auditable proof for IT and compliance.",
    },
    {
      id: "validate",
      title: "Zero production surprises",
      body: "Eval suites across personas and edge cases before deployment, and after every model change.",
    },
    {
      id: "topology",
      title: "System-aware vs. operating blind",
      body: "Agents wired to SharePoint, Dataverse, Fabric, and your APIs — deployed across Teams and channels you already use.",
    },
    {
      id: "audit",
      title: "100% of agent sessions traced",
      body: "Observability, evals, and audit logs so operators see what happened and why — not sampled 5–10%.",
    },
    {
      id: "logic",
      title: "Your agents scale on Microsoft infrastructure",
      body: "Application logic stays portable across Copilot Studio, Azure OpenAI, and Power Platform as models evolve.",
    },
    {
      id: "unified",
      title: "One delivery stack, not parallel AI systems",
      body: "Softree unifies scripted workflows and reasoning agents on Teams, SharePoint, and Dataverse you already operate.",
    },
    {
      id: "optimize",
      title: "Optimization without manual log archaeology",
      body: "Drift, cost, and quality signals surface automatically so teams improve agents without forensic digging.",
    },
  ],
} as const

export const getStartedContent = {
  headline: "Get started with<br>&nbsp;Softree&nbsp;",
  subhead: "Start your next agentic AI program with Softree",
  ctaLabel: "Let's talk",
  ctaHref: "/contact",
} as const

export const shellContent = {
  navProduct: "Agentic AI",
  navTagline: "Microsoft-stack agentic AI, delivered offshore",
  footerTagline: "Microsoft-stack agentic AI, delivered offshore",
  ctaDemo: "Let's talk",
  ctaRfp: "Book a meeting",
} as const
