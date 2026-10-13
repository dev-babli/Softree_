import { applyPageOg } from "@/lib/site-metadata";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";

import "./components/ai-testing.css";

const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });

const TrustedBrandsMarquee = dynamic(() => import('@/app/services/offshore-power-platform-development/trust'), { ssr: true });

export const metadata: Metadata = applyPageOg("/quality-engineering/agentic-ai-testing-services", {
  title: "Agentic AI Testing Services | Softree Technology",
  description:
    "Comprehensive QA and safety benchmarking for AI agents, prompt injection testing, hallucination evaluation, and autonomous behavior verification.",
  alternates: {
    canonical: "https://www.softreetechnology.com/quality-engineering/agentic-ai-testing-services",
  },
  keywords: [
    "Agentic AI Testing Services",
    "Agentic AI Testing",
    "AI Agent Testing",
    "AI Agent Testing Services",
    "AI Testing Services",
    "AI Software Testing",
    "AI Quality Engineering",
    "AI Quality Assurance",
    "AI Application Testing",
    "AI Testing Company",

    "LLM Testing",
    "LLM Testing Services",
    "LLM Application Testing",
    "Large Language Model Testing",
    "Generative AI Testing",
    "Generative AI Testing Services",
    "Generative AI Application Testing",
    "AI Model Testing",
    "AI Model Evaluation",
    "AI Evaluation Services",
    "LLM Evaluation",

    "RAG Testing",
    "RAG Testing Services",
    "RAG Application Testing",
    "RAG Evaluation",
    "Retrieval Augmented Generation Testing",
    "AI Knowledge Testing",
    "AI Context Validation",

    "AI Agent Evaluation",
    "AI Agent Quality Testing",
    "AI Agent Behavior Testing",
    "AI Agent Performance Testing",
    "AI Agent Reliability Testing",
    "Autonomous Agent Testing",
    "Autonomous AI Testing",
    "Autonomous Workflow Testing",
    "AI Workflow Testing",
    "AI Workflow Validation",
    "AI Automation Testing",
    "Multi-Agent Testing",
    "Multi-Agent System Testing",
    "Multi-Agent AI Testing",

    "AI Security Testing",
    "AI Application Security Testing",
    "LLM Security Testing",
    "Generative AI Security Testing",
    "AI Safety Testing",
    "AI Safety Evaluation",
    "AI Guardrail Testing",
    "AI Guardrail Evaluation",
    "Prompt Injection Testing",
    "AI Vulnerability Testing",
    "AI Red Team Testing",
    "AI Risk Testing",
    "AI Data Leakage Testing",
    "AI Security Validation",

    "Hallucination Testing",
    "LLM Hallucination Testing",
    "AI Response Evaluation",
    "AI Response Testing",
    "AI Output Validation",
    "AI Accuracy Testing",
    "AI Reliability Testing",
    "AI Consistency Testing",
    "AI Regression Testing",

    "Continuous AI Testing",
    "Continuous AI Evaluation",
    "Continuous AI Quality",
    "AI Test Automation",
    "AI Testing Automation",
    "Automated AI Testing",
    "AI Regression Testing Services",
    "CI/CD AI Testing",
    "AI Testing in CI/CD",

    "Offshore AI Testing",
    "Offshore AI Testing Services",
    "Offshore AI QA Services",
    "Offshore AI Testing Team",
    "Dedicated AI Testing Team",
    "AI Testing Outsourcing",
    "AI Quality Engineering Services"
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

export default function AgenticAITestingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <NavigationClient />
      <AgenticAITestingVideoHero />

      <TrustedBrandsMarquee surface="legacy" />
      <AgenticAITestingPositioning />

      <AgenticAITestingCoverage />

      <NewWhoDoWeServeSection className="bg-white" />

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

      <OffshoreAgenticAITestingTeam />

      <AgenticAITestingCaseStudies />

      <AgenticAITestingProcess />

      <AgenticAITesting />

      <AgenticAITestingWorkflow />

      <AgenticAITechnologyTesting />

      <WhySoftreeAgenticAITesting />

      <AgenticAITestingFAQ />

      <LightContactSection />

      <Footer />
    </main>
  );
}
