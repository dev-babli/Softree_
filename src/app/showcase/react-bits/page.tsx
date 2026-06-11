"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

import { ReactBitsShowcase } from "@/components/react-bits/ReactBitsShowcase"

function ReactBitsShowcasePageInner() {
  const params = useSearchParams()
  const component = params.get("component") ?? undefined
  const embedded = params.get("embedded") === "1"

  return <ReactBitsShowcase initialComponentId={component} embedded={embedded} />
}

export default function ReactBitsShowcasePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f1117] p-8 text-white/70">Loading React Bits…</div>}>
      <ReactBitsShowcasePageInner />
    </Suspense>
  )
}
