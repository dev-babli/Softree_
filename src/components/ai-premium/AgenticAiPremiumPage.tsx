"use client"

import "./agentic-ai.css"

import Certifications from "@/app/services/offshore-power-platform-development/certification"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"

import { AiMotionBoot } from "./AiMotionBoot"
import { AiPremiumEnterprise } from "./sections/AiPremiumEnterprise"
import { AiPremiumFramework } from "./sections/AiPremiumFramework"
import { AiPremiumHero } from "./sections/AiPremiumHero"
import { AiPremiumIndustryPills } from "./sections/AiPremiumIndustryPills"
import { AiPremiumIndustryTabs } from "./sections/AiPremiumIndustryTabs"
import { AiPremiumMarquee } from "./sections/AiPremiumMarquee"
import { AiPremiumPillars } from "./sections/AiPremiumPillars"
import { AiPremiumProcess } from "./sections/AiPremiumProcess"
import { AiPremiumServices } from "./sections/AiPremiumServices"
import { AiPremiumStackShowcase } from "./sections/AiPremiumStackShowcase"
import { AiPremiumStats } from "./sections/AiPremiumStats"
import { AiPremiumTechStack } from "./sections/AiPremiumTechStack"
import { AiPremiumWhyChoose } from "./sections/AiPremiumWhyChoose"

type AgenticAiPremiumPageProps = {
  faqs: Array<{
    id: number
    serial: string
    question: string
    answer: string
  }>
}

export function AgenticAiPremiumPage({ faqs }: AgenticAiPremiumPageProps) {
  return (
    <div className="ai-premium">
      <AiMotionBoot />
      <AiPremiumHero />
      <AiPremiumMarquee />
      <AiPremiumPillars />
      <AiPremiumStackShowcase />
      <AiPremiumIndustryTabs />
      <AiPremiumIndustryPills />
      <AiPremiumTechStack />
      <AiPremiumFramework />
      <AiPremiumServices />
      <AiPremiumEnterprise />
      <AiPremiumWhyChoose />
      <AiPremiumStats />
      <AiPremiumProcess />
      <Certifications />
      <LightContactSection />
      <LightFAQExact faqs={faqs} />
    </div>
  )
}
