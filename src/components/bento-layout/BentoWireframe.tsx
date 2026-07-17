"use client";

import Link from "next/link";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StoryReel } from "@/components/story-reel";
import type { BentoWireframeProps, CaseStudyMock } from "./bento.types";
import { BENTO_SPRING, BENTO_VIEWPORT, scrollReveal } from "./bento.motion";
import { BentoPreviewPanel } from "./BentoPreviewPanel";
import { BentoIndexThumb } from "./BentoIndexThumb";
import { useBentoPreview } from "./useBentoPreview";

export type {
  BlogPostMock,
  CaseStudyMock,
  BentoMetric,
  BentoWireframeProps,
} from "./bento.types";

function ScrollReveal({
  children,
  className,
  reduced,
  delay = 0,
  y = 14,
}: {
  children: React.ReactNode;
  className?: string;
  reduced: boolean;
  delay?: number;
  y?: number;
}) {
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={BENTO_VIEWPORT}
      variants={scrollReveal(reduced, { delay, y })}
    >
      {children}
    </motion.div>
  );
}

function CaseStudyRow({
  study,
  index,
  isActive,
  reduced,
  variant = "default",
  onHover,
  onFocus,
}: {
  study: CaseStudyMock;
  index: number;
  isActive: boolean;
  reduced: boolean;
  variant?: "default" | "homepage-light";
  onHover: (id: string) => void;
  onFocus: (id: string) => void;
}) {
  const delay = Math.min(index * 0.05, 0.25);
  const isHome = variant === "homepage-light";
  const rowClass = cn(
    "group relative flex w-full items-start gap-4 py-4 text-left transition-colors duration-200 md:py-5",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF5812]",
    isHome
      ? isActive
        ? "bg-[#F3F0EE] pl-3"
        : "hover:bg-[#F3F0EE]/70"
      : isActive
        ? "bg-white pl-3"
        : "hover:bg-white/70",
  );

  const motionProps = reduced
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: BENTO_VIEWPORT,
        variants: scrollReveal(reduced, { delay, y: 12, x: -6 }),
      };

  const inner = (
    <>
      {isActive && !reduced ? (
        <motion.span
          layoutId="bento-active-rail"
          className="absolute bottom-2 left-0 top-2 w-[2px] rounded-full bg-[#FF5812]"
          transition={BENTO_SPRING}
          aria-hidden
        />
      ) : isActive ? (
        <span className="absolute bottom-2 left-0 top-2 w-[2px] rounded-full bg-[#FF5812]" aria-hidden />
      ) : null}

      <BentoIndexThumb
        src={study.image}
        alt={study.title}
        className="h-14 w-14 md:h-16 md:w-16"
      />

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block text-[10px] font-semibold uppercase tracking-[0.12em]",
            isActive
              ? "text-[#FF5812]"
              : isHome
                ? "text-[#0a0a1a]/50"
                : "text-[#787774]",
          )}
        >
          {study.category}
        </span>
        <span
          className={cn(
            "mt-1 block text-pretty text-[15px] font-medium leading-snug tracking-[-0.02em]",
            isActive
              ? "text-[#0a0a1a]"
              : isHome
                ? "text-[#0a0a1a]/75 group-hover:text-[#0a0a1a]"
                : "text-[#2F3437] group-hover:text-[#111111]",
          )}
        >
          {study.title}
        </span>
      </span>

      <span
        className={cn(
          "absolute right-[-24px] top-1/2 -translate-y-1/2 text-lg leading-none transition-all duration-200",
          isActive
            ? "translate-x-1 text-[#0a0a1a] opacity-100"
            : isHome
              ? "text-[#0a0a1a]/25 group-hover:translate-x-1 group-hover:text-[#0a0a1a] group-hover:opacity-100"
              : "text-[#C4C4C0] group-hover:translate-x-1 group-hover:text-[#111111]",
        )}
        aria-hidden
      >
        →
      </span>
    </>
  );

  return (
    <motion.li
      className={cn(
        "border-b last:border-b-0",
        isHome ? "border-[#0a0a1a]/[0.06]" : "border-[#EAEAEA]",
      )}
      {...motionProps}
    >
      {study.href ? (
        <Link
          href={study.href}
          className={rowClass}
          onMouseEnter={() => onHover(study.id)}
          onFocus={() => onFocus(study.id)}
          aria-current={isActive ? "true" : undefined}
        >
          {inner}
        </Link>
      ) : (
        <button
          type="button"
          className={rowClass}
          onMouseEnter={() => onHover(study.id)}
          onFocus={() => onFocus(study.id)}
          onClick={() => onFocus(study.id)}
          aria-current={isActive ? "true" : undefined}
        >
          {inner}
        </button>
      )}
    </motion.li>
  );
}

export function BentoWireframe({
  className,
  stories = [],
  caseStudies = [],
  viewAllHref = "/case-studies",
  variant = "default",
  hideIndexHeader = false,
}: BentoWireframeProps) {
  const isHome = variant === "homepage-light";
  const reduced = useReducedMotion() ?? false;
  const { active, select, selectImmediate } = useBentoPreview(caseStudies);

  const previewItem = active
    ? {
        id: active.id,
        title: active.title,
        category: active.category,
        image: active.image,
        href: active.href,
        ctaLabel: "Open case study",
      }
    : null;

  return (
    <section
      aria-label="Work index and previews"
      className={cn(
        "mx-auto w-full max-w-6xl p-4 md:p-7 lg:p-9",
        isHome
          ? "rounded-2xl border border-[#0a0a1a]/10 bg-white shadow-[0_8px_28px_-12px_rgba(10,10,26,0.08)]"
          : "rounded-xl border border-[#EAEAEA] bg-[#F7F6F3]",
        className,
      )}
    >
      {stories.length > 0 ? (
        <ScrollReveal reduced={reduced} y={18} className="mb-7 md:mb-9">
          <div
            className={cn(
              "overflow-hidden bg-[#111111]",
              isHome ? "rounded-2xl border border-[#0a0a1a]/10" : "rounded-lg border border-[#EAEAEA]",
            )}
          >
            <div className="aspect-[21/9] min-h-[12rem] w-full md:min-h-[14rem]">
              <StoryReel
                stories={stories}
                variant="softree"
                autoPlayInterval={5500}
                enableKeyboard={false}
                className="h-full w-full"
                minHeight="100%"
              />
            </div>
          </div>
        </ScrollReveal>
      ) : null}

      {caseStudies.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-10">
          <nav aria-label="Case study index">
            {!hideIndexHeader ? (
              <ScrollReveal reduced={reduced} delay={0.04}>
                <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#EAEAEA] pb-5">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#787774]">
                      Index / 2025
                    </p>
                    <h2 className="mt-2 font-serif text-[1.75rem] leading-[1.1] tracking-[-0.03em] text-[#111111] md:text-[2rem]">
                      Selected deliveries
                    </h2>
                  </div>
                  <Link
                    href={viewAllHref}
                    className="hidden rounded-md border border-[#111111] bg-[#111111] px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#333333] sm:inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812] focus-visible:ring-offset-2"
                  >
                    All work
                  </Link>
                </div>
              </ScrollReveal>
            ) : (
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.20em] text-[#0a0a1a]/45">
                Featured work
              </p>
            )}

            <LayoutGroup id="bento-index">
              <ol>
                {caseStudies.map((study, i) => (
                  <CaseStudyRow
                    key={study.id}
                    study={study}
                    index={i}
                    isActive={active?.id === study.id}
                    reduced={reduced}
                    variant={variant}
                    onHover={select}
                    onFocus={selectImmediate}
                  />
                ))}
              </ol>
            </LayoutGroup>
          </nav>

          <BentoPreviewPanel
            item={previewItem}
            reduced={reduced}
            accent="orange"
            className={isHome ? "rounded-2xl" : undefined}
          />
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-[#787774]">No case studies to display.</p>
      )}
    </section>
  );
}

export default BentoWireframe;
