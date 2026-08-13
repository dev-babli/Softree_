import type { Metadata } from "next"
import { applyPageOg } from "@/lib/site-metadata"
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"

// Page Sections & Components from existing Generative AI page
import { GenerativeAiPageLoader } from "@/app/services/generative-ai/GenerativeAiPageLoader"
import { GenAiHero } from "@/app/services/generative-ai/sections/GenAiHero"
import { GenAiServices } from "@/app/services/generative-ai/sections/GenAiServices"
import GenAiPortfolio from "@/app/services/generative-ai/sections/GenAiPortfolio"
import GenAiResilience from "@/app/services/generative-ai/sections/GenAiResilience"
import { GenAiFramework } from "@/app/services/generative-ai/sections/GenAiFramework"
import { GenAiIndustry } from "@/app/services/generative-ai/sections/GenAiIndustry"
import { GenAiProcess } from "@/app/services/generative-ai/sections/GenAiProcess"

// Global layout & section blocks
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust"
import { SuccessStories } from "@/app/solutions/ai-chatbot-development/components/SuccessStories/SuccessStories"
import ProvenResults from "@/components/sections/ProvenResults"
import AiTechnologyStack from "@/app/solutions/ai-chatbot-development/components/AiTechnologyStack"
import WhyChooseWithTestimonials from "@/app/services/offshore-generative-ai-development/why-gen-ai"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import LightContactSection from "@/components/homepage-light/LightContactSection"

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

export const metadata: Metadata = applyPageOg(
  "/services/enterprise-generative-ai-development",
  {
    title: "Enterprise Generative AI Development Services | Softree",
    description:
      "Transform your business with scalable Generative AI solutions that automate workflows, enhance customer experiences, and drive intelligent decision-making.",
    keywords: [
      "Enterprise Generative AI Development",
      "Generative AI Development Services",
      "Generative AI Solutions",
      "Custom LLM Development",
      "AI Copilot Development",
      "RAG Development Services",
      "Enterprise AI Solutions",
    ],
    openGraph: {
      title: "Enterprise Generative AI Development Services | Softree",
      description:
        "Drive enterprise innovation with intelligent Generative AI solutions built for real-world business needs, including custom LLMs, AI copilots, RAG applications, and intelligent automation.",
      url: "https://www.softreetechnology.com/services/enterprise-generative-ai-development",
      siteName: "Softree Technology",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Enterprise Generative AI Development Services | Softree",
      description:
        "Transform your business with scalable Generative AI solutions that automate workflows, enhance customer experiences, and drive intelligent decision-making.",
    },
    alternates: {
      canonical: "https://www.softreetechnology.com/services/enterprise-generative-ai-development",
    },
  },
  "Softree Technology",
)

export default function EnterpriseGenerativeAiPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationClient />
      
      <div className="overflow-x-clip bg-white">
        <GenerativeAiPageLoader />
        
        <div className="generative-ai-reveal">
          <GenAiHero
            badgeText="Enterprise Generative AI"
            heading={
              <>
                Drive Enterprise Innovation with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  Intelligent Generative AI Solutions
                </span>{" "}
                Built for Real-World Business Needs
              </>
            }
            subheading="Build secure, scalable, and production-ready Generative AI solutions that transform enterprise workflows and customer experiences."
          />
          <TrustedBrandsMarquee />
        </div>

        <SuccessStories />
        <GenAiServices />
        <GenAiPortfolio />
        <GenAiResilience />
        <ProvenResults solution="enterprise-rag" />
        <GenAiFramework />
        <GenAiIndustry />
        
        <AiTechnologyStack
          title="Technology Stack for Enterprise"
          accentTitle="Generative AI Development"
          description="We build production-ready generative AI solutions using leading LLMs, advanced RAG frameworks, vector databases, cloud platforms, and enterprise security technologies for secure, scalable operations."
        />
        
        <GenAiProcess />
        <WhyChooseWithTestimonials />
        <LightFAQExact faqs={generativeAIFAQs} />
        <LightContactSection />
      </div>

      <Footer />
    </div>
  )
}
