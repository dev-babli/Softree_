/**
 * Curated visuals for Agentic AI page — local assets first (no hotlink 403s).
 * Mapped from Kore Artemis section imagery patterns (hero, build/scale/optimize, product UI).
 */
export const AGENTIC_ASSETS = {
  heroBg: "/service_image/ai.jpg",
  phases: {
    build: {
      src: "/images/case-study/power-apps/ai.png",
      alt: "Copilot Studio agent builder interface",
    },
    scale: {
      src: "/images/webanalyser-live.png",
      alt: "Enterprise AI analytics dashboard at scale",
    },
    optimize: {
      src: "/images/case-study/web/ai-web.jpg",
      alt: "Agent observability and optimization insights",
    },
  },
  platform: [
    {
      id: 1,
      img: "/images/case-study/power-apps/ai.png",
      title: "AI Copilot",
      desc: "Assist users with contextual intelligence and workflow automation inside Microsoft 365.",
    },
    {
      id: 2,
      img: "/service_image/ai.jpg",
      title: "Agent Builder",
      desc: "Create autonomous agents that orchestrate tasks, tools, and approvals around the clock.",
    },
    {
      id: 3,
      img: "/images/webanalyser-live.png",
      title: "Agent Analytics",
      desc: "Track decisions, actions, and business outcomes with observability your operators trust.",
    },
  ],
  industry: {
    banking: "/images/case-study/web/ai-web.jpg",
    healthcare: "/images/case-study/web/health.jpg",
    manufacturing: "/images/case-study/power-apps/manufactture.png",
    retail: "/images/case-study/web/ai.jpg",
    it: "/service_image/microsoft.jpg",
  },
  enterprise: "/service_image/data.jpg",
  process: "/service_image/web.jpg",
} as const
