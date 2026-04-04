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
import TrustedBrandsMarquee from "./trust";
import TestimonialsSplitSlider from "./testimonial";
import PowerAppsService from "./services";
import HirePowerAppsPricing from "./pricing-card";
import Link from "next/link";
import { CALENDLY_URL } from "@/lib/contactConfig";
import PowerAppsFAQ from "./faq";
import AiInsightsBlog from "./ai-insights-blog";

/* ------------------------------------------------------------------ */
/* Shared Layout Spacing Config                                        */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24 py-8";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <NavigationClient />

      {/* HERO (full width but aligned content internally) */}
      <PowerAppsHero />
      <TrustedBrandsMarquee />
      <PowerAppsService />
      {/* MAIN CONTENT SECTIONS */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <div className={`${SECTION_WRAPPER} ${SECTION_GAP}`}>
          <PowerAppsCaseStudies />
          <PowerAppsServices />
          <HirePowerAppsPricing />
          <WhyChooseSoftreePowerApps />
          <TechStackSection />
          <PowerAppsProcess />
          <TestimonialsSplitSlider />
          <Certifications />
        </div>
      </section>

      <CtaPowerApps />
      <Footer />
    </main>
  );
}
