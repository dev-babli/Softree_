"use client"

import AboutClientLogos from "@/components/qc/homepage-light/AboutClientLogos"
import Certifications from "@/app/services/offshore-power-platform-development/certification"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"

import { AgenticAiPageLoader } from "./AgenticAiPageLoader"

import { AgenticAiEnterprise } from "./sections/AgenticAiEnterprise"
import { AgenticAiFramework } from "./sections/AgenticAiFramework"
import { AgenticAiHero } from "./sections/AgenticAiHero"
import { AgenticAiIndustry } from "./sections/AgenticAiIndustry"
import { AgenticAiIndustryPills } from "./sections/AgenticAiIndustryPills"
import { AgenticAiPillars } from "./sections/AgenticAiPillars"
import { KoreScrollTabs } from "./sections/KoreScrollTabs"
import { AgenticAiProcess } from "./sections/AgenticAiProcess"
import { AgenticAiServices } from "./sections/AgenticAiServices"
import { AgenticAiStats } from "./sections/AgenticAiStats"
import { AgenticAiTechStack } from "./sections/AgenticAiTechStack"
import { AgenticAiWhy } from "./sections/AgenticAiWhy"

type AgenticAiPageProps = {
  faqs: Array<{
    id: number
    serial: string
    question: string
    answer: string
  }>
}

/** Agentic AI service page — Kore Artemis editorial + About Us delivery patterns. */
export function AgenticAiPage({ faqs }: AgenticAiPageProps) {
  return (
    <div className="bg-white">
      <AgenticAiPageLoader />
      <div className="agentic-ai-reveal">
        <AgenticAiHero />
      </div>
      <AboutClientLogos />
      <AgenticAiPillars />
      <KoreScrollTabs />
      <AgenticAiIndustry />
      <AgenticAiIndustryPills />
      <AgenticAiTechStack />
      <AgenticAiFramework />
      <AgenticAiServices />
      <AgenticAiEnterprise />
      <AgenticAiWhy />
      <AgenticAiStats />
      <AgenticAiProcess />
      <Certifications />
      <LightContactSection />
      <LightFAQExact faqs={faqs} />
    </div>
  )
}
