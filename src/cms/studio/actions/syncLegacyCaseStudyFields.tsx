'use client'

import { RevertIcon } from '@sanity/icons'
import { useToast } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { type DocumentActionComponent, useClient } from 'sanity'

import {
  getLegacyCaseStudyFieldPatches,
  hasLegacyCaseStudyFieldGaps,
  type CaseStudyLegacyDoc,
} from '@/cms/lib/studio/caseStudyLegacy'

/** Backfill category + headerTitle from legacy useCase / layout / hero fields. */
export const SyncLegacyCaseStudyFieldsAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion: '2026-05-21' })
  const toast = useToast()
  const [isSyncing, setIsSyncing] = useState(false)

  const source = (props.draft || props.published) as CaseStudyLegacyDoc | null

  const onHandle = useCallback(async () => {
    if (!source || isSyncing) return

    const patches = getLegacyCaseStudyFieldPatches(source)
    if (Object.keys(patches).length === 0) {
      toast.push({
        status: 'info',
        title: 'Nothing to sync',
        description: 'Category and header title are already set.',
      })
      props.onComplete()
      return
    }

    setIsSyncing(true)
    try {
      await client.patch(props.id).set(patches).commit()
      toast.push({
        status: 'success',
        title: 'Legacy fields synced',
        description: `Updated: ${Object.keys(patches).join(', ')}. Save if prompted, then Publish.`,
      })
      props.onComplete()
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Sync failed',
        description: error instanceof Error ? error.message : 'Try again after saving (Ctrl+S).',
      })
    } finally {
      setIsSyncing(false)
    }
  }, [client, isSyncing, props, source, toast])

  if (props.type !== 'caseStudy' || !source) return null
  if (!hasLegacyCaseStudyFieldGaps(source)) return null

  const patches = getLegacyCaseStudyFieldPatches(source)

  return {
    label: isSyncing ? 'Syncing…' : 'Sync legacy fields',
    icon: RevertIcon,
    disabled: isSyncing,
    title: `Backfill ${Object.keys(patches).join(', ')} from use case, layout, and hero fields so you can save and publish.`,
    onHandle,
  }
}
