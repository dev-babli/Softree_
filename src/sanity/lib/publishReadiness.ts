import { getAeoPublishIssues, countFaqItems, type AeoCompletenessDoc } from './aeoCompleteness'
import { isCaseStudyCategory } from '@/app/case-studies/categoryConfig'
import { caseStudyHasStoryContent, type CaseStudyCompletenessDoc } from './caseStudyCompleteness'
import { postHasContent, type PostCompletenessDoc } from './postCompleteness'
import { dataset } from '../env'

export type PublishReadinessDoc = CaseStudyCompletenessDoc &
  PostCompletenessDoc &
  AeoCompletenessDoc & {
    title?: string
    slug?: { current?: string }
    excerpt?: string
    client?: string
    headerTitle?: string
    category?: string
    mainImage?: { asset?: { _ref?: string }; alt?: string }
    mainImageUrl?: string
    sections?: unknown[]
    metaTitle?: string
    metaDescription?: string
    reviewStatus?: string
    _type?: string
  }

export type PublishCheckItem = {
  id: string
  label: string
  pass: boolean
  tab: string
  hint: string
}

function hasCoverImage(doc: PublishReadinessDoc): boolean {
  return !!(doc.mainImage?.asset?._ref || doc.mainImageUrl)
}

export function hasCoverImageAlt(doc: PublishReadinessDoc | null | undefined): boolean {
  if (!doc) return false
  if (doc.mainImageUrl && !doc.mainImage?.asset?._ref) return true
  if (!doc.mainImage?.asset?._ref) return true
  return Boolean(doc.mainImage.alt?.trim())
}

function storyContentPass(doc: PublishReadinessDoc): boolean {
  if (doc._type === 'post') return postHasContent(doc)
  if (doc._type === 'marketingPage') return (doc.sections?.length ?? 0) > 0
  return caseStudyHasStoryContent(doc)
}

/** Full publish checklist with tab hints for Studio UI. */
export function getPublishChecklist(
  type: string,
  doc: PublishReadinessDoc | null | undefined,
): PublishCheckItem[] {
  if (!doc) {
    return [{ id: 'save', label: 'Save document', pass: false, tab: '—', hint: 'Save your draft first' }]
  }

  const aeoIssues = getAeoPublishIssues(doc)
  const isCaseStudy = type === 'caseStudy'
  const isPost = type === 'post'
  const isMarketing = type === 'marketingPage'
  const faqCount = countFaqItems(doc)

  const items: PublishCheckItem[] = [
    {
      id: 'title',
      label: 'Title',
      pass: !!doc.title?.trim(),
      tab: isPost ? 'Content' : 'Story',
      hint: 'Headline shown on the case study page',
    },
    {
      id: 'slug',
      label: 'Slug',
      pass: !!doc.slug?.current,
      tab: isPost ? 'Content' : 'Story',
      hint: 'URL path — generate from title',
    },
  ]

  if (isCaseStudy) {
    items.push(
      {
        id: 'client',
        label: 'Client name',
        pass: !!doc.client?.trim(),
        tab: 'Story',
        hint: 'Large hero name on the detail page',
      },
      {
        id: 'headerTitle',
        label: 'Header title',
        pass: !!doc.headerTitle?.trim(),
        tab: 'Story',
        hint: 'Descriptive subtitle next to the hero image',
      },
      {
        id: 'category',
        label: 'Service category',
        pass: !!doc.category && isCaseStudyCategory(doc.category),
        tab: 'Story',
        hint: 'Story setup → pick AI, Web, Mobile, etc.',
      },
    )
  }

  if (!isMarketing) {
    items.push({
      id: 'excerpt',
      label: 'Excerpt',
      pass: !!doc.excerpt?.trim(),
      tab: isPost ? 'Content' : 'Story',
      hint: '2–3 sentences — used in listings and meta fallback',
    })
  }

  if (!isMarketing) {
    items.push({
      id: 'cover',
      label: 'Cover image',
      pass: hasCoverImage(doc),
      tab: isPost ? 'Content' : 'Media',
      hint: 'Upload a hero / social image',
    })
    items.push({
      id: 'coverAlt',
      label: 'Cover image alt text',
      pass: hasCoverImageAlt(doc),
      tab: isPost ? 'Content' : 'Media',
      hint: 'Cover image → Alternative text (describe what’s in the image)',
    })
  }

  items.push({
    id: 'story',
    label: isMarketing ? 'Page sections' : 'Story content',
    pass: storyContentPass(doc),
    tab: isMarketing ? 'Page' : isPost ? 'Page' : 'Page',
    hint: isCaseStudy
      ? 'Page tab → composer sections, or Story tab narratives'
      : 'Body or composer sections',
  })

  if (!isMarketing) {
    const metaTitleOk = !!doc.metaTitle?.trim() && (doc.metaTitle?.length ?? 0) <= 60
    const metaDescOk = !!doc.metaDescription?.trim() && (doc.metaDescription?.length ?? 0) <= 160

    items.push(
      {
        id: 'metaTitle',
        label: 'Meta title',
        pass: metaTitleOk,
        tab: isPost ? 'SEO' : 'Publish & SEO',
        hint: '≤60 chars — or run document action “Fill SEO from title & excerpt”',
      },
      {
        id: 'metaDescription',
        label: 'Meta description',
        pass: metaDescOk,
        tab: isPost ? 'SEO' : 'Publish & SEO',
        hint: '≤160 chars — summarize outcome for search results',
      },
      {
        id: 'faq',
        label: `FAQ (${faqCount}/2 minimum)`,
        pass: faqCount >= 2,
        tab: isPost ? 'SEO' : 'Publish & SEO',
        hint: 'Publish & SEO → FAQ pairs, or Page tab → FAQ accordion section',
      },
    )
  }

  if (dataset === 'production' && (isCaseStudy || isPost)) {
    const reviewPass = !doc.reviewStatus || doc.reviewStatus === 'approved'
    items.push({
      id: 'review',
      label: 'Review status → Approved',
      pass: reviewPass,
      tab: 'Publish & SEO',
      hint: reviewPass
        ? 'Approved — or leave unset on older stories'
        : 'Set Review status to Approved before publishing on production',
    })
  }

  return items
}

/** Content blockers before publishing on production (type-aware). */
export function getPublishContentBlockers(
  type: string,
  doc: PublishReadinessDoc | null | undefined,
): string[] {
  if (!doc) return ['save the document first']

  const missing: string[] = []
  if (!doc.title) missing.push('title')
  if (!doc.slug?.current) missing.push('slug')

  if (type === 'post') {
    if (!doc.excerpt) missing.push('excerpt')
    if (!hasCoverImage(doc)) missing.push('cover image')
    if (hasCoverImage(doc) && !hasCoverImageAlt(doc)) missing.push('cover image alt text')
    if (!postHasContent(doc)) missing.push('story content (body or composer sections)')
    return missing
  }

  if (type === 'caseStudy') {
    if (!doc.excerpt) missing.push('excerpt')
    if (!doc.client) missing.push('client')
    if (!doc.headerTitle) missing.push('header title')
    if (!hasCoverImage(doc)) missing.push('cover image')
    if (hasCoverImage(doc) && !hasCoverImageAlt(doc)) missing.push('cover image alt text')
    if (!caseStudyHasStoryContent(doc)) {
      missing.push('story content (composer sections or challenge/approach/outcome)')
    }
    if (!doc.category || !isCaseStudyCategory(doc.category)) {
      missing.push('service category')
    }
    return missing
  }

  if (type === 'marketingPage') {
    if ((doc.sections?.length ?? 0) === 0) missing.push('page sections')
    return missing
  }

  return missing
}

export function getPublishAeoBlockers(type: string, doc: PublishReadinessDoc | null | undefined): string[] {
  if (type !== 'caseStudy' && type !== 'post') return []
  return getAeoPublishIssues(doc)
}

/** Advisory warnings for the Publish tooltip — does not gate publish (form state can be ahead of saved draft). */
export function getPublishWarnings(
  type: string,
  doc: PublishReadinessDoc | null | undefined,
): string[] {
  const warnings: string[] = []

  if (dataset === 'production' && (type === 'caseStudy' || type === 'post' || type === 'marketingPage')) {
    if (doc?.reviewStatus && doc.reviewStatus !== 'approved') {
      warnings.push('Review status is not Approved')
    }
    warnings.push(...getPublishContentBlockers(type, doc))
    if (type === 'caseStudy' || type === 'post') {
      warnings.push(...getPublishAeoBlockers(type, doc))
    }
  }

  return [...new Set(warnings)]
}
