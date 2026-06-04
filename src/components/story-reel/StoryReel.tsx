"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { STORY_REEL_TOKENS as T } from "./story-reel.tokens";
import { useStoryReel } from "./useStoryReel";
import {
  SoftreeStoryBackground,
  SoftreeStoryContent,
  SoftreeStoryControls,
  SoftreeStoryNavButton,
  SoftreeStoryProgressBar,
  SLIDE_EASE as SOFTREE_SLIDE_EASE,
  formatStoryDate,
} from "./StoryReelSoftreeParts";
import type { Story, StoryReelProps } from "./story-reel.types";
import { StoryCoverImage } from "./StoryCoverImage";

const DEFAULT_INTERVAL = 5000;
const SLIDE_EASE = [0.22, 1, 0.36, 1] as const;

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="8,5 8,19 19,12" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="15,18 9,12 15,6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="9,18 15,12 9,6" />
    </svg>
  );
}

function DefaultStoryBackground({
  story,
  isActive,
  reduced,
}: {
  story: Story;
  isActive: boolean;
  reduced: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={reduced || !isActive ? { scale: 1 } : { scale: [1, 1.06] }}
        transition={reduced ? { duration: 0 } : { duration: 5.5, ease: "linear" }}
      >
        <StoryCoverImage src={story.image} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: T.colors.gradientOverlay }} />
    </div>
  );
}

function DefaultStoryProgressBar({
  isActive,
  isCompleted,
  progress,
  onClick,
  index,
}: {
  isActive: boolean;
  isCompleted: boolean;
  progress: number;
  onClick: (index: number) => void;
  index: number;
}) {
  const fillWidth = isCompleted ? 100 : isActive ? progress : 0;
  const transition = isActive && !isCompleted ? "none" : T.transitions.progressWidth;

  return (
    <div
      className="flex-1 cursor-pointer"
      style={{
        height: 4,
        backgroundColor: T.colors.bgProgressTrack,
        borderRadius: T.radius.progressBar,
      }}
      onClick={() => onClick(index)}
      role="button"
      aria-label={`Go to story ${index + 1}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(index);
        }
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${fillWidth}%`,
          backgroundColor: T.colors.bgProgressFill,
          borderRadius: T.radius.progressBar,
          transition,
        }}
      />
    </div>
  );
}

function DefaultStoryControls({
  isPaused,
  onTogglePause,
}: {
  isPaused: boolean;
  onTogglePause: () => void;
}) {
  return (
    <button
      onClick={onTogglePause}
      className="flex shrink-0 cursor-pointer items-center justify-center"
      style={{
        padding: 8,
        borderRadius: T.radius.button,
        backgroundColor: T.colors.bgGlass,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        border: "none",
        color: T.colors.textPrimary,
        opacity: 0.7,
        cursor: "pointer",
        transition: T.transitions.buttonOpacity,
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.opacity = "0.7";
      }}
      aria-label={isPaused ? "Play stories" : "Pause stories"}
      type="button"
    >
      {isPaused ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
}

function DefaultStoryCta({ story }: { story: Story }) {
  const href = story.href;
  if (!href) return null;
  const label = story.ctaLabel ?? "Learn more";

  return (
    <Link
      href={href}
      className="group mt-2 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-2 pl-5 pr-2 text-sm font-semibold text-white backdrop-blur-sm transition-[transform,background-color,border-color] duration-300 hover:border-[#FF5812]/50 hover:bg-white/15 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812] focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
    >
      <span>{label}</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF5812] text-white transition-transform duration-300 group-hover:translate-x-0.5">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </Link>
  );
}

function DefaultStoryContent({ story }: { story: Story }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: T.animation.contentStagger, delayChildren: 0.05 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: (custom: number) => ({ opacity: 0, y: custom }),
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: T.animation.contentDuration, ease: T.animation.contentEase },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={story.id}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col"
        style={{ gap: T.spacing.contentGap, willChange: "transform" }}
      >
        <div className="flex flex-col" style={{ gap: T.spacing.textGap }}>
          <motion.time
            custom={4.39473}
            variants={itemVariants}
            className="block"
            style={{
              fontFamily: T.typography.fontFamily,
              fontSize: T.typography.date.fontSize,
              fontWeight: T.typography.date.fontWeight,
              letterSpacing: T.typography.date.letterSpacing,
              lineHeight: T.typography.date.lineHeight,
              color: T.colors.textMuted,
              margin: 0,
            }}
            dateTime={story.date}
          >
            {formatStoryDate(story.date)}
          </motion.time>

          <motion.h2
            custom={7.53998}
            variants={itemVariants}
            className="text-pretty"
            style={{
              fontFamily: T.typography.fontFamily,
              fontSize: T.typography.title.fontSize,
              fontWeight: T.typography.title.fontWeight,
              letterSpacing: T.typography.title.letterSpacing,
              lineHeight: T.typography.title.lineHeight,
              color: T.colors.textPrimary,
              margin: 0,
            }}
          >
            {story.title}
          </motion.h2>

          <motion.p
            custom={11.9037}
            variants={itemVariants}
            className="text-pretty"
            style={{
              fontFamily: T.typography.fontFamily,
              fontSize: T.typography.description.fontSize,
              fontWeight: T.typography.description.fontWeight,
              letterSpacing: T.typography.description.letterSpacing,
              lineHeight: T.typography.description.lineHeight,
              color: T.colors.textPrimary,
              margin: 0,
            }}
          >
            {story.description}
          </motion.p>
        </div>

        <motion.div custom={14} variants={itemVariants}>
          <DefaultStoryCta story={story} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function DefaultStoryNavButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 z-20 flex cursor-pointer items-center justify-center"
      style={{
        [isLeft ? "left" : "right"]: T.spacing.controlsInset,
        transform: "translateY(-50%)",
        width: 25,
        height: 25,
        borderRadius: T.radius.button,
        backgroundColor: T.colors.bgGlass,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        border: "none",
        color: T.colors.textPrimary,
        opacity: 0.7,
        transition: T.transitions.buttonOpacity,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.opacity = "0.7";
      }}
      aria-label={isLeft ? "Previous story" : "Next story"}
      type="button"
    >
      {isLeft ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );
}

export function StoryReel({
  stories,
  autoPlayInterval = DEFAULT_INTERVAL,
  className,
  onStoryChange,
  enableKeyboard = true,
  minHeight = "min(72dvh, 640px)",
  variant = "default",
}: StoryReelProps) {
  const reduced = useReducedMotion() ?? false;
  const isSoftree = variant === "softree";

  const {
    activeIndex,
    isPaused,
    progress,
    slideDirection,
    setIsPaused,
    goNext,
    goPrev,
    jumpTo,
    handleTouchStart,
    handleTouchEnd,
  } = useStoryReel(stories.length, autoPlayInterval, onStoryChange, enableKeyboard);

  const activeStory = stories[activeIndex];
  const slideEase = isSoftree ? SOFTREE_SLIDE_EASE : SLIDE_EASE;

  useEffect(() => {
    stories.forEach((s) => {
      const img = new window.Image();
      img.src = s.image;
    });
  }, [stories]);

  if (!activeStory) return null;

  const resolvedMinHeight =
    isSoftree && minHeight === "min(72dvh, 640px)"
      ? "min(42dvh, 480px)"
      : minHeight;

  const controlsInset = isSoftree ? 14 : T.spacing.controlsInset;
  const containerPadding = isSoftree ? 20 : T.spacing.containerPadding;

  return (
    <div
      className={cn("flex h-full w-full min-h-0 flex-col", className)}
      style={{ minHeight: resolvedMinHeight }}
    >
      <div
        className="relative min-h-0 flex-1 overflow-hidden"
        style={{ borderRadius: isSoftree ? 0 : T.radius.container }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label={isSoftree ? "Featured client work" : "Story reel"}
      >
        <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
          <motion.div
            key={activeStory.id}
            custom={slideDirection}
            className="absolute inset-0"
            variants={{
              initial: (dir: number) =>
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, x: dir * (isSoftree ? 56 : 40), scale: 1.05 },
              animate: { opacity: 1, x: 0, scale: 1 },
              exit: (dir: number) =>
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, x: dir * (isSoftree ? -36 : -28), scale: 1.02 },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: reduced ? 0.2 : isSoftree ? 0.58 : 0.48, ease: slideEase }}
          >
            {isSoftree ? (
              <SoftreeStoryBackground story={activeStory} isActive reduced={reduced} />
            ) : (
              <DefaultStoryBackground story={activeStory} isActive reduced={reduced} />
            )}
          </motion.div>
        </AnimatePresence>

        <div
          className="absolute z-20 flex items-center"
          style={{
            top: controlsInset,
            left: controlsInset,
            right: controlsInset,
            gap: isSoftree ? 10 : T.spacing.controlsGap,
          }}
        >
          <div
            className="flex flex-1"
            style={{ gap: isSoftree ? 6 : T.spacing.progressGap }}
          >
            {stories.map((_, i) =>
              isSoftree ? (
                <SoftreeStoryProgressBar
                  key={i}
                  index={i}
                  isActive={i === activeIndex}
                  isCompleted={i < activeIndex}
                  progress={progress}
                  onClick={jumpTo}
                />
              ) : (
                <DefaultStoryProgressBar
                  key={i}
                  index={i}
                  isActive={i === activeIndex}
                  isCompleted={i < activeIndex}
                  progress={progress}
                  onClick={jumpTo}
                />
              ),
            )}
          </div>
          {isSoftree ? (
            <SoftreeStoryControls
              isPaused={isPaused}
              onTogglePause={() => setIsPaused((p) => !p)}
            />
          ) : (
            <DefaultStoryControls
              isPaused={isPaused}
              onTogglePause={() => setIsPaused((p) => !p)}
            />
          )}
        </div>

        <div
          className="absolute inset-0 z-10 flex flex-col items-start justify-end"
          style={{ padding: containerPadding }}
        >
          {isSoftree ? (
            <SoftreeStoryContent
              story={activeStory}
              index={activeIndex}
              total={stories.length}
            />
          ) : (
            <DefaultStoryContent story={activeStory} />
          )}
        </div>

        {isSoftree ? (
          <>
            <SoftreeStoryNavButton direction="left" onClick={goPrev} />
            <SoftreeStoryNavButton direction="right" onClick={goNext} />
          </>
        ) : (
          <>
            <DefaultStoryNavButton direction="left" onClick={goPrev} />
            <DefaultStoryNavButton direction="right" onClick={goNext} />
          </>
        )}
      </div>
    </div>
  );
}

export default StoryReel;
