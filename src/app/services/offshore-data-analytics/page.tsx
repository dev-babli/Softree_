import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import PowerBIServicesTabs from "./power-bi-tabs";
import Certifications from "./certification";
import PowerBIHero from "./hero";
import CtaAbout from "./cta";
import WhyChooseUs from "./why";
import PowerBIStackOverview from "./tools";
import PowerBIBenefits from "./benefits";
import StackedSlider from "./stach-slider";
import PowerBICaseStudies from "./case-studies";
import HirePowerBIPricing from "./pricing";
import PowerBIProcessSection from "./process";
import TestimonialsSplitSlider from "./testimonials";
import { PowerBIFaq } from "./faq";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import type { Metadata } from "next";
/* ------------------------------------------------------------------ */
/* Fixed Width Config                                                  */
/* ------------------------------------------------------------------ */
const FIXED_WIDTH = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";

export const metadata: Metadata = {
  title: "Power BI Development Services | Power BI Consulting & Dashboard",

  description:
    "Transform business data into actionable insights with our Power BI development services. We build interactive dashboards, real-time analytics, reporting solutions, and enterprise BI systems using Microsoft Power BI.",

  keywords: [
    "Power BI development services",
    "Power BI consulting",
    "Power BI dashboard development",
    "business intelligence services",
    "Power BI analytics",
    "Power BI reporting",
    "Microsoft Power BI solutions",
    "enterprise BI solutions",
    "data visualization services",
    "Power BI experts",
  ],

  openGraph: {
    title: "Power BI Development Services | Dashboard & Analytics Solutions",
    description:
      "Build powerful dashboards and analytics solutions with Microsoft Power BI. Get real-time insights, reporting automation, and enterprise BI services.",
    url: "https://www.softreetechnology.com/services/offshore-data-analytics",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Power BI Development Services | Dashboard & Analytics Solutions",
    description:
      "Interactive dashboards, advanced analytics, and enterprise Power BI solutions tailored for your business.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-data-analytics",
  },
};
export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NavigationClient />

      {/* HERO (can stay full-width internally) */}
      <PowerBIHero />
      {/* <PowerBICaseStudies /> */}
      <TrustedBrandsMarquee />
      <StackedSlider />
      <PowerBICaseStudies />
      <PowerBIServicesTabs />
      <PowerBIBenefits />
      <PowerBIStackOverview />
      <HirePowerBIPricing />
      <PowerBIProcessSection />
      <WhyChooseUs />

      <Certifications />

      <CtaAbout />
      <PowerBIFaq />
      <Footer />
    </main>
  );
}
