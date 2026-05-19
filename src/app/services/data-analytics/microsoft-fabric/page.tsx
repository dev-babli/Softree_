import HeroWithTestimonial from "./hero";
import FabricTabs from "./fabric-tabs";
import ProwessSection from "./process";
import WhyFabricSection from "./business";
import HireFabricPricing from "./pricing";
import WhyChooseWithTestimonials from "./why";
import TrustedBrandsMarquee from "../../business-applications/power-platform/trust";
import UseCasesSection from "./use-cases";
import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import FabricPartner from "./fabric-partner";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";

const dataAnalyticsFabricFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Microsoft Fabric services do you offer for data analytics?",
    answer:
      "We provide end-to-end Microsoft Fabric solutions: data engineering, data warehousing, real-time analytics, Power BI integration, data science, and AI implementation. We help organizations build unified analytics platforms.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How does Fabric improve data analytics compared to traditional tools?",
    answer:
      "Microsoft Fabric unifies data engineering, data science, and analytics in one SaaS platform. It eliminates data silos, reduces infrastructure complexity, and provides seamless integration between Power BI, Synapse, and Data Factory.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Can you help migrate from legacy analytics platforms to Fabric?",
    answer:
      "Yes, we specialize in migrating from legacy BI tools, on-premises data warehouses, and other cloud platforms to Microsoft Fabric. We ensure data integrity, minimal downtime, and optimized performance during migration.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "How long does a Fabric implementation typically take?",
    answer:
      "Simple data lake setups take 6-8 weeks. Enterprise-wide analytics platforms with multiple data sources and advanced analytics take 12-16 weeks. We provide detailed timelines based on your requirements.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Do you provide training for Microsoft Fabric?",
    answer:
      "We provide comprehensive training for data engineers, analysts, data scientists, and business users. We cover data modeling, Power BI integration, data science tools, and governance to ensure your team can effectively use Fabric.",
  },
]
export default function Home() {
  return (
    <>
      <NavigationClient />
      <HeroWithTestimonial />
      <TrustedBrandsMarquee />
      <FabricTabs />
      <ProwessSection />

      <UseCasesSection />
      <WhyFabricSection />
      <FabricPartner />
      <HireFabricPricing />
      <WhyChooseWithTestimonials />
      <LightContactSection />
      <LightFAQExact faqs={dataAnalyticsFabricFAQs} />

      <Footer />
    </>
  );
}
