/** Reveal scroll/stagger content inside .k2-theme-light middle sections. */

const LIGHT_SECTION_IDS = ["ai-agents", "ai-programmable", "pillars"] as const

export function revealLightThemeSections(root: ParentNode = document): void {
  const shell = root instanceof Document ? root.querySelector(".kore-ai-exact-shell") : root.closest(".kore-ai-exact-shell")
  const scope = shell ?? root

  LIGHT_SECTION_IDS.forEach((id) => {
    const section = scope.querySelector<HTMLElement>(`#${id}`)
    if (!section) return

    section.querySelectorAll<HTMLElement>("[data-scroll], [data-stagger]").forEach((el) => {
      el.classList.add("on")
      el.style.removeProperty("opacity")
      el.style.removeProperty("visibility")
      el.style.removeProperty("transform")
    })

    section.querySelectorAll<HTMLElement>(".char, .line").forEach((el) => {
      el.style.removeProperty("opacity")
      el.style.removeProperty("visibility")
      el.style.removeProperty("transform")
    })

    section.querySelectorAll<HTMLElement>(".k2-pillars-row").forEach((el) => {
      el.classList.add("on")
    })

    section.querySelectorAll<HTMLElement>(".k2-tabs-panel-agents.on [data-stagger] > *").forEach((el) => {
      el.style.removeProperty("opacity")
      el.style.removeProperty("visibility")
      el.style.removeProperty("transform")
    })

    if (id === "ai-programmable") {
      const sticky = section.querySelector<HTMLElement>(".k2-orbit-sticky")
      if (sticky && !sticky.dataset.step) sticky.dataset.step = "0"
    }
  })
}

export function revealLightThemeSectionIfVisible(id: string): void {
  const section = document.querySelector<HTMLElement>(`#${id}`)
  if (!section) return
  const rect = section.getBoundingClientRect()
  if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
    revealLightThemeSections(section)
  }
}
