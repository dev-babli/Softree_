import NavigationClient from "@/components/sections/navigation-client";
import SharePointMigration from "./sp-migrarion";
import TechStack from "./tech-stack";
import SharePointMigrationProcess from "./sp-process";
import AIDrivenSharePointMigration from "./ai-sp";
import Footer from "@/components/sections/footer";
import PowerAppsCaseStudies from "./casestudies";
import TimelinePage from "./timeline";
import SharePointHero from "./hero";
import HireSharePointPricing from "./pricing-cards";
import WhyChooseUs from "./why-chose";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";

const sharePointFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What SharePoint services do you offer?",
    answer:
      "We provide comprehensive SharePoint development: custom intranets, document management systems, workflow automation, SharePoint Online migration, custom web parts, Power Apps integration, and enterprise portal solutions.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How long does a SharePoint migration typically take?",
    answer:
      "SharePoint migrations typically take 4-12 weeks depending on data volume, complexity, and custom requirements. We perform detailed assessment before migration and provide phased rollout with minimal business disruption.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Do you support both SharePoint On-Premises and Online?",
    answer:
      "Yes, we work with both SharePoint On-Premises and SharePoint Online. We can help migrate from On-Premises to Online, maintain hybrid environments, or develop solutions for either platform based on your needs.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can you integrate SharePoint with other Microsoft 365 tools?",
    answer:
      "Absolutely. We integrate SharePoint with Power Apps, Power Automate, Teams, Power BI, and other Microsoft 365 services to create seamless collaboration and automation solutions for your organization.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What post-migration support do you provide?",
    answer:
      "We offer comprehensive post-migration support including user training, system monitoring, performance optimization, security updates, and ongoing maintenance to ensure your SharePoint environment runs smoothly.",
  },
]

export const metadata: Metadata = applyPageOg("/services/offshore-sharepoint-development", {
  title: {
    absolute: "Offshore SharePoint Development Services | Softree",
  },

  description:
    "Offshore SharePoint development services. Build custom intranets, document management systems, and modern portals with Softree’s Microsoft 365 engineers.",

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
    title: "Offshore SharePoint Development Services | Softree",
    description:
      "Offshore SharePoint development services. Build custom intranets, document management systems, and modern portals with Softree’s Microsoft 365 engineers.",
    url: "https://www.softreetechnology.com/services/offshore-sharepoint-development",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Offshore SharePoint Development Services | Softree",
    description:
      "Offshore SharePoint development services. Build custom intranets, document management systems, and modern portals with Softree’s Microsoft 365 engineers.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-sharepoint-development",
  },
}, "Softree Technology");
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
          <TrustedBrandsMarquee />
          <PowerAppsCaseStudies />
          <SharePointMigration />
          <SharePointMigrationProcess />
          <AIDrivenSharePointMigration />
          <WhyChooseUs />
          <TechStack />
          <HireSharePointPricing />
          <TimelinePage />
        </div>
      </section>

      <LightContactSection />
      <LightFAQExact faqs={sharePointFAQs} />

      <Footer />
    </main>
  );
}
