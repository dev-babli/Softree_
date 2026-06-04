import type { Story } from "@/components/story-reel";

export interface CaseStudyMock {
  id: string;
  title: string;
  category: string;
  image: string;
  href?: string;
}

/** Blog card for `BentoGridLayout` */
export interface BlogPostMock {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
  excerpt?: string;
  publishedAt?: string;
}

export interface BentoMetric {
  value: string;
  label: string;
}

export interface BentoWireframeProps {
  className?: string;
  stories?: Story[];
  caseStudies?: CaseStudyMock[];
  viewAllHref?: string;
  metrics?: BentoMetric[];
  /** Homepage About design language — white card on cream band */
  variant?: "default" | "homepage-light";
  /** Hide inner index headline when the parent renders `SectionHeader` */
  hideIndexHeader?: boolean;
}

export interface BentoGridLayoutProps {
  className?: string;
  /** Optional — off by default for blog pages */
  stories?: Story[];
  posts?: BlogPostMock[];
  viewAllHref?: string;
  viewAllLabel?: string;
  eyebrow?: string;
  headline?: string;
  description?: string;
  /** Embed story reel above the index (usually false on /blog) */
  showStoryReel?: boolean;
}
