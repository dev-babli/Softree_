import type { CaseStudyCategoryKey } from '@/app/case-studies/categoryConfig'
import type { CaseStudyDetailLayout } from '@/lib/case-study-layouts'

/**
 * Editorial model (matches Contentful/Sanity enterprise patterns):
 * - ONE create template: "Case study" → always starts as page composer
 * - category = service line (where it appears on the site) — NOT a template
 * - detailLayout = page format (how it renders) — chosen in the form, not at create time
 */

export const CASE_STUDY_CREATE_TEMPLATE = {
  id: 'caseStudy-composer',
  title: 'Case study',
  summary: 'Single entry point for all service lines. Pick category and page format after creating.',
} as const

/** Shown to editors by default — covers ~95% of new stories */
export const EDITOR_PAGE_FORMAT = {
  value: 'page-composer' as const satisfies CaseStudyDetailLayout,
  title: 'Flexible page builder',
  badge: 'Recommended',
  description: 'Stack narrative sections, metrics, galleries, and CTAs in any order.',
  whenToUse:
    'Use for every new client story — AI, web, mobile, Power Platform, SharePoint, or analytics.',
} as const

/** Reference / showcase layouts — collapsed under "Advanced" in Studio */
export const REFERENCE_LAYOUT_GROUPS: {
  title: string
  hint: string
  values: CaseStudyDetailLayout[]
}[] = [
  {
    title: 'Product & SaaS showcases',
    hint: 'Pre-built demo pages (Nexora, SynqLab, PayFlow). For showcase URLs only.',
    values: ['nexora-product-story', 'synqlab-product-story', 'payflow-fintech-story'],
  },
  {
    title: 'Platform & industrial',
    hint: 'Manufacturing / Power Platform reference and KPI dashboard demos.',
    values: ['manufacturing-power-platform', 'stats-dashboard', 'before-after-table'],
  },
  {
    title: 'Scroll & editorial',
    hint: 'Pinned horizontal story, Madar sticky parallax, Neutrino IDE dashboard.',
    values: ['ai-horizontal-story', 'madar-sticky-story', 'neutrino-dashboard-story'],
  },
  {
    title: 'Generic layout patterns',
    hint: 'Reusable structural patterns — sidebar, split hero, bento, timeline, etc.',
    values: [
      'sidebar-metadata',
      'split-hero-mockup',
      'zigzag-alternating',
      'vertical-timeline',
      'tabbed-deliverables',
      'bento-results',
      'video-hero',
      'parallax-screenshots',
      'education-edtech-story',
    ],
  },
]

/** Which service category applies — independent of page format */
export const CATEGORY_WHEN_TO_USE: Record<CaseStudyCategoryKey, string> = {
  ai: 'Copilot, ML, intelligent automation, or AI agents were the primary delivery.',
  'power-platform': 'Power Apps, Power Automate, Dataverse, or Copilot Studio were central.',
  sharepoint: 'SharePoint, SPFx, intranet, or document collaboration was the main work.',
  web: 'Web app, SaaS platform, or marketing site was the primary deliverable.',
  mobile: 'iOS, Android, or cross-platform mobile app was the main product.',
  'data-analytics': 'Fabric, Power BI, analytics platform, or data engineering was the focus.',
}

export const EDITOR_SETUP_STEPS = [
  { id: 'category', label: 'Service category', tab: 'story' },
  { id: 'format', label: 'Page format', tab: 'story' },
  { id: 'title', label: 'Title & slug', tab: 'story' },
  { id: 'content', label: 'Build sections', tab: 'composer' },
  { id: 'publish', label: 'Publish', tab: 'publish' },
] as const
