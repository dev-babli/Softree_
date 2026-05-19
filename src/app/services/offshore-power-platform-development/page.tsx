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
import TestimonialsSplitSlider from "./testimonial";
import PowerAppsService from "./services";
import HirePowerAppsPricing from "./pricing-card";
import StackedSlider from "./stack-slidr";
import TrustedBrandsMarquee from "./trust";
import { AgenticAIFAQSection } from "./faq";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Power Platform Development Services | Power Apps & Automation",

  description:
    "Professional Power Platform development services. We build custom Power Apps, automate workflows with Power Automate, and deliver enterprise solutions using the Microsoft Power Platform.",

  keywords: [
    "Power Platform development",
    "Power Apps development",
    "Power Automate services",
    "Power BI development",
    "custom Power Apps",
    "Power Apps consulting",
    "business process automation",
    "low-code development",
    "Microsoft Power Platform",
    "Power Platform development company",
  ],

  openGraph: {
    title: "Power Platform Development Services | Power Apps & Automation",
    description:
      "Professional Power Platform development services for custom Power Apps, automation, and enterprise solutions.",
    url: "https://www.softreetechnology.com/services/offshore-power-platform-development",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Power Platform Development Services",
    description:
      "Custom Power Apps, Power Automate workflows, and Power Platform solutions for businesses.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-power-platform-development",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <NavigationClient />

      {/* HERO (full width but aligned content internally) */}
      <PowerAppsHero />
      {/* <PowerAppsService /> */}
      <TrustedBrandsMarquee />
      <StackedSlider />
      {/* MAIN CONTENT SECTIONS */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <div>
          <PowerAppsCaseStudies />
          <PowerAppsServices />
          <HirePowerAppsPricing />
          <WhyChooseSoftreePowerApps />
          <TechStackSection />
          <PowerAppsProcess />
          {/* <TestimonialsSplitSlider /> */}
          {/* <Certifications /> */}
        </div>
      </section>

      <CtaPowerApps />
      <AgenticAIFAQSection />
      <Footer />
    </main>
  );
}
