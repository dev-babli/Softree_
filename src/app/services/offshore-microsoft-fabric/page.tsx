import HeroWithTestimonial from "./hero";
import FabricTabs from "./fabric-tabs";
import ProwessSection from "./process";
import FabricCaseStudies from "./casestudies";
import WhyFabricSection from "./business";
import IndustriesSection from "./industry";
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
import { applyPageOg } from "@/lib/site-metadata";

const fabricFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Microsoft Fabric consulting and development services do you offer?",
    answer:
      "We specialize in Microsoft Fabric implementation, including Data Factory pipelines, Synapse Data Engineering, Synapse Data Science, Synapse Real-Time Analytics, and Power BI visualization. We build end-to-end solutions connecting OneLake with all your enterprise data sources.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How long does it take to develop a Microsoft Fabric solution?",
    answer:
      "Simple Microsoft Fabric setups and proof-of-concepts take 4-6 weeks. Complex enterprise analytics platforms with multi-source OneLake integration, custom ETL pipelines, and advanced dashboards take 8-12 weeks. We provide a detailed scope and timeline before starting development.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Can you integrate Microsoft Fabric with existing systems?",
    answer:
      "Yes, we integrate Microsoft Fabric with Dynamics 365, SharePoint, SQL Server, on-premises databases, external APIs, and legacy cloud environments. We ensure seamless data flow, lakehouse organization, and unified access controls across your entire data ecosystem.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Do you provide training for Microsoft Fabric solutions?",
    answer:
      "We provide comprehensive user training, developer documentation, and architecture handoff sessions. Your team learns to manage OneLake, run queries, and build reports. We also offer ongoing support packages for optimizations and updates.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How do you handle Microsoft Fabric security and governance?",
    answer:
      "We implement Microsoft best practices for data security, including Microsoft Purview integration, workspace identities, row-level and column-level security (RLS/CLS), and compliance with your organization's governance rules. We follow strict security standards to protect your data assets.",
  },
]

export const metadata: Metadata = applyPageOg("/services/offshore-microsoft-fabric", {
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
}, "Softree Technology");
export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <NavigationClient />
      <HeroWithTestimonial />
      <TrustedBrandsMarquee />
      <FabricTabs />
      <ProwessSection />
      <FabricCaseStudies />

      <UseCasesSection />
      <WhyFabricSection />
      <IndustriesSection />
      <FabricPartner />
      <HireFabricPricing />
      <WhyChooseWithTestimonials />
      <LightContactSection />
      <LightFAQExact faqs={fabricFAQs} />

      <Footer />
    </main>
  );
}
