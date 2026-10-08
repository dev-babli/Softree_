import type { Metadata } from "next";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";
import NavigationClient from "@/components/sections/navigation-client";
import FabricMigrationAIReadinessBanner from "./components/FabricMigrationAIReadinessBanner";
import { FabricMigrationServices } from "./components/FabricMigrationServices";
import FabricMigrationWhoDoWeServeSection from "./components/FabricMigrationWhoDoWeServeSection";
import { FabricMigrationStickyScroll } from "./components/FabricMigrationStickyScroll";
import { FabricMigrationSuccessStories } from "./components/FabricMigrationSuccessStories";
import { FabricMigrationWhyChooseWithTestimonials } from "./components/FabricMigrationWhyChooseWithTestimonials";
import { FabricMigrationFAQ } from "./components/FabricMigrationFAQ";
import { FabricMigrationTechnologyStack } from "./components/FabricMigrationTechnologyStack";
import { FabricMigrationOffshoreEngineeringSection } from "./components/FabricMigrationOffshoreEngineeringSection";
import { FabricMigrationHowAIWorks } from "./components/FabricMigrationHowAIWorks";
import FabricMigrationHero from "./components/FabricMigrationHero";

export const metadata: Metadata = {
  title: "Azure Synapse to Microsoft Fabric Migration | Softree Technology",
  description: "Seamlessly migrate from Azure Synapse to Microsoft Fabric with our expert migration services.",
};

export default function AzureSynapseToFabricMigration() {
  return (
    <main className="relative min-h-screen bg-white">
      <NavigationClient />
      {/* Hero Section */}
      <FabricMigrationHero />
      
      {/* Trusted By Marquee */}
      <TrustedBrandsMarquee />

      <FabricMigrationAIReadinessBanner />
      
      <FabricMigrationServices />
      
      <FabricMigrationWhoDoWeServeSection className="bg-white" />
      
      <FabricMigrationStickyScroll />
      
      <FabricMigrationSuccessStories />
      
      <FabricMigrationTechnologyStack />
      
      <FabricMigrationOffshoreEngineeringSection />

      <FabricMigrationHowAIWorks />

      <FabricMigrationWhyChooseWithTestimonials />
      
      <FabricMigrationFAQ />
      
      {/* Contact Section */}
      <LightContactSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
