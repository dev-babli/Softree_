import { applyPageOg } from "@/lib/site-metadata";
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import LogisticsHero from './components/HeroWrapper';

// Dynamically import below-the-fold components to prioritize network resources for Hero & LCP
const LogisticsReadinessBanner = dynamic(() => import('./components/LogisticsReadinessBanner'), { ssr: true });
const LogisticsUseCases = dynamic(() => import('./components/LogisticsUseCases'), { ssr: true });
const LogisticsWhoDoWeServe = dynamic(() => import('./components/LogisticsWhoDoWeServe'), { ssr: true });
const LogisticsStepWipe = dynamic(() => import('./components/LogisticsStepWipe'), { ssr: true });
const LogisticsCaseStudies = dynamic(() => import('./components/LogisticsCaseStudies'), { ssr: true });
const LogisticsCoreCapabilities = dynamic(() => import('./components/LogisticsCoreCapabilities'), { ssr: true });
const LogisticsAgenticAISlider = dynamic(() => import('./components/LogisticsAgenticAISlider'), { ssr: true });
const LogisticsTrust = dynamic(() => import('./components/LogisticsTrust'), { ssr: true });
const LogisticsWhyChoose = dynamic(() => import('./components/LogisticsWhyChoose'), { ssr: true });
const LogisticsFAQ = dynamic(() => import('./components/LogisticsFAQ'), { ssr: true });
const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });

const PAGE_URL = 'https://www.softreetechnology.com/industries/offshore-logistics-supply-chain-engineering';
const SITE_URL = 'https://www.softreetechnology.com';

export const metadata: Metadata = applyPageOg("/industries/offshore-logistics-supply-chain-engineering", {
  title: "Logistics & Supply Chain Engineering | Softree Technology",
  description:
    "Offshore software engineering for global freight forwarders, 3PL providers, warehouse automation, and transportation management.",
  alternates: {
    canonical: "https://www.softreetechnology.com/industries/offshore-logistics-supply-chain-engineering",
  },
  keywords: [
    // Primary Keyword
    "Logistics Software Development",

    // Secondary Keywords
    "Logistics Software Development Services",
    "Logistics Software Development Company",
    "Supply Chain Software Development",
    "Supply Chain Software Development Services",
    "Custom Logistics Software Development",
    "Custom Logistics Software",
    "Transportation Software Development",
    "Logistics Management Software Development",
    "Logistics Technology Solutions",
    "Logistics Software",
    "ERP in Logistics",
    "ERP for Logistics Industry",
    "Logistics IoT",
    "Transportation Management System Development",
    "Warehouse Management System Development",
    "Supply Chain Management Software Development",
    "Logistics and Transportation Software Development",
    "Transportation and Logistics Software Development",
    "Custom Software Development for Logistics",
    "Supply Chain Software Development Company",
  ],
  openGraph: {
    title: "Logistics & Supply Chain Engineering | Softree Technology",
    description:
      "Offshore software engineering for global freight forwarders, 3PL providers, warehouse automation, and transportation management.",
    url: "https://www.softreetechnology.com/industries/offshore-logistics-supply-chain-engineering",
    siteName: "Softree Technology",
    type: "website",
  },
});

const logisticsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'Offshore Logistics & Supply Chain Engineering Services | Softree',
      description:
        'Transform logistics and supply chain operations with Softree’s offshore engineering team. Build scalable software, automation, AI, data, integration, and cloud solutions.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Softree Technology',
      },
      about: {
        '@type': 'Thing',
        name: 'Offshore Logistics & Supply Chain Engineering Services',
        description:
          'Comprehensive offshore logistics and supply chain software development, AI route optimization, warehouse automation, TMS/WMS integration, and real-time visibility.',
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
          name: 'Offshore Logistics & Supply Chain Engineering',
          item: PAGE_URL,
        },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Offshore Logistics & Supply Chain Engineering Services',
      serviceType: 'Offshore Logistics & Supply Chain Software Engineering',
      category: 'Logistics Technology & Artificial Intelligence',
      provider: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Softree Technology',
        url: SITE_URL,
        logo: `${SITE_URL}/logo/Softree-Technology-Final-Logo-Dark-BG.webp`,
      },
      areaServed: 'Global',
      description:
        'Enterprise offshore logistics engineering offering AI route optimization, warehouse automation, freight document processing, TMS/WMS integration, and custom supply chain software development.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Logistics Engineering & AI Offerings',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Route & Fleet Optimization',
              description: 'AI-driven route planning, dynamic re-routing, vehicle load optimization, and real-time ETA prediction.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Warehouse Automation & Inventory Engineering',
              description: 'AI-guided pick-path optimization, slotting intelligence, and inventory synchronization across WMS systems.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Intelligent Logistics Document Processing',
              description: 'Multimodal OCR and AI extraction for bills of lading (BOL), carrier invoices, proofs of delivery, and customs paperwork.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'TMS & WMS Integration & Modernization',
              description: 'Enterprise integration and legacy modernization for SAP TM, Oracle OTM, Manhattan, Blue Yonder, and AS400 platforms.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Dedicated Offshore Logistics Engineering Team',
              description: 'Dedicated offshore software developers, EDI specialists, AI architects, and QA engineers for global supply chain technology.',
            },
          },
        ],
      },
    },
    {
      '@type': 'VideoObject',
      '@id': `${PAGE_URL}#video`,
      name: 'Offshore Logistics & Supply Chain Engineering Overview',
      description:
        'Discover how Softree Technology delivers offshore engineering for global logistics, supply chain management, freight forwarding, warehouse automation, and AI route optimization.',
      thumbnailUrl: [
        `${SITE_URL}/images/solutions/ai-for-logistics/hero.webp`,
        `${SITE_URL}/og-image.png`
      ],
      uploadDate: '2025-01-15T08:00:00+00:00',
      contentUrl: `${SITE_URL}/images/solutions/ai-for-logistics/hero.mp4`,
      embedUrl: PAGE_URL,
      duration: 'PT30S',
      publisher: {
        '@type': 'Organization',
        name: 'Softree Technology',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo/Softree-Technology-Final-Logo-Dark-BG.webp`
        }
      }
    }
  ],
};

export default function LogisticsSolutionsPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(logisticsJsonLd) }}
      />
      <NavigationClient />

      {/* Hero Section (Logistics Specific Hero) */}
      <LogisticsHero />
      <LogisticsTrust />

      {/* Why Softree Readiness Banner */}
      <LogisticsReadinessBanner />

      {/* Who We Help & Global Network Section */}
      <LogisticsUseCases />

      {/*<LogisticsWhoDoWeServe />*/}

      {/* Step Wipe 8 Services Showcase */}
      <LogisticsStepWipe />

      {/* Case Studies Gallery */}
      <LogisticsCaseStudies />

      {/* Core Capabilities Squeeze Carousel */}
      <LogisticsCoreCapabilities />

      {/* Agentic AI Wipe Slider */}
      {/*<LogisticsAgenticAISlider />*/}

      {/* Trusted Brands Infinite Marquee */}


      {/* Why Choose Softree with Client Testimonials */}
      <LogisticsWhyChoose />

      {/* Dual Column Interactive Logistics FAQ */}
      <LogisticsFAQ />

      {/* Contact Section */}
      <LightContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
