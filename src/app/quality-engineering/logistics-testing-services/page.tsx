import { applyPageOg } from "@/lib/site-metadata";
import React from "react";
import { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import LogisticsTestingHeroWrapper from "./components/LogisticsTestingHeroWrapper";
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
  "https://www.softreetechnology.com/quality-engineering/logistics-testing-services";

export const metadata: Metadata = applyPageOg("/quality-engineering/logistics-testing-services", {
  title: "Logistics Testing Services | Softree Technology",
  description:
    "Softree provides logistics testing services for TMS, WMS, APIs, EDI, warehouse systems, logistics platforms, automation, security, performance, and QA.",
  alternates: {
    canonical: "https://www.softreetechnology.com/quality-engineering/logistics-testing-services",
  },

  keywords: [
    "Logistics Testing Services",
    "Logistics Software Testing",
    "Logistics QA Services",
    "Logistics Application Testing",
    "Logistics Testing Company",
    "Logistics QA Testing",
    "Transportation Software Testing",
    "Transportation Application Testing",
    "Supply Chain Software Testing",
    "Supply Chain Application Testing",
    "TMS Testing",
    "TMS Testing Services",
    "Transportation Management System Testing",
    "WMS Testing",
    "WMS Testing Services",
    "Warehouse Management System Testing",
    "Warehouse Software Testing",
    "Logistics API Testing",
    "Logistics API Testing Services",
    "Logistics Integration Testing",
    "EDI Testing",
    "EDI Integration Testing",
    "Carrier API Testing",
    "Logistics Test Automation",
    "Logistics Automation Testing",
    "Logistics Functional Testing",
    "Logistics Regression Testing",
    "Logistics Performance Testing",
    "Logistics Security Testing",
    "Logistics Application Security Testing",
    "Logistics Reliability Testing",
    "Logistics End-to-End Testing",
    "Logistics Data Testing",
    "Logistics Interoperability Testing",
    "Logistics Portal Testing",
    "Logistics Mobile App Testing",
    "Warehouse Automation Testing",
    "Transportation Testing Services",
    "AI Logistics Testing",
    "AI-Powered Logistics Testing",
    "Offshore Logistics Testing",
    "Offshore Logistics QA",
    "Offshore Logistics Testing Services",
    "Offshore QA Services",
    "Dedicated Logistics Testing Team",
    "Logistics Quality Engineering",
    "Continuous Logistics Testing",
    "Continuous Logistics QA"
  ],
  openGraph: {
    title: "Logistics Testing Services | Softree Technology",
    description:
      "Specialized QA and performance testing for supply chain management systems, TMS, WMS, and IoT fleet tracking platforms.",
    url: "https://www.softreetechnology.com/quality-engineering/logistics-testing-services",
    siteName: "Softree Technology",
    type: "website",
  },
});

export default function LogisticsTestingPage() {
  return (
    <main className="min-h-screen bg-[#07090e]">
      <NavigationClient />
      <LogisticsTestingHeroWrapper />
      <TrustedBrandsMarquee surface="light" />
      <LogisticsTestingPositioning />
      <LogisticsTestingCoverage />
      <NewWhoDoWeServeSection className="bg-white" />
      <LogisticsTestingFramework />
      <OffshoreLogisticsTestingTeam />
      <LogisticsTestingCaseStudies />
      <LogisticsTestAutomation />
      <AgenticLogisticsTesting />
      {/* <LogisticsTestingWorkflow /> */}
      <LogisticsTechnologyTesting />

      <LogisticsSecurityTesting />
      <WhySoftreeLogisticsTesting />
      <LogisticsTestingFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
