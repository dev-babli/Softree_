import React from 'react';
import { Metadata } from 'next';
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
// import AmazonBedrockAgentCoreHero from './components/AmazonBedrockAgentCoreHero';
import AgentCoreTabbedHero from './components/AgentCoreTabbedHero';
import WhyAgentCoreSlider from './components/WhyAgentCoreSlider';
import AgentCoreSystems from "./components/AgentCoreSystems";
import WhyChooseWithTestimonials from "./components/WhyChooseWithTestimonials";
import AgentCoreFAQ from "./components/AgentCoreFAQ";
import AgentCoreFeaturedUseCase from "./components/AgentCoreFeaturedUseCase";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";
import dynamic from 'next/dynamic';

const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });
const PAGE_URL = 'https://www.softreetechnology.com/industries/amazon-bedrock-agentcore-development';
const SITE_URL = 'https://www.softreetechnology.com';

export const metadata: Metadata = {
  title: 'Amazon Bedrock AgentCore Development | Softree',
  description:
    'Build, deploy and operate AI agents that can reason, use tools, access enterprise data and take real business actions.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Amazon Bedrock AgentCore Development | Softree',
    description:
      'Build, deploy and operate AI agents that can reason, use tools, access enterprise data and take real business actions.',
    url: PAGE_URL,
    siteName: 'Softree Technology',
    images: [
      {
        url: '/logo/Softree-Technology-Final-Logo-Dark-BG.png',
        width: 1200,
        height: 630,
        alt: 'Softree Amazon Bedrock AgentCore Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amazon Bedrock AgentCore Development | Softree',
    description:
      'Build, deploy and operate AI agents that can reason, use tools, access enterprise data and take real business actions.',
    images: ['/logo/Softree-Technology-Final-Logo-Dark-BG.png'],
  },
};

export default function AmazonBedrockAgentCoreDevelopmentPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-clip">
      <NavigationClient />
      {/* <AmazonBedrockAgentCoreHero /> */}
      <AgentCoreTabbedHero />
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
