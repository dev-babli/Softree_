import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-metadata'

export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || SITE_URL || 'https://www.softreetechnology.com').replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/studio/',
          '/wp-content/',
          '/case-studies/preview/',
          '/client',
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
