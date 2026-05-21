import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import ServicesHeroPremium from "../hero-premium"
import ServicesSectionPremium from "../services-premium"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import { Metadata } from "next"

const dataAnalyticsFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What data analytics services do you offer?",
    answer:
      "We provide comprehensive data analytics solutions including data engineering, business intelligence dashboards, predictive analytics, real-time reporting, and data visualization. We help transform raw data into actionable insights.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How do you ensure data quality and accuracy?",
    answer:
      "We implement robust data validation, quality checks, and automated monitoring systems. We ensure data integrity through proper ETL processes, data cleansing, and continuous quality assurance throughout the analytics pipeline.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What is the typical timeline for an analytics project?",
    answer:
      "Analytics projects typically take 6-12 weeks depending on complexity. Simple dashboards take 4-6 weeks, while complex predictive analytics systems take 10-14 weeks. We provide detailed timelines during discovery.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Do you support real-time analytics and streaming data?",
    answer:
      "Yes, we build real-time analytics solutions using streaming technologies, event-driven architectures, and low-latency data pipelines. We enable instant insights and live monitoring for your business metrics.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What data platforms and tools do you specialize in?",
    answer:
      "We specialize in Microsoft Power BI, Azure Analytics, Snowflake, Databricks, Tableau, and custom analytics solutions. We choose the right tools based on your specific requirements and existing infrastructure.",
  },
]

export const metadata: Metadata = {
  title: "Data Analytics Services | Softree Technology",
  description:
    "Enterprise data analytics and business intelligence services including dashboards, predictive analytics, and data visualization by Softree Technology.",
  keywords: [
    "data analytics services",
    "business intelligence",
    "Power BI development",
    "data visualization",
    "predictive analytics",
    "analytics company India",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services/data-analytics",
  },
  openGraph: {
    title: "Data Analytics Services | Softree Technology",
    description:
      "Enterprise data analytics and business intelligence services by Softree Technology.",
    url: "https://www.softreetechnology.com/services/data-analytics",
    siteName: "Softree Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Technology Data Analytics Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Analytics Services | Softree Technology",
    description:
      "Enterprise data analytics and business intelligence services by Softree Technology.",
    images: ["/og-image.png"],
  },
}

export default function DataAnalyticsPagePremium() {
  return (
    <>
      <NavigationClient />
      <main className="relative bg-[#050505]">
        <ServicesHeroPremium />
        <ServicesSectionPremium />
        <LightContactSection />
        <LightFAQExact faqs={dataAnalyticsFAQs} />
      </main>
      <Footer />
    </>
  )
}
