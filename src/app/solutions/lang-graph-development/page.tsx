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
import LangGraphFAQ from "./components/LangGraphFAQ";
import NavigationClient from "@/components/sections/navigation-client";
import LangGraphPortfolio from "./components/LangGraphPortfolio";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";
import WhyChooseWithTestimonials from "./components/why";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";

export const metadata: Metadata = {
  title: "LangGraph Development Services | Softree Technology",
  description:
    "Softree builds production LangGraph solutions—stateful agent graphs, multi-agent workflows, human-in-the-loop checkpoints, tool integrations, memory, and LangSmith observability.",
};

export default function LangGraphDevelopmentPage() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-white font-sans text-base text-[#0A0F3C] antialiased">
      <NavigationClient />
      <Hero />
      <TrustedBrandsMarquee surface="transparent" />
      <SuccessStories />
      <CoreCapabilities />
      <LangGraphPortfolio />
      {/* <BusinessChallenges />
      <BusinessOutcomes /> */}
      <ProvenResults />
      <Industries />
      <AiTechnologyStack />
      <HowAIWorks />
      <WhyChooseWithTestimonials />
      <LangGraphFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
