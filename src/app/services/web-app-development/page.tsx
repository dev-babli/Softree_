import NavigationClient from "@/components/sections/navigation-client";
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
import CtaWeb from "./cta";
/* ------------------------------------------------------------------ */
/* Shared Layout Spacing Config                                        */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24 py-24";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <NavigationClient />

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

      <CtaWeb />
      <Footer />
    </main>
  );
}
