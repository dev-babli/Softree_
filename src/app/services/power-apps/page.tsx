import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import PowerAppsHero from "./hero";
import PowerAppsServices from "./power-apps-services";
import WhyChooseSoftreePowerApps from "./why-chose";
import TechStackSection from "./tech-stack";
import PowerAppsProcess from "./process";
import PowerAppsCaseStudies from "./casestudies";
import Certifications from "./certification";
import CtaPowerApps from "./cta";

import Link from "next/link";
import { CALENDLY_URL } from "@/lib/contactConfig";

/* ------------------------------------------------------------------ */
/* Shared Layout Spacing Config                                        */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24 py-24";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <NavigationClient />

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

      <CtaPowerApps />
      <Footer />
    </main>
  );
}
