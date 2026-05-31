"use client";

import dynamic from "next/dynamic";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import SupportPartners from "@/components/sections/support-partners";
import TrustedBy from "@/components/sections/trusted-by";
import { TransferredSoftreeHero } from "@/components/sections/TransferredSoftreeHero";

import ServicesStackedSlides from "@/components/sections/ServicesStackedSlides";
import KoreEnterpriseCarousel from "@/components/sections/KoreEnterpriseCarousel";
import KorePlatformShowcaseSection from "@/components/sections/KorePlatformShowcaseSection";
import Gallery from "@/components/Gallery/Gallery";
import ClarityControlSection from "@/components/sections/ClarityControlSection";

/* ── Lazy-loaded transferred components ──
 * Skeleton colours are matched to each component's actual root section
 * background so the user never sees a dark→light (or light→dark) flash
 * during code-split hydration. */
const FeaturesShowcaseLazy = dynamic(
  () => import("@/components/features/FeaturesShowcase"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#F3F0EE]" aria-hidden="true" /> }
);
const OffshoreCoreFeaturesLazy = dynamic(
  () => import("@/components/sections/OffshoreCoreFeatures"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#070708]" aria-hidden /> }
);
const HomepageCaseStudySliderLazy = dynamic(
  () => import("@/components/sections/homepage-case-study-slider-client"),
  { loading: () => <div className="min-h-[50vh] w-full bg-[#0a0a0a]" aria-hidden /> }
);
const RasaCustomerStoriesCarouselLazy = dynamic(
  () => import("@/components/sections/RasaCustomerStoriesCarousel"),
  { loading: () => <div className="min-h-[60vh] w-full bg-black" aria-hidden /> }
);
const FeaturedCaseStudiesClientLazy = dynamic(
  () => import("@/components/sections/featured-case-studies-client"),
  { loading: () => <div className="min-h-[40vh] w-full bg-[#0a0a0a]" aria-hidden /> }
);
const LatestBlogsClientLazy = dynamic(
  () => import("@/components/sections/latest-blogs-client"),
  { loading: () => <div className="min-h-[60vh] w-full bg-[#0a0a0a]" aria-hidden /> }
);
const TechStackSectionLazy = dynamic(
  () => import("@/components/sections/tech"),
  { loading: () => <div className="min-h-[50vh] w-full bg-[#0a0a0a]" aria-hidden /> }
);
const LightServicesStickyListLazy = dynamic(
  () => import("@/components/homepage-light/LightServicesStickyList"),
  { loading: () => <div className="min-h-[420vh] w-full bg-[#0a0a0a]" aria-hidden="true" /> }
);
const LightEngagementModelsLazy = dynamic(
  () => import("@/components/homepage-light/LightEngagementModels"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#0a0a0a]" aria-hidden="true" /> }
);
const CertificationsLazy = dynamic(
  () => import("@/components/sections/certification"),
  { loading: () => <div className="min-h-[30vh] w-full bg-[#0a0a0a]" aria-hidden /> }
);
const LightFAQExactLazy = dynamic(
  () => import("@/components/homepage-light/LightFAQExact"),
  /* Component renders on cream `#fffbf7` — skeleton must match or we see a
   * jarring dark→cream flash. */
  { loading: () => <div className="min-h-[60vh] w-full bg-[#fffbf7]" aria-hidden="true" /> }
);
const LightContactSectionLazy = dynamic(
  () => import("@/components/homepage-light/LightContactSection"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#0a0a0a]" aria-hidden="true" /> }
);
const KoreAiCaseStudyInteractiveLazy = dynamic(
  () => import("@/components/superdesign/KoreAiCaseStudyInteractive"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#0a0a0a]" aria-hidden /> }
);
/* "Engineering Solutions Built for Impact" — light editorial showcase
 * (off-white #FAFAFA surface). Skeleton matches to avoid hydration flash. */
const EngineeringSolutionsLazy = dynamic(
  () => import("@/components/sections/engineering-solutions/EngineeringSolutionsSection"),
  { loading: () => <div className="min-h-[120vh] w-full bg-[#FAFAFA]" aria-hidden /> }
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-clip bg-black">
      <NavigationClient />
      <main className="flex-grow overflow-x-clip">
        {/* ── HERO (GSAP pin + pinSpacing — full-bleed) ── */}
        <TransferredSoftreeHero />

        {/* Editorial intro — three glass cards on photo backdrops */}
        <ClarityControlSection />

        {/* ── Core sections ── */}
        <SupportPartners />
        <ServicesStackedSlides />
        <FeaturesShowcaseLazy />
        <TrustedBy />

        {/* Light editorial intro, sits well after the cream FeaturesShowcase */}
        <KorePlatformShowcaseSection />

        {/* Capability showcase — isometric illustrations on off-white surface.
         * Sits in the light band between KorePlatformShowcase and the dark
         * KoreEnterpriseCarousel for a clean light → dark transition. */}
        <EngineeringSolutionsLazy />

        <KoreEnterpriseCarousel />
        <OffshoreCoreFeaturesLazy />

        {/* Interactive case-study deep-dive */}
        <KoreAiCaseStudyInteractiveLazy />

        <FeaturedCaseStudiesClientLazy />
        <HomepageCaseStudySliderLazy />
        <RasaCustomerStoriesCarouselLazy />
        <LatestBlogsClientLazy />
        <TechStackSectionLazy />
        <LightServicesStickyListLazy />
        <LightEngagementModelsLazy />
        <CertificationsLazy />

        {/* Office Gallery — visual brand moment between certifications and FAQ */}
        <Gallery />

        <LightFAQExactLazy />
        <LightContactSectionLazy />
      </main>
      <Footer />
    </div>
  );
}
