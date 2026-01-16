import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import PowerBIServicesTabs from "./power-bi-tabs";
import OurProcess from "./process";
import Certifications from "./certification";
import PowerBISuccessStories from "./success";
import PowerBIHero from "./hero";
import Link from "next/link";
import { CALENDLY_URL } from "@/lib/contactConfig";
import CtaAbout from "./cta";
/* ------------------------------------------------------------------ */
/* Fixed Width Config                                                  */
/* ------------------------------------------------------------------ */
const FIXED_WIDTH = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#141414]">
      <NavigationClient />

      {/* HERO (can stay full-width internally) */}
      <PowerBIHero />

      {/* MAIN CONTENT – FIXED WIDTH */}
      <section className="bg-[#141414] py-24">
        <div className={FIXED_WIDTH}>
          <PowerBIServicesTabs />
          <OurProcess />
          <PowerBISuccessStories />
          <Certifications />
        </div>
      </section>

      {/* CTA SECTION – FIXED WIDTH */}
      <section className="relative overflow-hidden bg-[#141414] py-24">
        {/* Top divider */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/10 z-20" />

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#0f0f0f] to-[#0a0a0a]" />

        {/* Subtle glow */}
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

        {/* Content */}
        <div className={`relative z-10 ${FIXED_WIDTH} text-center`}>
          <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
            Turn Data into Insights with{" "}
            <span className="font-medium text-white/90">
              Microsoft Power BI
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-white/70">
            We design interactive Power BI dashboards and analytics solutions
            that help organizations track performance, uncover trends, and make
            data-driven decisions across Microsoft 365 and enterprise systems.
          </p>

          {/* CTA Buttons */}
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
              Schedule a Free Power BI Consultation
            </Link>

            <Link
              href="/services/power-bi"
              className="
                inline-flex items-center justify-center
                rounded-xl border border-white/30
                px-8 py-4
                text-base font-semibold text-white/90
                transition-all duration-300
                hover:bg-white/10 hover:scale-105
              "
            >
              Explore Power BI Services
            </Link>
          </div>

          {/* Microcopy */}
          <p className="mt-4 text-sm text-white/50">
            Dashboards & Reports • Data Modeling • DAX • Power BI Service
          </p>
        </div>
      </section>
      <CtaAbout />
      <Footer />
    </main>
  );
}
