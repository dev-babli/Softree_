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
import TrustedBrandsMarquee from "../../business-applications/power-platform/trust";
import Certifications from "../../business-applications/power-platform/certification";
import AIServicesSection from "./strategy";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";

const aiIntelligenceAgenticAIFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Agentic AI solutions do you build?",
    answer:
      "We build autonomous AI agents, intelligent automation systems, AI-powered workflows, and enterprise AI solutions. We specialize in creating AI agents that can execute complex tasks, make decisions, and interact with systems autonomously.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How do AI agents differ from traditional automation?",
    answer:
      "AI agents use LLMs and machine learning to understand context, make decisions, and adapt to changing situations. Unlike traditional automation, AI agents can handle unstructured data, learn from feedback, and execute complex multi-step workflows.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Can AI agents integrate with our business systems?",
    answer:
      "Yes, we integrate AI agents with CRMs, databases, APIs, document management systems, and other enterprise software. Agents can trigger actions, retrieve information, and update systems across your technology stack.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How long does it take to build an AI agent solution?",
    answer:
      "Simple AI agents take 4-8 weeks. Complex enterprise agent systems with multiple integrations and custom training take 10-16 weeks. We provide detailed timelines after assessing your requirements and use cases.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How do you ensure AI agent reliability and safety?",
    answer:
      "We implement guardrails, human-in-the-loop validation, monitoring, and fallback mechanisms. We establish clear boundaries for agent actions and provide comprehensive testing to ensure safe and reliable operation.",
  },
]
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
      <AIServicesSection />
      <WhyChooseUs />

      <AgenticSection />
      <Certifications />
      <LightContactSection />
      <LightFAQExact faqs={aiIntelligenceAgenticAIFAQs} />

      <Footer />
    </div>
  );
}
