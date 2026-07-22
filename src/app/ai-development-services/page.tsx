import React from 'react';
import Hero from './components/Hero';
import BusinessChallenges from './components/BusinessChallenges';
import HowAIWorks from './components/HowAIWorks';
import OurAISolutions from './components/OurAISolutions';
import Industries from './components/Industries';
import SuccessStories from './components/SuccessStories';
import WhySoftree from './components/WhySoftree';
import { Metadata } from 'next';
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import LightContactSection from '@/components/homepage-light/LightContactSection';
import TrustedByMarquee from '@/components/homepage-light/TrustedByMarquee';

export const metadata: Metadata = {
  title: 'AI Development Services | Softree Technology',
  description: 'AI Development Services That Deliver Measurable Business Outcomes.',
};

export default function AiDevelopmentServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-hidden">
      <NavigationClient />
      <Hero />
      <TrustedByMarquee />
      <BusinessChallenges />
      <HowAIWorks />
      <OurAISolutions />
      <Industries />
      <SuccessStories />
      <WhySoftree />
      <LightContactSection />
      <Footer />
    </main>
  );
}
