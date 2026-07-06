"use client"

import { useEffect, useMemo, useRef } from "react"
import { KORE_AI_SECTIONS } from "./referenceContent"

type ScrollTriggerInstance = {
  start: number
  end: number
  kill: () => void
}

type GsapWindow = Window & {
  gsap?: {
    registerPlugin?: (plugin: unknown) => void
    set: (target: unknown, vars: Record<string, unknown>) => void
    to: (target: unknown, vars: Record<string, unknown>) => void
    fromTo: (target: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>) => void
    killTweensOf: (target: unknown) => void
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

export function KoreScrollTabsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const section = useMemo(
    () => KORE_AI_SECTIONS.find((item) => item.name === "KoreK2SectionScrollTabsSection"),
    [],
  )

  useEffect(() => {
    const sectionNode = sectionRef.current
    if (!sectionNode) return

    const tabs = sectionNode.querySelector<HTMLElement>(".k2-scroll-tabs")
    const menu = tabs?.querySelector<HTMLElement>(".k2-scroll-tabs-menu")
    const links = Array.from(tabs?.querySelectorAll<HTMLAnchorElement>(".k2-scroll-tabs-menu-link") || [])
    const panes = Array.from(tabs?.querySelectorAll<HTMLElement>(".k2-scroll-tabs-content-pane") || [])
    if (!tabs || !menu || !links.length || !panes.length) return

    const win = window as GsapWindow
    const paneData = panes.map((pane) => ({
      block: pane.querySelector<HTMLElement>(".k2-scroll-tabs-content-block"),
      bg: pane.querySelector<HTMLElement>(".k2-scroll-tabs-content-bg"),
    }))
    const total = links.length - 1
    let current = -1
    let isJumping = false
    let scrollTrigger: ScrollTriggerInstance | null = null
    let fallbackFrame = 0
    let setupTimer = 0

    const setVisual = (element: HTMLElement | null, visible: boolean, scale = false) => {
      if (!element) return
      element.style.opacity = visible ? "1" : "0"
      element.style.visibility = visible ? "inherit" : "hidden"
      if (scale) element.style.transform = visible ? "translate(0px, 0px) scale(1)" : "translate(0px, 0px) scale(1.12)"
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

      panes.forEach((pane, paneIndex) => {
        pane.classList.toggle("w--tab-active", paneIndex === index)
      })

      requestAnimationFrame(() => {
        moveMenuToActive(links[index])

        if (previous >= 0) {
          setVisual(paneData[previous]?.block || null, false)
          setVisual(paneData[previous]?.bg || null, false, true)
        }

        const item = paneData[index]
        if (win.gsap && item.bg) {
          win.gsap.killTweensOf(item.bg)
          win.gsap.fromTo(
            item.bg,
            { autoAlpha: 0, scale: 1.12 },
            { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power3.out" },
          )
        } else {
          setVisual(item.bg || null, true, true)
        }

        if (win.gsap && item.block) {
          win.gsap.killTweensOf(item.block)
          win.gsap.fromTo(item.block, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, delay: 0.25, ease: "power2.out" })
        } else {
          setVisual(item.block || null, true)
        }
      })
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

    const delayedSetup = () => {
      if (win.gsap && win.ScrollTrigger) {
        setupScrollTrigger()
        return
      }

      setupTimer = window.setTimeout(setupScrollTrigger, 1000)
    }

    paneData.forEach((item, index) => {
      setVisual(item.block, index === 0)
      setVisual(item.bg, index === 0, true)
    })
    activate(0)
    delayedSetup()

    const linkCleanups = links.map((link, index) => {
      const onClick = (event: MouseEvent) => {
        event.preventDefault()
        isJumping = true
        activate(index)

        const start = scrollTrigger?.start ?? sectionNode.offsetTop - (isMobile() ? 180 : 80)
        const end = scrollTrigger?.end ?? start + window.innerHeight * total
        const targetScroll = start + (end - start) * (index / total)

        window.scrollTo({ top: targetScroll, behavior: "smooth" })
        win.ScrollTrigger?.update()
        window.setTimeout(() => {
          isJumping = false
        }, 150)
      }

      link.addEventListener("click", onClick)
      return () => link.removeEventListener("click", onClick)
    })

    return () => {
      linkCleanups.forEach((cleanup) => cleanup())
      window.removeEventListener("scroll", requestFallbackUpdate)
      window.removeEventListener("resize", requestFallbackUpdate)
      if (fallbackFrame) window.cancelAnimationFrame(fallbackFrame)
      if (setupTimer) window.clearTimeout(setupTimer)
      scrollTrigger?.kill()
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
