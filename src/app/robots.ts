import type { MetadataRoute } from 'next'

import { siteUrl } from '@/cms/api'

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl.replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api/', '/case-studies/preview', '/client'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
