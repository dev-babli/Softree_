import React from "react";
import { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import AmazonBedrockHero from "@/app/industries/amazon-bedrock-agentcore-development/components/AmazonBedrockHero";
import WhyAgentCoreSlider from "@/app/industries/amazon-bedrock-agentcore-development/components/WhyAgentCoreSlider";
import AgentCoreSystems from "@/app/industries/amazon-bedrock-agentcore-development/components/AgentCoreSystems";
import AgentCoreFeaturedUseCase from "@/app/industries/amazon-bedrock-agentcore-development/components/AgentCoreFeaturedUseCase";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";
import WhyChooseWithTestimonials from "@/app/industries/amazon-bedrock-agentcore-development/components/WhyChooseWithTestimonials";
import AgentCoreFAQ from "@/app/industries/amazon-bedrock-agentcore-development/components/AgentCoreFAQ";
import dynamic from "next/dynamic";

const LightContactSection = dynamic(
  () => import("@/components/homepage-light/LightContactSection"),
  { ssr: true }
);

export const metadata: Metadata = {
  title: "Amazon Bedrock Solutions | Softree",
  description:
    "Build with Amazon Bedrock, Scale with Confidence. Accelerate generative AI innovation with leading foundation models and expert engineering.",
};

export default function AmazonBedrockPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-clip">
      <NavigationClient />
      <AmazonBedrockHero />
      <WhyAgentCoreSlider />
      <AgentCoreSystems />
      <AgentCoreFeaturedUseCase />
      <TrustedBrandsMarquee />
      <WhyChooseWithTestimonials />
      <AgentCoreFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
