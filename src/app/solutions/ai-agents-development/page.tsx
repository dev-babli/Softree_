import React from 'react';
import type { Metadata } from 'next';
import { Hero } from './components/Hero';
import BusinessChallenges from './components/BusinessChallenges';
import BusinessOutcomes from './components/BusinessOutcomes';
import ProvenResults from '@/components/sections/ProvenResults';
import CoreCapabilities from './components/CoreCapabilities';
import HowAIWorks from './components/HowAIWorks';
import AiTechnologyStack from './components/AiTechnologyStack';
import Industries from './components/Industries';
import { SuccessStories } from './components/SuccessStories';
import AIAgentsFAQ from './components/AIAgentsFAQ';
import NavigationClient from '@/components/sections/navigation-client';
import LightContactSection from '@/components/homepage-light/LightContactSection';
import Footer from '@/components/sections/footer';
import WhyChooseWithTestimonials from './components/why';
import TrustedBrandsMarquee from '@/app/services/offshore-power-platform-development/trust';
import { applyPageOg } from '@/lib/site-metadata';

export const metadata: Metadata = applyPageOg('/solutions/ai-agents-development', {
  title: 'AI Agent Development Services | Softree Technology',
  description:
    'Add AI agent capability to your delivery portfolio with Softree. We build custom AI agents for automation, integrations, knowledge workflows, and business operations.',
  alternates: {
    canonical: 'https://www.softreetechnology.com/solutions/ai-agents-development',
  },
  openGraph: {
    title: 'AI Agent Development Services | Softree Technology',
    description:
      'Custom AI agents for enterprise automation, system integrations, and intelligent workflow operations.',
    url: 'https://www.softreetechnology.com/solutions/ai-agents-development',
    siteName: 'Softree Technology',
    type: 'website',
  },
});

export default function AIAgentsDevelopmentPage() {
  return (
    <main className="min-h-screen w-full bg-fixed bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-base text-[#0A0F3C] antialiased">
      <NavigationClient />
      <Hero />
      <TrustedBrandsMarquee />
      <SuccessStories />
      <CoreCapabilities />
      <ProvenResults solution="ai-agents" />
      <Industries />
      <AiTechnologyStack />
      <HowAIWorks />
      <WhyChooseWithTestimonials />
      <AIAgentsFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
