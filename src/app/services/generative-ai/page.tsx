import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import { GenerativeAiPage } from "./GenerativeAiPage"
import type { Metadata } from "next"
import { applyPageOg } from "@/lib/site-metadata"

const generativeAIFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What generative AI development services does Softree Technology offer?",
    answer:
      "Softree Technology provides generative AI development services, including custom LLM applications, AI chatbots, copilots, retrieval-augmented generation (RAG), model fine-tuning, AI consulting, enterprise integration, and AI safety and governance. We help businesses identify suitable use cases and build AI solutions aligned with their data, workflows, and operational requirements.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How long does it take to develop a generative AI solution?",
    answer:
      "The development timeline depends on the project's scope, data readiness, model requirements, integrations, security controls, and testing needs. A proof of concept may require less development effort than an enterprise solution involving custom retrieval pipelines, multiple business systems, or model fine-tuning. Softree defines delivery milestones and estimates after assessing the requirements and technical dependencies.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What is retrieval-augmented generation (RAG), and when should a business use it?",
    answer:
      "Retrieval-augmented generation (RAG) connects a generative AI model to relevant information from selected knowledge sources before it generates a response. It is useful when businesses need AI applications to answer questions using internal documents, policies, manuals, contracts, or knowledge bases. A well-designed RAG solution can improve responses by grounding them in retrieved information and can provide source references where supported by the implementation.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can generative AI integrate with existing business applications?",
    answer:
      "Yes. Generative AI solutions can integrate with existing business applications through APIs, connectors, and custom integration components. Depending on the requirements, these integrations can connect AI capabilities with enterprise applications, databases, document repositories, and business workflows. The integration approach depends on system compatibility, authentication, data access permissions, and the required functionality.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How does Softree help protect data in generative AI applications?",
    answer:
      "Softree can incorporate security and governance measures into generative AI architecture, including access controls, protected integrations, sensitive-data handling, output validation, and monitoring. The appropriate safeguards depend on the model, hosting environment, data sensitivity, and organizational policies. Security requirements should be defined during solution design and validated before production deployment.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "How do you ensure the accuracy and reliability of generative AI outputs?",
    answer:
      "Generative AI reliability can be improved through appropriate model selection, prompt engineering, relevant knowledge sources, RAG, and systematic evaluation. Testing can assess factual grounding, response relevance, unsupported claims, integration behavior, and performance against representative business questions. Depending on the use case, source citations, human review, guardrails, and ongoing monitoring can help manage incorrect or unsuitable outputs.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "What is the difference between a custom LLM application and a fine-tuned AI model?",
    answer:
      "A custom LLM application uses a language model within an application designed for a specific business purpose, often with prompts, tools, integrations, or RAG. Fine-tuning further trains a model on selected examples to adapt its behavior or response patterns to a particular task. The right approach depends on the business objective, available data, desired behavior, cost, and maintenance requirements; fine-tuning is not necessary for every generative AI project.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "Why choose Softree Technology for generative AI development?",
    answer:
      "Softree Technology combines AI engineering capabilities with offshore delivery, enterprise integration, and modern application development. Our services cover custom LLM applications, RAG pipelines, model fine-tuning, AI safety and governance, and AI integration. We support organizations and technology partners through project delivery, flexible engineering capacity, and white-label engagements, with the approach tailored to each project's technical and business requirements.",
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
