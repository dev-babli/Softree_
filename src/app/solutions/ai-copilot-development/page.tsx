import React from "react";
import type { Metadata } from "next";
import { CopilotHero } from "./components/CopilotHero";
import TrustedBrandsMarquee from "@/app/services/ai-consulting-services/ai-consulting-services-components/TrustedBrandsMarquee";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer"
import { WhyCopilotDevelopment } from "./components/Why-ai-copilot/WhyCopilotDevelopment";
import { BusinessBenefits } from "./components/Business-benefits/BusinessBenefits";
import CopilotTestimonials from "./components/Testimonial/CopilotTestimonials";
import { CopilotArchitecture } from "./components/Copilot-architecture/CopilotArchitecture";
import { HowCopilotWorks } from "./components/How-ai-copilot-works/HowCopilotWorks";
import { AICopilotSolutions } from "./components/AI-copilot-solutions/AICopilotSolutions";
import CopilotTechnologies from "./components/Technologies/CopilotTechnologies";
import { CopilotProcess } from "./components/Process/CopilotProcess";
import { CopilotCaseStudies } from "./components/Case-studies/CopilotCaseStudies";
import CopilotCapabilities from "./components/Core-capabilities/CopilotCapabilities";
import CopilotChallenges from "./components/Business-challenges/CopilotChallenges";
import CopilotOutcomes from "./components/Business-outcomes/CopilotOutcomes";
import ProvenResults from "@/components/sections/ProvenResults";
import { CopilotIndustries } from "./components/IndustriesWeServe/CopilotIndustries";
import { CopilotFAQ } from "./components/FAQ/CopilotFAQ";
import NavigationClient from "@/components/sections/navigation-client";
import { applyPageOg } from "@/lib/site-metadata";

export const metadata: Metadata = applyPageOg("/solutions/ai-copilot-development", {
  title: "AI Copilot Development Services | Softree Technology",
  description: "Partner with Softree for AI Copilot development, AI agents, Microsoft Copilot Studio, and Azure AI solutions. Scale delivery with our reliable offshore AI engineering team.",
  alternates: {
    canonical: "https://www.softreetechnology.com/solutions/ai-copilot-development",
  },
  openGraph: {
    title: "AI Copilot Development Services | Softree Technology",
    description: "Custom AI Copilots, Microsoft Copilot Studio integration, and Azure AI assistants.",
    url: "https://www.softreetechnology.com/solutions/ai-copilot-development",
    siteName: "Softree Technology",
    type: "website",
  },
});

export default function AICopilotDevelopmentPage() {
  return (
    <>
      <NavigationClient />
      <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 overflow-x-hidden">
        <CopilotHero />
        <TrustedBrandsMarquee />
        <CopilotCaseStudies />
        <CopilotCapabilities />
        <ProvenResults solution="ai-copilot" />
        <CopilotIndustries />
        <CopilotTechnologies />
        <CopilotProcess />
        <CopilotTestimonials />
        <CopilotFAQ />
      </main>
      <LightContactSection />
      <Footer />
    </>
  );
}
