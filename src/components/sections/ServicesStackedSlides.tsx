"use client"

import { useRef, useState, useEffect, lazy, Suspense } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import "./ServicesStackedSlides.css"

// MEDIA OPTIMIZATION: lazy-imported = each heavy visual is a separate JS chunk
const GlobalNetworkMap = lazy(() =>
  import("@/components/homepage/GlobalNetworkMap").then((m) => ({ default: m.GlobalNetworkMap })),
)
const DeliveryProcessDiagram = lazy(() =>
  import("@/components/homepage/DeliveryProcessDiagram").then((m) => ({ default: m.DeliveryProcessDiagram })),
)
const FlexibleTechExecutionVisual = lazy(() =>
  import("@/components/homepage/FlexibleTechExecutionVisual").then((m) => ({ default: m.FlexibleTechExecutionVisual })),
)
const LongTermDeliveryVisual = lazy(() =>
  import("@/components/homepage/LongTermDeliveryVisual").then((m) => ({ default: m.LongTermDeliveryVisual })),
)

// Viewport-gated: returns true once the section is within 2x viewport. One-shot.
function useNearViewport(ref: React.RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: "200% 0px 200% 0px", threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return active
}

function MediaSkeleton() {
  return (
    <div className="ssx-skeleton">
      <div className="ssx-skeleton-dot" />
    </div>
  )
}

type ServiceSlide = {
  key: string
  phase: string
  index: string
  title: string
  headline: string
  description: string
  outcomes: string[]
  media: string
  tone: "light" | "dark" | "ember" | "violet"
}

const SERVICE_SLIDES: ServiceSlide[] = [
  {
    key: "global-delivery",
    phase: "PHASE 01",
    index: "01",
    title: "GLOBAL DELIVERY",
    headline: "Distributed teams built for continuous delivery.",
    description:
      "India-based engineering teams across time zones — scalable capacity, reliable continuity.",
    outcomes: ["Offshore Teams", "Global Reach", "Always-On"],
    media: "",
    tone: "light",
  },
  {
    key: "delivery-framework",
    phase: "PHASE 02",
    index: "02",
    title: "DELIVERY FRAMEWORK",
    headline: "A proven process designed for predictable outcomes.",
    description:
      "A structured framework aligning goals, architecture, and planning to reduce risk and accelerate execution.",
    outcomes: ["Discovery", "Design", "Agile Delivery"],
    media: "",
    tone: "ember",
  },
  {
    key: "engineering-execution",
    phase: "PHASE 03",
    index: "03",
    title: "ENGINEERING EXECUTION",
    headline: "Modern engineering for enterprise systems.",
    description:
      "Cloud platforms, Microsoft ecosystems, AI automation, custom apps — shipped to production.",
    outcomes: ["Cloud", "Microsoft", "AI Automation"],
    media: "",
    tone: "dark",
  },
  {
    key: "long-term-partnership",
    phase: "PHASE 04",
    index: "04",
    title: "LONG-TERM PARTNERSHIP",
    headline: "A delivery partner focused on long-term growth.",
    description:
      "Dedicated teams, ongoing optimization, and reliable support that scales with your business.",
    outcomes: ["Dedicated Teams", "Support", "Optimization"],
    media: "",
    tone: "violet",
  },
]

export function ServicesStackedSlides({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  // MEDIA OPTIMIZATION: mount heavy visualizations only when section is near viewport
  const mediaActive = useNearViewport(rootRef)

  /* INTENTIONAL SIMPLIFICATION (matching stack.html):
   * No GSAP. No ScrollTrigger. No animation-timeline. No scroll listeners.
   * Cards stack via pure CSS `position: sticky; top: 0`. Later sibling paints
   * on top of earlier one — no fade needed, no bleed-through possible. */

  return (
    <div ref={rootRef} className={`ssx-root ${className}`}>
      <header className="ssx-intro" aria-label="Delivery lifecycle">
        <div className="ssx-intro-copy">
          <div className="ssx-kicker-row">
            <span className="ssx-kicker-line" />
            <span className="ssx-kicker">Delivery Lifecycle</span>
          </div>
          <h2>From Strategy to Production — We Own Every Layer.</h2>
          <p className="ssx-subheadline mt-4 text-white/60 max-w-2xl">
            A structured offshore delivery model designed for speed, scalability, and long-term business impact.
          </p>
        </div>
        <Link href="/contact" className="ssx-intro-action">
          <span>Start a Project</span>
          <ArrowRight className="ssx-action-icon" aria-hidden />
        </Link>
      </header>

      <div className="ssx-slides-wrapper max-w-7xl mx-auto">
        {SERVICE_SLIDES.map((slide, i) => (
          <section
            key={slide.key}
            className={`ssx-section ssx-section-${slide.key} ssx-tone-${slide.tone}${i % 2 === 1 ? " ssx-section--reverse" : ""}`}
          >
            <div className="ssx-section-content">
              <div className="ssx-section-inner">
                <div className="ssx-copy">
                  <div className="ssx-phase">
                    <span className="ssx-index">{slide.index}</span>
                    <span>{slide.phase}</span>
                  </div>
                  <h3>{slide.title}</h3>
                  <p className="ssx-headline">{slide.headline}</p>
                  <p className="ssx-description">{slide.description}</p>
                  <ul className="ssx-outcomes" aria-label={`${slide.title} outcomes`}>
                    {slide.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                  <div className="ssx-actions">
                    <Link href="/contact" className="ssx-action-primary">
                      <span>Start a Project</span>
                      <ArrowRight className="ssx-action-icon" aria-hidden />
                    </Link>
                    <Link href="/services" className="ssx-action-secondary">
                      <span>View Services</span>
                    </Link>
                  </div>
                </div>

                <div className="ssx-media-block">
                  {slide.key === "global-delivery" ? (
                    <div className="ssx-map-wrap">
                      {mediaActive ? (
                        <Suspense fallback={<MediaSkeleton />}>
                          <GlobalNetworkMap />
                        </Suspense>
                      ) : (
                        <MediaSkeleton />
                      )}
                    </div>
                  ) : slide.key === "delivery-framework" ? (
                    <div className="ssx-map-wrap ssx-map-wrap--diagram">
                      {mediaActive ? (
                        <Suspense fallback={<MediaSkeleton />}>
                          <DeliveryProcessDiagram />
                        </Suspense>
                      ) : (
                        <MediaSkeleton />
                      )}
                    </div>
                  ) : slide.key === "engineering-execution" ? (
                    <div className="ssx-map-wrap ssx-map-wrap--ftx">
                      {mediaActive ? (
                        <Suspense fallback={<MediaSkeleton />}>
                          {/* isActive bypasses the component's internal ScrollTrigger,
                              which mis-calculates start/end positions inside sticky-pinned
                              parents and never fires onEnter. With isActive=true the
                              entrance timeline plays immediately when mediaActive flips. */}
                          <FlexibleTechExecutionVisual isActive />
                        </Suspense>
                      ) : (
                        <MediaSkeleton />
                      )}
                    </div>
                  ) : slide.key === "long-term-partnership" ? (
                    <div className="ssx-map-wrap ssx-map-wrap--ltd">
                      {mediaActive ? (
                        <Suspense fallback={<MediaSkeleton />}>
                          <LongTermDeliveryVisual />
                        </Suspense>
                      ) : (
                        <MediaSkeleton />
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default ServicesStackedSlides
