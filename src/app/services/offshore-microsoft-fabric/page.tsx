import HeroWithTestimonial from "./hero";
import FabricTabs from "./fabric-tabs";
import ProwessSection from "./process";
import WhyFabricSection from "./business";
import HireFabricPricing from "./pricing";
import WhyChooseWithTestimonials from "./why";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import CtaFabric from "./cta";
import UseCasesSection from "./use-cases";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import FabricPartner from "./fabric-partner";
import { FabricFaq } from "./faq";
import type { Metadata } from "next";

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
      <CtaFabric />
      <FabricFaq />

      <Footer />
    </>
  );
}
