import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import GenerativeServices from "./services";
import StickyModels from "./sticky-models";
import ProcessSteps from "./process";
import IndustriesGrid from "./industry";
import WhyChooseUs from "./why-gen-ai";
import GenAIFramework from "./gen-frame";
import CtaGenAI from "./cta";
import HeroWithTestimonial from "./hero";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import Certifications from "../offshore-power-platform-development/certification";
import { GenAIFaq } from "./faq";
export default function GenerativeAI() {
  return (
    <div>
      <NavigationClient />
      <HeroWithTestimonial />
      <TrustedBrandsMarquee />
      <GenerativeServices />
      <StickyModels />
      <IndustriesGrid />
      <ProcessSteps />
      <GenAIFramework />
      <WhyChooseUs />
      <Certifications />
      <CtaGenAI />
      <GenAIFaq />

      <Footer />
    </div>
  );
}
