/** Scroll-driven body theme — mirrors Kore k2Theme() interaction script. */

export function bindK2ThemeSwitch(root: ParentNode = document): () => void {
  const body = document.body
  const useDataTheme = body.hasAttribute("data-theme")
  const themeTriggers = Array.from(root.querySelectorAll<HTMLElement>(".k2-theme-light"))
  if (!themeTriggers.length) return () => {}

  let raf = 0
  let prev: boolean | null = null

  const setTheme = (light: boolean) => {
    if (useDataTheme) {
      body.dataset.theme = light ? "light" : ""
    } else {
      body.classList.toggle("k2-light", light)
    }
  }

  const isLightZone = () => {
    const line = useDataTheme ? window.innerHeight * 0.6 : 0

    return themeTriggers.some((trigger) => {
      const rect = trigger.getBoundingClientRect()
      return rect.top <= line && rect.bottom >= line
    })
  }

  const check = () => {
    raf = 0
    const light = isLightZone()

    if (light !== prev) {
      prev = light
      setTheme(light)
    }
  }

  const onScroll = () => {
    if (!raf) raf = window.requestAnimationFrame(check)
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll)
  check()

  return () => {
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("resize", onScroll)
    if (raf) window.cancelAnimationFrame(raf)
  }
}

export function refreshK2ThemeSwitch(root: ParentNode = document): void {
  const body = document.body
  const useDataTheme = body.hasAttribute("data-theme")
  const themeTriggers = Array.from(root.querySelectorAll<HTMLElement>(".k2-theme-light"))
  if (!themeTriggers.length) return

  const line = useDataTheme ? window.innerHeight * 0.6 : 0
  const light = themeTriggers.some((trigger) => {
    const rect = trigger.getBoundingClientRect()
    return rect.top <= line && rect.bottom >= line
  })

  if (useDataTheme) {
    body.dataset.theme = light ? "light" : ""
  } else {
    body.classList.toggle("k2-light", light)
  }
}
