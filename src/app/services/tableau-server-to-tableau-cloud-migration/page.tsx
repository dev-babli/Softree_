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
  title: "Tableau Server to Tableau Cloud Migration | Softree",
  description:
    "Seamlessly migrate from Tableau Server to Tableau Cloud with Softree's expert migration services.",
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
