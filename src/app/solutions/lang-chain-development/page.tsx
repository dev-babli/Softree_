import React from "react";
import type { Metadata } from "next";
import { Hero } from "./components/Hero";
import BusinessChallenges from "./components/BusinessChallenges";
import BusinessOutcomes from "./components/BusinessOutcomes";
import ProvenResults from "./components/ProvenResults";
import CoreCapabilities from "./components/CoreCapabilities";
import LangChainPortfolio from "./components/LangChainPortfolio";
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

const trustItems = [
  { name: "GO ERP", src: "/images/logo/goerp1.jpg" },
  { name: "White-Label Friendly" },
  { name: "Nuvento", src: "/images/logo/nuvento.jpg" },
  { name: "Seamless integration" },
  { name: "Snapon", src: "/images/logo/snapon.jpg" },
  { name: "Dedicated Offshore Teams" },
  { name: "Jonians", src: "/images/logo/jonians.jpg" },
  { name: "Scalable capacity" },
  { name: "Export Control Group", src: "/images/logo/ecg.png" },
  { name: "Microsoft AI Expertise" },
  { name: "SP Marketplace", src: "/images/logo/1.jpg" },
  { name: "Certified partners" },
  { name: "Bosch", src: "/images/logo/bosch.png" },
  { name: "Enterprise-Ready Delivery" },
  { name: "Emscale", src: "/images/logo/emscale_logo.png" },
  { name: "Proven execution" },
];

export default function LangChainDevelopmentPage() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-white font-sans text-base text-[#0A0F3C] antialiased">
      <NavigationClient />
      <Hero />
      <TrustedBrandsMarquee surface="transparent" items={trustItems} title="Offshore Delivery Model" />
      <SuccessStories />
      <CoreCapabilities />
      <LangChainPortfolio />
      {/* <BusinessChallenges />
      <BusinessOutcomes /> */}
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
