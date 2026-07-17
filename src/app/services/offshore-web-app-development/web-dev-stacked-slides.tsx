"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/homepage-light/SectionHeader";
import {
  WEB_DEV_STACKED_SLIDES,
  WEB_DEV_STACKED_VIDEOS,
} from "@/data/web-dev-page";
import { DUR, EASE_T } from "@/lib/motion";
import "@/components/sections/ServicesStackedSlides.css";

function useNearViewport() {
  const [active, setActive] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "200% 0px 200% 0px", threshold: 0 },
    );
    io.observe(element);
    return () => io.disconnect();
  }, [element]);

  return [active, setElement] as const;
}

function MediaSkeleton() {
  return (
    <div className="ssx-skeleton">
      <div className="ssx-skeleton-dot" />
    </div>
  );
}

export default function WebDevStackedSlides({
  className = "",
}: {
  className?: string;
}) {
  const [mediaActive, rootRef] = useNearViewport();
  const introRef = useRef<HTMLDivElement>(null);
  const introInView = useInView(introRef, { once: true, margin: "-15%" });

  return (
    <section
      ref={rootRef}
      data-section="web-dev-stacked"
      className={`ssx-root ${className}`}
      aria-labelledby="web-dev-stacked-heading"
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
              <span id="web-dev-stacked-heading">
                From discovery to production — we own every layer.
              </span>
            }
            body="A structured web delivery model designed for speed, security, and long-term product growth."
          />
        </motion.div>
        <Link href="/contact" className="ssx-intro-action">
          <span>Start a project</span>
          <ArrowRight className="ssx-action-icon" aria-hidden />
        </Link>
      </header>

      <div className="ssx-slides-wrapper mx-auto max-w-7xl">
        {WEB_DEV_STACKED_SLIDES.map((slide, i) => {
          const videoSrc = WEB_DEV_STACKED_VIDEOS[slide.key];
          return (
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
                    <ul
                      className="ssx-outcomes"
                      aria-label={`${slide.title} outcomes`}
                    >
                      {slide.outcomes.map((outcome) => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </ul>
                    <div className="ssx-actions">
                      <Link href="/contact" className="ssx-action-primary">
                        <span>Start a project</span>
                        <ArrowRight className="ssx-action-icon" aria-hidden />
                      </Link>
                      <Link
                        href="/case-studies/web"
                        className="ssx-action-secondary"
                      >
                        <span>Web case studies</span>
                      </Link>
                    </div>
                  </div>

                  <div className="ssx-media-block">
                    {videoSrc ? (
                      <div className="ssx-map-wrap">
                        {mediaActive ? (
                          <video
                            className="ssx-media-video"
                            src={videoSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label={`${slide.title} showcase video`}
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
          );
        })}
      </div>
    </section>
  );
}
