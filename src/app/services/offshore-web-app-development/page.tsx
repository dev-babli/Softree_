import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import Certifications from "../offshore-power-platform-development/certification";
import FullStackTeams from "./full-stack";
import ThreePillars from "./three-pillar";
import CollaborationTabs from "./collab-tab";
import WebDevelopmentHero from "./process";
import QualityBenchmark from "./quality";
import WhyChooseSoftreeWebDevelopment from "./why-chose";
import WebDevelopmentCaseStudies from "./case-studies";
import WebDevHero from "./hero";
import CtaWeb from "./cta";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import { WebFaq } from "./faq";

/* ------------------------------------------------------------------ */
/* Shared Layout Config                                                */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-full px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web App Development Services | Custom Enterprise Web Applications",

  description:
    "Professional web app development services. We build scalable, secure, and high-performance custom web applications, SaaS platforms, and enterprise portals using modern technologies.",

  keywords: [
    "web app development",
    "custom web applications",
    "enterprise web development",
    "SaaS application development",
    "full-stack development",
    "React.js development",
    "Node.js development",
    "cloud-based web apps",
    "web application development company",
    "secure web applications",
  ],

  openGraph: {
    title: "Web App Development Services | Enterprise & SaaS Applications",
    description:
      "Custom web app development services for startups and enterprises. Scalable, secure, and high-performance web applications tailored to your business needs.",
    url: "https://www.softreetechnology.com/services/offshore-web-app-development",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Web App Development Services",
    description:
      "Custom enterprise and SaaS web applications with modern technologies.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-web-app-development",
  },
};

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
