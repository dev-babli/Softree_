import React from "react";
import {
  Brain,
  Database,
  Sparkles,
  Layers,
  KeyRound,
  Search,
} from "lucide-react";

export interface CapabilityCardData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  angle: number;
}

export interface MetricItem {
  number: string;
  value: string;
  label: string;
  desc: string;
}

export const HERO_DATA = {
  label: "AZURE OPENAI DEVELOPMENT",
  heading: {
    prefix: "Azure OpenAI Development Services",
    highlight: "for Enterprise GPT Apps",
    suffix: "",
  },
  paragraph:
    "Softree provides Azure OpenAI development services to design, build, and deploy secure GPT applications on Azure—enterprise RAG, Microsoft 365 copilots, governed APIs, and production-ready AI integrated with your Microsoft stack.",
  ctaButtons: {
    primary: {
      text: "Talk to an Expert",
      href: "https://www.softreetechnology.com/contact",
    },
    secondary: { text: "", href: "" },
  },
  metrics: [
    {
      number: "01",
      value: "55%",
      label: "Faster Knowledge Access",
      desc: "Cut enterprise Q&A search times",
    },
    {
      number: "02",
      value: "42%",
      label: "Faster First Response",
      desc: "Accelerated support workflows",
    },
    {
      number: "03",
      value: "50%",
      label: "Doc Cycle Time Cut",
      desc: "Document intelligence speedup",
    },
  ] as MetricItem[],
  capabilities: [
    {
      id: "models",
      title: "Models",
      subtitle: "GPT on Azure",
      icon: Brain,
      angle: 270,
    },
    {
      id: "ground",
      title: "Ground",
      subtitle: "RAG & Search",
      icon: Search,
      angle: 330,
    },
    {
      id: "build",
      title: "Build",
      subtitle: "Apps & APIs",
      icon: Layers,
      angle: 30,
    },
    {
      id: "secure",
      title: "Secure",
      subtitle: "Entra & Keys",
      icon: KeyRound,
      angle: 90,
    },
    {
      id: "integrate",
      title: "Integrate",
      subtitle: "M365 & Data",
      icon: Database,
      angle: 150,
    },
    {
      id: "scale",
      title: "Scale",
      subtitle: "Govern & Optimize",
      icon: Sparkles,
      angle: 210,
    },
  ] as CapabilityCardData[],
};
