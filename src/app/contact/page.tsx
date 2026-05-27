"use client";

import dynamic from "next/dynamic";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import ContactHero from "./ContactHero";
import LightContactSection from "@/components/qc/homepage-light/LightContactSection";

const TestimonialsGlobeLazy = dynamic(
  () => import("@/components/sections/TestimonialsGlobe"),
  {
    loading: () => (
      <div className="min-h-[50vh] w-full bg-[#FAFAF8]" aria-hidden />
    ),
  },
);

const LightFAQExactLazy = dynamic(
  () => import("@/components/homepage-light/LightFAQExact"),
  {
    loading: () => (
      <div className="min-h-[60vh] w-full bg-[#f6f6f6]" aria-hidden />
    ),
  },
);

const LightEngagementModelsLazy = dynamic(
  () => import("@/components/qc/homepage-light/LightEngagementModels"),
  {
    loading: () => (
      <div className="min-h-[70vh] w-full bg-white" aria-hidden />
    ),
  },
);

/**
 * CONTACT — Restructured to mirror the About Us flow.
 *
 *  1. ContactHero            — Editorial hero with live office clocks + email
 *  2. LightContactSection    — CTA / contact form (from About Us)
 *  3. TestimonialsGlobe      — Global voices on world map
 *  4. LightFAQExact          — Pre-empt common questions
 *  5. LightEngagementModels  — How to work with us
 *  6. Footer
 */

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-[100px]">
      <NavigationClient />

      {/* 1. Hero — editorial with live clocks */}
      <ContactHero />

      {/* 2. CTA — contact form */}
      <LightContactSection />

      {/* 3. Testimonials — global voices */}
      <TestimonialsGlobeLazy />

      {/* 4. FAQs */}
      <LightFAQExactLazy />

      {/* 5. Engagement Models */}
      <LightEngagementModelsLazy />

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
