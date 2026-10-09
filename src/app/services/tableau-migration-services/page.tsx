import type { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import TableauMigrationHero2 from "./components/TableauMigrationHero2";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import TableauMigrationAIReadinessBanner from "./components/TableauMigrationAIReadinessBanner";
import { TableauMigrationServices } from "./components/TableauMigrationServices";
import TableauMigrationWhoDoWeServeSection from "./components/TableauMigrationWhoDoWeServeSection";
import { TableauMigrationStickyScroll } from "./components/TableauMigrationStickyScroll";
import TableauMigrationSuccessStories from "./components/TableauMigrationSuccessStories";
import TableauMigrationTechnologyStack from "./components/TableauMigrationTechnologyStack";
import TableauMigrationOffshoreEngineeringSection from "./components/TableauMigrationOffshoreEngineeringSection";
import { TableauMigrationHowAIWorks } from "./components/TableauMigrationHowAIWorks";
import TableauMigrationWhyChooseWithTestimonials from "./components/TableauMigrationWhyChooseWithTestimonials";
import TableauMigrationFAQ from "./components/TableauMigrationFAQ";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import Footer from "@/components/sections/footer";

import { faqs } from "./data/faqs";

export const metadata: Metadata = {
  title: "Tableau Migration Services | Softree Technology",
  description: "Expert Tableau migration services. Move Tableau Server to Tableau Cloud, modernize analytics, and securely migrate workbooks, dashboards, and data sources.",
  alternates: {
    canonical: "https://www.softreetechnology.com/services/tableau-migration-services",
  },
};

export default function TableauMigrationServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.softreetechnology.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.softreetechnology.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Tableau Migration Services", "item": "https://www.softreetechnology.com/services/tableau-migration-services" }
        ]
      },
      {
        "@type": "Service",
        "name": "Tableau Migration Services",
        "provider": {
          "@type": "Organization",
          "name": "Softree Technology",
          "url": "https://www.softreetechnology.com/"
        },
        "description": "Expert Tableau migration services. Move Tableau Server to Tableau Cloud, modernize analytics, and securely migrate workbooks, dashboards, and data sources with Softree's offshore engineering team.",
        "url": "https://www.softreetechnology.com/services/tableau-migration-services"
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      }
    ]
  };

  return (
    <main className="relative min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NavigationClient />
      
      {/* Hero Section */}
      <TableauMigrationHero2 />
      
      {/* Trusted By Marquee */}
      <TrustedBrandsMarquee />

      <TableauMigrationAIReadinessBanner />
      
      <TableauMigrationServices />
      
      <TableauMigrationWhoDoWeServeSection className="bg-white" />
      
      <TableauMigrationStickyScroll />
      
      <TableauMigrationSuccessStories />
      
      <TableauMigrationTechnologyStack />
      
      <TableauMigrationOffshoreEngineeringSection />

      <TableauMigrationHowAIWorks />

      <TableauMigrationWhyChooseWithTestimonials />
      
      <TableauMigrationFAQ />
      
      {/* Contact Section */}
      <LightContactSection />
      
      <Footer />
    </main>
  );
}
