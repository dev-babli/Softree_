import { applyPageOg } from "@/lib/site-metadata";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";

import "./components/security-testing.css";

const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });

const TrustedBrandsMarquee = dynamic(() => import('@/app/services/offshore-power-platform-development/trust'), { ssr: true });

export const metadata: Metadata = applyPageOg("/quality-engineering/security-testing-services", {
  title: {
    absolute: "Security Testing Services | Softree Technology",
  },
  description:
    "Application security testing, penetration testing, vulnerability assessments, and AI safety evaluations for web, mobile, and cloud apps.",
  alternates: {
    canonical: "https://www.softreetechnology.com/quality-engineering/security-testing-services",
  },
  keywords: [
    "Security Testing Services",
    "Security Testing",
    "Software Security Testing",
    "Application Security Testing",
    "Application Security Testing Services",
    "Security Testing Company",
    "Security QA Services",
    "Security Quality Assurance",
    "Offshore Security Testing",
    "Offshore Security Testing Services",
    "Offshore Security QA",
    "Dedicated Security Testing Team",

    "Web Application Security Testing",
    "Web Security Testing",
    "Mobile Application Security Testing",
    "Mobile Security Testing",
    "API Security Testing",
    "API Security Testing Services",
    "Cloud Security Testing",
    "Enterprise Security Testing",
    "Enterprise Application Security Testing",

    "Vulnerability Assessment",
    "Vulnerability Assessment Services",
    "Security Vulnerability Testing",
    "Vulnerability Testing Services",
    "Penetration Testing",
    "Penetration Testing Services",
    "Application Penetration Testing",
    "Web Application Penetration Testing",
    "API Penetration Testing",

    "Security Automation Testing",
    "Automated Security Testing",
    "Continuous Security Testing",
    "Security Regression Testing",
    "Security Test Automation",
    "CI/CD Security Testing",
    "DevSecOps Testing",
    "Security Testing in CI/CD",

    "API Security Testing Services",
    "API Security Validation",
    "Authentication Testing",
    "Authorization Testing",
    "Access Control Testing",
    "Data Security Testing",
    "Data Protection Testing",

    "AI Security Testing",
    "AI Application Security Testing",
    "Generative AI Security Testing",
    "LLM Security Testing",
    "AI Safety Testing",
    "AI Guardrail Testing",
    "AI Vulnerability Testing",
    "Prompt Injection Testing",

    "Security Test Strategy",
    "Security Test Planning",
    "Security Validation",
    "Security Risk Assessment",
    "Security Quality Engineering",
    "Continuous Security Validation",
    "Security Defect Analysis",
    "Security Testing Frameworks",

    "Offshore QA Services",
    "Offshore Security QA Services",
    "Security Testing Outsourcing",
    "Security Testing Team",
    "Dedicated QA Security Team",
    "Security Quality Engineering Services"
  ],
  openGraph: {
    title: "Security Testing Services | Softree Technology",
    description:
      "Application security testing, penetration testing, vulnerability assessments, and AI safety evaluations for web, mobile, and cloud apps.",
    url: "https://www.softreetechnology.com/quality-engineering/security-testing-services",
    siteName: "Softree Technology",
    type: "website",
  },
});



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





import SecurityTestingSilkHero from './components/SecurityTestingSilkHero';
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
          "name": "Security Testing Services",
          "item": "https://www.softreetechnology.com/quality-engineering/security-testing-services"
        }
      ]
    },
    {
      "@type": "Service",
      "name": "Security Testing Services",
      "serviceType": "Application Security Testing & Vulnerability Assessment",
      "description":
        "Application security testing, penetration testing, vulnerability assessments, and AI safety evaluations for web, mobile, and cloud apps.",
      "url": "https://www.softreetechnology.com/quality-engineering/security-testing-services",
      "provider": {
        "@type": "Organization",
        "name": "Softree Technology",
        "url": "https://www.softreetechnology.com"
      },
      "areaServed": "Global"
    },
    {
      "@type": "VideoObject",
      "name": "Security Testing Services & Application Vulnerability Assessment Overview",
      "description":
        "Discover how Softree Technology delivers comprehensive application security testing, penetration testing, vulnerability assessments, DevSecOps, and AI safety evaluations.",
      "thumbnailUrl": [
        "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video-poster.webp",
        "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo-Dark-BG.webp"
      ],
      "uploadDate": "2025-01-15T08:00:00+00:00",
      "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/security-position-video.mp4",
      "embedUrl": "https://www.softreetechnology.com/quality-engineering/security-testing-services",
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

export default function SecurityTestingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NavigationClient />

      <SecurityTestingSilkHero />

      <TrustedBrandsMarquee surface="legacy" />
      <SecurityTestingPositioning />

      <SecurityTestingCoverage />

      {/* <NewWhoDoWeServeSection className="bg-white" /> */}

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

      {/* <OffshoreSecurityTestingTeam /> */}

      <SecurityTestingCaseStudies />

      <SecurityTestingProcess />

      {/* <AgenticSecurityTesting /> */}

      {/* <SecurityTestingWorkflow /> */}

      <SecurityTechnologyTesting />

      <WhySoftreeSecurityTesting />

      <SecurityTestingFAQ />

      <LightContactSection />

      <Footer />
    </main>
  );
}
