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
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";

const testAutomationFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What AI-powered test automation services do you offer?",
    answer:
      "We provide AI-driven test automation for web, mobile, and API testing. Our solutions use machine learning to create resilient tests, reduce maintenance, and accelerate release cycles while improving test coverage.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How does AI improve test automation compared to traditional approaches?",
    answer:
      "AI-powered tests self-heal when UI changes, intelligently identify edge cases, and reduce false positives. This significantly lowers maintenance overhead and increases test reliability compared to traditional script-based automation.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What testing frameworks and tools do you use?",
    answer:
      "We work with industry-standard tools: Selenium, Cypress, Playwright, Appium, and AI-powered platforms. We select the right tools based on your technology stack, application type, and testing requirements.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How long does it take to implement AI-powered test automation?",
    answer:
      "Initial test automation setup takes 4-8 weeks. Full implementation with AI-powered features and comprehensive coverage takes 8-12 weeks depending on application complexity and scope.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Do you provide ongoing maintenance and support for test suites?",
    answer:
      "Yes, we offer continuous support including test suite maintenance, updates for application changes, performance monitoring, and adding new test cases as your application evolves.",
  },
]

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
      <LightContactSection />
      <LightFAQExact faqs={testAutomationFAQs} />
      <Footer />

    </div>
  );
}
