import { Hero } from "./ai-consulting-services-components/Hero";
import NavigationClient from "@/components/sections/navigation-client";
import LightContactSection from "@/components/homepage-light/LightContactSection";

import Footer from "@/components/sections/footer"
import { BusinessChallenges } from "./ai-consulting-services-components/business-challenges/BusinessChallenges";
import { HowAIHelps } from "./ai-consulting-services-components/how-ai-helps/HowAIHelps";
import { OurAISolutions } from "./ai-consulting-services-components/our-ai-solutions/OurAISolutions";
import { CapabilitiesBentoGrid } from "./ai-consulting-services-components/CapabilitiesBentoGrid";
import { Industries } from "./ai-consulting-services-components/industries/Industries";
import { WhySoftree } from "./ai-consulting-services-components/WhySoftree";
import { SuccessStories } from "./ai-consulting-services-components/SuccessStories";
import TrustedByMarquee from "@/components/homepage-light/TrustedByMarquee";
import { AiConsultingFaq } from "./ai-consulting-services-components/FAQ/AiConsultingFaq";
import TestimonialsSplitSlider from "./ai-consulting-services-components/Testimonials/TestimonialsSplitSlider";

export const metadata = {
  title: "AI Consulting Services | Softree Technology",
  description: "Enterprise AI Solutions That Deliver Measurable Business Outcomes. Automate workflows, build AI agents, and transform business operations.",
};

export default function AIConsultingServicesPage() {
  return (
    <>
      <NavigationClient />
      <main className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <Hero />
        <TrustedByMarquee />
        <BusinessChallenges />
        <HowAIHelps />
        <CapabilitiesBentoGrid />
        <OurAISolutions />
        <Industries />
        <SuccessStories />
        <WhySoftree />
        <TestimonialsSplitSlider />
        <AiConsultingFaq />
        <LightContactSection />
        <Footer />
      </main>
    </>
  );
}
