import type { Metadata } from "next"
import { Suspense } from "react"
import NavigationServer from "@/components/sections/navigation-server"
import Footer from "@/components/sections/footer"
import CaseStudiesListingClient from "./CaseStudiesListingClient"
import {
  getCaseStudyCategoryCounts,
  getCaseStudyHeroSlides,
  getCaseStudyListingItems,
} from "./categoryCards"
import { buildCaseStudyCategoryLinks } from "@/cms/lib/buildCaseStudyNav"

export const metadata: Metadata = {
  title: "Case Studies | Softree Technology",
  description:
    "Explore real-world case studies showcasing how Softree Technology delivers AI, Power Platform, SharePoint, and web solutions that drive measurable business results.",
  alternates: {
    canonical: "https://www.softreetechnology.com/case-studies",
  },
}

export const dynamic = "force-dynamic"

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
      <Suspense fallback={
        <div className="min-h-[400px] flex items-center justify-center bg-[#FAFAF9]">
          <div className="text-[#6b7694] font-medium text-[15px]">Loading customer stories...</div>
        </div>
      }>
        <CaseStudiesListingClient
          caseStudies={caseStudies}
          heroSlides={heroSlides}
          categoryLinks={categoryLinks}
        />
      </Suspense>
      <Footer />
    </div>
  )
}
