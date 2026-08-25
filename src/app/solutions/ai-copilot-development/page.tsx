import React from "react";
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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Copilot Development Services | Softree Technology",
  description: "Partner with Softree for AI Copilot development, AI agents, Microsoft Copilot Studio, and Azure AI solutions. Scale delivery with our reliable offshore AI engineering team.",
};

export default function AICopilotDevelopmentPage() {
  return (
    <>
      <NavigationClient />
      <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 overflow-x-hidden">
        <CopilotHero />
        <TrustedBrandsMarquee />
        <CopilotCaseStudies />
        <CopilotCapabilities />
        {/* <CopilotChallenges />
        <CopilotOutcomes /> */}
        <ProvenResults solution="ai-copilot" />

        {/* <WhyCopilotDevelopment /> */}
        <CopilotIndustries />
        <CopilotTechnologies />
        <CopilotProcess />

        {/* <BusinessBenefits /> */}
        <CopilotTestimonials />
        <CopilotFAQ />
      </main>
      <LightContactSection />
      <Footer />
    </>
  );
}
