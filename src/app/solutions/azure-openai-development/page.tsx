import React from "react";
import type { Metadata } from "next";
import { Hero } from "./components/Hero";
import BusinessChallenges from "./components/BusinessChallenges";
import BusinessOutcomes from "./components/BusinessOutcomes";
import ProvenResults from "./components/ProvenResults";
import CoreCapabilities from "./components/CoreCapabilities";
import AzurePortfolio from "./components/AzurePortfolio";
import AzureResilience from "./components/AzureResilience";
import HowAIWorks from "./components/HowAIWorks";
import AiTechnologyStack from "./components/AiTechnologyStack";
import Industries from "./components/Industries";
import { SuccessStories } from "./components/SuccessStories";
import AzureOpenAIFAQ from "./components/AzureOpenAIFAQ";
import NavigationClient from "@/components/sections/navigation-client";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";
import WhyChooseWithTestimonials from "./components/why";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";

export const metadata: Metadata = {
  title: "Azure OpenAI Development Services | Softree Technology",
  description:
    "Softree builds secure Azure OpenAI solutions—GPT apps, enterprise RAG, Microsoft 365 copilots, and governed Azure AI—from strategy to production.",
};

export default function AzureOpenAIDevelopmentPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-base text-[#0A0F3C] antialiased">
      <NavigationClient />
      <Hero />
      <TrustedBrandsMarquee surface="light" />
      <SuccessStories />
      <CoreCapabilities />
      <AzurePortfolio />
      <AzureResilience />
      {/* <BusinessChallenges />
      <BusinessOutcomes /> */}
      <ProvenResults />
      <Industries />
      <AiTechnologyStack />
      <HowAIWorks />
      <WhyChooseWithTestimonials />
      <AzureOpenAIFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
