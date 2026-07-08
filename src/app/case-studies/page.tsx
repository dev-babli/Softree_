import type { Metadata } from "next"
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
      <CaseStudiesListingClient
        caseStudies={caseStudies}
        heroSlides={heroSlides}
        categoryLinks={categoryLinks}
      />
      <Footer />
    </div>
  )
}
