import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import PowerBIServicesTabs from "./power-bi-tabs";
import OurProcess from "./process";
import Certifications from "./certification";
import PowerBISuccessStories from "./success";
import PowerBIHero from "./hero";
import Link from "next/link";
import { CALENDLY_URL } from '@/lib/contactConfig';

export default function Home() {
  return (
    <main>
      <Navigation />
      <PowerBIHero />
      <PowerBIServicesTabs />
      <OurProcess />
      <PowerBISuccessStories />
      <Certifications />
      <section className="relative overflow-hidden py-24">
        {/* TOP DIVIDER */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/10 z-20" />

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070028] via-[#050016] to-[#03000D] z-0" />

        {/* Subtle glow */}
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-green-500/10 blur-3xl z-0" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-light text-white leading-tight">
            Turn Data into Insights with{" "}
            <span className="font-medium text-green-400">
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
          rounded-xl
          bg-green-500
          px-8 py-4
          text-base font-semibold text-black
          transition-all duration-300
          hover:bg-green-400
          hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-green-500/40
        "
            >
              Schedule a Free Power BI Consultation
            </Link>

            <Link
              href="/services/power-bi"
              className="
          inline-flex items-center justify-center
          rounded-xl
          border border-green-500
          px-8 py-4
          text-base font-semibold text-green-400
          transition-all duration-300
          hover:bg-green-500
          hover:text-black
          hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-green-500/40
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

      <Footer />
    </main>
  );
}
