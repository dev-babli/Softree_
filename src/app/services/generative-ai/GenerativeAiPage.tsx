"use client"

import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";

import { GenerativeAiPageLoader } from "./GenerativeAiPageLoader"
import { GenAiHero } from "./sections/GenAiHero"
import WhyChooseWithTestimonials from "./sections/WhyChooseWithTestimonials"
import GenerativeAiAIReadinessBanner from "./sections/GenerativeAiAIReadinessBanner"
import { GenerativeAiServices as GenerativeAiWhoWeHelpServices } from "./sections/GenerativeAiServices"
import { GenerativeAiStickyScroll } from "./sections/GenerativeAiStickyScroll"
import { GenerativeAiSuccessStories } from "./sections/GenerativeAiSuccessStories"
import { GenerativeAiTechnologyStack } from "./sections/GenerativeAiTechnologyStack"

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
      <GenerativeAiAIReadinessBanner />
      <GenerativeAiWhoWeHelpServices />
      <GenerativeAiStickyScroll />
      <GenerativeAiSuccessStories />
      <GenerativeAiTechnologyStack />
      <WhyChooseWithTestimonials />
      <LightFAQExact faqs={faqs} />
      <LightContactSection />
    </div>
  )
}
