import NavigationClient from "@/components/sections/navigation-client";
import ProjectProcessSection from "./start-project";
import { Factory, AlertTriangle, Workflow, TrendingUp } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/sections/footer";
import CaseStudyGrid from "./case-study";
import TechStack from "./tech-stack";
import WhyChooseWithTestimonials from "./why";
import SharePointCaseStudies from "./latest-cases";
import Certifications from "@/app/services/business-applications/power-platform/certification";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";

const sharePointCaseStudyFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What SharePoint solutions are featured in your case studies?",
    answer:
      "Our SharePoint case studies showcase intranet portals, document management systems, migration projects, and custom SharePoint solutions. We highlight the challenges, solutions, and measurable results for each project.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "What types of SharePoint migrations have you completed?",
    answer:
      "We have migrated from on-premises SharePoint to SharePoint Online, legacy file shares to SharePoint, and older SharePoint versions to modern platforms. Our case studies detail the migration strategies and outcomes.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How do you measure success in SharePoint projects?",
    answer:
      "We measure success through user adoption rates, productivity improvements, cost savings, and system performance. Our case studies include quantitative metrics and client feedback on project outcomes.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can you help with similar SharePoint projects for my organization?",
    answer:
      "Yes, we can deliver similar SharePoint solutions tailored to your organization's needs. Contact us to discuss your requirements and we can provide a detailed proposal based on our proven expertise.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What industries do you serve with SharePoint solutions?",
    answer:
      "We serve various industries including healthcare, finance, manufacturing, and government. Our case studies demonstrate our experience delivering SharePoint solutions across different sectors.",
  },
]
export default function webCaseStudiesPage() {
  return (
    <div>
      <NavigationClient />
      <section className="relative bg-gradient-to-br from-[#0b3ea8] to-[#1e73d8] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* LEFT CONTENT */}
          <div className="mt-4">
            <h1 className="text-4xl lg:text-5xl font-semibold leading-tight">
              Enterprise SharePoint Case Studies
            </h1>

            <p className="mt-4 text-white/85 max-w-lg">
              Discover how we design and deliver modern SharePoint intranet
              portals, document management systems, and workflow automation
              solutions that drive collaboration and operational efficiency.
            </p>

            {/* CTA */}
            <div className="flex gap-4 mt-8">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center hover:bg-blue-50 transition"
              >
                Talk to a SharePoint Expert
              </Link>

              <Link
                href="/services/offshore-sharepoint-development"
                className="border border-white/40 px-6 py-3 rounded-lg inline-flex items-center justify-center hover:bg-white/10 transition"
              >
                View SharePoint Services
              </Link>
            </div>
          </div>

          {/* RIGHT GLASS CARD */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-3 rounded-2xl bg-white/20 blur-2xl"></div>

            {/* Glass Card */}
            <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl shadow-2xl p-5">
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-white/70">
                  SharePoint Online Admin Center
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold mb-1">
                SharePoint Deployment Overview
              </h3>

              <p className="text-xs text-white/70 mb-4">
                Real-time insights across Microsoft 365 & SharePoint
                environments
              </p>

              {/* KPIs */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white/10 rounded-lg p-2 text-center">
                  <p className="text-[10px] text-white/60">Intranet Portals</p>
                  <p className="text-lg font-semibold">45+</p>
                </div>

                <div className="bg-white/10 rounded-lg p-2 text-center">
                  <p className="text-[10px] text-white/60">Enterprise Users</p>
                  <p className="text-lg font-semibold">300K+</p>
                </div>

                <div className="bg-white/10 rounded-lg p-2 text-center">
                  <p className="text-[10px] text-white/60">
                    Workflow Automation
                  </p>
                  <p className="text-lg font-semibold">+65%</p>
                </div>
              </div>

              {/* Chart */}
              <div>
                <p className="text-[10px] text-white/60 mb-2">
                  Adoption & Productivity Growth
                </p>

                <div className="grid grid-cols-5 gap-2 items-end h-20">
                  <div className="bg-white/40 rounded h-8" />
                  <div className="bg-white/50 rounded h-14" />
                  <div className="bg-white/70 rounded h-20" />
                  <div className="bg-white/45 rounded h-12" />
                  <div className="bg-white/35 rounded h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-[90px]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64 C240,96 480,96 720,80 960,64 1200,32 1440,32 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>
      <SharePointCaseStudies />
      <CaseStudyGrid />
      <WhyChooseWithTestimonials />
      <TechStack />
      <Certifications />
      <LightContactSection />
      <LightFAQExact faqs={sharePointCaseStudyFAQs} />
      <Footer />
    </div>
  );
}
