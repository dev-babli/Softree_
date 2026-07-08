/** Kore scroll-reveal — SplitType, IntersectionObserver thresholds, stagger delays. */

type SplitInstance = {
  split: () => void
  chars?: HTMLElement[]
}

type SplitTypeCtor = new (
  target: Element,
  options: { types: string; tagName: string },
) => SplitInstance

declare global {
  interface Window {
    SplitType?: SplitTypeCtor
  }
}

const HERO_SELECTOR = "#meet-artemis"

function prefersReducedMotion(): boolean {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
}

function setSplitIndex(splitInstance: SplitInstance, byParent: boolean): void {
  if (!splitInstance.chars?.length) return

  let parent: Element | null = null
  let parentIndex = 0

  splitInstance.chars.forEach((char, index) => {
    if (byParent) {
      if (char.parentElement !== parent) {
        parent = char.parentElement
        parentIndex = 0
      }
      char.style.setProperty("--i", String(parentIndex))
      parentIndex += 1
    } else {
      char.style.setProperty("--i", String(index))
    }
  })
}

function setSplitCount(el: HTMLElement): void {
  el.style.setProperty("--n", String(el.querySelectorAll(".char").length))
}

export function initK2Split(root: ParentNode = document): void {
  const SplitType = window.SplitType
  if (typeof SplitType !== "function") return

  const els = Array.from(root.querySelectorAll<HTMLElement>("[data-split]")).filter(
    (el) => !el.closest(HERO_SELECTOR),
  )
  if (!els.length) return

  for (const el of els) {
    if (el.dataset.k2SplitInit === "true") continue

    const splitType = (el.dataset.split || "lines").trim() || "lines"
    const hasChars = /char/i.test(splitType)
    const targets = el.classList.contains("w-richtext") ? Array.from(el.children) : [el]

    for (const target of targets) {
      if (!(target instanceof HTMLElement) || !target.textContent?.trim()) continue

      if (target.querySelector(".line") && !/char|word/i.test(splitType)) {
        continue
      }

      const byParent = [...el.attributes, ...target.attributes].some((attr) =>
        attr.name.startsWith("data-flip"),
      )

      const splitInstance = new SplitType(target, {
        types: splitType,
        tagName: "span",
      })

      setSplitIndex(splitInstance, byParent)

      if (hasChars && !byParent) {
        setSplitCount(el)
      }

      if (!/line/i.test(splitType)) continue

      let width = target.clientWidth
      let scheduled = false

      new ResizeObserver(([entry]) => {
        const nextWidth = entry.contentRect.width
        if (nextWidth === width) return
        width = nextWidth
        if (scheduled) return
        scheduled = true
        requestAnimationFrame(() => {
          splitInstance.split()
          setSplitIndex(splitInstance, byParent)
          if (hasChars && !byParent) setSplitCount(el)
          scheduled = false
        })
      }).observe(target)
    }

    el.dataset.k2SplitInit = "true"
  }
}

export function applyK2Stagger(root: ParentNode = document): void {
  const list = Array.from(root.querySelectorAll<HTMLElement>("[data-stagger]")).filter(
    (el) => !el.closest(HERO_SELECTOR),
  )

  for (const el of list) {
    let stagger = el.dataset.stagger || "100"
    if (stagger.startsWith("/")) stagger = `100${stagger}`

    const [intervalRaw, baseRaw = "0"] = stagger.split("/")
    const interval = Number(intervalRaw)
    const base = Number(baseRaw)

    const kids = el.classList.contains("w-richtext")
      ? Array.from(el.children).flatMap((child) => Array.from(child.children))
      : Array.from(el.children)

    kids.forEach((kid, index) => {
      if (!(kid instanceof HTMLElement)) return
      const delay = base + index * interval
      if (delay > 0) {
        kid.style.transitionDelay = `${delay}ms`
        kid.style.animationDelay = `${delay}ms`
      }
    })
  }
}

type ScrollItem = {
  minRatio: number
  target: HTMLElement
  repeat: boolean
}

export function bindK2Scroll(root: ParentNode = document): () => void {
  const items = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll]")).filter(
    (el) => !el.closest(HERO_SELECTOR),
  )

  if (!items.length) return () => {}

  if (prefersReducedMotion()) {
    items.forEach((el) => {
      const selector = el.getAttribute("data-scroll-target")
      let target = el
      if (selector) {
        try {
          target = root.querySelector<HTMLElement>(selector) ?? el
        } catch {
          target = el
        }
      }
      target.classList.add("on")
    })
    return () => {}
  }

  const data = new Map<HTMLElement, ScrollItem>()
  const thresholds = new Set<number>([0, 1])

  for (const el of items) {
    const value = Number.parseFloat(el.getAttribute("data-scroll") ?? "")
    const offset = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 1
    const minRatio = Math.min(offset / 100, 0.999)
    const selector = el.getAttribute("data-scroll-target")
    let target = el

    if (selector) {
      try {
        target = root.querySelector<HTMLElement>(selector) ?? el
      } catch {
        target = el
      }
    }

    data.set(el, { minRatio, target, repeat: el.hasAttribute("data-scroll-repeat") })
    thresholds.add(minRatio)
  }

  const revealIfNeeded = () => {
    for (const el of items) {
      const item = data.get(el)
      if (!item || item.target.classList.contains("on")) continue

      const rect = el.getBoundingClientRect()
      const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0))
      const ratio = rect.height > 0 ? visible / rect.height : 0

      if (ratio >= item.minRatio) {
        item.target.classList.add("on")
        if (!item.repeat) observer.unobserve(el)
      }
    }
  }

  let scrollFrame = 0
  const onScrollCheck = () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0
      revealIfNeeded()
    })
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const item = data.get(entry.target as HTMLElement)
        if (!item) continue

        const isVisible = entry.isIntersecting && entry.intersectionRatio >= item.minRatio

        if (isVisible) {
          item.target.classList.add("on")
          if (!item.repeat) observer.unobserve(entry.target)
        } else if (item.repeat) {
          item.target.classList.remove("on")
        }
      }
    },
    { threshold: [...thresholds].sort((a, b) => a - b) },
  )

  items.forEach((el) => observer.observe(el))
  revealIfNeeded()
  window.addEventListener("scroll", onScrollCheck, { passive: true })
  window.addEventListener("resize", onScrollCheck, { passive: true })

  return () => {
    observer.disconnect()
    window.removeEventListener("scroll", onScrollCheck)
    window.removeEventListener("resize", onScrollCheck)
    if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
  }
}

export function refreshK2ScrollVisibility(root: ParentNode = document): void {
  const items = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll]")).filter(
    (el) => !el.closest(HERO_SELECTOR),
  )

  for (const el of items) {
    const value = Number.parseFloat(el.getAttribute("data-scroll") ?? "")
    const offset = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 1
    const minRatio = Math.min(offset / 100, 0.999)
    const selector = el.getAttribute("data-scroll-target")
    let target = el

    if (selector) {
      try {
        target = root.querySelector<HTMLElement>(selector) ?? el
      } catch {
        target = el
      }
    }

    if (target.classList.contains("on")) continue

    const rect = el.getBoundingClientRect()
    const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0))
    const ratio = rect.height > 0 ? visible / rect.height : 0

    if (ratio >= minRatio) {
      target.classList.add("on")
    }
  }
}

export function initK2SplitAndStagger(root: ParentNode = document): void {
  const run = () => {
    initK2Split(root)
    applyK2Stagger(root)
  }

  if (document.fonts?.ready) {
    void document.fonts.ready.then(run)
  } else {
    run()
  }
}

export function initSoftreeAgenticScrollReveal(root: ParentNode = document): () => void {
  initK2SplitAndStagger(root)
  return bindK2Scroll(root)
}
