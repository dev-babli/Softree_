"use client";
import NavigationClient from "@/components/sections/navigation-client";
import HeroSection from "@/components/sections/hero";
import SolutionsGrid from "@/components/sections/solutions-grid";
import SoftreeFAQ from "@/components/sections/faq";
import CTABanner from "@/components/sections/cta-banner";
import Footer from "@/components/sections/footer";
import PowerPlatformSection from "@/components/sections/services-section";
import OurRecentProjects from "@/components/sections/our-recent-projects";
import ApplicationApproach from "@/components/sections/app-approach";
import TechStackSection from "@/components/sections/tech";
import SuccessStories from "@/components/sections/success";
import ChallengesWeSolve from "@/components/sections/testimonial1";
import ServicesSection from "@/components/sections/o365";
import Image from "next/image";
import Link from "next/link";
import TrustPartnersSection from "@/components/sections/trust";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationClient />
      <main className="flex-grow mt-1">
        <HeroSection />
        <SolutionsGrid />
        <ServicesSection />
        <PowerPlatformSection />
        <OurRecentProjects />
        <TrustPartnersSection />
        <ApplicationApproach />
        <SuccessStories />
        <TechStackSection />
        <ChallengesWeSolve />
        <SoftreeFAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
