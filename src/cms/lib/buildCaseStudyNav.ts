import {
  CASE_STUDY_CATEGORY_CONFIG,
  CASE_STUDY_CATEGORY_KEYS,
  type CaseStudyCategoryKey,
} from '@/app/case-studies/categoryConfig'
import type { SanityNavCaseStudy, SanityNavCaseStudyCategory, SanityNavCaseStudyLink } from './types'

export type CaseStudyDomainKey =
  | 'ai'
  | 'power-platform'
  | 'data-analytics'
  | 'sharepoint'
  | 'mobile'
  | 'web'
  | 'healthcare'
  | 'logistics'

export interface CaseStudyDomainConfig {
  key: CaseStudyDomainKey
  title: string
  hubLabel: string
  description: string
  hubHref: string
}

// User-specified exact order: 1st AI -> Power Apps -> Data -> SharePoint -> Mobile -> Web -> Healthcare -> Logistics
export const CASE_STUDY_DOMAINS: CaseStudyDomainConfig[] = [
  {
    key: 'ai',
    title: 'AI & Automation',
    hubLabel: 'All AI & Automation Studies',
    description: 'Autonomous AI agents, LLM copilots & smart workflows.',
    hubHref: '/case-studies/ai',
  },
  {
    key: 'power-platform',
    title: 'Power Apps & Platform',
    hubLabel: 'All Power Apps Studies',
    description: 'Custom canvas apps, Power Automate RPA & Dataverse.',
    hubHref: '/case-studies/power-platform',
  },
  {
    key: 'data-analytics',
    title: 'Data & Analytics',
    hubLabel: 'All Data & Analytics Studies',
    description: 'Executive Power BI dashboards & Microsoft Fabric lakehouse.',
    hubHref: '/case-studies/data-analytics',
  },
  {
    key: 'sharepoint',
    title: 'SharePoint & SPFx',
    hubLabel: 'All SharePoint & SPFx Studies',
    description: 'Modern SharePoint Online intranets & custom SPFx web parts.',
    hubHref: '/case-studies/sharepoint',
  },
  {
    key: 'mobile',
    title: 'Mobile Applications',
    hubLabel: 'All Mobile Application Studies',
    description: 'High-performance iOS, Android & cross-platform apps.',
    hubHref: '/case-studies/mobile',
  },
  {
    key: 'web',
    title: 'Web Applications',
    hubLabel: 'All Web Application Studies',
    description: 'Modern Next.js platforms, SaaS portals & cloud apps.',
    hubHref: '/case-studies/web',
  },
  {
    key: 'healthcare',
    title: 'Healthcare & Life Sciences',
    hubLabel: 'All Healthcare & Life Sciences Studies',
    description: 'Clinical AI copilots, hospital bed management & HIPAA QA.',
    hubHref: '/case-studies?industry=healthcare',
  },
  {
    key: 'logistics',
    title: 'Logistics & Supply Chain',
    hubLabel: 'All Logistics & Supply Chain Studies',
    description: 'AI customs compliance, freight tracking & warehouse tools.',
    hubHref: '/case-studies?industry=logistics',
  },
]

function matchesDomain(study: SanityNavCaseStudy, domainKey: CaseStudyDomainKey): boolean {
  const cat = (study.category || '').toLowerCase()
  const ind = (study.industry || '').toLowerCase()
  const title = (study.title || '').toLowerCase()
  const useCase = (study.useCase || '').toLowerCase()
  const text = `${title} ${useCase} ${cat} ${ind}`

  switch (domainKey) {
    case 'ai':
      return (
        cat === 'ai' ||
        text.includes('ai agent') ||
        text.includes('bedrock') ||
        text.includes('copilot') ||
        text.includes('langchain') ||
        text.includes('openai') ||
        text.includes('generative ai') ||
        text.includes('agentic')
      )
    case 'power-platform':
      return (
        cat === 'power-platform' ||
        text.includes('power apps') ||
        text.includes('power automate') ||
        text.includes('dataverse') ||
        text.includes('power platform')
      )
    case 'data-analytics':
      return (
        cat === 'data-analytics' ||
        text.includes('power bi') ||
        text.includes('fabric') ||
        text.includes('tableau') ||
        text.includes('lakehouse') ||
        text.includes('analytics') ||
        text.includes('bi dashboard')
      )
    case 'sharepoint':
      return (
        cat === 'sharepoint' ||
        text.includes('sharepoint') ||
        text.includes('spfx') ||
        text.includes('intranet')
      )
    case 'mobile':
      return (
        cat === 'mobile' ||
        text.includes('mobile app') ||
        text.includes('react native') ||
        text.includes('ios') ||
        text.includes('android') ||
        text.includes('barcode')
      )
    case 'web':
      return (
        cat === 'web' ||
        text.includes('web application') ||
        text.includes('next.js') ||
        text.includes('react') ||
        text.includes('portal') ||
        text.includes('marketplace')
      )
    case 'healthcare':
      return (
        ind.includes('health') ||
        text.includes('hospital') ||
        text.includes('clinical') ||
        text.includes('patient') ||
        text.includes('pathology') ||
        text.includes('emr')
      )
    case 'logistics':
      return (
        ind.includes('logistic') ||
        ind.includes('supply chain') ||
        ind.includes('shipping') ||
        ind.includes('freight') ||
        text.includes('warehouse') ||
        text.includes('shipment') ||
        text.includes('customs compliance') ||
        text.includes('dock scheduling')
      )
    default:
      return false
  }
}

export function buildCaseStudyNavCategories(
  studies: SanityNavCaseStudy[],
): SanityNavCaseStudyCategory[] {
  return CASE_STUDY_DOMAINS.map((domain) => {
    const matching = (studies || []).filter(
      (s) => s.slug?.current && matchesDomain(s, domain.key),
    )

    const links: SanityNavCaseStudyLink[] = [
      {
        key: `all-${domain.key}`,
        label: domain.hubLabel,
        description: domain.description,
        href: domain.hubHref,
      },
    ]

    // Append up to 2 featured case studies for this domain
    for (const study of matching.slice(0, 2)) {
      const slug = study.slug.current
      if (links.some((l) => l.href === `/case-studies/${slug}`)) continue

      const cleanLabel = study.client || study.title
      const cleanDesc = study.excerpt || domain.description

      links.push({
        key: slug,
        label: cleanLabel,
        description: cleanDesc,
        href: `/case-studies/${slug}`,
      })
    }

    return {
      key: domain.key,
      title: domain.title,
      description: domain.description,
      links,
    }
  })
}

/** Flat category links for browse chips (all categories with at least one story). */
export function buildCaseStudyCategoryLinks(
  counts: Partial<Record<CaseStudyCategoryKey, number>>,
) {
  return CASE_STUDY_CATEGORY_KEYS.filter((key) => (counts[key] ?? 0) > 0).map((key) => ({
    key,
    label: CASE_STUDY_CATEGORY_CONFIG[key].title,
    href: `/case-studies/${key}`,
    count: counts[key] ?? 0,
    accentColor: CASE_STUDY_CATEGORY_CONFIG[key].accentColor,
  }))
}
