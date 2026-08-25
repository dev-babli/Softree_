import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import { GenerativeAiPage } from "./GenerativeAiPage"
import type { Metadata } from "next"
import { applyPageOg } from "@/lib/site-metadata"

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
  "/services/generative-ai",
  {
    title: "Generative AI Development Services | Softree Technology",

    description:
      "Build production-ready generative AI solutions with Softree's offshore delivery team, including LLM applications, RAG, AI copilots, and intelligent automation.",

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
      title: "Generative AI Development Services | AI Automation Solutions",
      description:
        "Build intelligent AI applications, copilots, chatbots, and enterprise automation solutions with Generative AI technologies.",
      url: "https://www.softreetechnology.com/services/generative-ai",
      siteName: "Softree Technology",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "Generative AI Development Services",
      description: "Custom AI copilots, chatbots, automation, and enterprise Generative AI solutions.",
    },

    alternates: {
      canonical: "https://www.softreetechnology.com/services/generative-ai",
    },
  },
  "Softree Technology",
)

export default function GenerativeAI() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationClient />
      <GenerativeAiPage faqs={generativeAIFAQs} />
      <Footer />
    </div>
  )
}
