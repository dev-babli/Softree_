"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import Gallery from "@/components/Gallery/Gallery";
import ContactHero from "./ContactHero";
import ContactHub from "./ContactHub";

import { CONTACT_FAQS } from "@/data/contact-page";

const FdaMapsSectionLazy = dynamic(
  () => import("@/components/sections/FdaMapsSection"),
  { loading: () => <div className="min-h-[50vh] w-full bg-[#000000]" aria-hidden="true" /> }
);

const SoftreeFAQLazy = dynamic(
  () => import("@/components/sections/faq"),
  { loading: () => <div className="min-h-[48vh] w-full bg-[#000000]" aria-hidden="true" /> }
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
      try {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.pin) trigger.kill();
        });
        requestAnimationFrame(() => {
          try {
            ScrollTrigger.refresh(true);
          } catch (e) {
            console.warn("ScrollTrigger refresh error:", e);
          }
        });
      } catch (e) {
        console.warn("ScrollTrigger cleanup error:", e);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <NavigationClient />

      <ContactHero />
      <ContactHub />
      <Gallery
        title="Pay Us A Visit"
        ctaLabel="Book a call →"
        ctaHref="#schedule"
      />
      <FdaMapsSectionLazy embedded />
      <SoftreeFAQLazy faqs={CONTACT_FAQS} />
      <Footer />
    </div>
  );
}
