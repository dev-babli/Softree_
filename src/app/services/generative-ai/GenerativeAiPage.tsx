"use client"

import AboutClientLogos from "@/components/qc/homepage-light/AboutClientLogos"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";
import ProvenResults from "@/components/sections/ProvenResults";

import { GenerativeAiPageLoader } from "./GenerativeAiPageLoader"
import { GenAiFramework } from "./sections/GenAiFramework"
import { GenAiHero } from "./sections/GenAiHero"
import { GenAiIndustry } from "./sections/GenAiIndustry"
import { GenAiProcess } from "./sections/GenAiProcess"
import { GenAiServices } from "./sections/GenAiServices"
import GenAiPortfolio from "./sections/GenAiPortfolio"
import GenAiResilience from "./sections/GenAiResilience"
import WhyChooseWithTestimonials from "@/app/services/offshore-generative-ai-development/why-gen-ai"
import AiTechnologyStack from "@/app/solutions/ai-chatbot-development/components/AiTechnologyStack"
import { SuccessStories } from "@/app/solutions/ai-chatbot-development/components/SuccessStories/SuccessStories";

type GenerativeAiPageProps = {
  faqs: Array<{
    id: number
    serial: string
    question: string
    answer: string
  }>
}

/** Generative AI service page — Editorial Enterprise Scrollytelling (D1). */
export function GenerativeAiPage({ faqs }: GenerativeAiPageProps) {
  return (
    <div className="overflow-x-clip bg-white">
      <GenerativeAiPageLoader />
      <div className="generative-ai-reveal">
        <GenAiHero />
        <TrustedBrandsMarquee />
      </div>
      <SuccessStories />
      <GenAiServices />
      <GenAiPortfolio />
      <GenAiResilience />
      <ProvenResults solution="enterprise-rag" />
      <GenAiFramework />
      <GenAiIndustry />
      <AiTechnologyStack 
        title="Technology Stack for Enterprise"
        accentTitle="Generative AI Development"
        description="We build production-ready generative AI solutions using leading LLMs, advanced RAG frameworks, vector databases, cloud platforms, and enterprise security technologies for secure, scalable operations."
      />
      <GenAiProcess />
      <WhyChooseWithTestimonials />
      <LightFAQExact faqs={faqs} />
      <LightContactSection />
    </div>
  )
}
