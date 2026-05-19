import NavigationClient from "@/components/sections/navigation-client";
import SharePointMigration from "./sp-migrarion";
import SharePointFeatures from "./feature";
import TechStack from "./tech-stack";
import SharePointMigrationProcess from "./sp-process";
import AIDrivenSharePointMigration from "./ai-sp";
import Footer from "@/components/sections/footer";
import PowerAppsCaseStudies from "./casestudies";
import TimelinePage from "./timeline";
import SharePointHero from "./hero";
import HireSharePointPricing from "./pricing-cards";
import CtaSharePoint from "./cta";
import WhyChooseUs from "./why-chose";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import { SPFaq } from "./faq";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SharePoint Development Services | Custom Intranet & Solutions",

  description:
    "Professional SharePoint development services. We build custom SharePoint intranets, document management systems, and enterprise portals with migration, customization, and support.",

  keywords: [
    "SharePoint development",
    "SharePoint customization",
    "SharePoint migration",
    "SharePoint intranet development",
    "Microsoft 365 development",
    "SharePoint consulting services",
    "SharePoint solutions",
    "enterprise portal development",
    "document management system",
    "SharePoint development company",
  ],

  openGraph: {
    title: "SharePoint Development Services | Custom Intranet & Solutions",
    description:
      "Professional SharePoint development services for custom intranets, document management, and enterprise portals.",
    url: "https://www.softreetechnology.com/services/offshore-sharepoint-development",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SharePoint Development Services",
    description:
      "Custom SharePoint development, migration, and enterprise portal solutions.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-sharepoint-development",
  },
};
const FIXED_WIDTH = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#141414]">
      <NavigationClient />

      {/* HERO (can stay full-width or internally centered) */}
      <SharePointHero />

      {/* MAIN CONTENT – FIXED WIDTH */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <div className={FIXED_WIDTH}>
          {/* <SharePointFeatures /> */}
          <TrustedBrandsMarquee />
          <PowerAppsCaseStudies />
          <SharePointMigration />
          <SharePointMigrationProcess />
          <AIDrivenSharePointMigration />
          <WhyChooseUs />
          <TechStack />
          <HireSharePointPricing />
          <TimelinePage />
          {/* <Certifications /> */}
        </div>
      </section>

      <CtaSharePoint />
      <SPFaq />

      <Footer />
    </main>
  );
}
