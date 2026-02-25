import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import StackedSlider from "./stack-slider";
import AgenticSection from "./agentic-section";
import EnterpriseAIBenefits from "./enterprise";
import WhyChooseUs from "./why";
import AIStats from "./ai-stats";
import AgenticToolsOverview from "./tools";
import HeroWithTestimonial from "./hero";
import IndustriesSection from "./industry";
import AgenticFramework from "./agentic-frame";
import CtaAgenticAI from "./cta";
import TrustedBrandsMarquee from "../power-apps/trust";
import Certifications from "../power-apps/certification";
export default function AgenticAIPage() {
  return (
    <div>
      <NavigationClient />
      <HeroWithTestimonial />
      <TrustedBrandsMarquee />
      <StackedSlider />
      <EnterpriseAIBenefits />
      <AgenticToolsOverview />
      <IndustriesSection />
      <AgenticFramework />
      <WhyChooseUs />
      <AIStats />
      <AgenticSection />
      <Certifications />
      <CtaAgenticAI />
      <Footer />
    </div>
  );
}
