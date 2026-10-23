import NavigationClient from "@/components/sections/navigation-client";
import TechStack from "./tech-stack";
import Footer from "@/components/sections/footer";
import PowerAppsCaseStudies from "./casestudies";
import SharePointHero2 from "./components/SharePointHero2";
import SharepointSqueezeCarouselDemo from "./components/SharepointSqueezeCarouselDemo";
import SharePointServices from "./components/SharePointServices";
import SharePointStickyScroll from "./components/SharePointStickyScroll";
import WhyChooseUs from "./why-chose";
import SharePointHowWeWork from "./components/SharePointHowWeWork";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";


const sharePointFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What are offshore SharePoint development services?",
    answer:
      "Offshore SharePoint development services help businesses extend their engineering capacity with remote specialists. Softree Technology develops custom SharePoint portals, intranets, document management solutions, workflow automation, and Microsoft 365 integrations tailored to business requirements.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "What SharePoint solutions can Softree Technology develop?",
    answer:
      "We develop custom SharePoint intranets, enterprise portals, SharePoint Framework (SPFx) web parts, document management systems, collaboration platforms, and automated business workflows designed to improve productivity and information access.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Do you provide SharePoint Online development services?",
    answer:
      "Yes. We build and customize SharePoint Online solutions, including modern intranet sites, custom web parts, document libraries, permission structures, and Microsoft 365 integrations to support secure enterprise collaboration.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can you integrate SharePoint with Microsoft 365 and Power Platform?",
    answer:
      "Yes. We integrate SharePoint with Microsoft Teams, Power Apps, Power Automate, Microsoft Graph API, and other business applications to connect data, automate repetitive tasks, and streamline collaboration across your organization.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Can you automate business processes using SharePoint?",
    answer:
      "Yes. We build SharePoint workflow automation solutions using Power Automate and related Microsoft technologies to streamline document approvals, notifications, task assignments, and other repetitive business processes.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Do you support SharePoint migration and modernization?",
    answer:
      "We can help assess existing SharePoint environments, plan migration to SharePoint Online, move content and document libraries, review permissions, and validate functionality. The migration approach depends on your current platform, customizations, data volume, and business requirements.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "How do you secure SharePoint applications and documents?",
    answer:
      "We consider access permissions, role-based authorization, Microsoft Entra ID integration, secure API access, and governance requirements when designing SharePoint solutions. Security controls are aligned with your organization's policies and compliance needs.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "Why choose Softree Technology for offshore SharePoint development?",
    answer:
      "Softree Technology helps businesses extend their development capacity with offshore engineering support for SharePoint customization, Microsoft 365 integration, workflow automation, and enterprise collaboration solutions. Our approach focuses on business requirements, maintainable implementations, and integration with your existing systems.",
  },
];


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
export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <NavigationClient />

      {/* Hero */}
      <SharePointHero2 />

      {/* Trusted By Marquee */}
      <TrustedBrandsMarquee />

      {/* Who We Help & Where We Operate */}
      <SharePointServices />

      {/* What We Build - Sticky Scroll */}
      <SharePointStickyScroll />

      {/* Success Stories */}
      <PowerAppsCaseStudies />

      {/* Technology Stack */}
      <TechStack />
      <SharepointSqueezeCarouselDemo />
      <SharePointHowWeWork />

      {/* Why choose us */}
      <WhyChooseUs />

      <LightFAQExact faqs={sharePointFAQs} />
      <LightContactSection />
      <Footer />
    </main>
  );
}
