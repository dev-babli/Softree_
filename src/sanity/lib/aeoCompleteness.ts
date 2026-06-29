/** AEO publish readiness — meta + FAQ coverage for answer-engine visibility. */

export type AeoFaqItem = { question?: string; answer?: string }

export type AeoComposerSection = {
  _type?: string
  faqs?: AeoFaqItem[]
}

export type AeoCompletenessDoc = {
  metaTitle?: string
  metaDescription?: string
  faqSchema?: AeoFaqItem[]
  composerSections?: AeoComposerSection[]
}

export function countFaqItems(doc: AeoCompletenessDoc | null | undefined): number {
  if (!doc) return 0

  let count =
    doc.faqSchema?.filter((item) => item.question?.trim() && item.answer?.trim()).length ?? 0

  for (const section of doc.composerSections ?? []) {
    if (section._type !== 'csFaqSection') continue
    count +=
      section.faqs?.filter((item) => item.question?.trim() && item.answer?.trim()).length ?? 0
  }

  return count
}

/** Human-readable missing AEO fields for publish guards and editor progress. */
export function getAeoPublishIssues(doc: AeoCompletenessDoc | null | undefined): string[] {
  if (!doc) return ['save document first']

  const issues: string[] = []
  const metaTitle = doc.metaTitle?.trim()
  const metaDescription = doc.metaDescription?.trim()

  if (!metaTitle) issues.push('meta title')
  else if (metaTitle.length > 60) issues.push('meta title (max 60 characters)')

  if (!metaDescription) issues.push('meta description')
  else if (metaDescription.length > 160) issues.push('meta description (max 160 characters)')

  if (countFaqItems(doc) < 2) {
    issues.push('FAQ (add 2+ Q&A in SEO tab or FAQ section)')
  }

  return issues
}

export function collectFaqItems(doc: AeoCompletenessDoc | null | undefined): AeoFaqItem[] {
  if (!doc) return []

  const seen = new Set<string>()
  const items: AeoFaqItem[] = []

  const push = (item: AeoFaqItem) => {
    const q = item.question?.trim()
    const a = item.answer?.trim()
    if (!q || !a) return
    const key = q.toLowerCase()
    if (seen.has(key)) return
    seen.add(key)
    items.push({ question: q, answer: a })
  }

  for (const item of doc.faqSchema ?? []) push(item)
  for (const section of doc.composerSections ?? []) {
    if (section._type !== 'csFaqSection') continue
    for (const item of section.faqs ?? []) push(item)
  }

  return items
}
