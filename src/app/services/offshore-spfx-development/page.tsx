import NavigationClient from "@/components/sections/navigation-client";
import SpfxHero from "./SpfxHero";
import SpfxServices from "./components/SpfxServices";
import SpfxStickyScroll from "./components/SpfxStickyScroll";
import SpfxTechnologyStack from "./components/SpfxTechnologyStack";
import SpfxHowWeWork from "./components/SpfxHowWeWork";
import SpfxSharepointSqueezeCarouselDemo from "./components/spfxSharepointSqueezeCarouselDemo";
import WhyChooseUs from "./components/WhyChooseUs";
import Footer from "@/components/sections/footer";
import SharePointCaseStudies from "./casestudies";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";


const spfxFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What are offshore SPFx development services?",
    answer:
      "Offshore SPFx development services help businesses build and customize SharePoint solutions with support from remote development teams. Softree Technology supports custom SharePoint Framework web parts, extensions, SharePoint Online customization, and Microsoft 365 integrations based on project requirements.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "What SPFx development services does Softree Technology offer?",
    answer:
      "Our SPFx development services can include custom SharePoint web part development, SharePoint Framework extensions, modern UI components, SharePoint Online customization, Microsoft 365 integration, and enhancements to existing SPFx solutions, depending on project scope.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Do you develop custom SPFx web parts for SharePoint Online?",
    answer:
      "Yes, custom SPFx web parts can extend SharePoint Online with reusable components and functionality tailored to business needs. These may include custom interfaces, interactive elements, and components that connect to supported SharePoint data and Microsoft 365 services.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can SPFx solutions integrate with Microsoft Graph and Microsoft 365?",
    answer:
      "SPFx solutions can integrate with Microsoft Graph and supported Microsoft 365 services to connect SharePoint experiences with relevant business data and applications. The available integrations depend on project requirements, API capabilities, permissions, and tenant configuration.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Can you customize SharePoint Online using SPFx?",
    answer:
      "Yes, the SharePoint Framework supports customization of modern SharePoint experiences through web parts and extensions. These can help tailor page functionality, navigation, user interfaces, and business-specific interactions while working within SharePoint Online's supported development model.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Do you provide offshore SPFx developers for ongoing projects?",
    answer:
      "Offshore SPFx development support can help businesses, consulting firms, and technology partners extend their engineering capacity for new development and ongoing enhancements. Team structure, engagement model, and project responsibilities can be defined according to your requirements.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "How long does SPFx web part development take?",
    answer:
      "SPFx development timelines depend on functionality, design complexity, integrations, testing requirements, and deployment needs. A straightforward web part generally requires less effort than a solution involving multiple components or Microsoft 365 integrations. A more accurate estimate can be provided after reviewing the project scope.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "How are SPFx solutions tested and deployed to SharePoint Online?",
    answer:
      "SPFx solutions should be tested for functionality, responsiveness, compatibility, and integration behavior before deployment. Deployment typically involves packaging the solution, configuring the SharePoint App Catalog where required, validating permissions, and checking the solution in the target environment.",
  },
];


export const metadata: Metadata = applyPageOg("/services/offshore-spfx-development", {
  title: {
    absolute: "Offshore SPFx Development Services | Softree",
  },

  description:
    "Custom SharePoint Framework (SPFx) development services. Build modern web parts, extensions, and Microsoft 365 intranet tools with Softree’s React developers.",

  keywords: [
    // Primary Keyword
    "SPFX development services",

    // Secondary Keywords
    "SharePoint Framework development",
    "SharePoint web part development",
    "SPFX customization",
    "SharePoint modern intranet",
    "React SharePoint development",
    "TypeScript SharePoint development",
    "SharePoint Framework solutions",
    "Microsoft 365 SPFX development",
    "SharePoint extension development",
    "SPFx development",
    "SPFx developer",
    "SharePoint SPFx development",
    "SharePoint app development",
    "SPFx development company",
    "SPFx development SharePoint Online",
    "Hire SPFx developers",
    "SPFx",
    "SharePoint Framework (SPFx)",
    "SPFx development services SharePoint",
    "Custom SharePoint Framework (SPFx)",
    "SPFx SharePoint",
    "SPFx development services SharePoint Framework",
    "SPFx app",
    "SPFx documentation",
    "SharePoint Framework developers",
    "SPFx development with React JS",
    "SharePoint Online development services",
    "Custom SharePoint web parts",
    "SharePoint customization services",
  ],

  openGraph: {
    title: "Offshore SPFx Development Services | Softree",
    description:
      "Custom SharePoint Framework (SPFx) development services. Build modern web parts, extensions, and Microsoft 365 intranet tools with Softree’s React developers.",
    url: "https://www.softreetechnology.com/services/offshore-spfx-development",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Offshore SPFx Development Services | Softree",
    description:
      "Custom SharePoint Framework (SPFx) development services. Build modern web parts, extensions, and Microsoft 365 intranet tools with Softree’s React developers.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-spfx-development",
  },
}, "Softree Technology");

export default function Page() {
  return (
    <main className="relative min-h-screen bg-black">
      <NavigationClient />
      <SpfxHero />

      {/* CORE WHITE LAYOUT CANVAS */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <TrustedBrandsMarquee />
        <SpfxServices />
        <SpfxStickyScroll />
        <SharePointCaseStudies />
        <SpfxTechnologyStack />
        <SpfxSharepointSqueezeCarouselDemo />
        <SpfxHowWeWork />
        <WhyChooseUs />
      </section>
      <LightFAQExact faqs={spfxFAQs} />
      <LightContactSection />

      <Footer />
    </main>
  );
}
