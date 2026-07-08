'use client'

import { lazy, Suspense } from 'react'

const ContentAgentStudioTool = lazy(() => import('./ContentAgentStudioTool'))

export function LazyContentAgentTool() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading Content Agent…</div>}>
      <ContentAgentStudioTool />
    </Suspense>
  )
}
