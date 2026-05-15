"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ReactBeforeAfterScroll } from "./_components/ReactBeforeAfterScroll"
import { ReactBuildStory } from "./_components/ReactBuildStory"
import { ReactFAQSection } from "./_components/ReactFAQSection"
import { ReactFinalCTA } from "./_components/ReactFinalCTA"
import { ReactWebLandingStyles } from "./_components/ReactWebLandingStyles"
import { ReactMobileCTA } from "./_components/ReactMobileCTA"
import { ReactOfferSection } from "./_components/ReactOfferSection"
import { ReactPerformanceProof } from "./_components/ReactPerformanceProof"
import { ReactProblemSolution } from "./_components/ReactProblemSolution"
import { ReactProofStrip } from "./_components/ReactProofStrip"
import { ReactServicesMatrix } from "./_components/ReactServicesMatrix"
import { ReactWebHeroStory } from "./_components/ReactWebHeroStory"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function WebDevelopmentStoryExperience() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q(".rw-reveal, .rw-hero-copy, .rw-hero-reveal, .rw-portal-detail"), {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          clearProps: "transform",
        })
      })

      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const revealItems = q(".rw-reveal")

        gsap.set(revealItems, { autoAlpha: 0, y: 44 })
        ScrollTrigger.batch(revealItems, {
          start: "top 82%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: true,
            })
          },
        })

        const hero = q(".rw-hero")[0]
        const heroPin = q(".rw-hero-pin")[0]
        const portal = q(".rw-portal-shell")[0]
        const heroWord = q(".rw-hero-word")[0]
        const heroCopy = q(".rw-hero-copy")[0]
        const heroReveal = q(".rw-hero-reveal")[0]
        const portalDetail = q(".rw-portal-detail")[0]

        if (hero && heroPin && portal && heroWord && heroCopy && heroReveal && portalDetail) {
          gsap.set([heroReveal, portalDetail], { autoAlpha: 0, y: 28 })
          gsap
            .timeline({
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "+=190%",
                pin: heroPin,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            })
            .to(heroWord, { autoAlpha: 0.08, xPercent: -8, scale: 0.94, ease: "none" }, 0)
            .to(heroCopy, { autoAlpha: 0, y: -56, ease: "none" }, 0.08)
            .to(portal, { scale: 1.62, yPercent: -3, ease: "none" }, 0)
            .to(portalDetail, { autoAlpha: 1, y: 0, ease: "none" }, 0.34)
            .to(heroReveal, { autoAlpha: 1, y: 0, ease: "none" }, 0.48)
        }

        const compare = q(".rw-comparison")[0]
        const compareWindow = q(".rw-comparison-window")[0] as HTMLElement | undefined
        const afterShell = q(".rw-after-shell")[0]
        const afterInner = q(".rw-after-inner")[0]
        const compareHandle = q(".rw-compare-handle")[0]

        if (compare && compareWindow && afterShell && afterInner && compareHandle) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: compare,
                start: "top top",
                end: () => `+=${Math.min(window.innerWidth * 1.15, 1420)}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(afterShell, { xPercent: 100 }, { xPercent: 0, ease: "none" }, 0)
            .fromTo(afterInner, { xPercent: -100 }, { xPercent: 0, ease: "none" }, 0)
            .fromTo(
              compareHandle,
              { x: 0 },
              { x: () => compareWindow.offsetWidth, ease: "none" },
              0
            )
        }

        const buildCards = q(".rw-build-step")
        const buildVisuals = q(".rw-build-visual-card")

        const activateBuildStep = (index: number) => {
          buildCards.forEach((card, cardIndex) => {
            card.classList.toggle("is-active", cardIndex === index)
          })
          buildVisuals.forEach((visual, visualIndex) => {
            visual.classList.toggle("is-active", visualIndex === index)
          })
        }

        activateBuildStep(0)
        buildCards.forEach((card, index) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 58%",
            end: "bottom 42%",
            onEnter: () => activateBuildStep(index),
            onEnterBack: () => activateBuildStep(index),
          })
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  return (
    <main ref={rootRef} className="rw-page">
      <ReactWebHeroStory />
      <ReactProofStrip />
      <ReactProblemSolution />
      <ReactBeforeAfterScroll />
      <ReactBuildStory />
      <ReactServicesMatrix />
      <ReactPerformanceProof />
      <ReactOfferSection />
      <ReactFAQSection />
      <ReactFinalCTA />
      <ReactMobileCTA />
      <ReactWebLandingStyles />
    </main>
  )
}

