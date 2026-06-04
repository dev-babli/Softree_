"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TestimonialBrandPanel } from "./TestimonialBrandPanel";
import type { TestimonialSlide } from "./testimonial-slider.types";

const EASE = [0.32, 0.72, 0, 1] as const;

function GoldStars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#F59E0B"
          stroke="#F59E0B"
          strokeWidth="1"
          aria-hidden
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function NavArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-md transition-[transform,box-shadow,border-color] duration-300 hover:border-zinc-300 hover:shadow-lg active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--softree-accent)] focus-visible:ring-offset-2",
        isPrev ? "-left-3 md:-left-5" : "-right-3 md:-right-5",
      )}
      aria-label={isPrev ? "Previous testimonial" : "Next testimonial"}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {isPrev ? (
          <polyline points="15,18 9,12 15,6" />
        ) : (
          <polyline points="9,18 15,12 9,6" />
        )}
      </svg>
    </button>
  );
}

export function SoftreeLightTestimonialSlider({
  slides,
  eyebrowLabel = "Client stories",
  className,
  onSlideChange,
}: {
  slides: TestimonialSlide[];
  eyebrowLabel?: string;
  className?: string;
  onSlideChange?: (index: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, slides.length - 1));
      setActiveIndex(clamped);
      onSlideChange?.(clamped);
    },
    [slides.length, onSlideChange],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex < slides.length - 1 ? activeIndex + 1 : 0);
  }, [activeIndex, slides.length, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex > 0 ? activeIndex - 1 : slides.length - 1);
  }, [activeIndex, slides.length, goTo]);

  const slide = slides[activeIndex];
  if (!slide) return null;

  const subtitle = [slide.company, slide.location].filter(Boolean).join(" · ");

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--softree-accent)]">
            {eyebrowLabel}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
            Trusted by teams who ship
          </h2>
        </div>
        <p className="text-sm text-zinc-500">
          {activeIndex + 1} of {slides.length}
        </p>
      </div>

      <div className="relative px-2 md:px-6">
        <NavArrow direction="prev" onClick={goPrev} />
        <NavArrow direction="next" onClick={goNext} />

        <article className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_4px_40px_-12px_rgba(15,23,42,0.1)]">
          <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(220px,0.85fr)]">
            <div className="flex flex-col justify-between gap-8 p-6 md:p-10 lg:p-12">
              <div>
                <GoldStars count={slide.rating ?? 5} />

                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={slide.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="mt-5 text-pretty text-lg font-medium leading-[1.55] tracking-[-0.02em] text-zinc-800 md:text-xl lg:text-[1.35rem]"
                  >
                    <span
                      className="mr-1 font-serif text-3xl leading-none text-[var(--softree-accent)]/70 md:text-4xl"
                      aria-hidden
                    >
                      &ldquo;
                    </span>
                    {slide.quote}
                    <span className="font-serif text-[var(--softree-accent)]/70" aria-hidden>
                      &rdquo;
                    </span>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.footer
                  key={`foot-${slide.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4 border-t border-zinc-100 pt-6"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--softree-accent-soft)] text-sm font-bold text-[var(--softree-accent)] ring-1 ring-[var(--softree-accent)]/20"
                    aria-hidden
                  >
                    {initials(slide.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold tracking-tight text-zinc-900">{slide.name}</p>
                    {subtitle ? (
                      <p className="mt-0.5 text-sm text-zinc-500">{subtitle}</p>
                    ) : null}
                  </div>
                </motion.footer>
              </AnimatePresence>
            </div>

            <div className="border-t border-zinc-100 p-4 md:border-t-0 md:border-l md:p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`brand-${slide.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="h-full min-h-[200px] md:min-h-[280px]"
                >
                  <TestimonialBrandPanel slide={slide} theme="light" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === activeIndex
                ? "w-7 bg-[var(--softree-accent)]"
                : "w-2 bg-zinc-300 hover:bg-zinc-400",
            )}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
