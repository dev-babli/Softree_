import { applyPageOg } from "@/lib/site-metadata";
import React from 'react';
import { Metadata } from 'next';
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import AmazonBedrockHero from './components/AmazonBedrockHero';
import AmazonBedrockAgentCoreHero from './components/AmazonBedrockAgentCoreHero';
import WhyAgentCoreSlider from './components/WhyAgentCoreSlider';
import AgentCoreSystems from "./components/AgentCoreSystems";
import WhyChooseWithTestimonials from "./components/WhyChooseWithTestimonials";
import AgentCoreFAQ from "./components/AgentCoreFAQ";
import AgentCoreFeaturedUseCase from "./components/AgentCoreFeaturedUseCase";
import TrustedBrandsMarquee from './components/trust';
import AmazonBedrockAgentCoreArc from './components/AmazonBedrockAgentCoreArc';
import AgentCoreBuildCapabilities from './components/AgentCoreBuildCapabilities';
import dynamic from 'next/dynamic';

const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });
const AgentCoreCapabilities = dynamic(() => import('./components/AgentCoreCapabilities'), { ssr: true });
const PAGE_URL = 'https://www.softreetechnology.com/services/amazon-bedrock-agentcore-development';
const SITE_URL = 'https://www.softreetechnology.com';

export const metadata: Metadata = applyPageOg("/services/amazon-bedrock-agentcore-development", {
  title: "Amazon Bedrock & Agent Development | Softree Technology",
  description:
    "Build enterprise generative AI applications using AWS Amazon Bedrock, Claude, Titan models, Knowledge Bases, and secure cloud agents.",
  alternates: {
    canonical: "https://www.softreetechnology.com/services/amazon-bedrock-agentcore-development",
  },
  openGraph: {
    title: "Amazon Bedrock & Agent Development | Softree Technology",
    description:
      "Build enterprise generative AI applications using AWS Amazon Bedrock, Claude, Titan models, Knowledge Bases, and secure cloud agents.",
    url: "https://www.softreetechnology.com/services/amazon-bedrock-agentcore-development",
    siteName: "Softree Technology",
    type: "website",
  },
});

export default function AmazonBedrockAgentCoreDevelopmentPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-clip">
      <NavigationClient />
      <AmazonBedrockHero />
      <AgentCoreBuildCapabilities />
      <AmazonBedrockAgentCoreArc />
      {/* <AmazonBedrockAgentCoreHero /> */}
      <WhyAgentCoreSlider />

      <AgentCoreCapabilities />

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
