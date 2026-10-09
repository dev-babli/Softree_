import { MetadataRoute } from 'next'
import { client } from '@/cms/lib/client'

const BASE_URL = 'https://www.softreetechnology.com'

const staticRoutes: MetadataRoute.Sitemap = [
  // Primary Core Pages (Priority 1.0 - 0.95)
  { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/ai-workflow-orchestration`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/who-do-we-serve`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/webanalyser`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },

  // AI & Automation Services
  { url: `${BASE_URL}/services/ai-development-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/services/generative-ai`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/services/ai-consulting-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/ai-chatbot-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/ai-healthcare-development-service`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/multi-agent-systems-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/azure-openai-development-partner`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/amazon-bedrock-agentcore-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/amazon-nova-2-sonic-solutions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/offshore-langchain-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/offshore-langgraph-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/ai-powered-test-automation`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },

  // Quality Engineering & Testing Services
  { url: `${BASE_URL}/quality-engineering/automation-testing-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/quality-engineering/agentic-ai-testing-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/quality-engineering/security-testing-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/quality-engineering/logistics-testing-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },

  // Solutions Hub
  { url: `${BASE_URL}/solutions/enterprise-rag-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/solutions/lang-chain-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/solutions/lang-graph-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/ai-agents-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/solutions/ai-copilot-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/solutions/ai-workflow-automation`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/solutions/ai-chatbot-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/azure-openai-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/document-ai-solutions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/solutions/multi-agent-systems`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },

  // Microsoft, Power Platform & Modern Workspace Services
  { url: `${BASE_URL}/services/tableau-migration-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/sql-server-to-microsoft-fabric-migration`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/tableau-server-to-tableau-cloud-migration`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/azure-data-factory-to-microsoft-fabric-migration`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/power-bi-to-microsoft-fabric-migration`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/azure-synapse-to-microsoft-fabric-migration`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/power-bi-development-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/microsoft-fabric-development-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/services/offshore-power-platform-development`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/services/offshore-sharepoint-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/services/offshore-spfx-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/services/offshore-web-app-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/services/offshore-mobile-app-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/services/legacy-application-modernization`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },

  // Industry Solutions
  { url: `${BASE_URL}/industries/healthcare-ai-solutions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/industries/healthcare-software-testing-services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/industries/offshore-logistics-supply-chain-engineering`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  { url: `${BASE_URL}/industries/ai-for-it-services-solutions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },

  // Case Studies & Categories
  { url: `${BASE_URL}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/case-studies/ai`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
  { url: `${BASE_URL}/case-studies/data-analytics`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/mobile`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/power-platform`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/sharepoint`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies/web`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },

  // Blog & Information
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE_URL}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/careers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
  { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
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
