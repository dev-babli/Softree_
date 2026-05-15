"use client";

import dynamic from "next/dynamic";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import { TransferredSoftreeHero } from "@/components/sections/TransferredSoftreeHero";
import TrustedByStrip from "@/components/qc/homepage/TrustedByStrip";

/* Heavy below-the-fold sections lazy-loaded for performance */
const LightServicesStickyListLazy = dynamic(
  () => import("@/components/homepage-light/LightServicesStickyList"),
  { loading: () => <div className="min-h-[420vh] w-full bg-[#f6f6f6]" aria-hidden /> }
);
const ServicesStackedSlidesLazy = dynamic(
  () => import("@/components/sections/ServicesStackedSlides"),
  { loading: () => <div className="min-h-[300vh] w-full bg-[#f6f6f6]" aria-hidden /> }
);
const LightWhyChooseUsLazy = dynamic(
  () => import("@/components/qc/homepage-light/LightWhyChooseUs"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#f6f6f6]" aria-hidden /> }
);
const LightTestimonialGridLazy = dynamic(
  () => import("@/components/qc/homepage-light/LightTestimonialGrid"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#f6f6f6]" aria-hidden /> }
);
const LightEngagementModelsLazy = dynamic(
  () => import("@/components/homepage-light/LightEngagementModels"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#f6f6f6]" aria-hidden /> }
);
const LightFAQExactLazy = dynamic(
  () => import("@/components/homepage-light/LightFAQExact"),
  { loading: () => <div className="min-h-[60vh] w-full bg-[#f6f6f6]" aria-hidden /> }
);
const LightContactSectionLazy = dynamic(
  () => import("@/components/homepage-light/LightContactSection"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#0a0a0a]" aria-hidden /> }
);

/**
 * SERVICES — Purpose: clearly answer "what does Softree build, for whom, how, and why us?"
 *
 * Flow rationale:
 *  1. Hero                    — brand identity anchor
 *  2. TrustedByStrip          — partner certifications + delivery stats (proof first)
 *  3. LightServicesStickyList — THE services (web apps, Power Platform, SharePoint, etc.) with pricing
 *  4. ServicesStackedSlides   — our delivery phases / how engagements unfold
 *  5. LightWhyChooseUs        — why pick us: engineered for excellence (giant 01–04 numbers)
 *  6. LightTestimonialGrid    — client quote chips (social proof before pricing)
 *  7. LightEngagementModels   — 5 engagement tiers (the "ticket options" of the inspiration)
 *  8. LightFAQExact           — pricing, timelines, contracts, common objections
 *  9. LightContactSection     — conversion: start a project (map + form)
 */
export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6f6f6]">
      <NavigationClient />
      <main id="main-content" className="grow" style={{ overflowX: "clip" }}>
        <TransferredSoftreeHero />
        <TrustedByStrip />
        <LightServicesStickyListLazy />
        <ServicesStackedSlidesLazy />
        <LightWhyChooseUsLazy />
        <LightTestimonialGridLazy />
        <LightEngagementModelsLazy />
        <LightFAQExactLazy />
        <LightContactSectionLazy />
      </main>
      <Footer />
    </div>
  );
}
