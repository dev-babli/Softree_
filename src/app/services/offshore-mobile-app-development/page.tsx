"use client";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import MobileAppHero from "./hero";
import MobileAppDevAIReadinessBanner from "./mobile-app-dev-ai-readiness-banner";
import MobileAppDevServices from "./mobile-app-dev-services";
import MobileAppDevStickyScroll from "./mobile-app-dev-sticky-scroll";
import MobileAppCaseStudies from "./case-studies";
import MobileAppDevTechnologyStack from "./mobile-app-dev-technology-stack";
import WhyChooseSoftreeMobileApps from "./why-chose";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";

const mobileAppFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What mobile app development services does Softree offer?",
    answer:
      "Softree provides mobile app development services covering custom application development, iOS and Android apps, cross-platform development, backend integration, API development, testing, deployment, and ongoing maintenance. Our offshore engineering team helps businesses, startups, digital agencies, and technology partners build new mobile applications or enhance existing products. We tailor the development approach to your product requirements, target users, technical environment, and long-term business goals.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How long does it take to develop a mobile app?",
    answer:
      "Mobile app development timelines depend on the application's features, design complexity, integrations, security requirements, and testing needs. A simple minimum viable product (MVP) may take a few weeks to a few months, while complex applications with custom backends and enterprise integrations can take longer. Softree evaluates your requirements, defines the project scope, and establishes milestones to help you plan development, testing, and launch.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Does Softree develop mobile apps for both iOS and Android?",
    answer:
      "Yes. Softree can support mobile app development for iOS and Android, depending on your project requirements and selected technology stack. We can help determine whether native development or a cross-platform framework such as Flutter or React Native is appropriate for your application. The decision considers performance, user experience, device capabilities, development budget, and long-term maintenance needs.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can Softree integrate mobile applications with existing business systems?",
    answer:
      "Yes. Mobile applications can be integrated with existing business systems through APIs, backend services, databases, and supported third-party platforms. Depending on your requirements, integrations may include customer relationship management (CRM) systems, enterprise resource planning (ERP) software, payment services, authentication providers, and cloud platforms. Softree assesses your existing architecture and data flows to plan secure, reliable integrations that support your business processes.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What are the benefits of offshore mobile app development?",
    answer:
      "Offshore mobile app development enables businesses to extend their engineering capacity without relying entirely on in-house recruitment. It can provide access to development expertise, flexible team structures, and additional resources for product development and maintenance. Softree works with businesses and technology partners to align development scope, communication practices, delivery milestones, and technical requirements, helping them manage workloads while keeping their internal teams focused on core priorities.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Does Softree provide white-label mobile app development services?",
    answer:
      "Softree can support white-label mobile app development for digital agencies, consulting firms, and technology partners that want to deliver applications under their own brand. Depending on the agreed engagement, our team can provide development, integration, testing, and technical support behind the scenes. This model helps partners expand their mobile app service offerings without building a separate in-house development team for every project.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "How does Softree ensure mobile app quality, security, and performance?",
    answer:
      "Mobile app quality depends on appropriate architecture, secure implementation, testing, and ongoing monitoring. The development process can include functional testing, device and operating system compatibility checks, API validation, performance testing, and regression testing. Security measures may include secure authentication, appropriate access controls, encrypted data transmission, and protection of sensitive information. Softree aligns these practices with the application's requirements and the client's technical and security standards.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "How much do offshore mobile app development services cost?",
    answer:
      "The cost of offshore mobile app development depends on the application's scope, selected technologies, number of platforms, design requirements, integrations, and ongoing support needs. Softree can discuss engagement options such as dedicated developers, time-based development support, or fixed-scope projects, depending on the work required. After reviewing your requirements and priorities, we can help define the scope, expected milestones, and an appropriate project estimate.",
  },
];


const mobileAppSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.softreetechnology.com/services/offshore-mobile-app-development#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.softreetechnology.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.softreetechnology.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Offshore Mobile App Development Services",
          "item": "https://www.softreetechnology.com/services/offshore-mobile-app-development"
        }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.softreetechnology.com/services/offshore-mobile-app-development#service",
      "name": "Offshore Mobile App Development Services",
      "serviceType": "Mobile Application Development & Engineering",
      "description":
        "Scale your business with offshore mobile app development services from Softree. Build custom iOS, Android, Flutter, and React Native applications.",
      "url": "https://www.softreetechnology.com/services/offshore-mobile-app-development",
      "provider": {
        "@type": "Organization",
        "@id": "https://www.softreetechnology.com/#organization",
        "name": "Softree Technology",
        "url": "https://www.softreetechnology.com"
      },
      "areaServed": "Global",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Mobile Application Engineering Capabilities",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "iOS Native App Development (Swift & SwiftUI)",
              "description": "High-performance enterprise iOS mobile applications built with Swift, SwiftUI, and secure Apple ecosystem standards."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Android Native App Development (Kotlin & Jetpack Compose)",
              "description": "Scalable, modern Android applications built with Kotlin and Jetpack Compose optimized for diverse device ecosystems."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cross-Platform Development (Flutter & React Native)",
              "description": "Cost-effective, single-codebase mobile solutions targeting both iOS and Android with 95%+ code sharing."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Dedicated Offshore Mobile Engineering Pods",
              "description": "Flexible staff augmentation and dedicated engineering teams to accelerate mobile product roadmaps."
            }
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.softreetechnology.com/services/offshore-mobile-app-development#faq",
      "mainEntity": mobileAppFAQs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mobileAppSchema) }}
      />
      <main className="relative min-h-screen bg-black">
        <NavigationClient />

        {/* HERO */}
        <MobileAppHero />

        {/* CORE LIGHT LAYOUT CANVAS */}
        <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
          {/* TRUSTED BRANDS MARQUEE */}
          <TrustedBrandsMarquee />

          {/* 1. Mobile App AI Readiness / Partnership Banner */}


          {/* 2. Who We Help & Mobile App Services */}
          <MobileAppDevServices />

          {/* 3. Sticky Scroll Services */}
          <MobileAppDevStickyScroll />

          {/* 4. Current Case Studies */}
          <MobileAppCaseStudies />

          <MobileAppDevAIReadinessBanner />

          {/* 5. Mobile App Technology Stack */}
          <MobileAppDevTechnologyStack />

          {/* 6. Why Choose Softree Mobile Apps */}
          <WhyChooseSoftreeMobileApps />
        </section>

        {/* 7. Mobile App FAQs */}
        <LightFAQExact faqs={mobileAppFAQs} />

        {/* 8. Light Contact Section */}
        <LightContactSection />

        {/* 9. Footer */}
        <Footer />
      </main>
    </>
  );
}



