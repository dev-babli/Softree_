import type { LucideIcon } from "lucide-react";
import { Brain, Globe, Smartphone } from "lucide-react";

export type ServicesHubItem = {
  id: string;
  n: string;
  title: string;
  shortTitle: string;
  href: string;
  image: string;
  imgSrc?: string;
  LucideIcon?: LucideIcon;
  accent: "#FF6B00" | "#FF5812" | "#1852FF";
  description: string;
  tags: string[];
};

/** Canonical links for the /services hub — matches live app routes. */
export const SERVICES_HUB: ServicesHubItem[] = [
  {
    id: "sharepoint",
    n: "01",
    title: "SharePoint",
    shortTitle: "SharePoint",
    href: "/services/offshore-sharepoint-development",
    image: "/service_image/microsoft.jpg",
    imgSrc: "/service_image/microsoft.jpg",
    accent: "#1852FF",
    description:
      "Intranets, document management, and M365 collaboration hubs — migration, governance, and custom portals that teams actually adopt.",
    tags: ["Microsoft 365", "SharePoint Online", "Intranet", "Migration"],
  },
  {
    id: "spfx",
    n: "02",
    title: "SPFx",
    shortTitle: "SPFx",
    href: "/services/offshore-spfx-development",
    image: "/service_image/microsoft.jpg",
    imgSrc: "/service_image/microsoft.jpg",
    accent: "#1852FF",
    description:
      "Custom SPFx web parts, extensions, and Adaptive Cards — React and TypeScript experiences embedded in SharePoint and Teams.",
    tags: ["React", "TypeScript", "SPFx", "Teams"],
  },
  {
    id: "power-platform",
    n: "03",
    title: "Power Platform",
    shortTitle: "Power Apps",
    href: "/services/offshore-power-platform-development",
    image: "/service_image/microsoft.jpg",
    imgSrc: "/service_image/microsoft.jpg",
    accent: "#1852FF",
    description:
      "Canvas and model-driven apps, Power Automate flows, and Dataverse solutions that automate real business processes end-to-end.",
    tags: ["Power Apps", "Power Automate", "Dataverse", "ALM"],
  },
  {
    id: "power-bi",
    n: "04",
    title: "Power BI",
    shortTitle: "Power BI",
    href: "/services/offshore-data-analytics",
    image: "/service_image/data.jpg",
    imgSrc: "/service_image/microsoft.jpg",
    accent: "#1852FF",
    description:
      "Semantic models, executive dashboards, and real-time analytics — Power BI and Fabric workloads wired to the metrics that matter.",
    tags: ["Power BI", "DAX", "Fabric", "Analytics"],
  },
  {
    id: "web-modernization",
    n: "05b",
    title: "Website modernisation",
    shortTitle: "Web Modern",
    href: "/services/website-modernization",
    image: "/images/webanalyser-fixed.png",
    LucideIcon: Globe,
    accent: "#FF5812",
    description:
      "Free AI blueprint — scan, competitor gaps, wireframe preview — then Next.js rebuild with Softree.",
    tags: ["AI Audit", "Redesign", "Next.js", "CRO"],
  },
  {
    id: "web",
    n: "05",
    title: "Web apps",
    shortTitle: "Web Dev",
    href: "/services/offshore-web-app-development",
    image: "/service_image/web.jpg",
    LucideIcon: Globe,
    accent: "#FF5812",
    description:
      "Production-grade Next.js and React platforms — headless CMS, APIs, and cloud-native architecture built for scale and maintainability.",
    tags: ["Next.js", "React", "TypeScript", "Cloud"],
  },
  {
    id: "mobile",
    n: "06",
    title: "Mobile",
    shortTitle: "Mobile",
    href: "/services/offshore-mobile-app-development",
    image: "/whysoftree/web dev.webp",
    LucideIcon: Smartphone,
    accent: "#FF5812",
    description:
      "Cross-platform iOS and Android with React Native and Expo — native performance, shared codebase, store-ready delivery.",
    tags: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    id: "ai",
    n: "07",
    title: "AI agents",
    shortTitle: "AI",
    href: "/services/offshore-ai-development",
    image: "/service_image/ai.jpg",
    LucideIcon: Brain,
    accent: "#FF6B00",
    description:
      "Agentic workflows, RAG pipelines, and LLM integrations embedded in Microsoft 365 and your existing enterprise stack.",
    tags: ["AI Agents", "RAG", "Azure OpenAI", "Automation"],
  },
  {
    id: "generative-ai",
    n: "08",
    title: "Generative AI",
    shortTitle: "Gen AI",
    href: "/services/generative-ai",
    image: "/service_image/ai.jpg",
    imgSrc: "/service_image/ai.jpg",
    accent: "#FF6B00",
    description:
      "Enterprise copilots, custom GPTs, and GenAI products with governance, guardrails, and observability from day one.",
    tags: ["Copilots", "GenAI", "Governance", "Azure"],
  },
  {
    id: "fabric",
    n: "09",
    title: "Microsoft Fabric",
    shortTitle: "Fabric",
    href: "/services/offshore-microsoft-fabric",
    image: "/service_image/data.jpg",
    imgSrc: "/service_image/microsoft.jpg",
    accent: "#1852FF",
    description:
      "Lakehouse, pipelines, and unified analytics on Microsoft Fabric — from raw data to decision-ready products.",
    tags: ["Fabric", "Lakehouse", "Data Engineering", "OneLake"],
  },
  {
    id: "legacy",
    n: "10",
    title: "Legacy modernization",
    shortTitle: "Modernize",
    href: "/services/legacy-application-modernization",
    image: "/whysoftree/modern.png",
    imgSrc: "/service_image/web.jpg",
    accent: "#FF5812",
    description:
      "Cloud migration and codebase modernization — retire fragile systems without stopping the business.",
    tags: ["Migration", "Cloud Native", "Refactor", "Integration"],
  },
  {
    id: "test-automation",
    n: "11",
    title: "Test automation",
    shortTitle: "QA AI",
    href: "/services/ai-powered-test-automation",
    image: "/service_image/ai.jpg",
    imgSrc: "/service_image/ai.jpg",
    accent: "#FF5812",
    description:
      "AI-assisted regression, CI/CD quality gates, and automation frameworks that keep releases fast and reliable.",
    tags: ["Test Automation", "QA", "CI/CD", "Playwright"],
  },
  {
    id: "mvp",
    n: "12",
    title: "MVP delivery",
    shortTitle: "MVP",
    href: "/services/mvp",
    image: "/service_image/web.jpg",
    imgSrc: "/service_image/web.jpg",
    accent: "#FF6B00",
    description:
      "Fixed-scope MVPs with weekly demos — discovery, build, and launch in weeks with a senior offshore squad.",
    tags: ["MVP", "Discovery", "Sprints", "Launch"],
  },
];

export const SERVICES_HUB_TICKER = SERVICES_HUB.map((s) => s.shortTitle);
