import dynamic from "next/dynamic";
import NavigationServer from "@/components/sections/navigation-server";
import Footer from "@/components/sections/footer";
import ServicePageBreadcrumb from "@/components/services/ServicePageBreadcrumb";
import WebDevIntro from "./web-dev-intro";
import WebDevSticky from "./web-dev-sticky";
import ServicesHubTestimonial from "../services-hub-testimonial";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";

const WebDevStackedSlides = dynamic(() => import("./web-dev-stacked-slides"), {
  loading: () => (
    <div className="min-h-[100vh] w-full bg-[#F3F0EE]" aria-hidden="true" />
  ),
});

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
];

export const metadata: Metadata = applyPageOg(
  "/services/offshore-web-app-development",
  {
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
  },
  "Softree Technology",
);

export default function WebDevelopmentServicePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: webAppFAQs.map((faq) => ({
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Web Development",
        item: "https://www.softreetechnology.com/services/offshore-web-app-development",
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
        <div className="bg-[#F3F0EE] pt-[100px]" data-section="web-dev-breadcrumb">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-12">
            <ServicePageBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Web Development" },
              ]}
            />
          </div>
        </div>

        <WebDevIntro />
        <WebDevSticky />
        <LightEngagementModels />
        <WebDevStackedSlides />
        <HomepageCaseStudiesSection />
        <ServicesHubTestimonial />
        <LightContactSection />
        <LightFAQExact faqs={webAppFAQs} />
      </main>
      <Footer />
    </div>
  );
}
