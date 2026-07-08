"use client";

import dynamic from "next/dynamic";
import type { CaseStudyMock } from "@/components/bento-layout";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import { TransferredSoftreeHero } from "@/components/sections/TransferredSoftreeHero";

import ServicesStackedSlides from "@/components/sections/ServicesStackedSlides";
import SoftreeEnterpriseCarousel from "@/components/sections/SoftreeEnterpriseCarousel";
import GlobalClientNetwork from "@/components/sections/GlobalClientNetwork";

/* ── Lazy-loaded transferred components ──
 * Skeleton colours are matched to each component's actual root section
 * background so the user never sees a dark→light (or light→dark) flash
 * during code-split hydration. */
const FeaturesShowcaseLazy = dynamic(
  () => import("@/components/features/FeaturesShowcase"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#F3F0EE]" aria-hidden="true" /> }
);
const TechStackSectionLazy = dynamic(
  () => import("@/components/sections/tech"),
  { loading: () => <div className="min-h-[28vh] w-full bg-[#F3F0EE]" aria-hidden /> }
);
const LightServicesStickyListLazy = dynamic(
  () => import("@/components/homepage-light/LightServicesStickyList"),
  { loading: () => <div className="min-h-[420vh] w-full bg-[#F3F0EE]" aria-hidden="true" /> }
);
const LightEngagementModelsLazy = dynamic(
  () => import("@/components/homepage-light/LightEngagementModels"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#F3F0EE]" aria-hidden="true" /> }
);
const HomepageCaseStudiesLazy = dynamic(
  () => import("@/components/sections/HomepageCaseStudiesSection"),
  {
    loading: () => (
      <div className="min-h-[70vh] w-full bg-[#F3F0EE]" aria-hidden="true" />
    ),
  }
);
const HomepageShowcaseSectionsLazy = dynamic(
  () => import("@/components/sections/homepage-showcase-sections"),
  {
    loading: () => (
      <div className="min-h-[70vh] w-full bg-[#F3F0EE]" aria-hidden="true" />
    ),
  }
);
import Gallery from "@/components/Gallery/Gallery";
import AnimatedPhotoGallery from "@/components/Gallery/AnimatedPhotoGallery";

const LightFAQExactLazy = dynamic(
  () => import("@/components/homepage-light/LightFAQExact"),
  /* Component renders on cream `#fffbf7` — skeleton must match or we see a
   * jarring dark→cream flash. */
  { loading: () => <div className="min-h-[48vh] w-full bg-[#F3F0EE]" aria-hidden="true" /> }
);
const LightContactSectionLazy = dynamic(
  () => import("@/components/homepage-light/LightContactSection"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#0a0a0a]" aria-hidden="true" /> }
);
/* "Engineering Solutions Built for Impact" — light editorial showcase
 * (off-white #FAFAFA surface). Skeleton matches to avoid hydration flash. */
const EngineeringSolutionsLazy = dynamic(
  () => import("@/components/sections/engineering-solutions/EngineeringSolutionsSection"),
  { loading: () => <div className="min-h-[120vh] w-full bg-[#F3F0EE]" aria-hidden /> }
);
const InfinityScrollAnimationLazy = dynamic(
  () => import("@/components/infinity-scroll-animation/InfinityScrollAnimation"),
  { loading: () => <div className="min-h-[60vh] w-full bg-[#F8F9FC] sm:min-h-[70vh]" aria-hidden /> }
);
type HomeProps = {
  homepageCaseStudies?: CaseStudyMock[];
};

export default function Home({ homepageCaseStudies }: HomeProps) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-clip bg-black">
      <NavigationClient />
      <main className="flex-grow overflow-x-clip">
        {/* ── HERO (GSAP pin + pinSpacing — full-bleed) ── */}
        <TransferredSoftreeHero />

        {/* About bento — LightAboutMerged DNA + parallax gallery */}
        <InfinityScrollAnimationLazy />

        {/* ── Core sections ── */}
        <ServicesStackedSlides />
        <FeaturesShowcaseLazy />

        {/* Global client network — hex world with city stat cards */}
        <GlobalClientNetwork />

        {/* Capability showcase — light editorial band (#F3F0EE). */}
        <EngineeringSolutionsLazy />

        {/* Industry tabs + Softree partner marquees — continues light band. */}
        <SoftreeEnterpriseCarousel />

        <TechStackSectionLazy />
        <LightServicesStickyListLazy />
        <LightEngagementModelsLazy />

        <HomepageCaseStudiesLazy caseStudies={homepageCaseStudies} />

        {/* Testimonials + blog bento */}
        <HomepageShowcaseSectionsLazy />

        <AnimatedPhotoGallery />
        <Gallery />

        <LightFAQExactLazy />
        <LightContactSectionLazy />
      </main>
      <Footer />
    </div>
  );
}
