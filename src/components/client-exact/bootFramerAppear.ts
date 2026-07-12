"use client"

import animatorCode from "./runtime/animator"
import appearRunnerCode from "./runtime/appear-runner.ts"
import appearContent from "./runtime/appear-content.json"
import breakpoints from "./runtime/breakpoints.json"

function injectScript(id: string, code: string, type?: string) {
  if (document.getElementById(id)) return
  const el = document.createElement("script")
  el.id = id
  if (type) el.type = type
  el.textContent = code
  document.body.appendChild(el)
}

/**
 * Boots Framer appear animations exactly as client.html does.
 */
export function bootFramerAppear(): () => void {
  document.documentElement.classList.add("lenis", "lenis-autoToggle")

  injectScript("__cx-framer-animator", animatorCode)
  injectScript("__framer__appearAnimationsContent", JSON.stringify(appearContent), "framer/appear")
  injectScript("__framer__breakpoints", JSON.stringify(breakpoints), "framer/appear")
  injectScript("__cx-framer-appear-runner", appearRunnerCode)

  const shell = document.querySelector(".client-exact-framer-shell")
  const failsafe = window.setTimeout(() => {
    shell?.classList.add("cx-ready")
    document.querySelectorAll<HTMLElement>(".client-exact-framer-shell [style]").forEach((el) => {
      // Hero video scroll-zoom owns this node — never reset it
      if (el.classList.contains("framer-1278xai-container")) return
      if (el.closest?.(".framer-1278xai-container")) return
      const s = el.getAttribute("style") || ""
      if (/opacity:\s*0\.001/i.test(s) || /scale\(\s*0\s*\)/i.test(s)) {
        el.style.opacity = "1"
        if (/scale\(\s*0\s*\)/i.test(s)) el.style.transform = "none"
      }
    })
    document.querySelectorAll<HTMLVideoElement>(".client-exact-framer-shell video").forEach((v) => {
      v.muted = true
      v.playsInline = true
      v.autoplay = true
      v.loop = true
      v.play().catch(() => {})
    })
  }, 1200)

  requestAnimationFrame(() => {
    document.querySelectorAll<HTMLVideoElement>(".client-exact-framer-shell video").forEach((v) => {
      v.muted = true
      v.playsInline = true
      v.autoplay = true
      v.loop = true
      v.play().catch(() => {})
    })
  })

  return () => window.clearTimeout(failsafe)
}
