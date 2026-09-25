import React from "react";
import NavigationClient from '@/components/sections/navigation-client';
import Hero from "./components/Hero";
import HealthcareTestingHero from "./components/HealthcareTestingHero";
import TrustedBrandsMarquee from "./components/TrustedBrandsMarquee";
import HealthcareTestingPositioning from "./components/HealthcareTestingPositioning";
import HealthcareTestingFramework from "./components/HealthcareTestingFramework";
import OffshoreHealthcareTestingTeam from "./components/OffshoreHealthcareTestingTeam";
import HealthcareTestingCoverage from "./components/HealthcareTestingCoverage";
import HealthcareSecurityTesting from "./components/HealthcareSecurityTesting";
import HealthcareTestAutomation from "./components/HealthcareTestAutomation";
import AgenticHealthcareTesting from "./components/AgenticHealthcareTesting";
import HealthcareTestingWorkflow from "./components/HealthcareTestingWorkflow";
import HealthcareTechnologyTesting from "./components/HealthcareTechnologyTesting";
import WhySoftreeHealthcareTesting from "./components/WhySoftreeHealthcareTesting";
import HealthcareTestingCaseStudies from "./components/HealthcareTestingCaseStudies";
import HealthcareTestingFAQ from "./components/HealthcareTestingFAQ";
import LightContactSection from '@/components/homepage-light/LightContactSection';
import Footer from '@/components/sections/footer';

export const metadata = {
  title: "Healthcare Testing | Softree",
  description: "Reliable, secure, and compliant testing solutions for the healthcare industry.",
};

export default function HealthcareTestingPage() {
  return (
    <main className="min-h-screen">
      <NavigationClient />
      {/* <Hero /> */}
      <HealthcareTestingHero />
      <TrustedBrandsMarquee surface="light" />
      <HealthcareTestingPositioning />
      <HealthcareTestingCoverage />
      <HealthcareTestingFramework />
      <OffshoreHealthcareTestingTeam />

      <HealthcareTestAutomation />
      <AgenticHealthcareTesting />
      <HealthcareTestingWorkflow />
      <HealthcareTechnologyTesting />
      <HealthcareTestingCaseStudies />
      <HealthcareSecurityTesting />
      <WhySoftreeHealthcareTesting />
      <HealthcareTestingFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
