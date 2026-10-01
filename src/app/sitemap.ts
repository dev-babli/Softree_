import { MetadataRoute } from 'next'
import { client } from '@/cms/lib/client'

const BASE_URL = 'https://www.softreetechnology.com'

const staticRoutes: MetadataRoute.Sitemap = [
  // Primary Pages
  { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/who-do-we-serve`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/careers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE_URL}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/industries`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },

  // AI & Testing Services
  { url: `${BASE_URL}/ai`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/ai-workflow-orchestration`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/ai-development-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/services/generative-ai`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/services/enterprise-generative-ai-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/automation-testing-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/ai-powered-test-automation`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/ai-consulting-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/ai-chatbot-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/ai-healthcare-development-service`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/amazon-bedrock-agentcore-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/amazon-nova-2-sonic-solutions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/azure-openai-development-partner`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/enterprise-ai-solution`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/multi-agent-systems-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/offshore-ai-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/offshore-generative-ai-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/offshore-langchain-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/offshore-langgraph-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },

  // Solutions
  { url: `${BASE_URL}/solutions/ai-agents-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/ai-chatbot-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/ai-copilot-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/solutions/ai-workflow-automation`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/enterprise-rag-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/solutions/azure-openai-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/document-ai-solutions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/lang-chain-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/lang-graph-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/multi-agent-systems`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/ai-for-financial-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/ai-for-healthcare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/ai-for-logistics`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/ai-for-manufacturing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },

  // Microsoft, Modernization & Offshore Engineering
  { url: `${BASE_URL}/services/microsoft-fabric-engineering-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/power-bi-development-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
  { url: `${BASE_URL}/services/offshore-power-platform-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/offshore-sharepoint-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
  { url: `${BASE_URL}/services/offshore-spfx-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/services/offshore-web-app-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
  { url: `${BASE_URL}/services/offshore-mobile-app-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
  { url: `${BASE_URL}/services/website-modernization`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/services/legacy-application-modernization`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/services/mvp`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },

  // Industries
  { url: `${BASE_URL}/industries/healthcare-ai-solutions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/industries/healthcare-software-testing-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/industries/offshore-logistics-supply-chain-engineering`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/industries/ai-for-it-services-solutions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },

  // Case Studies Categories
  { url: `${BASE_URL}/case-studies/ai`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/case-studies/data-analytics`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/mobile`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/power-platform`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/sharepoint`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/web`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },

  // Products & Policies
  { url: `${BASE_URL}/avoora`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
]

async function getBlogSlugs(): Promise<{ slug: string; updatedAt: string | null }[]> {
  try {
    return await client.fetch(
      `*[_type == "post" && !(_id in path("drafts.**")) && coalesce(visibility, status, "published") == "published"]{ "slug": slug.current, "updatedAt": coalesce(_updatedAt, publishedAt) }`
    )
  } catch {
    return []
  }
}

async function getCaseStudySlugs(): Promise<{ slug: string; updatedAt: string | null }[]> {
  try {
    return await client.fetch(
      `*[_type == "caseStudy" && !(_id in path("drafts.**")) && coalesce(visibility, status, "published") == "published"]{ "slug": slug.current, "updatedAt": coalesce(_updatedAt, publishedAt) }`
    )
  } catch {
    return []
  }
}

async function getMarketingPageSlugs(): Promise<{ slug: string; updatedAt: string | null }[]> {
  try {
    return await client.fetch(
      `*[_type == "marketingPage" && status == "published" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`,
    )
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogSlugs()
  const caseStudies = await getCaseStudySlugs()
  const marketingPages = await getMarketingPageSlugs()

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

  const marketingRoutes: MetadataRoute.Sitemap = marketingPages.map(({ slug, updatedAt }) => ({
    url: `${BASE_URL}/p/${slug}`,
    lastModified: updatedAt ? new Date(updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes, ...marketingRoutes]
}
