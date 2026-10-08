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
  keywords: [
    "Azure Synapse to Microsoft Fabric migration",
    "Microsoft Fabric migration services",
    "Azure Synapse modernization",
    "data platform migration",
    "Fabric analytics environment",
    "Synapse Spark migration",
    "Synapse SQL migration"
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services/azure-synapse-to-microsoft-fabric-migration",
  }
};

export default function AzureSynapseToFabricMigration() {
  return (
    <main className="relative min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Azure Synapse to Microsoft Fabric Migration",
              "description": "Seamlessly migrate from Azure Synapse to Microsoft Fabric with our expert migration services.",
              "provider": {
                "@type": "Organization",
                "name": "Softree Technology",
                "url": "https://www.softreetechnology.com"
              },
              "url": "https://www.softreetechnology.com/services/azure-synapse-to-microsoft-fabric-migration"
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Services",
                  "item": "https://www.softreetechnology.com/services"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Azure Synapse to Microsoft Fabric Migration",
                  "item": "https://www.softreetechnology.com/services/azure-synapse-to-microsoft-fabric-migration"
                }
              ]
            }
          ])
        }}
      />
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
