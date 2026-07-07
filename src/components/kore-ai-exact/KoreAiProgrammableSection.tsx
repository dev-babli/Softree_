"use client"

import { useEffect, useMemo, useRef } from "react"
import { initK2SplitAndStagger } from "./k2ScrollReveal"
import { initLightThemeSection } from "./lightThemeReveal"
import { applySoftreeSectionHtml } from "./koreHtmlCopy"
import { KORE_AI_SECTIONS } from "./referenceContent"

export function KoreAiProgrammableSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const html = useMemo(() => {
    const section = KORE_AI_SECTIONS.find((item) => item.name === "KoreAiProgrammableSection")
    return applySoftreeSectionHtml("KoreAiProgrammableSection", section?.html ?? "")
  }, [])

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    initK2SplitAndStagger(root)
    initLightThemeSection(root)

    const sticky = root.querySelector<HTMLElement>(".k2-orbit-sticky")
    const steps = Array.from(root.querySelectorAll<HTMLElement>(".k2-orbit-step"))
    const buttons = Array.from(root.querySelectorAll<HTMLElement>(".k2-orbit-button"))
    if (!sticky || !steps.length) return

    let frame = 0
    let resizeObserver: ResizeObserver | undefined

    const setStep = (step: number) => {
      const clampedStep = Math.max(0, Math.min(step, steps.length))
      sticky.dataset.step = String(clampedStep)
      buttons.forEach((button, index) => {
        button.classList.toggle("w--current", index + 1 === clampedStep)
      })
    }

    const updateStickyStep = () => {
      frame = 0
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const thresholdBias = 24
      let currentStep = 0

      steps.forEach((step, index) => {
        const top = step.getBoundingClientRect().top + window.scrollY
        if (scrollPosition + thresholdBias >= top) currentStep = index + 1
      })

      const sectionTop = root.getBoundingClientRect().top + window.scrollY
      if (currentStep === 0 && scrollPosition >= sectionTop + window.innerHeight * 0.15) {
        currentStep = 1
      }

      setStep(currentStep)
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateStickyStep)
    }

    const onButtonClick = (index: number) => (event: MouseEvent) => {
      event.preventDefault()
      const target = steps[index]
      if (!target) return

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2 + 24,
        behavior: "smooth",
      })
      setStep(index + 1)
    }

    const cleanups = buttons.map((button, index) => {
      const handler = onButtonClick(index)
      button.addEventListener("click", handler)
      return () => button.removeEventListener("click", handler)
    })

    updateStickyStep()
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(requestUpdate)
      resizeObserver.observe(root)
      resizeObserver.observe(sticky)
    }
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate, { passive: true })
    window.addEventListener("load", requestUpdate, { once: true })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      window.removeEventListener("load", requestUpdate)
      resizeObserver?.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  if (!html) return null

  return (
    <section
      ref={sectionRef}
      id="ai-programmable"
      className="k2-section k2-section-orbit"
      data-theme="light"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
