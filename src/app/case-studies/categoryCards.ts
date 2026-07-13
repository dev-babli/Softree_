import { groq } from 'next-sanity'

import {
  getCaseStudyCategoryHref,
  getCaseStudyCategoryLabel,
  resolveCaseStudyCategory,
  type CaseStudyCategorySource,
} from '@/lib/case-study-category'
import { readClient } from '@/cms/lib/readClient'

import type { CaseStudyItem } from './CaseStudyGrid'
import type { CaseStudyListingItem, CaseStudyHeroSlide } from './types'
import type { CaseStudyCategoryKey } from './categoryConfig'

type SanityCaseStudyCard = CaseStudyCategorySource & {
  slug?: { current?: string }
  excerpt?: unknown
  storyType?: string
  heroHeadline?: string
  heroEyebrow?: string
  mainImage?: { asset?: { url?: string }; alt?: string }
  mainImageUrl?: string
  metrics?: { label?: string; value?: string }[]
  featured?: boolean
  featuredRank?: number
  keyResults?: { value: string; label: string; description?: string }[]
  publishedAt?: string | null
  _updatedAt?: string
  status?: string
  companySize?: string | null
}

export type { CaseStudyListingItem, CaseStudyHeroSlide } from './types'

type PortableTextLike = {
  children?: Array<{ text?: string }>
}

function asPlainText(value: unknown): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item
        if (item && typeof item === 'object' && 'children' in item) {
          const block = item as PortableTextLike
          return (block.children || []).map((child) => child?.text || '').join(' ')
        }
        return ''
      })
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
  }
  if (value && typeof value === 'object' && 'children' in value) {
    const block = value as PortableTextLike
    return (block.children || [])
      .map((child) => child?.text || '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
  }
  return ''
}

const caseStudyCardProjection = `
  title,
  client,
  slug,
  excerpt,
  industry,
  category,
  useCase,
  companySize,
  detailLayout,
  storyType,
  heroHeadline,
  heroEyebrow,
  mainImage { asset->{ url }, alt },
  mainImageUrl,
  metrics,
  featured,
  featuredRank,
  publishedAt,
  _updatedAt,
  status,
  "keyResults": keyResults[] { value, label, description }
`

const publishedCaseStudiesQuery = groq`
  *[_type == "caseStudy" && coalesce(visibility, status, "published") == "published" && defined(slug.current)]
  | order(_updatedAt desc) {
    ${caseStudyCardProjection}
  }
`

const caseStudyHeroSlidesQuery = groq`
  *[_type == "caseStudy" && coalesce(visibility, status, "published") == "published" && featuredRank > 0 && defined(slug.current)]
  | order(featuredRank asc, _updatedAt desc) {
    ${caseStudyCardProjection}
  }
`

function mapSanityCaseStudyToItem(
  study: SanityCaseStudyCard,
  categoryKey?: CaseStudyCategoryKey | null,
): CaseStudyItem {
  const resolvedKey = categoryKey ?? resolveCaseStudyCategory(study)
  const categoryLabel = getCaseStudyCategoryLabel(study)

  return {
    title: study.client || study.title || 'Case Study',
    description:
      asPlainText(study.excerpt) ||
      'Read the full case study to see outcomes and implementation details.',
    href: `/case-studies/${study.slug?.current}`,
    category: categoryLabel,
    image: study.mainImage?.asset?.url || study.mainImageUrl,
    industry: study.industry && !resolvedKey ? study.industry : categoryLabel,
    metrics: (study.metrics || [])
      .filter((metric) => metric?.label && metric?.value)
      .slice(0, 2)
      .map((metric) => ({
        label: metric.label as string,
        value: metric.value as string,
      })),
  }
}

function resolveImageFit(study: SanityCaseStudyCard, image?: string | null): 'contain' | 'cover' {
  if (!image) return 'cover'
  if (image.includes('_chat.svg')) return 'contain'
  
  // If it's a fallback Unsplash abstract image, it should always be cover
  if (image.includes('unsplash.com')) return 'cover'
  
  const slug = study.slug?.current?.toLowerCase() || ''
  const title = (study.client || study.title || '').toLowerCase()
  const useCase = (study.useCase || '').toLowerCase()
  const industry = (study.industry || '').toLowerCase()
  const category = (study.category || '').toLowerCase()
  
  const containKeywords = [
    'dashboard', 'analytics', 'workflow', 'system', 'platform', 
    'emr', 'itsm', 'scanner', 'automation', 'testing', 
    'scheduler', 'tracker', 'app', 'pdf', 'compliance', 
    'reports', 'copilot', 'migration', 'portal', 'control',
    'audit', 'workbench', 'pipeline', 'tool', 'fabric',
    'powerapps', 'sharepoint', 'spfx', 'sla', 'risk'
  ]
  
  const matchesKeyword = containKeywords.some(
    (kw) => slug.includes(kw) || title.includes(kw) || useCase.includes(kw) || industry.includes(kw) || category.includes(kw)
  )
  
  return matchesKeyword ? 'contain' : 'cover'
}

function mapSanityCaseStudyToListingItem(study: SanityCaseStudyCard): CaseStudyListingItem {
  const image = study.mainImage?.asset?.url || study.mainImageUrl
  const title = study.client || study.title || 'Case Study'
  const categoryKey = resolveCaseStudyCategory(study)
  const categoryLabel = getCaseStudyCategoryLabel(study)

  const stats = (study.keyResults || [])
    .filter((r): r is { label: string; value: string } => Boolean(r?.label && r?.value))
    .slice(0, 3)

  return {
    category: categoryLabel,
    categoryKey,
    categoryHref: getCaseStudyCategoryHref(categoryKey),
    title,
    description:
      asPlainText(study.excerpt) ||
      'Read the full case study to see outcomes and implementation details.',
    href: `/case-studies/${study.slug?.current}`,
    image,
    imageAlt: study.mainImage?.alt || `${title} case study`,
    imageFit: resolveImageFit(study, image),
    industry:
      study.industry && categoryKey && study.industry !== categoryKey
        ? study.industry
        : undefined,
    useCase: study.useCase || undefined,
    companySize: study.companySize || undefined,
    keyResults: stats,
    publishedAt: study.publishedAt || study._updatedAt,
  }
}

function mapSanityCaseStudyToHeroSlide(study: SanityCaseStudyCard): CaseStudyHeroSlide | null {
  const image = study.mainImage?.asset?.url || study.mainImageUrl
  const slug = study.slug?.current
  if (!slug) return null

  const company = study.client || study.title || 'Customer'
  const categoryLabel = getCaseStudyCategoryLabel(study)
  const heroImage =
    image ||
    '/studio/composer-previews/csOverviewSection.svg'

  const stats = (study.keyResults || [])
    .filter((r): r is { label: string; value: string } => Boolean(r?.label && r?.value))
    .slice(0, 3)
    .map((r) => ({
      score: r.value,
      label: r.label,
    }))

  const localStats = (study.metrics || [])
    .filter((metric) => metric?.label && metric?.value)
    .slice(0, 3)
    .map((metric) => ({
      score: metric.value as string,
      label: metric.label as string,
    }))

  const finalStats = stats.length > 0 ? stats : localStats

  return {
    company,
    eyebrow:
      study.heroEyebrow ||
      `Customer Story — ${study.industry && study.industry !== categoryLabel ? study.industry : categoryLabel}`,
    title: study.heroHeadline || study.title || company,
    description:
      asPlainText(study.excerpt) ||
      'Read the full case study to see outcomes and implementation details.',
    ctaText: 'Read case study',
    ctaHref: `/case-studies/${slug}`,
    image: heroImage,
    imageAlt: study.mainImage?.alt || `${company} customer story visual`,
    imageFit: resolveImageFit(study, heroImage),
    stats: finalStats.length > 0 ? finalStats : [{ score: '—', label: 'Customer story' }],
  }
}

async function fetchPublishedCaseStudies(): Promise<SanityCaseStudyCard[]> {
  return readClient.fetch<SanityCaseStudyCard[]>(publishedCaseStudiesQuery)
}

export async function getCaseStudyItemsByCategory(
  category: CaseStudyCategoryKey,
): Promise<CaseStudyItem[]> {
  const studies = await fetchPublishedCaseStudies()

  return studies
    .filter((study) => Boolean(study.slug?.current))
    .filter((study) => resolveCaseStudyCategory(study) === category)
    .map((study) => mapSanityCaseStudyToItem(study, category))
}

export async function getCaseStudyListingItems(): Promise<CaseStudyListingItem[]> {
  const studies = await fetchPublishedCaseStudies()
  return studies
    .filter((study) => Boolean(study.slug?.current))
    .map(mapSanityCaseStudyToListingItem)
}

export async function getCaseStudyHeroSlides(): Promise<CaseStudyHeroSlide[]> {
  const latest = await fetchPublishedCaseStudies()
  return latest
    .slice(0, 3)
    .map(mapSanityCaseStudyToHeroSlide)
    .filter((slide): slide is CaseStudyHeroSlide => slide !== null)
}

export async function getCaseStudyCategoryCounts(): Promise<
  Partial<Record<CaseStudyCategoryKey, number>>
> {
  const studies = await fetchPublishedCaseStudies()
  const counts: Partial<Record<CaseStudyCategoryKey, number>> = {}
  for (const study of studies) {
    const key = resolveCaseStudyCategory(study)
    if (!key) continue
    counts[key] = (counts[key] ?? 0) + 1
  }
  return counts
}
