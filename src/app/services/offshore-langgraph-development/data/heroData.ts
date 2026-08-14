import {
  MessageSquare,
  Brain,
  GitFork,
  ShieldCheck,
  Database,
  Users,
  Headphones,
  BookOpen,
  TrendingUp,
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
  label: "OFFSHORE LANGGRAPH DEVELOPMENT",
  heading: {
    prefix: "Expert LangGraph Development from Your",
    highlight: "Dedicated Offshore Partner",
    suffix: "",
  },
  paragraph:
    "Build resilient, production-ready agentic workflows. Scale your engineering capacity with our specialized offshore LangGraph development teams.",
  ctaButtons: {
    primary: {
      text: "Talk to an Expert",
      href: "https://www.softreetechnology.com/contact",
    },
    secondary: { text: "", href: "" },
  },
  features: [
    {
      icon: Headphones,
      title: "SUPPORT CHATBOTS",
      subtitle: "Deflect tickets at scale.",
    },
    {
      icon: BookOpen,
      title: "KNOWLEDGE GROUNDED",
      subtitle: "RAG over your docs.",
    },
    {
      icon: ShieldCheck,
      title: "SECURE BY DESIGN",
      subtitle: "Enterprise controls built-in.",
    },
    {
      icon: TrendingUp,
      title: "END-TO-END DELIVERY",
      subtitle: "Strategy to production.",
    },
  ] as FeatureItem[],
  capabilities: [
    {
      id: "listen",
      title: "Listen",
      subtitle: "Understand Intent",
      icon: MessageSquare,
      angle: 270,
    },
    {
      id: "reason",
      title: "Reason",
      subtitle: "Ground Answers",
      icon: Brain,
      angle: 330,
    },
    {
      id: "act",
      title: "Act",
      subtitle: "Trigger Workflows",
      icon: GitFork,
      angle: 30,
    },
    {
      id: "protect",
      title: "Protect",
      subtitle: "Stay Compliant",
      icon: ShieldCheck,
      angle: 90,
    },
    {
      id: "connect",
      title: "Connect",
      subtitle: "CRM & Helpdesk",
      icon: Database,
      angle: 150,
    },
    {
      id: "handoff",
      title: "Handoff",
      subtitle: "Escalate to Humans",
      icon: Users,
      angle: 210,
    },
  ] as CapabilityCardData[],
};
