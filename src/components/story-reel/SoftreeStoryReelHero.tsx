"use client";

import Link from "next/link";
import { StoryReel } from "./StoryReel";
import { SOFTREE_HOMEPAGE_STORIES } from "./softree-story-content";
import type { SoftreeStoryReelHeroProps } from "./story-reel.types";

const DEFAULT_EYEBROW = "What we deliver";
const DEFAULT_HEADLINE = "Recent work across our practice";
const DEFAULT_VIEW_ALL = "All case studies";

/**
 * Compact Softree story reel — fits as a homepage section, not a second hero.
 */
export function SoftreeStoryReelHero({
  stories = SOFTREE_HOMEPAGE_STORIES,
  autoPlayInterval = 5500,
  className,
  eyebrow = DEFAULT_EYEBROW,
  headline = DEFAULT_HEADLINE,
  subheadline,
  viewAllHref = "/case-studies",
  viewAllLabel = DEFAULT_VIEW_ALL,
}: SoftreeStoryReelHeroProps) {
  return (
    <section
      id="delivery-reel"
      className={`bg-[var(--softree-bg-dark,#0a0a0a)] ${className ?? ""}`}
      aria-labelledby="softree-story-reel-heading"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-6 md:py-14">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--softree-accent)]">
              {eyebrow}
            </p>
            <h2
              id="softree-story-reel-heading"
              className="text-xl font-semibold tracking-tight text-white md:text-2xl"
            >
              {headline}
            </h2>
            {subheadline ? (
              <p className="mt-2 max-w-xl text-sm text-white/50">{subheadline}</p>
            ) : null}
          </div>
          <Link
            href={viewAllHref}
            className="text-sm font-semibold text-[var(--softree-accent)] transition-opacity hover:opacity-80"
          >
            {viewAllLabel} →
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
          <StoryReel
            stories={stories}
            variant="softree"
            autoPlayInterval={autoPlayInterval}
            minHeight="min(42dvh, 480px)"
            enableKeyboard
          />
        </div>
      </div>
    </section>
  );
}

export default SoftreeStoryReelHero;
