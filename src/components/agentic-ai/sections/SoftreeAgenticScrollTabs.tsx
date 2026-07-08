"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import LetsTalkButton from "@/components/qc/shared/LetsTalkButton"
import { prefersReducedMotion } from "@/lib/motion"

import { scrollCapabilityTabs } from "../data"
import "../softree-scroll-tabs.css"

gsap.registerPlugin(ScrollTrigger)

/**
 * Faithful React port of Kore `k2-scroll-tabs` from Softree_/aipage.html
 * (markup ~5050–5627, GSAP logic ~8774–8920).
 */
export function SoftreeAgenticScrollTabs() {
  const sectionRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const paneRefs = useRef<(HTMLDivElement | null)[]>([])
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])
  const bgRefs = useRef<(HTMLImageElement | null)[]>([])
  const stRef = useRef<ScrollTrigger | null>(null)
  const currentRef = useRef(-1)
  const jumpingRef = useRef(false)
  const readyRef = useRef(false)

  const isMobileMq = useCallback(() => window.matchMedia("(max-width: 767px)").matches, [])

  const syncTabA11y = useCallback((index: number) => {
    const menu = menuRef.current
    if (!menu) return
    const links = menu.querySelectorAll<HTMLButtonElement>(".k2-scroll-tabs-menu-link")
    links.forEach((link, i) => {
      const isCurrent = i === index
      link.classList.toggle("is-current", isCurrent)
      link.setAttribute("aria-selected", isCurrent ? "true" : "false")
    })
    paneRefs.current.forEach((pane, i) => {
      if (!pane) return
      pane.setAttribute("aria-hidden", i === index ? "false" : "true")
    })
  }, [])

  const activate = useCallback(
    (index: number) => {
      if (index === currentRef.current) return
      const prev = currentRef.current
      currentRef.current = index
      syncTabA11y(index)

      const menu = menuRef.current
      if (!menu) return

      requestAnimationFrame(() => {
        const links = menu.querySelectorAll<HTMLButtonElement>(".k2-scroll-tabs-menu-link")
        const activeLink = links[index]
        if (!activeLink) return

        if (isMobileMq()) {
          const left = activeLink.offsetLeft - menu.clientWidth / 2 + activeLink.offsetWidth / 2
          menu.scrollTo({ left, behavior: "smooth" })
        } else {
          const y =
            menu.clientHeight / 2 -
            (activeLink.offsetTop - menu.scrollTop) -
            activeLink.offsetHeight / 2
          gsap.killTweensOf(menu)
          gsap.to(menu, { y, duration: 0.65, ease: "power3.out" })
        }

        if (prev >= 0) {
          const prevBlock = blockRefs.current[prev]
          const prevBg = bgRefs.current[prev]
          if (prevBlock) {
            gsap.killTweensOf(prevBlock)
            gsap.set(prevBlock, { autoAlpha: 0 })
          }
          if (prevBg) {
            gsap.killTweensOf(prevBg)
            gsap.set(prevBg, { autoAlpha: 0, scale: 1.08 })
          }
          paneRefs.current[prev]?.classList.remove("is-active")
        }

        const block = blockRefs.current[index]
        const bg = bgRefs.current[index]
        paneRefs.current[index]?.classList.add("is-active")

        if (bg) {
          gsap.killTweensOf(bg)
          gsap.fromTo(
            bg,
            { autoAlpha: 0, scale: 1.08 },
            { autoAlpha: 1, scale: 1, duration: 0.85, ease: "power3.out" },
          )
        }
        if (block) {
          gsap.killTweensOf(block)
          gsap.fromTo(
            block,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.35, delay: 0.12, ease: "power2.out" },
          )
        }
      })
    },
    [isMobileMq, syncTabA11y],
  )

  const setupScroll = useCallback(() => {
    const section = sectionRef.current
    const menu = menuRef.current
    if (!section || !menu || prefersReducedMotion()) {
      activate(0)
      return () => {}
    }

    blockRefs.current.forEach((block, i) => {
      if (block) gsap.set(block, { autoAlpha: i === 0 ? 1 : 0 })
      const bg = bgRefs.current[i]
      if (bg) gsap.set(bg, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.08 })
    })
    paneRefs.current[0]?.classList.add("is-active")
    syncTabA11y(0)

    const total = scrollCapabilityTabs.length - 1
    const mm = gsap.matchMedia()
    const cleanups: Array<() => void> = []

    mm.add("(min-width: 768px)", () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top-=80px",
        end: () => `+=${window.innerHeight * total}`,
        pin: true,
        scrub: 0.4,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (jumpingRef.current) return
          const index = Math.round(self.progress * total)
          activate(index)
        },
      })
      stRef.current = st
      activate(0)

      const links = menu.querySelectorAll<HTMLButtonElement>(".k2-scroll-tabs-menu-link")
      const handlers = Array.from(links).map((link, index) => {
        const handler = (e: Event) => {
          e.preventDefault()
          if (!stRef.current) return
          jumpingRef.current = true
          const progress = index / total
          const targetScroll = stRef.current.start + (stRef.current.end - stRef.current.start) * progress
          currentRef.current = -1
          activate(index)
          window.scrollTo({ top: targetScroll, behavior: "instant" as ScrollBehavior })
          ScrollTrigger.update()
          window.setTimeout(() => {
            jumpingRef.current = false
          }, 100)
        }
        link.addEventListener("click", handler)
        return () => link.removeEventListener("click", handler)
      })
      cleanups.push(() => handlers.forEach((off) => off()))
    })

    mm.add("(max-width: 767px)", () => {
      const links = menu.querySelectorAll<HTMLButtonElement>(".k2-scroll-tabs-menu-link")
      const handlers = Array.from(links).map((link, index) => {
        const handler = (e: Event) => {
          e.preventDefault()
          currentRef.current = -1
          activate(index)
        }
        link.addEventListener("click", handler)
        return () => link.removeEventListener("click", handler)
      })
      cleanups.push(() => handlers.forEach((off) => off()))
      activate(0)
    })

    return () => {
      stRef.current?.kill()
      stRef.current = null
      cleanups.forEach((off) => off())
      mm.revert()
    }
  }, [activate, syncTabA11y])

  useGSAP(
    () => {
      if (readyRef.current) return
      readyRef.current = true
      return setupScroll()
    },
    { scope: sectionRef, dependencies: [setupScroll] },
  )

  return (
    <section
      ref={sectionRef}
      className="k2-scroll-tabs-root w-full bg-[#f8f4ec] py-20 md:py-28"
      aria-labelledby="k2-scroll-tabs-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="k2-scroll-tabs-heading"
              className="text-[clamp(28px,4.5vw,44px)] font-medium leading-[1.08] tracking-[-0.03em] text-[#121417]"
            >
              A real difference <em className="italic">with AI</em>
            </h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-[#121417]/70">
              Six ways Softree delivers agentic AI on the Microsoft stack, with patterns from enterprise production, not
              slide decks.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <LetsTalkButton />
            <Link
              href="/case-studies/ai"
              className="text-sm font-medium text-[#121417]/60 underline-offset-4 hover:text-[#FF5812] hover:underline"
            >
              Case studies
            </Link>
          </div>
        </div>

        <div className="k2-scroll-tabs-layout">
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-[#0c0e0c] md:min-h-[480px]">
            {scrollCapabilityTabs.map((tab, i) => (
              <div
                key={tab.id}
                ref={(el) => {
                  paneRefs.current[i] = el
                }}
                className="k2-scroll-tabs-content-pane absolute inset-0 z-0"
                aria-hidden={i !== 0}
              >
                <Image
                  ref={(el) => {
                    bgRefs.current[i] = el
                  }}
                  src={tab.bg}
                  alt={tab.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 70vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  className="k2-scroll-tabs-content-bg object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e0c]/85 via-[#0c0e0c]/35 to-transparent" />
                <div
                  ref={(el) => {
                    blockRefs.current[i] = el
                  }}
                  className="k2-scroll-tabs-content-block k2-corners absolute bottom-0 left-0 right-0 m-4 bg-white p-6 md:m-8 md:p-8"
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FF5812]">
                    {tab.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-[#121417] md:text-2xl">{tab.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#121417]/75 md:text-base">{tab.body}</p>
                  <div className="k2-bar-strip" />
                </div>
              </div>
            ))}
          </div>

          <div
            ref={menuRef}
            className="k2-scroll-tabs-menu mt-8 md:mt-0"
            role="tablist"
            aria-label="AI capabilities"
          >
            {scrollCapabilityTabs.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={i === 0}
                className={`k2-scroll-tabs-menu-link ${i === 0 ? "is-current" : ""}`}
              >
                <strong>{tab.verb}</strong> <span className="k2-tab-common-ai">with AI</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
