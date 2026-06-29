import dynamic from "next/dynamic";
import NavigationServer from "@/components/sections/navigation-server";
import Footer from "@/components/sections/footer";
import ServicesHubIntro from "./services-hub-intro";
import ServicesHubSticky from "./services-hub-sticky";
import ServicesHubBreadcrumb from "./services-hub-breadcrumb";
import ServicesHubTestimonial from "./services-hub-testimonial";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";

const ServicesStackedSlides = dynamic(
  () => import("@/components/sections/ServicesStackedSlides"),
  {
    loading: () => (
      <div className="min-h-[100vh] w-full bg-[#F3F0EE]" aria-hidden="true" />
    ),
  },
);

const HomepageCaseStudiesSection = dynamic(
  () => import("@/components/sections/HomepageCaseStudiesSection"),
  {
    loading: () => (
      <div className="min-h-[70vh] w-full bg-[#F3F0EE]" aria-hidden="true" />
    ),
  },
);

const LightEngagementModels = dynamic(
  () => import("@/components/homepage-light/LightEngagementModels"),
  {
    loading: () => (
      <div className="min-h-[80vh] w-full bg-[#F3F0EE]" aria-hidden="true" />
    ),
  },
);

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
];

export const metadata: Metadata = applyPageOg("/services", {
  title: "Services | Softree Technology",
  description:
    "Microsoft Power Platform, SharePoint, AI, data analytics, web and mobile development — enterprise software services by Softree Technology.",
  keywords: [
    "software development services",
    "Power Platform development",
    "SharePoint development",
    "AI development company",
    "web development India",
    "mobile app development",
    "Microsoft 365 development",
  ],
  alternates: {
    canonical: "https://www.softreetechnology.com/services",
  },
  openGraph: {
    title: "Services | Softree Technology",
    description:
      "Enterprise software services — Microsoft, AI, data, and modern application development.",
    url: "https://www.softreetechnology.com/services",
    siteName: "Softree Technology",
    type: "website",
  },
  twitter: {
    title: "Services | Softree Technology",
    description: "Enterprise software services by Softree Technology.",
  },
}, "Softree Technology Services");

export default function ServicesPage() {
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.softreetechnology.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://www.softreetechnology.com/services",
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-[#F3F0EE]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <NavigationServer />
      <main className="flex-grow overflow-x-clip">
        <div
          className="bg-[#F3F0EE] pt-[100px]"
          data-section="services-breadcrumb"
        >
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
            <ServicesHubBreadcrumb />
          </div>
        </div>
        <ServicesHubIntro />
        <ServicesHubSticky />
        <LightEngagementModels />
        <ServicesStackedSlides />
        <HomepageCaseStudiesSection />
        <ServicesHubTestimonial />
        <LightContactSection />
        <LightFAQExact faqs={servicesMainFAQs} />
      </main>
      <Footer />
    </div>
  );
}
