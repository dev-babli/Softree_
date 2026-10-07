import React from 'react';
import type { Metadata } from "next";
import { EnterpriseRAGHero } from './components/EnterpriseRAGHero';
import AIReadinessBanner from './components/AIReadinessBanner';
import { RAGServices } from './components/RAGServices';
import RAGWhoDoWeServeSection from './components/RAGWhoDoWeServeSection';
import NavigationClient from '@/components/sections/navigation-client';
import dynamic from 'next/dynamic';

const RAGStickyScroll = dynamic(() => import('./components/RAGStickyScroll').then(mod => mod.RAGStickyScroll), { ssr: true });
const RAGCaseStudies = dynamic(() => import('./components/RAGCaseStudies'), { ssr: true });
const RAGTechnologyStack = dynamic(() => import('./components/RAGTechnologyStack'), { ssr: true });
const RAGOffshoreEngineeringSection = dynamic(() => import('./components/RAGOffshoreEngineeringSection'), { ssr: true });
const RAGHowWeWork = dynamic(() => import('./components/RAGHowWeWork').then(mod => mod.RAGHowWeWork), { ssr: true });
const WhyChooseWithTestimonials = dynamic(() => import('./components/WhyChooseWithTestimonials'), { ssr: true });
const LightFAQExact = dynamic(() => import('./components/FAQ'), { ssr: true });
const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });
const Footer = dynamic(() => import('@/components/sections/footer'), { ssr: true });
import TrustedBrandsMarquee from '@/app/services/offshore-power-platform-development/trust';

import { applyPageOg } from "@/lib/site-metadata";

export const metadata: Metadata = applyPageOg("/solutions/enterprise-rag-development", {
  title: "Enterprise RAG Development Services | Offshore RAG Partner",

  description:
    "Build secure, production-ready RAG solutions with Softree’s offshore engineering team. Connect enterprise data, vector search, LLMs, and knowledge sources.",

  keywords: [
    "Enterprise RAG Development Services",
    "Enterprise RAG Development",
    "RAG Development Services",
    "RAG Application Development",
    "Enterprise RAG Solutions",
    "RAG Development Company",
    "Custom RAG Development",
    "RAG Architecture",
    "Enterprise Knowledge Retrieval",
    "Vector Search",
    "Hybrid Search",
    "RAG LLM Integration",
    "RAG Security",
    "RAG Evaluation",
    "Azure RAG Development",
    "Azure OpenAI RAG",
    "Azure AI Search RAG",
    "Offshore RAG Development",
    "Offshore RAG Developers",
    "Dedicated RAG Engineering Team",
    "White-Label RAG Development",
  ],

  alternates: {
    canonical:
      "https://www.softreetechnology.com/solutions/enterprise-rag-development",
  },

  openGraph: {
    title: "Enterprise RAG Development Services | Offshore RAG Partner | Softree Technology",
    description:
      "Build secure, production-ready RAG solutions with Softree’s offshore engineering team for enterprise data, intelligent retrieval, and LLM integration.",
    url: "https://www.softreetechnology.com/solutions/enterprise-rag-development",
    type: "website",
  },
});

export default function EnterpriseRAGDevelopmentPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-base text-[#0A0A1A] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Enterprise RAG Development Services",
              "description": "Build secure, production-ready RAG solutions with Softree’s offshore engineering team. Connect enterprise data, vector search, LLMs, and knowledge sources.",
              "provider": {
                "@type": "Organization",
                "name": "Softree Technology",
                "url": "https://www.softreetechnology.com"
              },
              "url": "https://www.softreetechnology.com/solutions/enterprise-rag-development",
              "serviceType": "AI Development Services"
            },
            {
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
                  "name": "Solutions",
                  "item": "https://www.softreetechnology.com/solutions"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Enterprise RAG Development Services",
                  "item": "https://www.softreetechnology.com/solutions/enterprise-rag-development"
                }
              ]
            }
          ])
        }}
      />
      <NavigationClient />
      <EnterpriseRAGHero />
      <TrustedBrandsMarquee />
      <AIReadinessBanner />
      <RAGServices />
      <RAGWhoDoWeServeSection className="bg-white" />
      <RAGStickyScroll />
      <RAGCaseStudies />
      {/* <SuccessStories /> */}
      <RAGTechnologyStack />
      <RAGOffshoreEngineeringSection />
      <RAGHowWeWork />
      {/*<CoreCapabilities />*/}
      {/* <BusinessChallenges />
      <BusinessOutcomes /> */}
      {/*<ProvenResults solution="enterprise-rag" />*/}
      {/*<Industries />*/}
      {/*<TechnologyStack />*/}
      {/*< HowAIWorks />*/}
      <WhyChooseWithTestimonials />
      <LightFAQExact />
      <LightContactSection />
      <Footer />
    </main>
  );
}
