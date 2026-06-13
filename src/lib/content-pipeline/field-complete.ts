import 'server-only'

import { loadBrandContext } from '@/lib/content-pipeline/brand-context'
import { generateJson } from '@/lib/content-pipeline/llm'

type PortableBlock = {
  _type?: string
  style?: string
  children?: Array<{ text?: string }>
}

function plainTextFromBlocks(blocks: unknown): string {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .map((block) => {
      const b = block as PortableBlock
      if (b._type !== 'block') return ''
      return (b.children || []).map((c) => c.text || '').join('')
    })
    .filter(Boolean)
    .join('\n')
    .trim()
}

function pickContext(doc: Record<string, unknown>, fields: string[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const field of fields) {
    const value = doc[field]
    if (typeof value === 'string' && value.trim()) {
      out[field] = value.trim()
      continue
    }
    if (Array.isArray(value)) {
      const text = plainTextFromBlocks(value)
      if (text) out[field] = text.slice(0, 4000)
    }
  }
  return out
}

const FIELD_SPECS: Record<
  string,
  { contextFields: string[]; instruction: string; maxLength?: number }
> = {
  excerpt: {
    contextFields: ['title', 'client', 'industry', 'challengeContent', 'approachContent', 'outcomeContent', 'body'],
    instruction:
      'Write a listing excerpt in active voice. One concrete outcome. No hype words.',
    maxLength: 160,
  },
  metaTitle: {
    contextFields: ['title', 'excerpt', 'client', 'focusKeyword'],
    instruction: 'Write an SEO page title. Include primary topic. No trailing punctuation.',
    maxLength: 60,
  },
  metaDescription: {
    contextFields: ['title', 'excerpt', 'metaTitle', 'focusKeyword'],
    instruction: 'Write an SEO meta description with clear value and soft CTA.',
    maxLength: 160,
  },
  featuredImagePrompt: {
    contextFields: ['title', 'excerpt', 'categories'],
    instruction:
      'Write a detailed AI image generation prompt for a blog hero (16:9, no text, no faces, enterprise tech aesthetic).',
    maxLength: 800,
  },
  heroImagePrompt: {
    contextFields: ['title', 'excerpt', 'client', 'industry', 'category'],
    instruction:
      'Write a detailed AI image generation prompt for a case study hero (16:9, no text, no faces, enterprise tech aesthetic).',
    maxLength: 800,
  },
  answer: {
    contextFields: ['title', 'excerpt', 'challengeContent', 'approachContent', 'outcomeContent', 'question'],
    instruction:
      'Write a concise FAQ answer (2–4 sentences) suitable for Google AI Overviews. Use the question field as the prompt.',
    maxLength: 400,
  },
  challengeSummary: {
    contextFields: ['title', 'client', 'industry', 'challengeContent'],
    instruction: 'Summarize the business challenge in 1–2 sentences.',
    maxLength: 220,
  },
  approachSummary: {
    contextFields: ['title', 'challengeSummary', 'challengeContent', 'approachContent'],
    instruction: 'Summarize Softree approach in 1–2 sentences.',
    maxLength: 220,
  },
  outcomeSummary: {
    contextFields: ['title', 'approachSummary', 'approachContent', 'outcomeContent', 'metrics'],
    instruction: 'Summarize measurable outcomes in 1–2 sentences with metrics if available.',
    maxLength: 220,
  },
}

export type FieldCompleteInput = {
  documentType: string
  fieldName: string
  fieldTitle?: string
  document: Record<string, unknown>
  currentValue?: string
}

export async function completeEditorField(input: FieldCompleteInput): Promise<string> {
  const spec = FIELD_SPECS[input.fieldName]
  if (!spec) {
    throw new Error(`Field "${input.fieldName}" is not supported for AI autocomplete`)
  }

  const brandContext = await loadBrandContext()
  const context = pickContext(input.document, spec.contextFields)
  if (input.currentValue?.trim()) {
    context.currentDraft = input.currentValue.trim()
  }

  const maxLen = spec.maxLength ? ` Maximum ${spec.maxLength} characters.` : ''

  const result = await generateJson<{ value: string }>(
    `${brandContext}\n\nYou complete a single CMS field for Softree Technology. Return JSON: {"value":"..."}.${maxLen} Output only the field value, no quotes wrapper in the value itself.`,
    JSON.stringify(
      {
        documentType: input.documentType,
        field: input.fieldName,
        fieldTitle: input.fieldTitle,
        instruction: spec.instruction,
        context,
      },
      null,
      2,
    ),
    { temperature: 0.35, maxTokens: 1024 },
  )

  let value = result.value?.trim() || ''
  if (spec.maxLength && value.length > spec.maxLength) {
    value = value.slice(0, spec.maxLength - 1).trimEnd() + '…'
  }
  if (!value) throw new Error('AI returned an empty value')
  return value
}
