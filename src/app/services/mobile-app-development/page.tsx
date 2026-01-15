"use client";
import Navigation from "@/components/sections/navigation";
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

/* ------------------------------------------------------------------ */
/* Shared Layout Spacing Config                                        */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24 py-24";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navigation />

      {/* HERO */}
      <MobileAppHero />

      {/* MAIN CONTENT SECTIONS */}
      <section className="bg-[141414]">
        <div className={`${SECTION_WRAPPER} ${SECTION_GAP}`}>
          <MobileAppCaseStudies />
          <WhoWeWorkWith />
          <MobileAppLifecycle />
          <ServicesShowcase />
          <Technologies />
          <WhyChooseSoftreeMobileApps />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative bg-black py-24">
        <div className={SECTION_WRAPPER}>
          {/* GLASS CARD */}
          <div
            className="
        relative overflow-hidden
        rounded-[32px]
        border border-white/15
        bg-gradient-to-br from-[#141414] via-[#0f0f0f] to-[#0a0a0a]
        px-12 py-16 sm:px-14 md:px-20 lg:px-24
        text-center
        shadow-[0_40px_120px_rgba(0,0,0,0.7)]
        backdrop-blur-xl
      "
          >
            {/* Soft top highlight */}
            <span
              className="
          absolute top-0 left-0 w-full h-[4px]
          bg-gradient-to-r from-transparent via-white/40 to-transparent
          rounded-full
        "
            />

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Eyebrow */}
              <span
                className="
            mb-5 inline-flex items-center
            px-4 py-1.5 rounded-full
            bg-white/5 border border-white/10
            text-xs tracking-widest uppercase text-white/70
          "
              >
                Mobile App Experts
              </span>

              {/* Heading */}
              <h2 className="max-w-6xl text-4xl md:text-5xl lg:text-3xl font-light text-white leading-tight">
                <span className="block">
                  Build High-Performance Mobile Apps for
                </span>
                <span className="block mt-2 font-medium text-white/90">
                  iOS & Android Platforms
                </span>
              </h2>

              {/* Subtext */}
              <p className="mt-6 max-w-3xl text-lg md:text-xl text-white/70 leading-relaxed">
                From idea validation to scalable iOS and Android applications,
                we design and develop secure, user-centric mobile apps that
                scale with your business and delight your users.
              </p>

              {/* CTAs */}
              <div className="mt-14 flex flex-col items-center gap-6">
                <div className="flex flex-col sm:flex-row gap-5">
                  <Link
                    href={CALENDLY_URL}
                    target="_blank"
                    className="
                inline-flex items-center justify-center
                rounded-xl px-10 py-4
                bg-white text-black font-semibold
                shadow-[0_20px_60px_rgba(255,255,255,0.25)]
                hover:bg-white/90 hover:scale-[1.05]
                transition-all duration-300
              "
                  >
                    Book a Free Mobile App Consultation
                  </Link>

                  <Link
                    href="/services/mobile-app-development"
                    className="
                inline-flex items-center justify-center
                rounded-xl px-10 py-4
                border border-white/30 text-white/90 font-semibold
                backdrop-blur
                hover:bg-white/10 hover:text-white hover:scale-[1.05]
                transition-all duration-300
              "
                  >
                    Explore Mobile App Development Services
                  </Link>
                </div>

                {/* WhatsApp CTA */}
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <span>Prefer quick chat?</span>
                  <a
                    href="https://wa.me/91XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white font-medium underline underline-offset-4"
                  >
                    WhatsApp us
                  </a>
                </div>
              </div>

              {/* Micro copy */}
              <p className="mt-7 text-sm text-white/50 tracking-wide">
                iOS • Android • React Native • Flutter • MVP to Enterprise
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
