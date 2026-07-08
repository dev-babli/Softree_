"use client"

import AboutClientLogos from "@/components/qc/homepage-light/AboutClientLogos"
import Certifications from "@/app/services/offshore-power-platform-development/certification"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"

import { GenerativeAiPageLoader } from "./GenerativeAiPageLoader"
import { GenAiFramework } from "./sections/GenAiFramework"
import { GenAiHero } from "./sections/GenAiHero"
import { GenAiIndustry } from "./sections/GenAiIndustry"
import { GenAiModels } from "./sections/GenAiModels"
import { GenAiProcess } from "./sections/GenAiProcess"
import { GenAiServices } from "./sections/GenAiServices"
import { GenAiWhy } from "./sections/GenAiWhy"

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
      </div>
      <AboutClientLogos />
      <GenAiServices />
      <GenAiModels />
      <GenAiIndustry />
      <GenAiFramework />
      <GenAiProcess />
      <GenAiWhy />
      <Certifications />
      <LightContactSection />
      <LightFAQExact faqs={faqs} />
    </div>
  )
}
