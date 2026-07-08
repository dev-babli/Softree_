'use client'

/**
 * Disable Draft Mode Button
 * 
 * Shows a button to exit draft mode when viewing preview content.
 * Only visible when Draft Mode is enabled AND outside the Presentation Tool.
 * 
 * @see https://www.sanity.io/docs/visual-editing
 */

import { useIsPresentationTool } from 'next-sanity/hooks'

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool()

  // Hide inside Presentation Tool; show for standalone draft-mode preview.
  if (isPresentationTool) {
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
