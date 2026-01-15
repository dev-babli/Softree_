import Navigation from "@/components/sections/navigation";
import Link from "next/link";
import Footer from "@/components/sections/footer";
import { CALENDLY_URL } from "@/lib/contactConfig";

import FullStackTeams from "./full-stack";
import ThreePillars from "./three-pillar";
import CollaborationTabs from "./collab-tab";
import WebDevelopmentHero from "./process";
import QualityBenchmark from "./quality";
import WhyChooseSoftreeWebDevelopment from "./why-chose";
import WebDevelopmentCaseStudies from "./case-studies";
import WebDevHero from "./hero";

/* ------------------------------------------------------------------ */
/* Shared Layout Spacing Config                                        */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER =
  "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24 py-24";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navigation />

      {/* HERO */}
      <WebDevHero />

      {/* MAIN CONTENT */}
      <section className="bg-black">
        <div className={`${SECTION_WRAPPER} ${SECTION_GAP}`}>
          <WebDevelopmentCaseStudies />
          <WebDevelopmentHero />
          <FullStackTeams />
          <ThreePillars />
          <CollaborationTabs />
          <QualityBenchmark />
          <WhyChooseSoftreeWebDevelopment />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative overflow-hidden bg-black py-24">
        {/* Top divider */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/10 z-20" />

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#0f0f0f] to-[#0a0a0a]" />

        {/* Subtle glow */}
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
            Build Modern{" "}
            <span className="font-medium text-white/90">
              High-Performance Web Applications
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-white/70">
            We design and develop fast, scalable, and secure web applications
            using modern frameworks and cloud-native architectures — from MVPs
            to enterprise-grade platforms.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center
                rounded-xl bg-white
                px-8 py-4
                text-base font-semibold text-black
                transition-all duration-300
                hover:bg-white/90 hover:scale-105
              "
            >
              Schedule a Free Web Development Consultation
            </Link>

            <Link
              href="/services/web-app-development"
              className="
                inline-flex items-center justify-center
                rounded-xl border border-white/30
                px-8 py-4
                text-base font-semibold text-white/90
                transition-all duration-300
                hover:bg-white/10 hover:scale-105
              "
            >
              Explore Web Development Services
            </Link>
          </div>

          {/* Microcopy */}
          <p className="mt-4 text-sm text-white/50">
            Free discovery call • React / Next.js • Scalable & secure
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
