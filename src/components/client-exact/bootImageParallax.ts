"use client"

/**
 * Scroll effects matching live Hanza Framer hydrate.
 *
 * Measured live curve (Process rows):
 *   ty = max(0, speed * (sectionTop + OFFSET))
 *   OFFSET ≈ 763, speeds ≈ 0.060 / 0.135 / 0.210
 * Same model for Testimonials grids; image wrappers use scale 1.2→1.0.
 */
export function bootImageParallax(_root: ParentNode = document): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduce) return () => {}

  const OFFSET = 763

  const IMAGE_SCALE = [
    /* Card preview only — not badge SVGs (also named "Image") */
    '[data-framer-name="Section Industries"] .cx-industry-card-preview',
    '[data-framer-name="Section Blog"] [data-framer-name="Image"]',
    '[data-framer-name="Section About"] [data-framer-name="Image"]',
    '[data-framer-name="Section Casy Study"] [data-framer-name="Image"]',
    '[data-framer-name="Section Pricing"] [data-framer-name="Image"]',
    ".cx-menu-panel .framer-h6sw14",
  ].join(", ")

  const PROCESS_ROWS: Array<{ sel: string; speed: number }> = [
    { sel: ".framer-vi8nhy", speed: 0.0601 },
    { sel: ".framer-1wzefn9", speed: 0.1352 },
    { sel: ".framer-1fcolx0", speed: 0.2103 },
  ]

  const TESTI_ROWS: Array<{ sel: string; speed: number }> = [
    { sel: ".framer-cf67t", speed: 0.0527 },
    { sel: ".framer-9xwwk9", speed: 0.1185 },
  ]

  const prepared = new WeakSet<HTMLElement>()

  const prepareScale = (el: HTMLElement) => {
    if (prepared.has(el)) return
    prepared.add(el)
    const parent = el.parentElement
    if (parent && getComputedStyle(parent).overflow === "visible") {
      parent.style.overflow = "hidden"
    }
    el.style.willChange = "transform"
    el.style.transformOrigin = "center center"
    el.classList.add("cx-parallax-target")
  }

  const prepareY = (el: HTMLElement) => {
    if (prepared.has(el)) return
    prepared.add(el)
    el.style.willChange = "transform"
    el.classList.add("cx-parallax-y")
  }

  const rowTy = (sectionTop: number, speed: number, vh: number) => {
    // Live Hanza clamps while section is still below the fold (sectionTop > vh)
    const t = Math.min(sectionTop, vh)
    return Math.max(0, speed * (t + OFFSET))
  }

  let raf = 0
  const tick = () => {
    raf = 0
    const vh = window.innerHeight || 1

    document.querySelectorAll<HTMLElement>(IMAGE_SCALE).forEach((el) => {
      prepareScale(el)
      const rect = el.getBoundingClientRect()
      if (rect.bottom < -200 || rect.top > vh + 200) return
      const start = vh
      const end = -rect.height
      const span = start - end || 1
      const p = Math.min(1, Math.max(0, (start - rect.top) / span))
      el.style.transform = `scale(${(1.2 - 0.2 * p).toFixed(4)})`
    })

    document
      .querySelectorAll<HTMLElement>(
        '[data-framer-name="Section Industries"] .cx-industry-scroll-bg',
      )
      .forEach((el) => {
        prepareY(el)
        const wrapper = el.closest('[data-framer-name="Image Wrapper"]')
        if (!wrapper) return
        const rect = wrapper.getBoundingClientRect()
        if (rect.bottom < -200 || rect.top > vh + 200) return
        const progress = Math.min(
          1,
          Math.max(0, (vh - rect.top) / (vh + rect.height * 0.5)),
        )
        const ty = (0.28 - progress) * 160
        const scale = 1.06 + progress * 0.04
        el.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`
      })

    const process = document.querySelector<HTMLElement>(
      '[data-framer-name="Section Process"]',
    )
    if (process) {
      const sectionTop = process.getBoundingClientRect().top
      for (const row of PROCESS_ROWS) {
        process.querySelectorAll<HTMLElement>(row.sel).forEach((el) => {
          prepareY(el)
          el.style.transform = `translateY(${rowTy(sectionTop, row.speed, vh).toFixed(2)}px)`
        })
      }
    }

    const testi = document.querySelector<HTMLElement>(
      '[data-framer-name="Section Testimonials"]',
    )
    if (testi) {
      const sectionTop = testi.getBoundingClientRect().top
      for (const row of TESTI_ROWS) {
        testi.querySelectorAll<HTMLElement>(row.sel).forEach((el) => {
          prepareY(el)
          el.style.transform = `translateY(${rowTy(sectionTop, row.speed, vh).toFixed(2)}px)`
        })
      }
      testi
        .querySelectorAll<HTMLElement>(
          '[style*="inset: -5%"], [style*="inset:-5%"]',
        )
        .forEach((el) => {
          prepareY(el)
          const rect = el.getBoundingClientRect()
          if (rect.bottom < -100 || rect.top > vh + 100) return
          const p = Math.min(
            1,
            Math.max(0, (vh - rect.top) / (vh + rect.height)),
          )
          el.style.transform = `translate3d(0px, ${((0.5 - p) * 8.4).toFixed(2)}px, 0px)`
        })
    }
  }

  const onScroll = () => {
    if (raf) return
    raf = window.requestAnimationFrame(tick)
  }

  tick()
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll)
  const mo = new MutationObserver(onScroll)
  mo.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  })

  return () => {
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("resize", onScroll)
    mo.disconnect()
    if (raf) window.cancelAnimationFrame(raf)
  }
}
