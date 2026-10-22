import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import PowerAppsHero from "./hero";
import PowerPlatformHero from "./PowerPlatformHero";
import TrustedBrandsMarquee from "./trust";
import dynamic from "next/dynamic";

const StackedSlider = dynamic(() => import("./stack-slidr"));
const PowerAppsCaseStudies = dynamic(() => import("./casestudies"));
const PowerAppsServices = dynamic(() => import("./power-apps-services"));
const HirePowerAppsPricing = dynamic(() => import("./pricing-card"));
const TechStackSection = dynamic(() => import("./tech-stack"));
const PowerAppsProcess = dynamic(() => import("./process"));
const WhyChooseSoftreePowerApps = dynamic(() => import("./why-chose"));
const LightContactSection = dynamic(() => import("@/components/homepage-light/LightContactSection"));
const LightFAQExact = dynamic(() => import("@/components/homepage-light/LightFAQExact"));

import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";

// const powerPlatformFAQs = [
//   {
//     id: 1,
//     serial: "question 01",
//     question: "What Microsoft Power Platform services do you offer?",
//     answer:
//       "We specialize in Power Apps (canvas and model-driven), Power Automate workflows, Power BI dashboards, Power Pages, and Dataverse integration. We build end-to-end solutions connecting the entire Power Platform ecosystem.",
//   },
//   {
//     id: 2,
//     serial: "question 02",
//     question: "How long does it take to develop a Power Apps solution?",
//     answer:
//       "Simple Power Apps MVPs take 4-6 weeks. Complex enterprise solutions with multiple apps and automations take 8-12 weeks. We provide a detailed scope and timeline before starting development.",
//   },
//   {
//     id: 3,
//     serial: "question 03",
//     question: "Can you integrate Power Platform with existing systems?",
//     answer:
//       "Yes, we integrate Power Platform with Dynamics 365, SharePoint, SQL Server, Office 365, external APIs, and legacy systems. We ensure seamless data flow and business process automation across your entire technology stack.",
//   },
//   {
//     id: 4,
//     serial: "question 04",
//     question: "Do you provide training for Power Platform solutions?",
//     answer:
//       "We provide comprehensive user training, admin documentation, and handoff sessions. Your team learns to manage and extend the solutions we build. We also offer ongoing support packages for maintenance and enhancements.",
//   },
//   {
//     id: 5,
//     serial: "question 05",
//     question: "How do you handle Power Platform security and governance?",
//     answer:
//       "We implement Microsoft best practices for security: data loss prevention (DLP), environment strategies, role-based access control, and compliance with your organization's governance policies. We follow Microsoft Gold Partner security standards.",
//   },
// ]
const powerPlatformFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Microsoft Power Platform development services does Softree offer?",
    answer:
      "Softree provides Microsoft Power Platform development services covering Power Apps, Power Automate, Power BI, Power Pages, Microsoft Dataverse, and Copilot Studio. Our team helps businesses build custom applications, automate workflows, develop data-driven reporting solutions, integrate enterprise systems, and modernize existing business processes. We also provide offshore and white-label engineering support for technology partners that need additional development capacity.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "Does Softree provide offshore Microsoft Power Platform development?",
    answer:
      "Yes. Softree provides offshore Microsoft Power Platform development to help businesses and technology partners extend their engineering capacity. Our team can support Power Apps development, Power Automate workflows, Dataverse integration, Power BI reporting, and related implementation requirements. Depending on the project, clients can work with dedicated developers or engage our team for defined development tasks and ongoing support.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Does Softree offer white-label Power Platform development services?",
    answer:
      "Yes. Softree can provide white-label Power Platform development support for consulting firms, digital agencies, Microsoft partners, and system integrators. Partners can use our engineering capabilities to deliver Power Apps, Power Automate, Power BI, and other Power Platform solutions under their own brand, subject to agreed engagement and delivery arrangements. This allows partners to expand their service capacity while maintaining ownership of their client relationships.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can Softree integrate Microsoft Power Platform with existing business systems?",
    answer:
      "Yes. Softree can help integrate Microsoft Power Platform solutions with existing business applications, databases, APIs, SharePoint, and other supported systems. For example, Power Automate can connect business workflows, Power Apps can provide an interface for operational data, and Dataverse can support structured business records. We assess integration requirements, available connectors, authentication, and data flows to determine an appropriate implementation approach.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How does Softree handle Power Platform security and governance?",
    answer:
      "Softree can incorporate security and governance requirements into Power Platform solution design and implementation. Depending on the environment, this may include role-based access controls, environment planning, data loss prevention (DLP) policies, permissions, audit logging, and integration security. We consider the client's existing Microsoft environment and governance requirements to help build solutions that are controlled, maintainable, and appropriate for their business processes.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Does Softree provide Power Platform consulting and implementation services?",
    answer:
      "Yes. Softree can support Microsoft Power Platform projects from requirements discovery and solution architecture through development, integration, testing, and deployment. Our team helps assess business workflows, identify suitable Power Platform components, and define an implementation approach aligned with project goals. We can also support existing solutions that need enhancements, integrations, troubleshooting, or modernization.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "Can I hire dedicated Microsoft Power Platform developers from Softree?",
    answer:
      "Softree can support clients that need additional Power Platform engineering capacity through dedicated developer and flexible engagement models, subject to project requirements and availability. Developers may work on Power Apps, Power Automate, Power BI, Dataverse, integrations, and ongoing application improvements. Before an engagement begins, we can align on required skills, responsibilities, communication, delivery expectations, and the engagement structure that best fits your team.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "How much does Microsoft Power Platform development cost?",
    answer:
      "Microsoft Power Platform development costs depend on the solution's complexity, required integrations, data architecture, licensing, security requirements, and delivery timeline. A small Power Apps application may require a different investment from a connected solution involving Power Automate, Dataverse, enterprise integrations, and reporting. Softree can assess your requirements and discuss an appropriate engagement model, such as hourly consulting, dedicated developers, or fixed-scope project delivery, to establish a suitable estimate.",
  },
];
export const metadata: Metadata = applyPageOg("/services/offshore-power-platform-development", {
  title: {
    absolute: "Microsoft Power Platform Development Services | Softree",
  },

  description:
    "Offshore Microsoft Power Platform development services. Build custom Power Apps, automated workflows, and Copilot Studio solutions with certified engineers.",

  keywords: [
    "Microsoft Power Platform Development Services",
    "Power Platform Development Services",
    "Power Platform Consulting",
    "Power Platform Development Company",
    "Power Apps Development Services",
    "Power Automate Development Services",
    "Power BI Development Services",
    "Power Pages Development Services",
    "Dataverse Development",
    "Copilot Studio Development",
    "Offshore Power Platform Development",
    "White-Label Power Platform Development",
  ],

  openGraph: {
    title: "Microsoft Power Platform Development Services | Softree",
    description:
      "Offshore Microsoft Power Platform development services. Build custom Power Apps, automated workflows, and Copilot Studio solutions with certified engineers.",
    url: "https://www.softreetechnology.com/services/offshore-power-platform-development",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Microsoft Power Platform Development Services | Softree",
    description:
      "Offshore Microsoft Power Platform development services. Build custom Power Apps, automated workflows, and Copilot Studio solutions with certified engineers.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-power-platform-development",
  },
}, "Softree Technology");

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.softreetechnology.com/"
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
            "name": "Offshore Power Platform Development",
            "item": "https://www.softreetechnology.com/services/offshore-power-platform-development"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Microsoft Power Platform Development Services",
        "description": "Build and scale Microsoft Power Platform solutions with Power Apps, Power Automate, Power BI, Power Pages, Dataverse and Copilot Studio. Offshore and white-label delivery by Softree.",
        "provider": {
          "@type": "Organization",
          "name": "Softree Technology",
          "url": "https://www.softreetechnology.com"
        },
        "serviceType": "Software Development",
        "areaServed": "Worldwide"
      }
    ]
  };

  return (
    <main className="relative min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <NavigationClient />

      {/* HERO (full width but aligned content internally) */}
      <PowerPlatformHero />
      {/* <PowerAppsHero /> */}
      {/* <PowerAppsService /> */}
      <TrustedBrandsMarquee />
      <StackedSlider />
      {/* MAIN CONTENT SECTIONS */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 pt-20">
        <div>
          <PowerAppsCaseStudies />
          <PowerAppsServices />
          <HirePowerAppsPricing />

          <TechStackSection />
          <PowerAppsProcess />
          <WhyChooseSoftreePowerApps />

          {/* <TestimonialsSplitSlider /> */}
          {/* <Certifications /> */}
        </div>
      </section>
      <LightFAQExact faqs={powerPlatformFAQs} />
      <LightContactSection />

      <Footer />
    </main>
  );
}
