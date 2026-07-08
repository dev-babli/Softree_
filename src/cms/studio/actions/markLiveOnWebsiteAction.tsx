'use client'

import { EarthGlobeIcon } from '@sanity/icons'
import { useToast } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { type DocumentActionComponent } from 'sanity'

import {
  isWebsiteDraft,
  publishWebsiteLiveViaApi,
} from '@/cms/lib/studio/publishWebsiteStatus'

const LIVE_TYPES = new Set(['caseStudy', 'post', 'marketingPage'])

/** Fix stories that are in Sanity but still have Status = Draft on the website filter. */
export const MarkLiveOnWebsiteAction: DocumentActionComponent = (props) => {
  const toast = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  const doc = (props.draft || props.published) as {
    status?: string
    publishedAt?: string
  } | null

  const onHandle = useCallback(async () => {
    if (isUpdating) return

    setIsUpdating(true)
    try {
      await publishWebsiteLiveViaApi(props.id)
      props.onComplete()
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Could not mark live',
        description:
          error instanceof Error
            ? error.message
            : 'Network error — hard-refresh Studio and try again.',
      })
    } finally {
      setIsUpdating(false)
    }
  }, [isUpdating, props, toast])

  if (!LIVE_TYPES.has(props.type) || !doc) return null
  if (!isWebsiteDraft(doc)) return null

  return {
    label: isUpdating ? 'Marking live…' : 'Mark live on website',
    icon: EarthGlobeIcon,
    disabled: isUpdating,
    title:
      'Sets Status → Published and publishes so this story appears on the site.',
    onHandle,
  }
}
