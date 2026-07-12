"use client"

/**
 * Toggle Framer FAQ / Services accordion variants without Framer hydrate.
 * Swaps framer-v-* classes and open/close chrome (plus rotation, border, content).
 */
export function bootFramerAccordion(root: ParentNode = document): () => void {
  const items = [
    ...root.querySelectorAll<HTMLElement>(
      '.framer-kWrVV[data-highlight="true"], .framer-6rypv[data-highlight="true"]',
    ),
  ]

  const handlers: Array<() => void> = []

  const setOpen = (el: HTMLElement, open: boolean, isFirst: boolean) => {
    const isFaq = el.classList.contains("framer-kWrVV")
    // FAQ open uses SSR class framer-v-1ar9q8m (default layout); close = 1kpnvul
    // Services open = bw6el3; first close = p2ymbf; default close = 1tub5gf
    const openV = isFaq ? "framer-v-1ar9q8m" : "framer-v-bw6el3"
    const closeV = isFaq
      ? "framer-v-1kpnvul"
      : isFirst
        ? "framer-v-p2ymbf"
        : "framer-v-1tub5gf"

    // strip known variant classes
    ;[...el.classList].forEach((c) => {
      if (c.startsWith("framer-v-")) el.classList.remove(c)
    })
    el.classList.add(open ? openV : closeV)
    el.setAttribute(
      "data-framer-name",
      open
        ? isFirst
          ? "First Open (L)"
          : "Default Open (L)"
        : isFirst
          ? "First Close (L)"
          : "Default Close (L)",
    )

    const border = el.querySelector<HTMLElement>('[data-framer-name="Border"]')
    if (border) border.style.opacity = open ? "1" : "0"

    const vector = el.querySelector<HTMLElement>(
      '.framer-14picr9, .framer-1bgm5yy, [data-framer-name="Vector"]',
    )
    if (vector && vector.closest('[data-framer-name="Title"], .framer-rsdlgs, .framer-1saag3o')) {
      vector.style.transform = open
        ? "translateY(-50%)"
        : "translateY(-50%) scale(0)"
    }

    const plus = el.querySelector<HTMLElement>('[data-framer-name="Plus"]')
    if (plus) plus.style.transform = open ? "rotate(225deg)" : "none"

    const content = el.querySelector<HTMLElement>('[data-framer-name="Content"]')
    if (content) {
      content.style.display = open ? "" : "none"
      content.style.opacity = open ? "1" : "0"
      content.style.height = open ? "" : "0"
      content.style.overflow = open ? "visible" : "hidden"
    }
  }

  items.forEach((el, index) => {
    const isFirst = index === 0 || /First/i.test(el.getAttribute("data-framer-name") || "")
    // normalize initial state from name
    const initiallyOpen = /Open/i.test(el.getAttribute("data-framer-name") || "")
    setOpen(el, initiallyOpen, isFirst)

    const onClick = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      const openNow = /Open/i.test(el.getAttribute("data-framer-name") || "")
      const section = el.closest("section")
      if (section) {
        section
          .querySelectorAll<HTMLElement>(
            '.framer-kWrVV[data-highlight="true"], .framer-6rypv[data-highlight="true"]',
          )
          .forEach((sib) => {
            if (sib === el) return
            const first = /First/i.test(sib.getAttribute("data-framer-name") || "")
            setOpen(sib, false, first)
          })
      }
      setOpen(el, !openNow, isFirst)
    }

    el.style.cursor = "pointer"
    el.addEventListener("click", onClick)
    // Also bind header for reliable hit target
    const header = el.querySelector<HTMLElement>('[data-framer-name="Header"]')
    header?.addEventListener("click", onClick)
    handlers.push(() => {
      el.removeEventListener("click", onClick)
      header?.removeEventListener("click", onClick)
    })
  })

  return () => handlers.forEach((fn) => fn())
}
