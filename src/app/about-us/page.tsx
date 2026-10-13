"use client";
import NavigationClient from "@/components/sections/navigation-client";
import AboutClientLogos from "@/components/qc/homepage-light/AboutClientLogos";
import AboutTeamSection from "@/components/qc/homepage-light/AboutTeamSection";
import LightEngagementModels from "@/components/qc/homepage-light/LightEngagementModels";
import LightContactSection from "@/components/qc/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";
import Gallery from "@/components/Gallery/Gallery";
import AnimatedPhotoGallery from "@/components/Gallery/AnimatedPhotoGallery";
import Footer from "@/components/sections/footer";
import LatestTechnologies from "../about-us/LatestTechnologies";
import { LightTestimonialFeature } from "@/components/qc/homepage-light/LightTestimonialFeature";
import AboutUsGlobe from "../about-us/AboutUsGlobe";
import CoreValuesSection from "./CoreValuesSection";
import ExactAboutUs from "./ExactAboutUs";
import NewWhoDoWeServeSection from "@/components/sections/NewWhoDoWeServeSection";
const aboutUsFaqs = [
  {
    id: 1,
    serial: "question 01",
    question: "Why Choose Softree Technology as Your Software Development Partner?",
    answer:
      "Softree Technology helps businesses build and modernize digital products through custom software development, AI engineering, Microsoft technologies, cloud services, and data engineering. We focus on practical engineering, collaborative delivery, scalable development teams, and solutions aligned with each client's technical requirements and business objectives.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "What Software Development and IT Services Does Softree Offer?",
    answer:
      "Softree provides custom software development, AI development, Microsoft Power Platform services, SharePoint development, cloud engineering, data analytics, business intelligence, application modernization, and software testing. Our services help businesses improve workflows, integrate systems, modernize applications, and develop technology that supports their operational goals.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Which Industries Does Softree Technology Serve?",
    answer:
      "Softree works on technology initiatives across industries such as healthcare, logistics, education, retail, manufacturing, and enterprise IT. We adapt our development approach to industry-specific workflows, data requirements, integration challenges, and operational priorities to help organizations improve efficiency and digital capabilities.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "What Microsoft Technologies Does Softree Specialize In?",
    answer:
      "Softree works with Microsoft technologies including SharePoint, SharePoint Framework (SPFx), Power Apps, Power Automate, Power BI, Microsoft Fabric, Azure, Dataverse, and Microsoft 365 integrations. We help organizations develop business applications, automate processes, improve collaboration, and turn operational data into actionable insights.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Does Softree Provide AI Development and Generative AI Services?",
    answer:
      "Softree supports AI development initiatives, including generative AI applications, AI agents, enterprise copilots, retrieval-augmented generation (RAG), AI workflow automation, and AI-powered business applications. Our approach focuses on identifying suitable use cases, integrating relevant data sources, and building AI capabilities around specific business requirements.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Can Softree Work as an Offshore Software Development Partner?",
    answer:
      "Yes. Softree provides offshore software development and engineering collaboration for businesses that need additional technical expertise or development capacity. Engagements can support custom application development, Microsoft technologies, AI engineering, cloud development, data platforms, and software testing, with collaboration structured around project requirements and delivery objectives.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "Does Softree Offer Custom Software Development and Application Modernization?",
    answer:
      "Softree helps businesses develop custom web applications, APIs, internal business tools, and integrated digital products. We also support application modernization initiatives involving legacy system improvements, updated architectures, cloud adoption, system integrations, and performance optimization based on existing infrastructure and future requirements.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "Can Agencies and Consulting Firms Partner with Softree for Software Development?",
    answer:
      "Softree can collaborate with digital agencies, technology consultants, and system integrators that require additional engineering expertise. Depending on project needs, collaboration may include white-label development, dedicated engineering support, staff augmentation, and project-based delivery across software development, Microsoft technologies, AI, and cloud engineering.",
  },
  {
    id: 9,
    serial: "question 09",
    question: "How Does Softree Approach Software Development Quality and Security?",
    answer:
      "Softree emphasizes structured development practices, code reviews, testing, documentation, access management, and secure handling of project information. Security controls and quality processes should be defined according to the engagement's requirements. Any formal certifications or compliance claims should be verified against Softree's current documented status.",
  },
  {
    id: 10,
    serial: "question 10",
    question: "How Can Businesses Collaborate with Softree Technology?",
    answer:
      "Businesses can contact Softree to discuss software development, AI implementation, Microsoft technology projects, cloud adoption, data engineering, or application modernization. The initial discussion helps clarify business objectives, technical requirements, project scope, and suitable collaboration options before defining the next steps.",
  },
];
export default function AboutUsPage1() {
  return (
    <div className="min-h-screen pt-0 bg-white font-sans typo-body">
      {/* Navigation */}
      <NavigationClient />
      {/* 1. Hero — Video hero with cycling words */}
      <AboutUsGlobe />
      {/* 3. Client Logos — Trusted partners marquee */}
      <AboutClientLogos />
      <ExactAboutUs />
      {/* 2. Who Do We Serve */}
      <NewWhoDoWeServeSection className="bg-white" />
      {/* 2. About — Core Values, Mission, Vision, and Approach */}
      <CoreValuesSection />
      {/* 3.9. Latest Technologies — Powerhouse technologies behind Softree */}
      <LatestTechnologies />
      {/* Client Testimonials */}
      <LightTestimonialFeature />
      {/* 4. Engagement Models — How to work with us */}
      <LightEngagementModels />
      {/* 5. Team — Leadership & people showcase */}
      <AboutTeamSection />
      {/* 7. Workspace gallery — animated photo rails */}
      <AnimatedPhotoGallery />
      {/* 8. Offices — Bengaluru, Cuttack, San Francisco */}
      <Gallery />
      <LightFAQExact faqs={aboutUsFaqs} />
      <LightContactSection />
      {/* 11. Footer — Homepage footer */}
      <Footer />
    </div>
  );
}
