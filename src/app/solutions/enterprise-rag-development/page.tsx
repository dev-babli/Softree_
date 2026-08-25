import React from 'react';
import { EnterpriseRAGHero } from './components/EnterpriseRAGHero';

import HowAIWorks from './components/HowAIWorks';
import CoreCapabilities from './components/CoreCapabilities';
import BusinessChallenges from './components/BusinessChallenges';
import BusinessOutcomes from './components/BusinessOutcomes';
import ProvenResults from '@/components/sections/ProvenResults';
import TechnologyStack from './components/AiTechnologyStack';
import Industries from './components/Industries';
import { SuccessStories } from './components/SuccessStories';
import WhyChooseWithTestimonials from './components/WhyChooseWithTestimonials';
import LightFAQExact from './components/FAQ';
import NavigationClient from '@/components/sections/navigation-client';
import LightContactSection from '@/components/homepage-light/LightContactSection';
import Footer from '@/components/sections/footer';
import TrustedBrandsMarquee from '@/app/services/offshore-power-platform-development/trust';

export const metadata = {
  title: 'RAG Development Services | Softree Technology',
  description:
    'Expand your AI delivery capabilities with Softree offshore RAG development team. Build secure RAG solutions for enterprise search, knowledge retrieval, AI assistants, and grounded AI.',
};

export default function EnterpriseRAGDevelopmentPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-base text-[#0A0A1A] antialiased">
      <NavigationClient />
      <EnterpriseRAGHero />
      <TrustedBrandsMarquee />
      <SuccessStories />
      <CoreCapabilities />
      {/* <BusinessChallenges />
      <BusinessOutcomes /> */}
      <ProvenResults solution="enterprise-rag" />
      <Industries />
      <TechnologyStack />
      <HowAIWorks />
      <WhyChooseWithTestimonials />
      <LightFAQExact />
      <LightContactSection />
      <Footer />
    </main>
  );
}
