/**
 * Type definitions for the StoryReel component.
 */

export interface Story {
  /** Unique identifier for the story slide */
  id: string;
  /** Background image URL (object-fit: cover) */
  image: string;
  /** Display date text (ISO or human-readable) */
  date: string;
  /** Story title (h2) */
  title: string;
  /** Story description paragraph */
  description: string;
  /** Softree variant: service line / category label */
  category?: string;
  /** Softree variant: optional outcome metric */
  metric?: string;
  /** Softree variant: CTA label */
  ctaLabel?: string;
  /** Softree variant: link target */
  href?: string;
}

export type StoryReelVariant = "default" | "softree";

export interface StoryReelProps {
  /** Array of stories to display in sequence */
  stories: Story[];
  /** Duration each story is shown (ms). Default: 5000 */
  autoPlayInterval?: number;
  /** Optional additional className on the root viewport */
  className?: string;
  /** Callback when active story changes */
  onStoryChange?: (index: number) => void;
  /** Register global arrow-key / space handlers. Default: true */
  enableKeyboard?: boolean;
  /** Minimum viewport height when parent has no explicit height */
  minHeight?: number | string;
  /** Visual system — `softree` enables homepage-grade typography and CTAs */
  variant?: StoryReelVariant;
}

export interface SoftreeStoryReelHeroProps {
  /** Defaults to SOFTREE_HOMEPAGE_STORIES */
  stories?: Story[];
  autoPlayInterval?: number;
  className?: string;
  /** Section eyebrow above the reel */
  eyebrow?: string;
  /** Section headline */
  headline?: string;
  /** Supporting copy under headline */
  subheadline?: string;
  /** Link for “view all work” */
  viewAllHref?: string;
  viewAllLabel?: string;
}
