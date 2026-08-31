"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { TestimonialSlide } from "@/components/testimonial-slider";
import {
  homepageTestimonials,
  SUCCESS_STORY_METRICS,
} from "@/data/homepage-showcase-content";
import { AnimatedMetric } from "@/components/sections/success-stories/AnimatedMetric";
import {
  DitherOverlay,
  runSmoothTransition,
  TESTIMONIAL_ROTATE_MS,
  type TransitionProgress,
} from "@/components/sections/success-stories/DitherOverlay";

const INK = "#0c0c0c";
const MUTED = "rgba(12, 12, 12, 0.6)";
const ACCENT = "#F9452D";
const SURFACE = "#F3F0EE";
const CELL_MIN_H = "min-h-[400px] sm:min-h-[440px] lg:min-h-[500px]";

const GRADIENT_OVERLAY =
  "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(249,69,45,0.35) 38%, rgba(12,12,12,0.92) 72%, rgba(12,12,12,0.97) 100%)";

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

const DEFAULT_METRICS = [
  { value: 40, prefix: "+", suffix: "%", label: "Faster delivery" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
] as const;

function StarIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]"
      aria-hidden
      style={{ fill: color, color }}
    >
      <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z" />
    </svg>
  );
}

function StarRow({ color, count = 5 }: { color: string; count?: number }) {
  return (
    <div className="flex shrink-0 gap-0.5" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} color={color} />
      ))}
    </div>
  );
}

function slideDesignation(slide: TestimonialSlide): string {
  if (slide.title) return slide.title;
  if (slide.location) return slide.location;
  return "Client partner";
}

function buildingImage(slide: TestimonialSlide): string {
  return (
    slide.image ??
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85"
  );
}

function slideMetrics(slide: TestimonialSlide) {
  return SUCCESS_STORY_METRICS[slide.id] ?? DEFAULT_METRICS;
}

function ClientLogo({ slide }: { slide: TestimonialSlide }) {
  if (!slide.logo) return null;
  return (
    <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/20 bg-white p-2 shadow-sm">
      <Image
        src={slide.logo}
        alt={slide.logoAlt ?? `${slide.company ?? slide.name} logo`}
        width={48}
        height={48}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

function IdentityBlock({ slide }: { slide: TestimonialSlide }) {
  const designation = slideDesignation(slide);
  return (
    <div className="p-6 sm:p-7 lg:p-8">
      <ClientLogo slide={slide} />
      <p className="text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl lg:text-[1.65rem]">
        {slide.name}
      </p>
      {slide.company ? (
        <p className="mt-1.5 text-[15px] font-medium leading-snug text-white/90">{slide.company}</p>
      ) : null}
      <p className="mt-1 text-sm leading-snug text-white/60">{designation}</p>
    </div>
  );
}

function QuoteBlock({
  slide,
  slideIndex,
  total,
}: {
  slide: TestimonialSlide;
  slideIndex: number;
  total: number;
}) {
  const rating = slide.rating ?? 5;
  const metrics = slideMetrics(slide);

  return (
    <div className="flex h-full min-h-0 flex-col gap-5">
      <StarRow color={ACCENT} count={rating} />
      <blockquote className="min-h-0 flex-1">
        <p
          className="text-[15px] leading-[1.6] text-[#0c0c0c] sm:text-base sm:leading-[1.65] lg:line-clamp-6"
          style={{ color: INK }}
        >
          &ldquo;{slide.quote}&rdquo;
        </p>
      </blockquote>
      <div
        className="grid shrink-0 grid-cols-2 gap-x-6 gap-y-4 border-t border-black/10 pt-5"
        aria-label="Project impact metrics"
      >
        {metrics.map((metric) => (
          <AnimatedMetric
            key={`${slide.id}-${metric.label}`}
            {...metric}
            animateKey={slide.id}
            variant="light"
          />
        ))}
      </div>
      <p
        className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em]"
        style={{ color: MUTED }}
      >
        {String(slideIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
    </div>
  );
}

function BuildingPhoto({
  slide,
  opacity,
  scale,
}: {
  slide: TestimonialSlide;
  opacity: number;
  scale: number;
}) {
  if (opacity <= 0.01) return null;
  return (
    <div
      className="absolute inset-0 will-change-[opacity,transform]"
      style={{
        opacity,
        transform: `scale(${scale})`,
        transition: `opacity 700ms ${EASE_OUT}, transform 900ms ${EASE_OUT}`,
      }}
    >
      <Image
        src={buildingImage(slide)}
        alt={slide.imageAlt ?? "Corporate building"}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 25vw, 50vw"
      />
    </div>
  );
}

function CrossfadeLayer({
  outgoing,
  incoming,
  crossfade,
  outgoingIndex,
  incomingIndex,
  render,
  minHeightClass = "min-h-[7.5rem]",
}: {
  outgoing: TestimonialSlide;
  incoming: TestimonialSlide;
  crossfade: number;
  outgoingIndex: number;
  incomingIndex: number;
  render: (slide: TestimonialSlide, slideIndex: number) => React.ReactNode;
  minHeightClass?: string;
}) {
  const outOpacity = 1 - crossfade;
  const inOpacity = crossfade;

  if (crossfade <= 0.001) {
    return (
      <div className={`flex w-full flex-col ${minHeightClass}`}>
        {render(incoming, incomingIndex)}
      </div>
    );
  }

  return (
    <div className={`relative w-full ${minHeightClass}`}>
      <div
        className="absolute inset-0 flex w-full flex-col"
        style={{ opacity: outOpacity, transition: `opacity 600ms ${EASE_OUT}` }}
      >
        {render(outgoing, outgoingIndex)}
      </div>
      <div
        className="absolute inset-0 flex w-full flex-col"
        style={{ opacity: inOpacity, transition: `opacity 600ms ${EASE_OUT}` }}
      >
        {render(incoming, incomingIndex)}
      </div>
    </div>
  );
}

type RotatingCellProps = {
  children: React.ReactNode;
  ditherIntensity: number;
  variant: "light" | "dark";
  className?: string;
};

function RotatingCell({ children, ditherIntensity, variant, className }: RotatingCellProps) {
  return (
    <article className={`relative overflow-hidden ${className ?? ""}`}>
      <div className="h-full w-full">{children}</div>
      <DitherOverlay intensity={ditherIntensity} variant={variant} />
    </article>
  );
}

export default function SuccessStoriesBentoSection() {
  const slides = homepageTestimonials;
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [ditherIntensity, setDitherIntensity] = useState(0);
  const [crossfade, setCrossfade] = useState(0);
  const transitioningRef = useRef(false);
  const activeRef = useRef(0);
  const reduceMotion = useReducedMotion();

  activeRef.current = activeIndex;

  const outgoing = slides[prevIndex] ?? slides[0];
  const incoming = slides[activeIndex] ?? slides[0];

  const advance = useCallback(async () => {
    if (transitioningRef.current || slides.length < 2) return;
    transitioningRef.current = true;
    setPrevIndex(activeRef.current);

    await runSmoothTransition(
      ({ dither, crossfade: cf }: TransitionProgress) => {
        setDitherIntensity(dither);
        setCrossfade(cf);
      },
      () => {
        setActiveIndex((i) => {
          const next = (i + 1) % slides.length;
          activeRef.current = next;
          return next;
        });
      },
      !!reduceMotion,
    );

    setPrevIndex(activeRef.current);
    setCrossfade(0);
    setDitherIntensity(0);
    transitioningRef.current = false;
  }, [slides.length, reduceMotion]);

  useEffect(() => {
    slides.forEach((s) => {
      if (s.image) {
        const img = new window.Image();
        img.src = s.image;
      }
      if (s.logo) {
        const img = new window.Image();
        img.src = s.logo;
      }
    });
  }, [slides]);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => void advance(), TESTIMONIAL_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [advance, slides.length]);

  if (!incoming) return null;

  const outScale = 1 + crossfade * 0.04;
  const inScale = 1.05 - crossfade * 0.05;

  return (
    <section
      id="success-stories"
      aria-labelledby="success-stories-heading"
      className="border-b border-black/[0.06] px-4 py-0"
      style={{ backgroundColor: SURFACE }}
    >
      <div className="mx-auto grid max-w-[min(100vw-48px,1848px)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {/* Intro */}
        <article
          className={`relative flex ${CELL_MIN_H} flex-col justify-between gap-8 overflow-hidden rounded-sm border border-black/[0.08] bg-white p-6 sm:p-7 lg:p-8`}
        >
          <div
            className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 border border-black/[0.06]"
            style={{ transform: "rotate(-90deg)" }}
            aria-hidden
          />
          <div className="flex shrink-0 items-baseline gap-0.5">
            <span className="font-black uppercase leading-none tracking-[-0.04em] text-[#0c0c0c] text-[clamp(1.75rem,4vw,2.25rem)]">
              Softree
            </span>
            <span className="font-black leading-none text-[#0c0c0c] text-sm">®</span>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-6">
            <h2
              id="success-stories-heading"
              className="text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em] text-[#0c0c0c]"
            >
              Success
              <br />
              stories
            </h2>
            <p
              className="max-w-[26ch] text-sm leading-[1.55] sm:ml-auto sm:max-w-[220px] sm:text-right sm:text-[15px]"
              style={{ color: MUTED }}
            >
              Our work speaks for itself, but our clients say it even better.
            </p>
          </div>
        </article>

        {/* Identity + building */}
        <RotatingCell
          ditherIntensity={ditherIntensity}
          variant="dark"
          className={CELL_MIN_H}
        >
          <div className={`relative flex h-full ${CELL_MIN_H} flex-col`}>
            <div className="absolute inset-0 bg-[#141414]">
              {crossfade <= 0.001 ? (
                <BuildingPhoto slide={incoming} opacity={1} scale={1} />
              ) : (
                <>
                  <BuildingPhoto slide={outgoing} opacity={1 - crossfade} scale={outScale} />
                  <BuildingPhoto slide={incoming} opacity={crossfade} scale={inScale} />
                </>
              )}
              <div className="absolute inset-0" style={{ background: GRADIENT_OVERLAY }} />
            </div>
            <div className="relative z-10 mt-auto w-full">
              <CrossfadeLayer
                outgoing={outgoing}
                incoming={incoming}
                crossfade={crossfade}
                outgoingIndex={prevIndex}
                incomingIndex={activeIndex}
                minHeightClass="min-h-[9.5rem] sm:min-h-[10.5rem]"
                render={(slide) => <IdentityBlock slide={slide} />}
              />
            </div>
          </div>
        </RotatingCell>

        {/* Quote + metrics */}
        <RotatingCell
          ditherIntensity={ditherIntensity}
          variant="light"
          className={CELL_MIN_H}
        >
          <div
            className={`flex h-full ${CELL_MIN_H} flex-col p-6 sm:p-7 lg:p-8`}
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <CrossfadeLayer
              outgoing={outgoing}
              incoming={incoming}
              crossfade={crossfade}
              outgoingIndex={prevIndex}
              incomingIndex={activeIndex}
              minHeightClass="min-h-[320px] sm:min-h-[360px]"
              render={(slide, idx) => (
                <QuoteBlock slide={slide} slideIndex={idx} total={slides.length} />
              )}
            />
          </div>
        </RotatingCell>

        {/* Read all */}
        <article
          className={`relative flex ${CELL_MIN_H} flex-col justify-between gap-6 overflow-hidden rounded-sm border border-black/[0.08] bg-white p-6 sm:p-7 lg:p-8`}
        >
          <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: MUTED }}>
            Client voices
          </p>
          <Link
            href="#client-testimonials"
            className="group mt-auto inline-flex flex-col gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F9452D]"
          >
            <span
              className="text-[clamp(2rem,4.5vw,3rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em] transition-colors duration-300 group-hover:text-[#F9452D]"
              style={{ color: INK }}
            >
              Read
              <br />
              all
            </span>
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition-all duration-300 group-hover:border-[#F9452D] group-hover:bg-[#F9452D] group-hover:text-white"
              aria-hidden
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </article>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Showing testimonial from {incoming.name}, {incoming.company ?? slideDesignation(incoming)}
      </p>
    </section>
  );
}
