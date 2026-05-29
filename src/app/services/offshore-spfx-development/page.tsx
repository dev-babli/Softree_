import NavigationClient from "@/components/sections/navigation-client";
import SharePointHero from "./hero";
import Footer from "@/components/sections/footer";
import SpfxBenefits from "./spfx-benefits";
import SpfxTabs from "./spfx-tab";
import SoftreeExpertiseTimeline from "./spfx.expertise";
import SpfxShowcase from "./case-study";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import type { Metadata } from "next";

const spfxFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What SPFX development services do you offer?",
    answer:
      "We build custom SharePoint Framework web parts, extensions, and modern intranet solutions using React, TypeScript, and Microsoft 365 best practices. We create responsive, performant, and secure SPFX solutions.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How long does it take to develop an SPFX web part?",
    answer:
      "Simple web parts take 2-4 weeks. Complex SPFX solutions with multiple web parts, integrations, and custom features take 6-10 weeks. We provide detailed timelines based on requirements.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Do you support both SharePoint Online and On-Premises?",
    answer:
      "We primarily develop for SharePoint Online (Microsoft 365), which is the modern platform for SPFX. For On-Premises environments, we can help with migration strategies to SharePoint Online.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can SPFX solutions integrate with Microsoft Graph and other M365 services?",
    answer:
      "Yes, we integrate SPFX solutions with Microsoft Graph API, Power Automate, Power BI, Teams, and other Microsoft 365 services to create comprehensive enterprise solutions.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What testing and deployment support do you provide?",
    answer:
      "We provide comprehensive testing, deployment to SharePoint App Catalog, version management, and documentation. We ensure smooth deployment across development, staging, and production environments.",
  },
]

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

const SECTION_WRAPPER = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24 py-24";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-black">
      <NavigationClient />
      <SharePointHero />

      {/* CORE WHITE LAYOUT CANVAS */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <TrustedBrandsMarquee />
        <div className={`${SECTION_WRAPPER} ${SECTION_GAP}`}>
          <SpfxTabs />
          <SpfxShowcase />
          <SpfxBenefits />
          <SoftreeExpertiseTimeline />
        </div>
      </section>

      <LightContactSection />
      <LightFAQExact faqs={spfxFAQs} />

      <Footer />
    </main>
  );
}
