"use client";

import dynamic from "next/dynamic";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import ContactHero from "./ContactHero";
import LightContactSection from "@/components/qc/homepage-light/LightContactSection";
import LightEngagementModels from "@/components/qc/homepage-light/LightEngagementModels";
import TestimonialsGlobe from "@/components/sections/TestimonialsGlobe";
import { Metadata } from "next";
const LightFAQExactLazy = dynamic(
  () => import("@/components/homepage-light/LightFAQExact"),
  {
    loading: () => (
      <div className="min-h-[60vh] w-full bg-[#f6f6f6]" aria-hidden />
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

export const metadata: Metadata = {
  title: "Contact | Softree Technology - AI & Enterprise Solutions",
  description:
    "Get in touch with Softree Technology. Contact us for AI solutions, enterprise software development, and expert IT consulting services.",
  keywords: [
    "Contact Softree",
    "AI development company",
    "enterprise software development",
    "AI consulting",
    "software development India",
    "IT services",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/contact",
  },
  openGraph: {
    title: "Contact | Softree Technology - AI & Enterprise Solutions",
    description:
      "Get in touch with Softree Technology for AI, cloud, and enterprise software solutions.",
    url: "https://www.softreetechnology.com/contact",
    siteName: "Softree Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Technology",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Softree Technology - AI & Enterprise Solutions",
    description:
      "Connect with Softree Technology for AI, cloud, and enterprise software development services.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-[100px]">
      <NavigationClient />

      {/* 1. Hero — editorial with live clocks */}
      <ContactHero />

      {/* 2. CTA — contact form */}
      <LightContactSection />

      {/* 3. Testimonials — global voices */}
      <TestimonialsGlobe />

      {/* 4. FAQs */}
      <LightFAQExactLazy />

      {/* 5. Engagement Models */}
      <LightEngagementModels />

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
