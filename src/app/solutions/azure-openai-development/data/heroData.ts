import {
  Brain,
  Cloud,
  ShieldCheck,
  Database,
  Sparkles,
  Network,
  Layers,
  Workflow,
  TrendingUp,
  KeyRound,
  Search,
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
  features: [
    {
      icon: Cloud,
      title: "AZURE AI FOUNDRY",
      subtitle: "Models in your Azure tenant.",
    },
    {
      icon: Search,
      title: "GROUNDED WITH RAG",
      subtitle: "Azure AI Search + your data.",
    },
    {
      icon: ShieldCheck,
      title: "ENTERPRISE SECURITY",
      subtitle: "Entra ID, private networking.",
    },
    {
      icon: TrendingUp,
      title: "PRODUCTION DELIVERY",
      subtitle: "Strategy to live Azure apps.",
    },
  ] as FeatureItem[],
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
