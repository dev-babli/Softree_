import Navigation from "./components/navigation";
import LightContactSection from "./components/LightContactSection";
import { StickyFooter } from "./components/sticky-footer";
import { AdvancedHero } from "./components/AdvancedHero";
import TrustedByMarquee from "./components/TrustedByMarquee";
import SuccessStoriesShowcase from "./components/SuccessStoriesShowcase";
import { SolutionMapper } from "./components/SolutionMapper";
import { InteractiveStepper } from "./components/InteractiveStepper";
import IndustriesShowcase from "./components/IndustriesShowcase";
import { HowAIHelps } from "./components/HowAIHelps";
import CaseStudiesSection from "./components/CaseStudiesSection";
import LightFAQExact from "./components/LightFAQExact";
import TestimonialsSplitSlider from "@/app/services/offshore-power-platform-development/testimonial";
import EnterpriseAICapabilities from "./components/enterprise-ai-capabilites";
export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
            <Navigation />
            <main className="flex-1">
                <AdvancedHero />
                <TrustedByMarquee />
                <EnterpriseAICapabilities />
                <SuccessStoriesShowcase />
                <SolutionMapper />
                <InteractiveStepper />
                <IndustriesShowcase />
                {/* <HowAIHelps /> */}
                <CaseStudiesSection />
                <TestimonialsSplitSlider />
            </main>
            <LightFAQExact />
            <LightContactSection />
            <StickyFooter />
        </div>
    );
}