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

export const metadata: Metadata = {
  title: "Tableau Migration Services | Softree Technology",
  description: "Expert Tableau migration services by Softree Technology.",
};

export default function TableauMigrationServicesPage() {
  return (
    <main className="relative min-h-screen bg-white">
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
