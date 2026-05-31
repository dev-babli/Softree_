"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useCallback, useEffect, useRef, useState } from "react"
import type { CaseStudyLayoutData } from "../../types"
import { PinnedContextSidebar } from "./PinnedContextSidebar"
import { StepStepper } from "./StepStepper"
import { Step01Problem } from "./steps/Step01Problem"
import { Step02Architecture } from "./steps/Step02Architecture"
import { Step03AgentSystem } from "./steps/Step03AgentSystem"
import { Step04Infrastructure } from "./steps/Step04Infrastructure"
import { Step05Impact } from "./steps/Step05Impact"
import { DASHBOARD_TOKENS, STEPPER_STEPS } from "./tokens"

const STEP_COUNT = STEPPER_STEPS.length

type Props = {
  data: CaseStudyLayoutData
}

export function NeutrinoDashboardStoryPage({ data }: Props) {
  const [activeStep, setActiveStep] = useState(2)
  const [reducedMotion, setReducedMotion] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  const goToStep = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(STEP_COUNT - 1, index))
      if (clamped === activeStep) return

      if (reducedMotion || !contentRef.current) {
        setActiveStep(clamped)
        return
      }

      gsap.to(contentRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.15,
        onComplete: () => {
          setActiveStep(clamped)
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
          )
        },
      })
    },
    [activeStep, reducedMotion],
  )

  useGSAP(() => {
    if (contentRef.current && !reducedMotion) {
      gsap.set(contentRef.current, { opacity: 1, y: 0 })
    }
  })

  const title =
    data.headerTitle || "Building the AI Operating System for Enterprise Automation"
  const description =
    data.excerpt ||
    "Softree partnered with Neutrino AI to design a governed intelligence engine — autonomous agents, real-time operations, and enterprise-grade automation on one platform."

  const stepContent = [
    <Step01Problem key="01" />,
    <Step02Architecture key="02" />,
    <Step03AgentSystem key="03" />,
    <Step04Infrastructure key="04" />,
    <Step05Impact key="05" metrics={data.impactMetrics} testimonial={data.testimonial} />,
  ]

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: DASHBOARD_TOKENS.bg,
        backgroundImage: DASHBOARD_TOKENS.bgAmbient,
        minHeight: "calc(100dvh - 88px)",
      }}
    >
      <div className="relative mx-auto flex max-w-[1440px] flex-col px-4 py-8 lg:flex-row lg:px-6 lg:py-10">
        <PinnedContextSidebar
          title={title}
          description={description}
          metadata={{
            client: data.client || "Neutrino AI",
            industry: data.industry || data.snapshot.industry || "Artificial Intelligence",
            duration: data.snapshot.duration || "12 Months",
            team: data.snapshot.teamSize || "18 Engineers",
          }}
          activeStep={activeStep}
          stepCount={STEP_COUNT}
          githubUrl={data.liveUrl || "https://github.com/neutrino-ai/platform"}
          onPrev={() => goToStep(activeStep - 1)}
          onNext={() => goToStep(activeStep + 1)}
        />

        <div className="flex min-w-0 flex-1 flex-col pl-0 lg:pl-5">
          <div
            ref={contentRef}
            className="flex min-h-[520px] flex-1 flex-col will-change-[opacity,transform]"
            style={{ minHeight: "min(72vh, 720px)" }}
          >
            {stepContent[activeStep]}
          </div>
          <StepStepper activeStep={activeStep} onSelect={goToStep} />
        </div>
      </div>
    </section>
  )
}
