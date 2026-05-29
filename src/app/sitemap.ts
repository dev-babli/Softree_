import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

const BASE_URL = 'https://www.softreetechnology.com'

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/careers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/showcase`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  // Case study category pages
  { url: `${BASE_URL}/case-studies/ai`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/mobile`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/power-platform`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/sharepoint`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/web`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  // Service pages
  { url: `${BASE_URL}/services/ai-intelligence/agentic-ai`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/services/ai-intelligence/generative-ai`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/services/ai-powered-test-automation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/business-applications/mvp`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/business-applications/power-platform`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/business-applications/softree-for-startups`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/data-analytics/microsoft-fabric`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/data-analytics/power-bi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/digital-workspace/mobile-app-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/digital-workspace/react-web-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/digital-workspace/sharepoint`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/digital-workspace/spfx-developments`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/digital-workspace/web-app-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/mvp`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  // Offshore service pages
  { url: `${BASE_URL}/services/offshore-ai-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/offshore-data-analytics`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/offshore-generative-ai-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/offshore-microsoft-fabric`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/offshore-mobile-app-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/offshore-power-platform-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/offshore-sharepoint-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/offshore-spfx-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/services/offshore-web-app-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  // Product
  { url: `${BASE_URL}/avoora`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
]

async function getBlogSlugs(): Promise<{ slug: string; updatedAt: string | null }[]> {
  try {
    return await client.fetch(
      `*[_type == "post" && !(_id in path("drafts.**")) && coalesce(status, "published") == "published"]{ "slug": slug.current, "updatedAt": coalesce(_updatedAt, publishedAt) }`
    )
  } catch {
    return []
  }
}

async function getCaseStudySlugs(): Promise<{ slug: string; updatedAt: string | null }[]> {
  try {
    return await client.fetch(
      `*[_type == "caseStudy" && !(_id in path("drafts.**")) && coalesce(status, "published") == "published"]{ "slug": slug.current, "updatedAt": coalesce(_updatedAt, publishedAt) }`
    )
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogSlugs()
  const caseStudies = await getCaseStudySlugs()

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(({ slug, updatedAt }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: updatedAt ? new Date(updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map(({ slug, updatedAt }) => ({
    url: `${BASE_URL}/case-studies/${slug}`,
    lastModified: updatedAt ? new Date(updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes]
}
