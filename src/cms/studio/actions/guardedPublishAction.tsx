'use client'

import { PublishIcon } from '@sanity/icons'
import { useToast } from '@sanity/ui'
import { useCallback, useMemo, useState } from 'react'
import {
  type DocumentActionComponent,
  useDocumentOperation,
  useEditState,
} from 'sanity'

import { countFaqItems } from '@/cms/lib/studio/aeoCompleteness'
import {
  getPublishWarnings,
  type PublishReadinessDoc,
} from '@/cms/lib/studio/publishReadiness'
import { isScheduledPublishBlocked } from '@/cms/lib/studio/scheduledPublishField'
import {
  buildWebsiteLivePatch,
  isWebsiteDraft,
  publishWebsiteLiveViaApi,
} from '@/cms/lib/studio/publishWebsiteStatus'

const GUARDED_TYPES = new Set(['caseStudy', 'post', 'marketingPage'])

const PUBLISH_DISABLED_HINTS: Record<string, string> = {
  ALREADY_PUBLISHED:
    'No unpublished changes — edit and save (Ctrl+S), then Publish. If Status is still Draft, Publish will go live without other edits.',
  NO_CHANGES: 'Save your document first (Ctrl+S), then Publish.',
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

function publishErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message
  return 'Network error — save (Ctrl+S), hard-refresh Studio, and try again.'
}

export const GuardedPublishAction: DocumentActionComponent = (props) => {
  const toast = useToast()
  const { publish, patch } = useDocumentOperation(props.id, props.type)
  const editState = useEditState(props.id, props.type)
  const [isPublishing, setIsPublishing] = useState(false)
  const docType = props.type
  const hasDraft = Boolean(props.draft || editState.draft)
  const hasPublished = Boolean(props.published || editState.published)

  const doc = useMemo(
    () => resolveActionDoc(props, editState),
    [props, editState.draft, editState.published, props.draft, props.published],
  )

  const publishedDoc = props.published || editState.published
  const hasUnsavedChanges = Boolean(
    editState.draft && !props.draft && publish.disabled === 'ALREADY_PUBLISHED',
  )

  const warnings = useMemo(
    () => (GUARDED_TYPES.has(docType) ? getPublishWarnings(docType, doc) : []),
    [docType, doc],
  )

  const faqCount = useMemo(() => countFaqItems(doc), [doc])
  const disabledHint = publishDisabledHint(publish.disabled)

  const canGoLiveWithoutDraft =
    isWebsiteDraft(publishedDoc) && hasPublished && !publish.enabled && !hasUnsavedChanges

  const scheduledBlock = isScheduledPublishBlocked(doc)
  const canPublish = (publish.enabled || canGoLiveWithoutDraft) && !scheduledBlock

  const onHandle = useCallback(async () => {
    if (isPublishing) return

    setIsPublishing(true)
    try {
      if (publish.enabled) {
        const { set, unset } = buildWebsiteLivePatch(doc)
        patch.execute([{ set }, { unset }])
        publish.execute()
      } else if (canGoLiveWithoutDraft) {
        await publishWebsiteLiveViaApi(props.id)
      }
      props.onComplete()
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Publish failed',
        description: publishErrorMessage(error),
      })
    } finally {
      setIsPublishing(false)
    }
  }, [
    canGoLiveWithoutDraft,
    doc,
    isPublishing,
    patch,
    props,
    publish,
    toast,
  ])

  const title = isPublishing
    ? 'Publishing to the live site…'
    : hasUnsavedChanges
      ? 'Unsaved changes — press Ctrl+S to save, then Publish.'
      : canGoLiveWithoutDraft
        ? 'Go live on website — sets Status → Published (no other edits required).'
        : scheduledBlock
          ? scheduledBlock
          : !publish.enabled
          ? disabledHint ??
            'Publish is unavailable — save your changes (Ctrl+S), then try again.'
          : warnings.length > 0
            ? `Publish updates the live site. Notes: ${warnings.join(' · ')}`
            : faqCount < 2 && (docType === 'caseStudy' || docType === 'post')
              ? `Publish — saved draft has ${faqCount}/2 FAQs (save after adding more if needed).`
              : hasDraft
                ? 'Publish merges your draft to the live site and sets Status → Published.'
                : 'Make an edit and save to create a draft, then Publish.'

  return {
    label: isPublishing ? 'Publishing…' : 'Publish',
    icon: PublishIcon,
    disabled: isPublishing || hasUnsavedChanges || !canPublish,
    title,
    onHandle,
  }
}
