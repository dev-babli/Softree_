import type { LucideIcon } from "lucide-react";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export interface CapabilityCardData {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  angle: number;
}

export interface HeroConfig {
  label: string;
  heading: { prefix: string; highlight: string; suffix: string };
  paragraph: string;
  ctaButtons: { primary: { text: string; href: string } };
  features: FeatureItem[];
  capabilities: CapabilityCardData[];
  /** Default: split (content | media). stacked = content above, media below. */
  layout?: "split" | "stacked";
  heroImage: string;
  /** Optional muted autoplay hero video (used when set). */
  heroVideo?: string;
  /** Extra classes for video/image object-fit (e.g. crop watermarks). */
  heroMediaClass?: string;
  /**
   * Stacked hero copy color.
   * - dark: navy text on light videos
   * - light: white text on dark videos (e.g. financial)
   */
  textTone?: "dark" | "light";
  /** Soft radial white glow behind copy (busy light videos, e.g. logistics). */
  softGlow?: boolean;
  panelLabel: string;
  panelChips: string[];
  panelCaption: string;
  panelSubcaption: string;
}

export interface SectionCopy {
  badge: string;
  title: string;
  highlight: string;
  description: string;
}

export interface CoreCapabilityItem {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string; stroke?: number }>;
  color: string;
  image: string;
  description: string;
  highlights: { title: string; desc: string; icon: React.ComponentType<{ className?: string; stroke?: number }> }[];
  illustration: string;
  kpis: { label: string; value: string }[];
}

export interface ChallengeItem {
  id: number;
  title: string;
  icon: string;
}

export interface SolutionItem {
  id: number;
  title: string;
  icon: string;
}

export interface OutcomeStep {
  step: string;
  leftCard: { title: string; points: string[] };
  rightCard: { title: string; points: string[] };
}

export interface ProvenResultItem {
  category: string;
  title: string;
  challenge: string;
  solution: string;
  outcome: string;
  metric: string;
  metricLabel: string;
}

export interface UseCaseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  image?: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  /** Delivery Process step visual (unique per step). */
  image?: string;
}

export interface FAQItem {
  id: number;
  serial: string;
  question: string;
  answer: string;
}

export interface SuccessStory {
  id: string;
  industryLabel: string;
  title: string;
  problem: string;
  solution: string;
  results: string[];
  icon: string;
  color: string;
  caseStudyUrl: string;
  image?: string;
  clientOverview: {
    name: string;
    industry: string;
    country: string;
    organizationSize: string;
    businessType: string;
  };
}

export interface IndustryPageConfig {
  slug: string;
  metadata: { title: string; description: string };
  hero: HeroConfig;
  sections: {
    successStories: SectionCopy;
    coreCapabilities: SectionCopy;
    businessChallenges: SectionCopy;
    businessOutcomes: SectionCopy;
    provenResults: SectionCopy;
    useCases: SectionCopy;
    techStack: SectionCopy;
    howItWorks: SectionCopy;
    faq: SectionCopy;
  };
  challengesColumnLabel?: string;
  solutionsColumnLabel?: string;
  coreCapabilities: CoreCapabilityItem[];
  businessChallenges: ChallengeItem[];
  aiSolutions: SolutionItem[];
  businessOutcomes: OutcomeStep[];
  provenResults: ProvenResultItem[];
  useCases: UseCaseItem[];
  workflowSteps: WorkflowStep[];
  faqs: FAQItem[];
  successStories: SuccessStory[];
}
