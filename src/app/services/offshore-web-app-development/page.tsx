import dynamic from "next/dynamic";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import WhyChooseSoftreeWebDevelopment from "./why-chose";
import WebDevelopmentCaseStudies from "./case-studies";
import Hero from "./components/Hero";
import WhoWeHelp from "./components/WhoWeHelp";
import WebAppSqueezeCarousel from "./components/WebAppSqueezeCarousel";
import WebAppTechStack from "./components/WebAppTechStack";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";

const ReverseStickyScroll = dynamic(
  () => import("./components/ReverseStickyScroll").then((mod) => mod.ReverseStickyScroll),
  { ssr: true }
);

const webAppFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What offshore web app development services does Softree Technology offer?",
    answer:
      "Softree Technology provides web application development services, including custom web applications, enterprise web solutions, API integrations, and application maintenance. We build solutions tailored to your business requirements, operational needs, and growth goals.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "Does Softree Technology provide custom web application development?",
    answer:
      "Yes, Softree Technology develops custom web applications designed around your business workflows and user needs. Our solutions focus on functionality, responsive user experiences, scalability, and integration with existing business systems.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Why choose Softree Technology for offshore web development?",
    answer:
      "Softree Technology helps businesses extend their development capacity through offshore web development services. Our approach focuses on business requirements, flexible engagement options, modern technologies, and reliable application delivery.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "What technologies does Softree Technology use for web app development?",
    answer:
      "Softree Technology works with modern web technologies, including React.js, Next.js, Node.js, and TypeScript, along with cloud platforms such as AWS and Azure. We select the technology stack according to your application requirements, performance needs, and scalability goals.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Does Softree Technology develop enterprise web applications?",
    answer:
      "Yes, Softree Technology supports enterprise web application development for businesses that need scalable applications, business portals, workflow solutions, and integrations with existing systems. Our solutions are designed to support operational efficiency and evolving business requirements.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Can Softree Technology integrate web applications with existing business systems?",
    answer:
      "Yes, we develop API integrations that connect web applications with databases, third-party services, and existing business systems such as CRM and ERP platforms. These integrations help improve data exchange and streamline business workflows.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "How does Softree Technology approach web application security and scalability?",
    answer:
      "Softree Technology considers security, performance, and scalability throughout the web application development process. Our development approach can include secure authentication, access controls, data protection practices, performance optimization, and scalable architecture based on project requirements.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "Does Softree Technology provide web application maintenance and support?",
    answer:
      "Yes, Softree Technology can support ongoing web application maintenance, including bug fixes, updates, performance improvements, and feature enhancements, based on the agreed project scope and support arrangement.",
  },
];

/* ------------------------------------------------------------------ */
/* Shared Layout Config                                                */
/* ------------------------------------------------------------------ */
const SECTION_WRAPPER = "mx-auto max-w-full px-8 sm:px-10 md:px-14 lg:px-20";
const SECTION_GAP = "space-y-24";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Web App Development Services | Softree Technology",
  },

  description:
    "Softree Technology offers offshore web app development services to build secure, scalable custom web applications for enterprises and growing businesses.",

  keywords: [
    // Primary Keyword
    "web application development",

    // Secondary Keywords
    "web app development",
    "web app development services",
    "web application development services",
    "custom web application development",
    "custom web application development services",
    "custom web app development",
    "custom web app development services",
    "web application development company",
    "web app development companies",
    "web app development agency",
    "website and app development",
    "web and app development",
    "web application and development",
    "web software development",
    "enterprise web application development",
    "offshore web app development",
    "offshore web development",
    "offshore web development services",
    "offshore web development company",
    "SaaS application development",
    "full-stack development",
    "web application integration",
    "web application maintenance services",
  ],

  openGraph: {
    title: "Web App Development Services | Softree Technology",
    description:
      "Softree Technology offers offshore web app development services to build secure, scalable custom web applications for enterprises and growing businesses.",
    url: "https://www.softreetechnology.com/services/offshore-web-app-development",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Web App Development Services | Softree Technology",
    description:
      "Softree Technology offers offshore web app development services to build secure, scalable custom web applications for enterprises and growing businesses.",
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
      <Hero />

      {/* MAIN CONTENT — COMPONENT BACKGROUND */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <TrustedBrandsMarquee />
        <WhoWeHelp />
        <ReverseStickyScroll />
        <WebDevelopmentCaseStudies />
        <WebAppSqueezeCarousel />
        <WebAppTechStack />
        <WhyChooseSoftreeWebDevelopment />
      </section>
      <LightFAQExact faqs={webAppFAQs} />
      <LightContactSection />


      <Footer />
    </main>
  );
}
