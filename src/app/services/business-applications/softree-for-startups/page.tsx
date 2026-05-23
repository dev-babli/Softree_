import type { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import ServicesSection from "./services";
import AIBannerSection from "./banner";
import WhySoftreeSection from "./why";
import IndustriesSection from "./industries";
import ProjectProcessSection from "./start-project";
import StartupHero from "./hero";
import HireExperts from "./hire";
import ProcessTimeline from "./process";
import PowerPlatformSection from "./services-section";
import TrustedBrandsMarquee from "../power-platform/trust";
import Certifications from "../power-platform/certification";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Softree for Startups | MVP Development & Technical Partnership",
  description:
    "Launch your startup faster with Softree Technology. MVP development, technical co-founding, AI integration, and scalable product engineering for early-stage companies.",
  alternates: {
    canonical: "https://www.softreetechnology.com/services/business-applications/softree-for-startups",
  },
  openGraph: {
    title: "Softree for Startups | MVP & Product Engineering",
    description:
      "Startup-focused development — MVP builds, AI integration, and scalable product engineering by Softree Technology.",
    url: "https://www.softreetechnology.com/services/business-applications/softree-for-startups",
    siteName: "Softree Technology",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Softree for Startups" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Softree for Startups | MVP Development",
    description: "MVP development and technical partnership for early-stage startups.",
    images: ["/og-image.png"],
  },
};
export default function Page() {
  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.softreetechnology.com" },
          { name: "Services", url: "https://www.softreetechnology.com/services" },
          { name: "Business Applications", url: "https://www.softreetechnology.com/services/business-applications/softree-for-startups" },
          { name: "Softree for Startups", url: "https://www.softreetechnology.com/services/business-applications/softree-for-startups" },
        ]}
      />
      <NavigationClient />
      <StartupHero />
      <TrustedBrandsMarquee />
      <ServicesSection />
      <IndustriesSection />
      <AIBannerSection />
      <PowerPlatformSection />
      <ProcessTimeline />
      <HireExperts />
      <WhySoftreeSection />
      <Certifications />
      <ProjectProcessSection />
      <LightContactSection />
      <LightFAQExact />
      <Footer />
    </div>
  );
}
