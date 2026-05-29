"use client";

/* ════════════════════════════════════════════════════════════════════
 *  HomeDemo — frozen demo of the redesigned homepage tree.
 *
 *  Mounted at `/homepage-light-demo` for side-by-side review against
 *  the live homepage at `/`.
 *
 *  The 7 sections that were rewritten in place during the redesign
 *  (support-partners, ServicesStackedSlides + .css, FeaturesShowcase,
 *  ai-insights-blog, tech, LightServicesStickyList, certification)
 *  live as PRIVATE copies inside `./components/` so this demo stays
 *  on the redesign even after the originals are reverted to the
 *  GitHub state. The remaining sections (SoftreeHero, AboutClientLogos,
 *  LightEngagementModels, OffshoreTestimonialsGlobe, LightFAQExact,
 *  LightContactSection, NavigationClient, Footer, SectionDots,
 *  SectionSkeleton, SectionErrorBoundary) are already shared with the
 *  rest of the codebase and stay imported from `@/...`.
 *
 *  This route is `noindex,nofollow` (set in `./page.tsx` metadata).
 * ════════════════════════════════════════════════════════════════════ */

import dynamic from "next/dynamic";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import SoftreeHero from "@/components/homepage-light/SoftreeHero";
import AboutClientLogos from "@/components/qc/homepage-light/AboutClientLogos";
import SectionDots from "@/components/sections/SectionDots";
import SectionSkeleton from "@/components/homepage-light/SectionSkeleton";
import SectionErrorBoundary, {
    withSectionTimeout,
} from "@/components/homepage-light/SectionErrorBoundary";

// Private copies of the redesigned sections — owned by this demo route only.
import SupportPartners from "./components/sections/support-partners";
import ServicesStackedSlides from "./components/sections/ServicesStackedSlides";

const FeaturesShowcaseLazy = dynamic(
    withSectionTimeout(
        () => import("./components/features/FeaturesShowcase")
    ),
    {
        loading: () => (
            <SectionSkeleton surface="#F8F9FC" minHeight="100vh" />
        ),
    }
);
const OffshoreTestimonialsGlobeLazy = dynamic(
    withSectionTimeout(
        () => import("@/components/sections/OffshoreTestimonialsGlobe")
    ),
    {
        ssr: false,
        loading: () => (
            <SectionSkeleton surface="#F8F9FC" minHeight="60vh" />
        ),
    }
);
const AiInsightsBlogLazy = dynamic(
    withSectionTimeout(
        () => import("./components/sections/ai-insights-blog")
    ),
    {
        loading: () => (
            <SectionSkeleton surface="#FFFFFF" minHeight="60vh" />
        ),
    }
);
const TechStackSectionLazy = dynamic(
    withSectionTimeout(() => import("./components/sections/tech")),
    {
        loading: () => (
            <SectionSkeleton surface="#F3F0EE" minHeight="50vh" />
        ),
    }
);
const LightServicesStickyListLazy = dynamic(
    withSectionTimeout(
        () => import("./components/homepage-light/LightServicesStickyList")
    ),
    {
        loading: () => (
            <SectionSkeleton surface="#FFFFFF" minHeight="300vh" />
        ),
    }
);
const LightEngagementModelsLazy = dynamic(
    withSectionTimeout(
        () => import("@/components/qc/homepage-light/LightEngagementModels")
    ),
    {
        loading: () => (
            <SectionSkeleton surface="#F8F9FC" minHeight="80vh" />
        ),
    }
);
const CertificationsLazy = dynamic(
    withSectionTimeout(
        () => import("./components/sections/certification")
    ),
    {
        loading: () => (
            <SectionSkeleton surface="#FFFFFF" minHeight="30vh" />
        ),
    }
);
const LightFAQExactLazy = dynamic(
    withSectionTimeout(() => import("@/components/homepage-light/LightFAQExact")),
    {
        loading: () => (
            <SectionSkeleton surface="#F8F9FC" minHeight="60vh" />
        ),
    }
);
const LightContactSectionLazy = dynamic(
    withSectionTimeout(
        () => import("@/components/qc/homepage-light/LightContactSection")
    ),
    {
        loading: () => (
            <SectionSkeleton surface="#FFFFFF" minHeight="100vh" />
        ),
    }
);

export default function HomeDemo() {
    return (
        <div className="flex flex-col min-h-screen bg-black">
            <a
                href="#main"
                className="
          sr-only
          focus:not-sr-only
          focus:fixed focus:top-4 focus:left-4 focus:z-[100]
          focus:inline-flex focus:items-center
          focus:rounded-full
          focus:bg-[#0a0a1a] focus:px-5 focus:py-2.5
          focus:text-sm focus:font-semibold focus:text-white
          focus:outline-none
          focus:ring-[3px] focus:ring-[#FF6B00] focus:ring-offset-2 focus:ring-offset-white
        "
            >
                Skip to main content
            </a>
            <NavigationClient />
            <SectionDots />
            <main id="main" tabIndex={-1} className="flex-grow">
                <SoftreeHero />

                <div data-section="services">
                    <SupportPartners />
                </div>
                <div data-section="delivery">
                    <ServicesStackedSlides />
                </div>
                <div data-section="features">
                    <SectionErrorBoundary
                        surface="#F8F9FC"
                        minHeight="100vh"
                        sectionLabel="Features showcase"
                    >
                        <FeaturesShowcaseLazy />
                    </SectionErrorBoundary>
                </div>
                <div data-section="trust">
                    <AboutClientLogos />
                </div>
                <div data-section="testimonials">
                    <SectionErrorBoundary
                        surface="#F8F9FC"
                        minHeight="60vh"
                        sectionLabel="Testimonials"
                    >
                        <OffshoreTestimonialsGlobeLazy variant="light" />
                    </SectionErrorBoundary>
                </div>
                <div data-section="insights">
                    <SectionErrorBoundary
                        surface="#FFFFFF"
                        minHeight="60vh"
                        sectionLabel="AI insights"
                    >
                        <AiInsightsBlogLazy />
                    </SectionErrorBoundary>
                </div>
                <div data-section="tech">
                    <SectionErrorBoundary
                        surface="#F3F0EE"
                        minHeight="50vh"
                        sectionLabel="Tech stack"
                    >
                        <TechStackSectionLazy />
                    </SectionErrorBoundary>
                </div>
                <SectionErrorBoundary
                    surface="#FFFFFF"
                    minHeight="300vh"
                    sectionLabel="Services"
                >
                    <LightServicesStickyListLazy />
                </SectionErrorBoundary>
                <div data-section="engagement">
                    <SectionErrorBoundary
                        surface="#F8F9FC"
                        minHeight="80vh"
                        sectionLabel="Engagement models"
                    >
                        <LightEngagementModelsLazy />
                    </SectionErrorBoundary>
                </div>
                <SectionErrorBoundary
                    surface="#FFFFFF"
                    minHeight="30vh"
                    sectionLabel="Certifications"
                >
                    <CertificationsLazy />
                </SectionErrorBoundary>
                <div data-section="faq">
                    <SectionErrorBoundary
                        surface="#F8F9FC"
                        minHeight="60vh"
                        sectionLabel="FAQ"
                    >
                        <LightFAQExactLazy />
                    </SectionErrorBoundary>
                </div>
                <div data-section="contact">
                    <SectionErrorBoundary
                        surface="#FFFFFF"
                        minHeight="100vh"
                        sectionLabel="Contact"
                    >
                        <LightContactSectionLazy />
                    </SectionErrorBoundary>
                </div>
            </main>
            <Footer />
        </div>
    );
}
