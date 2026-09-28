import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import PowerBIServicesTabs from "./power-bi-tabs";
import Certifications from "./certification";
import PowerBIHero from "./hero";
import CtaAbout from "./cta";
import WhyChooseUs from "./why";
import PowerBIStackOverview from "./tools";
import PowerBIBenefits from "./benefits";
import StackedSlider from "./stach-slider";
import PowerBICaseStudies from "./case-studies";
import HirePowerBIPricing from "./pricing";
import PowerBIProcessSection from "./process";
import TestimonialsSplitSlider from "./testimonials";
import { PowerBIFaq } from "./faq";
import TrustedBrandsMarquee from "../offshore-power-platform-development/trust";
import FabricWhoDoWeServeSection from "./WhoDoWeServeSection";
import AIReadinessBanner from "./AIReadinessBanner";
import { FabricServices } from "./Services";
import { FabricStickyScroll } from "./StickyScroll";
import FabricTechnologyStack from "./TechnologyStack";
import OffshoreEngineeringSection from "./FabricOffshoreEngineeringSection";
import { FabricHowWeWork } from "./HowWeWork";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import type { Metadata } from "next";
import { applyPageOg } from "@/lib/site-metadata";

const powerBIFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Power BI development services does Softree offer?",
    answer: "Softree provides end-to-end Power BI development services including dashboard and report development, data integration, Power Query transformation, semantic data modeling, DAX development, enterprise reporting, advanced analytics, Power BI Service deployment, security, performance optimization, and ongoing support. We can work from an existing reporting environment or build a Power BI solution from the ground up based on your business requirements.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "Can you integrate Power BI with our existing data sources and business systems?",
    answer: "Yes. We integrate Power BI with a wide range of business and enterprise data sources, including Excel, SQL Server, SharePoint, REST APIs, CRM and ERP systems, cloud platforms, and other third-party applications. Our team can connect and consolidate these sources, transform the data with Power Query, and create a reliable reporting foundation for Power BI dashboards and analytics.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Can Softree build custom Power BI dashboards and reports?",
    answer: "Yes. We develop custom Power BI dashboards and reports around your KPIs, business workflows, users, and reporting requirements. Solutions can include interactive visualizations, filters and slicers, drill-down experiences, KPI reporting, executive dashboards, operational reporting, and self-service analytics, with the underlying semantic model and DAX logic designed to support accurate and scalable reporting.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How do you handle Power BI data modeling, DAX, and performance optimization?",
    answer: "We design structured semantic models with appropriate relationships and modeling patterns, then develop DAX measures and calculations required for business reporting. We also review inefficient models, complex calculations, datasets, and reports to improve Power BI performance using tools such as Performance Analyzer and dataset optimization techniques. The objective is to deliver accurate analytics that remain responsive as data and reporting requirements grow.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How does Softree handle Power BI security and governance?",
    answer: "We implement Power BI security and governance according to the solution's data access and organizational requirements. This can include Row-Level Security (RLS), role-based access, workspace permissions, data policies, compliance controls, tenant governance, and controlled report access. We also configure refresh, gateways, and related Power BI Service settings to support secure and reliable production reporting.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Can Softree integrate Power BI with Microsoft Fabric, Azure, and other Microsoft data technologies?",
    answer: "Yes. Power BI solutions can be integrated with Microsoft Fabric and Microsoft data technologies such as OneLake, Azure Synapse, Azure Data Lake, Azure SQL, and Azure Data Factory. This allows organizations to connect data engineering, data transformation, semantic modeling, and Power BI analytics within a broader Microsoft data ecosystem.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "Does Softree provide offshore and dedicated Power BI developers?",
    answer: "Yes. Softree provides offshore Power BI engineering through flexible engagement models, including dedicated Power BI developers, fixed-scope projects, and hourly consulting. Dedicated developers can work as an extension of your existing team and support dashboard development, data modeling, DAX, integration, deployment, optimization, and ongoing Power BI enhancements. Softree also supports white-label delivery for partners that need engineering support behind their client-facing relationship.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "How long does it take to build a Power BI dashboard or solution?",
    answer: "The timeline depends on the number and complexity of data sources, reporting requirements, data quality, modeling needs, security requirements, and level of analytics involved. Simple dashboard projects may take approximately 2–4 weeks, while more complex enterprise Power BI solutions involving multiple data sources and advanced analytics may take 6–12 weeks. Softree defines the detailed scope, deliverables, and timeline based on the specific project requirements before development begins.",
  },
];
/* ------------------------------------------------------------------ */
/* Fixed Width Config                                                  */
/* ------------------------------------------------------------------ */
const FIXED_WIDTH = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";

export const metadata: Metadata = applyPageOg("/services/power-bi-development-services", {
  title: "Power BI Development Services | Offshore Power BI Partner",

  description:
    "Build and scale Power BI solutions with Softree's offshore team for dashboards, reports, data modeling, DAX, integration, and analytics.",

  keywords: [
    "Power BI development services",
    "Power BI consulting",
    "Power BI dashboard development",
    "business intelligence services",
    "Power BI analytics",
    "Power BI reporting",
    "Microsoft Power BI solutions",
    "enterprise BI solutions",
    "data visualization services",
    "Power BI experts",
  ],

  openGraph: {
    title: "Power BI Development Services | Dashboard & Analytics Solutions",
    description:
      "Build powerful dashboards and analytics solutions with Microsoft Power BI. Get real-time insights, reporting automation, and enterprise BI services.",
    url: "https://www.softreetechnology.com/services/offshore-data-analytics",
    siteName: "Softree Technology",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Power BI Development Services | Dashboard & Analytics Solutions",
    description:
      "Interactive dashboards, advanced analytics, and enterprise Power BI solutions tailored for your business.",
  },

  alternates: {
    canonical:
      "https://www.softreetechnology.com/services/offshore-data-analytics",
  },
}, "Softree Technology");
export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NavigationClient />

      {/* HERO (can stay full-width internally) */}
      <PowerBIHero />
      {/* <PowerBICaseStudies /> */}
      <TrustedBrandsMarquee />
      <AIReadinessBanner />
      <FabricServices />
      <FabricWhoDoWeServeSection />
      <FabricStickyScroll />
      {/* <StackedSlider /> */}
      <PowerBICaseStudies />
      <FabricTechnologyStack />
      <OffshoreEngineeringSection />
      <FabricHowWeWork />
      {/* <PowerBIServicesTabs /> */}
      {/* <PowerBIBenefits /> */}
      {/* <PowerBIStackOverview /> */}
      {/* <HirePowerBIPricing /> */}
      {/* <PowerBIProcessSection /> */}
      <WhyChooseUs />
      {/* <Certifications /> */}
      <LightFAQExact faqs={powerBIFAQs} />
      <LightContactSection />
      <Footer />
    </main>
  );
}
