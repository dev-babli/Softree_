"use client";
import NavigationClient from "@/components/sections/navigation-client";
import Link from "next/link";
import { CALENDLY_URL } from "@/lib/contactConfig";
import Footer from "@/components/sections/footer";

import MobileAppHero from "./hero";
import MobileAppCaseStudies from "./case-studies";
import WhoWeWorkWith from "./who-we";
import MobileAppLifecycle from "./lifecycle";
import ServicesShowcase from "./services";
import Technologies from "./tech-stack";
import WhyChooseSoftreeMobileApps from "./why-chose";
import CtaMobile from "./cta";

/* ------------------------------------------------------------------ */
/* Shared Layout Spacing Config                                        */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24 py-24";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <NavigationClient />

      {/* HERO */}
      <MobileAppHero />

      {/* MAIN CONTENT SECTIONS */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
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

      <Footer />
    </main>
  );
}
