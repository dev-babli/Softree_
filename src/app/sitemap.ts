import { MetadataRoute } from 'next'
import { client } from '@/cms/lib/client'

const BASE_URL = 'https://www.softreetechnology.com'

const staticRoutes: MetadataRoute.Sitemap = [
  // Primary Core Pages (Priority 1.0 - 0.95)
  { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/who-do-we-serve`, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/global-partners`, changeFrequency: 'monthly', priority: 0.85 },

  // AI & Automation Services
  { url: `${BASE_URL}/services/ai-development-services`, changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/services/generative-ai`, changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/services/ai-consulting-services`, changeFrequency: 'weekly', priority: 0.9 },


  { url: `${BASE_URL}/services/amazon-bedrock-agentcore-development`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/amazon-nova-2-sonic-solutions`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/offshore-langchain-development`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/offshore-langgraph-development`, changeFrequency: 'weekly', priority: 0.9 },


  // Quality Engineering & Testing Services
  { url: `${BASE_URL}/quality-engineering/automation-testing-services`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/quality-engineering/agentic-ai-testing-services`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/quality-engineering/security-testing-services`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/quality-engineering/logistics-testing-services`, changeFrequency: 'weekly', priority: 0.9 },

  // Solutions Hub
  { url: `${BASE_URL}/solutions/enterprise-rag-development`, changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/solutions/lang-chain-development`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/solutions/lang-graph-development`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/ai-agents-development`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/solutions/ai-copilot-development`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/solutions/ai-chatbot-development`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/azure-openai-development`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/document-ai-solutions`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/multi-agent-systems-development`, changeFrequency: 'weekly', priority: 0.95 },

  // Microsoft, Power Platform & Modern Workspace Services
  { url: `${BASE_URL}/services/tableau-migration-services`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/tableau-to-power-bi-migration`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/sql-server-to-microsoft-fabric-migration`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/tableau-server-to-tableau-cloud-migration`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/azure-data-factory-to-microsoft-fabric-migration`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/power-bi-to-microsoft-fabric-migration`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/azure-synapse-to-microsoft-fabric-migration`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/power-bi-development-services`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/microsoft-fabric-development-services`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/offshore-power-platform-development`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/offshore-sharepoint-development`, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/services/offshore-spfx-development`, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/services/offshore-web-app-development`, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/services/offshore-mobile-app-development`, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/services/legacy-application-modernization`, changeFrequency: 'monthly', priority: 0.85 },

  // Industry Solutions
  { url: `${BASE_URL}/industries/healthcare-ai-solutions`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/industries/healthcare-software-testing-services`, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/industries/offshore-logistics-supply-chain-engineering`, changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/industries/ai-for-it-services`, changeFrequency: 'monthly', priority: 0.85 },

  // Case Studies & Categories
  { url: `${BASE_URL}/case-studies`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/case-studies/ai`, changeFrequency: 'weekly', priority: 0.85 },
  { url: `${BASE_URL}/case-studies/data-analytics`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/mobile`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/power-platform`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/sharepoint`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/web`, changeFrequency: 'monthly', priority: 0.8 },

  // Blog & Information
  { url: `${BASE_URL}/blog`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE_URL}/about-us`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/careers`, changeFrequency: 'weekly', priority: 0.75 },
  { url: `${BASE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
]

async function getBlogSlugs(): Promise<{ slug: string; updatedAt: string | null }[]> {
  try {
    const posts = await client.fetch<{ slug: string; updatedAt: string | null }[]>(
      `*[_type == "post" && !(_id in path("drafts.**")) && coalesce(visibility, status, "published") == "published" && defined(slug.current) && slug.current != "" && slug.current != "null"]{ "slug": slug.current, "updatedAt": coalesce(_updatedAt, publishedAt) }`
    )
    return (posts || []).filter((p) => p && p.slug && p.slug !== 'null' && p.slug !== 'undefined' && p.slug.trim() !== '')
  } catch {
    return []
  }
}

async function getCaseStudySlugs(): Promise<{ slug: string; updatedAt: string | null }[]> {
  try {
    const studies = await client.fetch<{ slug: string; updatedAt: string | null }[]>(
      `*[_type == "caseStudy" && !(_id in path("drafts.**")) && coalesce(visibility, status, "published") == "published" && defined(slug.current) && slug.current != "" && slug.current != "null"]{ "slug": slug.current, "updatedAt": coalesce(_updatedAt, publishedAt) }`
    )
    return (studies || []).filter((cs) => cs && cs.slug && cs.slug !== 'null' && cs.slug !== 'undefined' && cs.slug.trim() !== '')
  } catch {
    return []
  }
}

async function getMarketingPageSlugs(): Promise<{ slug: string; updatedAt: string | null }[]> {
  try {
    const pages = await client.fetch<{ slug: string; updatedAt: string | null }[]>(
      `*[_type == "marketingPage" && !(_id in path("drafts.**")) && coalesce(visibility, status, "published") == "published" && defined(slug.current) && slug.current != "" && slug.current != "null"]{ "slug": slug.current, "updatedAt": _updatedAt }`,
    )
    return (pages || []).filter((p) => p && p.slug && p.slug !== 'null' && p.slug !== 'undefined' && p.slug.trim() !== '')
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPosts, caseStudies, marketingPages] = await Promise.all([
    getBlogSlugs(),
    getCaseStudySlugs(),
    getMarketingPageSlugs(),
  ])

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
