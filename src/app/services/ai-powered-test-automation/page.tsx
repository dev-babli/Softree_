import type { Metadata } from "next";

import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";

import HeroAIAutomation from "./hero";
import QAForgeLandingPage from "./trust";
import AutomationTestingServices from "./testing-services";
import AutomationTestingSolutions from "./testing-support";
import TechStack from "./tech";
import EngagementModels from "./models";
import WhySoftree from "./why";
import CTASection from "./cta";

export const metadata: Metadata = {
  title: "AI-Powered Test Automation Services | Softree",

  description:
    "Accelerate software delivery with AI-powered test automation services from Softree. Improve software quality, reduce regression cycles, and scale enterprise QA automation.",

  keywords: [
    "AI test automation",
    "automation testing services",
    "enterprise QA automation",
    "intelligent testing solutions",
    "software testing company",
    "automated regression testing",
    "QA automation services",
    "AI-powered software testing",
  ],

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/ai-powered-test-automation",
  },

  openGraph: {
    title: "AI-Powered Test Automation Services | Softree",

    description:
      "Deliver faster releases and improve software quality with scalable AI-powered automation testing solutions.",

    url: "https://www.softreetechnology.com/services/ai-powered-test-automation",

    siteName: "Softree",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI-Powered Test Automation Services",
      },
    ],

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "AI-Powered Test Automation Services | Softree",

    description:
      "Enterprise AI-powered automation testing and intelligent QA solutions.",

    images: ["/og-image.png"],
  },
};

export default function AIPoweredAutomationPage() {
  return (
    <div>
      <NavigationClient />
      <HeroAIAutomation />
      <QAForgeLandingPage />
      <AutomationTestingServices />
      <AutomationTestingSolutions />
      <EngagementModels />
      <WhySoftree />
      <TechStack />
      <CTASection />
      <Footer />

    </div>
  );
}
