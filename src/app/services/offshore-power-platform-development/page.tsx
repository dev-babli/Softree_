import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import PowerAppsHero from "./hero";
import PowerAppsServices from "./power-apps-services";
import WhyChooseSoftreePowerApps from "./why-chose";
import TechStackSection from "./tech-stack";
import PowerAppsProcess from "./process";
import PowerAppsCaseStudies from "./casestudies";
import PowerAppsService from "./services";
import HirePowerAppsPricing from "./pricing-card";
import StackedSlider from "./stack-slidr";
import TrustedBrandsMarquee from "./trust";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import type { Metadata } from "next";

const powerPlatformFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Microsoft Power Platform services do you offer?",
    answer:
      "We specialize in Power Apps (canvas and model-driven app), Power Automate workflows, Power BI dashboards, Power Pages, and Dataverse integration. We build end-to-end solutions connecting the entire Power Platform ecosystem.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How long does it take to develop a Power Apps solution?",
    answer:
      "Simple Power Apps MVPs take 4-6 weeks. Complex enterprise solutions with multiple apps and automations take 8-12 weeks. We provide a detailed scope and timeline before starting development.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Can you integrate Power Platform with existing systems?",
    answer:
      "Yes, we integrate Power Platform with Dynamics 365, SharePoint, SQL Server, Office 365, external APIs, and legacy systems. We ensure seamless data flow and business process automation across your entire technology stack.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Do you provide training for Power Platform solutions?",
    answer:
      "We provide comprehensive user training, admin documentation, and handoff sessions. Your team learns to manage and extend the solutions we build. We also offer ongoing support packages for maintenance and enhancements.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How do you handle Power Platform security and governance?",
    answer:
      "We implement Microsoft best practices for security: data loss prevention (DLP), environment strategies, role-based access control, and compliance with your organization's governance policies. We follow Microsoft Gold Partner security standards.",
  },
]

export const metadata: Metadata = {
  title: "Power Platform Development Services | Power Apps & Automation",

  description:
    "Professional Power Platform development services. We build custom Power Apps, automate workflows with Power Automate, and deliver enterprise solutions using the Microsoft Power Platform.",

  keywords: [
    "Power Platform development",
    "Power Apps development",
    "Power Automate services",
    "Power BI development",
    "custom Power Apps",
    "Power Apps consulting",
    "business process automation",
    "low-code development",
    "Microsoft Power Platform",
    "Power Platform development company",
  ],

  openGraph: {
    title: "Power Platform Development Services | Power Apps & Automation",
    description:
      "Professional Power Platform development services for custom Power Apps, automation, and enterprise solutions.",
    url: "https://www.softreetechnology.com/services/offshore-power-platform-development",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Power Platform Development Services",
    description:
      "Custom Power Apps, Power Automate workflows, and Power Platform solutions for businesses.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-power-platform-development",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <NavigationClient />

      {/* HERO (full width but aligned content internally) */}
      <PowerAppsHero />
      {/* <PowerAppsService /> */}
      <TrustedBrandsMarquee />
      <StackedSlider />
      {/* MAIN CONTENT SECTIONS */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <div>
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
      <LightFAQExact faqs={powerPlatformFAQs} />
      <Footer />
    </main>
  );
}
