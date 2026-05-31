"use client"

import { useCallback, useRef } from "react"
import type { CaseStudyLayoutData } from "../../types"
import { HorizontalTrack } from "./HorizontalTrack"
import { ApproachEnginePanel } from "./panels/ApproachEnginePanel"
import { ChallengePanel } from "./panels/ChallengePanel"
import { FuturePanel } from "./panels/FuturePanel"
import { ImpactPanel } from "./panels/ImpactPanel"
import { SolutionPanel } from "./panels/SolutionPanel"
import { PinnedSidebar } from "./PinnedSidebar"
import { ProgressBar } from "./ProgressBar"
import { STORY_TOKENS } from "./tokens"
import { useHorizontalScroll } from "./useHorizontalScroll"

const PANEL_COUNT = 5

type Props = {
  data: CaseStudyLayoutData
}

export function AIHorizontalStoryPage({ data }: Props) {
  const containerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const { activeIndex, scrollToPanel, reducedMotion } = useHorizontalScroll(
    containerRef,
    trackRef,
    { panelCount: PANEL_COUNT },
  )

  const handlePrev = useCallback(() => scrollToPanel(activeIndex - 1), [activeIndex, scrollToPanel])
  const handleNext = useCallback(() => scrollToPanel(activeIndex + 1), [activeIndex, scrollToPanel])

  const title =
    data.headerTitle || "Building the Future of AI Automation"
  const description =
    data.excerpt ||
    "Softree partnered with Neutrino AI to replace fragmented automation with a governed intelligence engine — agents, workflows, and real-time operations on one platform."

  const tasksAutomated = parseInt(
    data.impactMetrics.find((m) => m.label.toLowerCase().includes("task"))?.value?.replace(/\D/g, "") ||
      "24846",
    10,
  )

  return (
    <section
      ref={containerRef}
      className="horizontal-story-container relative w-full overflow-hidden"
      style={{
        background: STORY_TOKENS.bg,
        minHeight: reducedMotion ? "auto" : `calc(100dvh - ${STORY_TOKENS.navOffset}px)`,
        ["--story-panel-width" as string]: `min(90vw, calc(100vw - ${STORY_TOKENS.sidebarWidth + 80}px))`,
      }}
    >
      <div
        className={`flex w-full ${reducedMotion ? "flex-col" : "h-[calc(100dvh-88px)]"}`}
      >
        <PinnedSidebar
          title={title}
          description={description}
          metadata={{
            client: data.client,
            industry: data.industry || data.snapshot.industry,
            duration: data.snapshot.duration,
            team: data.snapshot.teamSize,
          }}
          activeIndex={activeIndex}
          panelCount={PANEL_COUNT}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
          <HorizontalTrack ref={trackRef} reducedMotion={reducedMotion}>
            <ChallengePanel cards={data.challengeCards} isActive={activeIndex === 0} />
            <ApproachEnginePanel summary={data.approachSummary} />
            <SolutionPanel
              tasksAutomated={Number.isFinite(tasksAutomated) ? tasksAutomated : 24846}
              summary={data.solutionSummary}
              isActive={activeIndex === 2}
            />
            <ImpactPanel
              metrics={data.impactMetrics}
              testimonial={data.testimonial}
              isActive={activeIndex === 3}
            />
            <FuturePanel
              headline={data.cta.headline}
              subtext={data.cta.subtext}
              buttonText={data.cta.buttonText}
              buttonHref={data.cta.buttonHref}
            />
          </HorizontalTrack>

          {!reducedMotion && (
            <ProgressBar
              activeIndex={activeIndex}
              panelCount={PANEL_COUNT}
              onSelect={scrollToPanel}
            />
          )}
        </div>
      </div>
    </section>
  )
}
