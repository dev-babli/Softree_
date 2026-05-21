import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import ServicesHeroPremium from "../hero-premium"
import ServicesSectionPremium from "../services-premium"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import { Metadata } from "next"

const aiIntelligenceFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What AI and machine learning services do you offer?",
    answer:
      "We provide comprehensive AI/ML solutions including generative AI integration, predictive analytics, computer vision, natural language processing, and custom model development. We specialize in practical, business-focused AI implementations.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How do you ensure AI solutions integrate with existing systems?",
    answer:
      "We design AI solutions that seamlessly integrate with your existing technology stack, including Microsoft 365, ERP systems, CRM platforms, and custom applications. We ensure data flow, security, and user experience remain consistent.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What is the typical timeline for AI/ML project development?",
    answer:
      "AI projects typically take 8-14 weeks depending on complexity. Simple predictive models take 6-8 weeks, while complex generative AI systems take 12-16 weeks. We provide detailed timelines during discovery.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Do you provide ongoing support and model maintenance?",
    answer:
      "Yes, we provide ongoing support including model retraining, performance monitoring, drift detection, and continuous improvement. We ensure your AI solutions remain accurate and effective over time.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What industries do you serve with AI solutions?",
    answer:
      "We serve various industries including healthcare, finance, manufacturing, retail, and professional services. Our AI solutions are tailored to industry-specific challenges and regulatory requirements.",
  },
]

export const metadata: Metadata = {
  title: "AI Intelligence Services | Softree Technology",
  description:
    "Enterprise AI and machine learning services including generative AI, predictive analytics, and intelligent automation by Softree Technology.",
  keywords: [
    "AI development services",
    "machine learning",
    "generative AI",
    "AI integration",
    "predictive analytics",
    "AI company India",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services/ai-intelligence",
  },
  openGraph: {
    title: "AI Intelligence Services | Softree Technology",
    description:
      "Enterprise AI and machine learning services by Softree Technology.",
    url: "https://www.softreetechnology.com/services/ai-intelligence",
    siteName: "Softree Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Technology AI Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Intelligence Services | Softree Technology",
    description:
      "Enterprise AI and machine learning services by Softree Technology.",
    images: ["/og-image.png"],
  },
}

export default function AIIntelligencePagePremium() {
  return (
    <>
      <NavigationClient />
      <main className="relative bg-[#050505]">
        <ServicesHeroPremium />
        <ServicesSectionPremium />
        <LightContactSection />
        <LightFAQExact faqs={aiIntelligenceFAQs} />
      </main>
      <Footer />
    </>
  )
}
