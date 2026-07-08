"use client"

import Script from "next/script"
import { useEffect } from "react"
import { SoftreeAgenticLoader } from "./SoftreeAgenticLoader"
import { revealHeroContent } from "./heroHandoffSelectors"
import { bindK2ThemeSwitch, refreshK2ThemeSwitch } from "./k2ThemeSwitch"
import { initSoftreeAgenticScrollReveal, refreshK2ScrollVisibility } from "./k2ScrollReveal"
import { initLightThemeSection } from "./lightThemeReveal"
import { SOFTREE_AGENTIC_REFERENCE_CSS } from "./referenceContent"
import { SoftreeAgenticFooter, SoftreeAgenticHeader, SoftreeAgenticReferenceModals, SoftreeAgenticScrollNav, SOFTREE_AGENTIC_SECTION_COMPONENTS } from "./sections"
import "./softree-agentic-page-fix.css"
import "./softree-body-theme.css"
import "./softree-hero-handoff.css"
import "./softree-light-theme-fix.css"

const externalScripts = [
  "https://unpkg.com/split-type",
  "https://cdn.jsdelivr.net/npm/@rive-app/canvas@2.21.6/rive.js",
  "https://cdn.prod.website-files.com/gsap/3.15.0/gsap.min.js",
  "https://cdn.prod.website-files.com/gsap/3.15.0/ScrollTrigger.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollToPlugin.min.js",
  "https://player.vimeo.com/api/player.js",
]

export default function SoftreeAgenticPage() {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const previousBodyClass = body.className
    const previousTheme = body.getAttribute("data-theme")

    body.className = "k2-body"
    body.style.color = ""
    body.setAttribute("data-theme", "")
    html.classList.add("w-mod-js", "wf-active", "ready", "lenis")

    return () => {
      body.className = previousBodyClass
      body.style.color = ""
      if (previousTheme === null) body.removeAttribute("data-theme")
      else body.setAttribute("data-theme", previousTheme)
      html.classList.remove("w-mod-js", "wf-active", "ready", "loading", "lenis")
    }
  }, [])

  useEffect(() => {
    const applyCurrentRoute = () => {
      const currentLinks = document.querySelectorAll<HTMLAnchorElement>(
        ".k2-header a[href='/agentic-ai-platform'], .k2-footer a[href='/agentic-ai-platform'], .k2-header a[href='/ai-agent-platform'], .k2-footer a[href='/ai-agent-platform']",
      )

      currentLinks.forEach((link) => {
        link.classList.add("w--current")
        link.setAttribute("aria-current", "page")
      })
    }

    applyCurrentRoute()
    const timer = window.setTimeout(applyCurrentRoute, 1500)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const page = document.querySelector(".softree-agentic-shell")
    const modal = page?.querySelector<HTMLDialogElement>(".k2-modal")
    if (!page || !modal) return

    const openPanel = (id: string | null) => {
      if (!id) return

      const panels = Array.from(modal.querySelectorAll<HTMLElement>("[data-modal-panel]"))
      let activePanel: HTMLElement | undefined

      panels.forEach((panel) => {
        const active = panel.dataset.modalPanel === id
        panel.hidden = !active
        panel.classList.toggle("on", active)
        if (active) {
          activePanel = panel
          panel.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
            el.classList.add("on")
            el.style.removeProperty("opacity")
            el.style.removeProperty("transform")
            el.style.removeProperty("visibility")
          })
        } else {
          panel.classList.remove("on")
        }
      })

      modal.scrollTop = 0
      if (activePanel) activePanel.scrollTop = 0
      if (!modal.open) modal.showModal()
    }

    const closeModal = () => {
      if (modal.open) modal.close()
    }

    const onClick = (event: Event) => {
      const target = event.target as HTMLElement | null
      const openButton = target?.closest<HTMLElement>("[data-modal-open]")
      if (openButton) {
        event.preventDefault()
        openPanel(openButton.dataset.modalOpen ?? null)
        return
      }

      const closeButton = target?.closest<HTMLElement>("[data-modal-close]")
      if (closeButton || event.target === modal) {
        event.preventDefault()
        closeModal()
      }
    }

    page.addEventListener("click", onClick)
    return () => page.removeEventListener("click", onClick)
  }, [])

  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".k2-scroll-nav")
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".k2-main .k2-section[id]"))
    if (!nav || !sections.length) return

    const existing = nav.querySelector("ol")
    if (!existing) {
      const list = document.createElement("ol")
      sections.forEach((section) => {
        const item = document.createElement("li")
        const link = document.createElement("a")
        link.href = `#${section.id}`
        link.setAttribute("aria-label", section.id.replaceAll("-", " "))
        item.append(link)
        list.append(item)
      })
      nav.append(list)
    }

    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[href^='#']"))
    let frame = 0

    const setCurrent = () => {
      frame = 0
      const viewportLine = window.innerHeight * 0.45
      let activeId = sections[0].id
      let closestDistance = Number.POSITIVE_INFINITY

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= viewportLine && rect.bottom >= viewportLine) {
          activeId = section.id
          closestDistance = 0
          return
        }

        const distance = Math.min(Math.abs(rect.top - viewportLine), Math.abs(rect.bottom - viewportLine))
        if (distance < closestDistance) {
          closestDistance = distance
          activeId = section.id
        }
      })

      links.forEach((link) => {
        const active = link.hash === `#${activeId}`
        link.classList.toggle("w--current", active)
        if (active) link.setAttribute("aria-current", "true")
        else link.removeAttribute("aria-current")
      })
    }

    const requestCurrent = () => {
      if (!frame) frame = window.requestAnimationFrame(setCurrent)
    }

    setCurrent()
    window.addEventListener("scroll", requestCurrent, { passive: true })
    window.addEventListener("resize", requestCurrent, { passive: true })

    return () => {
      window.removeEventListener("scroll", requestCurrent)
      window.removeEventListener("resize", requestCurrent)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".softree-agentic-shell")
    if (!page) return

    const unbindTheme = bindK2ThemeSwitch(page)
    let unbindScroll = () => {}

    const mountScrollReveal = () => {
      unbindScroll()
      unbindScroll = initSoftreeAgenticScrollReveal(page)
      refreshK2ScrollVisibility(page)
    }

    mountScrollReveal()
    const mountTimer = window.setTimeout(mountScrollReveal, 400)
    initLightThemeSection(page)

    const onIntroComplete = () => {
      revealHeroContent()
      refreshK2ThemeSwitch(page)
      mountScrollReveal()
      initLightThemeSection(page)
      const win = window as Window & { ScrollTrigger?: { refresh: () => void } }
      win.ScrollTrigger?.refresh()
    }

    const onScrollReveal = () => refreshK2ScrollVisibility(page)

    window.addEventListener("softree-agentic-intro-complete", onIntroComplete)
    window.addEventListener("scroll", onScrollReveal, { passive: true })
    window.addEventListener("resize", onScrollReveal, { passive: true })

    return () => {
      window.clearTimeout(mountTimer)
      unbindTheme()
      unbindScroll()
      window.removeEventListener("softree-agentic-intro-complete", onIntroComplete)
      window.removeEventListener("scroll", onScrollReveal)
      window.removeEventListener("resize", onScrollReveal)
    }
  }, [])

  return (
    <div className="softree-agentic-shell" data-barba="wrapper">
      <style dangerouslySetInnerHTML={{ __html: SOFTREE_AGENTIC_REFERENCE_CSS }} />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "html, body, .softree-agentic-shell { overflow-x: clip !important; } .softree-agentic-shell { width: 100%; }",
        }}
      />
      {externalScripts.map((src) => (
        <Script key={src} src={src} strategy="afterInteractive" />
      ))}
      <div className="k2-page" data-barba="container" data-barba-namespace="softree-agentic-exact">
        <SoftreeAgenticLoader />
        <SoftreeAgenticHeader />
        <SoftreeAgenticScrollNav />
        <main id="main" className="k2-main">
          {SOFTREE_AGENTIC_SECTION_COMPONENTS.map((Section, index) => (
            <Section key={index} />
          ))}
        </main>
        <SoftreeAgenticFooter />
        <SoftreeAgenticReferenceModals />
      </div>
    </div>
  )
}
