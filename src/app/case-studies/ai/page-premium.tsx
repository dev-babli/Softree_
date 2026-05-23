import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import CaseStudyGridPremium from "../web/case-study-grid-premium"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import { Metadata } from "next"

const aiCaseStudyFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What types of AI case studies do you feature?",
    answer:
      "Our AI case studies showcase generative AI implementations, predictive analytics systems, computer vision applications, and intelligent automation solutions. We highlight the challenges, technical approaches, and business outcomes for each project.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "What AI technologies are used in your projects?",
    answer:
      "We use cutting-edge AI technologies including OpenAI GPT models, Azure OpenAI, custom machine learning models, computer vision frameworks, and natural language processing libraries. Each case study details the specific AI stack used.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How do you measure success in AI implementations?",
    answer:
      "We measure success through metrics like automation efficiency, prediction accuracy, cost savings, user productivity gains, and business impact. Our case studies include quantitative results and measurable outcomes.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can you build similar AI solutions for my business?",
    answer:
      "Yes, we can build similar AI solutions tailored to your specific business requirements. Contact us to discuss your project and we can provide a detailed proposal based on our proven AI implementations.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What industries do you serve with AI solutions?",
    answer:
      "We serve various industries including healthcare, finance, manufacturing, retail, and professional services. Our AI case studies demonstrate our expertise across different sectors and use cases.",
  },
]

const AI_CASE_STUDIES = [
  {
    title: "AI-Powered Customer Support Agent",
    description:
      "An intelligent conversational AI agent that handles customer inquiries, provides instant responses, escalates complex issues, and continuously learns from interactions to improve accuracy and customer satisfaction.",
    image: "/images/case-study/web/shopping.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ShoppingEcommerce.pdf",
    category: "Conversational AI",
  },
  {
    title: "Predictive Analytics Dashboard",
    description:
      "A machine learning-powered analytics dashboard that predicts business trends, identifies opportunities, forecasts revenue, and provides actionable insights for strategic decision-making and operational planning.",
    image: "/images/case-study/web/pet.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/PET_CARE.pdf",
    category: "Predictive Analytics",
  },
  {
    title: "Computer Vision Quality Control",
    description:
      "An automated quality inspection system using computer vision to detect defects, analyze product quality in real-time, reduce manual inspection costs, and improve manufacturing accuracy and consistency.",
    image: "/images/case-study/web/business.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Business-Consultation-App-case-study-1.pdf",
    category: "Computer Vision",
  },
  {
    title: "Document Intelligence Platform",
    description:
      "An AI-powered document processing system that extracts structured data from unstructured documents, automates data entry, reduces processing time, and improves accuracy for finance and administrative workflows.",
    image: "/images/case-study/web/blog.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf",
    category: "Document AI",
  },
  {
    title: "Generative AI Content Engine",
    description:
      "A generative AI platform that creates marketing content, product descriptions, and personalized communications at scale, ensuring brand consistency while dramatically reducing content creation time and costs.",
    image: "/images/case-study/web/food.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.pdf",
    category: "Generative AI",
  },
  {
    title: "Intelligent Process Automation",
    description:
      "An AI-driven automation solution that identifies repetitive tasks, automates complex workflows, integrates with existing systems, and continuously optimizes processes for maximum efficiency and cost savings.",
    image: "/images/case-study/web/auto.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/AUTOREPAIR-PRO.pdf",
    category: "Process Automation",
  },
]

export const metadata: Metadata = {
  title: "AI Case Studies | Softree Technology",
  description:
    "Explore our AI and machine learning case studies showcasing intelligent automation, predictive analytics, and generative AI implementations.",
  keywords: [
    "AI case studies",
    "machine learning projects",
    "generative AI examples",
    "AI implementation",
    "predictive analytics",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/case-studies/ai",
  },
  openGraph: {
    title: "AI Case Studies | Softree Technology",
    description:
      "AI and machine learning case studies by Softree Technology.",
    url: "https://www.softreetechnology.com/case-studies/ai",
    siteName: "Softree Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Technology AI Case Studies",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Case Studies | Softree Technology",
    description:
      "AI and machine learning case studies by Softree Technology.",
    images: ["/og-image.png"],
  },
}

export default function AICaseStudiesPagePremium() {
  return (
    <>
      <NavigationClient />
      <main className="relative bg-[#050505]">
        {/* Premium Hero Section */}
        <section className="relative w-full min-h-[60vh] flex flex-col justify-center py-24 md:py-32 lg:py-40 overflow-hidden">
          {/* Ambient Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1852FF]/15 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-[#C86E4B]/10 rounded-full blur-[150px]" />
          </div>

          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />

          {/* Background Grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }} />

          <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
            {/* Outer Shell */}
            <div className="relative max-w-3xl bg-white/5 rounded-3xl p-1 ring-1 ring-white/10">
              {/* Inner Core */}
              <div className="relative rounded-[calc(1.5rem-0.25rem)] bg-[#0a0a1a]/80 p-8 md:p-12 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                {/* Badge */}
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-[#1852FF]/10 rounded-full blur-lg" />
                  <span className="relative inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1852FF] px-4 py-2 rounded-full border border-[#1852FF]/20 bg-[#1852FF]/5 backdrop-blur-sm">
                    AI & Machine Learning
                  </span>
                </div>

                <h1 className="text-[clamp(36px,5vw,64px)] font-black leading-[1.1] text-white mb-6">
                  AI Case Studies
                </h1>

                <p className="text-sm leading-relaxed text-white/50 font-light max-w-2xl mb-8">
                  Explore how we design and implement intelligent AI solutions that automate workflows, 
                  improve decision-making, and unlock new capabilities for businesses across industries.
                </p>

                {/* Stats */}
                <div className="flex gap-6 flex-wrap">
                  {[
                    { value: "15+", label: "AI Projects" },
                    { value: "95%", label: "Accuracy Rate" },
                    { value: "40%", label: "Cost Reduction" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="relative">
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-[0.05em]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Case Study Grid */}
        <CaseStudyGridPremium />
        
        <LightContactSection />
        <LightFAQExact faqs={aiCaseStudyFAQs} />
      </main>
      <Footer />
    </>
  )
}
