"use client";

import dynamic from "next/dynamic";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import SupportPartners from "@/components/sections/support-partners";
import TrustedBy from "@/components/sections/trusted-by";
import { TransferredSoftreeHero } from "@/components/sections/TransferredSoftreeHero";

import ServicesStackedSlides from "@/components/sections/ServicesStackedSlides";

/* ── Lazy-loaded transferred components ── */
const FeaturesShowcaseLazy = dynamic(
  () => import("@/components/features/FeaturesShowcase"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#141414]" aria-hidden="true" /> }
);
const OffshoreTestimonialsGlobeLazy = dynamic(
  () => import("@/components/sections/OffshoreTestimonialsGlobe"),
  { ssr: false, loading: () => <div className="min-h-[60vh] w-full bg-[#141414]" aria-hidden /> }
);
const LatestBlogsClientLazy = dynamic(
  () => import("@/components/sections/latest-blogs-client"),
  { loading: () => <div className="min-h-[60vh] w-full bg-[#141414]" aria-hidden /> }
);
const TechStackSectionLazy = dynamic(
  () => import("@/components/sections/tech"),
  { loading: () => <div className="min-h-[50vh] w-full bg-[#141414]" aria-hidden /> }
);
const LightServicesStickyListLazy = dynamic(
  () => import("@/components/homepage-light/LightServicesStickyList"),
  { loading: () => <div className="min-h-[420vh] w-full bg-[#141414]" aria-hidden="true" /> }
);
const LightEngagementModelsLazy = dynamic(
  () => import("@/components/homepage-light/LightEngagementModels"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#141414]" aria-hidden="true" /> }
);
const CertificationsLazy = dynamic(
  () => import("@/components/sections/certification"),
  { loading: () => <div className="min-h-[30vh] w-full bg-[#141414]" aria-hidden /> }
);
const LightFAQExactLazy = dynamic(
  () => import("@/components/homepage-light/LightFAQExact"),
  { loading: () => <div className="min-h-[60vh] w-full bg-[#141414]" aria-hidden="true" /> }
);
const LightContactSectionLazy = dynamic(
  () => import("@/components/homepage-light/LightContactSection"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#141414]" aria-hidden="true" /> }
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
        <OffshoreTestimonialsGlobeLazy />
        <LatestBlogsClientLazy />
        <TechStackSectionLazy />
        <LightServicesStickyListLazy />
        <LightEngagementModelsLazy />
        <CertificationsLazy />
        <LightFAQExactLazy />
        <LightContactSectionLazy />
      </main>
      <Footer />
    </div>
  );
}
