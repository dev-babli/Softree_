import React from 'react';
import Hero from './components/Hero/Hero';
import NavigationClient from '@/components/sections/navigation-client';
import WhyChoose from "./components/WhyChoose/WhyChoose";
import CaseStudy from "./components/CaseStudy/CaseStudy";
import Industry from "./components/Industry/Industry";
import AIEngineering from "./components/AIEngineering/AIEngineering";
import AIDevelopmentServices from "./components/AIForITDevlopmentServices/AIDevelopmentServices";

export const metadata = {
  title: 'AI for IT Services & Solutions | Offshore AI Engineering Team | Softree Technology',
  description: 'Accelerate IT operations with Softree’s offshore AI engineering team. Build AI agents, intelligent automation, copilots, RAG solutions, and AI-powered enterprise applications.',
};

export default function AiItDevelopmentServicesPage() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden">
      <NavigationClient />
      <Hero />
      <CaseStudy />
      <WhyChoose />
      <Industry />
      <AIEngineering />
      <AIDevelopmentServices />
    </main>
  );
}
