import { SOFTREE_STYLE_CONTEXT } from '@/sanity/assist/constants'
import { client } from '@/sanity/lib/client'

const AI_CONTEXT_QUERY = `*[_type == "aiContext" && isDefault == true][0].context`

export async function loadBrandContext(): Promise<string> {
  try {
    const fromSanity = await client.fetch<string | null>(AI_CONTEXT_QUERY)
    if (fromSanity?.trim()) {
      return `${fromSanity.trim()}\n\n${SOFTREE_STYLE_CONTEXT}`
    }
  } catch {
    // Fall back to bundled style guide when CMS is unreachable.
  }
  return SOFTREE_STYLE_CONTEXT
}
