import type { Metadata } from "next"
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import CaseStudiesListingClient from "./CaseStudiesListingClient"
import { getCaseStudyListingItems } from "./categoryCards"

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
  const caseStudies = await getCaseStudyListingItems()

  return (
    <div className="min-h-screen">
      <NavigationClient />
      <CaseStudiesListingClient caseStudies={caseStudies} />
      <Footer />
    </div>
  )
}
