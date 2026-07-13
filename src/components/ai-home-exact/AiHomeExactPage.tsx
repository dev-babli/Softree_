"use client"

import { useEffect, useRef } from "react"

import { AI_HOME_CSS_HREF, AI_HOME_STYLES } from "../softree-ai-home/referenceContent"
import { bootAiHomeAnimations } from "./aiHomeRuntime"
import { ExploreProductsSection } from "./sections/ExploreProductsSection"
import { HeroSection } from "./sections/HeroSection"
import { IndustriesSection } from "./sections/IndustriesSection"
import { InsightsSection } from "./sections/InsightsSection"
import { ProofSection } from "./sections/ProofSection"
import "./ai-home-exact.css"

/**
 * Real React clone of aihomepage.html on the Softree stack.
 *
 * Sections are hand-authored React components (see ./sections) that preserve the
 * reference class names + animation attributes. The bulk visual styling comes
 * from the Webflow shared stylesheet + the head <style> blocks (AI_HOME_STYLES).
 * The cinematic animations are produced by the reference's own animation engine
 * (see ./aiHomeRuntime) driving this real DOM. No page body is injected via
 * dangerouslySetInnerHTML.
 */
export default function AiHomeExactPage() {
  const bootedRef = useRef(false)

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevBodyClass = body.className
    const prevBodyBg = body.style.background
    const prevBodyColor = body.style.color

    html.classList.add("softree-ai-home-active", "w-mod-js", "wf-active", "lenis")
    // `.ready` is applied by the reference engine (handleLoader / init) — not here.
    body.className = ""
    body.style.background = "#fff"
    body.style.color = "#181818"

    return () => {
      html.classList.remove(
        "softree-ai-home-active",
        "w-mod-js",
        "wf-active",
        "ready",
        "loading",
        "lenis",
      )
      body.className = prevBodyClass
      body.style.background = prevBodyBg
      body.style.color = prevBodyColor
    }
  }, [])

  useEffect(() => {
    // Guard against React StrictMode double-invoke: the engine (Lenis, GSAP
    // ScrollTriggers) must initialize exactly once.
    if (bootedRef.current) return
    bootedRef.current = true
    return bootAiHomeAnimations()
  }, [])

  return (
    <div className="softree-ai-home-shell ai-home-exact-shell">
      {/* Webflow shared stylesheet + head style blocks from the reference export */}
      <link rel="stylesheet" href={AI_HOME_CSS_HREF} />
      {AI_HOME_STYLES.map((css, i) => (
        <style key={i} dangerouslySetInnerHTML={{ __html: css }} />
      ))}

      <div className="page">
        <main className="main-wrapper">
          <HeroSection />
          <IndustriesSection />
          <ExploreProductsSection />
          <ProofSection />
          <InsightsSection />
        </main>
      </div>
    </div>
  )
}
