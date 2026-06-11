"use client"

import { useEffect, useRef } from "react"
import { usePaneRouter } from "sanity/structure"

const EDITOR_VIEW = "editor"
const PREVIEW_VIEW = "preview"

/**
 * Opens the case study document in side-by-side Edit + Live preview panes.
 * Sanity 5.9+ handles this via `defaultPanes` in structure.ts; this hook
 * is a fallback when the router still has a single pane after mount.
 */
export function useCaseStudySplitPane() {
  const { groupLength, params, setParams, duplicateCurrent } = usePaneRouter()
  const booted = useRef(false)

  useEffect(() => {
    if (booted.current || groupLength > 1) return

    const timer = window.setTimeout(() => {
      if (booted.current || groupLength > 1) return

      booted.current = true

      const currentView = params?.view || EDITOR_VIEW
      if (currentView === EDITOR_VIEW) {
        setParams({ ...params, expanded: "true" })
      }

      duplicateCurrent({ params: { view: PREVIEW_VIEW } })
    }, 200)

    return () => window.clearTimeout(timer)
  }, [groupLength, params, setParams, duplicateCurrent])
}
