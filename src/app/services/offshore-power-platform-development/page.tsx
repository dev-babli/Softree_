import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import PowerAppsHero from "./hero";
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
    question: "What Microsoft Power Platform development services do you offer?",
    answer:
      "Softree provides Microsoft Power Platform development services across Power Apps, Power Automate, Dataverse, Power BI, Power Pages, and Copilot Studio. Our services include business application development, workflow automation, data solutions, integrations, consulting, implementation, modernization, and ongoing development support.",
  },

  {
    id: 2,
    serial: "question 02",
    question: "Does Softree provide offshore Power Platform development?",
    answer:
      "Yes. Softree provides offshore Microsoft Power Platform development through experienced developers and dedicated engineering teams. We support Power Apps, Power Automate, Dataverse, Power BI, Power Pages, integrations, and ongoing Power Platform development based on project requirements.",
  },

  {
    id: 3,
    serial: "question 03",
    question: "Does Softree provide white-label Power Platform development?",
    answer:
      "Yes. Softree provides white-label Power Platform development support for agencies, consulting firms, and technology partners that need additional engineering capacity while maintaining their own client-facing relationship.",
  },

  {
    id: 4,
    serial: "question 04",
    question: "Can you integrate Microsoft Power Platform with existing business systems?",
    answer:
      "Yes. Softree can integrate Power Platform solutions with Microsoft 365, SharePoint, Microsoft Teams, Dynamics 365, Azure, SQL Server, APIs, custom connectors, and other supported business systems to connect data and business processes.",
  },

  {
    id: 5,
    serial: "question 05",
    question: "How do you handle Power Platform security and governance?",
    answer:
      "We approach Power Platform security and governance through appropriate access controls, environment strategy, security roles, data protection policies, monitoring, deployment practices, and application lifecycle management based on the solution requirements.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Do you provide Power Platform consulting and implementation services?",
    answer:
      "Yes. Softree provides Power Platform consulting and implementation support from discovery and solution planning through development, integration, deployment, and ongoing optimization. We help businesses select the right Power Platform components and build solutions aligned with their workflows and requirements.",
  }
];
export const metadata: Metadata = applyPageOg("/services/offshore-power-platform-development", {
  title: "Microsoft Power Platform Development Services | Softree",

  description:
    "Build and scale Microsoft Power Platform solutions with Power Apps, Power Automate, Power BI, Power Pages, Dataverse and Copilot Studio. Offshore and white-label delivery by Softree.",

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
      "Build and scale Microsoft Power Platform solutions with Power Apps, Power Automate, Power BI, Power Pages, Dataverse and Copilot Studio. Offshore and white-label delivery by Softree.",
    url: "https://www.softreetechnology.com/services/offshore-power-platform-development",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Microsoft Power Platform Development Services | Softree",
    description:
      "Build and scale Microsoft Power Platform solutions with Power Apps, Power Automate, Power BI, Power Pages, Dataverse and Copilot Studio. Offshore and white-label delivery by Softree.",
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
      <PowerAppsHero />
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

      <LightContactSection />
      <LightFAQExact faqs={powerPlatformFAQs} />
      <Footer />
    </main>
  );
}
