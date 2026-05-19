import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import GenerativeServices from "./services";
import StickyModels from "./sticky-models";
import ProcessSteps from "./process";
import IndustriesGrid from "./industry";
import WhyChooseUs from "./why-gen-ai";
import GenAIFramework from "./gen-frame";
import HeroWithTestimonial from "./hero";
import TrustedBrandsMarquee from "../../business-applications/power-platform/trust";
import Certifications from "../../business-applications/power-platform/certification";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";

const aiIntelligenceGenAIFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Generative AI solutions do you build?",
    answer:
      "We build AI-powered chatbots, copilots, content generation tools, LLM applications, and intelligent automation systems. We work with OpenAI, Azure OpenAI, and open-source models to deliver enterprise-grade AI solutions.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How do you ensure AI outputs are accurate and reliable?",
    answer:
      "We implement rigorous testing, fine-tuning on domain-specific data, human-in-the-loop validation, and continuous monitoring. We establish feedback loops to improve AI performance and ensure reliable, contextually appropriate outputs.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Can Generative AI integrate with our existing systems?",
    answer:
      "Yes, we integrate AI solutions with CRMs, databases, APIs, document management systems, and other enterprise software. We ensure seamless AI-powered workflows within your existing technology stack.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How long does it take to develop a Generative AI solution?",
    answer:
      "Simple AI chatbots take 4-6 weeks. Complex enterprise AI systems with custom model training and multiple integrations take 10-16 weeks. We provide detailed timelines after assessing your requirements.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What data security measures do you implement for AI?",
    answer:
      "We follow enterprise security standards: data encryption, secure API integrations, access controls, compliance with data privacy regulations, and secure model deployment. We follow Microsoft Gold Partner security standards.",
  },
]
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
      <LightFAQExact faqs={aiIntelligenceGenAIFAQs} />

      <Footer />
    </div>
  );
}
