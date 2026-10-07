import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";
import { Hero } from "./ai-consulting-services-components/Hero";
import NavigationClient from "@/components/sections/navigation-client";
import LightContactSection from "@/components/homepage-light/LightContactSection";

import Footer from "@/components/sections/footer"
import BusinessChallenges from "./ai-consulting-services-components/business-challenges/BusinessChallenges";
import BusinessOutcomes from "./ai-consulting-services-components/BusinessOutcomes";
import ProvenResults from "./ai-consulting-services-components/ProvenResult";
import AIPhilosophy from "./ai-consulting-services-components/AIPhilosophy";
import AIDilemma from "./ai-consulting-services-components/AIDilemma";
import { HowAIHelps } from "./ai-consulting-services-components/how-ai-helps/HowAIHelps";
import { OurAISolutions } from "./ai-consulting-services-components/our-ai-solutions/OurAISolutions";
import CapabilitiesBentoGrid from "./ai-consulting-services-components/Core-capabilities/CapabilitiesBentoGrid";
import { Industries } from "./ai-consulting-services-components/industries/Industries";
import WhyChooseWithTestimonialsSoftree from "./ai-consulting-services-components/WhySoftree/WhyChooseWithTestimonialsSoftree";
import { SuccessStories } from "./ai-consulting-services-components/SuccessStories";
import TrustedBrandsMarquee from "./ai-consulting-services-components/TrustedBrandsMarquee";
import AITechnologies from "./ai-consulting-services-components/AITechnologies";
import AIDeliveryProcess from "./ai-consulting-services-components/AIDeliveryProcess";
import { AiConsultingFaq } from "./ai-consulting-services-components/FAQ/AiConsultingFaq";
import TestimonialsSplitSlider from "./ai-consulting-services-components/Testimonials/TestimonialsSplitSlider";

export const metadata: Metadata = applyPageOg("/services/ai-consulting-services", {
  title: "AI Consulting Services | Softree Technology",
  description:
    "Strategic AI consulting, feasibility assessments, readiness roadmaps, and architecture governance for enterprise AI adoption.",
  alternates: {
    canonical: "https://www.softreetechnology.com/services/ai-consulting-services",
  },
  openGraph: {
    title: "AI Consulting Services | Softree Technology",
    description:
      "Strategic AI consulting, feasibility assessments, readiness roadmaps, and architecture governance for enterprise AI adoption.",
    url: "https://www.softreetechnology.com/services/ai-consulting-services",
    siteName: "Softree Technology",
    type: "website",
  },
});

export default function AIConsultingServicesPage() {
  return (
    <>
      <NavigationClient />
      <main className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <Hero />
        <TrustedBrandsMarquee />
        <SuccessStories />
        <CapabilitiesBentoGrid />
        {/* <BusinessChallenges />
        <BusinessOutcomes /> */}
        <ProvenResults />
        <AIPhilosophy />
        {/* <AIDilemma /> */}
        <Industries />
        <AITechnologies />
        <AIDeliveryProcess />
        <WhyChooseWithTestimonialsSoftree />
        {/* <HowAIHelps /> */}
        {/* <OurAISolutions /> */}
        {/* <TestimonialsSplitSlider /> */}
        <AiConsultingFaq />
        <LightContactSection />
        <Footer />
      </main>
    </>
  );
}
