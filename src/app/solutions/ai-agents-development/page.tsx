import React from 'react';
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

export const metadata = {
  title: 'AI Agents Development Services | Softree Technology',
  description:
    'Design and build enterprise AI agents that automate workflows, make smarter decisions, and deliver exceptional customer experiences at scale.',
};

export default function AIAgentsDevelopmentPage() {
  return (
    <main className="min-h-screen w-full bg-fixed bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-base text-[#0A0F3C] antialiased">
      <NavigationClient />
      <Hero />
      <TrustedBrandsMarquee />
      <SuccessStories />
      <CoreCapabilities />
      {/* <BusinessChallenges />
      <BusinessOutcomes /> */}
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
