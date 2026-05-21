import NavigationClient from "@/components/sections/navigation-client";
import ProjectProcessSection from "./start-project";
import Certifications from "@/app/services/business-applications/power-platform/certification";
import Link from "next/link";
import Footer from "@/components/sections/footer";
import CaseStudyGrid from "./case-study-grid";
import WhyChooseUs from "./why-chose";
import TechnologiesTabs from "./collab-tab";
import WebCaseStudies from "./latest-cases";
import LightContactSection from "@/components/homepage-light/LightContactSection";
import LightFAQExact from "@/components/homepage-light/LightFAQExact";

const webCaseStudyFAQs = [
  {
    id: 1,
    serial: "question 01",
    question: "What types of web application case studies do you feature?",
    answer:
      "Our web case studies showcase enterprise web applications, SaaS platforms, e-commerce solutions, and custom web portals. We highlight the challenges, solutions, and results for each project.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "What technologies are used in your web application projects?",
    answer:
      "We use modern web technologies including React.js, Next.js, Node.js, TypeScript, and cloud platforms like AWS and Azure. Each case study details the specific technology stack used.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How do you measure success in your web application projects?",
    answer:
      "We measure success through metrics like performance improvements, user adoption rates, cost savings, and business impact. Our case studies include quantitative results and client testimonials.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can you build similar web applications for my business?",
    answer:
      "Yes, we can build similar solutions tailored to your specific business requirements. Contact us to discuss your project and we can provide a detailed proposal based on our experience.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What industries do you serve with web application development?",
    answer:
      "We serve various industries including healthcare, finance, e-commerce, education, and manufacturing. Our case studies demonstrate our expertise across different sectors.",
  },
]
export default function webCaseStudiesPage() {
  return (
    <div>
      <NavigationClient />
      <section className="relative bg-gradient-to-br from-[#0b3ea8] to-[#1e73d8] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-10 items-center relative z-10">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-semibold">
              Web Development Case Studies
            </h1>

            <p className="mt-4 text-white/80">
              Real-world web platforms engineered for performance, scalability,
              and measurable business growth.
            </p>

            <div className="flex gap-4 mt-8">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center hover:bg-blue-50 transition"
              >
                Talk to a Web App Expert
              </Link>

              <Link
                href="/services/offshore-web-app-development"
                className="border border-white/40 px-6 py-3 rounded-lg inline-flex items-center justify-center hover:bg-white/10 transition"
              >
                View Web App Services
              </Link>
            </div>
          </div>

          {/* RIGHT GLASS CARD */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-2 rounded-2xl bg-white/20 blur-xl"></div>

            {/* Glass box */}
            <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl shadow-2xl p-6 text-white">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-white/70">
                  Web Analytics Dashboard
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-1">
                Website Performance Overview
              </h3>
              <p className="text-sm text-white/70 mb-6">
                Live metrics from modern web applications
              </p>

              {/* KPIs */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-white/60">Web Apps Built</p>
                  <p className="text-xl font-semibold">55+</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-white/60">Monthly Users</p>
                  <p className="text-xl font-semibold">250K+</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-white/60">Speed Improvement</p>
                  <p className="text-xl font-semibold">+60%</p>
                </div>
              </div>

              {/* Chart mock */}
              <div>
                <p className="text-xs text-white/60 mb-3">
                  Traffic & Engagement Trend
                </p>
                <div className="grid grid-cols-5 gap-2 items-end h-28">
                  <div className="bg-white/40 rounded h-12" />
                  <div className="bg-white/50 rounded h-20" />
                  <div className="bg-white/70 rounded h-28" />
                  <div className="bg-white/45 rounded h-16" />
                  <div className="bg-white/35 rounded h-10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🌊 WAVE BOTTOM */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-[120px]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64 C240,96 480,96 720,80 960,64 1200,32 1440,32 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>
      <WebCaseStudies />
      <CaseStudyGrid />
      <WhyChooseUs />
      <TechnologiesTabs />
      <Certifications />
      <LightContactSection />
      <LightFAQExact faqs={webCaseStudyFAQs} />
      <Footer />
    </div>
  );
}
