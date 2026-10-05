import React from "react";
import NavigationClient from '@/components/sections/navigation-client';
import Hero from "./components/Hero";
import HealthcareTestingHero from "./components/HealthcareTestingHero";
import HealthcareTestingNeuralHero from "./components/HealthcareTestingNeuralHero";
import HealthcareTestingGlobeHero from "./components/HealthcareTestingGlobeHero";
import HealthcareTestingVideoHero from "./components/HealthcareTestingVideoHero";
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
import NewWhoDoWeServeSection from "@/components/sections/NewWhoDoWeServeSection";

export const metadata = {
  title: "Healthcare Software Testing Services | Offshore QA Team | Softree",
  description: "Improve the quality, security, performance, and reliability of healthcare applications with Softree’s offshore software testing and QA services.",
  alternates: {
    canonical: "https://www.softreetechnology.com/industries/healthcare-software-testing-services",
  },
  keywords: [
    'Healthcare Software Testing',
    'Healthcare Testing Services',
    'Healthcare QA Services',
    'Healthcare Application Testing',
    'Healthcare QA Testing',
    'Offshore Healthcare Testing',
    'Offshore QA Services',
    'Healthcare Application QA',
    'Medical Software Testing',
    'Healthcare Testing Company',
    'Healthcare Automation Testing',
    'Healthcare Performance Testing',
    'Healthcare Security Testing',
    'Healthcare API Testing',
    'Healthcare Mobile App Testing',
  ],
  openGraph: {
    title: 'Healthcare Software Testing Services | Offshore QA Team | Softree',
    description: 'Softree’s offshore QA team helps healthcare organizations test applications for quality, security, performance, usability, and reliability.',
    url: 'https://www.softreetechnology.com/industries/healthcare-software-testing-services',
    siteName: 'Softree Technology',
    images: [
      {
        url: '/logo/Softree-Technology-Final-Logo-Dark-BG.webp',
        width: 1200,
        height: 630,
        alt: 'Softree Technology Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare Software Testing Services | Offshore QA | Softree',
    description: 'Offshore healthcare QA and testing services for reliable, secure, high-performing healthcare applications and digital platforms.',
    images: ['/logo/Softree-Technology-Final-Logo-Dark-BG.webp'],
  },
};

export default function HealthcareTestingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <NavigationClient />
      {/* <Hero /> */}
      <HealthcareTestingHero />
      {/* <HealthcareTestingNeuralHero /> */}
      {/* <HealthcareTestingGlobeHero /> */}
      {/* <HealthcareTestingVideoHero /> */}
      <TrustedBrandsMarquee surface="light" />
      <HealthcareTestingPositioning />
      <HealthcareTestingCoverage />
      <NewWhoDoWeServeSection className="bg-white" />
      <HealthcareTestingFramework />
      <OffshoreHealthcareTestingTeam />
      <HealthcareTestingCaseStudies />
      <HealthcareTestAutomation />
      <AgenticHealthcareTesting />
      <HealthcareTestingWorkflow />
      <HealthcareTechnologyTesting />

      <HealthcareSecurityTesting />
      <WhySoftreeHealthcareTesting />
      <HealthcareTestingFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
