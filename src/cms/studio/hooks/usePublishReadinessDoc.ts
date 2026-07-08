'use client'

import { useFormValue } from 'sanity'

import type { PublishReadinessDoc } from '@/cms/lib/studio/publishReadiness'

/**
 * Live document slice for publish readiness — for custom **form inputs** only.
 * Document actions must use `useEditState` + props (see GuardedPublishAction).
 */
export function usePublishReadinessDoc(): PublishReadinessDoc & { _type?: string } {
  const _type = useFormValue(['_type']) as string | undefined
  const title = useFormValue(['title']) as string | undefined
  const slug = useFormValue(['slug']) as { current?: string } | undefined
  const excerpt = useFormValue(['excerpt']) as string | undefined
  const client = useFormValue(['client']) as string | undefined
  const headerTitle = useFormValue(['headerTitle']) as string | undefined
  const category = useFormValue(['category']) as string | undefined
  const mainImage = useFormValue(['mainImage']) as PublishReadinessDoc['mainImage']
  const mainImageUrl = useFormValue(['mainImageUrl']) as string | undefined
  const metaTitle = useFormValue(['metaTitle']) as string | undefined
  const metaDescription = useFormValue(['metaDescription']) as string | undefined
  const reviewStatus = useFormValue(['reviewStatus']) as string | undefined
  const status = useFormValue(['status']) as string | undefined
  const publishedAt = useFormValue(['publishedAt']) as string | undefined
  const faqSchema = useFormValue(['faqSchema']) as PublishReadinessDoc['faqSchema']
  const faqs = useFormValue(['faqs']) as PublishReadinessDoc['faqs']
  const composerSections = useFormValue(['composerSections']) as PublishReadinessDoc['composerSections']
  const detailLayout = useFormValue(['detailLayout']) as string | undefined
  const body = useFormValue(['body']) as unknown[] | undefined
  const challengeContent = useFormValue(['challengeContent']) as unknown[] | undefined
  const approachContent = useFormValue(['approachContent']) as unknown[] | undefined
  const outcomeContent = useFormValue(['outcomeContent']) as unknown[] | undefined
  const sections = useFormValue(['sections']) as unknown[] | undefined
  const displayMode = useFormValue(['displayMode']) as string | undefined

  return {
    _type,
    title,
    slug,
    excerpt,
    client,
    headerTitle,
    category,
    mainImage,
    mainImageUrl,
    metaTitle,
    metaDescription,
    reviewStatus,
    status,
    publishedAt,
    faqSchema,
    faqs,
    composerSections,
    detailLayout,
    body,
    challengeContent,
    approachContent,
    outcomeContent,
    sections,
    displayMode,
  }
}
