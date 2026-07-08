/** AEO publish readiness — meta + FAQ coverage for answer-engine visibility. */

export type AeoFaqItem = { question?: unknown; answer?: unknown }

export type AeoComposerSection = {
  _type?: string
  faqs?: AeoFaqItem[]
}

export type AeoCompletenessDoc = {
  metaTitle?: string
  metaDescription?: string
  faqSchema?: AeoFaqItem[]
  /** Legacy case study FAQs (sections tab — hidden in page-composer mode) */
  faqs?: AeoFaqItem[]
  composerSections?: AeoComposerSection[]
}

/** Normalize FAQ text — handles plain strings and portable-text block arrays. */
export function normalizeFaqText(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (value == null) return ''

  if (Array.isArray(value)) {
    const parts: string[] = []
    for (const block of value) {
      if (!block || typeof block !== 'object') continue
      const children = (block as { children?: Array<{ text?: string }> }).children
      if (!Array.isArray(children)) continue
      for (const child of children) {
        if (typeof child?.text === 'string' && child.text.trim()) {
          parts.push(child.text.trim())
        }
      }
    }
    return parts.join(' ').trim()
  }

  return ''
}

function isValidFaqItem(item: AeoFaqItem | null | undefined): boolean {
  if (!item || typeof item !== 'object') return false
  return Boolean(normalizeFaqText(item.question) && normalizeFaqText(item.answer))
}

function countValidFaqItems(items: AeoFaqItem[] | undefined): number {
  return items?.filter((item) => isValidFaqItem(item)).length ?? 0
}

export function countFaqItems(doc: AeoCompletenessDoc | null | undefined): number {
  if (!doc) return 0

  let count = countValidFaqItems(doc.faqSchema)
  count += countValidFaqItems(doc.faqs)

  for (const section of doc.composerSections ?? []) {
    if (!section || typeof section !== 'object') continue
    const faqs = section.faqs
    if (Array.isArray(faqs) && faqs.length > 0) {
      count += countValidFaqItems(faqs)
    }
  }

  return count
}

/** Human-readable missing AEO fields for publish guards and editor progress. */
export function getAeoPublishIssues(doc: AeoCompletenessDoc | null | undefined): string[] {
  if (!doc) return ['save document first']

  const issues: string[] = []
  const metaTitle = doc.metaTitle?.trim()
  const metaDescription = doc.metaDescription?.trim()
  const faqCount = countFaqItems(doc)

  if (!metaTitle) issues.push('meta title')
  else if (metaTitle.length > 60) issues.push('meta title (max 60 characters)')

  if (!metaDescription) issues.push('meta description')
  else if (metaDescription.length > 160) issues.push('meta description (max 160 characters)')

  if (faqCount < 2) {
    issues.push(
      `FAQ (${faqCount}/2) — add Q&A under Publish & SEO → FAQ pairs, or FAQ accordion on the Page tab`,
    )
  }

  return issues
}

export function collectFaqItems(
  doc: AeoCompletenessDoc | null | undefined,
): Array<{ question: string; answer: string }> {
  if (!doc) return []

  const seen = new Set<string>()
  const items: Array<{ question: string; answer: string }> = []

  const push = (item: AeoFaqItem) => {
    const q = normalizeFaqText(item.question)
    const a = normalizeFaqText(item.answer)
    if (!q || !a) return
    const key = q.toLowerCase()
    if (seen.has(key)) return
    seen.add(key)
    items.push({ question: q, answer: a })
  }

  for (const item of doc.faqSchema ?? []) push(item)
  for (const item of doc.faqs ?? []) push(item)
  for (const section of doc.composerSections ?? []) {
    if (!section || typeof section !== 'object') continue
    for (const item of section.faqs ?? []) push(item)
  }

  return items
}
