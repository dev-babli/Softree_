import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import ServicesHeroPremium from "../hero-premium"
import ServicesSectionPremium from "../services-premium"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import { Metadata } from "next"

const powerPlatformFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Microsoft Power Platform services do you offer?",
    answer:
      "We provide comprehensive Power Platform solutions including Power Apps development, Power Automate workflows, Power BI dashboards, and Power Virtual Agents. We help organizations build low-code solutions quickly and efficiently.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How do you ensure Power Platform solutions integrate with existing systems?",
    answer:
      "We integrate Power Platform solutions with Microsoft 365, Dynamics 365, external APIs, databases, and legacy systems. We ensure seamless data flow and unified workflows across your entire technology stack.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What is the typical timeline for a Power Platform project?",
    answer:
      "Power Platform projects typically take 4-10 weeks due to the low-code nature. Simple apps take 2-4 weeks, while complex enterprise solutions with multiple integrations take 8-12 weeks.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Do you provide training and support for Power Platform?",
    answer:
      "Yes, we provide comprehensive training for citizen developers and IT administrators. We also offer ongoing support, monitoring, and enhancement services to ensure your solutions remain effective.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What governance and security measures do you implement?",
    answer:
      "We implement robust governance policies, security best practices, data loss prevention, and compliance measures. We ensure your Power Platform environment is secure, compliant, and aligned with organizational standards.",
  },
]

export const metadata: Metadata = {
  title: "Power Platform Development Services | Softree Technology",
  description:
    "Microsoft Power Platform development services including Power Apps, Power Automate, and Power BI by Softree Technology.",
  keywords: [
    "Power Platform development",
    "Power Apps",
    "Power Automate",
    "Power BI",
    "low-code development",
    "Microsoft 365",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services/offshore-power-platform-development",
  },
  openGraph: {
    title: "Power Platform Development Services | Softree Technology",
    description:
      "Microsoft Power Platform development services by Softree Technology.",
    url: "https://www.softreetechnology.com/services/offshore-power-platform-development",
    siteName: "Softree Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Technology Power Platform Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Power Platform Development Services | Softree Technology",
    description:
      "Microsoft Power Platform development services by Softree Technology.",
    images: ["/og-image.png"],
  },
}

export default function PowerPlatformPagePremium() {
  return (
    <>
      <NavigationClient />
      <main className="relative bg-[#050505]">
        <ServicesHeroPremium />
        <ServicesSectionPremium />
        <LightContactSection />
        <LightFAQExact faqs={powerPlatformFAQs} />
      </main>
      <Footer />
    </>
  )
}
