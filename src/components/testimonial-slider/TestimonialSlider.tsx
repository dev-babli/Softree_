"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TESTIMONIAL_TOKENS } from "./testimonial-slider.tokens";
import { SOFTREE_TESTIMONIAL_TOKENS } from "./softree-testimonial.tokens";
import { SoftreeLightTestimonialSlider } from "./SoftreeLightTestimonialSlider";
import { TestimonialBrandPanel } from "./TestimonialBrandPanel";
import type { TestimonialSlide, TestimonialSliderProps } from "./testimonial-slider.types";

type TokenSet = typeof TESTIMONIAL_TOKENS | typeof SOFTREE_TESTIMONIAL_TOKENS;

function StarIcon({ t }: { t: TokenSet }) {
  return (
    <svg
      width={t.sizes.starSvg}
      height={t.sizes.starSvg}
      viewBox="0 0 24 24"
      fill={t.colors.starFill}
      stroke={t.colors.starStroke}
      strokeWidth="2"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function PrevArrowIcon({ t }: { t: TokenSet }) {
  return (
    <svg
      width={t.sizes.navButtonSvg}
      height={t.sizes.navButtonSvg}
      viewBox="0 0 24 24"
      fill="none"
      stroke={t.colors.strokeButtonPrev}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function NextArrowIcon({ t }: { t: TokenSet }) {
  return (
    <svg
      width={t.sizes.navButtonSvg}
      height={t.sizes.navButtonSvg}
      viewBox="0 0 24 24"
      fill="none"
      stroke={t.colors.strokeButtonNext}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function Eyebrow({ label, t }: { label: string; t: TokenSet }) {
  return (
    <div
      className="flex items-center"
      style={{ gap: t.spacing.eyebrowGap, marginBottom: t.spacing.eyebrowMarginBottom }}
    >
      <span style={{ color: t.colors.textEyebrowIcon, fontSize: t.typography.eyebrowIcon.fontSize }}>
        ✦
      </span>
      <span
        style={{
          fontSize: t.typography.eyebrowLabel.fontSize,
          fontWeight: t.typography.eyebrowLabel.fontWeight,
          color: t.colors.textEyebrowLabel,
          letterSpacing: t.typography.eyebrowLabel.letterSpacing,
          textTransform: "uppercase",
          fontFamily: t.typography.systemFont,
          lineHeight: t.typography.eyebrowLabel.lineHeight,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function QuoteSection({
  quote,
  t,
  compact,
}: {
  quote: string;
  t: TokenSet;
  compact: boolean;
}) {
  return (
    <div
      className="relative flex shrink-0 items-start overflow-hidden"
      style={{
        minHeight: compact ? t.spacing.quoteHeight : t.spacing.quoteHeight,
        width: "100%",
      }}
    >
      {!compact ? (
        <div
          className="pointer-events-none absolute select-none"
          style={{
            top: t.spacing.quoteDecorativeTop,
            left: t.spacing.quoteDecorativeLeft,
            fontSize: t.typography.quoteDecorative.fontSize,
            lineHeight: t.typography.quoteDecorative.lineHeight,
            color: t.colors.textQuoteDecorative,
            fontFamily: t.typography.quoteDecorative.fontFamily,
            zIndex: 0,
          }}
        >
          &ldquo;
        </div>
      ) : null}

      <blockquote
        className="relative z-[1] w-full"
        style={{
          margin: 0,
          padding: 0,
          fontSize: t.typography.quoteBody.fontSize,
          fontWeight: t.typography.quoteBody.fontWeight,
          lineHeight: t.typography.quoteBody.lineHeight,
          color: t.colors.textQuoteBody,
          letterSpacing: t.typography.quoteBody.letterSpacing,
          fontFamily: t.typography.quoteFont,
          display: "-webkit-box",
          WebkitLineClamp: compact ? 4 : 5,
          WebkitBoxOrient: "vertical" as const,
          overflow: "hidden",
        }}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
    </div>
  );
}

function Divider({ t }: { t: TokenSet }) {
  return (
    <div
      style={{
        height: 1,
        background: t.colors.divider,
        marginTop: t.spacing.dividerMarginTop,
        marginBottom: t.spacing.dividerMarginBottom,
      }}
    />
  );
}

function StarRating({ t, count = 5 }: { t: TokenSet; count?: number }) {
  return (
    <div className="flex" style={{ gap: t.spacing.starGap, marginBottom: t.spacing.starMarginBottom }}>
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} t={t} />
      ))}
    </div>
  );
}

function Attribution({
  name,
  title,
  company,
  location,
  rating,
  t,
}: {
  name: string;
  title?: string;
  company?: string;
  location?: string;
  rating?: number;
  t: TokenSet;
}) {
  const subtitle = company
    ? [company, location].filter(Boolean).join(" · ")
    : title;

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <StarRating t={t} count={rating ?? 5} />
      <div
        style={{
          fontSize: t.typography.name.fontSize,
          fontWeight: t.typography.name.fontWeight,
          color: t.colors.textName,
          fontFamily: t.typography.systemFont,
          letterSpacing: t.typography.name.letterSpacing,
          lineHeight: t.typography.name.lineHeight,
        }}
      >
        {name}
      </div>
      {subtitle ? (
        <div
          style={{
            fontSize: t.typography.title.fontSize,
            color: t.colors.textTitle,
            fontFamily: t.typography.systemFont,
            marginTop: t.spacing.nameTitleGap,
            lineHeight: t.typography.title.lineHeight,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}

function Counter({
  current,
  total,
  t,
}: {
  current: number;
  total: number;
  t: TokenSet;
}) {
  return (
    <span
      className="tabular-nums"
      style={{
        fontSize: t.typography.counter.fontSize,
        fontWeight: 500,
        color: t.colors.textCounter,
        fontFamily: t.typography.systemFont,
        marginRight: t.spacing.counterMarginRight,
        minWidth: t.spacing.counterMinWidth,
        lineHeight: t.typography.counter.lineHeight,
      }}
    >
      {String(current).padStart(2, "0")}/{String(total).padStart(2, "0")}
    </span>
  );
}

function NavigationButtons({
  onPrev,
  onNext,
  t,
}: {
  onPrev: () => void;
  onNext: () => void;
  t: TokenSet;
}) {
  return (
    <div className="flex shrink-0 items-center" style={{ gap: t.spacing.navButtonGap }}>
      <button
        type="button"
        onClick={onPrev}
        className="flex cursor-pointer items-center justify-center transition-opacity hover:opacity-90"
        style={{
          width: t.sizes.navButton,
          height: t.sizes.navButton,
          borderRadius: t.radius.navButton,
          background: t.colors.bgButtonPrev,
          border: "none",
        }}
        aria-label="Previous testimonial"
      >
        <PrevArrowIcon t={t} />
      </button>
      <button
        type="button"
        onClick={onNext}
        className="flex cursor-pointer items-center justify-center transition-opacity hover:opacity-90"
        style={{
          width: t.sizes.navButton,
          height: t.sizes.navButton,
          borderRadius: t.radius.navButton,
          background: t.colors.bgButtonNext,
          border: "none",
        }}
        aria-label="Next testimonial"
      >
        <NextArrowIcon t={t} />
      </button>
    </div>
  );
}

function BottomProgressBar({ progress, t }: { progress: number; t: TokenSet }) {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        bottom: t.spacing.bottomProgressBottom,
        left: t.spacing.bottomProgressInset,
        right: t.spacing.bottomProgressInset,
        height: t.spacing.bottomProgressHeight,
        borderRadius: t.radius.progress,
        background: t.colors.bgProgressTrack,
      }}
    >
      <motion.div
        className="h-full"
        style={{
          borderRadius: t.radius.progress,
          background: t.colors.bgProgressFill,
          transformOrigin: "left center",
        }}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.4, ease: t.animation.slideEase }}
      />
    </div>
  );
}

function DotPagination({
  total,
  activeIndex,
  onDotClick,
  t,
}: {
  total: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
  t: TokenSet;
}) {
  return (
    <div
      className="absolute z-[3] flex"
      style={{
        bottom: t.spacing.dotPaginationBottom,
        left: "50%",
        transform: "translateX(-50%)",
        gap: t.spacing.dotPaginationGap,
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onDotClick(i)}
            className="cursor-pointer"
            style={{
              height: t.sizes.dotHeight,
              borderRadius: t.radius.dot,
              background: t.colors.dotBg,
              border: "none",
              padding: 0,
              width: isActive ? t.sizes.dotActiveWidth : t.sizes.dotInactiveWidth,
              opacity: isActive ? t.colors.dotOpacityActive : t.colors.dotOpacityInactive,
              transition: "width 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease",
            }}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={isActive ? "true" : undefined}
          />
        );
      })}
    </div>
  );
}

export function TestimonialSlider({
  slides,
  eyebrowLabel = "Client Stories",
  className,
  onSlideChange,
  variant = "softree",
}: TestimonialSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isSoftree = variant === "softree";
  const t: TokenSet = isSoftree ? SOFTREE_TESTIMONIAL_TOKENS : TESTIMONIAL_TOKENS;

  const softreeSizes = isSoftree
    ? (t.sizes as typeof SOFTREE_TESTIMONIAL_TOKENS.sizes)
    : null;

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

  if (isSoftree) {
    return (
      <SoftreeLightTestimonialSlider
        slides={slides}
        eyebrowLabel={eyebrowLabel}
        className={className}
        onSlideChange={onSlideChange}
      />
    );
  }

  const currentSlide = slides[activeIndex];
  if (!currentSlide) return null;

  const progress = (activeIndex + 1) / slides.length;

  const slideVariants = {
    hidden: { opacity: 0, y: isSoftree ? 8 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: t.animation.slideDuration, ease: t.animation.slideEase },
    },
    exit: {
      opacity: 0,
      y: isSoftree ? -6 : -8,
      transition: { duration: 0.2, ease: "easeIn" as const },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.03 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: t.animation.imageDuration, ease: t.animation.slideEase },
    },
    exit: { opacity: 0, transition: { duration: 0.22 } },
  };

  return (
    <div
      className={cn("w-full", className)}
      style={isSoftree ? undefined : { minHeight: "100vh" }}
    >
      <div
        className={cn(
          "relative flex overflow-hidden ring-1 ring-white/10",
          isSoftree ? "min-h-[320px] flex-col md:min-h-0 md:flex-row" : "min-h-0 flex-1 flex-row",
        )}
        style={{
          background: t.colors.bgCard,
          borderRadius: t.radius.card,
          ...(isSoftree && softreeSizes
            ? { minHeight: softreeSizes.cardMinHeight }
            : { flex: 1 }),
        }}
      >
        {/* Quote panel */}
        <div
          className={cn(
            "relative flex min-w-0 flex-col",
            isSoftree ? "order-2 md:order-1" : "",
          )}
          style={{
            flex: t.sizes.leftPanelFlex,
            paddingTop: t.spacing.cardPaddingTop,
            paddingRight: t.spacing.cardPaddingRight,
            paddingBottom: t.spacing.cardPaddingBottom,
            paddingLeft: t.spacing.cardPaddingLeft,
          }}
        >
          <Eyebrow label={eyebrowLabel} t={t} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <QuoteSection quote={currentSlide.quote} t={t} compact={isSoftree} />
            </motion.div>
          </AnimatePresence>

          <Divider t={t} />

          <div
            className="flex items-center"
            style={{ gap: t.spacing.attributionGap, justifyContent: "space-between" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`attr-${currentSlide.id}`}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="min-w-0 flex-1"
              >
                <Attribution
                  name={currentSlide.name}
                  title={currentSlide.title}
                  company={currentSlide.company}
                  location={currentSlide.location}
                  rating={currentSlide.rating}
                  t={t}
                />
              </motion.div>
            </AnimatePresence>

            <div className="flex shrink-0 items-center" style={{ gap: t.spacing.navButtonGap }}>
              <Counter current={activeIndex + 1} total={slides.length} t={t} />
              <NavigationButtons onPrev={goPrev} onNext={goNext} t={t} />
            </div>
          </div>

          <BottomProgressBar progress={progress} t={t} />
        </div>

        {/* Image panel */}
        <div
          className={cn(
            "relative min-h-[200px] flex-1 overflow-hidden",
            isSoftree ? "order-1 md:order-2" : "",
          )}
          style={{
            borderRadius: t.radius.imagePanel,
            background: t.colors.bgImageWrapper,
            marginTop: t.spacing.imagePanelMarginTop,
            marginRight: t.spacing.imagePanelMarginRight,
            marginBottom: t.spacing.imagePanelMarginBottom,
            marginLeft: t.spacing.imagePanelMarginLeft,
            ...(isSoftree && softreeSizes
              ? { minHeight: softreeSizes.imageMinHeight }
              : {}),
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${currentSlide.id}`}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0"
            >
              {isSoftree || currentSlide.logo ? (
                <TestimonialBrandPanel slide={currentSlide} />
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentSlide.image ?? ""}
                    alt={currentSlide.imageAlt || currentSlide.name}
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: t.colors.imageGradient }}
                  />
                </>
              )}
            </motion.div>
          </AnimatePresence>
          <DotPagination total={slides.length} activeIndex={activeIndex} onDotClick={goTo} t={t} />
        </div>
      </div>
    </div>
  );
}

export default TestimonialSlider;
