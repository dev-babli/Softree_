/** Layout recipes for AI-driven blog composer pages (maps to section stacks). */

export type BlogLayoutRecipeId =
  | 'listicle-comparison'
  | 'trend-analysis'
  | 'how-to-guide'
  | 'thought-leadership'
  | 'tool-deep-dive'
  | 'roi-story'

export type ComposerSectionPlan = {
  _type: string
  /** Hint for the content agent */
  purpose: string
  layout?: 'text' | 'split'
}

export type BlogLayoutRecipe = {
  id: BlogLayoutRecipeId
  title: string
  description: string
  /** Section types in order — reuse case study composer block `_type` values */
  sectionPlan: ComposerSectionPlan[]
  topicPatterns: RegExp[]
}

export const BLOG_LAYOUT_RECIPES: BlogLayoutRecipe[] = [
  {
    id: 'listicle-comparison',
    title: 'Listicle / comparison',
    description: 'Ranked lists, “10 best”, provider comparisons',
    topicPatterns: [/10 best/i, /top \d+/i, /best .+ (services|providers)/i, / vs /i],
    sectionPlan: [
      { _type: 'csNarrativeSection', purpose: 'Direct answer intro with definition lead', layout: 'split' },
      { _type: 'csCardGridSection', purpose: 'Main list items as cards (6–10 entries)' },
      { _type: 'csMetricsSection', purpose: 'Aggregate stats or evaluation criteria' },
      { _type: 'csFaqSection', purpose: '8 FAQ pairs for AEO' },
      { _type: 'csContactSection', purpose: 'Contact CTA' },
    ],
  },
  {
    id: 'trend-analysis',
    title: 'Trend / news analysis',
    description: 'Platform updates, industry shifts, dated news',
    topicPatterns: [/2026/i, /update/i, /trend/i, /announce/i, /what(?:'|')s new/i],
    sectionPlan: [
      { _type: 'csNarrativeSection', purpose: 'What changed — answer-first summary', layout: 'split' },
      { _type: 'csBeforeAfterSection', purpose: 'Before vs after comparison table' },
      { _type: 'csTechStackSection', purpose: 'Technologies and platforms involved' },
      { _type: 'csNarrativeSection', purpose: 'What this means for enterprise teams' },
      { _type: 'csFaqSection', purpose: 'FAQ for AI answer engines' },
      { _type: 'csContactSection', purpose: 'Contact CTA' },
    ],
  },
  {
    id: 'how-to-guide',
    title: 'How-to guide',
    description: 'Step-by-step implementation guides',
    topicPatterns: [/how to/i, /step-by-step/i, /guide/i, /implement/i, /migrate/i],
    sectionPlan: [
      { _type: 'csNarrativeSection', purpose: 'Problem and prerequisites', layout: 'split' },
      { _type: 'csNarrativeSection', purpose: 'Steps 1–3 with actionable detail', layout: 'split' },
      { _type: 'csSolutionSection', purpose: 'Checklist of deliverables or success criteria' },
      { _type: 'csGallerySection', purpose: 'Visual walkthrough placeholders' },
      { _type: 'csFaqSection', purpose: 'FAQ' },
      { _type: 'csContactSection', purpose: 'Contact CTA' },
    ],
  },
  {
    id: 'thought-leadership',
    title: 'Thought leadership',
    description: 'Strategy, future-of, opinion pieces',
    topicPatterns: [/future of/i, /strategy/i, /why .+ matters/i, /enterprise/i],
    sectionPlan: [
      { _type: 'csNarrativeSection', purpose: 'Bold thesis with dated context' },
      { _type: 'csMetricsSection', purpose: '3–4 proof metrics with sources' },
      { _type: 'csTestimonialSection', purpose: 'Softree practitioner perspective quote' },
      { _type: 'csFaqSection', purpose: 'FAQ' },
      { _type: 'csContactSection', purpose: 'Contact CTA' },
    ],
  },
  {
    id: 'tool-deep-dive',
    title: 'Tool / platform deep dive',
    description: 'Product comparisons, stack breakdowns',
    topicPatterns: [/power platform/i, /sharepoint/i, /fabric/i, /spfx/i, /agentic/i],
    sectionPlan: [
      { _type: 'csGallerySection', purpose: 'Platform context visuals' },
      { _type: 'csSolutionSection', purpose: 'Capabilities and architecture' },
      { _type: 'csTechStackSection', purpose: 'Stack components' },
      { _type: 'csFaqSection', purpose: 'FAQ' },
      { _type: 'csContactSection', purpose: 'Contact CTA' },
    ],
  },
  {
    id: 'roi-story',
    title: 'ROI / outcomes story',
    description: 'Metrics-led transformation narratives',
    topicPatterns: [/roi/i, /impact/i, /results/i, /%\s/, /reduction/i, /faster/i],
    sectionPlan: [
      { _type: 'csBeforeAfterSection', purpose: 'Before/after metrics' },
      { _type: 'csMetricsSection', purpose: 'Impact dashboard metrics' },
      { _type: 'csNarrativeSection', purpose: 'How Softree delivers similar outcomes', layout: 'split' },
      { _type: 'csFaqSection', purpose: 'FAQ' },
      { _type: 'csContactSection', purpose: 'Contact CTA' },
    ],
  },
]

export function inferLayoutRecipe(topic: string): BlogLayoutRecipeId {
  const normalized = topic.trim()
  for (const recipe of BLOG_LAYOUT_RECIPES) {
    if (recipe.topicPatterns.some((pattern) => pattern.test(normalized))) {
      return recipe.id
    }
  }
  return 'thought-leadership'
}

export function getLayoutRecipe(id: BlogLayoutRecipeId): BlogLayoutRecipe {
  return BLOG_LAYOUT_RECIPES.find((r) => r.id === id) ?? BLOG_LAYOUT_RECIPES[3]
}
