import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";

import PowerAppsHero from "./hero";
import PowerAppsServices from "./power-apps-services";
import WhyChooseSoftreePowerApps from "./why-chose";
import TechStackSection from "./tech-stack";
import PowerAppsProcess from "./process";
import PowerAppsCaseStudies from "./casestudies";
import Certifications from "./certification";

import Link from "next/link";
import { CALENDLY_URL } from "@/lib/contactConfig";

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

      {/* HERO (full width but aligned content internally) */}
      <PowerAppsHero />

      {/* MAIN CONTENT SECTIONS */}
      <section className="bg-black">
        <div className={`${SECTION_WRAPPER} ${SECTION_GAP}`}>
          <PowerAppsServices />
          <WhyChooseSoftreePowerApps />
          <TechStackSection />
          <PowerAppsProcess />
          <PowerAppsCaseStudies />
          <Certifications />
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
                Power Apps Experts
              </span>

              {/* Heading */}
              <h2 className="max-w-6xl text-4xl md:text-5xl lg:text-3xl font-light text-white leading-tight">
                <span className="block">
                  Build Intelligent Business Apps with
                </span>
                <span className="block mt-2 font-medium text-blue-300">
                  Microsoft Power Apps
                </span>
              </h2>

              {/* Subtext */}
              <p className="mt-6 max-w-3xl text-lg md:text-xl text-white/70 leading-relaxed">
                We design and deliver secure, scalable Power Apps solutions that
                automate workflows, modernize operations, and integrate
                seamlessly with Microsoft 365.
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
                    Book a Free 30-Min Consultation
                  </Link>

                  <Link
                    href="/contact-us"
                    className="
                      inline-flex items-center justify-center
                      rounded-xl px-10 py-4
                      border border-white/30 text-white/90 font-semibold
                      backdrop-blur
                      hover:bg-white/10 hover:text-white hover:scale-[1.05]
                      transition-all duration-300
                    "
                  >
                    Get Project Estimate
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
                Canvas Apps • Model-Driven Apps • Dataverse • Power Automate
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
