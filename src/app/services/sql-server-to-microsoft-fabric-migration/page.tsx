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
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-[#FF6B00]/20">
      <NavigationClient />
      <FabricMigrationHeroAlternative />
      <TrustedBrandsMarquee surface="light" />
      <FabricMigrationBanner />
      <MigrationAssessment />
      <MigrationWhoDoWeServeSection />
      <MigrationStickyScroll />
      <MigrationSuccessStories />

      <MigrationTechnologyStack />
      <MigrationMethodology />
      <MigrationHowItWorks />

      <WhySoftreeMigration />
      <MigrationFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
