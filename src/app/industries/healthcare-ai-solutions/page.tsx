import { applyPageOg } from "@/lib/site-metadata";
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
const TechnologyWeWork = dynamic(() => import('./components/TechnologyWeWork'), { ssr: true });
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
const HealthcareWhoDoWeServe = dynamic(() => import('./components/HealthcareWhoDoWeServe'), { ssr: true });
import DetailDrawer from './components/AiTechnologyStack';
import PhotoStackGallery from './components/PhotoStackGallery';
import GatewayFlowHero from './components/GatewayFlowHero';
import { CircularTestimonialsDemo } from './components/circular-testimonials-demo';
import TrustedBrandsMarquee from './components/trust';
const HealthcareCaseStudies = dynamic(() => import('./components/HealthcareCaseStudies'), { ssr: true });
const PAGE_URL = 'https://www.softreetechnology.com/industries/healthcare-ai-solutions';
const SITE_URL = 'https://www.softreetechnology.com';

export const metadata: Metadata = applyPageOg("/industries/healthcare-ai-solutions", {
  title: "Healthcare AI Solutions & Engineering | Softree Technology",
  description:
    "HIPAA-ready healthcare AI solutions: clinical automation, patient scheduling, automated triage, and medical data search.",
  alternates: {
    canonical: "https://www.softreetechnology.com/industries/healthcare-ai-solutions",
  },
  openGraph: {
    title: "Healthcare AI Solutions & Engineering | Softree Technology",
    description:
      "HIPAA-ready healthcare AI solutions: clinical automation, patient scheduling, automated triage, and medical data search.",
    url: "https://www.softreetechnology.com/industries/healthcare-ai-solutions",
    siteName: "Softree Technology",
    type: "website",
  },
});

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
        logo: `${SITE_URL}/logo/Softree-Technology-Final-Logo-Dark-BG.webp`,
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
      {/* Interactive Photo Stack Section replaced by CircularTestimonialsDemo */}
      <HealthcareWhoDoWeServe />
      <CoreCapabilities />

      <TechnologyWeWork />


      <HealthcareCaseStudies />
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
