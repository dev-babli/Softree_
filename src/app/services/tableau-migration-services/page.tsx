import type { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import TableauMigrationHero2 from "./components/TableauMigrationHero2";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import TableauMigrationAIReadinessBanner from "./components/TableauMigrationAIReadinessBanner";
import { TableauMigrationServices } from "./components/TableauMigrationServices";
import TableauMigrationWhoDoWeServeSection from "./components/TableauMigrationWhoDoWeServeSection";
import { TableauMigrationStickyScroll } from "./components/TableauMigrationStickyScroll";
import TableauMigrationSuccessStories from "./components/TableauMigrationSuccessStories";
import TableauMigrationTechnologyStack from "./components/TableauMigrationTechnologyStack";
import TableauMigrationOffshoreEngineeringSection from "./components/TableauMigrationOffshoreEngineeringSection";
import { TableauMigrationHowAIWorks } from "./components/TableauMigrationHowAIWorks";
import TableauMigrationWhyChooseWithTestimonials from "./components/TableauMigrationWhyChooseWithTestimonials";
import TableauMigrationFAQ from "./components/TableauMigrationFAQ";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";

import { faqs } from "./data/faqs";

export const metadata: Metadata = {
  title: {
    absolute: "Tableau Migration Services | Cloud & Power BI | Softree",
  },
  description: "Expert Tableau migration services. Move Tableau Server to Tableau Cloud, modernize analytics, and securely migrate workbooks, dashboards, and data sources.",
  keywords: [
    // Primary Keyword
    "Tableau Migration Services",

    // Secondary Keywords
    "Tableau to Power BI Migration",
    "Tableau Server Migration",
    "Tableau Cloud Migration",
    "Tableau Server to Tableau Cloud Migration",
    "Tableau Cloud Migration Services",
    "Tableau Dashboard Migration",
    "Tableau Workbook Migration",
    "Tableau Data Source Migration",
    "Tableau Migration Company",
    "Tableau Migration Consulting",
    "Tableau Analytics Modernization",
    "Tableau Migration Solutions",
    "Tableau Server to Cloud Migration",
    "Tableau Online Migration",
    "Tableau to Power BI Conversion",
    "Tableau Cloud Migration Solutions",
    "Enterprise Tableau Migration",
    "Tableau Infrastructure Migration",
    "Tableau Platform Migration",
    "Tableau Reporting Migration",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services/tableau-migration-services",
  },
};

export default function TableauMigrationServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.softreetechnology.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.softreetechnology.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Tableau Migration Services", "item": "https://www.softreetechnology.com/services/tableau-migration-services" }
        ]
      },
      {
        "@type": "Service",
        "name": "Tableau Migration Services",
        "provider": {
          "@type": "Organization",
          "name": "Softree Technology",
          "url": "https://www.softreetechnology.com/"
        },
        "description": "Expert Tableau migration services. Move Tableau Server to Tableau Cloud, modernize analytics, and securely migrate workbooks, dashboards, and data sources with Softree's offshore engineering team.",
        "url": "https://www.softreetechnology.com/services/tableau-migration-services"
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
      {
        "@type": "VideoObject",
        "name": "Tableau Migration and Analytics Modernization Overview",
        "description":
          "Overview of end-to-end Tableau migration services: migrating Tableau Server to Tableau Cloud, transitioning workbooks, dashboards, data sources, and user security models.",
        "thumbnailUrl": [
          "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video-poster.webp",
          "https://www.softreetechnology.com/og-image.png"
        ],
        "uploadDate": "2025-01-15T08:00:00+00:00",
        "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/RAG-video.mp4",
        "embedUrl": "https://www.softreetechnology.com/services/tableau-migration-services",
        "duration": "PT45S",
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

  return (
    <main className="relative min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NavigationClient />

      {/* Hero Section */}
      <TableauMigrationHero2 />

      {/* Trusted By Marquee */}
      <TrustedBrandsMarquee />

      <TableauMigrationAIReadinessBanner />

      <TableauMigrationServices />

      {/* <TableauMigrationWhoDoWeServeSection className="bg-white" /> */}

      <TableauMigrationStickyScroll />

      <TableauMigrationSuccessStories />

      <TableauMigrationTechnologyStack />

      {/* <TableauMigrationOffshoreEngineeringSection /> */}

      {/* <TableauMigrationHowAIWorks /> */}

      <TableauMigrationWhyChooseWithTestimonials />

      <TableauMigrationFAQ />

      {/* Contact Section */}
      <LightContactSection />

      <Footer />
    </main>
  );
}
