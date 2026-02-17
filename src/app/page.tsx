"use client";
import NavigationClient from "@/components/sections/navigation-client";
import HeroSection from "@/components/sections/hero";
import SoftreeFAQ from "@/components/sections/faq";
import CTABanner from "@/components/sections/cta-banner";
import Footer from "@/components/sections/footer";
import OurRecentProjects from "@/components/sections/our-recent-projects";
import ApplicationApproach from "@/components/sections/app-approach";
import TechStackSection from "@/components/sections/tech";
import SelectedEngagements from "@/components/sections/engaged-models";
import ChallengesWeSolve from "@/components/sections/testimonial1";
import ServicesSection from "@/components/sections/o365";
import TechnologySlider from "@/components/sections/technology-slider";
import TrustPartnersSection from "@/components/sections/trust";
import AiInsightsBlog from "@/components/sections/ai-insights-blog";
import WhyChooseUs from "@/components/sections/why-choose-us";
import SupportPartners from "@/components/sections/support-partners";
import TrustedBy from "@/components/sections/trusted-by";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationClient />
      <main className="flex-grow mt-1">
        <HeroSection />
        <TechnologySlider />
        <SupportPartners />
        <SelectedEngagements />
        <TrustedBy />
        <AiInsightsBlog />
        <TechStackSection />
        <WhyChooseUs />
        <ChallengesWeSolve />
        <SoftreeFAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
