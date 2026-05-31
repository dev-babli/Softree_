"use client"

import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import type { CaseStudyLayoutData } from "../../types"
import { csCssVars } from "./tokens"
import { HeroSection } from "./sections/HeroSection"
import { OverviewSection } from "./sections/OverviewSection"
import { ChallengeSection } from "./sections/ChallengeSection"
import { SolutionSection } from "./sections/SolutionSection"
import { DeliverablesSection } from "./sections/DeliverablesSection"
import { GallerySection } from "./sections/GallerySection"
import { ImpactSection } from "./sections/ImpactSection"
import { TechStackSection } from "./sections/TechStackSection"
import { TestimonialSection } from "./sections/TestimonialSection"
import { RelatedSection } from "./sections/RelatedSection"
import { csLightClasses } from "../../design-system/caseStudyLightTokens"

/**
 * Manufacturing case study — Softree-native layout (homepage / About Us patterns).
 * TriState-style section flow; Inter + brand tokens only.
 */
export function ManufacturingCaseStudyPage({ data }: { data: CaseStudyLayoutData }) {
  const faqItems = data.faqs.map((f, i) => ({
    id: i + 1,
    serial: `question ${String(i + 1).padStart(2, "0")}`,
    question: f.question,
    answer: f.answer,
  }))

  return (
    <article
      className={csLightClasses.shell}
      style={csCssVars}
    >
      <HeroSection data={data} />
      <OverviewSection data={data} />
      <ChallengeSection data={data} />
      <SolutionSection data={data} />
      <DeliverablesSection data={data} />
      <GallerySection items={data.gallery} />
      <ImpactSection data={data} />
      <TechStackSection data={data} />
      <TestimonialSection data={data} />
      <RelatedSection related={data.related} />
      {faqItems.length > 0 ? <LightFAQExact faqs={faqItems} /> : null}
      <LightContactSection />
    </article>
  )
}
