'use client'

import { PublishIcon } from '@sanity/icons'
import { useCallback, useMemo } from 'react'
import { type DocumentActionComponent, useClient, useDocumentOperation } from 'sanity'

import { dataset, apiVersion } from '../env'
import {
  getPublishAeoBlockers,
  getPublishContentBlockers,
  type PublishReadinessDoc,
} from '../lib/publishReadiness'

const GUARDED_TYPES = new Set(['caseStudy', 'post', 'marketingPage'])

/** Block publish on production until reviewStatus is approved (default plan). */
export const GuardedPublishAction: DocumentActionComponent = (props) => {
  const { publish } = useDocumentOperation(props.id, props.type)
  const sanityClient = useClient({ apiVersion })
  const doc = (props.draft || props.published) as PublishReadinessDoc | null | undefined
  const reviewStatus =
    doc && typeof doc === 'object' && 'reviewStatus' in doc
      ? (doc.reviewStatus as string | undefined)
      : undefined

  const contentMissing = useMemo(
    () => (GUARDED_TYPES.has(props.type) ? getPublishContentBlockers(props.type, doc) : []),
    [props.type, doc],
  )

  const aeoMissing = useMemo(
    () => (GUARDED_TYPES.has(props.type) ? getPublishAeoBlockers(props.type, doc) : []),
    [props.type, doc],
  )

  const reviewBlocked =
    dataset === 'production' && GUARDED_TYPES.has(props.type) && reviewStatus !== 'approved'

  const contentBlocked =
    dataset === 'production' && GUARDED_TYPES.has(props.type) && contentMissing.length > 0

  const aeoBlocked =
    dataset === 'production' &&
    (props.type === 'caseStudy' || props.type === 'post') &&
    aeoMissing.length > 0

  const blocked = reviewBlocked || contentBlocked || aeoBlocked

  const onHandle = useCallback(async () => {
    const patch: Record<string, unknown> = { status: 'published' }
    if (!doc?.publishedAt) {
      patch.publishedAt = new Date().toISOString()
    }

    try {
      await sanityClient.patch(props.id).set(patch).commit()
    } catch (error) {
      console.error('[GuardedPublishAction] Failed to sync publish metadata:', error)
    }

    publish.execute()
    props.onComplete()
  }, [doc?.publishedAt, props, publish, sanityClient])

  const allMissing = [...contentMissing, ...aeoMissing]

  const title = reviewBlocked
    ? 'Set Review status to Approved before publishing on the production dataset.'
    : contentBlocked
      ? `Before publishing on production, add: ${contentMissing.join(', ')}`
      : aeoBlocked
        ? `AEO checklist — fix before publishing: ${aeoMissing.join(', ')}`
        : allMissing.length > 0
          ? `Publish readiness: still missing ${allMissing.join(', ')} (allowed on ${dataset})`
          : 'Sets Status to Published and fills Published date if empty, then publishes to the live site.'

  return {
    label: 'Publish',
    icon: PublishIcon,
    disabled: blocked || !publish.enabled,
    title,
    onHandle,
  }
}
