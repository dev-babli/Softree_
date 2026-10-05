import React from "react";
import { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import LogisticsHero from "./components/logistics-hero";
import TrustedBrandsMarquee from "./components/TrustedBrandsMarquee";
import LogisticsTestingPositioning from "./components/LogisticsTestingPositioning";
import LogisticsTestingFramework from "./components/LogisticsTestingFramework";
import OffshoreLogisticsTestingTeam from "./components/OffshoreLogisticsTestingTeam";
import LogisticsTestingCoverage from "./components/LogisticsTestingCoverage";
import NewWhoDoWeServeSection from "@/components/sections/NewWhoDoWeServeSection";
import LogisticsSecurityTesting from "./components/LogisticsSecurityTesting";
import LogisticsTestAutomation from "./components/LogisticsTestAutomation";
import AgenticLogisticsTesting from "./components/AgenticLogisticsTesting";
import LogisticsTestingWorkflow from "./components/LogisticsTestingWorkflow";
import LogisticsTechnologyTesting from "./components/LogisticsTechnologyTesting";
import WhySoftreeLogisticsTesting from "./components/WhySoftreeLogisticsTesting";
import LogisticsTestingCaseStudies from "./components/LogisticsTestingCaseStudies";
import LogisticsTestingFAQ from "./components/LogisticsTestingFAQ";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";

const PAGE_URL =
  "https://www.softreetechnology.com/industries/logistics-testing";

export const metadata: Metadata = {
  title: "Logistics Testing Services | TMS, WMS & Supply Chain QA | Softree",
  description:
    "Validate TMS, WMS, visibility platforms, EDI, and warehouse automation with an offshore logistics testing team. Functional, API, security, performance, and regression QA for supply chain software.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Logistics Testing Services | Softree",
    description:
      "Offshore quality engineering for logistics and supply chain applications — TMS, WMS, EDI, APIs, automation, and security testing.",
    url: PAGE_URL,
    siteName: "Softree Technology",
    type: "website",
  },
};

export default function LogisticsTestingPage() {
  return (
    <main className="min-h-screen bg-[#07090e]">
      <NavigationClient />
      <LogisticsHero />
      <TrustedBrandsMarquee surface="light" />
      <LogisticsTestingPositioning />
      <LogisticsTestingCoverage />
      <NewWhoDoWeServeSection className="bg-white" />
      <LogisticsTestingFramework />
      <OffshoreLogisticsTestingTeam />
      <LogisticsTestAutomation />
      <AgenticLogisticsTesting />
      {/* <LogisticsTestingWorkflow /> */}
      <LogisticsTechnologyTesting />
      <LogisticsTestingCaseStudies />
      <LogisticsSecurityTesting />
      <WhySoftreeLogisticsTesting />
      <LogisticsTestingFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
