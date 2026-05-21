import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import ServicesHeroPremium from "../hero-premium"
import ServicesSectionPremium from "../services-premium"
import LightContactSection from "@/components/homepage-light/LightContactSection"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import { Metadata } from "next"

const sharePointFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What SharePoint development services do you offer?",
    answer:
      "We provide comprehensive SharePoint solutions including intranet portals, document management systems, workflow automation, custom SharePoint apps, and migration services. We help organizations maximize their Microsoft 365 investment.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "Do you support SharePoint Online and on-premises?",
    answer:
      "Yes, we support both SharePoint Online (Microsoft 365) and SharePoint on-premises deployments. We help organizations choose the right deployment model and provide seamless migration between platforms.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What is the typical timeline for a SharePoint project?",
    answer:
      "SharePoint projects typically take 6-12 weeks. Simple intranets take 4-6 weeks, while complex enterprise portals with custom workflows take 10-16 weeks. We provide detailed timelines during discovery.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can you help with SharePoint migration from older versions?",
    answer:
      "Yes, we specialize in SharePoint migration from older versions to SharePoint Online or SharePoint Server. We handle content migration, custom solutions migration, and ensure minimal business disruption.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What integration capabilities do you offer?",
    answer:
      "We integrate SharePoint with Microsoft 365 apps (Teams, Power Platform), external systems (ERP, CRM), custom applications, and third-party services. We ensure seamless data flow and unified user experiences.",
  },
]

export const metadata: Metadata = {
  title: "SharePoint Development Services | Softree Technology",
  description:
    "Enterprise SharePoint development services including intranets, document management, and workflow automation by Softree Technology.",
  keywords: [
    "SharePoint development",
    "SharePoint intranet",
    "Microsoft 365 development",
    "document management",
    "workflow automation",
    "SharePoint migration",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services/offshore-sharepoint-development",
  },
  openGraph: {
    title: "SharePoint Development Services | Softree Technology",
    description:
      "Enterprise SharePoint development services by Softree Technology.",
    url: "https://www.softreetechnology.com/services/offshore-sharepoint-development",
    siteName: "Softree Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Technology SharePoint Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SharePoint Development Services | Softree Technology",
    description:
      "Enterprise SharePoint development services by Softree Technology.",
    images: ["/og-image.png"],
  },
}

export default function SharePointPagePremium() {
  return (
    <>
      <NavigationClient />
      <main className="relative bg-[#050505]">
        <ServicesHeroPremium />
        <ServicesSectionPremium />
        <LightContactSection />
        <LightFAQExact faqs={sharePointFAQs} />
      </main>
      <Footer />
    </>
  )
}
