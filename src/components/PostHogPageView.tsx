// components/PostHogPageView.tsx
'use client'
import { useSearchParams, usePathname } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import posthog from 'posthog-js'

function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams() // ← hook lives here, safely inside Suspense

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams}` : '')
    posthog.capture('$pageview', { '$current_url': url })
  }, [pathname, searchParams])

  return null
}

export function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  )
}