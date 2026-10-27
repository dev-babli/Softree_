import React from 'react';
import dynamic from 'next/dynamic';
import { WovenLightHero } from './WovenLightHero';
import { Metadata } from 'next';
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import TrustedBrandsMarquee from '@/app/services/offshore-power-platform-development/trust';

// Dynamically import below-the-fold components to prioritize network resources for Hero video & LCP
const AiReadinessBanner = dynamic(() => import('./components/AiReadinessBanner'), { ssr: true });
const WhoWeHelp = dynamic(() => import('./components/WhoWeHelp').then((mod) => mod.WhoWeHelp), { ssr: true });
const NetworkGlobe = dynamic(() => import('./components/NetworkGlobe'), { ssr: true });
const NewWhoDoWeServeSection = dynamic(() => import('./components/NewWhoDoWeServeSection'), { ssr: true });
const CoreCapabilities = dynamic(() => import('./components/CoreCapabilities'), { ssr: true });
const AiRoadmap = dynamic(() => import('./components/AiRoadmap'), { ssr: true });
const WhyChooseWithTestimonials = dynamic(() => import('./components/WhyChooseWithTestimonials'), { ssr: true });
const IndustrySoftree = dynamic(() => import('./components/IndustrySoftree'), { ssr: true });
const WhySoftreeCurtainSlider = dynamic(() => import('./components/WhySoftreeCurtainSlider'), { ssr: true });
const LightFAQExact = dynamic(() => import('./components/LightFAQExact'), { ssr: true });
const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });
const ReverseStickyScroll = dynamic(() => import('./components/ReverseStickyScroll/ReverseStickyScroll').then((mod) => mod.ReverseStickyScroll), { ssr: true });
const AiDevelopmentSuccessStories = dynamic(() => import('./components/AiDevelopmentSuccessStories'), { ssr: true });
const MicrosoftAiShowcase = dynamic(() => import('./components/MicrosoftAiShowcase'), { ssr: true });
const OffshoreEngineeringSection = dynamic(() => import('./components/OffshoreEngineeringSection'), { ssr: true });
const ArgentLoopSlider = dynamic(() => import('@/components/ui/argent-loop-infinite-slider'), { ssr: true });
export const metadata: Metadata = {
  title: {
    absolute: 'AI Development Services | Offshore AI Engineering | Softree',
  },
  description: 'Enterprise AI development services. Hire offshore AI developers to build custom copilots, agentic workflows, and RAG pipelines with Softree Technology.',
  keywords: [
    // Primary Keyword
    'AI Development Services',
    // Secondary Keywords — Core & Partner Variations
    'AI Development Company',
    'AI Development Companies',
    'AI Development Service',
    'Custom AI Development Services',
    'Custom AI Development Company',
    'Offshore AI Development',
    'Offshore AI Engineering Partner',
    'Enterprise AI Solutions',
    'AI Development Partner',
    'AI Delivery Partner',
    'AI Development Solutions',
    'AI Solutions',
    'AI Application Development',
    'AI Software Development',
    'AI Software Development Services',
    'AI Software Development Companies',
    'AI Software Developers',
    'AI App Development Company',
    'AI and Software Development',
    'AI-Based Software Development',
    'Artificial Intelligence Software Development',
    'Artificial Intelligence Development Companies',
    'AI/ML Development Services',
    'AI/ML Development Company',
    'Machine Learning Development',
    'Machine Learning Development Company',
    'ML Development Company',
    'Generative AI Development',
    'Generative AI Solutions',
    'AI Agent Development',
    'RAG Development',
    'AI Integration Services',
    'AI Engineering Services',
    'AI Implementation Services',
    'AI Automation',
    'Intelligent Automation',
    'AI Workflow Automation',
    'LLM Application Development',
    'Azure AI Development',
    'Microsoft AI Solutions',
    'White-Label AI Development',
    'Offshore AI Team',
    'Dedicated AI Development Team'
  ],
  alternates: {
    canonical: 'https://www.softreetechnology.com/services/ai-development-services',
  },
  openGraph: {
    title: 'AI Development Services | Offshore AI Engineering | Softree',
    description: 'Enterprise AI development services. Hire offshore AI developers to build custom copilots, agentic workflows, and RAG pipelines with Softree Technology.',
    url: 'https://www.softreetechnology.com/services/ai-development-services',
    siteName: 'Softree Technology',
    images: [
      {
        url: '/logo/Softree-Technology-Final-Logo-Dark-BG.webp',
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
    title: 'AI Development Services | Offshore AI Engineering | Softree',
    description: 'Enterprise AI development services. Hire offshore AI developers to build custom copilots, agentic workflows, and RAG pipelines with Softree Technology.',
    images: ['/logo/Softree-Technology-Final-Logo-Dark-BG.webp'],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Development Services",
  "serviceType": "AI Development Services",
  "provider": {
    "@type": "Organization",
    "name": "Softree Technology",
    "url": "https://www.softreetechnology.com",
    "logo": "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo-Dark-BG.webp",
    "sameAs": [
      "https://www.linkedin.com/company/softreetechnology"
    ]
  },
  "areaServed": "Global",
  "description": "Custom Agentic AI, autonomous AI agents, enterprise RAG, intelligent automation, and offshore AI engineering delivery for enterprises and tech companies.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Development & Engineering Solutions",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Agent & Multi-Agent Development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Enterprise RAG & Knowledge Retrieval"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Workflow Automation & Integration"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Microsoft Azure & OpenAI Engineering"
        }
      }
    ]
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.softreetechnology.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "AI Development Services",
      "item": "https://www.softreetechnology.com/services/ai-development-services"
    }
  ]
};

export default function AiDevelopmentServicesPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NavigationClient />
      <WovenLightHero />
      <TrustedBrandsMarquee />
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
            <div className="lg:col-span-6 flex flex-col h-full">
              <WhoWeHelp simple={true} />
            </div>

            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end items-stretch h-full">
              <NetworkGlobe
                heading="Where our clients are"
                tagline="Global Reach. Local Understanding."
                storesLabel="13+ countries served"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <NewWhoDoWeServeSection className="bg-white" /> */}

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
      <AiDevelopmentSuccessStories />
      {/* Interactive Photo Stack Section - Offshore AI Engineering */}
      {/* <OffshoreEngineeringSection /> */}
      {/* <CoreCapabilities /> */}
      {/* <IndustrySoftree /> */}
      {/* Infinite Parallax AI Showcase */}
      {/* <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-[2cm] mt-4 md:mt-6 flex flex-col items-start text-left">
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
      </div> */}
      <MicrosoftAiShowcase />
      {/* <AiRoadmap /> */}
      <WhySoftreeCurtainSlider />
      <WhyChooseWithTestimonials />
      <LightFAQExact />
      <LightContactSection />
      <Footer />
    </main>
  );
}
