'use client'

import { HelpCircleIcon } from '@sanity/icons'
import { useCallback } from 'react'
import { type DocumentActionComponent, useClient } from 'sanity'

import { studioApiUrl, studioFetchInit } from '@/cms/lib/studio/studioFetch'

export const GenerateFaqsFromContentAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion: '2026-05-21' })

  const onHandle = useCallback(async () => {
    const source = (props.draft || props.published) as Record<string, unknown> | null
    if (!source) return

    const res = await fetch(
      studioApiUrl('/api/studio/ai-generate-faq'),
      studioFetchInit('POST', {
        documentType: props.type,
        document: source,
      }),
    )
    const json = (await res.json()) as {
      ok?: boolean
      faqs?: Array<{ question: string; answer: string }>
      error?: string
    }
    if (!json.ok || !json.faqs?.length) {
      throw new Error(json.error || 'FAQ generation failed')
    }

    const existing = Array.isArray(source.faqSchema) ? source.faqSchema : []
    const merged = [
      ...existing,
      ...json.faqs.map((faq) => ({
        _type: 'caseStudyFaqSchema',
        _key: crypto.randomUUID(),
        question: faq.question,
        answer: faq.answer,
      })),
    ]

    await client.patch(props.id).set({ faqSchema: merged }).commit()
    props.onComplete()
  }, [client, props])

  if (!props.draft && !props.published) return null
  if (props.type !== 'caseStudy' && props.type !== 'post') return null

  return {
    label: 'Generate FAQs from story',
    icon: HelpCircleIcon,
    onHandle,
  }
}
