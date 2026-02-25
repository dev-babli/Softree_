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
import TrustedBrandsMarquee from "../power-apps/trust";
import Certifications from "../power-apps/certification";
import { AccordionComponent } from "./faq";
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
      <Footer />
    </div>
  );
}
