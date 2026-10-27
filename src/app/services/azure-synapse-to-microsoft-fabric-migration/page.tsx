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
  title: {
    absolute: "Azure Synapse to Fabric Migration | Softree",
  },
  description:
    "Migrate Azure Synapse dedicated SQL pools and Spark pipelines to Microsoft Fabric Lakehouse. Expert offshore data engineers ensuring seamless modernization.",
  keywords: [
    // Primary Keyword
    "Azure Synapse to Fabric Migration",

    // Secondary Keywords
    "Azure Synapse Migration",
    "Azure Synapse Migration Services",
    "Microsoft Fabric Migration Services",
    "Synapse Analytics Migration",
    "Azure Synapse Fabric Migration",
    "Synapse Analytics to Fabric Migration",
    "Azure Synapse to Microsoft Fabric Migration",
    "Synapse SQL Migration",
    "Synapse Spark Migration",
    "Azure Synapse Modernization",
    "Synapse Data Warehouse Migration",
    "Azure Data Platform Migration",
    "Microsoft Fabric Migration Solutions",
    "Azure Synapse Consulting Services",
    "Enterprise Fabric Migration",
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
            },
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "@id": "https://www.softreetechnology.com/services/azure-synapse-to-microsoft-fabric-migration#video",
              "name": "Azure Synapse to Microsoft Fabric Migration Overview",
              "description": "Learn how Softree Technology facilitates seamless migration from Azure Synapse to Microsoft Fabric, unifiying OneLake storage, data engineering pipelines, Synapse Spark, and Power BI.",
              "thumbnailUrl": [
                "https://www.softreetechnology.com/ai-development-service-video/azure-synapse-fabric-migration-poster.webp",
                "https://www.softreetechnology.com/og-image.png"
              ],
              "uploadDate": "2025-01-15T08:00:00+00:00",
              "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/RAG-video.mp4",
              "embedUrl": "https://www.softreetechnology.com/services/azure-synapse-to-microsoft-fabric-migration",
              "duration": "PT18S",
              "publisher": {
                "@type": "Organization",
                "name": "Softree Technology",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo.png"
                }
              }
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

      {/*<FabricMigrationWhoDoWeServeSection className="bg-white" />*/}

      <FabricMigrationStickyScroll />

      <FabricMigrationSuccessStories />

      <FabricMigrationTechnologyStack />

      {/*<FabricMigrationOffshoreEngineeringSection />*/}

      {/*<FabricMigrationHowAIWorks />*/}

      <FabricMigrationWhyChooseWithTestimonials />

      <FabricMigrationFAQ />

      {/* Contact Section */}
      <LightContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
