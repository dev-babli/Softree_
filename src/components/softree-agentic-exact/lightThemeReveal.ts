/** Light-theme helpers — do not short-circuit scroll reveal (.on) on [data-scroll]. */

const LIGHT_SECTION_IDS = ["ai-programmable", "pillars"] as const

export function initLightThemeSection(root: ParentNode): void {
  const scope = root instanceof Document ? root.querySelector(".softree-agentic-shell") : root.closest(".softree-agentic-shell")
  if (!scope) return

  LIGHT_SECTION_IDS.forEach((id) => {
    const section = scope.querySelector<HTMLElement>(`#${id}`)
    if (!section) return

    if (id === "ai-programmable") {
      const sticky = section.querySelector<HTMLElement>(".k2-orbit-sticky")
      if (sticky && !sticky.dataset.step) sticky.dataset.step = "0"
    }
  })
}
