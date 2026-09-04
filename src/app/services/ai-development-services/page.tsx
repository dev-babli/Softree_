import React from 'react';
import dynamic from 'next/dynamic';
import { WovenLightHero } from './WovenLightHero';
import { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";

// Dynamically import below-the-fold components to prioritize network resources for Hero video & LCP
const BusinessChallenges = dynamic(() => import('./components/BusinessChallenges'), { ssr: true });
const BusinessOutcomes = dynamic(() => import('./components/BusinessOutcomes'), { ssr: true });
const CoreCapabilities = dynamic(() => import('./components/CoreCapabilities'), { ssr: true });
const DigitalEngineeringSolutions = dynamic(() => import('./components/DigitalEngineeringSolutions'), { ssr: true });
const AiReadinessBanner = dynamic(() => import('./components/AiReadinessBanner'), { ssr: true });
const PartnerShowcase = dynamic(() => import('./components/PartnerShowcase'), { ssr: true });
const ClientTestimonialsShowcase = dynamic(() => import('./components/ClientTestimonialsShowcase'), { ssr: true });
const Industries = dynamic(() => import('./components/Industries'), { ssr: true });
const AiTechnologyStack = dynamic(() => import('./components/AiTechnologyStack'), { ssr: true });
// const AiArchitectureShowcase = dynamic(() => import('./components/AiArchitectureShowcase'), { ssr: true });
const SuccessStories = dynamic(() => import('./components/SuccessStories/SuccessStories').then((mod) => mod.SuccessStories), { ssr: true });
const AIPhilosophy = dynamic(() => import('./components/AIPhilosophy'), { ssr: true });
const AIDilemma = dynamic(() => import('./components/AIDilemma'), { ssr: true });
const AiRoadmap = dynamic(() => import('./components/AiRoadmap'), { ssr: true });
const WhyChooseWithTestimonials = dynamic(() => import('./components/WhyChooseWithTestimonials'), { ssr: true });
const IndustrySoftree = dynamic(() => import('./components/IndustrySoftree'), { ssr: true });
const AgenticAIWipeSlider = dynamic(() => import('./components/AgenticAIWipeSlider'), { ssr: true });
// Replace WhySoftreeTabs with WhySoftreeCurtainSlider
const WhySoftreeCurtainSlider = dynamic(() => import('./components/WhySoftreeCurtainSlider'), { ssr: true });
const LightFAQExact = dynamic(() => import('./components/LightFAQExact'), { ssr: true });
const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });
const CurtainSlider = dynamic(() => import('./components/CurtainSlider/CurtainSlider'), { ssr: true });
const ReverseStickyScroll = dynamic(() => import('./components/ReverseStickyScroll/ReverseStickyScroll').then((mod) => mod.ReverseStickyScroll), { ssr: true });
const MicrosoftAiBentoGrid = dynamic(() => import('./components/MicrosoftAiBentoGrid').then((mod) => mod.MicrosoftAiBentoGrid), { ssr: true });
const MicrosoftAiShowcase = dynamic(() => import('./components/MicrosoftAiShowcase'), { ssr: true });
const WhoWeHelp = dynamic(() => import('./components/WhoWeHelp').then((mod) => mod.WhoWeHelp), { ssr: true });
const NetworkGlobe = dynamic(() => import('./components/NetworkGlobe'), { ssr: true });
const OffshoreEngineeringSection = dynamic(() => import('./components/OffshoreEngineeringSection'), { ssr: true });
const ArgentLoopSlider = dynamic(() => import('@/components/ui/argent-loop-infinite-slider'), { ssr: true });
import DetailDrawer from './components/AiTechnologyStack';
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
    canonical: 'https://www.softreetechnology.com/ai-development-services',
  },
  openGraph: {
    title: 'AI Development Services | Offshore AI Delivery Partner | Softree',
    description: 'Scale your AI delivery with Softree\'s offshore engineering team for custom AI, Generative AI, AI agents, RAG, automation, and production-ready AI integrations.',
    url: 'https://www.softreetechnology.com/ai-development-services',
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
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-clip">
      <NavigationClient />
      <WovenLightHero />
      <AiReadinessBanner />
      {/* Who We Help & Global Network Section */}
      <div id="partnership" className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 text-slate-900 scroll-mt-24">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Unified Centered Header */}
          <div className="flex flex-col items-center w-full mb-16 md:mb-20 text-center">
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-4 py-1.5 rounded-full border border-white/60 mb-4 inline-block">
              <span className="text-[11px] font-bold text-[#FF6B2C] tracking-widest uppercase">
                PARTNERSHIP & GLOBAL REACH
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
              Who We Help & <span className="text-[#FF6B2C]">Where We Operate</span>
            </h2>
            <p className="text-[15px] lg:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We embed dedicated offshore AI engineering teams to help tech-driven organizations accelerate their roadmaps, build custom agents, and deploy secure vector search engines globally.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Who We Help */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <WhoWeHelp />
            </div>
            {/* Right Column: Global Presence (NetworkGlobe) */}
            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-[550px] lg:max-w-[600px]">
                <NetworkGlobe />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reverse Sticky Scroll Overall Header */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 mt-12 md:mt-16 mb-10 flex flex-col items-center text-center">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-4 py-1.5 rounded-full border border-white/60 mb-4 inline-block">
          <span className="text-[11px] font-bold text-[#FF6B2C] tracking-widest uppercase">
            What We Build
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Agentic AI Solutions Built For{" "}
          <span className="text-[#FF6B2C]">Business Workflows</span>
        </h2>

        <p className="text-[15px] lg:text-base text-slate-500 max-w-2xl leading-relaxed mx-auto">
          Build production-ready AI solutions that connect intelligence, enterprise
          data, and automation to solve real business workflows and deliver
          measurable outcomes.
        </p>
      </div>

      <ReverseStickyScroll />

      {/* 
      <TrustedBrandsMarquee /> */}
   
      {/* Interactive Photo Stack Section - Offshore AI Engineering */}
      <OffshoreEngineeringSection />

      <CoreCapabilities />
      <IndustrySoftree />
      {/* <Industries /> */}

      {/* Infinite Parallax AI Showcase */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 my-14 md:my-20 lg:my-24">
        <div className="relative w-full h-[680px] sm:h-[780px] lg:h-[860px] rounded-3xl overflow-hidden border border-zinc-200/50 shadow-2xl">
          <ArgentLoopSlider className="h-full w-full" />
        </div>
      </div>

      {/* <AiArchitectureShowcase /> */}
      {/* <DigitalEngineeringSolutions /> */}
      <AiRoadmap />

      <PartnerShowcase />
      {/* <ClientTestimonialsShowcase /> */}
      {/* Storytelling Flow
      <BusinessChallenges />
      <BusinessOutcomes /> */}
      {/* <AIDilemma /> */}


      {/* <AgenticAIWipeSlider /> */}
      <WhySoftreeCurtainSlider />
      <WhyChooseWithTestimonials />
      <LightFAQExact />
      <LightContactSection />
      <Footer />
    </main>
  );
}
