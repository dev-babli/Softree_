import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import { GenerativeAiPage } from "./GenerativeAiPage"
import type { Metadata } from "next"
import { applyPageOg } from "@/lib/site-metadata"

const generativeAIFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What are Generative AI development services?",
    answer:
      "Generative AI development services involve designing and building AI-powered applications that generate content, retrieve information, summarize documents, and support business workflows. Softree helps technology companies, consultancies, agencies, and businesses develop custom Generative AI solutions using large language models (LLMs), retrieval-augmented generation (RAG), and enterprise integrations. From initial architecture to deployment, we tailor the engineering approach to each project's requirements and existing technology stack.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "What types of Generative AI solutions can Softree develop?",
    answer:
      "Softree can support the development of custom LLM applications, RAG-powered knowledge assistants, AI copilots, document intelligence solutions, content-generation applications, and AI-powered workflow automation. For example, a technology partner may want to help its client retrieve answers from internal documents or integrate AI into an existing business application. Our engineering team can help design the solution, connect the relevant data sources, implement the required functionality, and prepare it for deployment.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How does Softree develop custom LLM applications?",
    answer:
      "Custom LLM application development begins with understanding the intended use case, users, data sources, and expected outcomes. Softree can help select a suitable language model, design prompts and application logic, integrate APIs and enterprise data, and evaluate response quality. Depending on the project, we can also implement structured outputs, retrieval pipelines, access controls, and monitoring. This approach helps technology partners build applications around specific business requirements instead of relying only on a general-purpose chatbot.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "What is RAG development, and how can it improve Generative AI applications?",
    answer:
      "Retrieval-augmented generation (RAG) combines information retrieval with a language model so that responses can use relevant information from connected knowledge sources. Softree can develop RAG solutions that process documents, create searchable knowledge indexes, retrieve relevant content, and provide that context to an LLM when generating an answer. This can help businesses build internal knowledge assistants and document-search applications that respond using their own information. Response quality still depends on source data, retrieval performance, and appropriate evaluation.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Which technologies and frameworks does Softree use for Generative AI development?",
    answer:
      "The technology stack depends on the application's requirements, data architecture, deployment environment, and integration needs. Relevant options may include OpenAI, Anthropic Claude, Google Gemini, LangChain, LlamaIndex, Microsoft Azure AI, Azure OpenAI, Amazon Bedrock, Python, and FastAPI. Softree can help assess and integrate suitable technologies for custom LLM applications, RAG pipelines, and enterprise AI solutions. The final selection is based on project fit rather than assuming one framework or model is right for every use case.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "How does Softree integrate Generative AI with existing business systems?",
    answer:
      "Generative AI becomes more useful when it can work with relevant business information and applications. Softree can integrate AI solutions with approved APIs, databases, document repositories, SharePoint, and other enterprise systems. For example, an AI assistant could retrieve relevant business records, summarize information, or prepare an action for review. We can implement authentication, permission checks, validation, and human approval where required so that integrations align with the client's security and operational requirements.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "Can Softree provide offshore and white-label Generative AI development services?",
    answer:
      "Yes. Softree can support technology companies, digital agencies, consultancies, and system integrators through offshore engineering and white-label development engagements. Partners can extend their delivery capacity with engineering support for LLM applications, RAG solutions, AI integrations, testing, and deployment while maintaining their own client relationships. Depending on the engagement, Softree can work as an extension of an existing team or contribute to a defined project under the partner's brand and agreed delivery arrangements.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "How do you ensure the security, accuracy, and reliability of Generative AI applications?",
    answer:
      "Reliable Generative AI applications require evaluation throughout development and after deployment. Softree can help test response quality, retrieval relevance, incorrect or unsupported answers, integration failures, and access permissions. Depending on the use case, safeguards may include grounded responses, role-based access controls, data protection measures, monitoring, logging, and human review for sensitive actions. We also recommend evaluating the application against representative user questions and real workflows before production release, followed by ongoing monitoring and improvement.",
  },
]

export const metadata: Metadata = applyPageOg(
  "/services/generative-ai",
  {
    title: "Generative AI Development Services | Softree Technology",
    description:
      "Build production-ready Generative AI solutions with Softree's offshore engineering team, including custom LLM applications, enterprise RAG, AI copilots, and intelligent workflow automation.",
    keywords: [
      "Generative AI Development Services",
      "Custom Generative AI Solutions",
      "Offshore Generative AI Engineering",
      "LLM Application Development",
      "Enterprise RAG Development",
      "Retrieval-Augmented Generation Services",
      "AI Copilot Development",
      "White-Label Generative AI Development",
      "Custom LLM Consulting",
      "LangChain Development Company",
      "LlamaIndex Enterprise Solutions",
      "Azure OpenAI Development Partner",
      "Amazon Bedrock Integration Services",
      "Enterprise AI Workflow Automation",
      "AI Knowledge Assistant Development",
      "Document Intelligence Solutions",
      "Dedicated Generative AI Developers",
      "AI Governance and Security Services",
    ],
    alternates: {
      canonical: "https://www.softreetechnology.com/services/generative-ai",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: "Generative AI Development Services | Softree Technology",
      description:
        "Build production-ready Generative AI solutions with Softree's offshore engineering team, including custom LLM applications, enterprise RAG, AI copilots, and intelligent workflow automation.",
      url: "https://www.softreetechnology.com/services/generative-ai",
      siteName: "Softree Technology",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Generative AI Development Services | Softree Technology",
      description:
        "Build production-ready Generative AI solutions with Softree's offshore engineering team, including custom LLM applications, enterprise RAG, AI copilots, and intelligent workflow automation.",
    },
  },
  "Softree Technology",
)

export default function GenerativeAI() {
  return (
    <div className="min-h-screen bg-white">
      {/* Structured SEO Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Generative AI Development Services",
              "description":
                "Build production-ready Generative AI solutions with Softree's offshore engineering team, including custom LLM applications, enterprise RAG, AI copilots, and intelligent workflow automation.",
              "provider": {
                "@type": "Organization",
                "name": "Softree Technology",
                "url": "https://www.softreetechnology.com",
              },
              "url": "https://www.softreetechnology.com/services/generative-ai",
              "serviceType": "Generative AI Development Services",
            },
            {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Generative AI Development & Custom Solution Overview",
              "description":
                "Overview of custom Generative AI development, enterprise RAG, AI copilots, and intelligent workflow automation engineered by Softree Technology.",
              "thumbnailUrl": [
                "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video-poster.webp",
                "https://www.softreetechnology.com/og-image.png"
              ],
              "uploadDate": "2025-01-15T08:00:00+00:00",
              "contentUrl": "https://www.softreetechnology.com/ai-development-service-video/ai-agent-video.mp4",
              "embedUrl": "https://www.softreetechnology.com/services/generative-ai",
              "duration": "PT45S",
              "publisher": {
                "@type": "Organization",
                "name": "Softree Technology",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.softreetechnology.com/logo/logo.png"
                }
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.softreetechnology.com",
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Services",
                  "item": "https://www.softreetechnology.com/services",
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Generative AI Development",
                  "item": "https://www.softreetechnology.com/services/generative-ai",
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": generativeAIFAQs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer,
                },
              })),
            },
          ]),
        }}
      />
      <NavigationClient />
      <GenerativeAiPage faqs={generativeAIFAQs} />
      <Footer />
    </div>
  )
}
