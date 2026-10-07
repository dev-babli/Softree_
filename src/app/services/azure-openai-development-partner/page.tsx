import { applyPageOg } from "@/lib/site-metadata";
import React from "react";
import type { Metadata } from "next";
import { Hero } from "./components/Hero";
import BusinessChallenges from "./components/BusinessChallenges";
import BusinessOutcomes from "./components/BusinessOutcomes";
import ProvenResults from "@/components/sections/ProvenResults";
import CoreCapabilities from "./components/CoreCapabilities";
import HowAIWorks from "./components/HowAIWorks";
import AiTechnologyStack from "./components/AiTechnologyStack";
import Industries from "./components/Industries";
import { SuccessStories } from "./components/SuccessStories";
import ChatbotFAQ from "./components/ChatbotFAQ";
import NavigationClient from "@/components/sections/navigation-client";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";
import WhyChooseWithTestimonials from "./components/why";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";

export const metadata: Metadata = applyPageOg("/services/azure-openai-development-partner", {
  title: "Azure OpenAI Development Partner | Softree Technology",
  description:
    "Microsoft-certified Azure OpenAI development partner. Production deployment of GPT-4o, embeddings, fine-tuning, and enterprise security guardrails.",
  alternates: {
    canonical: "https://www.softreetechnology.com/services/azure-openai-development-partner",
  },
  openGraph: {
    title: "Azure OpenAI Development Partner | Softree Technology",
    description:
      "Microsoft-certified Azure OpenAI development partner. Production deployment of GPT-4o, embeddings, fine-tuning, and enterprise security guardrails.",
    url: "https://www.softreetechnology.com/services/azure-openai-development-partner",
    siteName: "Softree Technology",
    type: "website",
  },
});

export default function AIChatbotDevelopmentPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-base text-[#0A0F3C] antialiased">
      <NavigationClient />
      <Hero />
      <TrustedBrandsMarquee surface="light" />
      <SuccessStories />
      <CoreCapabilities />
      <BusinessChallenges />
      <BusinessOutcomes />
      <ProvenResults solution="ai-chatbot" />
      <Industries />
      <AiTechnologyStack />
      <HowAIWorks />
      <WhyChooseWithTestimonials />
      <ChatbotFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
