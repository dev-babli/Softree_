"use client"

import { CaseStudyPageRenderer } from "@/components/case-studies/CaseStudyPageRenderer"
import type { SanityCaseStudyDoc } from "@/components/case-studies/layouts/mapCaseStudyData"
import type { CaseStudyComposerSection } from "@/components/case-studies/composer/types"
import { isPremiumLayout } from "@/lib/case-study-layouts"

type PortableTextLike = {
  _type?: string
  _key?: string
  style?: string
  children?: Array<{ text?: string; marks?: string[]; _type?: string }>
}

interface StudyLike extends SanityCaseStudyDoc {
  composerSections?: CaseStudyComposerSection[]
  storyType?: string
  [key: string]: unknown
}

type Props = {
  study: StudyLike
  layout: string
}

function asPortableTextArray(value: unknown): PortableTextLike[] {
  return Array.isArray(value) ? (value as PortableTextLike[]) : []
}

function normalizeStudy(raw: StudyLike): StudyLike {
  return {
    ...raw,
    client: raw.client || raw.title || "Preview Client",
    title: raw.title || "Untitled",
    headerTitle: raw.headerTitle || "",
    excerpt: raw.excerpt || "",
    challengeContent: asPortableTextArray(raw.challengeContent || raw.challenge),
    approachContent: asPortableTextArray(raw.approachContent || raw.approach || raw.solution),
    outcomeContent: asPortableTextArray(raw.outcomeContent || raw.outcome || raw.result),
    body: asPortableTextArray(raw.body),
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

function resolveDetailLayout(study: StudyLike, layout: string): string | undefined {
  if (study.detailLayout) return study.detailLayout
  if (layout === "page-composer") return "page-composer"
  if (layout === "manufacturing-power-platform") return layout
  if (isPremiumLayout(layout)) return layout
  return undefined
}

/** Studio iframe preview — uses the same renderer as the live slug page. */
export default function CaseStudyDraftPreview({ study, layout }: Props) {
  const safeStudy = normalizeStudy(study)
  const slug = safeStudy?.slug?.current || "preview"
  const detailLayout = resolveDetailLayout(safeStudy, layout)

  return (
    <CaseStudyPageRenderer
      study={{
        ...safeStudy,
        detailLayout,
        storyType:
          layout === "transformation"
            ? "transformation"
            : layout === "product-showcase"
              ? "product-showcase"
              : safeStudy.storyType || "standard",
      }}
      related={[]}
      slug={slug}
    />
  )
}
