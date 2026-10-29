import { Metadata } from "next";
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import TableauMigrationHeroAlternative from "./components/TableauMigrationHeroAlternative";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";
import TableauMigrationBanner from "./components/TableauMigrationBanner";
import { TableauMigrationAssessment } from "./components/TableauMigrationAssessment";
import TableauMigrationWhoDoWeServeSection from "./components/TableauMigrationWhoDoWeServeSection";
import { TableauMigrationStickyScroll } from "./components/TableauMigrationStickyScroll";
import TableauMigrationMethodology from "./components/TableauMigrationMethodology";
import TableauMigrationTechnologyStack from "./components/TableauMigrationTechnologyStack";
import { TableauMigrationHowItWorks } from "./components/TableauMigrationHowItWorks";
import TableauMigrationSuccessStories from "./components/TableauMigrationSuccessStories";
import WhySoftreeTableauMigration from "./components/WhySoftreeTableauMigration";
import TableauMigrationFAQ from "./components/TableauMigrationFAQ";
import LightContactSection from "@/components/homepage-light/LightContactSection";
export const metadata: Metadata = {
  title: {
    absolute: "Tableau Server to Cloud Migration | Softree",
  },
  description:
    "Migrate from Tableau Server to Tableau Cloud with Softree. Get expert migration services for workbooks, dashboards, data sources, security, and validation.",
  keywords: [
    // Primary Keyword
    "Tableau Server to Tableau Cloud Migration",

    // Secondary Keywords
    "Tableau Cloud Migration Services",
    "Tableau Server Migration",
    "Tableau Cloud Migration",
    "Tableau Migration Services",
    "Tableau Server to Cloud Migration",
    "Tableau Workbook Migration",
    "Tableau Dashboard Migration",
    "Tableau Data Source Migration",
    "Tableau Analytics Migration",
    "Tableau Cloud Implementation",
    "Tableau Cloud Migration Strategy",
    "Tableau Server Migration Assessment",
    "Tableau Workbook and Dashboard Migration",
    "Tableau Data Extract Migration",
    "Tableau Cloud Data Connectivity",
    "Tableau Cloud Security",
    "Tableau Cloud Governance",
    "Tableau Migration Consulting",
    "Tableau Migration Partner",
    "Tableau Cloud Optimization",
    "Tableau Dashboard Validation",
    "Tableau Data Source Validation",
    "Enterprise Tableau Migration",
    "Offshore Tableau Migration Services",
    "Tableau Cloud Support Services",
    "Tableau migration to cloud",
    "Tableau migrate to new server",
    "Tableau online migration",
    "Tableau consulting services",
    "Tableau software consulting",
    "Tableau consultant",
    "Tableau professional services",
    "Tableau consulting companies",
    "Tableau consulting firms",
    "Tableau advisory services",
    "Tableau data visualization consulting",
    "Tableau to Power BI migration",
    "Tableau Power BI migration",
    "Tableau to Power BI conversion",
    "Tableau to QuickSight migration",
    "Cloud migration services",
    "Tableau implementation services",
    "Business intelligence migration services",
  ],
  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/tableau-server-to-tableau-cloud-migration/",
  },
  openGraph: {
    title: "Tableau Server to Tableau Cloud Migration Services | Softree",
    description:
      "Modernize your analytics with Softree's Tableau Server to Tableau Cloud migration services, covering workbooks, dashboards, data sources, security, and validation.",
    url: "https://www.softreetechnology.com/services/tableau-server-to-tableau-cloud-migration/",
    siteName: "Softree Technology",
    type: "website",
  },
};

export default function TableauServerToTableauCloudMigrationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.softreetechnology.com/#organization",
        "name": "Softree Technology",
        "url": "https://www.softreetechnology.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo.png",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.softreetechnology.com/services/tableau-server-to-tableau-cloud-migration/#breadcrumb",
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
            "name": "Tableau Server to Tableau Cloud Migration",
            "item": "https://www.softreetechnology.com/services/tableau-server-to-tableau-cloud-migration/",
          },
        ],
      },
      {
        "@type": "Service",
        "@id": "https://www.softreetechnology.com/services/tableau-server-to-tableau-cloud-migration/#service",
        "name": "Tableau Server to Tableau Cloud Migration Services",
        "description":
          "Migrate from Tableau Server to Tableau Cloud with Softree. Get expert migration services for workbooks, dashboards, data sources, security, and validation.",
        "provider": {
          "@id": "https://www.softreetechnology.com/#organization",
        },
        "serviceType": "Cloud Analytics & BI Migration Services",
        "areaServed": "Worldwide",
      },
      {
        "@type": "VideoObject",
        "@id": "https://www.softreetechnology.com/services/tableau-server-to-tableau-cloud-migration/#video",
        "name": "Tableau Server to Tableau Cloud Migration Overview",
        "description":
          "Discover how Softree Technology facilitates end-to-end Tableau Server to Tableau Cloud migration, modernizing enterprise dashboards, workbooks, extracts, and user security models.",
        "thumbnailUrl": [
          "https://www.softreetechnology.com/ai-development-service-video/tableauserver-video-poster.webp",
          "https://www.softreetechnology.com/og-image.png"
        ],
        "uploadDate": "2025-01-15T08:00:00+00:00",
        "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/tableauserver-video.mp4",
        "embedUrl": "https://www.softreetechnology.com/services/tableau-server-to-tableau-cloud-migration",
        "duration": "PT6S",
        "publisher": {
          "@type": "Organization",
          "name": "Softree Technology",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo.png",
          },
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-[#FF6B00]/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NavigationClient />
      <TableauMigrationHeroAlternative />
      <TrustedBrandsMarquee surface="light" />
      <TableauMigrationBanner />
      <TableauMigrationAssessment />
      {/* <TableauMigrationWhoDoWeServeSection /> */}
      <TableauMigrationStickyScroll />
      <TableauMigrationSuccessStories />

      <TableauMigrationTechnologyStack />
      {/* <TableauMigrationMethodology /> */}
      {/* <TableauMigrationHowItWorks /> */}

      <WhySoftreeTableauMigration />
      <TableauMigrationFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
