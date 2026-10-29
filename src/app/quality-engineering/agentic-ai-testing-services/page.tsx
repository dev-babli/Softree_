import { applyPageOg } from "@/lib/site-metadata";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";

import "./components/ai-testing.css";

const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });

const TrustedBrandsMarquee = dynamic(() => import('@/app/services/offshore-power-platform-development/trust'), { ssr: true });

export const metadata: Metadata = applyPageOg("/quality-engineering/agentic-ai-testing-services", {
  title: {
    absolute: "Agentic AI Testing Services | Softree",
  },
  description:
    "Comprehensive QA and safety benchmarking for AI agents, prompt injection testing, hallucination evaluation, and autonomous behavior verification.",
  alternates: {
    canonical: "https://www.softreetechnology.com/quality-engineering/agentic-ai-testing-services",
  },
  keywords: [
    "Agentic AI Testing Services",
    "Agentic AI Testing",
    "AI Agent Testing",
    "AI Software Testing",
    "AI Automated Testing",
    "Agentic AI Test Automation",
    "AI Agent Testing Services",
    "AI Quality Assurance",
    "AI Quality Engineering",
    "Generative AI Testing",
    "Generative AI Testing Services",
    "LLM Testing Services",
    "AI Model Testing",
    "AI Agent Evaluation",
    "AI Agent Performance Testing",
    "AI Agent Reliability Testing",
    "AI Application Security Testing",
    "LLM Security Testing",
    "Prompt Injection Testing",
    "AI Guardrail Testing",
    "RAG Testing Services",
    "AI Test Automation",
    "AI Regression Testing",
    "Multi-Agent System Testing",
    "AI Testing Outsourcing",
    "Offshore AI Testing Services",
  ],
  openGraph: {
    title: "Agentic AI Testing Services | Softree Technology",
    description:
      "Comprehensive QA and safety benchmarking for AI agents, prompt injection testing, hallucination evaluation, and autonomous behavior verification.",
    url: "https://www.softreetechnology.com/quality-engineering/agentic-ai-testing-services",
    siteName: "Softree Technology",
    type: "website",
  },
});



import AgenticAITestingPositioning from './components/AgenticAITestingPositioning';
import AgenticAITestingCoverage from './components/AgenticAITestingCoverage';
import NewWhoDoWeServeSection from "@/components/sections/NewWhoDoWeServeSection";
import OffshoreAgenticAITestingTeam from './components/OffshoreAgenticAITestingTeam';
import WhySoftreeAgenticAITesting from './components/WhySoftreeAgenticAITesting';
import AgenticAITestingFAQ from './components/AgenticAITestingFAQ';
import AgenticAITestingProcess from './components/AgenticAITestingProcess';
import AgenticAITesting from './components/AgenticAITesting';
import AgenticAITestingWorkflow from './components/AgenticAITestingWorkflow';
import AgenticAITestingCaseStudies from './components/AgenticAITestingCaseStudies';
import AgenticAITechnologyTesting from './components/AgenticAITechnologyTesting';
import AgenticAITestingVideoHero from './components/AgenticAITestingVideoHero';





const ReverseStickyScroll = dynamic(() => import('./components/ReverseStickyScroll/ReverseStickyScroll').then((mod) => mod.ReverseStickyScroll), { ssr: true });

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
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
          "name": "Quality Engineering",
          "item": "https://www.softreetechnology.com/quality-engineering"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Agentic AI Testing Services",
          "item": "https://www.softreetechnology.com/quality-engineering/agentic-ai-testing-services"
        }
      ]
    },
    {
      "@type": "Service",
      "name": "Agentic AI Testing Services",
      "serviceType": "Agentic AI Testing & Quality Engineering Services",
      "description":
        "Comprehensive QA and safety benchmarking for AI agents, prompt injection testing, hallucination evaluation, and autonomous behavior verification.",
      "url": "https://www.softreetechnology.com/quality-engineering/agentic-ai-testing-services",
      "provider": {
        "@type": "Organization",
        "name": "Softree Technology",
        "url": "https://www.softreetechnology.com"
      },
      "areaServed": "Global"
    },
    {
      "@type": "VideoObject",
      "name": "Agentic AI Testing Services & Autonomous Workflow Quality Assurance Overview",
      "description":
        "Discover how Softree Technology delivers comprehensive QA, safety benchmarking, hallucination evaluation, security guardrails, and autonomous behavior verification for AI agents and LLM applications.",
      "thumbnailUrl": [
        "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video-poster.webp",
        "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo-Dark-BG.webp"
      ],
      "uploadDate": "2025-01-15T08:00:00+00:00",
      "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/agentic-ai-testing-video.mp4",
      "embedUrl": "https://www.softreetechnology.com/quality-engineering/agentic-ai-testing-services",
      "duration": "PT30S",
      "publisher": {
        "@type": "Organization",
        "name": "Softree Technology",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.softreetechnology.com/logo/logo.png"
        }
      }
    }
  ]
};

export default function AgenticAITestingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NavigationClient />
      <AgenticAITestingVideoHero />

      <TrustedBrandsMarquee surface="legacy" />
      <AgenticAITestingPositioning />

      <AgenticAITestingCoverage />

      {/* <NewWhoDoWeServeSection className="bg-white" /> */}

      {/* Reverse Sticky Scroll Overall Header */}
      <div className="w-full max-w-[1340px] mx-auto px-4 mt-12 md:mt-16 mb-8 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase">
            AGENTIC AI TESTING SERVICES
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4">
          One AI Testing Team Across <br />
          <span className="text-[#FF6B2C]">Every Stage of Your Agentic AI Lifecycle</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Softree provides end-to-end agentic AI testing services that help teams evaluate AI behavior, validate autonomous workflows, secure AI interactions, improve model reliability, and continuously monitor AI quality from development through production.
        </p>
      </div>

      <ReverseStickyScroll />

      {/* <OffshoreAgenticAITestingTeam /> */}

      <AgenticAITestingCaseStudies />

      <AgenticAITestingProcess />

      {/* <AgenticAITesting /> */}

      {/* <AgenticAITestingWorkflow /> */}

      <AgenticAITechnologyTesting />

      <WhySoftreeAgenticAITesting />

      <AgenticAITestingFAQ />

      <LightContactSection />

      <Footer />
    </main>
  );
}
