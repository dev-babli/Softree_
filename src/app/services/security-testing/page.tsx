import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import { StackedDimensionCards } from "./components/StackedDimensionCards";
import { BentoCapabilities } from "./components/BentoCapabilities";
import { AgenticWorkflowTracker } from "./components/AgenticWorkflowTracker";
import { ThreatMatrixList } from "./components/ThreatMatrixList";

import "./components/security-testing.css";

const WhyChooseWithTestimonials = dynamic(() => import('@/components/sections/why-choose-us'), { ssr: true });

const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });

const TrustedBrandsMarquee = dynamic(() => import('@/app/services/offshore-power-platform-development/trust'), { ssr: true });

export const metadata: Metadata = {
  title: "Security Testing Services | Offshore Security QA Team | Softree",
  description: "Protect applications with Softree’s offshore security testing services for web, mobile, API, and enterprise software, including vulnerability and penetration testing.",
  keywords: [
    "Security Testing Services",
    "Security Testing",
    "Software Security Testing",
    "Application Security Testing",
    "Web Application Security Testing",
    "API Security Testing",
    "Mobile Application Security Testing",
    "Security QA Services",
    "Cybersecurity Testing Services",
    "Vulnerability Assessment",
    "Penetration Testing Services",
    "Automated Security Testing",
    "DevSecOps Security Testing",
    "Enterprise Security Testing",
    "Offshore Security Testing",
    "Offshore Security QA Services",
    "Application Vulnerability Testing",
    "Security Regression Testing"
  ],
  openGraph: {
    title: 'Security Testing Services | Offshore Security QA Team | Softree',
    description: 'Softree’s offshore security testing team helps identify vulnerabilities and strengthen web, mobile, API, and enterprise applications through comprehensive security testing.',
    url: 'https://www.softreetechnology.com/services/security-testing-services',
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
    title: 'Security Testing Services | Offshore Security QA | Softree',
    description: 'Offshore security testing services for web, mobile, API, and enterprise applications, helping teams identify vulnerabilities and improve application security.',
    images: ['/logo/Softree-Technology-Final-Logo-Dark-BG.png'],
  },
};

const SecurityFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "How does Softree approach custom AI and automation development for enterprise organizations?",
    answer: "We approach custom AI development as a strategic partnership focused on measurable business outcomes. Our process begins with a comprehensive consulting phase where we assess your existing infrastructure, identify high-ROI use cases, and design a scalable enterprise architecture. By leveraging the Microsoft AI ecosystem, we ensure that every solution is secure, compliant, and seamlessly integrated into your existing environment.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "Can you integrate AI agents and Microsoft Copilot into our existing business workflows?",
    answer: "Absolutely. Integrating AI agents and Microsoft Copilot into existing enterprise systems is one of our core capabilities. We build intelligent automation solutions that connect these AI tools directly with your enterprise data, ERPs, and CRMs. This allows autonomous AI agents to handle complex, multi-step tasks securely.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What is your process for ensuring AI security and data governance?",
    answer: "We implement robust governance models encompassing role-based access control, strict API authentication, and comprehensive audit logging. All AI agents and models are tested for vulnerabilities, prompt injection risks, and data leakage before deployment.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How long does a typical enterprise AI implementation timeline take?",
    answer: "Timelines vary depending on complexity. A proof-of-concept (POC) can typically be delivered in 4-6 weeks, while a full enterprise integration involving custom AI agents and enterprise data sources generally takes 3-6 months to properly architect, test, and deploy.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What kind of ROI and business outcomes can we expect from generative AI solutions?",
    answer: "Clients typically see massive reductions in manual processing time, faster decision-making cycles, and improved accuracy in data-heavy tasks. ROI is usually measured through hours saved, improved customer satisfaction metrics, and reduced operational bottlenecks.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Do you provide ongoing maintenance and support for deployed AI solutions?",
    answer: "Yes, we offer comprehensive managed services including continuous monitoring, model fine-tuning, security patching, and workflow optimization to ensure your AI systems remain highly performant as your business scales.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "Why should we choose Softree as our AI consulting and development partner?",
    answer: "Softree combines deep Microsoft ecosystem expertise with cutting-edge AI engineering. We don't just build models; we build secure, enterprise-grade architectures that integrate seamlessly into your daily operations and drive real business value.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "How do you handle the integration of AI into legacy enterprise systems?",
    answer: "We utilize custom middleware, APIs, and robotic process automation (RPA) bridges where necessary to connect modern AI capabilities with legacy systems, ensuring zero disruption to your existing core operations.",
  },
];

const automationWhyChoose = [
  {
    iconName: "Users",
    title: "Dedicated QA Engineers",
    desc: "Experienced automation testing engineers providing dedicated long-term support for your quality assurance.",
  },
  {
    iconName: "Tag",
    title: "Flexible Engagement",
    desc: "Choose between project-based testing, team augmentation, or QA consulting & strategy.",
  },
  {
    iconName: "Expand",
    title: "End-to-End Testing",
    desc: "Comprehensive coverage from unit and API tests to full E2E UI automation across web and mobile.",
  },
  {
    iconName: "BrainCircuit",
    title: "AI-Powered Testing",
    desc: "Leveraging AI agents and LLMs to generate robust test scripts and edge cases automatically.",
  },
  {
    iconName: "UserPlus",
    title: "Seamless Integration",
    desc: "Integrate automated testing directly into your CI/CD pipelines (GitHub Actions, Azure DevOps) for continuous delivery.",
  },
  {
    iconName: "Globe",
    title: "Global Delivery",
    desc: "Round-the-clock testing cycles utilizing our global delivery centers for faster, more reliable releases.",
  },
];

const automationReviews = [
  {
    name: "Natasha Adams",
    company: "Wicked Point LLC",
    rating: 5,
    comment:
      "Softree completely transformed our QA process. Their automated testing suite caught critical bugs before production, and their team integrated seamlessly with our CI/CD pipeline.",
    location: "Virginia",
  },
  {
    name: "Arkady Fedorovtsjev",
    company: "ECG Group",
    rating: 5,
    comment:
      "The AI-driven test automation they implemented reduced our regression testing time by 80%. Exceptional quality and very responsive.",
    location: "Netherlands",
  },
  {
    name: "Darrell Trimble",
    company: "SP Marketplace",
    rating: 5,
    comment:
      "SOFTREE staff worked with us to understand our complex AI applications and built exactly the automated testing workflow we needed to scale confidently.",
    location: "California",
  },
];

import SecurityTestingPositioning from './components/SecurityTestingPositioning';
import SecurityTestingCoverage from './components/SecurityTestingCoverage';
import NewWhoDoWeServeSection from "@/components/sections/NewWhoDoWeServeSection";
import OffshoreSecurityTestingTeam from './components/OffshoreSecurityTestingTeam';
import WhySoftreeSecurityTesting from './components/WhySoftreeSecurityTesting';
import SecurityTestingFAQ from './components/SecurityTestingFAQ';
import SecurityTestingProcess from './components/SecurityTestingProcess';
import AgenticSecurityTesting from './components/AgenticSecurityTesting';
import SecurityTestingWorkflow from './components/SecurityTestingWorkflow';
import SecurityTestingCaseStudies from './components/SecurityTestingCaseStudies';
import SecurityTechnologyTesting from './components/SecurityTechnologyTesting';





import SecurityTestingVideoHero from './components/SecurityTestingVideoHero';
const ReverseStickyScroll = dynamic(() => import('./components/ReverseStickyScroll/ReverseStickyScroll').then((mod) => mod.ReverseStickyScroll), { ssr: true });

export default function SecurityTestingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <NavigationClient />


      <SecurityTestingVideoHero />
      <TrustedBrandsMarquee surface="legacy" />
      <SecurityTestingPositioning />

      <SecurityTestingCoverage />

      <NewWhoDoWeServeSection className="bg-white" />

      {/* Reverse Sticky Scroll Overall Header */}
      <div className="w-full max-w-[1340px] mx-auto px-4 mt-12 md:mt-16 mb-8 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase">
            SECURITY TESTING SERVICES
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4">
          One Security Testing Team Across <br />
          <span className="text-[#FF6B2C]">Every Stage of Your Software Lifecycle</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Softree provides end-to-end security testing services that help businesses identify vulnerabilities, validate security controls, protect sensitive data, and build more resilient software across web, mobile, API, and enterprise applications.
        </p>
      </div>

      <ReverseStickyScroll />

      <OffshoreSecurityTestingTeam />

      <SecurityTestingCaseStudies />

      <SecurityTestingProcess />

      <AgenticSecurityTesting />

      <SecurityTestingWorkflow />

      <SecurityTechnologyTesting />

      {/* <BentoCapabilities /> */}

      {/* <AgenticWorkflowTracker /> */}

      {/* <ThreatMatrixList /> */}

      {/* Component rendering here */}
      {/* <StackedDimensionCards /> */}

      <WhySoftreeSecurityTesting />

      <SecurityTestingFAQ />

      {/* <WhyChooseWithTestimonials /> */}


      <LightContactSection />

      <Footer />
    </main>
  );
}
