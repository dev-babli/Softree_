/** Default gallery images for layout previews when Sanity gallery is empty */
export const GALLERY_IMAGES = [
  "/Gallery/Prestige Bangalore-1.webp",
  "/Gallery/Prestige Bangalore-2.webp",
  "/Gallery/Prestige Bangalore-3.webp",
  "/Gallery/Prestige Bangalore-4.webp",
  "/Gallery/Prestige Bangalore-5.webp",
  "/Gallery/Prestige Bangalore-6.webp",
  "/Gallery/Prestige Bangalore-7.webp",
] as const

export function heroImage(data: { heroImageUrl?: string; sectionImages?: { hero?: string } }) {
  return data.sectionImages?.hero || data.heroImageUrl || GALLERY_IMAGES[0]
}

export function galleryOrFallback(
  gallery: Array<{ url: string; alt?: string; caption?: string }>,
  count = 4,
) {
  if (gallery.length > 0) return gallery
  return GALLERY_IMAGES.slice(0, count).map((url, i) => ({
    url,
    alt: `Project screenshot ${i + 1}`,
  }))
}
