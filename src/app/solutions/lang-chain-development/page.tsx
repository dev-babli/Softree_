import React from "react";
import type { Metadata } from "next";
import { Hero } from "./components/Hero";
import BusinessChallenges from "./components/BusinessChallenges";
import BusinessOutcomes from "./components/BusinessOutcomes";
import ProvenResults from "./components/ProvenResults";
import CoreCapabilities from "./components/CoreCapabilities";
import { LangChainCardStack } from "./components/LangChainCardStack";
import LangChainHowWeWork from "./components/LangChainHowWeWork";
import AiTechnologyStack from "./components/AiTechnologyStack";
import Industries from "./components/Industries";
import { SuccessStories } from "./components/SuccessStories";
import LangChainFAQ from "./components/LangChainFAQ";
import WhatWeBuild from "./components/WhatWeBuild";
import NavigationClient from "@/components/sections/navigation-client";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";
import WhyChooseWithTestimonials from "./components/why";
import TrustedBrandsMarquee from "./components/trust";
import { LangchainServices } from "./components/LangChainServices";
import NewWhoDoWeServeSection from "@/components/sections/NewWhoDoWeServeSection";
export const metadata: Metadata = {
  title:
    "Offshore LangChain Development Services | LangChain AI Experts | Softree",

  description:
    "Partner with Softree for offshore LangChain development services. Build production-ready LLM applications, RAG systems, AI agents, LangGraph workflows, and intelligent AI applications.",

  keywords: [
    "Offshore LangChain Development",
    "Offshore LangChain Development Services",
    "LangChain Development Services",
    "LangChain Development Company",
    "Offshore LangChain Developers",
    "LangChain AI Development",
    "LangChain Application Development",
    "LangChain RAG Development",
    "LangGraph Development Services",
    "LangGraph AI Development",
    "LangChain AI Agent Development",
    "AI Agent Development Services",
    "LLM Application Development",
    "LLM Integration Services",
    "LangChain Consulting Services",
    "LangChain Vector Database Integration",
    "RAG Application Development",
    "Multi-Agent LangGraph Development",
    "LLM Orchestration Services",
    "LangSmith Integration",
  ],

  alternates: {
    canonical:
      "https://www.softreetechnology.com/solutions/lang-chain-development",
  },

  openGraph: {
    title:
      "Offshore LangChain Development Services | LangChain AI Experts | Softree",
    description:
      "Build scalable AI applications with Softree's offshore LangChain development team. We develop RAG applications, AI agents, LangGraph workflows, LLM integrations, and intelligent AI applications.",
    url: "https://www.softreetechnology.com/solutions/lang-chain-development",
    type: "website",
    siteName: "Softree Technology",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Offshore LangChain Development Services | Softree Technology",
    description:
      "Build production-ready LangChain applications, RAG systems, AI agents, and LangGraph workflows with Softree's offshore AI engineering team.",
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
      <TrustedBrandsMarquee surface="transparent" />
      <LangchainServices />
      <NewWhoDoWeServeSection className="bg-white" />
      <WhatWeBuild />
      <SuccessStories />
      {/* <LangChainCardStack /> */}
      <ProvenResults />
      <Industries />
      <AiTechnologyStack />
      <LangChainHowWeWork />
      <WhyChooseWithTestimonials />
      <LangChainFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
