import { CASE_STUDY_STOCK, stockPackForSlug, stockHeroUrl } from "@/lib/case-study-stock-images"

/** Stock URLs for legacy layout variants (no `/Gallery/*`) */
export const GALLERY_IMAGES: readonly string[] = [
  CASE_STUDY_STOCK["power-platform"].hero,
  ...CASE_STUDY_STOCK["power-platform"].gallery,
  CASE_STUDY_STOCK["ai-copilot"].hero,
  ...CASE_STUDY_STOCK["ai-copilot"].gallery.slice(0, 2),
]

/** Remote stock only — never `/Gallery/*` */
export function heroImage(data: {
  slug?: string
  heroImageUrl?: string
  sectionImages?: { hero?: string }
}) {
  return (
    data.sectionImages?.hero ||
    data.heroImageUrl ||
    (data.slug ? stockHeroUrl(data.slug) : stockHeroUrl())
  )
}

export function galleryOrFallback(
  slug: string,
  gallery: Array<{ url: string; alt?: string; caption?: string }>,
  count = 4,
) {
  if (gallery.length > 0) return gallery
  const pack = stockPackForSlug(slug)
  return pack.gallery.slice(0, count).map((url, i) => ({
    url,
    alt: `Project visual ${i + 1}`,
    caption: undefined,
  }))
}
