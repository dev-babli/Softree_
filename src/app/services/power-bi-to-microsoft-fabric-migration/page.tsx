import type { Metadata } from "next";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";
import NavigationClient from "@/components/sections/navigation-client";
import PowerBiFabricAIReadinessBanner from "./components/PowerBiFabricAIReadinessBanner";
import { PowerBiFabricServices } from "./components/PowerBiFabricServices";
import PowerBiFabricWhoDoWeServeSection from "./components/PowerBiFabricWhoDoWeServeSection";
import { PowerBiFabricStickyScroll } from "./components/PowerBiFabricStickyScroll";
import { PowerBiFabricSuccessStories } from "./components/PowerBiFabricSuccessStories";
import { PowerBiFabricWhyChooseWithTestimonials } from "./components/PowerBiFabricWhyChooseWithTestimonials";
import { PowerBiFabricFAQ } from "./components/PowerBiFabricFAQ";
import { PowerBiFabricTechnologyStack } from "./components/PowerBiFabricTechnologyStack";
import { PowerBiFabricOffshoreEngineeringSection } from "./components/PowerBiFabricOffshoreEngineeringSection";
import { PowerBiFabricHowAIWorks } from "./components/PowerBiFabricHowAIWorks";
import PowerBiFabricHero from "./components/PowerBiFabricHero";

export const metadata: Metadata = {
  title: "Power BI to Microsoft Fabric Migration Services | Softree Technology",
  description: "Modernize your data architecture by migrating from Power BI to Microsoft Fabric. Expert guidance on moving from Power BI Premium (P-SKU) to Fabric (F-SKU), Lakehouse architecture, OneLake integration, and data pipelines.",
  keywords: [
    "Power BI to Microsoft Fabric migration",
    "Migrate Power BI to Fabric",
    "Power BI Premium P-SKU to Fabric F-SKU",
    "Microsoft Fabric data architecture",
    "Dataflows Gen2 migration",
    "Semantic model modernization Fabric",
    "DirectLake mode migration",
    "Power BI integration with OneLake",
    "Modernize analytics with Microsoft Fabric",
    "Microsoft Fabric migration consulting"
  ],
  openGraph: {
    title: "Power BI to Microsoft Fabric Migration Services | Softree Technology",
    description: "Modernize your data architecture by migrating from Power BI to Microsoft Fabric. Expert guidance on P-SKU to F-SKU transition, OneLake, and Data pipelines.",
    url: "https://softree.technology/services/power-bi-to-microsoft-fabric-migration",
    siteName: "Softree Technology",
    images: [
      {
        url: "/images/og/power-bi-to-fabric-migration.jpg",
        width: 1200,
        height: 630,
        alt: "Power BI to Microsoft Fabric Migration Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Power BI to Microsoft Fabric Migration Services",
    description: "Modernize your analytics by migrating from Power BI to Microsoft Fabric with expert consulting and engineering from Softree Technology.",
    images: ["/images/og/power-bi-to-fabric-migration.jpg"],
  },
  alternates: {
    canonical: "https://softree.technology/services/power-bi-to-microsoft-fabric-migration",
  },
};

export default function PowerBiToFabricMigration() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Power BI to Microsoft Fabric Migration Services",
        "serviceType": "Data Architecture Modernization",
        "provider": {
          "@type": "Organization",
          "name": "Softree Technology",
          "url": "https://softree.technology/"
        },
        "description": "Expert consulting and engineering services to modernize your data architecture by migrating from Power BI to Microsoft Fabric, including P-SKU to F-SKU transition, OneLake integration, and data pipelines.",
        "url": "https://softree.technology/services/power-bi-to-microsoft-fabric-migration"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://softree.technology/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://softree.technology/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Power BI to Microsoft Fabric Migration",
            "item": "https://softree.technology/services/power-bi-to-microsoft-fabric-migration"
          }
        ]
      }
    ]
  };

  return (
    <main className="relative min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavigationClient />
      {/* Hero Section */}
      <PowerBiFabricHero />

      <PowerBiFabricAIReadinessBanner />
      
      <PowerBiFabricServices />
      
      <PowerBiFabricWhoDoWeServeSection className="bg-white" />
      
      <PowerBiFabricStickyScroll />
      
      <PowerBiFabricSuccessStories />
      
      <PowerBiFabricTechnologyStack />
      
      <PowerBiFabricOffshoreEngineeringSection />

      <PowerBiFabricHowAIWorks />

      <PowerBiFabricWhyChooseWithTestimonials />
      
      <PowerBiFabricFAQ />
      
      {/* Contact Section */}
      <LightContactSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
