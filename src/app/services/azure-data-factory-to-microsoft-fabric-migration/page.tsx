import { applyPageOg } from "@/lib/site-metadata";
import React from 'react';
import { Metadata } from 'next';
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';

import AdfToFabricHero from './components/AdfToFabricHero';
import AdfToFabricSlider from './components/AdfToFabricSlider';
import AdfToFabricTechStack from './components/AdfToFabricTechStack';
import AdfToFabricTechnologyStack from './components/AdfToFabricTechnologyStack';
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
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.softreetechnology.com/#organization",
        "name": "Softree Technology",
        "url": "https://www.softreetechnology.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo.png",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.softreetechnology.com/services/azure-data-factory-to-microsoft-fabric-migration#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.softreetechnology.com/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.softreetechnology.com/services",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Azure Data Factory to Microsoft Fabric Migration",
            "item": "https://www.softreetechnology.com/services/azure-data-factory-to-microsoft-fabric-migration",
          },
        ],
      },
      {
        "@type": "Service",
        "@id": "https://www.softreetechnology.com/services/azure-data-factory-to-microsoft-fabric-migration#service",
        "name": "Azure Data Factory to Microsoft Fabric Migration Services",
        "description":
          "Migrate your legacy Azure Data Factory pipelines and SSIS packages to Microsoft Fabric. Expert assessment, OneLake architecture, pipeline conversion, and optimization.",
        "provider": {
          "@id": "https://www.softreetechnology.com/#organization",
        },
        "serviceType": "ETL Pipeline Modernization & Data Platform Migration",
        "areaServed": "Worldwide",
      },
      {
        "@type": "VideoObject",
        "@id": "https://www.softreetechnology.com/services/azure-data-factory-to-microsoft-fabric-migration#video",
        "name": "Azure Data Factory to Microsoft Fabric Migration Overview",
        "description":
          "Discover how Softree Technology executes seamless Azure Data Factory (ADF) and SSIS migrations to Microsoft Fabric, converting data pipelines, OneLake storage, and analytics workloads.",
        "thumbnailUrl": [
          "https://www.softreetechnology.com/ai-development-service-video/adf-to-fabric-migration-poster.webp",
          "https://www.softreetechnology.com/og-image.png"
        ],
        "uploadDate": "2025-01-15T08:00:00+00:00",
        "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/RAG-video.mp4",
        "embedUrl": "https://www.softreetechnology.com/services/azure-data-factory-to-microsoft-fabric-migration",
        "duration": "PT18S",
        "publisher": {
          "@type": "Organization",
          "name": "Softree Technology",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.softreetechnology.com/logo/Softree-Technology-Final-Logo.png",
          },
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
      {/*<AdfToFabricWhoDoWeServeSection className="bg-white" />/*}

      {/* 6. Migration Slider (Sticky Scroll) */}
      <AdfToFabricSlider />

      {/* 7. Case Studies (Success Stories) */}
      <AdfToFabricCaseStudies />

      {/* 7.5 Tech Stack (Marquee Grid) */}
      <AdfToFabricTechnologyStack />

      {/* 8. Migration Scope (Photo Stack) */}
      {/*<AdfToFabricTechStack />*/}
      {/* 10. How We Work (Fan Card Stack) */}
      {/*<AdfToFabricHowAIWorks />*/}

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
