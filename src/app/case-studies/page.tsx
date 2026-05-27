import { client } from "@/sanity/client"
import { groq } from "next-sanity"
import type { Metadata } from "next"
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import LightContactSection from "@/components/qc/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import CaseStudiesListingClient from "./CaseStudiesListingClient"

const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    industry,
    client,
    mainImage { asset->{ url }, alt },
    technologies,
    metrics,
    publishedAt
  }
`

export const dynamic = "force-dynamic"

type PortableTextLike = {
  children?: Array<{ text?: string }>
}

function asPlainText(value: unknown): string {
  if (typeof value === "string") return value
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item
        if (item && typeof item === "object" && "children" in item) {
          const block = item as PortableTextLike
          return (block.children || []).map((child) => child?.text || "").join(" ")
        }
        return ""
      })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()
  }
  if (value && typeof value === "object" && "children" in value) {
    const block = value as PortableTextLike
    return (block.children || [])
      .map((child) => child?.text || "")
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()
  }
  return ""
}

export const metadata: Metadata = {
  title: "Case Studies | Softree Technology",
  description:
    "Explore real-world case studies showcasing how Softree Technology delivers AI, Power Platform, SharePoint, and web solutions that drive measurable business results.",
  alternates: {
    canonical: "https://www.softreetechnology.com/case-studies",
  },
}

export default async function CaseStudiesPage() {
  const caseStudies = await client.fetch(caseStudiesQuery)
  const normalizedCaseStudies = caseStudies.map((study: Record<string, unknown>) => ({
    ...study,
    excerpt: asPlainText(study.excerpt) || "Read the full case study for implementation details and outcomes.",
  }))
  return (
    <div className="min-h-screen pt-[100px]">
      <NavigationClient />
      <CaseStudiesListingClient caseStudies={normalizedCaseStudies} />
      <LightContactSection />
      <LightFAQExact />
      <Footer />
    </div>
  )
}
