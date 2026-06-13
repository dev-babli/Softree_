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
/** Enables draft mode and redirects to a front-end path (case study, blog, etc.). */
export function buildStudioPreviewEnterUrl(path: string, origin = getSiteOrigin()): string {
  const params = new URLSearchParams({ path })
  return `${origin}/api/preview/enter?${params.toString()}`
}

export function buildBlogPreviewPath(slug: string): string {
  return `/blog/${slug}`
}

export function buildLayoutPreviewIframeUrl(slug: string, origin = getSiteOrigin()): string {
  return buildStudioPreviewEnterUrl(buildCaseStudyPreviewPath(slug), origin)
}

/** Same draft-mode entry URL as the iframe preview — safe for "Open in new tab". */
export function buildPresentationPreviewHref(slug: string, origin = getSiteOrigin()): string {
  return buildLayoutPreviewIframeUrl(slug, origin)
}
