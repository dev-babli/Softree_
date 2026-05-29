import { groq } from "next-sanity"
import { client } from "@/sanity/client"
import type { CaseStudyItem } from "./CaseStudyGrid"
import type { CaseStudyListingItem } from "./types"

type CaseStudyCategory =
  | "ai"
  | "power-platform"
  | "sharepoint"
  | "web"
  | "mobile"
  | "data-analytics"

type SanityCaseStudyCard = {
  title: string
  client?: string
  slug?: { current?: string }
  excerpt?: string
  industry?: string
  category?: CaseStudyCategory
  mainImage?: { asset?: { url?: string }; alt?: string }
  mainImageUrl?: string
  metrics?: { label?: string; value?: string }[]
  featured?: boolean
}

export type { CaseStudyListingItem } from "./types"

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
  *[_type == "caseStudy" && category == $category && coalesce(status, "published") == "published"] | order(publishedAt desc) {
    title,
    client,
    slug,
    excerpt,
    industry,
    mainImage { asset->{ url }, alt },
    mainImageUrl,
    metrics
  }
`

const caseStudyListingQuery = groq`
  *[_type == "caseStudy" && coalesce(status, "published") == "published" && defined(slug.current)] | order(publishedAt desc) {
    title,
    client,
    slug,
    excerpt,
    industry,
    category,
    mainImage { asset->{ url }, alt },
    mainImageUrl,
    metrics,
    featured
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
    .map((study) => mapSanityCaseStudyToItem(study, category))
}

function mapSanityCaseStudyToItem(
  study: SanityCaseStudyCard,
  fallbackCategory?: CaseStudyCategory
): CaseStudyItem {
  const categoryLabel =
    study.industry ||
    (study.category ? CATEGORY_LABELS[study.category] : undefined) ||
    (fallbackCategory ? CATEGORY_LABELS[fallbackCategory] : "Case Study")

  return {
    title: study.client || study.title,
    description:
      asPlainText(study.excerpt) || "Read the full case study to see outcomes and implementation details.",
    href: `/case-studies/${study.slug?.current}`,
    category: categoryLabel,
    image: study.mainImage?.asset?.url || study.mainImageUrl,
    industry: study.industry,
    metrics: (study.metrics || [])
      .filter((metric) => metric?.label && metric?.value)
      .slice(0, 2)
      .map((metric) => ({
        label: metric.label as string,
        value: metric.value as string,
      })),
  }
}

function mapSanityCaseStudyToListingItem(study: SanityCaseStudyCard): CaseStudyListingItem {
  const image = study.mainImage?.asset?.url || study.mainImageUrl
  const title = study.client || study.title
  const categoryLabel =
    study.industry ||
    (study.category ? CATEGORY_LABELS[study.category] : undefined) ||
    "Case Study"

  return {
    category: categoryLabel,
    title,
    description:
      asPlainText(study.excerpt) || "Read the full case study to see outcomes and implementation details.",
    href: `/case-studies/${study.slug?.current}`,
    image,
    imageAlt: study.mainImage?.alt || `${title} case study`,
    imageFit: image?.includes("_chat.svg") ? "contain" : "cover",
  }
}

export async function getCaseStudyListingItems(): Promise<CaseStudyListingItem[]> {
  const studies = await client.fetch<SanityCaseStudyCard[]>(caseStudyListingQuery)
  return studies
    .filter((study) => Boolean(study.slug?.current))
    .map(mapSanityCaseStudyToListingItem)
}
