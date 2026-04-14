import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import Certifications from "../../business-applications/power-apps/certification";
import FullStackTeams from "./full-stack";
import ThreePillars from "./three-pillar";
import CollaborationTabs from "./collab-tab";
import WebDevelopmentHero from "./process";
import QualityBenchmark from "./quality";
import WhyChooseSoftreeWebDevelopment from "./why-chose";
import WebDevelopmentCaseStudies from "./case-studies";
import WebDevHero from "./hero";
import CtaWeb from "./cta";
import TrustedBrandsMarquee from "../../business-applications/power-apps/trust";
import { WebFaq } from "./faq";

/* ------------------------------------------------------------------ */
/* Shared Layout Config                                                */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-full px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <NavigationClient />

      {/* HERO */}
      <WebDevHero />

      {/* MAIN CONTENT — COMPONENT BACKGROUND */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <TrustedBrandsMarquee />
        <WebDevelopmentCaseStudies />
        <WebDevelopmentHero />
        <FullStackTeams />
        <ThreePillars />
        <CollaborationTabs />
        <QualityBenchmark />
        <WhyChooseSoftreeWebDevelopment />
        {/* <Certifications /> */}
      </section>

      <CtaWeb />
      <WebFaq />

      <Footer />
    </main>
  );
}
