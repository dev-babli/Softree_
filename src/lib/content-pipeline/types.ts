import { z } from 'zod'

import type { BlogLayoutRecipeId } from '@/lib/blog-layout-recipes'

export const pipelineRunSchema = z.object({
  topic: z.string().min(3).max(200).optional(),
  autoPublish: z.boolean().default(false),
  layoutRecipe: z
    .enum([
      'listicle-comparison',
      'trend-analysis',
      'how-to-guide',
      'thought-leadership',
      'tool-deep-dive',
      'roi-story',
    ])
    .optional(),
  generateImages: z.boolean().default(true),
})

export type PipelineRunInput = z.infer<typeof pipelineRunSchema>

export type ResearchBrief = {
  summary: string
  facts: Array<{ fact: string; date?: string; source?: string; url?: string }>
  citations: Array<{ title: string; url: string }>
  faqSeeds: string[]
  suggestedH2: string[]
  competitorGaps: string[]
}

export type GeneratedPostPayload = {
  title: string
  slug: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  secondaryKeywords: string[]
  heroEyebrow: string
  heroHighlights: Array<{ value: string; label: string }>
  featuredImagePrompt: string
  faqSchema: Array<{ question: string; answer: string }>
  layoutRecipe: BlogLayoutRecipeId
  composerSections: Array<Record<string, unknown>>
}

export type PipelineRunResult = {
  ok: true
  documentId: string
  slug: string
  url: string
  layoutRecipe: BlogLayoutRecipeId
  title: string
}

export type PipelineRunError = {
  ok: false
  error: string
  step?: string
}
