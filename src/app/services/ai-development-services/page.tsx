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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-8 lg:gap-y-10 items-start">

            {/* Top Area: Eyebrow, then Heading & Intro side-by-side */}
            <div className="lg:col-span-12 flex flex-col">
              <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block self-start">
                <span className="typo-caption text-[#FF6B2C] uppercase">
                  WHO WE HELP & WHERE WE OPERATE
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-4 items-start">
                <h2 className="typo-heading-2 text-slate-900 pr-4">
                  AI Engineering For Teams That Need To <span className="text-[#FF6B2C]">Move Faster</span>
                </h2>

                <p className="typo-description text-slate-500 w-full pt-1.5">
                  We help businesses, technology companies, agencies, consultancies, and system integrators build and deliver AI solutions with experienced offshore engineering teams.
                </p>
              </div>
            </div>

            {/* Bottom Row: Who We Help Items (Left) and Globe (Right) */}
            <div className="lg:col-span-6 flex flex-col">
              <WhoWeHelp simple={true} />
            </div>

            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end items-stretch">
              <NetworkGlobe
                heading="Where our clients are"
                tagline="Global Reach. Local Understanding."
                subheading="Trusted by businesses across 13+ countries, we deliver technology solutions that help organizations build, scale, and transform digitally."
                storesLabel="13+ countries served"
                caption="Trusted by businesses across 13+ countries, we deliver technology solutions that help organizations build, scale, and transform digitally."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reverse Sticky Scroll Overall Header */}
      <div className="w-full max-w-[1340px] mx-auto px-4 mt-12 md:mt-16 mb-8 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase">
            What We Build
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4">
          AI Development Solutions Built for <br />
          <span className="text-[#FF6B2C]">Agentic AI & Intelligent Automation</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Build production-ready AI solutions that connect AI agents, enterprise knowledge, business systems and intelligent automation to solve real workflows and deliver outcomes.
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
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-[2cm] mt-4 md:mt-6 flex flex-col items-start text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 typo-caption text-[#FF6B00] mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
          AWS AI ECOSYSTEM
        </div>
        <h2 className="typo-heading-2 max-w-4xl text-slate-900 mb-4">
          Build Agentic AI Solutions Across the <span className="text-[#FF6B2C]">AWS Ecosystem</span>
        </h2>
        <p className="typo-description text-slate-500 max-w-5xl">
          Build production-ready Agentic AI and AI solutions on AWS using foundation models, Amazon Bedrock, RAG, intelligent automation, vector search, and secure cloud infrastructure.
        </p>
      </div>
      <div className="max-w-[1600px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 mt-8 md:mt-12 mb-10 sm:mb-14 md:mb-20 lg:mb-24">
        <div className="relative w-full h-[660px] xs:h-[680px] sm:h-[720px] md:h-[780px] lg:h-[860px] rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/50 shadow-2xl">
          <ArgentLoopSlider className="h-full w-full" />
        </div>
      </div>

      <MicrosoftAiShowcase />

      {/* <AiArchitectureShowcase /> */}
      {/* <DigitalEngineeringSolutions /> */}
      <AiRoadmap />

      {/* <PartnerShowcase /> */}
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
