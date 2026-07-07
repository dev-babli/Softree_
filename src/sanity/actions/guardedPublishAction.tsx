'use client'

import { PublishIcon } from '@sanity/icons'
import { useCallback, useMemo } from 'react'
import { type DocumentActionComponent, useDocumentOperation, useEditState } from 'sanity'

import { countFaqItems } from '../lib/aeoCompleteness'
import {
  getPublishWarnings,
  type PublishReadinessDoc,
} from '../lib/publishReadiness'
import { STUDIO_UI_ONLY_FIELDS } from '../lib/studioUiFields'

const GUARDED_TYPES = new Set(['caseStudy', 'post', 'marketingPage'])

const PUBLISH_DISABLED_HINTS: Record<string, string> = {
  ALREADY_PUBLISHED:
    'No unpublished draft yet — change something, wait for autosave (or press Ctrl+S), then Publish.',
  NO_CHANGES: 'No changes to publish — edit the document and save first.',
  LIVE_EDIT_ENABLED: 'This document type uses live edit; changes publish automatically.',
  NOT_PUBLISHED: 'First-time publish — fill required fields, save, then Publish.',
}

function publishDisabledHint(disabled: false | string | boolean): string | null {
  if (!disabled || disabled === true) return null
  if (typeof disabled === 'string') {
    return PUBLISH_DISABLED_HINTS[disabled] ?? `Publish unavailable (${disabled})`
  }
  return null
}

function resolveActionDoc(
  props: { draft?: PublishReadinessDoc | null; published?: PublishReadinessDoc | null },
  editState: { draft?: PublishReadinessDoc | null; published?: PublishReadinessDoc | null },
): PublishReadinessDoc | null | undefined {
  return props.draft || editState.draft || props.published || editState.published || null
}

export const GuardedPublishAction: DocumentActionComponent = (props) => {
  const { publish, patch } = useDocumentOperation(props.id, props.type)
  const editState = useEditState(props.id, props.type)
  const docType = props.type
  const hasDraft = Boolean(props.draft || editState.draft)

  const doc = useMemo(
    () => resolveActionDoc(props, editState),
    [props, editState.draft, editState.published, props.draft, props.published],
  )

  const warnings = useMemo(
    () => (GUARDED_TYPES.has(docType) ? getPublishWarnings(docType, doc) : []),
    [docType, doc],
  )

  const faqCount = useMemo(() => countFaqItems(doc), [doc])
  const disabledHint = publishDisabledHint(publish.disabled)

  const onHandle = useCallback(() => {
    const ops: Array<{ set?: Record<string, string>; unset?: string[] }> = [
      { unset: [...STUDIO_UI_ONLY_FIELDS] },
    ]

    if (!doc?.publishedAt) {
      ops.push({ set: { publishedAt: new Date().toISOString() } })
    }

    patch.execute(ops)
    publish.execute()
    props.onComplete()
  }, [doc?.publishedAt, patch, props, publish])

  const title = !publish.enabled
    ? disabledHint ??
      'Publish is unavailable — make a change, save (Ctrl+S), then try again.'
    : warnings.length > 0
      ? `Publish updates the live site. Notes: ${warnings.join(' · ')}`
      : faqCount < 2 && (docType === 'caseStudy' || docType === 'post')
        ? `Publish — saved draft has ${faqCount}/2 FAQs (save after adding more if needed).`
        : hasDraft
          ? 'Publish merges your draft changes to the live site.'
          : 'Make an edit and save to create a draft, then Publish.'

  return {
    label: 'Publish',
    icon: PublishIcon,
    disabled: !publish.enabled,
    title,
    onHandle,
  }
}
