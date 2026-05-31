"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useCallback, useRef, useState, type RefObject } from "react"
import { STORY_TOKENS } from "./tokens"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export type HorizontalScrollApi = {
  activeIndex: number
  panelCount: number
  scrollToPanel: (index: number) => void
  reducedMotion: boolean
}

type Options = {
  panelCount: number
  onIndexChange?: (index: number) => void
}

export function useHorizontalScroll(
  containerRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  { panelCount, onIndexChange }: Options,
) {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  const scrollToPanel = useCallback(
    (index: number) => {
      const st = scrollTriggerRef.current
      if (!st || panelCount <= 1) return
      const clamped = Math.max(0, Math.min(index, panelCount - 1))
      const progress = clamped / (panelCount - 1)
      const scrollPos = st.start + (st.end - st.start) * progress
      window.scrollTo({ top: scrollPos, behavior: "smooth" })
    },
    [panelCount],
  )

  useGSAP(
    () => {
      const container = containerRef.current
      const track = trackRef.current
      if (!container || !track) return

      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: reduce)", () => {
        setReducedMotion(true)
        gsap.set(track, { clearProps: "transform" })
        return () => setReducedMotion(false)
      })

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        setReducedMotion(false)

        const getScrollDistance = () => {
          const parent = track.parentElement
          if (!parent) return 0
          return Math.max(0, track.scrollWidth - parent.clientWidth)
        }

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: `top top+=${STORY_TOKENS.navOffset}`,
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / Math.max(panelCount - 1, 1),
              duration: { min: 0.15, max: 0.45 },
              delay: 0.05,
              ease: "power2.inOut",
            },
            onUpdate: (self) => {
              const idx =
                panelCount <= 1
                  ? 0
                  : Math.round(self.progress * (panelCount - 1))
              setActiveIndex(idx)
              onIndexChange?.(idx)
            },
          },
        })

        scrollTriggerRef.current = tween.scrollTrigger ?? null

        return () => {
          scrollTriggerRef.current = null
        }
      })

      return () => mm.revert()
    },
    { scope: containerRef, dependencies: [panelCount] },
  )

  return { activeIndex, panelCount, scrollToPanel, reducedMotion } satisfies HorizontalScrollApi
}
