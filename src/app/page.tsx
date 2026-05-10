"use client";

import dynamic from "next/dynamic";
import NavigationClient from "@/components/sections/navigation-client";
import Certifications from "@/components/sections/certification";
import CTABanner from "@/components/sections/cta-banner";
import Footer from "@/components/sections/footer";
import TechStackSection from "@/components/sections/tech";
import AiInsightsBlog from "@/components/sections/ai-insights-blog";
import WhyChooseUs from "@/components/sections/why-choose-us";
import SupportPartners from "@/components/sections/support-partners";
import TrustedBy from "@/components/sections/trusted-by";
import ServicesStackedSlides from "@/components/sections/ServicesStackedSlides";
import { TransferredSoftreeHero } from "@/components/sections/TransferredSoftreeHero";

/* ── Lazy-loaded transferred components ── */
const FeaturesShowcaseLazy = dynamic(
  () => import("@/components/features/FeaturesShowcase"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#141414]" aria-hidden /> }
);
const LightServicesStickyListLazy = dynamic(
  () => import("@/components/homepage-light/LightServicesStickyList"),
  { loading: () => <div className="min-h-[420vh] w-full bg-[#141414]" aria-hidden /> }
);
const LightEngagementModelsLazy = dynamic(
  () => import("@/components/homepage-light/LightEngagementModels"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#141414]" aria-hidden /> }
);
const LightFAQExactLazy = dynamic(
  () => import("@/components/homepage-light/LightFAQExact"),
  { loading: () => <div className="min-h-[60vh] w-full bg-[#141414]" aria-hidden /> }
);
const LightContactSectionLazy = dynamic(
  () => import("@/components/homepage-light/LightContactSection"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#141414]" aria-hidden /> }
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavigationClient />
      <main className="flex-grow">
        {/* ── HERO (GSAP pin + pinSpacing — full-bleed) ── */}
        <TransferredSoftreeHero />

        {/* ── Core sections ── */}
        <SupportPartners />
        <ServicesStackedSlides />
        <FeaturesShowcaseLazy />
        <TrustedBy />
        <AiInsightsBlog />
        <TechStackSection />
        <LightServicesStickyListLazy />
        <WhyChooseUs />
        <LightEngagementModelsLazy />
        <Certifications />
        <CTABanner />
        <LightFAQExactLazy />
        <LightContactSectionLazy />
      </main>
      <Footer />
    </div>
  );
}
