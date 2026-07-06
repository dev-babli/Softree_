'use client'

/**
 * This hook is intentionally a no-op — the old boot logic caused infinite
 * re-renders by calling setParams on every document input remount.
 * Note: `.defaultPanes()` in structure.ts was also removed after it caused
 * a "Too many re-renders" crash on production; preview opens via its tab.
 */
export function useCaseStudySplitPane() {
  /* no-op */
}
