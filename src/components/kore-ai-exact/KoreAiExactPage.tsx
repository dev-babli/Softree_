"use client"

import Script from "next/script"
import { useEffect } from "react"
import { KoreK2Loader } from "./KoreK2Loader"
import { revealHeroContent } from "./heroHandoffSelectors"
import { revealLightThemeSections } from "./lightThemeReveal"
import { KORE_AI_REFERENCE_CSS } from "./referenceContent"
import { KoreAiFooter, KoreAiHeader, KoreAiReferenceModals, KoreAiScrollNav, KORE_AI_SECTION_COMPONENTS } from "./sections"
import "./kore-ai-page-fix.css"
import "./kore-hero-handoff.css"
import "./kore-light-theme-fix.css"

const externalScripts = [
  "https://cdn.jsdelivr.net/npm/@rive-app/canvas@2.21.6/rive.js",
  "https://cdn.prod.website-files.com/gsap/3.15.0/gsap.min.js",
  "https://cdn.prod.website-files.com/gsap/3.15.0/ScrollTrigger.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollToPlugin.min.js",
  "https://player.vimeo.com/api/player.js",
]

export default function KoreAiExactPage() {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const previousBodyClass = body.className
    const previousTheme = body.getAttribute("data-theme")

    body.className = "k2-body"
    body.style.backgroundColor = "#000"
    body.style.color = ""
    body.setAttribute("data-theme", "")
    html.classList.add("w-mod-js", "wf-active", "ready", "lenis")

    return () => {
      body.className = previousBodyClass
      body.style.backgroundColor = ""
      body.style.color = ""
      if (previousTheme === null) body.removeAttribute("data-theme")
      else body.setAttribute("data-theme", previousTheme)
      html.classList.remove("w-mod-js", "wf-active", "ready", "loading", "lenis")
    }
  }, [])

  useEffect(() => {
    const applyCurrentRoute = () => {
      const currentLinks = document.querySelectorAll<HTMLAnchorElement>(
        ".k2-header a[href='/ai-agent-platform'], .k2-footer a[href='/ai-agent-platform']",
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
    const page = document.querySelector(".kore-ai-exact-shell")
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
    const page = document.querySelector<HTMLElement>(".kore-ai-exact-shell")
    if (!page) return

    let observer: IntersectionObserver | undefined

    const collectTargets = () =>
      Array.from(page.querySelectorAll<HTMLElement>("[data-scroll], [data-stagger]")).filter(
        (el) => !el.closest("#meet-artemis"),
      )

    const reveal = (element: HTMLElement) => {
      element.classList.add("on")
      element.style.removeProperty("opacity")
      element.style.removeProperty("visibility")
      element.style.removeProperty("transform")
    }

    const revealIfVisible = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) reveal(element)
    }

    const bindReveal = () => {
      revealHeroContent()
      revealLightThemeSections(page)
      observer?.disconnect()
      const targets = collectTargets()
      if (!targets.length) return

      targets.forEach(revealIfVisible)

      if (!("IntersectionObserver" in window)) {
        targets.forEach(reveal)
        return
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            reveal(entry.target as HTMLElement)
            observer?.unobserve(entry.target)
          })
        },
        { rootMargin: "0px 0px -5% 0px", threshold: 0.05 },
      )

      targets.forEach((target) => {
        if (!target.classList.contains("on")) observer?.observe(target)
      })
    }

    bindReveal()
    window.addEventListener("kore-ai-intro-complete", bindReveal)
    window.addEventListener("scroll", bindReveal, { passive: true })

    return () => {
      observer?.disconnect()
      window.removeEventListener("kore-ai-intro-complete", bindReveal)
      window.removeEventListener("scroll", bindReveal)
    }
  }, [])

  return (
    <div className="kore-ai-exact-shell" data-barba="wrapper">
      <style dangerouslySetInnerHTML={{ __html: KORE_AI_REFERENCE_CSS }} />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "html, body, .kore-ai-exact-shell { overflow-x: clip !important; } .kore-ai-exact-shell { width: 100%; }",
        }}
      />
      {externalScripts.map((src) => (
        <Script key={src} src={src} strategy="afterInteractive" />
      ))}
      <div className="k2-page" data-barba="container" data-barba-namespace="kore-ai-exact">
        <KoreK2Loader />
        <KoreAiHeader />
        <KoreAiScrollNav />
        <main id="main" className="k2-main">
          {KORE_AI_SECTION_COMPONENTS.map((Section, index) => (
            <Section key={index} />
          ))}
        </main>
        <KoreAiFooter />
        <KoreAiReferenceModals />
      </div>
    </div>
  )
}
