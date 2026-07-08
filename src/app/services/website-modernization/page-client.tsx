"use client"

import dynamic from "next/dynamic"
import { useCallback, useState } from "react"
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import ModernizationHero from "./hero"
import ModernizationProblem from "./problem"
import ModernizationPipeline from "./pipeline"
import SampleBlueprint from "./sample-blueprint"
import TransformationSlider from "./transformation-slider"
import ModernizationServicesGrid from "./services-grid"
import ModernizationProcess from "./process"
import ModernizationCaseStudies from "./case-studies"
import ModernizationTrustStrip from "./trust-strip"
import StickyModernizationCta from "./sticky-cta"
import { useScrollDepthTracking } from "./use-scroll-depth"
import { MODERNIZATION_FAQS } from "./faqs"

const AnalyserEmbed = dynamic(() => import("./analyser-embed"), {
  ssr: false,
  loading: () => (
    <section id="wm-analyser" className="bg-[#0a0a0a] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="h-[min(480px,60vh)] animate-pulse rounded-xl bg-zinc-900" />
      </div>
    </section>
  ),
})

export default function WebsiteModernizationPageClient() {
  const [prefillUrl, setPrefillUrl] = useState<string | undefined>()
  useScrollDepthTracking()

  const handleAnalyze = useCallback((url: string) => {
    setPrefillUrl(url)
    const el = document.getElementById("wm-analyser")
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
    el?.setAttribute("tabindex", "-1")
  }, [])

  return (
    <>
      <NavigationClient />
      <main id="main-content" className="pb-16">
        <ModernizationHero onAnalyze={handleAnalyze} />
        <ModernizationTrustStrip />
        <ModernizationProblem />
        <ModernizationPipeline />
        <SampleBlueprint />
        <TransformationSlider />
        <ModernizationServicesGrid />
        <ModernizationProcess />
        <ModernizationCaseStudies />
        <AnalyserEmbed prefillUrl={prefillUrl} />
        <LightContactSection />
        <LightFAQExact faqs={[...MODERNIZATION_FAQS]} />
      </main>
      <StickyModernizationCta />
      <Footer />
    </>
  )
}
