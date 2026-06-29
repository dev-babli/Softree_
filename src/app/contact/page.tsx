"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import Gallery from "@/components/Gallery/Gallery";
import ContactHero from "./ContactHero";
import ContactHub from "./ContactHub";

const FdaMapsSectionLazy = dynamic(
  () => import("@/components/sections/FdaMapsSection"),
  { loading: () => <div className="min-h-[50vh] w-full bg-[#FAFAF8]" aria-hidden="true" /> }
);

const LightFAQExactLazy = dynamic(
  () => import("@/components/homepage-light/LightFAQExact"),
  { loading: () => <div className="min-h-[48vh] w-full bg-[#F3F0EE]" aria-hidden="true" /> }
);

/**
 * Contact — focused conversion flow
 *  1. Hero — editorial headline + live office clocks
 *  2. Hub — message form + inline Calendly
 *  3. Gallery — three global offices
 *  4. Global map — tap pins (no scroll pin)
 *  5. FAQ — main Softree FAQ
 *  6. Footer
 */
export default function ContactPage() {
  useEffect(() => {
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.pin) trigger.kill();
      });
      requestAnimationFrame(() => ScrollTrigger.refresh(true));
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-[100px]">
      <NavigationClient />

      <ContactHero />
      <ContactHub />
      <Gallery
        title="Pay Us A Visit"
        ctaLabel="Book a call →"
        ctaHref="#schedule"
      />
      <FdaMapsSectionLazy embedded />
      <LightFAQExactLazy />
      <Footer />
    </div>
  );
}
