import { Metadata } from "next";
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import TableauMigrationHeroAlternative from "./components/TableauMigrationHeroAlternative";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";
import TableauMigrationBanner from "./components/TableauMigrationBanner";
import { TableauMigrationAssessment } from "./components/TableauMigrationAssessment";
import TableauMigrationWhoDoWeServeSection from "./components/TableauMigrationWhoDoWeServeSection";
import { TableauMigrationStickyScroll } from "./components/TableauMigrationStickyScroll";
import TableauMigrationProcess from "./components/TableauMigrationProcess";
import TableauMigrationMethodology from "./components/TableauMigrationMethodology";
import TableauMigrationTechnologyStack from "./components/TableauMigrationTechnologyStack";
import { TableauMigrationHowItWorks } from "./components/TableauMigrationHowItWorks";
import TableauMigrationSuccessStories from "./components/TableauMigrationSuccessStories";
import WhySoftreeTableauMigration from "./components/WhySoftreeTableauMigration";
import TableauMigrationFAQ from "./components/TableauMigrationFAQ";
import LightContactSection from "@/components/homepage-light/LightContactSection";
export const metadata: Metadata = {
  title: "Tableau Server to Tableau Cloud Migration Services | Softree",
  description:
    "Migrate from Tableau Server to Tableau Cloud with Softree. Get expert migration services for workbooks, dashboards, data sources, security, and validation.",
  keywords: [
    "Tableau Server to Tableau Cloud Migration",
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
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-[#FF6B00]/20">
      <NavigationClient />
      <TableauMigrationHeroAlternative />
      <TrustedBrandsMarquee surface="light" />
      <TableauMigrationBanner />
      <TableauMigrationAssessment />
      <TableauMigrationWhoDoWeServeSection />
      <TableauMigrationStickyScroll />
      <TableauMigrationSuccessStories />
      {/* <TableauMigrationProcess /> */}

      <TableauMigrationTechnologyStack />
      <TableauMigrationMethodology />
      <TableauMigrationHowItWorks />

      <WhySoftreeTableauMigration />
      <TableauMigrationFAQ />
      <LightContactSection />
      <Footer />
    </main>
  );
}
