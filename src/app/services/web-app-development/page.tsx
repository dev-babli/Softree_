import Navigation from "@/components/sections/navigation";
import Link from "next/link";
import Footer from "@/components/sections/footer";
import FullStackTeams from "./full-stack";
import ThreePillars from "./three-pillar";
import CollaborationTabs from "./collab-tab";
import WebDevelopmentHero from "./process";
import QualityBenchmark from "./quality";
import WhyChooseSoftreeWebDevelopment from "./why-chose";
import WebDevelopmentCaseStudies from "./case-studies";
import WebDevHero from "./hero";
export default function Home() {
  return (
    <main>
      <Navigation />
      <WebDevHero />
      <WebDevelopmentCaseStudies />
      <WebDevelopmentHero />
      <FullStackTeams />
      <ThreePillars />
      <CollaborationTabs />
      <QualityBenchmark />
      <WhyChooseSoftreeWebDevelopment />
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
            Build Modern{" "}
            <span className="font-medium text-green-400">
              High-Performance Web Applications
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-white/70">
            We design and develop fast, scalable, and secure web applications
            using modern frameworks and cloud-native architectures — from MVPs
            to enterprise-grade platforms.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
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
              Schedule a Free Web Development Consultation
            </Link>

            <Link
              href="/services/web-app-development"
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
