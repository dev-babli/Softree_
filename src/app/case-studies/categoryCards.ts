import { groq } from "next-sanity"
import { client } from "@/sanity/client"
import type { CaseStudyItem } from "./CaseStudyGrid"
import type { CaseStudyListingItem, CaseStudyHeroSlide } from "./types"

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
  useCase?: string
  companySize?: string
  storyType?: string
  heroHeadline?: string
  heroEyebrow?: string
  mainImage?: { asset?: { url?: string }; alt?: string }
  mainImageUrl?: string
  metrics?: { label?: string; value?: string }[]
  featured?: boolean
  featuredRank?: number
  keyResults?: { value: string; label: string; description?: string }[]
}

export type { CaseStudyListingItem, CaseStudyHeroSlide } from "./types"

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
    category,
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
    useCase,
    storyType,
    companySize,
    mainImage { asset->{ url }, alt },
    mainImageUrl,
    metrics,
    featured,
    featuredRank,
    "keyResults": keyResults[] { value, label, description }
  }
`

const caseStudyHeroSlidesQuery = groq`
  *[_type == "caseStudy" && coalesce(status, "published") == "published" && featuredRank > 0 && defined(slug.current)] | order(featuredRank asc, publishedAt desc) {
    title,
    client,
    slug,
    excerpt,
    industry,
    category,
    useCase,
    storyType,
    heroHeadline,
    heroEyebrow,
    mainImage { asset->{ url }, alt },
    mainImageUrl,
    metrics,
    "keyResults": keyResults[] { value, label, description }
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

  const stats = (study.keyResults || [])
    .filter((r): r is { label: string; value: string } => Boolean(r?.label && r?.value))
    .slice(0, 3)

  return {
    category: categoryLabel,
    title,
    description:
      asPlainText(study.excerpt) || "Read the full case study to see outcomes and implementation details.",
    href: `/case-studies/${study.slug?.current}`,
    image,
    imageAlt: study.mainImage?.alt || `${title} case study`,
    imageFit: image?.includes("_chat.svg") ? "contain" : "cover",
    industry: study.industry,
    useCase: study.useCase,
    companySize: study.companySize,
    keyResults: stats,
  }
}

export async function getCaseStudyListingItems(): Promise<CaseStudyListingItem[]> {
  const studies = await client.fetch<SanityCaseStudyCard[]>(caseStudyListingQuery)
  return studies
    .filter((study) => Boolean(study.slug?.current))
    .map(mapSanityCaseStudyToListingItem)
}

function getCategoryLabel(study: SanityCaseStudyCard, fallbackCategory?: CaseStudyCategory): string {
  return (
    study.industry ||
    (study.category ? CATEGORY_LABELS[study.category] : undefined) ||
    (fallbackCategory ? CATEGORY_LABELS[fallbackCategory] : undefined) ||
    "Case Study"
  )
}

function mapSanityCaseStudyToHeroSlide(study: SanityCaseStudyCard): CaseStudyHeroSlide | null {
  const image = study.mainImage?.asset?.url || study.mainImageUrl
  const slug = study.slug?.current
  if (!image || !slug) return null

  const company = study.client || study.title
  const categoryLabel = getCategoryLabel(study)

  const stats = (study.keyResults || [])
    .filter((r): r is { label: string; value: string } => Boolean(r?.label && r?.value))
    .slice(0, 3)
    .map((r) => ({
      score: r.value,
      label: r.label,
    }))

  const localStats = (study.metrics || [])
    .filter((metric) => metric?.label && metric?.value)
    .slice(0, 3)
    .map((metric) => ({
      score: metric.value as string,
      label: metric.label as string,
    }))

  const finalStats = stats.length > 0 ? stats : localStats

  return {
    company,
    eyebrow: study.heroEyebrow || `Customer Story — ${study.industry || study.useCase || categoryLabel || "Case Study"}`,
    title: study.heroHeadline || study.title,
    description:
      asPlainText(study.excerpt) || "Read the full case study to see outcomes and implementation details.",
    ctaText: "Read case study",
    ctaHref: `/case-studies/${slug}`,
    image,
    imageAlt: study.mainImage?.alt || `${company} customer story visual`,
    imageFit: image.endsWith(".svg") ? "contain" : "cover",
    stats: finalStats.length > 0 ? finalStats : [{ score: "—", label: "Customer story" }],
  }
}

export async function getCaseStudyHeroSlides(): Promise<CaseStudyHeroSlide[]> {
  const studies = await client.fetch<SanityCaseStudyCard[]>(caseStudyHeroSlidesQuery)
  return studies
    .map(mapSanityCaseStudyToHeroSlide)
    .filter((slide): slide is CaseStudyHeroSlide => slide !== null)
}
