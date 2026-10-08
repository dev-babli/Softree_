import { Metadata } from "next";
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import SqlServerToMicrosoftFabricMigrationHero from "./components/SqlServerToMicrosoftFabricMigrationHero";
import FabricMigrationHeroAlternative from "./components/FabricMigrationHeroAlternative";
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";
import FabricMigrationBanner from "./components/FabricMigrationBanner";
import { MigrationAssessment } from "./components/MigrationAssessment";
import MigrationWhoDoWeServeSection from "./components/MigrationWhoDoWeServeSection";
import { MigrationStickyScroll } from "./components/MigrationStickyScroll";
import MigrationProcess from "./components/MigrationProcess";
import MigrationMethodology from "./components/MigrationMethodology";
import MigrationTechnologyStack from "./components/MigrationTechnologyStack";
import { MigrationHowItWorks } from "./components/MigrationHowItWorks";
import MigrationSuccessStories from "./components/MigrationSuccessStories";
import WhySoftreeMigration from "./components/WhySoftreeMigration";
import MigrationFAQ from "./components/MigrationFAQ";
import LightContactSection from "@/components/homepage-light/LightContactSection";
export const metadata: Metadata = {
  title: "SQL Server to Microsoft Fabric Migration | Softree",
  description:
    "Move from Traditional SQL Server Workloads to a Modern Unified Data Platform with Softree.",
};

export default function SqlServerToFabricMigrationPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-[#FF6B00]/20">
      <NavigationClient />
      {/* <SqlServerToMicrosoftFabricMigrationHero /> */}
      <FabricMigrationHeroAlternative />
      <TrustedBrandsMarquee surface="light" />
      <FabricMigrationBanner />
      <MigrationAssessment />
      <MigrationWhoDoWeServeSection />
      <MigrationStickyScroll />
      <MigrationSuccessStories />
      {/* <MigrationProcess /> */}

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
