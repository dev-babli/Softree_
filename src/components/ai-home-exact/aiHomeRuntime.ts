import {
  AI_HOME_INTERACTION_SCRIPTS,
  AI_HOME_VENDOR_SCRIPTS,
} from "../softree-ai-home/referenceContent"

/**
 * Exact animation runtime for the AI home clone.
 *
 * Rather than reimplement the reference's cinematic behaviour, we run the
 * reference's own animation engine (the verbatim inline scripts + the same
 * vendor libraries) against our real React-rendered DOM. Because every section
 * component keeps the reference class names and animation attributes
 * (`data-anim`, `data-stagger`, `anim-element`, `anim-stagger`, `anim-scale`,
 * `count-up`, `.btn_dot-line`, `[tabs-component]`, `.swiper`), the engine
 * animates them identically:
 *   - `.ready` reveal of `[data-anim]` / `[data-stagger] > *` (staggered)
 *   - GSAP ScrollTrigger reveals: `[anim-element]`, `[anim-stagger]`, `[anim-scale]`
 *   - `[count-up]` number count-ups
 *   - Lenis smooth scroll + ScrollTrigger proxy
 *   - button dot-line hover timeline, tabs, swiper, accordions
 */

const TRACKING_MARKERS = ["o11.tech", "tracking-api.g2.com", "analytics.o11"]

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-ai-home-src="${src}"]`)) {
      resolve()
      return
    }
    const el = document.createElement("script")
    el.src = src
    el.async = false
    el.dataset.aiHomeSrc = src
    el.onload = () => resolve()
    el.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.body.appendChild(el)
  })
}

function runInlineScript(code: string) {
  if (TRACKING_MARKERS.some((m) => code.includes(m))) return
  const el = document.createElement("script")
  el.textContent = code
  el.dataset.aiHomeInline = "1"
  document.body.appendChild(el)
}

/**
 * Skip reference scripts whose target section isn't rendered yet. As sections
 * are added, these guards stop matching and the scripts run automatically.
 * Prevents console errors from `querySelector(...).something` on absent nodes.
 */
function shouldSkipScript(code: string): boolean {
  if (code.includes(".top-strip-bar") && !document.querySelector(".top-strip-bar")) return true
  if (code.includes("#explore-products") && !document.querySelector("#explore-products")) return true
  return false
}

export function bootAiHomeAnimations(): () => void {
  let disposed = false

  // Failsafe: if the engine never adds `.ready` (blocked CDN / error), force
  // the content visible so it can't get stuck hidden behind `opacity: 0`.
  const failsafe = window.setTimeout(() => {
    const root = document.documentElement
    if (!root.classList.contains("ready")) {
      root.classList.remove("loading")
      root.classList.add("ready")
    }
  }, 5000)

  async function boot() {
    try {
      if (new URLSearchParams(window.location.search).has("replay-loader")) {
        localStorage.removeItem("loaderDate")
      }

      for (const src of AI_HOME_VENDOR_SCRIPTS) {
        if (disposed) return
        await loadScript(src)
      }

      const win = window as Window & {
        gsap?: { registerPlugin: (p: unknown) => void }
        ScrollTrigger?: unknown
      }
      if (win.gsap && win.ScrollTrigger) {
        win.gsap.registerPlugin(win.ScrollTrigger)
      }

      for (const code of AI_HOME_INTERACTION_SCRIPTS) {
        if (code.trim() === "gsap.registerPlugin(ScrollTrigger);") continue
        if (shouldSkipScript(code)) continue
        runInlineScript(code)
      }

      // The reference scripts register init inside DOMContentLoaded / load
      // handlers; we inject after those native events fired, so replay them.
      document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true, cancelable: false }))
      window.dispatchEvent(new Event("load"))

      const winSt = window as Window & { ScrollTrigger?: { refresh: (hard?: boolean) => void } }
      window.setTimeout(() => winSt.ScrollTrigger?.refresh?.(true), 1200)
    } catch (err) {
      console.error("[ai-home-exact] animation boot failed", err)
      document.documentElement.classList.remove("loading")
      document.documentElement.classList.add("ready")
    }
  }

  boot()

  return () => {
    disposed = true
    window.clearTimeout(failsafe)
  }
}
