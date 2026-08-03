import React from "react";
import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";
import { AdvancedHero } from "./components/AdvancedHero";
import BusinessChallenges from "./components/BusinessChallenges";
import BusinessOutcomes from "./components/BusinessOutcomes";
import ProvenResults from "@/components/sections/ProvenResults";
import CoreCapabilities from "./components/CoreCapabilities";
import HowAIWorks from "./components/HowAIWorks";
import AiTechnologyStack from "./components/AiTechnologyStack";
import IndustriesShowcase from "./components/IndustriesShowcase";
import { SuccessStories } from "./components/SuccessStories";
import LightFAQExact from "./components/LightFAQExact";
import NavigationClient from "@/components/sections/navigation-client";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";
import WhyChooseWithTestimonials from "./components/why";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";

export const metadata: Metadata = applyPageOg("/services/enterprise-ai-solution", {
  title: "Enterprise AI Solutions & Strategy Services | Softree Technology",
  description:
    "Deploy secure, scalable, and governed Enterprise AI Solutions. Softree delivers AI strategy, custom agents, RAG, copilots, and process automation with measurable ROI.",
});

export default function EnterpriseAISolutionPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-base text-[#0A0F3C] antialiased">
      <NavigationClient />
      <AdvancedHero />
      <TrustedBrandsMarquee surface="light" />
      <SuccessStories />
      <CoreCapabilities />
      <BusinessChallenges />
      <BusinessOutcomes />
      <ProvenResults solution="enterprise-ai" />
      <IndustriesShowcase />
      <AiTechnologyStack />
      <HowAIWorks />
      <WhyChooseWithTestimonials />
      <LightFAQExact />
      <LightContactSection />
      <Footer />
    </main>
  );
}
