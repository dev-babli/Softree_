import type { Metadata } from "next";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";
import NavigationClient from "@/components/sections/navigation-client";
import TableauToPowerBiHero from "./components/TableauToPowerBiHero";
import TableauToPowerBiAIReadinessBanner from "./components/TableauToPowerBiAIReadinessBanner";
import { TableauToPowerBiServices } from "./components/TableauToPowerBiServices";
import TableauToPowerBiWhoDoWeServeSection from "./components/TableauToPowerBiWhoDoWeServeSection";
import { TableauToPowerBiStickyScroll } from "./components/TableauToPowerBiStickyScroll";
import { TableauToPowerBiSuccessStories } from "./components/TableauToPowerBiSuccessStories";
import { TableauToPowerBiTechnologyStack } from "./components/TableauToPowerBiTechnologyStack";
import { TableauToPowerBiOffshoreEngineeringSection } from "./components/TableauToPowerBiOffshoreEngineeringSection";
import { TableauToPowerBiHowAIWorks } from "./components/TableauToPowerBiHowAIWorks";
import { TableauToPowerBiWhyChooseWithTestimonials } from "./components/TableauToPowerBiWhyChooseWithTestimonials";
import { TableauToPowerBiFAQ } from "./components/TableauToPowerBiFAQ";

import { faqs } from "./data/faqs";

export const metadata: Metadata = {
  title: "Tableau to Power BI Migration Services | Softree Technology",
  description:
    "Seamlessly migrate from Tableau to Microsoft Power BI with our expert migration, DAX conversion, semantic modeling, and report redesign services.",
  keywords: [
    "Tableau to Power BI Migration",
    "Tableau to Power BI Migration Services",
    "Migrate Tableau to Power BI",
    "Tableau workbook to Power BI converter",
    "Tableau calculated fields to DAX",
    "Tableau LOD to Power BI DAX",
    "Power BI semantic modeling",
    "Power BI migration consultant",
    "Power BI offshore development",
    "Tableau dashboard migration",
    "Power BI DAX conversion",
    "Softree Technology"
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services/tableau-to-power-bi-migration",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Tableau to Power BI Migration Services | Softree Technology",
    description:
      "Seamlessly migrate from Tableau to Microsoft Power BI with our expert migration, DAX conversion, semantic modeling, and report redesign services.",
    url: "https://www.softreetechnology.com/services/tableau-to-power-bi-migration",
    siteName: "Softree Technology",
    type: "website",
    locale: "en_US",
  },
};

export default function TableauToPowerBiMigration() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.softreetechnology.com/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.softreetechnology.com/services",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Migration & Modernization",
            "item": "https://www.softreetechnology.com/services/tableau-migration-services",
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Tableau to Power BI Migration",
            "item": "https://www.softreetechnology.com/services/tableau-to-power-bi-migration",
          },
        ],
      },
      {
        "@type": "Service",
        "name": "Tableau to Power BI Migration Services",
        "provider": {
          "@type": "Organization",
          "name": "Softree Technology",
          "url": "https://www.softreetechnology.com/",
        },
        "description":
          "End-to-end offshore Tableau to Power BI migration services: workbook translation, DAX LOD conversion, semantic modeling, VertiPaq optimization, and report redesign.",
        "url": "https://www.softreetechnology.com/services/tableau-to-power-bi-migration",
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
        "@id": "https://www.softreetechnology.com/services/tableau-to-power-bi-migration#video",
        "name": "Tableau to Microsoft Power BI Migration and Dashboard Modernization",
        "description":
          "Overview of how Softree Technology executes seamless Tableau to Power BI migrations, converting complex calculated fields and Level of Detail (LOD) calculations to DAX, and optimizing VertiPaq semantic models.",
        "thumbnailUrl": [
          "https://www.softreetechnology.com/ai-development-service-video/tableau-to-power-bi-poster.webp",
          "https://www.softreetechnology.com/og-image.png"
        ],
        "uploadDate": "2025-01-15T08:00:00+00:00",
        "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/RAG-video.mp4",
        "embedUrl": "https://www.softreetechnology.com/services/tableau-to-power-bi-migration",
        "duration": "PT18S",
        "publisher": {
          "@type": "Organization",
          "name": "Softree Technology",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.softreetechnology.com/logo/logo.png"
          }
        }
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NavigationClient />

      {/* Hero Section */}
      <TableauToPowerBiHero />

      <TableauToPowerBiAIReadinessBanner />

      <TableauToPowerBiServices />

      {/* <TableauToPowerBiWhoDoWeServeSection className="bg-white" /> */}

      <TableauToPowerBiStickyScroll />

      <TableauToPowerBiSuccessStories />

      <TableauToPowerBiTechnologyStack />

      {/* <TableauToPowerBiOffshoreEngineeringSection /> */}

      {/* <TableauToPowerBiHowAIWorks /> */}

      <TableauToPowerBiWhyChooseWithTestimonials />

      <TableauToPowerBiFAQ />

      {/* Contact Section */}
      <LightContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
