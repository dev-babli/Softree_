import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import CaseStudyGrid from "./case-study-grid";
import Certifications from "@/app/services/business-applications/power-platform/certification";
import HeroWithTestimonial from "./hero";
import PowerAppsCaseStudies from "./latest-cases";
import WhyChooseUs from "./why-chose";
import PowerAppsTechnologies from "./tech-stack";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";

const powerPlatformCaseStudyFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What Power Platform solutions are featured in your case studies?",
    answer:
      "Our Power Platform case studies showcase Power Apps, Power Automate workflows, Power BI dashboards, and Dataverse solutions. We highlight the business challenges, technical solutions, and measurable outcomes for each project.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "What types of business processes have you automated with Power Platform?",
    answer:
      "We have automated various processes including approval workflows, data entry, reporting, document management, and business operations. Our case studies demonstrate significant efficiency gains and cost savings.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How do you measure success in Power Platform projects?",
    answer:
      "We measure success through time savings, error reduction, user adoption, and ROI. Our case studies include quantitative metrics like hours saved, processes automated, and business impact.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can you build similar Power Platform solutions for my organization?",
    answer:
      "Yes, we can deliver similar Power Platform solutions tailored to your business processes. Contact us to discuss your requirements and we can provide a detailed proposal based on our proven expertise.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What industries do you serve with Power Platform solutions?",
    answer:
      "We serve various industries including manufacturing, healthcare, finance, and retail. Our case studies demonstrate our experience delivering Power Platform solutions across different business sectors.",
  },
]
export default function PowerAppsCaseStudiesPage() {
  return (
    <>
      <NavigationClient />
      <HeroWithTestimonial />
      <PowerAppsCaseStudies />

      <CaseStudyGrid />
      <WhyChooseUs />
      <PowerAppsTechnologies />
      <Certifications />
      <LightContactSection />
      <LightFAQExact faqs={powerPlatformCaseStudyFAQs} />
      <Footer />
    </>
  );
}
