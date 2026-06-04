"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SOFTREE_STORY_REEL_TOKENS as S } from "./softree-story-reel.tokens";
import type { Story } from "./story-reel.types";
import { StoryCoverImage } from "./StoryCoverImage";

const SLIDE_EASE = [0.32, 0.72, 0, 1] as const;

export function formatStoryDate(value: string) {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(parsed));
}

export function SoftreeStoryBackground({
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
        animate={reduced || !isActive ? { scale: 1 } : { scale: [1, 1.05] }}
        transition={reduced ? { duration: 0 } : { duration: 6.2, ease: "linear" }}
      >
        <StoryCoverImage src={story.image} className="h-full w-full object-cover" />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{ background: S.colors.gradientOverlay }}
      />
      {S.colors.vignette !== "none" ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: S.colors.vignette }}
        />
      ) : null}
    </div>
  );
}

export function SoftreeStoryProgressBar({
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
  const transition =
    isActive && !isCompleted ? "none" : S.transitions.progressWidth;

  return (
    <button
      type="button"
      className="h-1 min-w-0 flex-1 cursor-pointer overflow-hidden rounded-full transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--softree-accent)]"
      style={{
        backgroundColor: S.colors.bgProgressTrack,
        opacity: isActive ? 1 : 0.65,
      }}
      onClick={() => onClick(index)}
      aria-label={`Go to story ${index + 1}`}
      aria-current={isActive ? "step" : undefined}
    >
      <span
        className="block h-full rounded-full"
        style={{
          width: `${fillWidth}%`,
          backgroundColor: S.colors.bgProgressFill,
          transition,
        }}
      />
    </button>
  );
}

export function SoftreeStoryControls({
  isPaused,
  onTogglePause,
}: {
  isPaused: boolean;
  onTogglePause: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onTogglePause}
      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--softree-accent)]"
      aria-label={isPaused ? "Play stories" : "Pause stories"}
    >
      {isPaused ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <polygon points="8,5 8,19 19,12" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <rect x="6" y="5" width="4" height="14" rx="0.5" />
          <rect x="14" y="5" width="4" height="14" rx="0.5" />
        </svg>
      )}
    </button>
  );
}

export function SoftreeStoryNavButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 z-20 hidden h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white opacity-70 transition-opacity hover:opacity-100 md:flex ${
        isLeft ? "left-3" : "right-3"
      }`}
      aria-label={isLeft ? "Previous story" : "Next story"}
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
        {isLeft ? (
          <polyline points="15,18 9,12 15,6" />
        ) : (
          <polyline points="9,18 15,12 9,6" />
        )}
      </svg>
    </button>
  );
}

function StoryCta({ story }: { story: Story }) {
  const label = story.ctaLabel ?? "Explore case study";
  const href = story.href ?? "/case-studies";

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--softree-accent)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--softree-accent)]"
    >
      {label}
      <span aria-hidden>→</span>
    </Link>
  );
}

export function SoftreeStoryContent({
  story,
  index,
  total,
}: {
  story: Story;
  index: number;
  total: number;
}) {
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: S.animation.contentStagger,
        delayChildren: 0.06,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.22 } },
  };

  const itemVariants = {
    hidden: (y: number) => ({ opacity: 0, y }),
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: S.animation.contentDuration,
        ease: S.animation.contentEase,
      },
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
        className="flex w-full flex-col"
        style={{
          gap: S.spacing.contentGap,
          maxWidth: S.spacing.contentMaxWidth,
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {story.category ? (
              <motion.span
                custom={6}
                variants={itemVariants}
                className="inline-flex items-center rounded-full border border-[var(--softree-accent)]/30 bg-[var(--softree-accent-soft)] px-2.5 py-0.5 uppercase text-[var(--softree-accent)]"
                style={{
                  fontFamily: S.typography.fontFamily,
                  fontSize: S.typography.eyebrow.fontSize,
                  fontWeight: S.typography.eyebrow.fontWeight,
                  letterSpacing: S.typography.eyebrow.letterSpacing,
                }}
              >
                {story.category}
              </motion.span>
            ) : null}
            <motion.time
              custom={8}
              variants={itemVariants}
              dateTime={story.date}
              className="text-white/55"
              style={{
                fontFamily: S.typography.fontFamily,
                fontSize: S.typography.date.fontSize,
                fontWeight: S.typography.date.fontWeight,
                letterSpacing: S.typography.date.letterSpacing,
              }}
            >
              {formatStoryDate(story.date)}
            </motion.time>
          </div>
          <motion.span
            custom={5}
            variants={itemVariants}
            className="tabular-nums text-white/35"
            style={{
              fontFamily: S.typography.fontFamily,
              fontSize: S.typography.counter.fontSize,
              fontWeight: S.typography.counter.fontWeight,
              letterSpacing: S.typography.counter.letterSpacing,
            }}
            aria-hidden
          >
            {counter}
          </motion.span>
        </div>

        <div className="flex flex-col" style={{ gap: S.spacing.textGap }}>
          <motion.h2
            custom={18}
            variants={itemVariants}
            className="text-pretty text-white"
            style={{
              fontFamily: S.typography.fontFamily,
              fontSize: S.typography.title.fontSize,
              fontWeight: S.typography.title.fontWeight,
              letterSpacing: S.typography.title.letterSpacing,
              lineHeight: S.typography.title.lineHeight,
            }}
          >
            {story.title}
          </motion.h2>

          <motion.p
            custom={14}
            variants={itemVariants}
            className="line-clamp-2 max-w-[32rem] text-pretty text-white/75"
            style={{
              fontFamily: S.typography.fontFamily,
              fontSize: S.typography.description.fontSize,
              fontWeight: S.typography.description.fontWeight,
              letterSpacing: S.typography.description.letterSpacing,
              lineHeight: S.typography.description.lineHeight,
            }}
          >
            {story.description}
          </motion.p>
        </div>

        <motion.div
          custom={12}
          variants={itemVariants}
          className="flex flex-wrap items-center gap-3"
        >
          <StoryCta story={story} />
          {story.metric ? (
            <span
              className="text-xs text-white/45"
              style={{ fontFamily: S.typography.fontFamily }}
            >
              {story.metric}
            </span>
          ) : null}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export { SLIDE_EASE };
