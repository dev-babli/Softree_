import Navigation from "@/components/sections/navigation";
import SharePointMigration from "./sp-migrarion";
import SharePointFeatures from "./feature";
import TechStack from "./tech-stack";
import SharePointMigrationProcess from "./sp-process";
import AIDrivenSharePointMigration from "./ai-sp";
import Footer from "@/components/sections/footer";
import Certifications from "./certification";
import PowerAppsCaseStudies from "./casestudies";
import TimelinePage from "./timeline";
import SharePointHero from "./hero";
import Link from "next/link";
import { CALENDLY_URL } from "@/lib/contactConfig";

const FIXED_WIDTH =
  "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#141414]">
      <Navigation />

      {/* HERO (can stay full-width or internally centered) */}
      <SharePointHero />

      {/* MAIN CONTENT – FIXED WIDTH */}
      <section className="bg-[#141414] py-24">
        <div className={FIXED_WIDTH}>
          <SharePointFeatures />
          <PowerAppsCaseStudies />
          <SharePointMigration />
          <SharePointMigrationProcess />
          <AIDrivenSharePointMigration />
          <TechStack />
          <TimelinePage />
          <Certifications />
        </div>
      </section>

      {/* CTA SECTION – FIXED WIDTH */}
      <section className="relative overflow-hidden bg-[#141414] py-24">
        {/* Divider */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/10" />

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#0f0f0f] to-[#0a0a0a]" />

        {/* Subtle glow */}
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

        {/* Content */}
        <div className={`relative z-10 ${FIXED_WIDTH} text-center`}>
          <h2 className="text-3xl md:text-4xl font-light text-white">
            Transform Your Organization with{" "}
            <span className="font-medium text-white/90">
              Modern SharePoint Solutions
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-white/70">
            We design, customize, and modernize SharePoint environments to
            improve collaboration, automate workflows, and build secure
            intranet solutions tailored to enterprise needs.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={CALENDLY_URL}
              target="_blank"
              className="
                rounded-xl bg-white px-8 py-4
                font-semibold text-black
                hover:bg-white/90 transition
              "
            >
              Schedule a Free SharePoint Consultation
            </Link>

            <Link
              href="/services/sharepoint"
              className="
                rounded-xl border border-white/30
                px-8 py-4
                font-semibold text-white/90
                hover:bg-white/10 transition
              "
            >
              Explore SharePoint Services
            </Link>
          </div>

          <p className="mt-4 text-sm text-white/50">
            SharePoint Online • SPFx • Power Automate • Secure Intranets
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
