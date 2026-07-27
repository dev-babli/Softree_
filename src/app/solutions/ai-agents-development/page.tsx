import React from 'react';
import { Hero } from './components/Hero';
import BusinessChallenges from './components/BusinessChallenges';
import CoreCapabilities from './components/CoreCapabilities';
import WhatWeBuild from './components/WhatWeBuild';
import DevelopmentProcess from './components/DevelopmentProcess';
import TechnologyStack from './components/TechnologyStack';
import IndustriesWeServe from './components/IndustriesWeServe';
import SuccessStories from './components/SuccessStories';
import AIAgentsFAQ from './components/AIAgentsFAQ';
import NavigationClient from '@/components/sections/navigation-client';
import LightContactSection from '@/components/homepage-light/LightContactSection';
import Footer from '@/components/sections/footer';
import TrustedByMarquee from '@/components/homepage-light/TrustedByMarquee';

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
      <TrustedByMarquee />
      <BusinessChallenges />
      <CoreCapabilities />
      <WhatWeBuild />
      <DevelopmentProcess />
      <TechnologyStack />
      <IndustriesWeServe />
      <SuccessStories />
      <AIAgentsFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
