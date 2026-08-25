import React from 'react';
import dynamic from 'next/dynamic';
import Hero from './components/Hero';
import { Metadata } from 'next';
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import ProvenResults from "./components/ProvenResults";

// Dynamically import below-the-fold components to prioritize network resources for Hero video & LCP
const AiTechnologyStack = dynamic(() => import('./components/AiTechnologyStack'), { ssr: true });
const BusinessChallenges = dynamic(() => import('./components/BusinessChallenges'), { ssr: true });
const HowAIWorks = dynamic(() => import('./components/HowAIWorks'), { ssr: true });
const BusinessOutcomes = dynamic(() => import('./components/BusinessOutcomes'), { ssr: true });
const CoreCapabilities = dynamic(() => import('./components/CoreCapabilities'), { ssr: true });
const Industries = dynamic(() => import('./components/Industries'), { ssr: true });
const SuccessStories = dynamic(() => import('./components/SuccessStories/SuccessStories').then((mod) => mod.SuccessStories), { ssr: true });
const AIPhilosophy = dynamic(() => import('./components/AIPhilosophy'), { ssr: true });
const AIDilemma = dynamic(() => import('./components/AIDilemma'), { ssr: true });
const WhyChooseWithTestimonials = dynamic(() => import('./components/WhyChooseWithTestimonials'), { ssr: true });
const LightFAQExact = dynamic(() => import('./components/LightFAQExact'), { ssr: true });
const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });

export const metadata: Metadata = {
  title: 'AI Development Services | Softree Technology',
  description: 'Extend your delivery capacity with Softree offshore AI development team for custom AI, Generative AI, AI agents, RAG, automation, and enterprise integrations.',
};

export default function AiDevelopmentServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-hidden">
      {/* High-priority Preload for Hero Video */}
      <link
        rel="preload"
        href="/images/ai-development-services/hero/8086715-uhd_3840_2160_25fps.mp4"
        as="video"
        type="video/mp4"
      />

      <NavigationClient />
      <Hero />
      <TrustedBrandsMarquee />
      <SuccessStories />
      <CoreCapabilities />
      {/* Storytelling Flow
      <BusinessChallenges />
      <BusinessOutcomes /> */}
      <ProvenResults />
      <AIPhilosophy />
      {/* <AIDilemma /> */}
      <Industries />
      <AiTechnologyStack />
      <HowAIWorks />
      <WhyChooseWithTestimonials />
      <LightFAQExact />
      <LightContactSection />
      <Footer />
    </main>
  );
}
