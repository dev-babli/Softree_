import { applyPageOg } from "@/lib/site-metadata";
import React from "react";
import type { Metadata } from "next";
import { Hero } from "./components/Hero";
import BusinessChallenges from "./components/BusinessChallenges";
import BusinessOutcomes from "./components/BusinessOutcomes";
import ProvenResults from "./components/ProvenResults";
import CoreCapabilities from "./components/CoreCapabilities";
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

export const metadata: Metadata = applyPageOg("/solutions/azure-openai-development", {
  title: "Azure OpenAI Development Services | Softree Technology",
  description:
    "Enterprise Azure OpenAI application development. Custom GPT models, enterprise RAG search, copilot integration, and Microsoft cloud security standards.",
  alternates: {
    canonical: "https://www.softreetechnology.com/solutions/azure-openai-development",
  },
  openGraph: {
    title: "Azure OpenAI Development Services | Softree Technology",
    description:
      "Enterprise Azure OpenAI application development. Custom GPT models, enterprise RAG search, copilot integration, and Microsoft cloud security standards.",
    url: "https://www.softreetechnology.com/solutions/azure-openai-development",
    siteName: "Softree Technology",
    type: "website",
  },
});

export default function AzureOpenAIDevelopmentPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white font-sans text-base text-[#0A0F3C] antialiased">
      <NavigationClient />
      <Hero />
      <TrustedBrandsMarquee surface="legacy" />
      <SuccessStories />
      <CoreCapabilities />
      <BusinessChallenges />
      <BusinessOutcomes />
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
