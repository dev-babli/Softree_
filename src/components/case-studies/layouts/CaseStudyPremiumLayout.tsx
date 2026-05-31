import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import { buildCaseStudyJsonLd } from "@/lib/structured-data"
import type { CaseStudyDetailLayout } from "./constants"
import { mapCaseStudyToLayoutData, type SanityCaseStudyDoc } from "./mapCaseStudyData"
import type { RelatedStudy } from "./types"
import { ManufacturingPowerPlatformLayout } from "./variants/ManufacturingPowerPlatformLayout"
import { SidebarMetadataLayout } from "./variants/SidebarMetadataLayout"
import { SplitHeroMockupLayout } from "./variants/SplitHeroMockupLayout"
import { ZigzagAlternatingLayout } from "./variants/ZigzagAlternatingLayout"
import { VerticalTimelineLayout } from "./variants/VerticalTimelineLayout"
import { TabbedDeliverablesLayout } from "./variants/TabbedDeliverablesLayout"
import { BentoResultsLayout } from "./variants/BentoResultsLayout"
import { VideoHeroLayout } from "./variants/VideoHeroLayout"
import { BeforeAfterTableLayout } from "./variants/BeforeAfterTableLayout"
import { StatsDashboardLayout } from "./variants/StatsDashboardLayout"
import { ParallaxScreenshotsLayout } from "./variants/ParallaxScreenshotsLayout"
import { NexoraProductStoryLayout } from "./variants/NexoraProductStoryLayout"
import { SynqLabProductStoryLayout } from "./variants/SynqLabProductStoryLayout"
import { PayFlowFintechStoryLayout } from "./variants/PayFlowFintechStoryLayout"
import { AIHorizontalStoryLayout } from "./variants/AIHorizontalStoryLayout"
import { NeutrinoDashboardStoryLayout } from "./variants/NeutrinoDashboardStoryLayout"

type Props = {
  study: SanityCaseStudyDoc
  related: RelatedStudy[]
  layout: CaseStudyDetailLayout
}

export function CaseStudyPremiumLayout({ study, related, layout }: Props) {
  const data = mapCaseStudyToLayoutData(study, related, layout)
  const excerptText = data.excerpt

  const LayoutBody = (() => {
    switch (layout) {
      case "manufacturing-power-platform":
        return <ManufacturingPowerPlatformLayout data={data} />
      case "sidebar-metadata":
        return <SidebarMetadataLayout data={data} />
      case "split-hero-mockup":
        return <SplitHeroMockupLayout data={data} />
      case "zigzag-alternating":
        return <ZigzagAlternatingLayout data={data} />
      case "vertical-timeline":
        return <VerticalTimelineLayout data={data} />
      case "tabbed-deliverables":
        return <TabbedDeliverablesLayout data={data} />
      case "bento-results":
        return <BentoResultsLayout data={data} />
      case "video-hero":
        return <VideoHeroLayout data={data} />
      case "before-after-table":
        return <BeforeAfterTableLayout data={data} />
      case "stats-dashboard":
        return <StatsDashboardLayout data={data} />
      case "parallax-screenshots":
        return <ParallaxScreenshotsLayout data={data} />
      case "nexora-product-story":
        return <NexoraProductStoryLayout data={data} />
      case "synqlab-product-story":
        return <SynqLabProductStoryLayout data={data} />
      case "payflow-fintech-story":
        return <PayFlowFintechStoryLayout data={data} />
      case "ai-horizontal-story":
        return <AIHorizontalStoryLayout data={data} />
      case "neutrino-dashboard-story":
        return <NeutrinoDashboardStoryLayout data={data} />
      default:
        return <ManufacturingPowerPlatformLayout data={data} />
    }
  })()

  return (
    <>
      <NavigationClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCaseStudyJsonLd({
              headline: study.title,
              description: excerptText,
              url: `https://www.softreetechnology.com/case-studies/${data.slug}`,
              datePublished: study.publishedAt,
              dateModified: study._updatedAt,
              image: data.heroImageUrl,
              clientName: study.client,
            }),
          ),
        }}
      />
      {LayoutBody}
      <Footer />
    </>
  )
}

export { CASE_STUDY_LAYOUTS, isPremiumLayout, type CaseStudyDetailLayout } from "@/lib/case-study-layouts"
