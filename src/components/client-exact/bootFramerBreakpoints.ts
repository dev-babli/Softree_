"use client"

import breakpoints from "./runtime/breakpoints.json"

const PAGE_BREAKPOINTS = (breakpoints as { hash: string; mediaQuery: string }[]).filter(
  (bp) => ["72rtr7", "zo2ufi", "1g6n99x", "1vb5nd8"].includes(bp.hash),
)

/**
 * Framer SSR ships one breakpoint class on the root (usually XL).
 * Without Framer hydrate, we must swap the active hash ourselves via matchMedia.
 */
export function bootFramerBreakpoints(root: Element | null): () => void {
  if (!root || typeof window === "undefined") return () => {}

  const hashes = PAGE_BREAKPOINTS.map((bp) => bp.hash)

  const apply = () => {
    let active = PAGE_BREAKPOINTS[0]?.hash ?? "72rtr7"
    for (const bp of PAGE_BREAKPOINTS) {
      if (window.matchMedia(bp.mediaQuery).matches) {
        active = bp.hash
        break
      }
    }
    for (const hash of hashes) {
      root.classList.toggle(`framer-${hash}`, hash === active)
    }
  }

  apply()
  const mqls = PAGE_BREAKPOINTS.map((bp) => window.matchMedia(bp.mediaQuery))
  mqls.forEach((mql) => mql.addEventListener("change", apply))
  return () => mqls.forEach((mql) => mql.removeEventListener("change", apply))
}
