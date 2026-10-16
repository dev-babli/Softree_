import { Metadata } from "next";
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import FabricMigrationHeroAlternative from "./components/FabricMigrationHeroAlternative";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";
import FabricMigrationBanner from "./components/FabricMigrationBanner";
import { MigrationAssessment } from "./components/MigrationAssessment";
import MigrationWhoDoWeServeSection from "./components/MigrationWhoDoWeServeSection";
import { MigrationStickyScroll } from "./components/MigrationStickyScroll";
import MigrationMethodology from "./components/MigrationMethodology";
import MigrationTechnologyStack from "./components/MigrationTechnologyStack";
import { MigrationHowItWorks } from "./components/MigrationHowItWorks";
import MigrationSuccessStories from "./components/MigrationSuccessStories";
import WhySoftreeMigration from "./components/WhySoftreeMigration";
import MigrationFAQ from "./components/MigrationFAQ";
import LightContactSection from "@/components/homepage-light/LightContactSection";
export const metadata: Metadata = {
  title: "SQL Server to Microsoft Fabric Migration Services | Softree",
  description:
    "Modernize SQL Server workloads with Softree’s Microsoft Fabric migration services. Migrate databases, data pipelines, and analytics with structured planning and validation.",
  keywords: [
    "SQL Server to Microsoft Fabric Migration",
    "Microsoft Fabric Migration Services",
    "SQL Server Migration Services",
    "SQL Server to Fabric Migration",
    "SQL Database Migration",
    "Microsoft Fabric Consulting",
    "Microsoft Fabric Migration",
    "SQL Server Cloud Migration",
    "SQL Server Database Migration",
    "SQL Server Workload Migration",
    "SQL Server Data Warehouse Migration",
    "Data Warehouse Migration Services",
    "Microsoft Fabric Implementation",
    "Microsoft Fabric Consulting Services",
    "SQL Server Modernization",
    "Legacy Data Platform Modernization",
    "Data Platform Migration Services",
    "Data Engineering Migration",
    "ETL Pipeline Migration",
    "Data Integration Migration",
    "SQL Server Stored Procedure Migration",
    "SQL Server Data Migration",
    "Power BI Migration to Microsoft Fabric",
    "Microsoft Fabric Lakehouse Migration",
    "Microsoft Fabric Warehouse Migration",
    "SQL Server Migration Assessment",
    "Microsoft Fabric Migration Strategy",
    "SQL Server Data Validation",
    "Microsoft Fabric Performance Optimization",
    "Enterprise Data Migration Services",
    "Offshore Microsoft Fabric Migration Services",
    "Microsoft Fabric Migration Partner",
  ],
  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/sql-server-to-microsoft-fabric-migration/",
  },
  openGraph: {
    title: "SQL Server to Microsoft Fabric Migration Services | Softree",
    description:
      "Modernize SQL Server databases, data pipelines, and analytics with Softree’s structured Microsoft Fabric migration services.",
    url: "https://www.softreetechnology.com/services/sql-server-to-microsoft-fabric-migration/",
    siteName: "Softree Technology",
    type: "website",
  },
};

export default function SqlServerToFabricMigrationPage() {
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
        "@id": "https://www.softreetechnology.com/services/sql-server-to-microsoft-fabric-migration/#breadcrumb",
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
            "name": "SQL Server to Microsoft Fabric Migration",
            "item": "https://www.softreetechnology.com/services/sql-server-to-microsoft-fabric-migration/",
          },
        ],
      },
      {
        "@type": "Service",
        "@id": "https://www.softreetechnology.com/services/sql-server-to-microsoft-fabric-migration/#service",
        "name": "SQL Server to Microsoft Fabric Migration Services",
        "description":
          "Modernize SQL Server workloads with Softree’s Microsoft Fabric migration services. Migrate databases, data pipelines, and analytics with structured planning and validation.",
        "provider": {
          "@id": "https://www.softreetechnology.com/#organization",
        },
        "serviceType": "Database & Data Warehouse Migration Services",
        "areaServed": "Worldwide",
      },
      {
        "@type": "VideoObject",
        "@id": "https://www.softreetechnology.com/services/sql-server-to-microsoft-fabric-migration/#video",
        "name": "SQL Server to Microsoft Fabric Migration Overview",
        "description":
          "Explore how Softree Technology executes seamless SQL Server to Microsoft Fabric migrations, modernizing legacy databases, stored procedures, ETL pipelines, and OneLake analytics.",
        "thumbnailUrl": [
          "https://www.softreetechnology.com/ai-development-service-video/sqlserver-fabric-migration-poster.webp",
          "https://www.softreetechnology.com/og-image.png"
        ],
        "uploadDate": "2025-01-15T08:00:00+00:00",
        "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/sqlserver-video.mp4",
        "embedUrl": "https://www.softreetechnology.com/services/sql-server-to-microsoft-fabric-migration",
        "duration": "PT1M5S",
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
      <FabricMigrationHeroAlternative />
      <TrustedBrandsMarquee surface="light" />
      <FabricMigrationBanner />
      <MigrationAssessment />
      {/*<MigrationWhoDoWeServeSection />*/}
      <MigrationStickyScroll />
      <MigrationSuccessStories />

      <MigrationTechnologyStack />
      {/*<MigrationMethodology />*/}
      {/*<MigrationHowItWorks />*/}

      <WhySoftreeMigration />
      <MigrationFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
