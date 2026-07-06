import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";

import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";

import { TestAutomationPage } from "@/components/test-automation/TestAutomationPage";

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
      "AI-powered tests can self-heal when UI changes, prioritize risky paths, and surface defect patterns. We use these capabilities to reduce brittle maintenance work and improve reliability where the application and pipeline are ready for intelligent automation.",
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
      "A practical first slice usually starts with one critical flow, one framework decision, and one CI/CD gate. Larger AI-assisted automation programs depend on application complexity, release cadence, environments, and how much existing QA structure is already in place.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Do you provide ongoing maintenance and support for test suites?",
    answer:
      "Yes, we offer continuous support including test suite maintenance, updates for application changes, performance monitoring, and adding new test cases as your application evolves.",
  },
]

export const metadata: Metadata = applyPageOg("/services/ai-powered-test-automation", {
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

    type: "website",
  },

  twitter: {
    title: "AI-Powered Test Automation Services | Softree",

    description:
      "Enterprise AI-powered automation testing and intelligent QA solutions.",
  },
}, "AI-Powered Test Automation Services");

export default function AIPoweredAutomationPage() {
  return (
    <div className="min-h-screen bg-white pt-[100px]">
      <NavigationClient />
      <TestAutomationPage faqs={testAutomationFAQs} />
      <Footer />
    </div>
  );
}
