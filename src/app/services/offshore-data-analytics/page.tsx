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
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import type { Metadata } from "next";

const powerBIFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Power BI development services do you offer?",
    answer:
      "We provide comprehensive Power BI development: interactive dashboards, data modeling, ETL processes, real-time analytics, reporting solutions, and enterprise BI systems. We help transform raw data into actionable insights.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How long does it take to build a Power BI dashboard?",
    answer:
      "Simple dashboards take 2-4 weeks. Complex enterprise BI solutions with multiple data sources and advanced analytics take 6-12 weeks. We provide detailed timelines based on data complexity and requirements.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Can you integrate Power BI with various data sources?",
    answer:
      "Yes, we integrate Power BI with SQL databases, Excel, SharePoint, Dynamics 365, Azure services, APIs, and third-party applications. We ensure seamless data connectivity and real-time updates.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Do you provide Power BI training for teams?",
    answer:
      "We offer comprehensive training for business users, analysts, and administrators. We cover dashboard creation, data modeling, DAX formulas, and best practices to empower your team to leverage Power BI effectively.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How do you handle Power BI security and governance?",
    answer:
      "We implement Row-Level Security (RLS), role-based access control, data encryption, and compliance with your governance policies. We follow Microsoft best practices and Microsoft Gold Partner security standards.",
  },
]
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

      <LightContactSection />
      <LightFAQExact faqs={powerBIFAQs} />
      <Footer />
    </main>
  );
}
