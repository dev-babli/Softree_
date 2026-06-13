import {
  CASE_STUDY_CATEGORY_CONFIG,
  CASE_STUDY_CATEGORY_KEYS,
  type CaseStudyCategoryKey,
  isCaseStudyCategory,
} from '@/app/case-studies/categoryConfig'

export type CaseStudyCategorySource = {
  category?: string | null
  industry?: string | null
  useCase?: string | null
  detailLayout?: string | null
  title?: string | null
  client?: string | null
}

const USE_CASE_CATEGORY_MAP: Record<string, CaseStudyCategoryKey> = {
  'Process Automation': 'power-platform',
  'AI Agents': 'ai',
  'Customer Experience': 'web',
  Operations: 'data-analytics',
  'Web Platform': 'web',
  'Mobile App': 'mobile',
  'Product Engineering': 'web',
  'Operations Analytics & Intelligent IT Service Management': 'data-analytics',
  'Inventory Management, Asset Tracking, Barcode Scanning, Warehouse Operations': 'mobile',
  'AI Copilot, Process Mining': 'ai',
  'Process Automation, AI Copilot, Process Mining': 'power-platform',
  'AI Agents, Process Automation, HR Operations, Employee Self-Service': 'power-platform',
}

const DETAIL_LAYOUT_CATEGORY_MAP: Record<string, CaseStudyCategoryKey> = {
  'manufacturing-power-platform': 'power-platform',
  'payflow-fintech-story': 'web',
  'nexora-product-story': 'web',
  'synqlab-product-story': 'web',
  'ai-horizontal-story': 'ai',
  'neutrino-dashboard-story': 'data-analytics',
  'stats-dashboard': 'data-analytics',
}

const KEYWORD_RULES: Array<{ pattern: RegExp; category: CaseStudyCategoryKey }> = [
  { pattern: /\b(power platform|power apps|power automate|dataverse|copilot studio)\b/i, category: 'power-platform' },
  { pattern: /\b(sharepoint|spfx|intranet)\b/i, category: 'sharepoint' },
  { pattern: /\b(fabric|power bi|itsm|analytics|data platform)\b/i, category: 'data-analytics' },
  { pattern: /\b(mobile app|ios|android|barcode scanner)\b/i, category: 'mobile' },
  { pattern: /\b(web platform|saas|next\.js|react)\b/i, category: 'web' },
  { pattern: /\b(ai|copilot|machine learning|llm)\b/i, category: 'ai' },
]

function haystack(source: CaseStudyCategorySource): string {
  return [source.title, source.client, source.useCase, source.industry].filter(Boolean).join(' ')
}

/** Resolve tech category for filtering, nav, and category landing pages. */
export function resolveCaseStudyCategory(
  source: CaseStudyCategorySource,
): CaseStudyCategoryKey | null {
  if (source.category && isCaseStudyCategory(source.category)) {
    return source.category
  }

  if (source.detailLayout === 'manufacturing-power-platform') {
    return 'power-platform'
  }

  if (source.useCase) {
    const exact = USE_CASE_CATEGORY_MAP[source.useCase.trim()]
    if (exact) return exact

    for (const [label, key] of Object.entries(USE_CASE_CATEGORY_MAP)) {
      if (source.useCase.toLowerCase().includes(label.toLowerCase())) return key
    }
  }

  if (source.detailLayout && DETAIL_LAYOUT_CATEGORY_MAP[source.detailLayout]) {
    return DETAIL_LAYOUT_CATEGORY_MAP[source.detailLayout]
  }

  if (source.industry && isCaseStudyCategory(source.industry)) {
    return source.industry
  }

  const text = haystack(source)
  for (const rule of KEYWORD_RULES) {
    if (rule.pattern.test(text)) return rule.category
  }

  return null
}

export function getCaseStudyCategoryLabel(
  source: CaseStudyCategorySource,
  fallback = 'Case Study',
): string {
  const key = resolveCaseStudyCategory(source)
  if (key) return CASE_STUDY_CATEGORY_CONFIG[key].title
  if (source.industry && !isCaseStudyCategory(source.industry)) return source.industry
  return fallback
}

export function getCaseStudyCategoryHref(key: CaseStudyCategoryKey | null): string | undefined {
  if (!key) return undefined
  return `/case-studies/${key}`
}

export function countCaseStudiesByCategory(
  studies: CaseStudyCategorySource[],
): Partial<Record<CaseStudyCategoryKey, number>> {
  const counts: Partial<Record<CaseStudyCategoryKey, number>> = {}
  for (const study of studies) {
    const key = resolveCaseStudyCategory(study)
    if (!key) continue
    counts[key] = (counts[key] ?? 0) + 1
  }
  return counts
}

export { CASE_STUDY_CATEGORY_KEYS, CASE_STUDY_CATEGORY_CONFIG }
