import { groq } from "next-sanity"
import { client } from "@/sanity/client"
import type { CaseStudyListingItem, CaseStudyHeroSlide } from "./types"

type SanityCaseStudyCard = {
  title: string
  client?: string
  slug?: { current?: string }
  excerpt?: string
  industry?: string
  useCase?: string
  companySize?: string
  storyType?: string
  heroHeadline?: string
  heroEyebrow?: string
  mainImage?: { asset?: { url?: string }; alt?: string }
  mainImageUrl?: string
  keyResults?: { label?: string; value?: string; description?: string }[]
  featuredRank?: number
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

const caseStudyListingQuery = groq`
  *[_type == "caseStudy" && coalesce(status, "published") == "published" && defined(slug.current)] | order(featuredRank asc, publishedAt desc) {
    title,
    client,
    slug,
    excerpt,
    industry,
    useCase,
    companySize,
    storyType,
    mainImage { asset->{ url }, alt },
    mainImageUrl,
    keyResults[] { value, label, description },
    featuredRank
  }
`

const caseStudyHeroSlidesQuery = groq`
  *[_type == "caseStudy" && coalesce(status, "published") == "published" && featuredRank > 0 && defined(slug.current)] | order(featuredRank asc, publishedAt desc) {
    title,
    client,
    slug,
    excerpt,
    industry,
    useCase,
    storyType,
    heroHeadline,
    heroEyebrow,
    mainImage { asset->{ url }, alt },
    mainImageUrl,
    keyResults[] { value, label, description }
  }
`

function mapSanityCaseStudyToListingItem(study: SanityCaseStudyCard): CaseStudyListingItem {
  const image = study.mainImage?.asset?.url || study.mainImageUrl
  const title = study.client || study.title

  const keyResults = (study.keyResults || [])
    .filter((r): r is { label: string; value: string } => Boolean(r?.label && r?.value))
    .slice(0, 3)

  return {
    category: study.industry || study.useCase || "Case Study",
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
    keyResults: keyResults.length > 0 ? keyResults : undefined,
  }
}

export async function getCaseStudyListingItems(): Promise<CaseStudyListingItem[]> {
  const studies = await client.fetch<SanityCaseStudyCard[]>(caseStudyListingQuery)
  return studies
    .filter((study) => Boolean(study.slug?.current))
    .map(mapSanityCaseStudyToListingItem)
}

function mapSanityCaseStudyToHeroSlide(study: SanityCaseStudyCard): CaseStudyHeroSlide | null {
  const image = study.mainImage?.asset?.url || study.mainImageUrl
  const slug = study.slug?.current
  if (!image || !slug) return null

  const company = study.client || study.title
  const stats = (study.keyResults || [])
    .filter((r): r is { label: string; value: string } => Boolean(r?.label && r?.value))
    .slice(0, 3)
    .map((r) => ({
      score: r.value,
      label: r.label,
    }))

  return {
    company,
    eyebrow: study.heroEyebrow || `Customer Story — ${study.industry || study.useCase || "Case Study"}`,
    title: study.heroHeadline || study.title,
    description:
      asPlainText(study.excerpt) || "Read the full case study to see outcomes and implementation details.",
    ctaText: "Read case study",
    ctaHref: `/case-studies/${slug}`,
    image,
    imageAlt: study.mainImage?.alt || `${company} customer story visual`,
    imageFit: image.endsWith(".svg") ? "contain" : "cover",
    stats: stats.length > 0 ? stats : [{ score: "—", label: "Customer story" }],
  }
}

export async function getCaseStudyHeroSlides(): Promise<CaseStudyHeroSlide[]> {
  const studies = await client.fetch<SanityCaseStudyCard[]>(caseStudyHeroSlidesQuery)
  return studies
    .map(mapSanityCaseStudyToHeroSlide)
    .filter((slide): slide is CaseStudyHeroSlide => slide !== null)
}
