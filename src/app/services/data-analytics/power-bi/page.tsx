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
import TrustedBrandsMarquee from "../../business-applications/power-platform/trust";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
/* ------------------------------------------------------------------ */
/* Fixed Width Config                                                  */
/* ------------------------------------------------------------------ */

const dataAnalyticsPowerBIFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Power BI services do you offer for data analytics?",
    answer:
      "We provide end-to-end Power BI solutions: interactive dashboards, data modeling, ETL processes, real-time analytics, reporting solutions, and enterprise BI systems. We transform raw data into actionable business insights.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How do you ensure data accuracy and quality in Power BI?",
    answer:
      "We implement data validation, transformation rules, quality checks, and automated refresh schedules. We establish data governance policies and monitor data quality to ensure reliable analytics.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Can Power BI integrate with our existing data sources?",
    answer:
      "Yes, we integrate Power BI with SQL databases, Excel, SharePoint, Dynamics 365, Azure services, APIs, and third-party applications. We ensure seamless data connectivity and real-time updates across your data ecosystem.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How long does a Power BI implementation typically take?",
    answer:
      "Simple dashboards take 2-4 weeks. Complex enterprise BI solutions with multiple data sources, advanced DAX, and custom visualizations take 6-12 weeks. We provide detailed timelines based on requirements.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Do you provide Power BI training and ongoing support?",
    answer:
      "We provide comprehensive training for business users, analysts, and administrators. We cover dashboard creation, data modeling, DAX formulas, and best practices. We also offer ongoing maintenance and support packages.",
  },
]
const FIXED_WIDTH = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NavigationClient />

      {/* HERO (can stay full-width internally) */}
      <PowerBIHero />
      {/* <PowerBICaseStudies /> */}
      <TrustedBrandsMarquee />
      <StackedSlider />
      <PowerBICaseStudies />
      <PowerBIServicesTabs />
      <PowerBIBenefits />
      <PowerBIStackOverview />
      <HirePowerBIPricing />
      <PowerBIProcessSection />
      <WhyChooseUs />
      <TestimonialsSplitSlider />
      <Certifications />

      <LightContactSection />
      <LightFAQExact faqs={dataAnalyticsPowerBIFAQs} />
      <Footer />
    </main>
  );
}
