import { SOFTREE_STYLE_CONTEXT } from '@/sanity/assist/constants'
import { readClient } from '@/sanity/lib/readClient'

const AI_CONTEXT_QUERY = `*[_type == "aiContext" && isDefault == true][0].context`

export async function loadBrandContext(): Promise<string> {
  try {
    const fromSanity = await readClient.fetch<string | null>(AI_CONTEXT_QUERY)
    if (fromSanity?.trim()) {
      return `${fromSanity.trim()}\n\n${SOFTREE_STYLE_CONTEXT}`
    }
  } catch {
    // Fall back to bundled style guide when CMS is unreachable.
  }
  return SOFTREE_STYLE_CONTEXT
}

export async function loadBrandContextStatus(): Promise<{
  hasDefaultDocument: boolean
  documentId: string | null
  title: string | null
  usesBundledFallback: boolean
  preview: string
}> {
  const doc = await readClient.fetch<{
    _id: string
    title?: string
    context?: string
  } | null>(`*[_type == "aiContext" && isDefault == true][0]{ _id, title, context }`)

  const custom = doc?.context?.trim() ?? ''
  const preview = (custom || SOFTREE_STYLE_CONTEXT).slice(0, 280).replace(/\s+/g, ' ')

  return {
    hasDefaultDocument: Boolean(doc),
    documentId: doc?._id ?? null,
    title: doc?.title ?? null,
    usesBundledFallback: !custom,
    preview: preview.length >= 280 ? `${preview}…` : preview,
  }
}
