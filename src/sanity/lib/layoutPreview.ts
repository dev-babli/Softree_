import { CASE_STUDY_LAYOUTS } from "@/lib/case-study-layouts"

/** @deprecated Layout query params are no longer read by the case study page. */
export const CLASSIC_LAYOUT_VALUE = "classic"

export type LayoutPreviewOption = {
  value: string
  title: string
  description: string
}

export const LAYOUT_PREVIEW_OPTIONS: LayoutPreviewOption[] = CASE_STUDY_LAYOUTS.map((layout) => ({
  value: layout.value,
  title: layout.title,
  description: layout.description,
}))

export function getSiteOrigin(): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
  }
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
}

/** Real case study URL — layout comes from the document's detailLayout field. */
export function buildCaseStudyPreviewPath(slug: string): string {
  return `/case-studies/${slug}`
}

/** Enables draft mode and redirects to the live case study page. */
export function buildLayoutPreviewIframeUrl(slug: string, origin = getSiteOrigin()): string {
  const params = new URLSearchParams({ slug })
  return `${origin}/api/case-study/layout-preview?${params.toString()}`
}

export function buildPresentationPreviewHref(slug: string): string {
  return buildCaseStudyPreviewPath(slug)
}
