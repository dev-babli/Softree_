/** Verified Unsplash IDs (200 OK) — used across bento + demo content. */

export const BENTO_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&h=900&q=80";

export function bentoImageUrl(
  photoId: string,
  size: { w: number; h: number } = { w: 1600, h: 900 },
) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${size.w}&h=${size.h}&q=80`;
}

export const BENTO_ABSTRACT = {
  iridescent: bentoImageUrl("photo-1618005182384-a83a8bd57fbe"),
  holographic: bentoImageUrl("photo-1634017839464-5c339ebe3cb4"),
  /** Replaces photo-1620641788421 (404 on Unsplash CDN). */
  fluidMesh: bentoImageUrl("photo-1551288049-bebda4e38f71"),
  ember: bentoImageUrl("photo-1550684848-fac1c5b4e853"),
  cobalt: bentoImageUrl("photo-1557672172-298e090bd0f1"),
  spectrum: bentoImageUrl("photo-1579546929518-9e396f3cc809"),
  aurora: bentoImageUrl("photo-1614850523459-c2f4c699c52e"),
  tealGlow: bentoImageUrl("photo-1771814536199-deadfcf6a8d6"),
  liquid: bentoImageUrl("photo-1760888102518-f5bb22fcf5df"),
} as const;

export const BENTO_THUMB = (photoId: string) =>
  bentoImageUrl(photoId, { w: 128, h: 128 });
