import {
  Bot,
  Boxes,
  Building2,
  Cloud,
  CloudSnow,
  Code2,
  Cpu,
  Database,
  Factory,
  FileText,
  GitBranch,
  Globe2,
  Headphones,
  HeartPulse,
  Landmark,
  LayoutDashboard,
  Lightbulb,
  LineChart,
  Link2,
  MessageSquare,
  Network,
  Rocket,
  Server,
  Smartphone,
  Sparkles,
  Truck,
  WandSparkles,
  Workflow,
} from "lucide-react";

export type MegaMenuLink = {
  label: string;
  url: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  description?: string;
};

export type MegaMenuGroup = {
  id?: string;
  title: string;
  url?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  description?: string;
  links: MegaMenuLink[];
};

export type MegaMenuMeta = {
  eyebrow: string;
  blurb: string;
  cta?: string;
  href?: string;
};

export type MegaMenuFooterCta = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  href: string;
  cta: string;
};

/** Swap, reorder, or filter this array per page. The mega menu only maps it. */
export const SERVICES_MEGA_CATEGORIES: MegaMenuGroup[] = [
  {
    id: "ai-automation",
    title: "AI & Automation",
    icon: Bot,
    url: "/services/ai-development-services",
    description:
      "Build intelligent agents, automate workflows and unlock AI-powered business innovation.",
    links: [
      {
        label: "AI Development Services",
        url: "/services/ai-development-services",
        icon: Sparkles,
        description: "Custom AI solutions for your business",
      },
      {
        label: "AI Copilot Development",
        url: "/solutions/ai-copilot-development",
        icon: WandSparkles,
        description: "Secure, intelligent copilots for business apps",
      },
      {
        label: "AI Agents Development",
        url: "/solutions/ai-agents-development",
        icon: Bot,
        description: "Automate complex enterprise workflows",
      },
      {
        label: "Multi-Agent Systems",
        url: "/solutions/multi-agent-systems",
        icon: Network,
        description: "Coordinate specialized AI agent teams",
      },
      {
        label: "Generative AI Development",
        url: "/services/offshore-generative-ai-development",
        icon: Sparkles,
        description: "LLM apps, content and generation workflows",
      },
      {
        label: "LangChain Development",
        url: "/solutions/lang-chain-development",
        icon: Link2,
        description: "Agents, RAG chains and LangGraph apps",
      },
      {
        label: "Enterprise RAG",
        url: "/solutions/enterprise-rag-development",
        icon: Database,
        description: "Secure retrieval over enterprise knowledge",
      },
      {
        label: "LangGraph Development",
        url: "/solutions/lang-graph-development",
        icon: GitBranch,
        description: "Stateful graphs and multi-agent workflows",
      },
      {
        label: "AI Consulting Services",
        url: "/services/ai-consulting-services",
        icon: Lightbulb,
        description: "Strategy and readiness roadmaps",
      },
      {
        label: "AI Workflow Automation",
        url: "/solutions/ai-workflow-automation",
        icon: Workflow,
        description: "Intelligent process orchestration",
      },
      {
        label: "AI Chatbot Development",
        url: "/services/ai-chatbot-development",
        icon: MessageSquare,
        description: "Conversational assistants for support and ops",
      },
      {
        label: "AI Test Automation",
        url: "/services/ai-powered-test-automation",
        icon: Cpu,
        description: "AI-assisted quality and regression testing",
      },
    ],
  },
  {
    id: "business-applications",
    title: "Business Applications",
    icon: LayoutDashboard,
    url: "/services/offshore-power-platform-development",
    description: "Power Platform at enterprise scale.",
    links: [
      {
        label: "Power Apps",
        url: "/services/offshore-power-platform-development",
        icon: LayoutDashboard,
        description: "Low-code delivery",
      },
      {
        label: "Power Automate",
        url: "/services/offshore-power-platform-development",
        icon: Workflow,
        description: "Workflow automation",
      },
      {
        label: "Dataverse",
        url: "/services/offshore-power-platform-development",
        icon: Server,
        description: "Unified data layer",
      },
      {
        label: "MVP Development",
        url: "/services/mvp",
        icon: Rocket,
        description: "Launch faster",
      },
    ],
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    icon: LineChart,
    url: "/services/offshore-data-analytics",
    description: "Intelligence from raw data.",
    links: [
      {
        label: "Power BI",
        url: "/services/offshore-data-analytics",
        icon: LineChart,
        description: "Executive dashboards",
      },
      {
        label: "Microsoft Fabric",
        url: "/services/offshore-microsoft-fabric",
        icon: Boxes,
        description: "Unified analytics",
      },
      {
        label: "Databricks",
        url: "/services/offshore-data-analytics",
        icon: Cpu,
        description: "ML pipelines",
      },
      {
        label: "Snowflake",
        url: "/services/offshore-data-analytics",
        icon: CloudSnow,
        description: "Cloud warehouse",
      },
    ],
  },
  {
    id: "ai-strategy",
    title: "AI Strategy & Solutions",
    icon: Lightbulb,
    url: "/services/ai-consulting-services",
    description: "Consulting and enterprise enablement.",
    links: [
      {
        label: "AI Consulting Services",
        url: "/services/ai-consulting-services",
        icon: Lightbulb,
        description: "Strategy and readiness roadmaps",
      },
      {
        label: "Enterprise AI Solutions",
        url: "/services/enterprise-ai-solution",
        icon: Building2,
        description: "Scale AI across the enterprise",
      },
      {
        label: "Azure OpenAI Development",
        url: "/solutions/azure-openai-development",
        icon: Cloud,
        description: "GPT apps, RAG and copilots on Azure",
      },
      {
        label: "Agentic AI Platform",
        url: "/agentic-ai-platform",
        icon: LayoutDashboard,
        description: "Build and govern agents at scale",
      },
    ],
  },
  {
    id: "digital-workspace",
    title: "Digital Workspace",
    icon: Globe2,
    url: "/services/offshore-web-app-development",
    description: "Modern apps for connected teams.",
    links: [
      {
        label: "Legacy Modernization",
        url: "/services/legacy-application-modernization",
        icon: Sparkles,
        description: "Architecture refresh",
      },
      {
        label: "SharePoint Online",
        url: "/services/offshore-sharepoint-development",
        icon: Building2,
        description: "Intranets",
      },
      {
        label: "SPFx Development",
        url: "/services/offshore-spfx-development",
        icon: Code2,
        description: "Custom SPFx",
      },
      {
        label: "Web Applications",
        url: "/services/offshore-web-app-development",
        icon: Globe2,
        description: "Portals and apps",
      },
      {
        label: "Mobile Applications",
        url: "/services/offshore-mobile-app-development",
        icon: Smartphone,
        description: "iOS and Android",
      },
    ],
  },
  {
    id: "industry-solutions",
    title: "Industry Solutions",
    icon: Factory,
    url: "/solutions/ai-for-healthcare",
    description: "AI tailored for your industry.",
    links: [
      {
        label: "AI for Healthcare",
        url: "/solutions/ai-for-healthcare",
        icon: HeartPulse,
        description: "Clinical workflows and HIPAA-aware AI",
      },
      {
        label: "AI for Manufacturing",
        url: "/solutions/ai-for-manufacturing",
        icon: Factory,
        description: "Predictive maintenance and quality AI",
      },
      {
        label: "AI for Financial Services",
        url: "/solutions/ai-for-financial-services",
        icon: Landmark,
        description: "Fraud, KYC and compliance AI",
      },
      {
        label: "AI for Logistics",
        url: "/solutions/ai-for-logistics",
        icon: Truck,
        description: "Routing, warehouse and supply chain AI",
      },
    ],
  },
];

export const MEGA_META: Record<string, MegaMenuMeta> = {
  Services: {
    eyebrow: "Services",
    blurb:
      "End-to-end services to modernize, automate and transform your business.",
    cta: "View all services",
    href: "/services",
  },
  "Case Studies": {
    eyebrow: "Proof",
    blurb: "Customer stories organized by solution area.",
    cta: "All case studies",
    href: "/case-studies",
  },
  Blog: {
    eyebrow: "Insights",
    blurb: "Practical notes on platforms, AI, and software delivery.",
    cta: "All articles",
    href: "/blog",
  },
  Products: {
    eyebrow: "Solutions",
    blurb: "Production-ready products built to accelerate your operations.",
  },
};

export const SERVICES_MEGA_FOOTER: MegaMenuFooterCta[] = [
  {
    icon: Headphones,
    title: "Not sure which service is right for you?",
    href: "/contact",
    cta: "Talk to our experts",
  },
  {
    icon: FileText,
    title: "Explore our capabilities in detail",
    href: "/services",
    cta: "View all services",
  },
  {
    icon: MessageSquare,
    title: "Have a project in mind?",
    href: "/contact",
    cta: "Get a quote",
  },
];
