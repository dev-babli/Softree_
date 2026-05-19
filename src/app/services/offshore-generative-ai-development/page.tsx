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
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Generative AI Development Services | Custom AI & Enterprise Automation",

  description:
    "Accelerate innovation with Generative AI development services. We build AI-powered chatbots, copilots, intelligent automation systems, LLM applications, and enterprise AI solutions tailored to your business.",

  keywords: [
    "Generative AI development",
    "AI development services",
    "LLM application development",
    "AI chatbot development",
    "enterprise AI solutions",
    "custom AI solutions",
    "AI automation services",
    "OpenAI integration",
    "Copilot development",
    "Generative AI consulting",
  ],

  openGraph: {
    title:
      "Generative AI Development Services | AI Automation Solutions",
    description:
      "Build intelligent AI applications, copilots, chatbots, and enterprise automation solutions with Generative AI technologies.",
    url: "https://www.softreetechnology.com/services/offshore-generative-ai-development",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Generative AI Development Services",
    description:
      "Custom AI copilots, chatbots, automation, and enterprise Generative AI solutions.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-generative-ai-development",
  },
};
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
