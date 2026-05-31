import imageUrlBuilder from "@sanity/image-url"

import { projectId, dataset } from "@/sanity/env"

const builder = imageUrlBuilder({ projectId, dataset })

type AssetRef = { _ref?: string; url?: string }

function resolveAssetUrl(asset?: AssetRef | null): string | undefined {
  if (!asset) return undefined
  if (asset.url) return asset.url
  if (asset._ref) return builder.image({ _ref: asset._ref }).width(2400).auto("format").url()
  return undefined
}

function hydrateImageField<T extends { asset?: AssetRef | null } | null | undefined>(
  field: T,
): T {
  if (!field?.asset) return field
  const url = resolveAssetUrl(field.asset)
  if (!url) return field
  return {
    ...field,
    asset: { ...field.asset, url },
  } as T
}

/** Resolve Sanity image asset refs to CDN URLs for live Studio preview. */
export function hydrateCaseStudyForPreview(doc: Record<string, unknown>): Record<string, unknown> {
  const clone = structuredClone(doc)

  if (clone.mainImage) {
    clone.mainImage = hydrateImageField(clone.mainImage as { asset?: AssetRef | null })
  }

  if (clone.pullQuoteImage) {
    clone.pullQuoteImage = hydrateImageField(clone.pullQuoteImage as { asset?: AssetRef | null })
  }

  if (clone.ogImage) {
    clone.ogImage = hydrateImageField(clone.ogImage as { asset?: AssetRef | null })
  }

  if (Array.isArray(clone.gallery)) {
    clone.gallery = clone.gallery.map((item) =>
      item && typeof item === "object" ? hydrateImageField(item as { asset?: AssetRef | null }) : item,
    )
  }

  const testimonial = clone.testimonial as { avatar?: { asset?: AssetRef | null } } | undefined
  if (testimonial?.avatar) {
    testimonial.avatar = hydrateImageField(testimonial.avatar)
    clone.testimonial = testimonial
  }

  if (!clone.slug || typeof clone.slug !== "object") {
    clone.slug = { current: "preview" }
  } else if (!(clone.slug as { current?: string }).current) {
    ;(clone.slug as { current: string }).current = "preview"
  }

  if (!clone._id) clone._id = "draft-preview"

  return clone
}
