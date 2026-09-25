import HeroWithTestimonial from "./hero";
import AIReadinessBanner from "./components/AIReadinessBanner";
import { FabricServices } from "./components/FabricServices";
import { FabricStickyScroll } from "./components/FabricStickyScroll";
import FabricCaseStudies from "./casestudies";
import WhyFabricSection from "./business";
import IndustriesSection from "./industry";
import HireFabricPricing from "./pricing";
import WhyChooseWithTestimonials from "./why";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import { FabricHowWeWork } from "./components/FabricHowWeWork";
import FabricTechnologyStack from "./components/FabricTechnologyStack";
import FabricOffshoreEngineeringSection from "./components/FabricOffshoreEngineeringSection";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import FabricPartner from "./fabric-partner";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";

const fabricFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Microsoft Fabric consulting and development services do you offer?",
    answer:
      "We offer comprehensive Microsoft Fabric consulting and development services tailored to enterprise needs. Our offshore engineering teams specialize in full-scale Microsoft Fabric implementation, encompassing Data Factory for robust ETL/ELT pipelines, Synapse Data Engineering for scalable data processing, Synapse Data Science for machine learning workloads, Synapse Real-Time Analytics for streaming data, and advanced Power BI visualization. By leveraging a unified architecture, we build end-to-end analytics platforms that seamlessly connect OneLake with all your structured and unstructured enterprise data sources, ensuring high performance, centralized governance, and accelerated time-to-insight.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How long does it take to develop a Microsoft Fabric solution?",
    answer:
      "The development timeline for a Microsoft Fabric solution depends on the complexity of your data ecosystem. Simple setups and proof-of-concepts—often focused on core OneLake configuration and basic Power BI reporting—typically take 4-6 weeks. For complex enterprise analytics platforms requiring multi-source integration, custom ETL/ELT data pipelines via Data Factory, Spark-based transformations, and advanced interactive dashboards, projects generally range from 8-12 weeks. Our offshore engineering teams work closely with you during the discovery phase to provide a precise architectural roadmap, detailed scope, and timeline before initiating development.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Can you integrate Microsoft Fabric with existing systems?",
    answer:
      "Absolutely. Our Microsoft Fabric integration services are designed to unify fragmented data ecosystems. We seamlessly integrate Fabric with enterprise systems like Dynamics 365, SharePoint, SQL Server, on-premises databases, ERP systems, third-party APIs, and legacy multi-cloud environments (AWS, GCP). Utilizing native Fabric connectors and Shortcuts, we establish seamless data flow and logical data virtualization without unnecessary data duplication. This ensures optimal lakehouse organization, robust data governance, and unified access controls across your entire hybrid or cloud data architecture.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Do you provide ongoing support and maintenance for Microsoft Fabric solutions?",
    answer:
      "Yes, we offer dedicated managed services and ongoing support for Microsoft Fabric environments. Beyond initial implementation, our offshore engineering teams provide continuous operational support, proactive performance monitoring, and advanced architecture optimization. We actively manage your OneLake environment, maintain and troubleshoot complex ETL pipelines in Data Factory, optimize Synapse compute costs, and ensure your Fabric data workloads—from Real-Time Analytics to Power BI semantic models—run reliably and efficiently in production.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How do you handle Microsoft Fabric security and governance?",
    answer:
      "Data security and governance are central to our Microsoft Fabric development approach. We strictly implement Microsoft best practices, leveraging deep integration with Microsoft Purview for comprehensive data lineage, cataloging, and policy enforcement. Our security engineers configure robust workspace identity management, robust row-level security (RLS) and column-level security (CLS) within semantic models, and role-based access control (RBAC). We ensure your unified data architecture complies fully with your organization's internal governance rules and global compliance standards, protecting your enterprise data assets at every layer.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Can Softree work as a white-label Microsoft Fabric development partner?",
    answer:
      "Yes, Softree is a trusted white-label Microsoft Fabric development partner for consulting firms and system integrators worldwide. We provide flexible, high-tier offshore engineering capacity that operates entirely behind your brand. This partnership model allows you to confidently expand your data and analytics service offerings and retain the primary client relationship, while our specialized Fabric architects, data engineers, and Power BI experts handle the complex technical delivery, architecture design, and backend development.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "Can you provide dedicated Microsoft Fabric developers?",
    answer:
      "Yes, we offer flexible engagement models tailored to your specific project needs. You can augment your existing staff by engaging individual, pre-vetted Microsoft Fabric developers, or you can build a complete, dedicated offshore Fabric engineering team. Our teams typically include Fabric Solution Architects, Data Engineers, and Power BI Analytics Engineers who work seamlessly as an extension of your in-house staff, adopting your workflows, communication tools, and Agile methodologies to accelerate your data initiatives.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "Can Softree support Fabric migration?",
    answer:
      "Yes, Softree specializes in complex data platform migrations and modernization initiatives moving to Microsoft Fabric. Our experts conduct thorough assessments of your existing legacy systems—such as on-premises SQL Server, legacy Azure Synapse, AWS Redshift, or traditional data warehouses. We then design a strategic migration roadmap and execute the seamless transition of your data, ETL pipelines, and BI reporting into a unified Fabric lakehouse architecture, ensuring zero data loss, minimal downtime, and improved long-term ROI.",
  },
]

export const metadata: Metadata = applyPageOg("/services/microsoft-fabric-engineering-services", {
  title: "Microsoft Fabric Consulting Services | Offshore Fabric Team",

  description:
    "Get Microsoft Fabric consulting and engineering services for data platforms, OneLake, data engineering, Power BI, analytics, and real-time intelligence with an offshore delivery team.",

  keywords: [
    "Microsoft Fabric consulting",
    "Microsoft Fabric services",
    "Fabric analytics solutions",
    "Power BI Fabric integration",
    "data engineering services",
    "real-time analytics",
    "enterprise data platform",
    "Fabric implementation",
    "AI analytics solutions",
    "business intelligence services",
  ],

  openGraph: {
    title: "Microsoft Fabric Consulting Services | Unified Analytics Solutions",
    description:
      "Build scalable analytics and AI-driven enterprise data solutions with Microsoft Fabric.",
    url: "https://www.softreetechnology.com/services/microsoft-fabric-engineering-services",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Microsoft Fabric Consulting Services",
    description:
      "Unified analytics, Power BI integration, data engineering, and AI solutions with Microsoft Fabric.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/microsoft-fabric-engineering-services",
  },
}, "Softree Technology");
export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <NavigationClient />
      <HeroWithTestimonial />
      <TrustedBrandsMarquee />
      <AIReadinessBanner />
      <FabricServices />
      <FabricStickyScroll />
      <FabricCaseStudies />
      <FabricTechnologyStack />
      <FabricOffshoreEngineeringSection />

      <FabricHowWeWork />

      {/* <IndustriesSection /> */}
      {/* <FabricPartner /> */}
      {/* <HireFabricPricing /> */}
      <WhyChooseWithTestimonials />
      <LightFAQExact faqs={fabricFAQs} />
      <LightContactSection />


      <Footer />
    </main>
  );
}
