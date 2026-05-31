import { SOFTREE_STYLE_CONTEXT } from './constants'

/**
 * Registered in Studio via assist fieldActions (✨ menu → Softree instruction templates).
 * Each action copies a ready-to-run instruction including live aiContext when available.
 */
export const studioInstructionTemplates = [
  {
    title: 'Softree brand voice (global)',
    instruction: SOFTREE_STYLE_CONTEXT,
  },
  {
    title: 'Case study — fill all story sections',
    instruction: `Using Softree brand voice, write three sections for this case study:
1. The Challenge — business pain, constraints, industry context
2. Our Approach — Softree strategy, architecture, delivery
3. The Outcome — measurable results and business impact
Use the client name, category, and technologies already on the document. Keep paragraphs short.`,
  },
  {
    title: 'Blog — expand outline to full article',
    instruction: `Expand this blog post into a complete article. Use H2 for major sections only (no H1). Include practical examples and a clear next-steps section. Match Softree brand voice.`,
  },
  {
    title: 'SEO pack from story content',
    instruction: `From the article/case study content, write:
- metaTitle (30–60 chars)
- metaDescription (120–160 chars)
- excerpt if empty (120–160 chars)
Include one concrete outcome. No hype words.`,
  },
  {
    title: 'Marketing landing page — polish copy',
    instruction: `Improve headlines and body copy on this marketing page for enterprise buyers. Keep CTAs action-oriented. Match Softree brand voice.`,
  },
] as const
