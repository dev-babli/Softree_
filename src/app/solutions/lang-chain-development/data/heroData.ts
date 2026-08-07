import {
  Database,
  Network,
  Layers,
  Workflow,
  TrendingUp,
  Search,
  Bot,
  Activity,
} from "lucide-react";

export interface CapabilityCardData {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  angle: number;
}

export interface FeatureItem {
  icon: any;
  title: string;
  subtitle: string;
}

export const HERO_DATA = {
  label: "LANGCHAIN DEVELOPMENT",
  heading: {
    prefix: "LangChain Development Services",
    highlight: "for AI Applications",
    suffix: "",
  },
  paragraph:
    "Softree delivers LangChain development services for AI applications, including RAG pipelines, LangGraph agent workflows, tool calling, persistent memory, and evaluation frameworks, so your business can launch scalable, governed, and production-ready AI solutions.",
  ctaButtons: {
    primary: {
      text: "Talk to an Expert",
      href: "https://www.softreetechnology.com/contact",
    },
    secondary: { text: "", href: "" },
  },
  features: [
    {
      icon: Network,
      title: "LANGCHAIN / LANGGRAPH",
      subtitle: "Chains, graphs, and agents.",
    },
    {
      icon: Search,
      title: "RAG CHAINS",
      subtitle: "Grounded retrieval pipelines.",
    },
    {
      icon: Workflow,
      title: "TOOL CALLING",
      subtitle: "APIs, CRM, and enterprise data.",
    },
    {
      icon: TrendingUp,
      title: "PRODUCTION DELIVERY",
      subtitle: "Strategy to live LangChain apps.",
    },
  ] as FeatureItem[],
  capabilities: [
    {
      id: "chains",
      title: "Chains",
      subtitle: "LCEL & pipelines",
      icon: Layers,
      angle: 270,
    },
    {
      id: "rag",
      title: "RAG",
      subtitle: "Retrieval & cite",
      icon: Search,
      angle: 330,
    },
    {
      id: "agents",
      title: "Agents",
      subtitle: "LangGraph flows",
      icon: Bot,
      angle: 30,
    },
    {
      id: "tools",
      title: "Tools",
      subtitle: "Call & integrate",
      icon: Workflow,
      angle: 90,
    },
    {
      id: "memory",
      title: "Memory",
      subtitle: "State & context",
      icon: Database,
      angle: 150,
    },
    {
      id: "eval",
      title: "Eval",
      subtitle: "Quality & guardrails",
      icon: Activity,
      angle: 210,
    },
  ] as CapabilityCardData[],
};
