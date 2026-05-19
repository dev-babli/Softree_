"use client";
import NavigationClient from "@/components/sections/navigation-client";
import Certifications from "../offshore-power-platform-development/certification";
import Footer from "@/components/sections/footer";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import MobileAppHero from "./hero";
import MobileAppCaseStudies from "./case-studies";
import WhoWeWorkWith from "./who-we";
import MobileAppLifecycle from "./lifecycle";
import ServicesShowcase from "./services";
import Technologies from "./tech-stack";
import WhyChooseSoftreeMobileApps from "./why-chose";
import CtaMobile from "./cta";
import { MobileFaq } from "./faq";
/* ------------------------------------------------------------------ */
/* Shared Layout Spacing Config                                        */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24 py-24";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Mobile App Development Services | iOS, Android & Cross-Platform Solutions",

  description:
    "Build scalable mobile applications with our mobile app development services. We create high-performance iOS, Android, and cross-platform apps with modern UI/UX, cloud integration, and enterprise-grade security.",

  keywords: [
    "mobile app development",
    "iOS app development",
    "Android app development",
    "cross-platform app development",
    "React Native development",
    "Flutter app development",
    "enterprise mobile solutions",
    "custom mobile applications",
    "mobile UI UX design",
    "app development company",
  ],

  openGraph: {
    title:
      "Mobile App Development Services | iOS & Android Apps",
    description:
      "Custom iOS, Android, and cross-platform mobile app solutions for startups and enterprises.",
    url: "https://www.softreetechnology.com/services/offshore-mobile-app-development",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Mobile App Development Services",
    description:
      "Scalable iOS, Android, and cross-platform mobile applications built for modern businesses.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-mobile-app-development",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <NavigationClient />

      {/* HERO */}
      <MobileAppHero />

      {/* MAIN CONTENT SECTIONS */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <TrustedBrandsMarquee />
        <div className={`${SECTION_WRAPPER} ${SECTION_GAP}`}>
          <MobileAppCaseStudies />
          <WhoWeWorkWith />
          <MobileAppLifecycle />
          <ServicesShowcase />
          <Technologies />
          <WhyChooseSoftreeMobileApps />
        </div>
      </section>

      <CtaMobile />
      <MobileFaq />

      <Footer />
    </main>
  );
}
