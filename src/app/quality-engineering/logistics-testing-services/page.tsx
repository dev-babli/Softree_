import { applyPageOg } from "@/lib/site-metadata";
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
import LogisticsTechnologyTesting from "./components/LogisticsTechnologyTesting";
import WhySoftreeLogisticsTesting from "./components/WhySoftreeLogisticsTesting";
import LogisticsTestingCaseStudies from "./components/LogisticsTestingCaseStudies";
import LogisticsTestingFAQ from "./components/LogisticsTestingFAQ";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";

export const metadata: Metadata = applyPageOg("/quality-engineering/logistics-testing-services", {
  title: {
    absolute: "Logistics Testing Services | Softree Technology",
  },
  description:
    "Softree provides logistics testing services for TMS, WMS, APIs, EDI, warehouse systems, logistics platforms, automation, security, performance, and QA.",
  alternates: {
    canonical: "https://www.softreetechnology.com/quality-engineering/logistics-testing-services",
  },

  keywords: [
    // Primary Keyword
    "Logistics Testing Services",

    // Secondary Keywords
    "Logistics Software Testing",
    "Logistics QA Testing",
    "Supply Chain Software Testing",
    "TMS Testing Services",
    "WMS Testing Services",
    "Transportation Management System Testing",
    "Warehouse Management System Testing",
    "Logistics Integration Testing",
    "Logistics API Testing",
    "EDI Integration Testing",
    "Logistics Test Automation",
    "Logistics Performance Testing",
    "Logistics Security Testing",
    "Offshore Logistics Testing Services",
    "Logistics Quality Engineering",
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
          "name": "Logistics Testing Services",
          "item": "https://www.softreetechnology.com/quality-engineering/logistics-testing-services"
        }
      ]
    },
    {
      "@type": "Service",
      "name": "Logistics Testing Services",
      "serviceType": "Logistics Software Testing & Supply Chain Quality Engineering Services",
      "description":
        "Softree provides logistics testing services for TMS, WMS, APIs, EDI, warehouse systems, logistics platforms, automation, security, performance, and QA.",
      "url": "https://www.softreetechnology.com/quality-engineering/logistics-testing-services",
      "provider": {
        "@type": "Organization",
        "name": "Softree Technology",
        "url": "https://www.softreetechnology.com"
      },
      "areaServed": "Global"
    },
    {
      "@type": "VideoObject",
      "name": "Logistics Software Testing Services & Supply Chain QA Overview",
      "description":
        "Discover how Softree Technology delivers end-to-end logistics testing services, validating TMS, WMS, freight tracking, supply chain integrations, and enterprise logistics systems.",
      "thumbnailUrl": [
        "https://www.softreetechnology.com/images/solutions/ai-for-logistics/hero.webp",
        "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo-Dark-BG.webp"
      ],
      "uploadDate": "2025-01-15T08:00:00+00:00",
      "contentUrl": "https://www.softreetechnology.com/images/solutions/ai-for-logistics/hero.mp4",
      "embedUrl": "https://www.softreetechnology.com/quality-engineering/logistics-testing-services",
      "duration": "PT30S",
      "publisher": {
        "@type": "Organization",
        "name": "Softree Technology",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo.png"
        }
      }
    }
  ]
};

export default function LogisticsTestingPage() {
  return (
    <main className="min-h-screen bg-[#07090e]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NavigationClient />
      <LogisticsTestingHeroWrapper />
      <TrustedBrandsMarquee surface="light" />
      <LogisticsTestingPositioning />
      <LogisticsTestingCoverage />
      {/* <NewWhoDoWeServeSection className="bg-white" /> */}
      <LogisticsTestingFramework />
      {/* <OffshoreLogisticsTestingTeam /> */}
      <LogisticsTestingCaseStudies />
      <LogisticsTestAutomation />
      {/* <AgenticLogisticsTesting /> */}
      <LogisticsTechnologyTesting />

      {/* <LogisticsSecurityTesting /> */}
      <WhySoftreeLogisticsTesting />
      <LogisticsTestingFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
