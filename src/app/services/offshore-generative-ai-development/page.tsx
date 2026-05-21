import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import GenerativeServices from "./services";
import StickyModels from "./sticky-models";
import ProcessSteps from "./process";
import IndustriesGrid from "./industry";
import WhyChooseUs from "./why-gen-ai";
import GenAIFramework from "./gen-frame";
import HeroWithTestimonial from "./hero";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import Certifications from "../offshore-power-platform-development/certification";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import type { Metadata } from "next";

const generativeAIFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Generative AI services do you offer?",
    answer:
      "We build AI-powered chatbots, copilots, LLM applications, intelligent automation systems, and custom AI solutions. We work with OpenAI, Azure OpenAI, and open-source models to deliver enterprise-grade AI implementations.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How long does it take to develop an AI solution?",
    answer:
      "AI MVPs take 6-10 weeks. Complex enterprise AI systems with custom model training and integration take 12-16 weeks. We provide detailed timelines after assessing your requirements and data readiness.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Can you integrate AI with existing business systems?",
    answer:
      "Yes, we integrate AI solutions with CRMs, databases, APIs, document management systems, and other enterprise software. We ensure seamless AI-powered workflows within your existing technology stack.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How do you ensure AI accuracy and reliability?",
    answer:
      "We implement rigorous testing, fine-tuning on domain-specific data, human-in-the-loop validation, and continuous monitoring. We establish feedback loops to improve AI performance and ensure reliable outputs.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What data security measures do you implement for AI?",
    answer:
      "We follow enterprise security standards: data encryption, secure API integrations, access controls, compliance with data privacy regulations, and secure model deployment. We follow Microsoft Gold Partner security standards.",
  },
]

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
      <LightContactSection />
      <LightFAQExact faqs={generativeAIFAQs} />

      <Footer />
    </div>
  );
}
