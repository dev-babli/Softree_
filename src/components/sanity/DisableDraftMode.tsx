'use client'

/**
 * Disable Draft Mode Button
 * 
 * Shows a button to exit draft mode when viewing preview content.
 * Only visible when Draft Mode is enabled AND outside the Presentation Tool.
 * 
 * @see https://www.sanity.io/docs/visual-editing
 */

import { useDraftModeEnvironment } from 'next-sanity/hooks'

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment()

  // Only show when outside the Presentation Tool
  // (environment === 'live' means standalone preview, not in Studio iframe)
  if (environment !== 'live' && environment !== 'unknown') {
    return null
  }

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-50 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-gray-800"
    >
      Exit Preview Mode
    </a>
  )
}
