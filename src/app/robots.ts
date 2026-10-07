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
          '/case-studies/preview/',
          '/case-studies/layout-showcase/',
          '/demo-vigorous/',
          '/client',
          '/wireframe/',
          '/Scroll-hero-test/',
          '/hero-test/',
          '/human-head-hero-test/',
          '/homepage-light-demo/',
          '/particle-preview/',
          '/record-slides/',
          '/sentry-example-page/',
          '/servicepage_new/',
          '/story-reel-demo/',
          '/timeline-component-05/',
          '/engineering-solutions/',
          '/showcase/avoora-studio/',
          '/showcase/diet-soda/',
          '/showcase/gradient-sculpture/',
          '/showcase/hero-intro/',
          '/showcase/home-intro/',
          '/showcase/madar-case-study/',
          '/showcase/nexus-card/',
          '/showcase/react-bits/',
          '/showcase/spiral-gallery/',
          '/showcase/stuxen-hero/',
          '/showcase/vectr-staffing/',
          '/industries/healthcare-ai-solutions/curtain-slider/',
          '/services/ai-development-services/curtain-slider/',
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
