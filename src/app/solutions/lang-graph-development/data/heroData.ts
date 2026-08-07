import {
  Database,
  Workflow,
  TrendingUp,
  Search,
  Bot,
  Activity,
  GitBranch,
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
    prefix: "LangGraph Development Services",
    highlight: "for Agentic Workflows",
    suffix: "",
  },
  paragraph:
    "Softree builds production LangGraph applications—stateful agent graphs, multi-agent teams, human-in-the-loop checkpoints, tool calling, persistent memory, and evaluation harnesses—so your team ships governed, observable agent systems that integrate with your data and tools.",
  ctaButtons: {
    primary: {
      text: "Talk to an Expert",
      href: "https://www.softreetechnology.com/contact",
    },
    secondary: { text: "", href: "" },
  },
  features: [
    {
      icon: GitBranch,
      title: "STATEFUL GRAPHS",
      subtitle: "Nodes, edges, and checkpoints.",
    },
    {
      icon: Bot,
      title: "MULTI-AGENT TEAMS",
      subtitle: "Specialized agents that collaborate.",
    },
    {
      icon: Workflow,
      title: "TOOL CALLING",
      subtitle: "APIs, CRM, and enterprise data.",
    },
    {
      icon: TrendingUp,
      title: "PRODUCTION DELIVERY",
      subtitle: "Strategy to live LangGraph apps.",
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
