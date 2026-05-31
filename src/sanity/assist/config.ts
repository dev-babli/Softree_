import { assist } from '@sanity/assist'

import { useSoftreeAssistFieldActions } from './fieldActions'
import { SOFTREE_STYLE_CONTEXT } from './constants'

/** Enable AI Assist in Sanity project settings (sanity.io/manage) for your project. */
export const assistPlugin = assist({
  assist: {
    temperature: 0.3,
  },
  fieldActions: {
    title: 'Softree instruction templates',
    useFieldActions: useSoftreeAssistFieldActions,
  },
})

export { SOFTREE_STYLE_CONTEXT }

export const defaultFieldInstructions = {
  excerpt:
    'Write a listing summary in 120–160 characters. Mention the client or topic and one measurable outcome. No hype words.',
  metaDescription:
    'Write an SEO meta description in 120–160 characters. Include the focus keyword if provided. Clear call to value.',
  metaTitle:
    'Write an SEO page title in 30–60 characters. Include brand relevance. No trailing punctuation.',
  body: 'Write in clear paragraphs. Use H2 for major sections only. Do not add an H1 — the page title is the H1. Prefer bullet lists for takeaways.',
  challengeContent:
    'Describe the business problem, constraints, and pain points before the project. 2–4 short paragraphs. Be specific to the client industry.',
  approachContent:
    'Explain Softree\'s strategy, architecture, and delivery approach. Mention relevant technologies without jargon overload.',
  outcomeContent:
    'Highlight measurable results and business impact. Include metrics where possible. End with forward-looking value.',
  faqAnswer:
    'Write a concise FAQ answer (2–4 sentences) suitable for Google AI Overviews and featured snippets.',
} as const
