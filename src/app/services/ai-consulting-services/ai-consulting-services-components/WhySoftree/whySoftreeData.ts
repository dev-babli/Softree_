import { Target, LayoutGrid, ShieldCheck, Activity, Code } from "lucide-react";

import wsimg1 from "../../../../../../public/images/ai-consulting-service-image/why-softree/wsimg-1.png";
import wsimg2 from "../../../../../../public/images/ai-consulting-service-image/why-softree/wsimg-2.png";
import wsimg3 from "../../../../../../public/images/ai-consulting-service-image/why-softree/wsimg-3.png";
import wsimg4 from "../../../../../../public/images/ai-consulting-service-image/why-softree/wsimg-4.png";
import wsimg5 from "../../../../../../public/images/ai-consulting-service-image/why-softree/wsimg-5.png";

export interface Feature {
  title: string;
  description: string;
  icon: any;
}

export interface WhySoftreeItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  image: any;
  features: Feature[];
  icon: any;
}

export const whySoftreeData: WhySoftreeItem[] = [
  {
    id: "enterprise-first",
    number: "01",
    title: "Enterprise-first AI",
    shortTitle: "Enterprise-first AI",
    description: "We build enterprise-grade AI solutions that align with your business objectives, governance, and compliance needs.",
    image: wsimg1,
    icon: Target,
    features: [
      {
        title: "Strategic Alignment",
        description: "Solutions designed around your business goals.",
        icon: Target,
      },
      {
        title: "Governance Ready",
        description: "Built with security, ethics, and compliance in mind.",
        icon: ShieldCheck,
      },
      {
        title: "Risk & Compliance",
        description: "Industry standards met, risks proactively managed.",
        icon: LayoutGrid,
      }
    ]
  },
  {
    id: "microsoft-expertise",
    number: "02",
    title: "Microsoft AI Expertise",
    shortTitle: "Microsoft AI Expertise",
    description: "As a trusted Microsoft partner, we leverage the full power of Azure AI, Copilot, and the Microsoft ecosystem.",
    image: wsimg2,
    icon: LayoutGrid,
    features: [
      {
        title: "Azure Native",
        description: "Deep integration with Azure OpenAI and Cognitive Services.",
        icon: LayoutGrid,
      },
      {
        title: "Copilot Extensions",
        description: "Custom Microsoft 365 Copilot development.",
        icon: Code,
      },
      {
        title: "Data Platform",
        description: "Unified analytics with Microsoft Fabric.",
        icon: Activity,
      }
    ]
  },
  {
    id: "secure-scalable",
    number: "03",
    title: "Secure & Scalable Solutions",
    shortTitle: "Secure & Scalable Solutions",
    description: "Our architectures are designed to scale seamlessly while maintaining the highest levels of data security and privacy.",
    image: wsimg3,
    icon: ShieldCheck,
    features: [
      {
        title: "Enterprise Security",
        description: "End-to-end encryption and zero-trust architecture.",
        icon: ShieldCheck,
      },
      {
        title: "Elastic Scaling",
        description: "Cloud-native designs that grow with your needs.",
        icon: Activity,
      },
      {
        title: "Data Privacy",
        description: "Strict adherence to GDPR, HIPAA, and industry regulations.",
        icon: Target,
      }
    ]
  },
  {
    id: "outcome-focused",
    number: "04",
    title: "Business Outcome Focused",
    shortTitle: "Business Outcome Focused",
    description: "We focus on measurable ROI, ensuring every AI initiative drives tangible value for your organization.",
    image: wsimg4,
    icon: Activity,
    features: [
      {
        title: "Value Driven",
        description: "Clear KPIs and success metrics for every project.",
        icon: Target,
      },
      {
        title: "Rapid Prototyping",
        description: "Fast time-to-market for initial AI proofs of concept.",
        icon: Activity,
      },
      {
        title: "Continuous Optimization",
        description: "Ongoing tuning to maximize business impact.",
        icon: LayoutGrid,
      }
    ]
  },
  {
    id: "custom-development",
    number: "05",
    title: "Custom AI Development",
    shortTitle: "Custom AI Development",
    description: "From intelligent agents to complex machine learning models, we build tailored solutions for unique challenges.",
    image: wsimg5,
    icon: Code,
    features: [
      {
        title: "Agentic Workflows",
        description: "Autonomous AI agents that execute complex tasks.",
        icon: Code,
      },
      {
        title: "Custom LLMs",
        description: "Fine-tuned language models on your proprietary data.",
        icon: Activity,
      },
      {
        title: "System Integration",
        description: "Seamless connection with your existing tech stack.",
        icon: LayoutGrid,
      }
    ]
  }
];
