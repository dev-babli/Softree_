import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import StackedSlider from "./stack-slider";
import AgenticSection from "./agentic-section";
import EnterpriseAIBenefits from "./enterprise";
import WhyChooseUs from "./why";
import AIStats from "./ai-stats";
import AgenticToolsOverview from "./tools";
import HeroWithTestimonial from "./hero";
import IndustriesSection from "./industry";
import AgenticFramework from "./agentic-frame";
import CtaAgenticAI from "./cta";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import Certifications from "../offshore-power-platform-development/certification";
import AIServicesSection from "./strategy";
import { AgenticFaq } from "./faq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Agentic AI Development Services | AI Agents & Intelligent Automation | Softree",

  description:
    "Softree delivers Agentic AI development services for enterprises, including autonomous AI agents, intelligent workflow automation, Generative AI solutions, and AI-powered business applications.",

  keywords: [
    "Agentic AI development services",
    "AI agent development",
    "autonomous AI agents",
    "enterprise AI solutions",
    "AI workflow automation",
    "Generative AI development",
    "AI automation solutions",
    "LLM application development",
    "AI consulting company",
    "intelligent automation services",
  ],

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-ai-development",
  },

  openGraph: {
    title: "Agentic AI Development Services | AI Agents & Automation Solutions",

    description:
      "Build autonomous AI agents, intelligent workflows, and enterprise AI automation systems with Softree’s Agentic AI development services.",

    url: "https://www.softreetechnology.com/services/offshore-ai-development",

    siteName: "Softree Technology",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Agentic AI Development Services",
      },
    ],

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Agentic AI Development Services | AI Agents & Automation",

    description:
      "Autonomous AI agents, intelligent automation, and enterprise Generative AI solutions tailored for modern businesses.",

    images: ["/og-image.png"],
  },
};

export default function AgenticAIPage() {
  return (
    <div>
      <NavigationClient />
      <HeroWithTestimonial />
      <TrustedBrandsMarquee />
      <StackedSlider />
      <EnterpriseAIBenefits />
      <AgenticToolsOverview />
      <IndustriesSection />
      <AgenticFramework />
      <AIServicesSection />
      <WhyChooseUs />
      <AgenticSection />
      <Certifications />
      <CtaAgenticAI />
      <AgenticFaq />

      <Footer />
    </div>
  );
}
