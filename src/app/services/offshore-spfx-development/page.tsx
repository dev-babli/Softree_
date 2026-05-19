import NavigationClient from "@/components/sections/navigation-client";
import SharePointHero from "./hero";
import Footer from "@/components/sections/footer";
import SpfxBenefits from "./spfx-benefits";
import SpfxTabs from "./spfx-tab";
import SoftreeExpertiseTimeline from "./spfx.expertise";
import SpfxShowcase from "./case-study";
import CtaSharePoint from "./cta";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import { SPFaq } from "./faq";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SharePoint Framework (SPFX) Development Services | Custom Web Parts",

  description:
    "Professional SharePoint Framework (SPFX) development services. We build custom SharePoint web parts, extensions, and modern intranet solutions using SPFX with React, TypeScript, and Microsoft 365 best practices.",

  keywords: [
    "SharePoint Framework development",
    "SPFX development services",
    "SharePoint web part development",
    "SPFX customization",
    "SharePoint modern intranet",
    "React SharePoint development",
    "TypeScript SharePoint development",
    "SharePoint Framework solutions",
    "Microsoft 365 SPFX development",
    "SharePoint extension development",
  ],

  openGraph: {
    title: "SharePoint Framework (SPFX) Development Services",
    description:
      "Professional SPFX development services for custom SharePoint web parts and modern intranet solutions.",
    url: "https://www.softreetechnology.com/services/offshore-spfx-development",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SharePoint Framework (SPFX) Development Services",
    description:
      "Custom SPFX web parts, extensions, and modern SharePoint solutions built with React and TypeScript.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-spfx-development",
  },
};

export default function Page() {
  return (
    <div>
      <NavigationClient />
      <SharePointHero />
      <TrustedBrandsMarquee />

      <SpfxTabs />
      <SpfxShowcase />
      <SpfxBenefits />
      <SoftreeExpertiseTimeline />
      {/* <Certifications /> */}
      <CtaSharePoint />
      <SPFaq />

      <Footer />
    </div>
  );
}
