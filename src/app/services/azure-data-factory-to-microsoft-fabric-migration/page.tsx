import { applyPageOg } from "@/lib/site-metadata";
import React from 'react';
import { Metadata } from 'next';
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';

import AdfToFabricHero from './components/AdfToFabricHero';
import AdfToFabricCapabilities from './components/AdfToFabricCapabilities';
import AdfToFabricArc from './components/AdfToFabricArc';
import AdfToFabricSlider from './components/AdfToFabricSlider';
import AdfToFabricTechStack from './components/AdfToFabricTechStack';
import AdfToFabricTechnologyStack from './components/AdfToFabricTechnologyStack';
import AdfToFabricSystems from './components/AdfToFabricSystems';
import { AdfToFabricHowAIWorks } from './components/AdfToFabricHowAIWorks';
import AdfToFabricCaseStudies from './components/AdfToFabricCaseStudies';
import TrustedBrandsMarquee from '@/app/services/offshore-power-platform-development/trust';
import AdfToFabricAIReadinessBanner from './components/AdfToFabricAIReadinessBanner';
import { AdfToFabricServices } from './components/AdfToFabricServices';
import AdfToFabricWhoDoWeServeSection from './components/AdfToFabricWhoDoWeServeSection';
import AdfToFabricWhyChoose from './components/AdfToFabricWhyChoose';
import AdfToFabricFAQ from './components/AdfToFabricFAQ';
import dynamic from 'next/dynamic';

const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });

export const metadata: Metadata = applyPageOg("/services/azure-data-factory-to-microsoft-fabric-migration", {
  title: "Azure Data Factory to Microsoft Fabric Migration | Softree Technology",
  description:
    "Migrate your legacy Azure Data Factory pipelines and SSIS packages to Microsoft Fabric. Expert assessment, OneLake architecture, pipeline conversion, and optimization.",
  alternates: {
    canonical: "https://www.softreetechnology.com/services/azure-data-factory-to-microsoft-fabric-migration",
  },
  openGraph: {
    title: "Azure Data Factory to Microsoft Fabric Migration | Softree Technology",
    description:
      "Migrate your legacy Azure Data Factory pipelines and SSIS packages to Microsoft Fabric. Expert assessment, OneLake architecture, pipeline conversion, and optimization.",
    url: "https://www.softreetechnology.com/services/azure-data-factory-to-microsoft-fabric-migration",
    siteName: "Softree Technology",
    type: "website",
  },
});

export default function AdfToFabricMigrationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-clip">
      <NavigationClient />

      {/* 1. Hero Section (Light Theme with Custom Image) */}
      <AdfToFabricHero />

      {/* 1.5 Trusted By Marquee */}
      <TrustedBrandsMarquee />

      {/* 3. AI Readiness Banner */}
      <AdfToFabricAIReadinessBanner />

      {/* 4. Services (Globe Component) */}
      <AdfToFabricServices />

      {/* 5. Who Do We Serve (Slider Component) */}
      <AdfToFabricWhoDoWeServeSection className="bg-white" />

      {/* 6. Migration Slider (Sticky Scroll) */}
      <AdfToFabricSlider />

      {/* 7. Case Studies (Success Stories) */}
      <AdfToFabricCaseStudies />

      {/* 7.5 Tech Stack (Marquee Grid) */}
      <AdfToFabricTechnologyStack />

      {/* 8. Migration Scope (Photo Stack) */}
      <AdfToFabricTechStack />

      {/* 9. Systems Architecture Component (Offshore Engineering) */}
      {/* <AdfToFabricSystems />*/}

      {/* 10. How We Work (Fan Card Stack) */}
      <AdfToFabricHowAIWorks />

      {/* 11. Why Choose & Testimonials */}
      <AdfToFabricWhyChoose />

      {/* 12. FAQ */}
      <AdfToFabricFAQ />

      {/* 13. Contact & Footer */}
      <LightContactSection />
      <Footer />
    </main>
  );
}
