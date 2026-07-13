"use client"

/**
 * Word / letter reveal for Framer text-split spans.
 * Matches live Hanza: words start dim (~0.2) and rise to 1; letters rise from translateY(20px).
 */
export function bootTextReveals(root: ParentNode = document): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const cleanups: Array<() => void> = []

  const isLeafWordSpan = (span: HTMLElement) => {
    if (span.children.length > 0) return false
    const text = (span.textContent || "").trim()
    if (!text) return false
    const display = span.style.display || ""
    return (
      display === "inline" ||
      display.includes("inline") ||
      span.getAttribute("style")?.includes("display: inline") === true ||
      span.getAttribute("style")?.includes("display:inline") === true
    )
  }

  /** About / mission word-opacity paragraphs */
  const wordParagraphs = [
    ...root.querySelectorAll<HTMLElement>(".framer-1lsrsdw p.framer-text"),
    ...root.querySelectorAll<HTMLElement>('[data-styles-preset="Zso10iybM"]'),
  ]

  const prepareWordParagraph = (p: HTMLElement) => {
    const spans = [...p.querySelectorAll<HTMLElement>(":scope > span")].filter(isLeafWordSpan)
    if (!spans.length) {
      // nested: p > span wrappers
      p.querySelectorAll<HTMLElement>("span").forEach((span) => {
        if (isLeafWordSpan(span)) spans.push(span)
      })
    }
    const unique = [...new Set(spans)]
    unique.forEach((span) => {
      if (reduce) {
        span.style.opacity = "1"
        return
      }
      span.style.opacity = "0.2"
      span.style.willChange = "opacity"
      span.style.transition = "opacity 0.55s cubic-bezier(0.44, 0, 0.56, 1)"
    })
    return unique
  }

  const wordTargets = new Map<HTMLElement, HTMLElement[]>()
  wordParagraphs.forEach((p) => {
    wordTargets.set(p, prepareWordParagraph(p))
  })

  /** Letter-split blocks (process / testimonials headlines) */
  const letterWords = [
    ...root.querySelectorAll<HTMLElement>('span[style*="white-space:nowrap"]'),
    ...root.querySelectorAll<HTMLElement>('span[style*="white-space: nowrap"]'),
  ]

  letterWords.forEach((word) => {
    word.querySelectorAll<HTMLElement>(":scope > span").forEach((ch) => {
      if (ch.children.length > 0) return
      if (reduce) {
        ch.style.opacity = "1"
        ch.style.transform = "none"
        return
      }
      ch.style.opacity = "0.001"
      ch.style.transform = "translateY(20px)"
      ch.style.willChange = "transform, opacity"
      ch.style.transition =
        "opacity 0.45s cubic-bezier(0.44, 0, 0.56, 1), transform 0.45s cubic-bezier(0.44, 0, 0.56, 1)"
    })
  })

  /** Generic section titles that use opacity appear stubs */
  const appearBlocks = root.querySelectorAll<HTMLElement>(
    "[data-framer-appear-id]:not(.framer-1278xai-container)",
  )

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement

        const words = wordTargets.get(el)
        if (words) {
          words.forEach((span, i) => {
            window.setTimeout(() => {
              span.style.opacity = "1"
            }, i * 45)
          })
          io.unobserve(el)
          continue
        }

        if (
          el.getAttribute("style")?.includes("nowrap") ||
          getComputedStyle(el).whiteSpace === "nowrap"
        ) {
          const chars = el.querySelectorAll<HTMLElement>(":scope > span")
          chars.forEach((ch, i) => {
            window.setTimeout(() => {
              ch.style.opacity = "1"
              ch.style.transform = "none"
            }, i * 18)
          })
          io.unobserve(el)
          continue
        }

        if (el.hasAttribute("data-framer-appear-id")) {
          el.style.opacity = "1"
          el.style.transform = "none"
          io.unobserve(el)
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  )

  wordTargets.forEach((_, p) => io.observe(p))
  letterWords.forEach((el) => io.observe(el))
  appearBlocks.forEach((el) => {
    if (reduce) {
      el.style.opacity = "1"
      el.style.transform = "none"
      return
    }
    // only observe if still near-hidden
    const op = Number.parseFloat(getComputedStyle(el).opacity)
    if (op < 0.05) io.observe(el)
  })

  cleanups.push(() => io.disconnect())
  return () => cleanups.forEach((fn) => fn())
}
