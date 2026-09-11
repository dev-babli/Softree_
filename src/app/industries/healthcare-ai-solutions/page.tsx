import React from 'react';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import { COUNTRIES_SERVED } from '@/lib/constants';

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
const StepWipe = dynamic(() => import('./components/StepWipe/StepWipe'), { ssr: true });
// const ReverseStickyScroll = dynamic(() => import('./components/ReverseStickyScroll/ReverseStickyScroll').then((mod) => mod.ReverseStickyScroll), { ssr: true });
const MicrosoftAiBentoGrid = dynamic(() => import('./components/MicrosoftAiBentoGrid').then((mod) => mod.MicrosoftAiBentoGrid), { ssr: true });
const MicrosoftAiShowcase = dynamic(() => import('./components/MicrosoftAiShowcase'), { ssr: true });
const WhoWeHelp = dynamic(() => import('./components/WhoWeHelp').then((mod) => mod.WhoWeHelp), { ssr: true });
const NetworkGlobe = dynamic(() => import('./components/NetworkGlobe'), { ssr: true });
import DetailDrawer from './components/AiTechnologyStack';
import PhotoStackGallery from './components/PhotoStackGallery';
import GatewayFlowHero from './components/GatewayFlowHero';
import { CircularTestimonialsDemo } from './components/circular-testimonials-demo';
import TrustedBrandsMarquee from './components/trust';
const HealthcareCaseStudies = dynamic(() => import('./components/HealthcareCaseStudies'), { ssr: true });
const PAGE_URL = 'https://www.softreetechnology.com/industries/healthcare-ai-solutions';
const SITE_URL = 'https://www.softreetechnology.com';

export const metadata: Metadata = {
  title: 'Offshore Healthcare AI Solutions & Development Services | Softree',
  description:
    'Build secure, scalable healthcare AI solutions with Softree’s offshore AI engineering team. Develop AI agents, RAG applications, intelligent automation, and modern healthcare software.',
  keywords: [
    // Primary Keyword
    'Offshore Healthcare AI Solutions & Development Services',
    // Secondary Keywords
    'Healthcare AI Development Services',
    'Healthcare AI Solutions',
    'Offshore Healthcare AI Development',
    'Offshore AI Engineering',
    'Healthcare AI Engineering Services',
    'Healthcare AI Development Company',
    'AI Development for Healthcare',
    'Healthcare AI Agents',
    'Healthcare RAG Development',
    'Generative AI for Healthcare',
    'Healthcare Automation Solutions',
    'Offshore Healthcare Software Development',
    'Intelligent Healthcare Software',
    // Supporting SEO Topics
    'Enterprise healthcare AI',
    'AI-powered healthcare solutions',
    'Healthcare workflow automation',
    'AI-powered healthcare applications',
    'Healthcare knowledge assistants',
    'AI document processing for healthcare',
    'Healthcare decision support',
    'AI integration with existing healthcare systems',
    'Healthcare AI modernization',
    'Secure and scalable AI architecture',
    'Dedicated offshore AI engineering team',
    'Healthcare AI consulting',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Offshore Healthcare AI Solutions & Development Services | Softree',
    description:
      'Build secure, scalable healthcare AI solutions with Softree’s offshore AI engineering team. Develop AI agents, RAG applications, intelligent automation, and modern healthcare software.',
    url: PAGE_URL,
    siteName: 'Softree Technology',
    images: [
      {
        url: '/logo/Softree-Technology-Final-Logo-Dark-BG.png',
        width: 1200,
        height: 630,
        alt: 'Softree Offshore Healthcare AI Solutions & Development Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offshore Healthcare AI Solutions & Development Services | Softree',
    description:
      'Build secure, scalable healthcare AI solutions with Softree’s offshore AI engineering team. Develop AI agents, RAG applications, intelligent automation, and modern healthcare software.',
    images: ['/logo/Softree-Technology-Final-Logo-Dark-BG.png'],
  },
};

const healthcareJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'Offshore Healthcare AI Solutions & Development Services | Softree',
      description:
        'Build secure, scalable healthcare AI solutions with Softree’s offshore AI engineering team. Develop AI agents, RAG applications, intelligent automation, and modern healthcare software.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Softree Technology',
      },
      about: {
        '@type': 'Thing',
        name: 'Offshore Healthcare AI Solutions & Development Services',
        description:
          'Comprehensive offshore healthcare AI engineering services, medical RAG, clinical decision support, healthcare workflow automation, and legacy modernization.',
      },
      breadcrumb: {
        '@id': `${PAGE_URL}#breadcrumb`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Industries',
          item: `${SITE_URL}/industries`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Healthcare AI Solutions',
          item: PAGE_URL,
        },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Offshore Healthcare AI Solutions & Development Services',
      serviceType: 'Offshore Healthcare AI Engineering & Development',
      category: 'Healthcare Technology & Artificial Intelligence',
      provider: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Softree Technology',
        url: SITE_URL,
        logo: `${SITE_URL}/logo/Softree-Technology-Final-Logo-Dark-BG.png`,
      },
      areaServed: 'Global',
      description:
        'Enterprise offshore healthcare AI development offering AI agents, healthcare RAG applications, clinical document processing, healthcare workflow automation, and modern healthcare software development.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Healthcare AI Solutions & Engineering Offerings',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Healthcare AI Agents & Knowledge Assistants',
              description:
                'Autonomous AI agents and conversational copilots for patient triage, medical staff support, and administrative orchestration.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Healthcare RAG Development & Document Processing',
              description:
                'Enterprise RAG systems and intelligent document processing for EHR data, lab reports, medical notes, and claims verification.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Healthcare Automation Solutions & Workflow Modernization',
              description:
                'Intelligent automation for clinical pathways, revenue cycle management, appointment routing, and repetitive operational tasks.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AI Integration with Existing Healthcare Systems',
              description:
                'Seamless, HIPAA-compliant integration with EHR platforms (Epic, Cerner), HL7/FHIR protocols, cloud data lakes, and legacy architectures.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Dedicated Offshore AI Engineering Team',
              description:
                'Dedicated offshore AI engineers, machine learning specialists, and medical data architects to scale healthcare innovation securely.',
            },
          },
        ],
      },
    },
  ],
};

export default function AiHealthcareDevelopmentPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(healthcareJsonLd) }}
      />
      <NavigationClient />

      <GatewayFlowHero />

      <AiReadinessBanner />




      {/* Who We Help & Global Network Section */}
      <div className="bg-white pt-6 md:pt-8 pb-6 md:pb-8 text-slate-900">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm]">

          {/* Unified Centered Header */}
          <div className="flex flex-col items-center max-w-5xl mx-auto mb-8 md:mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-[10px] sm:text-[11px] font-bold tracking-widest text-[#FF6B00] uppercase mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
              AI ENGINEERING FOR HEALTHCARE ORGANIZATIONS
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 mb-3 tracking-tight leading-tight max-w-4xl mx-auto">
              Accelerate Healthcare AI <br className="hidden md:block" />
              <span className="text-[#FF6B2C] md:whitespace-nowrap">Without Building Another Team</span>
            </h2>

            <p className="text-[14px] lg:text-[15px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Healthcare AI adoption is critical. Softree provides the HIPAA-compliant AI architecture, engineering, medical data integration, cloud, and QA expertise you need to deliver secure healthcare AI solutions faster.
            </p>

            {/* Quick Metrics: Countries & Projects Delivered */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  {COUNTRIES_SERVED}
                </span>
                <span className="text-xs text-slate-500 font-medium leading-tight text-left">
                  Countries<br />Served
                </span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#FF6B00] tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  200+
                </span>
                <span className="text-xs text-slate-500 font-medium leading-tight text-left">
                  Projects<br />Delivered
                </span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  100+
                </span>
                <span className="text-xs text-slate-500 font-medium leading-tight text-left">
                  Healthcare & AI<br />Deployments
                </span>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  8
                </span>
                <span className="text-xs text-slate-500 font-medium leading-tight text-left">
                  Global Delivery<br />Hubs
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Who We Help */}
            <div className="lg:col-span-6 flex flex-col h-full">
              <WhoWeHelp />
            </div>
            {/* Right Column: Global Presence (NetworkGlobe) */}
            <div className="lg:col-span-6 w-full flex flex-col h-full">
              <div className="w-full h-full max-w-[550px] lg:max-w-none flex flex-col mx-auto lg:ml-auto">
                <NetworkGlobe
                  heading="Where our clients are"
                  tagline="Global Reach. Local Understanding."
                  subheading="Trusted by businesses across 13+ countries, we deliver technology solutions that help organizations build, scale, and transform digitally."
                  storesLabel="13+ countries served"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 03 Header: AI HEALTHCARE DEVELOPMENT SERVICES */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-[2cm] mt-8 md:mt-10 mb-6 sm:mb-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-[10px] sm:text-[11px] font-bold tracking-widest text-[#FF6B00] uppercase mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></div>
          AI HEALTHCARE DEVELOPMENT SERVICES
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] max-w-4xl mx-auto text-slate-900 mb-3 tracking-tight leading-tight">
          End-to-End AI Healthcare Development Services for{" "}
          <span className="text-[#FF6B2C]">Smarter, Scalable Healthcare</span>
        </h2>

        <p className="text-[14px] lg:text-[15px] text-slate-500 max-w-3xl leading-relaxed mx-auto">
          From AI strategy and solution architecture to development, integration, and optimization, Softree delivers secure, scalable AI healthcare solutions that help healthcare organizations improve operational efficiency, enhance decision-making, and accelerate digital transformation.
        </p>
      </div>

      <StepWipe />

      <HealthcareCaseStudies />
      {/* Interactive Photo Stack Section replaced by CircularTestimonialsDemo */}
      <CoreCapabilities />
      {/* <CircularTestimonialsDemo />

      <IndustrySoftree /> */}
      <AgenticAIWipeSlider />
      <TrustedBrandsMarquee />
      {/* <WhySoftreeCurtainSlider /> */}
      {/* <Industries />     
      <AiRoadmap />
      <PartnerShowcase />      */}
      <WhyChooseWithTestimonials />

      <LightFAQExact />
      <LightContactSection />
      <Footer />
    </main>
  );
}
