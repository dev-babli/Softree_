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
import LangChainFAQ from "./components/LangChainFAQ";
import NavigationClient from "@/components/sections/navigation-client";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";
import WhyChooseWithTestimonials from "./components/why";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";

export const metadata: Metadata = {
  title: "LangChain Development Services for AI Applications | Softree Technology",
  description:
    "Softree provides LangChain development services for AI applications, including RAG pipelines, LangGraph agent workflows, tool integrations, memory, guardrails, and LangSmith observability.",
};

export default function LangChainDevelopmentPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-base text-[#0A0F3C] antialiased">
      <NavigationClient />
      <Hero />
      <TrustedBrandsMarquee surface="light" />
      <SuccessStories />
      <CoreCapabilities />
      <BusinessChallenges />
      <BusinessOutcomes />
      <ProvenResults />
      <Industries />
      <AiTechnologyStack />
      <HowAIWorks />
      <WhyChooseWithTestimonials />
      <LangChainFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
