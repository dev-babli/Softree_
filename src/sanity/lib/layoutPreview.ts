import { CASE_STUDY_LAYOUTS } from "@/lib/case-study-layouts"

export const CLASSIC_LAYOUT_VALUE = "classic"

export type LayoutPreviewOption = {
  value: string
  title: string
  description: string
}

export const LAYOUT_PREVIEW_OPTIONS: LayoutPreviewOption[] = [
  {
    value: CLASSIC_LAYOUT_VALUE,
    title: "Classic (light)",
    description:
      "Default light layout with hero, sidebar table of contents, and summary grid. Used when Detail Page Layout is empty.",
  },
  ...CASE_STUDY_LAYOUTS.map((layout) => ({
    value: layout.value,
    title: layout.title,
    description: layout.description,
  })),
]

export function getSiteOrigin(): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
  }
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
}

export function buildCaseStudyPreviewPath(slug: string, layout: string): string {
  const layoutParam =
    layout && layout !== CLASSIC_LAYOUT_VALUE
      ? `?layout=${encodeURIComponent(layout)}`
      : layout === CLASSIC_LAYOUT_VALUE
        ? "?layout=classic"
        : ""
  return `/case-studies/${slug}${layoutParam}`
}

export function buildLayoutPreviewIframeUrl(slug: string, layout: string, origin = getSiteOrigin()): string {
  const params = new URLSearchParams({
    slug,
    layout: layout || CLASSIC_LAYOUT_VALUE,
  })
  return `${origin}/api/case-study/layout-preview?${params.toString()}`
}

export function buildPresentationPreviewHref(slug: string, layout: string): string {
  return buildCaseStudyPreviewPath(slug, layout || CLASSIC_LAYOUT_VALUE)
}
