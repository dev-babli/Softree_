import {
  CASE_STUDY_CATEGORY_CONFIG,
  CASE_STUDY_CATEGORY_KEYS,
  type CaseStudyCategoryKey,
} from '@/app/case-studies/categoryConfig'
import { resolveCaseStudyCategory } from '@/lib/case-study-category'
import type { SanityNavCaseStudy, SanityNavCaseStudyCategory } from './types'

const NAV_GROUPS: {
  key: string
  title: string
  description: string
  categoryKeys: CaseStudyCategoryKey[]
}[] = [
  {
    key: 'microsoft',
    title: 'Microsoft & data',
    description: 'Power Platform, SharePoint, and analytics delivery.',
    categoryKeys: ['power-platform', 'sharepoint', 'data-analytics'],
  },
  {
    key: 'engineering',
    title: 'Product engineering',
    description: 'Web and mobile platforms built for scale.',
    categoryKeys: ['web', 'mobile'],
  },
  {
    key: 'intelligence',
    title: 'AI & automation',
    description: 'Intelligent systems with measurable outcomes.',
    categoryKeys: ['ai'],
  },
]

export function buildCaseStudyNavCategories(
  studies: SanityNavCaseStudy[],
): SanityNavCaseStudyCategory[] {
  const counts = new Map<CaseStudyCategoryKey, number>()

  for (const study of studies) {
    if (!study.slug?.current) continue
    const key = resolveCaseStudyCategory(study)
    if (!key) continue
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }

  return NAV_GROUPS.map((group) => {
    const links = group.categoryKeys
      .filter((key) => (counts.get(key) ?? 0) > 0)
      .map((key) => {
        const config = CASE_STUDY_CATEGORY_CONFIG[key]
        return {
          key,
          label: config.title,
          description: config.eyebrow,
          href: `/case-studies/${key}`,
        }
      })

    return {
      key: group.key,
      title: group.title,
      description: group.description,
      links,
    }
  }).filter((group) => group.links.length > 0)
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
