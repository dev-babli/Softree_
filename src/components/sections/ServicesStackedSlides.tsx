"use client"

import { useRef, useState, useEffect, type SyntheticEvent } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import SectionHeader from "@/components/homepage-light/SectionHeader"
import { DUR, EASE_T } from "@/lib/motion"
import "./ServicesStackedSlides.css"

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

const STACKED_SERVICE_VIDEOS: Partial<Record<ServiceSlide["key"], string>> = {
  "global-delivery": "/stacked_services/fine_tune_it_202605271049.webm",
  "delivery-framework": "/stacked_services/2ndcard.webm",
  "engineering-execution": "/stacked_services/3rdcard.webm",
  "long-term-partnership": "/stacked_services/4thcard.webm",
}

export function ServicesStackedSlides({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const introInView = useInView(introRef, { once: true, margin: "-15%" })
  // MEDIA OPTIMIZATION: mount heavy visualizations only when section is near viewport
  const mediaActive = useNearViewport(rootRef)
  const handleFirstVideoTimeUpdate = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget
    if (video.currentTime >= 3) {
      video.currentTime = 0
      if (video.paused) {
        void video.play()
      }
    }
  }

  /* INTENTIONAL SIMPLIFICATION (matching stack.html):
   * No GSAP. No ScrollTrigger. No animation-timeline. No scroll listeners.
   * Cards stack via pure CSS `position: sticky; top: 0`. Later sibling paints
   * on top of earlier one — no fade needed, no bleed-through possible. */

  return (
    <section
      ref={rootRef}
      data-section="services-stacked-slides"
      data-theme-section="light"
      className={`ssx-root ${className}`}
      aria-labelledby="services-stacked-heading"
    >
      <header className="ssx-intro">
        <motion.div
          ref={introRef}
          className="ssx-intro-main"
          initial={{ opacity: 0, y: 12 }}
          animate={introInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DUR.panel, ease: EASE_T.silk }}
        >
          <SectionHeader
            badge="Delivery lifecycle"
            accent="#FF5812"
            headline={
              <span id="services-stacked-heading">
                From Strategy to Production — We Own Every Layer.
              </span>
            }
            body="A structured offshore delivery model designed for speed, scalability, and long-term business impact."
          />
        </motion.div>
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
                  {STACKED_SERVICE_VIDEOS[slide.key] ? (
                    <div className="ssx-map-wrap">
                      {mediaActive ? (
                        <video
                          className="ssx-media-video"
                          src={STACKED_SERVICE_VIDEOS[slide.key]}
                          autoPlay
                          muted
                          loop={slide.key === "global-delivery"}
                          playsInline
                          preload="metadata"
                          aria-label={`${slide.title} showcase video`}
                          onTimeUpdate={slide.key === "global-delivery" ? handleFirstVideoTimeUpdate : undefined}
                        />
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
    </section>
  )
}

export default ServicesStackedSlides
