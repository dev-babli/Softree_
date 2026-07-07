/** Keep in sync with softree-agentic-page-fix.css + handoff-loop-verify.mjs */
export const HERO_FLIP_TARGET = '#meet-artemis [data-flip-target="loader"]'

/** Stagger groups — animate containers to preserve internal spacing */
export const HERO_REST_SELECTORS = [
  "#meet-artemis .k2-container-hero > .k2-hero > .k2-text",
  "#meet-artemis .k2-container-hero [data-stagger='300']",
  "#meet-artemis .k2-container-hero-2 .k2-hero-2",
  "#meet-artemis .k2-tabs",
].join(",")

export const HERO_COPY_SELECTORS = [
  HERO_FLIP_TARGET,
  "#meet-artemis .k2-container-hero > .k2-hero > .k2-text",
  "#meet-artemis .k2-container-hero [data-stagger='300'] > *",
  "#meet-artemis .k2-container-hero-2 .k2-text",
  "#meet-artemis .k2-container-hero-2 .k2-cta",
  "#meet-artemis .k2-tabs",
  "#meet-artemis .k2-tabs .k2-tabs-menu",
].join(",")

export function syncHeroFlipMetrics(fromLoader?: HTMLElement | null): void {
  const flip = document.querySelector<HTMLElement>(HERO_FLIP_TARGET)
  const heroSup = flip?.querySelector<HTMLElement>("sup")
  if (!heroSup) return

  const loaderSup = fromLoader?.querySelector<HTMLElement>("sup")
  const loaderW = loaderSup?.style.getPropertyValue("--w")
  if (loaderW) {
    heroSup.style.setProperty("--w", loaderW)
    return
  }

  const target = (heroSup.firstElementChild as HTMLElement | null) || heroSup
  const width = Math.ceil(target.getBoundingClientRect().width)
  if (width > 0) heroSup.style.setProperty("--w", `${width}px`)
}

const HERO_REVEAL_SELECTORS = [
  ".k2-container-hero > .k2-hero > .k2-text",
  '[data-flip-target="loader"]',
  '[data-stagger="300"]',
  '[data-stagger="300"] > *',
  ".k2-container-hero-2 .k2-hero-2",
  ".k2-container-hero-2 .k2-text",
  ".k2-container-hero-2 .k2-cta",
  ".k2-tabs",
  ".k2-tabs .k2-tabs-menu",
].join(",")

export function revealHeroContent(): void {
  const hero = document.querySelector<HTMLElement>("#meet-artemis")
  if (!hero) return

  hero.classList.add("on", "k2-hero-handoff-settled")

  hero.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
    el.classList.add("on")
  })

  hero.querySelectorAll<HTMLElement>(HERO_REVEAL_SELECTORS).forEach((el) => {
    el.style.removeProperty("opacity")
    el.style.removeProperty("visibility")
    el.style.removeProperty("transform")
  })

  hero.querySelectorAll<HTMLElement>(".char").forEach((el) => {
    el.style.removeProperty("opacity")
    el.style.removeProperty("visibility")
    el.style.removeProperty("transform")
  })

  hero.querySelectorAll<HTMLElement>(".k2-bg, .k2-bg .k2-img, .k2-overlay, [data-unscale]").forEach((el) => {
    el.style.removeProperty("opacity")
    el.style.removeProperty("visibility")
    el.style.removeProperty("transform")
  })

  const flip = hero.querySelector<HTMLElement>('[data-flip-target="loader"]')
  flip?.style.removeProperty("visibility")
  flip?.querySelector<HTMLElement>("em")?.style.removeProperty("transform")
  flip?.querySelector<HTMLElement>("em")?.style.removeProperty("opacity")
}

export function clearHandoffInlineStyles(): void {
  const hero = document.querySelector<HTMLElement>("#meet-artemis")
  if (!hero) return

  document.querySelectorAll<HTMLElement>(HERO_COPY_SELECTORS).forEach((el) => {
    el.style.removeProperty("opacity")
    el.style.removeProperty("transform")
    el.style.removeProperty("visibility")
  })

  const flip = hero.querySelector<HTMLElement>('[data-flip-target="loader"]')
  flip?.querySelector<HTMLElement>("em")?.style.removeProperty("transform")
  flip?.querySelector<HTMLElement>("em")?.style.removeProperty("opacity")
}

export function finalizeHeroReveal(fromLoader?: HTMLElement | null): void {
  const shell = document.querySelector(".softree-agentic-shell")
  const hero = document.querySelector<HTMLElement>("#meet-artemis")
  if (!shell || !hero) return

  document.documentElement.classList.remove("softree-agentic-k2-handoff-running")
  shell.classList.add("softree-agentic-intro-complete")
  revealHeroContent()
  clearHandoffInlineStyles()
  syncHeroFlipMetrics(fromLoader)
}
