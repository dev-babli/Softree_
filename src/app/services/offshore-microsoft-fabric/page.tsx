import HeroWithTestimonial from "./hero";
import FabricTabs from "./fabric-tabs";
import ProwessSection from "./process";
import WhyFabricSection from "./business";
import HireFabricPricing from "./pricing";
import WhyChooseWithTestimonials from "./why";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import UseCasesSection from "./use-cases";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import FabricPartner from "./fabric-partner";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import type { Metadata } from "next";

const fabricFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Microsoft Fabric services do you offer?",
    answer:
      "We provide end-to-end Microsoft Fabric consulting: data engineering, data warehousing, real-time analytics, Power BI integration, data science, and AI implementation. We help organizations build unified analytics platforms.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How does Microsoft Fabric differ from Power BI?",
    answer:
      "Microsoft Fabric is a unified analytics platform that includes Power BI, Synapse, and Data Factory in one SaaS solution. It provides data engineering, data science, and real-time analytics capabilities beyond traditional BI reporting.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Can you help migrate from legacy data platforms to Fabric?",
    answer:
      "Yes, we specialize in migrating from legacy systems, on-premises data warehouses, and other cloud platforms to Microsoft Fabric. We ensure data integrity, minimal downtime, and optimized performance during migration.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How long does a Fabric implementation typically take?",
    answer:
      "Fabric implementations vary from 6-16 weeks depending on complexity. Simple data lake setups take 6-8 weeks, while enterprise-wide analytics platforms with multiple data sources take 12-16 weeks.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Do you provide training for Microsoft Fabric?",
    answer:
      "We provide comprehensive training for data engineers, analysts, and business users. We cover data modeling, Power BI integration, data science tools, and governance to ensure your team can effectively use Fabric.",
  },
]

export const metadata: Metadata = {
  title: "Microsoft Fabric Consulting Services | Data Analytics & AI Solutions",

  description:
    "Transform enterprise data with Microsoft Fabric consulting services. We deliver unified analytics, data engineering, Power BI integration, real-time intelligence, and AI-powered business solutions using Microsoft Fabric.",

  keywords: [
    "Microsoft Fabric consulting",
    "Microsoft Fabric services",
    "Fabric analytics solutions",
    "Power BI Fabric integration",
    "data engineering services",
    "real-time analytics",
    "enterprise data platform",
    "Fabric implementation",
    "AI analytics solutions",
    "business intelligence services",
  ],

  openGraph: {
    title: "Microsoft Fabric Consulting Services | Unified Analytics Solutions",
    description:
      "Build scalable analytics and AI-driven enterprise data solutions with Microsoft Fabric.",
    url: "https://www.softreetechnology.com/services/offshore-microsoft-fabric",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Microsoft Fabric Consulting Services",
    description:
      "Unified analytics, Power BI integration, data engineering, and AI solutions with Microsoft Fabric.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-microsoft-fabric",
  },
};
export default function Home() {
  return (
    <>
      <NavigationClient />
      <HeroWithTestimonial />
      <TrustedBrandsMarquee />
      <FabricTabs />
      <ProwessSection />

      <UseCasesSection />
      <WhyFabricSection />
      <FabricPartner />
      <HireFabricPricing />
      <WhyChooseWithTestimonials />
      <LightContactSection />
      <LightFAQExact faqs={fabricFAQs} />

      <Footer />
    </>
  );
}
