"use client";

import NavigationClient from "@/components/sections/navigation-client";
import type { DesignTokenSettings } from "@/lib/design-tokens";
import type {
  SanityNavCategory,
  SanityNavCaseStudyCategory,
} from "@/sanity/types";
import Footer from "@/components/sections/footer";
import {
  isPremiumLayout,
  type CaseStudyDetailLayout,
} from "@/lib/case-study-layouts";
import {
  mapCaseStudyToLayoutData,
  type SanityCaseStudyDoc,
} from "@/components/case-studies/layouts/mapCaseStudyData";
import type { CaseStudyLayoutData, RelatedStudy } from "@/components/case-studies/layouts/types";
import { ParallaxScreenshotsLayout } from "@/components/case-studies/layouts/variants/ParallaxScreenshotsLayout";
import { SynqLabProductStoryLayout } from "@/components/case-studies/layouts/variants/SynqLabProductStoryLayout";
import { AIHorizontalStoryLayout } from "@/components/case-studies/layouts/variants/AIHorizontalStoryLayout";
import { NeutrinoDashboardStoryLayout } from "@/components/case-studies/layouts/variants/NeutrinoDashboardStoryLayout";
import { MadarStickyStoryLayout } from "@/components/case-studies/layouts/variants/madar-sticky-story";
import { EducationEdTechStoryLayout } from "./layouts/variants/education-edtech-story/EducationEdTechStoryLayout";
import { NexoraProductStoryLayout } from "@/components/case-studies/layouts/variants/NexoraProductStoryLayout";
import { PayFlowFintechStoryLayout } from "@/components/case-studies/layouts/variants/PayFlowFintechStoryLayout";
import { SidebarMetadataLayout } from "@/components/case-studies/layouts/variants/SidebarMetadataLayout";
import { SplitHeroMockupLayout } from "@/components/case-studies/layouts/variants/SplitHeroMockupLayout";
import { ZigzagAlternatingLayout } from "@/components/case-studies/layouts/variants/ZigzagAlternatingLayout";
import { VerticalTimelineLayout } from "@/components/case-studies/layouts/variants/VerticalTimelineLayout";
import { TabbedDeliverablesLayout } from "@/components/case-studies/layouts/variants/TabbedDeliverablesLayout";
import { BentoResultsLayout } from "@/components/case-studies/layouts/variants/BentoResultsLayout";
import { VideoHeroLayout } from "@/components/case-studies/layouts/variants/VideoHeroLayout";
import { BeforeAfterTableLayout } from "@/components/case-studies/layouts/variants/BeforeAfterTableLayout";
import { StatsDashboardLayout } from "@/components/case-studies/layouts/variants/StatsDashboardLayout";
import { PageComposerLayout } from "@/components/case-studies/layouts/variants/PageComposerLayout";
import type { CaseStudyComposerSection } from "@/components/case-studies/composer/types";
import TransformationEpicLayout from "@/components/case-studies/layouts/archetypes/TransformationEpicLayout";
import ProductShowcaseLayout from "@/components/case-studies/layouts/archetypes/ProductShowcaseLayout";
import StandardStoryLayout from "@/components/case-studies/layouts/archetypes/StandardStoryLayout";

const PREMIUM_LAYOUTS: Record<
  Exclude<CaseStudyDetailLayout, "page-composer">,
  React.ComponentType<{ data: CaseStudyLayoutData }>
> = {
  "manufacturing-power-platform": EducationEdTechStoryLayout,
  "sidebar-metadata": SidebarMetadataLayout,
  "split-hero-mockup": SplitHeroMockupLayout,
  "zigzag-alternating": ZigzagAlternatingLayout,
  "vertical-timeline": VerticalTimelineLayout,
  "tabbed-deliverables": TabbedDeliverablesLayout,
  "bento-results": BentoResultsLayout,
  "video-hero": VideoHeroLayout,
  "before-after-table": BeforeAfterTableLayout,
  "stats-dashboard": StatsDashboardLayout,
  "parallax-screenshots": ParallaxScreenshotsLayout,
  "nexora-product-story": NexoraProductStoryLayout,
  "synqlab-product-story": SynqLabProductStoryLayout,
  "payflow-fintech-story": PayFlowFintechStoryLayout,
  "ai-horizontal-story": AIHorizontalStoryLayout,
  "neutrino-dashboard-story": NeutrinoDashboardStoryLayout,
  "madar-sticky-story": MadarStickyStoryLayout,
  "education-edtech-story": EducationEdTechStoryLayout,
};

/** Premium layouts that ship their own FAQ + contact block */
const SELF_CONTAINED_PREMIUM: CaseStudyDetailLayout[] = ["page-composer"];

type StudyDoc = SanityCaseStudyDoc & {
  storyType?: "standard" | "transformation" | "product-showcase";
  detailLayout?: string;
  composerSections?: CaseStudyComposerSection[];
};

export function CaseStudyPageRenderer({
  study,
  related,
  slug,
  initialBlogCategories,
  initialCaseStudyCategories,
  designTokens,
}: {
  study: StudyDoc;
  related: RelatedStudy[];
  slug: string;
  initialBlogCategories?: SanityNavCategory[];
  initialCaseStudyCategories?: SanityNavCaseStudyCategory[];
  designTokens?: DesignTokenSettings | null;
}) {
  const detailLayout = isPremiumLayout(study.detailLayout)
    ? study.detailLayout
    : "education-edtech-story";

  if (detailLayout) {
    const data = mapCaseStudyToLayoutData(study, related, detailLayout);

    if (detailLayout === "page-composer") {
      return (
        <div className="min-h-screen bg-white">
          <NavigationClient
            initialBlogCategories={initialBlogCategories}
            initialCaseStudyCategories={initialCaseStudyCategories}
          />
          <PageComposerLayout
            data={data}
            sections={study.composerSections}
            designTokens={designTokens}
          />
          {!SELF_CONTAINED_PREMIUM.includes(detailLayout) ? <Footer /> : null}
        </div>
      );
    }

    const Layout = PREMIUM_LAYOUTS[detailLayout];

    if (detailLayout === "manufacturing-power-platform") {
      return (
        <div className="min-h-screen bg-white">
          <NavigationClient
            initialBlogCategories={initialBlogCategories}
            initialCaseStudyCategories={initialCaseStudyCategories}
          />
          <EducationEdTechStoryLayout data={data} />
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white">
        <NavigationClient
          initialBlogCategories={initialBlogCategories}
          initialCaseStudyCategories={initialCaseStudyCategories}
        />
        <Layout data={data} />
        {!SELF_CONTAINED_PREMIUM.includes(detailLayout) ? <Footer /> : null}
      </div>
    );
  }

  const storyType = study.storyType || "standard";
  switch (storyType) {
    case "transformation":
      return <TransformationEpicLayout study={study} related={related} slug={slug} />;
    case "product-showcase":
      return <ProductShowcaseLayout study={study} related={related} slug={slug} />;
    case "standard":
    default:
      return <StandardStoryLayout study={study} related={related} slug={slug} />;
  }
}
