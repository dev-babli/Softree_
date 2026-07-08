import { defineField } from 'sanity'

import { aiAssistExclude } from './blockContentOptions'

export const scheduledPublishAtField = defineField({
  name: 'scheduledPublishAt',
  title: 'Scheduled publish',
  type: 'datetime',
  description:
    'Optional future publish time. Guarded Publish blocks until this datetime passes (UTC).',
  options: {
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm',
    timeStep: 15,
    ...aiAssistExclude,
  },
})

export function isScheduledPublishBlocked(doc: { scheduledPublishAt?: string } | null | undefined): string | null {
  if (!doc?.scheduledPublishAt) return null
  const scheduled = new Date(doc.scheduledPublishAt)
  if (Number.isNaN(scheduled.getTime())) return 'Scheduled publish date is invalid'
  if (scheduled.getTime() > Date.now()) {
    return `Scheduled for ${scheduled.toLocaleString()} — publish is blocked until then`
  }
  return null
}
