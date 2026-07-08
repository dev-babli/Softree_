"use client"

import { useEffect, useMemo, useRef } from "react"
import { applySoftreeSectionHtml } from "./softreeAgenticHtmlCopy"
import { SOFTREE_AGENTIC_SECTIONS } from "./referenceContent"
import "./softree-scroll-tabs-fix.css"

type ScrollTriggerInstance = {
  start: number
  end: number
  scroll: (position: number) => void
  kill: () => void
}

type GsapWindow = Window & {
  gsap?: {
    registerPlugin?: (plugin: unknown) => void
    killTweensOf: (target: unknown) => void
    to: (target: unknown, vars: Record<string, unknown>) => void
    fromTo: (target: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>) => void
  }
  ScrollTrigger?: {
    create: (vars: Record<string, unknown>) => ScrollTriggerInstance
    update: () => void
    refresh: () => void
  }
}

function isMobile() {
  return window.matchMedia("(max-width:479px)").matches
}

function mountSoftreeAgenticScrollTabs(sectionNode: HTMLElement): () => void {
  const tabs = sectionNode.querySelector<HTMLElement>(".k2-scroll-tabs")
  const menu = tabs?.querySelector<HTMLElement>(".k2-scroll-tabs-menu")
  const links = Array.from(tabs?.querySelectorAll<HTMLAnchorElement>(".k2-scroll-tabs-menu-link") || [])
  const panes = Array.from(tabs?.querySelectorAll<HTMLElement>(".k2-scroll-tabs-content-pane") || [])
  if (!tabs || !menu || !links.length || !panes.length) return () => {}

  const win = window as GsapWindow
  const paneData = panes.map((pane) => ({
    pane,
    block: pane.querySelector<HTMLElement>(".k2-scroll-tabs-content-block"),
    bg: pane.querySelector<HTMLElement>(".k2-scroll-tabs-content-bg"),
  }))
  const total = links.length - 1
  let current = -1
  let isJumping = false
  let jumpTimer = 0
  let scrollTrigger: ScrollTriggerInstance | null = null
  let fallbackFrame = 0
  let setupTimer = 0
  let gsapWait = 0

  const clearJump = () => {
    if (jumpTimer) window.cancelAnimationFrame(jumpTimer)
    jumpTimer = 0
    isJumping = false
  }

  const animateBg = (index: number, previous: number) => {
    const item = paneData[index]
    const prev = paneData[previous]

    if (prev?.bg && win.gsap) win.gsap.killTweensOf(prev.bg)

    if (item.bg && win.gsap) {
      win.gsap.killTweensOf(item.bg)
      win.gsap.fromTo(
        item.bg,
        { autoAlpha: 0, scale: 1.12 },
        { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power3.out" },
      )
    } else if (item.bg) {
      item.bg.style.opacity = "1"
      item.bg.style.visibility = "inherit"
      item.bg.style.transform = "translate(0px, 0px) scale(1)"
    }

    paneData.forEach((entry, paneIndex) => {
      entry.block?.style.removeProperty("opacity")
      entry.block?.style.removeProperty("visibility")
      entry.pane.classList.toggle("w--tab-active", paneIndex === index)
    })
  }

  const moveMenuToActive = (active: HTMLElement) => {
    if (isMobile()) {
      const left = active.offsetLeft - menu.clientWidth / 2 + active.offsetWidth / 2
      menu.scrollTo({ left, behavior: "smooth" })
      menu.style.transform = ""
      return
    }

    const menuRect = menu.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()
    const y = menuRect.height / 2 - (activeRect.top - menuRect.top) - activeRect.height / 2

    if (win.gsap) {
      win.gsap.killTweensOf(menu)
      win.gsap.to(menu, { y, duration: 1, ease: "power3.out" })
    } else {
      menu.style.transform = `translate(0px, ${y}px)`
    }
  }

  const activate = (index: number) => {
    if (index === current || index < 0 || index >= links.length) return
    const previous = current
    current = index

    links.forEach((link, linkIndex) => {
      const active = linkIndex === index
      link.classList.toggle("w--current", active)
      link.setAttribute("aria-selected", String(active))
      if (active) link.removeAttribute("tabindex")
      else link.setAttribute("tabindex", "-1")
    })

    animateBg(index, previous)
    requestAnimationFrame(() => moveMenuToActive(links[index]))
  }

  const updateFromScroll = () => {
    fallbackFrame = 0
    if (isJumping) return

    const start = sectionNode.offsetTop - (isMobile() ? 180 : 80)
    const end = start + window.innerHeight * total
    const progress = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)))
    activate(Math.round(progress * total))
  }

  const requestFallbackUpdate = () => {
    if (!fallbackFrame) fallbackFrame = window.requestAnimationFrame(updateFromScroll)
  }

  const setupScrollTrigger = () => {
    if (win.gsap && win.ScrollTrigger) {
      win.gsap.registerPlugin?.(win.ScrollTrigger)
      scrollTrigger?.kill()
      scrollTrigger = win.ScrollTrigger.create({
        trigger: sectionNode,
        start: () => (isMobile() ? "top top-=180px" : "top top-=80px"),
        end: () => `+=${window.innerHeight * total}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self: { progress: number }) => {
          if (isJumping) return
          activate(Math.round(self.progress * total))
        },
      })
      win.ScrollTrigger.refresh()
      return
    }

    window.addEventListener("scroll", requestFallbackUpdate, { passive: true })
    window.addEventListener("resize", requestFallbackUpdate, { passive: true })
    updateFromScroll()
  }

  const jumpToIndex = (index: number) => {
    isJumping = true
    activate(index)

    const start = scrollTrigger?.start ?? sectionNode.offsetTop - (isMobile() ? 180 : 80)
    const end = scrollTrigger?.end ?? start + window.innerHeight * total
    const targetScroll = start + (end - start) * (index / total)

    window.scrollTo({ top: targetScroll, behavior: "auto" })
    if (scrollTrigger) {
      scrollTrigger.scroll(targetScroll)
      win.ScrollTrigger?.update()
    }

    const settle = () => {
      if (Math.abs(window.scrollY - targetScroll) > 8) {
        jumpTimer = window.requestAnimationFrame(settle)
        return
      }
      clearJump()
      activate(index)
      win.ScrollTrigger?.update()
    }

    if (jumpTimer) window.cancelAnimationFrame(jumpTimer)
    jumpTimer = window.requestAnimationFrame(settle)
  }

  const onMenuClick = (event: Event) => {
    const target = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(".k2-scroll-tabs-menu-link")
    if (!target || !menu.contains(target)) return

    event.preventDefault()
    const index = links.indexOf(target)
    if (index < 0) return
    jumpToIndex(index)
  }

  activate(0)

  const trySetup = () => {
    if (win.gsap && win.ScrollTrigger) {
      if (gsapWait) window.clearInterval(gsapWait)
      setupScrollTrigger()
      return
    }
    setupTimer = window.setTimeout(setupScrollTrigger, 1000)
  }

  trySetup()
  gsapWait = window.setInterval(() => {
    if (!win.gsap || !win.ScrollTrigger) return
    window.clearInterval(gsapWait)
    gsapWait = 0
    setupScrollTrigger()
  }, 200)

  menu.addEventListener("click", onMenuClick)

  return () => {
    menu.removeEventListener("click", onMenuClick)
    window.removeEventListener("scroll", requestFallbackUpdate)
    window.removeEventListener("resize", requestFallbackUpdate)
    if (fallbackFrame) window.cancelAnimationFrame(fallbackFrame)
    if (setupTimer) window.clearTimeout(setupTimer)
    if (gsapWait) window.clearInterval(gsapWait)
    clearJump()
    scrollTrigger?.kill()
    paneData.forEach((entry) => {
      entry.block?.style.removeProperty("opacity")
      entry.block?.style.removeProperty("visibility")
      entry.bg?.style.removeProperty("opacity")
      entry.bg?.style.removeProperty("visibility")
      entry.bg?.style.removeProperty("transform")
    })
    menu.style.transform = ""
  }
}

export function SoftreeAgenticScrollTabsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const section = useMemo(() => {
    const raw = SOFTREE_AGENTIC_SECTIONS.find((item) => item.name === "SoftreeAgenticScrollTabsSection")
    if (!raw) return null
    return { ...raw, html: applySoftreeSectionHtml("SoftreeAgenticScrollTabsSection", raw.html) }
  }, [])

  useEffect(() => {
    const sectionNode = sectionRef.current
    if (!sectionNode) return

    const win = window as GsapWindow
    let unbind = () => {}

    const mount = () => {
      unbind()
      win.ScrollTrigger?.refresh()
      unbind = mountSoftreeAgenticScrollTabs(sectionNode)
      win.ScrollTrigger?.refresh()
    }

    const onIntroComplete = () => {
      window.requestAnimationFrame(() => {
        mount()
        window.setTimeout(() => win.ScrollTrigger?.refresh(), 100)
      })
    }

    if (document.documentElement.classList.contains("softree-agentic-intro-complete")) {
      mount()
    } else {
      window.addEventListener("softree-agentic-intro-complete", onIntroComplete, { once: true })
    }

    return () => {
      window.removeEventListener("softree-agentic-intro-complete", onIntroComplete)
      unbind()
    }
  }, [])

  if (!section) return null

  return (
    <section
      ref={sectionRef}
      className="k2-section k2-section-scroll-tabs"
      dangerouslySetInnerHTML={{ __html: section.html }}
    />
  )
}
