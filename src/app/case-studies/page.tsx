import type { Metadata } from "next"
import { Suspense } from "react"
import NavigationServer from "@/components/sections/navigation-server"
import Footer from "@/components/sections/footer"
import LightContactSection from "@/components/qc/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import CaseStudyProofCTA from "./CaseStudyProofCTA"
import CaseStudiesListingClient from "./CaseStudiesListingClient"
import {
  getCaseStudyCategoryCounts,
  getCaseStudyHeroSlides,
  getCaseStudyListingItems,
} from "./categoryCards"
import { buildCaseStudyCategoryLinks } from "@/cms/lib/buildCaseStudyNav"
import {
  CASE_STUDIES_HUB_ACCENT,
  CASE_STUDIES_HUB_FAQS,
  CASE_STUDIES_HUB_PROOF,
} from "./listingConfig"

export const metadata: Metadata = {
  title: "Case Studies | Softree Technology",
  description:
    "Explore real-world case studies showcasing how Softree Technology delivers AI, Power Platform, SharePoint, and web solutions that drive measurable business results.",
  alternates: {
    canonical: "https://www.softreetechnology.com/case-studies",
  },
}

// ISR: listing is CMS-driven but not per-visitor. Cache for an hour; draft mode still
// auto-opts editors into dynamic rendering. Replaces unjustified force-dynamic (RES killer).
export const revalidate = 3600

export default async function CaseStudiesPage() {
  const [caseStudies, heroSlides, categoryCounts] = await Promise.all([
    getCaseStudyListingItems(),
    getCaseStudyHeroSlides(),
    getCaseStudyCategoryCounts(),
  ])

  const categoryLinks = buildCaseStudyCategoryLinks(categoryCounts)

  return (
    <div className="min-h-screen">
      <NavigationServer />
      <Suspense
        fallback={
          <div className="flex min-h-[400px] items-center justify-center bg-[#FAFAF9]">
            <div className="text-[15px] font-medium text-[#6b7694]">Loading customer stories...</div>
          </div>
        }
      >
        <CaseStudiesListingClient
          caseStudies={caseStudies}
          heroSlides={heroSlides}
          categoryLinks={categoryLinks}
        />
      </Suspense>
      <CaseStudyProofCTA
        accentColor={CASE_STUDIES_HUB_ACCENT}
        challengeText={CASE_STUDIES_HUB_PROOF.challengeText}
        solutionText={CASE_STUDIES_HUB_PROOF.solutionText}
        quote={CASE_STUDIES_HUB_PROOF.quote}
        quoteName={CASE_STUDIES_HUB_PROOF.quoteName}
        quoteRole={CASE_STUDIES_HUB_PROOF.quoteRole}
        ctaHref={CASE_STUDIES_HUB_PROOF.ctaHref}
        ctaLabel={CASE_STUDIES_HUB_PROOF.ctaLabel}
      />
      <LightContactSection />
      <LightFAQExact faqs={[...CASE_STUDIES_HUB_FAQS]} />
      <Footer />
    </div>
  )
}
