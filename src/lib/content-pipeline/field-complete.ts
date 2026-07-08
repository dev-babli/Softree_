import 'server-only'

import { FIELD_SPECS_RECORD } from '@/cms/studio/assist/fieldRegistry'
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

export type FieldCompleteInput = {
  documentType: string
  fieldName: string
  fieldTitle?: string
  document: Record<string, unknown>
  currentValue?: string
  action?: 'autocomplete' | 'rewrite'
}

export async function completeEditorField(input: FieldCompleteInput): Promise<string> {
  const spec = FIELD_SPECS_RECORD[input.fieldName]
  if (!spec) {
    throw new Error(`Field "${input.fieldName}" is not supported for AI autocomplete`)
  }

  const brandContext = await loadBrandContext()
  const context = pickContext(input.document, spec.contextFields)
  if (input.currentValue?.trim()) {
    context.currentDraft = input.currentValue.trim()
  }

  const action = input.action ?? 'autocomplete'
  const maxLen = spec.maxLength ? ` Maximum ${spec.maxLength} characters.` : ''
  const rewriteHint =
    action === 'rewrite'
      ? ' Rewrite the current draft for clarity and Softree voice. Keep facts; improve flow.'
      : ''

  const result = await generateJson<{ value: string }>(
    `${brandContext}\n\nYou complete a single CMS field for Softree Technology. Return JSON: {"value":"..."}.${rewriteHint}${maxLen} Output only the field value.`,
    JSON.stringify(
      {
        documentType: input.documentType,
        field: input.fieldName,
        fieldTitle: input.fieldTitle,
        instruction: spec.instruction,
        action,
        context,
      },
      null,
      2,
    ),
    { temperature: action === 'rewrite' ? 0.45 : 0.35, maxTokens: 1024 },
  )

  let value = result.value?.trim() || ''
  if (spec.maxLength && value.length > spec.maxLength) {
    value = value.slice(0, spec.maxLength - 1).trimEnd() + '…'
  }
  if (!value) throw new Error('AI returned an empty value')
  return value
}
