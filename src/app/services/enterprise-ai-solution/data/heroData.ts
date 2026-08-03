import {
  Building2,
  Brain,
  GitFork,
  ShieldCheck,
  Database,
  Users,
  Network,
  TrendingUp,
  Layers,
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
  label: "ENTERPRISE AI SOLUTIONS",
  heading: {
    prefix: "Scale AI Across the Enterprise",
    highlight: "With Governance & ROI",
    suffix: "",
  },
  paragraph:
    "Softree Technology designs and delivers secure enterprise AI—strategy roadmaps, agents, RAG, copilots, and automation—integrated with your systems and governed for production outcomes.",
  ctaButtons: {
    primary: {
      text: "Talk to an Expert",
      href: "https://www.softreetechnology.com/contact",
    },
    secondary: { text: "", href: "" },
  },
  features: [
    {
      icon: Building2,
      title: "ENTERPRISE SCALE",
      subtitle: "AI across departments.",
    },
    {
      icon: ShieldCheck,
      title: "GOVERNED BY DESIGN",
      subtitle: "Security & compliance first.",
    },
    {
      icon: Layers,
      title: "FULL SOLUTION STACK",
      subtitle: "Strategy to production.",
    },
    {
      icon: TrendingUp,
      title: "MEASURABLE ROI",
      subtitle: "Outcomes you can track.",
    },
  ] as FeatureItem[],
  capabilities: [
    {
      id: "strategy",
      title: "Strategy",
      subtitle: "AI Roadmaps",
      icon: Brain,
      angle: 270,
    },
    {
      id: "build",
      title: "Build",
      subtitle: "Agents & RAG",
      icon: GitFork,
      angle: 330,
    },
    {
      id: "integrate",
      title: "Integrate",
      subtitle: "Systems & Data",
      icon: Database,
      angle: 30,
    },
    {
      id: "govern",
      title: "Govern",
      subtitle: "Secure Controls",
      icon: ShieldCheck,
      angle: 90,
    },
    {
      id: "orchestrate",
      title: "Orchestrate",
      subtitle: "Workflows",
      icon: Network,
      angle: 150,
    },
    {
      id: "enable",
      title: "Enable",
      subtitle: "People & Change",
      icon: Users,
      angle: 210,
    },
  ] as CapabilityCardData[],
};
