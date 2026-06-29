import {
  getLayoutRecipe,
  inferLayoutRecipe,
  type BlogLayoutRecipeId,
} from '@/lib/blog-layout-recipes'

import type { ArenaContestant } from './arena/contestants'
import { generateJson } from './llm'
import { proseToPortableText } from './portable-text'
import type { GeneratedPostPayload, ResearchBrief } from './types'
import { randomKey, slugify } from './utils'

type LlmSection = {
  _type: string
  label?: string
  heading?: string
  layout?: 'text' | 'split'
  contentMarkdown?: string
  summary?: string
  features?: string[]
  cards?: Array<{ title: string; description: string }>
  metrics?: Array<{ value: string; label: string; description?: string }>
  rows?: Array<{ metric: string; before: string; after: string }>
  technologies?: string[]
  faqs?: Array<{ question: string; answer: string }>
  items?: Array<{ claim: string; source: string; sourceUrl?: string }>
  quote?: string
  name?: string
  role?: string
  subheading?: string
}

type LlmPostResponse = {
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  secondaryKeywords: string[]
  heroEyebrow: string
  heroHighlights: Array<{ value: string; label: string }>
  featuredImagePrompt: string
  faqSchema: Array<{ question: string; answer: string }>
  sections: LlmSection[]
}

function mapSection(section: LlmSection, planLayout?: 'text' | 'split'): Record<string, unknown> {
  const base = { _key: randomKey(), _type: section._type }

  switch (section._type) {
    case 'csNarrativeSection':
      return {
        ...base,
        label: section.label,
        heading: section.heading,
        layout: section.layout || planLayout || 'text',
        content: proseToPortableText(section.contentMarkdown || ''),
      }
    case 'csCardGridSection':
      return {
        ...base,
        label: section.label,
        heading: section.heading,
        cards: (section.cards || []).map((card) => ({ ...card, _key: randomKey() })),
        showImage: true,
      }
    case 'csMetricsSection':
      return {
        ...base,
        label: section.label,
        heading: section.heading,
        metrics: (section.metrics || []).map((metric) => ({ ...metric, _key: randomKey() })),
      }
    case 'csSolutionSection':
      return {
        ...base,
        label: section.label,
        heading: section.heading,
        summary: section.summary,
        features: section.features || [],
      }
    case 'csBeforeAfterSection':
      return {
        ...base,
        heading: section.heading,
        rows: (section.rows || []).map((row) => ({ ...row, _key: randomKey() })),
      }
    case 'csTechStackSection':
      return {
        ...base,
        heading: section.heading,
        description: section.summary,
        technologies: section.technologies || [],
      }
    case 'csGallerySection':
      return {
        ...base,
        heading: section.heading,
        subheading: section.subheading,
        images: [],
      }
    case 'csTestimonialSection':
      return {
        ...base,
        quote: section.quote,
        name: section.name,
        role: section.role,
      }
    case 'csFaqSection':
      return {
        ...base,
        heading: section.heading || 'Frequently asked questions',
        faqs: (section.faqs || []).map((faq) => ({ ...faq, _key: randomKey() })),
      }
    case 'csEvidencePanel':
      return {
        ...base,
        label: section.label || 'Evidence',
        heading: section.heading || 'What the data shows',
        summary: section.summary || section.contentMarkdown?.slice(0, 320) || '',
        items: (section.items || []).map((item) => ({ ...item, _key: randomKey() })),
      }
    case 'csHeroMetricsStrip':
      return {
        ...base,
        label: section.label,
        heading: section.heading,
        variant: 'band',
        metrics: (section.metrics || []).map((metric) => ({ ...metric, _key: randomKey() })),
      }
    case 'csRelatedSection':
      return base
    case 'csContactSection':
      return base
    default:
      return base
  }
}

function buildPostPrompts(
  topic: string,
  research: ResearchBrief,
  brandContext: string,
  recipeId: BlogLayoutRecipeId,
  contestant?: ArenaContestant,
) {
  const recipe = getLayoutRecipe(recipeId)
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const personaBlock = contestant
    ? `\n\nContestant persona — ${contestant.name}:\n${contestant.directive}`
    : ''

  const system = `${brandContext}

You write SEO/AEO/GEO-optimized blog content for Softree Technology.
Rules:
- Direct answer in first 40-60 words of each narrative section
- Include dated references (${today})
- Question-form headings where possible
- 3-5 statistics with sources from research brief
- No forbidden buzzwords from brand guide
- Output ONLY valid JSON matching the schema${personaBlock}`

  const user = `Topic: ${topic}
Layout recipe: ${recipe.id} — ${recipe.title}
Research summary: ${research.summary}
Facts: ${JSON.stringify(research.facts)}
Citations: ${JSON.stringify(research.citations)}
FAQ seeds: ${JSON.stringify(research.faqSeeds)}
Suggested H2s: ${JSON.stringify(research.suggestedH2)}
Gaps to own: ${JSON.stringify(research.competitorGaps)}

Required section types IN ORDER (use these _type values exactly):
${recipe.sectionPlan.map((s) => `- ${s._type}: ${s.purpose}`).join('\n')}

Return JSON:
{
  "title": "50-90 chars, keyword front-loaded, include ${today.split(' ')[1]} if timely",
  "excerpt": "120-160 chars",
  "metaTitle": "max 60 chars",
  "metaDescription": "max 160 chars",
  "focusKeyword": "...",
  "secondaryKeywords": ["..."],
  "heroEyebrow": "Blog · Category · ${today.split(' ')[0]} ${today.split(' ')[1]}",
  "heroHighlights": [{"value": "40%", "label": "short label"}, ... max 3],
  "featuredImagePrompt": "editorial enterprise tech, Softree palette, no text in image",
  "faqSchema": [{"question":"...","answer":"..."} min 5],
  "sections": [
    { "_type": "csNarrativeSection", "label": "...", "heading": "...", "contentMarkdown": "markdown with ## headings" }
  ]
}

For csFaqSection include faqs array. For csEvidencePanel include summary + items[{claim,source,sourceUrl}].
For csContactSection and csRelatedSection only _type is needed.
Do NOT include csOverviewSection.`

  return { recipe, today, system, user, temperature: contestant?.temperature ?? 0.3 }
}

function assemblePostPayload(
  topic: string,
  research: ResearchBrief,
  recipeId: BlogLayoutRecipeId,
  llm: LlmPostResponse,
  today: string,
): GeneratedPostPayload {
  const recipe = getLayoutRecipe(recipeId)

  const composerSections = recipe.sectionPlan.map((plan, index) => {
    const llmSection =
      llm.sections.find((s) => s._type === plan._type) || llm.sections[index]
    if (llmSection) {
      return mapSection({ ...llmSection, _type: plan._type }, plan.layout)
    }
    if (plan._type === 'csContactSection' || plan._type === 'csRelatedSection') {
      return { _type: plan._type, _key: randomKey() }
    }
    return mapSection(
      {
        _type: plan._type,
        heading: plan.purpose,
        contentMarkdown: research.summary,
      },
      plan.layout,
    )
  })

  const title = llm.title?.trim() || topic
  const slug = slugify(title)

  return {
    title,
    slug,
    excerpt: llm.excerpt?.trim() || research.summary.slice(0, 160),
    metaTitle: (llm.metaTitle || title).slice(0, 60),
    metaDescription: (llm.metaDescription || llm.excerpt || research.summary).slice(0, 160),
    focusKeyword: llm.focusKeyword || topic.split(' ').slice(0, 4).join(' '),
    secondaryKeywords: llm.secondaryKeywords || [],
    heroEyebrow: llm.heroEyebrow || `Blog · ${today}`,
    heroHighlights: (llm.heroHighlights || []).slice(0, 3),
    featuredImagePrompt:
      llm.featuredImagePrompt ||
      `Editorial photograph for enterprise blog: ${title}. Modern Microsoft technology workspace, warm neutral tones, orange accent, no text.`,
    faqSchema: llm.faqSchema?.length
      ? llm.faqSchema
      : research.faqSeeds.slice(0, 6).map((q) => ({
          question: q,
          answer: research.summary,
        })),
    layoutRecipe: recipeId,
    composerSections,
  }
}

/** Generate one candidate — used by the Content Arena and single-shot mode. */
export async function generatePostCandidate(
  topic: string,
  research: ResearchBrief,
  brandContext: string,
  layoutRecipeId?: BlogLayoutRecipeId,
  contestant?: ArenaContestant,
): Promise<GeneratedPostPayload> {
  const recipeId = layoutRecipeId || inferLayoutRecipe(topic)
  const { today, system, user, temperature } = buildPostPrompts(
    topic,
    research,
    brandContext,
    recipeId,
    contestant,
  )

  const llm = await generateJson<LlmPostResponse>(system, user, { temperature })
  return assemblePostPayload(topic, research, recipeId, llm, today)
}

export async function generatePostDocument(
  topic: string,
  research: ResearchBrief,
  brandContext: string,
  layoutRecipeId?: BlogLayoutRecipeId,
): Promise<GeneratedPostPayload> {
  return generatePostCandidate(topic, research, brandContext, layoutRecipeId)
}
