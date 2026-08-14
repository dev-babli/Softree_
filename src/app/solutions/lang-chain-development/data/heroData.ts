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
  label: "LANGCHAIN DEVELOPMENT",
  heading: {
    prefix: "Enterprise LangChain",
    highlight: "built for production",
    suffix: "",
  },
  paragraph:
    "We design and ship LangChain apps, RAG pipelines, and agent workflows with tool calling, memory, and evaluation frameworks—governed AI your engineering team can run in production.",
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
