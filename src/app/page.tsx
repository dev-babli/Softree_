"use client";
import NavigationClient from "@/components/sections/navigation-client";
import Certifications from "@/components/sections/certification";
import SoftreeFAQ from "@/components/sections/faq";
import CTABanner from "@/components/sections/cta-banner";
import Footer from "@/components/sections/footer";
import TechStackSection from "@/components/sections/tech";
import SelectedEngagements from "@/components/sections/engaged-models";
import AiInsightsBlog from "@/components/sections/ai-insights-blog";
import WhyChooseUs from "@/components/sections/why-choose-us";
import SupportPartners from "@/components/sections/support-partners";
import TrustedBy from "@/components/sections/trusted-by";
import ServicesStackedSlides from "@/components/sections/ServicesStackedSlides";
import TransferredSoftreeHeroToolkit from "@/components/sections/TransferredSoftreeHeroToolkit";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <NavigationClient />
      <main className="flex-grow">
        <TransferredSoftreeHeroToolkit />
        <SupportPartners />
        <ServicesStackedSlides />
        <TrustedBy />
        <AiInsightsBlog />
        <TechStackSection />
        <WhyChooseUs />
        <SelectedEngagements />
        <Certifications />
        <CTABanner />
        <SoftreeFAQ />
      </main>
      <Footer />
    </div>
  );
}

