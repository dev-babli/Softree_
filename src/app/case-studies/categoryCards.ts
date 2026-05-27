import { groq } from "next-sanity"
import { client } from "@/sanity/client"
import type { CaseStudyItem } from "./CaseStudyGrid"

type CaseStudyCategory =
  | "ai"
  | "power-platform"
  | "sharepoint"
  | "web"
  | "mobile"
  | "data-analytics"

type SanityCaseStudyCard = {
  title: string
  slug?: { current?: string }
  excerpt?: string
  industry?: string
  mainImage?: { asset?: { url?: string } }
  metrics?: { label?: string; value?: string }[]
}

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

const caseStudiesByCategoryQuery = groq`
  *[_type == "caseStudy" && category == $category] | order(publishedAt desc) {
    title,
    slug,
    excerpt,
    industry,
    mainImage { asset->{ url } },
    metrics
  }
`

const CATEGORY_LABELS: Record<CaseStudyCategory, string> = {
  ai: "AI & Machine Learning",
  "power-platform": "Power Platform",
  sharepoint: "SharePoint",
  web: "Web Development",
  mobile: "Mobile Development",
  "data-analytics": "Data Analytics",
}

export async function getCaseStudyItemsByCategory(
  category: CaseStudyCategory
): Promise<CaseStudyItem[]> {
  const studies = await client.fetch<SanityCaseStudyCard[]>(
    caseStudiesByCategoryQuery,
    { category }
  )

  return studies
    .filter((study) => Boolean(study.slug?.current))
    .map((study) => ({
      title: study.title,
      description:
        asPlainText(study.excerpt) || "Read the full case study to see outcomes and implementation details.",
      href: `/case-studies/${study.slug?.current}`,
      category: study.industry || CATEGORY_LABELS[category],
      image: study.mainImage?.asset?.url,
      industry: study.industry,
      metrics: (study.metrics || [])
        .filter((metric) => metric?.label && metric?.value)
        .slice(0, 2)
        .map((metric) => ({
          label: metric.label as string,
          value: metric.value as string,
        })),
    }))
}
