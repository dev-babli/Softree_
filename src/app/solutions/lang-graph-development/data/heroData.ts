import {
  Database,
  Workflow,
  Search,
  Bot,
  Activity,
  GitBranch,
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
  label: "LANGGRAPH DEVELOPMENT",
  heading: {
    prefix: "Enterprise LangGraph",
    highlight: "built for production",
    suffix: "",
  },
  paragraph:
    "We design and ship stateful LangGraph agents, multi-agent teams, and human-in-the-loop workflows with tool calling, memory, and eval harnesses—governed agent systems your team can run in production.",
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
      id: "graphs",
      title: "Graphs",
      subtitle: "Stateful flows",
      icon: GitBranch,
      angle: 270,
    },
    {
      id: "agents",
      title: "Agents",
      subtitle: "Multi-agent teams",
      icon: Bot,
      angle: 330,
    },
    {
      id: "hitl",
      title: "HITL",
      subtitle: "Human checkpoints",
      icon: Activity,
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
      icon: Search,
      angle: 210,
    },
  ] as CapabilityCardData[],
};
