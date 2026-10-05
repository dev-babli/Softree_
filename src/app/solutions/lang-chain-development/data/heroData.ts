import {
  Database,
  Layers,
  Workflow,
  Search,
  Bot,
  Activity,
  Shield,
  Users,
  Cloud,
  CheckCircle2,
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
  label: "OFFSHORE LLM DEVELOPMENT TEAM",
  heading: {
    prefix: "LangChain Development Services from an",
    highlight: "Offshore AI Engineering Team",
    suffix: "",
  },
  paragraph:
    "Build scalable, production-ready AI applications with Softree Technology’s offshore LangChain development team. We develop LLM applications, RAG solutions, AI agents, intelligent copilots, and automated AI workflows using LangChain.",
  ctaButtons: {
    primary: {
      text: "Talk to our Expert",
      href: "https://www.softreetechnology.com/contact",
    },
    secondary: { text: "", href: "" },
  },
  features: [
    {
      icon: Shield,
      title: "White-Label Friendly",
      subtitle: "Seamless integration",
    },
    {
      icon: Users,
      title: "Dedicated Offshore Teams",
      subtitle: "Scalable capacity",
    },
    {
      icon: Cloud,
      title: "Microsoft AI Expertise",
      subtitle: "Certified partners",
    },
    {
      icon: CheckCircle2,
      title: "Enterprise-Ready Delivery",
      subtitle: "Proven execution",
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
