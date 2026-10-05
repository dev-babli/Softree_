import React from "react";
import type { Metadata } from "next";
import { Hero } from "./components/Hero";
import BusinessChallenges from "./components/BusinessChallenges";
import BusinessOutcomes from "./components/BusinessOutcomes";
import ProvenResults from "./components/ProvenResults";
import CoreCapabilities from "./components/CoreCapabilities";
import { LangChainCardStack } from "./components/LangChainCardStack";
import HowAIWorks from "./components/HowAIWorks";
import AiTechnologyStack from "./components/AiTechnologyStack";
import Industries from "./components/Industries";
import { SuccessStories } from "./components/SuccessStories";
import LangChainFAQ from "./components/LangChainFAQ";
import NavigationClient from "@/components/sections/navigation-client";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";
import WhyChooseWithTestimonials from "./components/why";
import TrustedBrandsMarquee from "./components/trust";

export const metadata: Metadata = {
  title: "LangChain Development Services | Enterprise AI & LangGraph Partner",
  description:
    "Build production-grade LangChain applications, autonomous AI agents, enterprise RAG pipelines, and LangGraph multi-agent systems with Softree's specialized AI engineering team.",
  keywords: [
    "LangChain Development Services",
    "LangChain Development Company",
    "LangChain AI Development",
    "LangGraph Development Services",
    "Enterprise RAG Development",
    "Autonomous AI Agents",
    "LangChain Consulting",
    "LangChain Application Development",
    "LangChain Vector Database Integration",
    "Pinecone LangChain",
    "LangSmith Observability",
    "LCEL Pipeline Architecture",
    "Multi-Agent LangGraph Systems",
    "LLM Orchestration Services",
    "Offshore LangChain Developers",
    "Custom Generative AI Solutions",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/solutions/lang-chain-development",
  },
  openGraph: {
    title: "LangChain Development Services | Enterprise AI & LangGraph Partner | Softree Technology",
    description:
      "Enterprise LangChain development services: RAG pipelines, LangGraph multi-agent workflows, tool integrations, enterprise guardrails, and LangSmith observability.",
    url: "https://www.softreetechnology.com/solutions/lang-chain-development",
    type: "website",
    siteName: "Softree Technology",
  },
  twitter: {
    card: "summary_large_image",
    title: "LangChain Development Services | Enterprise AI & LangGraph Partner",
    description:
      "Production-ready LangChain and LangGraph AI development: Enterprise RAG, autonomous agents, vector search, and multi-model orchestration.",
  },
};

export default function LangChainDevelopmentPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 font-sans text-base text-[#0A0F3C] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "LangChain Development Services",
              description:
                "Softree provides end-to-end LangChain development services, including enterprise RAG pipelines, LangGraph multi-agent workflows, vector search integrations, tool calling, and LangSmith observability.",
              provider: {
                "@type": "Organization",
                name: "Softree Technology",
                url: "https://www.softreetechnology.com",
              },
              url: "https://www.softreetechnology.com/solutions/lang-chain-development",
              serviceType: "AI Development Services & LLM Engineering",
              areaServed: "Global",
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.softreetechnology.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Solutions",
                  item: "https://www.softreetechnology.com/solutions",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "LangChain Development Services",
                  item: "https://www.softreetechnology.com/solutions/lang-chain-development",
                },
              ],
            },
          ]),
        }}
      />
      <NavigationClient />
      <Hero />
      <TrustedBrandsMarquee surface="light" />
      <SuccessStories />
      <LangChainCardStack />
      <ProvenResults />
      <Industries />
      <AiTechnologyStack />
      <HowAIWorks />
      <WhyChooseWithTestimonials />
      <LangChainFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
