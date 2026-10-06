import React from "react";
import type { Metadata } from "next";
import { LanggraphHero } from "./components/LanggraphHero";
import LangGraphWhatWeBuild from "./components/LangGraphWhatWeBuild";
import LangGraphTechnologyStack from "./components/LangGraphTechnologyStack";
import LangGraphSuccessStories from "./components/SuccessStories/LangGraphSuccessStories";
import { LanggraphServices } from "./components/LanggraphServices";
import LanggraphWhoDoWeServeSection from "./components/LanggraphWhoDoWeServeSection";
import ProvenResults from "./components/ProvenResults";
import HowAIWorks from "./components/HowAIWorks";
import { LanggraphHowWeWork } from "./components/LanggraphHowWeWork";
import Industries from "./components/Industries";
import LangGraphFAQ from "./components/LangGraphFAQ";
import NavigationClient from "@/components/sections/navigation-client";
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
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-base text-[#0A0F3C] antialiased">
      <NavigationClient />
      <LanggraphHero />
      <TrustedBrandsMarquee surface="white" />
      <LanggraphServices />
      <LanggraphWhoDoWeServeSection />
      <LangGraphWhatWeBuild />
      <LangGraphSuccessStories />
      <ProvenResults />
      <Industries />
      <LangGraphTechnologyStack />
      <LanggraphHowWeWork />
      <HowAIWorks />
      <WhyChooseWithTestimonials />
      <LangGraphFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
