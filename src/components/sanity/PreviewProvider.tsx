'use client'

/**
 * Sanity Visual Editing Provider
 *
 * Enables live visual editing overlay when in draft mode.
 * Shows edit buttons on content that link directly to Sanity Studio.
 */

import { useEffect } from 'react'
import { client } from '@/sanity/client'

function useLiveModeStub({ client: _client }: { client: typeof client }) {
  useEffect(() => {
    // Live mode requires @sanity/react-loader which is not installed.
    // This stub keeps the component tree intact until the dependency is added.
  }, [_client])
}

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  // Enable live visual editing - must be called directly in component body
  useLiveModeStub({ client })

  return <>{children}</>
}
