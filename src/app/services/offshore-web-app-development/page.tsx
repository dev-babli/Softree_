import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import Certifications from "../offshore-power-platform-development/certification";
import FullStackTeams from "./full-stack";
import ThreePillars from "./three-pillar";
import CollaborationTabs from "./collab-tab";
import WebDevelopmentHero from "./process";
import QualityBenchmark from "./quality";
import WhyChooseSoftreeWebDevelopment from "./why-chose";
import WebDevelopmentCaseStudies from "./case-studies";
import WebDevHero from "./hero";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";

const webAppFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What technologies do you use for web app development?",
    answer:
      "We specialize in modern web technologies: React.js, Next.js, Node.js, TypeScript, and cloud platforms like AWS and Azure. We choose the right tech stack based on your project requirements, scalability needs, and performance goals.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How long does it take to build a custom web application?",
    answer:
      "Typical web app MVPs take 8-12 weeks. Complex enterprise portals may take 12-16 weeks. We provide a detailed timeline during discovery phase with milestone checkpoints to ensure transparent delivery.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Do you provide ongoing maintenance and support?",
    answer:
      "Yes, we offer flexible maintenance packages including bug fixes, security updates, performance optimization, and feature enhancements. Our support team ensures your web application stays secure and up-to-date.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How do you ensure web application security?",
    answer:
      "We implement industry-standard security practices: OWASP compliance, data encryption, secure authentication, regular security audits, and penetration testing. We follow Microsoft Gold Partner security standards.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Can you integrate with existing systems and APIs?",
    answer:
      "Absolutely. We have extensive experience integrating web applications with third-party APIs, legacy systems, databases, CRMs, ERPs, and other enterprise software. We ensure seamless data flow and system interoperability.",
  },
]

/* ------------------------------------------------------------------ */
/* Shared Layout Config                                                */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-full px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web App Development Services | Custom Enterprise Web Applications",

  description:
    "Professional web app development services. We build scalable, secure, and high-performance custom web applications, SaaS platforms, and enterprise portals using modern technologies.",

  keywords: [
    "web app development",
    "custom web applications",
    "enterprise web development",
    "SaaS application development",
    "full-stack development",
    "React.js development",
    "Node.js development",
    "cloud-based web apps",
    "web application development company",
    "secure web applications",
  ],

  openGraph: {
    title: "Web App Development Services | Enterprise & SaaS Applications",
    description:
      "Custom web app development services for startups and enterprises. Scalable, secure, and high-performance web applications tailored to your business needs.",
    url: "https://www.softreetechnology.com/services/offshore-web-app-development",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Web App Development Services",
    description:
      "Custom enterprise and SaaS web applications with modern technologies.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-web-app-development",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <NavigationClient />

      {/* HERO */}
      <WebDevHero />

      {/* MAIN CONTENT — COMPONENT BACKGROUND */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <TrustedBrandsMarquee />
        <WebDevelopmentCaseStudies />
        <WebDevelopmentHero />
        <FullStackTeams />
        <ThreePillars />
        <CollaborationTabs />
        <QualityBenchmark />
        <WhyChooseSoftreeWebDevelopment />
        {/* <Certifications /> */}
      </section>

      <LightContactSection />
      <LightFAQExact faqs={webAppFAQs} />

      <Footer />
    </main>
  );
}
