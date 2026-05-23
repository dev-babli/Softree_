import type { Metadata } from "next";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import PowerAppsHero from "./hero";
import PowerAppsServices from "./power-apps-services";
import WhyChooseSoftreePowerApps from "./why-chose";
import TechStackSection from "./tech-stack";
import PowerAppsProcess from "./process";
import PowerAppsCaseStudies from "./casestudies";
import Certifications from "./certification";
import CtaPowerApps from "./cta";
import TestimonialsSplitSlider from "./testimonial";
import PowerAppsService from "./services";
import HirePowerAppsPricing from "./pricing-card";
import StackedSlider from "./stack-slidr";
import TrustedBrandsMarquee from "./trust";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Power Platform Development Services | Softree Technology",
  description:
    "Microsoft Power Platform solutions — Power Apps, Power Automate, Power BI, and Copilot Studio. Custom low-code enterprise apps built by Softree Technology.",
  alternates: {
    canonical: "https://www.softreetechnology.com/services/business-applications/power-platform",
  },
  openGraph: {
    title: "Power Platform Development | Softree Technology",
    description:
      "Custom Power Apps, Power Automate workflows, and Power BI dashboards for enterprise digital transformation.",
    url: "https://www.softreetechnology.com/services/business-applications/power-platform",
    siteName: "Softree Technology",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Power Platform Services" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Power Platform Development | Softree Technology",
    description: "Microsoft Power Platform — Power Apps, Power Automate, and Power BI solutions.",
    images: ["/og-image.png"],
  },
};

const businessAppsPowerPlatformFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Power Platform solutions do you build for business applications?",
    answer:
      "We build custom business applications using Power Apps, automate workflows with Power Automate, create Power BI dashboards, and develop Power Pages. We focus on solving specific business challenges with low-code solutions.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How do Power Platform solutions integrate with business systems?",
    answer:
      "We integrate Power Platform with Dynamics 365, SQL Server, SharePoint, Office 365, external APIs, and legacy systems. We ensure seamless data flow and business process automation across your entire technology stack.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What is the typical timeline for a business application?",
    answer:
      "Simple Power Apps take 4-6 weeks. Complex business applications with multiple apps, workflows, and integrations take 8-12 weeks. We provide detailed timelines based on your specific business requirements.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can you help with governance and security for business applications?",
    answer:
      "Yes, we implement Microsoft best practices for security: data loss prevention (DLP), environment strategies, role-based access control, and compliance with your organization's governance policies.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Do you provide training for business users and admins?",
    answer:
      "We provide comprehensive training for business users, power users, and administrators. We cover app usage, workflow management, dashboard creation, and governance to ensure your team can effectively use the solutions.",
  },
]


export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.softreetechnology.com" },
          { name: "Services", url: "https://www.softreetechnology.com/services" },
          { name: "Business Applications", url: "https://www.softreetechnology.com/services/business-applications/power-platform" },
          { name: "Power Platform", url: "https://www.softreetechnology.com/services/business-applications/power-platform" },
        ]}
      />
      <NavigationClient />

      {/* HERO (full width but aligned content internally) */}
      <PowerAppsHero />
      {/* <PowerAppsService /> */}
      <TrustedBrandsMarquee />
      <StackedSlider />
      {/* MAIN CONTENT SECTIONS */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <div >
          <PowerAppsCaseStudies />
          <PowerAppsServices />
          <HirePowerAppsPricing />
          <WhyChooseSoftreePowerApps />
          <TechStackSection />
          <PowerAppsProcess />
          {/* <TestimonialsSplitSlider /> */}
          {/* <Certifications /> */}
        </div>
      </section>

      <LightContactSection />
      <LightFAQExact faqs={businessAppsPowerPlatformFAQs} />
      <Footer />
    </main>
  );
}
