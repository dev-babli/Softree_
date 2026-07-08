'use client'

import { lazy, Suspense } from 'react'

const ReactBitsStudioTool = lazy(() => import('./ReactBitsStudioTool'))

export function LazyReactBitsStudioTool() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading React Bits…</div>}>
      <ReactBitsStudioTool />
    </Suspense>
  )
}
