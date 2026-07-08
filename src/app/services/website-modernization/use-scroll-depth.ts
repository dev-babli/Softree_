"use client"

import { useEffect } from "react"
import { trackModernizationEvent } from "./analytics"

const MILESTONES = [25, 50, 75, 100] as const

export function useScrollDepthTracking() {
  useEffect(() => {
    const fired = new Set<number>()

    function onScroll() {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop || document.body.scrollTop
      const height = doc.scrollHeight - doc.clientHeight
      if (height <= 0) return
      const pct = Math.round((scrollTop / height) * 100)

      for (const m of MILESTONES) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m)
          trackModernizationEvent("scroll_depth", { depth: m })
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
}
