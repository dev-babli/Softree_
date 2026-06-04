import type { Story } from "./story-reel.types";

const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&h=1080&q=85`;

/** Default homepage / demo stories — Softree service lines and outcomes */
export const SOFTREE_HOMEPAGE_STORIES: Story[] = [
  {
    id: "power-platform",
    image: U("photo-1552664730-d307ca884978"),
    date: "2025-11-12",
    category: "Microsoft Power Platform",
    title: "Enterprise workflows without the backlog",
    description: "Governed low-code delivery for teams that need speed and compliance.",
    metric: "6-week average rollout",
    ctaLabel: "Power Platform work",
    href: "/services/offshore-power-platform-development",
  },
  {
    id: "ai-agents",
    image: U("photo-1677442136019-21780ecad995"),
    date: "2025-10-28",
    category: "AI & Intelligent Automation",
    title: "Copilots grounded in your data estate",
    description: "RAG and agents with Microsoft-native guardrails for accurate, auditable answers.",
    metric: "40% faster resolution",
    ctaLabel: "AI delivery",
    href: "/services/offshore-ai-development",
  },
  {
    id: "microsoft-fabric",
    image: U("photo-1551288049-bebda4e38f71"),
    date: "2025-10-06",
    category: "Data & Microsoft Fabric",
    title: "One lakehouse instead of twelve BI tools",
    description: "Unified Fabric analytics and executive dashboards in weeks, not quarters.",
    metric: "Single source of truth",
    ctaLabel: "Data platforms",
    href: "/services/offshore-data-analytics",
  },
  {
    id: "modern-web",
    image: U("photo-1497366216548-37526070297c"),
    date: "2025-09-18",
    category: "Web & Product Engineering",
    title: "Platforms built to ship every two weeks",
    description: "Composable frontends and embedded offshore squads from MVP to scale.",
    metric: "Bi-weekly release trains",
    ctaLabel: "Web engineering",
    href: "/services/offshore-web-app-development",
  },
];
