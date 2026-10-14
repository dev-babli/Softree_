import {
  Brain,
  GitFork,
  ShieldCheck,
  Database,
  Users,
  Network,
  Layers,
  Workflow,
  TrendingUp,
  Box,
  Cpu,
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
  label: "OFFSHORE MULTI-AGENT SYSTEM DEVELOPMENT",
  heading: {
    prefix: "White-Label Partner for",
    highlight: "Multi-Agent System Development",
    suffix: "services",
  },
  paragraph:
    "Extend your engineering capacity with Softree's offshore AI team. We design, build, and integrate coordinated AI agent systems for technology companies, agencies, and consulting partners—delivering under your brand working as extension of your team.",
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
      title: "AGENT ORCHESTRATION",
      subtitle: "Coordinate specialized roles.",
    },
    {
      icon: Workflow,
      title: "SHARED CONTEXT LOOP",
      subtitle: "Memory across every agent.",
    },
    {
      icon: ShieldCheck,
      title: "GOVERNED BY DESIGN",
      subtitle: "Approvals and audit trails.",
    },
    {
      icon: TrendingUp,
      title: "PRODUCTION DELIVERY",
      subtitle: "Strategy to live systems.",
    },
  ] as FeatureItem[],
  /** Orbit loop — rendered with .map(); angles place cards on the ring */
  capabilities: [
    {
      id: "plan",
      title: "Plan",
      subtitle: "Decompose Goals",
      icon: Layers,
      angle: 270,
    },
    {
      id: "coordinate",
      title: "Coordinate",
      subtitle: "Assign Roles",
      icon: Network,
      angle: 330,
    },
    {
      id: "reason",
      title: "Reason",
      subtitle: "Decide Together",
      icon: Brain,
      angle: 30,
    },
    {
      id: "act",
      title: "Act",
      subtitle: "Execute in Parallel",
      icon: GitFork,
      angle: 90,
    },
    {
      id: "share",
      title: "Share",
      subtitle: "Sync Context",
      icon: Database,
      angle: 150,
    },
    {
      id: "govern",
      title: "Govern",
      subtitle: "Human Oversight",
      icon: Users,
      angle: 210,
    },
  ] as CapabilityCardData[],
};
