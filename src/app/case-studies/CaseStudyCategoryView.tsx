import type { Metadata } from "next"
import { notFound } from "next/navigation"
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import LightContactSection from "@/components/qc/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import CaseStudyHero from "./CaseStudyHero"
import CaseStudyGridNew from "./CaseStudyGrid"
import CaseStudyProofCTA from "./CaseStudyProofCTA"
import { getCaseStudyItemsByCategory } from "./categoryCards"
import {
  buildCaseStudyCategoryMetadata,
  getCaseStudyCategoryConfig,
  isCaseStudyCategory,
  type CaseStudyCategoryKey,
} from "./categoryConfig"

type Props = {
  category: CaseStudyCategoryKey
}

export function generateCaseStudyCategoryMetadata(category: string): Metadata {
  if (!isCaseStudyCategory(category)) {
    return { title: "Case Studies Not Found" }
  }
  return buildCaseStudyCategoryMetadata(category)
}

export default async function CaseStudyCategoryView({ category }: Props) {
  const config = getCaseStudyCategoryConfig(category)
  if (!config) notFound()

  const items = await getCaseStudyItemsByCategory(category)

  return (
    <div className="min-h-screen pt-[100px]">
      <NavigationClient />
      <CaseStudyHero
        title={config.title}
        titleItalic={config.titleItalic}
        eyebrow={config.eyebrow}
        description={config.description}
        accentColor={config.accentColor}
        heroStat={config.heroStat}
        heroStatLabel={config.heroStatLabel}
        projectCount={config.projectCount}
      />
      <CaseStudyGridNew
        items={items}
        sectionTitle={config.sectionTitle}
        sectionSubtitle={config.sectionSubtitle}
        accentColor={config.accentColor}
      />
      <CaseStudyProofCTA
        challengeText={config.proofChallenge}
        solutionText={config.proofSolution}
        accentColor={config.accentColor}
        quote={config.proofQuote}
        quoteName={config.proofName}
        quoteRole={config.proofRole}
      />
      <LightContactSection />
      <LightFAQExact faqs={config.faqs} />
      <Footer />
    </div>
  )
}
