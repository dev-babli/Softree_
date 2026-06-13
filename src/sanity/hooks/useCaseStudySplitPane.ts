'use client'

/**
 * Split panes are configured in structure.ts via defaultPanes.
 * This hook is intentionally a no-op — the old boot logic caused infinite
 * re-renders by calling setParams on every document input remount.
 */
export function useCaseStudySplitPane() {
  /* no-op */
}
