/**
 * CMS env — lean module reused by Studio + data layer.
 * Pattern: sanity-template-nextjs-clean/frontend/sanity/lib/api.ts
 */

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1zmh4sfw'

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-21'

/** Embedded Studio at /studio (not :3333) */
export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.replace(/\/$/, '') ||
  process.env.SANITY_STUDIO_URL?.replace(/\/$/, '') ||
  '/studio'

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'http://localhost:3000'
