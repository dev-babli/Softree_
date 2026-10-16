import dynamic from "next/dynamic";
import { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";

import AutomationTestingHero from "./components/AutomationTestingHero";

import "./components/ai-testing.css";

const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });

const TrustedBrandsMarquee = dynamic(() => import('@/app/services/offshore-power-platform-development/trust'), { ssr: true });

export const metadata: Metadata = {
  title: "Automation Testing Services | Offshore QA Team | Softree",
  description: "Accelerate software releases with Softree’s offshore automation testing and QA services for web, mobile, API, and enterprise applications.",
  alternates: {
    canonical: "https://www.softreetechnology.com/quality-engineering/automation-testing-services",
  },
  keywords: [
    "Automation Testing",
    "AI Testing",
    "QA Automation",
    "Enterprise QA",
    "Automation Testing Services",
    "Test Automation Services",
    "Software Test Automation",
    "QA Automation Services",
    "Automation Testing Company",
    "Automation Testing Solutions",
    "Automated Software Testing",
    "Web Automation Testing",
    "Web UI Test Automation",
    "Mobile Test Automation",
    "API Test Automation",
    "API Testing Services",
    "Functional Test Automation",
    "Automated Regression Testing",
    "Performance Test Automation",
    "Continuous Testing",
    "CI/CD Test Automation",
    "End-to-End Test Automation",
    "Automation Testing Frameworks",
    "AI-Powered Test Automation",
    "AI Testing Services",
    "Self-Healing Test Automation",
    "Offshore Automation Testing",
    "Offshore QA Services",
    "Dedicated QA Automation Team",
    "Offshore QA Automation Team"
  ],
  openGraph: {
    title: 'Automation Testing Services | Offshore QA Team | Softree',
    description: 'Softree’s offshore QA automation team helps businesses improve test coverage, accelerate releases, and deliver reliable web, mobile, API, and enterprise software.',
    url: 'https://www.softreetechnology.com/quality-engineering/automation-testing-services',
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
    title: 'Automation Testing Services | Offshore QA | Softree',
    description: 'Offshore automation testing and QA services for web, mobile, API, and enterprise applications, with CI/CD, regression, and AI-powered testing.',
    images: ['/logo/Softree-Technology-Final-Logo-Dark-BG.webp'],
  },
};



import AiTestingPositioning from './components/AiTestingPositioning';
import AiTestingCoverage from './components/AiTestingCoverage';
import NewWhoDoWeServeSection from "@/components/sections/NewWhoDoWeServeSection";
import OffshoreAutomationTestingTeam from './components/OffshoreAutomationTestingTeam';
import WhySoftreeAutomationTesting from './components/WhySoftreeAutomationTesting';
import AutomationTestingFAQ from './components/AutomationTestingFAQ';
import AutomationTestingProcess from './components/AutomationTestingProcess';
import AgenticAutomationTesting from './components/AgenticAutomationTesting';
import AutomationTestingWorkflow from './components/AutomationTestingWorkflow';
import AutomationTestingCaseStudies from './components/AutomationTestingCaseStudies';
import AutomationTechnologyTesting from './components/AutomationTechnologyTesting';





const ReverseStickyScroll = dynamic(() => import('./components/ReverseStickyScroll/ReverseStickyScroll').then((mod) => mod.ReverseStickyScroll), { ssr: true });

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.softreetechnology.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Quality Engineering",
          "item": "https://www.softreetechnology.com/quality-engineering"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Automation Testing Services",
          "item": "https://www.softreetechnology.com/quality-engineering/automation-testing-services"
        }
      ]
    },
    {
      "@type": "Service",
      "name": "Automation Testing Services",
      "serviceType": "Quality Engineering & Test Automation Services",
      "description":
        "Accelerate software releases with Softree’s offshore automation testing and QA services for web, mobile, API, and enterprise applications.",
      "url": "https://www.softreetechnology.com/quality-engineering/automation-testing-services",
      "provider": {
        "@type": "Organization",
        "name": "Softree Technology",
        "url": "https://www.softreetechnology.com"
      },
      "areaServed": "Global"
    },
    {
      "@type": "VideoObject",
      "name": "Automation Testing Services & Quality Engineering Overview",
      "description":
        "Discover how Softree Technology delivers end-to-end automation testing and QA services for web, mobile, API, and enterprise applications with dedicated offshore engineering teams.",
      "thumbnailUrl": [
        "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video-poster.webp",
        "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo-Dark-BG.webp"
      ],
      "uploadDate": "2025-01-15T08:00:00+00:00",
      "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/automation-testing.mp4",
      "embedUrl": "https://www.softreetechnology.com/quality-engineering/automation-testing-services",
      "duration": "PT30S",
      "publisher": {
        "@type": "Organization",
        "name": "Softree Technology",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.softreetechnology.com/logo/logo.png"
        }
      }
    }
  ]
};

export default function AITestingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NavigationClient />
      <AutomationTestingHero />

      <TrustedBrandsMarquee surface="legacy" />
      <AiTestingPositioning />

      <AiTestingCoverage />

      {/* <NewWhoDoWeServeSection className="bg-white" /> */}

      {/* Reverse Sticky Scroll Overall Header */}
      <div className="w-full max-w-[1340px] mx-auto px-4 mt-12 md:mt-16 mb-8 flex flex-col items-start text-left">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-3.5 py-1 rounded-full border border-white/60 mb-4 inline-block">
          <span className="typo-caption text-[#FF6B2C] uppercase">
            AUTOMATION TESTING SERVICES
          </span>
        </div>

        <h2 className="typo-heading-2 text-slate-900 mb-4">
          One Automation Testing Team Across <br />
          <span className="text-[#FF6B2C]">Every Stage of Your Software Lifecycle</span>
        </h2>

        <p className="typo-description text-slate-500 max-w-2xl">
          Softree provides end-to-end automation testing services that help businesses improve test coverage, accelerate releases, reduce repetitive testing, and deliver reliable software across web, mobile, API, and enterprise applications.
        </p>
      </div>

      <ReverseStickyScroll />

      {/* <OffshoreAutomationTestingTeam /> */}

      <AutomationTestingCaseStudies />

      <AutomationTestingProcess />

      {/* <AgenticAutomationTesting /> */}

      {/* <AutomationTestingWorkflow /> */}

      <AutomationTechnologyTesting />

      <WhySoftreeAutomationTesting />

      <AutomationTestingFAQ />

      <LightContactSection />

      <Footer />
    </main>
  );
}
