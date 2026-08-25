import React from 'react';
import dynamic from 'next/dynamic';
import Hero from './components/Hero';
import { Metadata } from 'next';
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";

// Dynamically import below-the-fold components to prioritize network resources for Hero video & LCP
const BusinessChallenges = dynamic(() => import('./components/BusinessChallenges'), { ssr: true });
const BusinessOutcomes = dynamic(() => import('./components/BusinessOutcomes'), { ssr: true });
const CoreCapabilities = dynamic(() => import('./components/CoreCapabilities'), { ssr: true });
const DigitalEngineeringSolutions = dynamic(() => import('./components/DigitalEngineeringSolutions'), { ssr: true });
const AiReadinessBanner = dynamic(() => import('./components/AiReadinessBanner'), { ssr: true });
const PartnerShowcase = dynamic(() => import('./components/PartnerShowcase'), { ssr: true });
const ClientTestimonialsShowcase = dynamic(() => import('./components/ClientTestimonialsShowcase'), { ssr: true });
const Industries = dynamic(() => import('./components/Industries'), { ssr: true });
const SuccessStories = dynamic(() => import('./components/SuccessStories/SuccessStories').then((mod) => mod.SuccessStories), { ssr: true });
const AIPhilosophy = dynamic(() => import('./components/AIPhilosophy'), { ssr: true });
const AIDilemma = dynamic(() => import('./components/AIDilemma'), { ssr: true });
const WhyChooseWithTestimonials = dynamic(() => import('./components/WhyChooseWithTestimonials'), { ssr: true });
const LightFAQExact = dynamic(() => import('./components/LightFAQExact'), { ssr: true });
const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });

export const metadata: Metadata = {
  title: 'AI Development Services | Offshore AI Delivery Partner | Softree',
  description: 'Extend your delivery capacity with Softree\'s offshore AI development team for custom AI, Generative AI, AI agents, RAG, automation, and enterprise integrations.',
  keywords: [
    'AI Development Services',
    'Custom AI Development',
    'Offshore AI Development',
    'AI Development Partner',
    'AI Delivery Partner',
    'AI Solutions',
    'AI Application Development',
    'AI Software Development',
    'Generative AI Development',
    'AI Agent Development',
    'RAG Development',
    'AI Integration Services',
    'White-Label AI Development',
    'AI Engineering Services',
    'Offshore AI Team',
    'Dedicated AI Development Team',
    'AI Implementation Services',
    'LLM Application Development',
    'Generative AI Solutions',
    'AI Automation',
    'Intelligent Automation',
    'AI Workflow Automation',
    'Azure AI Development',
    'Microsoft AI Solutions'
  ],
  alternates: {
    canonical: 'https://www.softreetechnology.com/services/ai-development-services',
  },
  openGraph: {
    title: 'AI Development Services | Offshore AI Delivery Partner | Softree',
    description: 'Scale your AI delivery with Softree\'s offshore engineering team for custom AI, Generative AI, AI agents, RAG, automation, and production-ready AI integrations.',
    url: 'https://www.softreetechnology.com/services/ai-development-services',
    siteName: 'Softree Technology',
    images: [
      {
        url: '/logo/Softree-Technology-Final-Logo-Dark-BG.png',
        width: 1200,
        height: 630,
        alt: 'Softree Technology Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Development Services | Offshore AI Delivery Partner | Softree',
    description: 'Scale your AI delivery with Softree\'s offshore engineering team for custom AI, Generative AI, AI agents, RAG, automation, and production-ready AI integrations.',
    images: ['/logo/Softree-Technology-Final-Logo-Dark-BG.png'],
  },
};

export default function AiDevelopmentServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-clip">
      <NavigationClient />
      <Hero />
      <TrustedBrandsMarquee />
      <SuccessStories />
      <CoreCapabilities />
      <DigitalEngineeringSolutions />
      <AiReadinessBanner />
      <PartnerShowcase />
      <ClientTestimonialsShowcase />
      {/* Storytelling Flow
      <BusinessChallenges />
      <BusinessOutcomes /> */}
      <AIPhilosophy />
      {/* <AIDilemma /> */}
      <Industries />
      <WhyChooseWithTestimonials />
      <LightFAQExact />
      <LightContactSection />
      <Footer />
    </main>
  );
}
