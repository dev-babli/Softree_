import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import ServicesHeader from "./header";
import ServicesDetails from "./service-details";
import CaseStudiesSlider from "./cases";
import ProjectProcessSection from "./start-project";
import Certifications from "./offshore-power-platform-development/certification";
import ServicesHero from "./hero";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import ProcessTimeline from "./process";
import ServicesSection from "./services";
import { Metadata } from "next";
import IndustriesSection from "./industreis";
import TechCloudShowcase from "./tech";
const servicesMainFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What software development services does Softree offer?",
    answer:
      "We offer comprehensive software development services including web applications, mobile apps, Microsoft Power Platform solutions, SharePoint development, AI/ML solutions, data analytics, and test automation. We specialize in enterprise-grade software.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How do you approach project timelines and delivery?",
    answer:
      "Most of our projects ship in 6 to 12 weeks. We provide fixed scope and fixed timelines during discovery before any contract is signed. We use agile development with weekly demos and milestone checkpoints for transparent delivery.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What technologies and platforms do you specialize in?",
    answer:
      "We specialize in modern web technologies (React, Next.js, Node.js), mobile development (React Native, Flutter), Microsoft ecosystem (Power Platform, SharePoint, Dynamics 365), and AI/ML (OpenAI, Azure OpenAI, custom models).",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can you handle both new development and existing system modernization?",
    answer:
      "Yes, we build new applications from scratch and modernize legacy systems. We handle migrations to modern platforms, cloud migrations, and system integrations to bring your technology stack up to current standards.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What happens if a project takes longer than estimated?",
    answer:
      "Our contracts are fixed-scope and fixed-price. If we miss the timeline, we absorb the cost—not the client. We mitigate risk through weekly demos, milestone reviews, and direct Slack access to the engineering squad working on your project.",
  },
]

export const metadata: Metadata = {
  title: "Services | Softree Technology",
  description:
    "Comprehensive software development services including web, mobile, CRM, AI, and e-commerce solutions by Softree Technology.",
  keywords: [
    "software development services",
    "web development India",
    "mobile app development",
    "CRM development",
    "AI development",
    "ecommerce development",
    "software company India",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services",
  },
  openGraph: {
    title: "Services | Softree Technology",
    description:
      "Comprehensive software development services by Softree Technology.",
    url: "https://www.softreetechnology.com/services",
    siteName: "Softree Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Softree Technology Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Softree Technology",
    description:
      "Comprehensive software development services by Softree Technology.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesMainFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.softreetechnology.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://www.softreetechnology.com/services" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* FIXED NAVIGATION */}
      <NavigationClient />
      {/* MAIN CONTENT – space reserved for pill navbar */}
      <main className="bg-[#09090f]">
        <ServicesHero />
        <ServicesHeader />
        <ServicesSection />
        <IndustriesSection />
        <TechCloudShowcase />
        <ProcessTimeline />
        <LightContactSection />
        <LightFAQExact faqs={servicesMainFAQs} />
      </main>
      {/* FOOTER */}
      <Footer />
    </>
  );
}
