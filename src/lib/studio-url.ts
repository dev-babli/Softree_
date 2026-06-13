/** Embedded Studio base URL (no trailing slash). */
export function getStudioBaseUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
    process.env.SANITY_STUDIO_URL

  if (fromEnv) return fromEnv.replace(/\/$/, '')

  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/studio'
  }

  const site =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_SOFTREE_SITE_URL ||
    'https://www.softreetechnology.com'

  return `${site.replace(/\/$/, '')}/studio`
}

export function getStudioEditUrl(type?: string, slug?: string): string {
  const base = getStudioBaseUrl()
  if (type && slug) {
    return `${base}/structure/${type};${slug}`
  }
  return base
}
