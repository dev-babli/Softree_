"use client"

import { useEffect, useRef, useState } from "react"
import {
  AI_HOME_BODY_HTML,
  AI_HOME_CSS_HREF,
  AI_HOME_INTERACTION_SCRIPTS,
  AI_HOME_STYLES,
  AI_HOME_VENDOR_SCRIPTS,
} from "./referenceContent"
import { AI_HOME_LOADER_HTML } from "./loaderContent"
import "./ai-home-loader.css"
import "./ai-home-page-fix.css"

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
  document.body.appendChild(el)
}

/**
 * Some reference interaction scripts assume DOM nodes that the Softree clone
 * doesn't include. e.g. the top-strip slider does `strips[0].classList.add(...)`
 * with no empty-guard, so it throws when `.top-strip-bar` is absent. Skip those.
 */
function shouldSkipScript(code: string): boolean {
  if (code.includes(".top-strip-bar") && !document.querySelector(".top-strip-bar")) {
    return true
  }
  return false
}

export default function AiHomePage() {
  const shellRef = useRef<HTMLDivElement>(null)
  const scriptsMounted = useRef(false)
  // The 690KB Webflow HTML export contains nesting the browser normalizes
  // differently than React expects, causing unavoidable hydration mismatches.
  // This is a client-only page (needs jQuery/Webflow/GSAP/Lenis), so SSR-ing
  // the blob adds no value. Render it only after mount to skip hydration.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevBodyClass = body.className
    const prevBodyBg = body.style.background
    const prevBodyColor = body.style.color

    html.classList.add("softree-ai-home-active", "w-mod-js", "wf-active", "lenis")
    // `ready` is applied by handleLoader() in the reference interaction script — not here.
    body.className = ""
    body.style.background = "#fff"
    body.style.color = "#181818"

    // Webflow shared stylesheet
    let link = document.querySelector<HTMLLinkElement>('link[data-ai-home-css="1"]')
    if (!link) {
      link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = AI_HOME_CSS_HREF
      link.dataset.aiHomeCss = "1"
      document.head.appendChild(link)
    }

    return () => {
      html.classList.remove("softree-ai-home-active", "w-mod-js", "wf-active", "ready", "loading", "lenis")
      body.className = prevBodyClass
      body.style.background = prevBodyBg
      body.style.color = prevBodyColor
      link?.remove()
    }
  }, [])

  useEffect(() => {
    // Wait until the HTML blob is rendered into the DOM (client-only), then boot.
    if (!mounted) return
    // Guard against React StrictMode double-invoke. We must NOT abort an
    // in-flight boot on cleanup: the reference loader/Lenis only initialize
    // once, and aborting mid-run leaves the white loader overlay stuck on
    // screen (blank page). Scripts append to document.body and persist, so a
    // single completed run is correct.
    if (scriptsMounted.current) return
    scriptsMounted.current = true

    // Failsafe: if handleLoader() never completes (script error, blocked CDN),
    // force-reveal the page so it can never get stuck behind the loader.
    const failsafe = window.setTimeout(() => {
      const root = document.documentElement
      if (!root.classList.contains("ready")) {
        root.classList.remove("loading")
        root.classList.add("ready")
        document.querySelector(".loader")?.remove()
      }
    }, 6000)

    async function boot() {
      try {
        if (new URLSearchParams(window.location.search).has("replay-loader")) {
          localStorage.removeItem("loaderDate")
        }

        for (const src of AI_HOME_VENDOR_SCRIPTS) {
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

        // The reference scripts register their initialization (Lenis, loader,
        // top-strip, tabs, etc.) inside `DOMContentLoaded` / `load` handlers.
        // We inject them client-side *after* those native events already fired,
        // so we replay the events to trigger initialization. Without this,
        // `lenis` stays undefined (breaking click handlers that call
        // `lenis.start()`) and the loader never runs.
        document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true, cancelable: false }))
        window.dispatchEvent(new Event("load"))

        const winSt = window as Window & { ScrollTrigger?: { refresh: (hard?: boolean) => void } }
        window.setTimeout(() => winSt.ScrollTrigger?.refresh?.(true), 1200)
      } catch (err) {
        console.error("[AiHomePage] script boot failed", err)
        document.documentElement.classList.remove("loading")
        document.documentElement.classList.add("ready")
        document.querySelector(".loader")?.remove()
      }
    }

    boot()

    return () => {
      window.clearTimeout(failsafe)
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const shell = shellRef.current
    if (!shell) return

    // Internal links: highlight AI home when on this route
    shell.querySelectorAll<HTMLAnchorElement>('a[href="/ai-home"]').forEach((link) => {
      link.classList.add("w--current")
      link.setAttribute("aria-current", "page")
    })
  }, [mounted])

  return (
    <div ref={shellRef} className="softree-ai-home-shell">
      {AI_HOME_STYLES.map((css, i) => (
        <style key={i} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      {/* Client-only: the Webflow export is injected after mount to avoid
          hydration mismatches from browser HTML normalization. */}
      {mounted && (
        <div
          dangerouslySetInnerHTML={{ __html: (AI_HOME_LOADER_HTML + AI_HOME_BODY_HTML).trim() }}
        />
      )}
    </div>
  )
}
