"use client"

import StandardStoryLayout from "@/components/case-studies/layouts/archetypes/StandardStoryLayout"
import TransformationEpicLayout from "@/components/case-studies/layouts/archetypes/TransformationEpicLayout"
import ProductShowcaseLayout from "@/components/case-studies/layouts/archetypes/ProductShowcaseLayout"

interface StudyLike {
  client?: string
  title?: string
  headerTitle?: string
  excerpt?: string
  challengeContent?: unknown
  approachContent?: unknown
  outcomeContent?: unknown
  body?: unknown
  challenge?: unknown
  approach?: unknown
  solution?: unknown
  outcome?: unknown
  result?: unknown
  mainImage?: unknown
  mainImageUrl?: string
  highlights?: unknown
  metrics?: unknown
  technologies?: string[]
  accentColor?: string
  slug?: { current?: string }
  _id?: string
  [key: string]: unknown
}

type Props = {
  study: StudyLike
  layout: string
}

function normalizeStudy(raw: StudyLike): StudyLike {
  return {
    ...raw,
    client: raw.client || raw.title || "Preview Client",
    title: raw.title || "Untitled",
    headerTitle: raw.headerTitle || "",
    excerpt: raw.excerpt || "",
    challengeContent: raw.challengeContent || raw.challenge || [],
    approachContent: raw.approachContent || raw.approach || raw.solution || [],
    outcomeContent: raw.outcomeContent || raw.outcome || raw.result || [],
    body: raw.body || [],
    mainImage: raw.mainImage || null,
    mainImageUrl: raw.mainImageUrl || "",
    highlights: raw.highlights || [],
    metrics: raw.metrics || [],
    technologies: raw.technologies || [],
    accentColor: raw.accentColor || "#FF7A2F",
    slug: raw.slug || { current: "preview" },
    _id: raw._id || "draft-preview",
  }
}

export default function CaseStudyDraftPreview({ study, layout }: Props) {
  const storyType =
    layout === "classic" || layout === "standard"
      ? "standard"
      : layout === "transformation"
        ? "transformation"
        : layout === "product-showcase"
          ? "product-showcase"
          : "standard"

  const slug = study?.slug?.current || "preview"
  const safeStudy = normalizeStudy(study)

  switch (storyType) {
    case "transformation":
      return <TransformationEpicLayout study={safeStudy} related={[]} slug={slug} />
    case "product-showcase":
      return <ProductShowcaseLayout study={safeStudy} related={[]} slug={slug} />
    case "standard":
    default:
      return <StandardStoryLayout study={safeStudy} related={[]} slug={slug} />
  }
}
