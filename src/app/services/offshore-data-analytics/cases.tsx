"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const caseStudies = [
  {
    title: "Smart Hospital Analytics Platform",
    category: "Power BI",
    summary: "An enterprise-grade Power BI dashboard for real-time patient admissions tracking, resource allocation, and clinical analytics.",
    challenge: "Healthcare executives lacked a centralized, real-time platform to monitor hospital capacity, patient outcomes, and staffing needs.",
    solution: "Implemented a HIPAA-compliant Power BI data platform integrated with hospital EHR databases and predictive analytics models.",
    impact: "Enhanced hospital operational efficiency by 40% and improved patient admissions forecasting accuracy.",
    tech: ["Power BI", "Data Analytics", "Azure Data Factory", "EHR Integration"],
    image: "/images/case-study/power-apps/hr.png",
    href: "https://www.softreetechnology.com/case-studies/smart-hospital-analytics-platform",
  },
  {
    title: "Healthcare Revenue Intelligence",
    category: "Power BI",
    summary: "An analytics platform that cleanses, models, and visualizes complex medical billing data, identifying leakage points and optimizing revenue cycles.",
    challenge: "Medical billing data from multiple clinics was disconnected, leading to untracked claim rejections and hidden revenue leakage.",
    solution: "Designed an automated data validation pipeline and interactive Power BI dashboards to track billing cycles in real-time.",
    impact: "Identified 15% revenue leakage and accelerated billing cycles by 40% using advanced data analysis.",
    tech: ["Power BI", "Azure Data Factory", "Data Modeling", "Billing Integration"],
    image: "/images/case-study/home/health.png",
    href: "https://www.softreetechnology.com/case-studies/healthcare-revenue-cycle-intelligence-dashboard",
  },
  {
    title: "AI-Driven ITSM Analytics Platform",
    category: "Power BI",
    summary: "Modernizes enterprise operations using Microsoft Fabric and Power BI to automate ticket resolution and predictive analytics.",
    challenge: "IT helpdesk operations were overwhelmed by ticket backlogs and lacked end-to-end analytics on system incidents and SLAs.",
    solution: "Built an enterprise analytics platform on Microsoft Fabric with DirectLake connections and Power BI executive dashboards.",
    impact: "Reduced ticket resolution backlogs by 35% and improved SLA compliance by 45% using predictive analysis.",
    tech: ["Microsoft Fabric", "Power BI", "Synapse Analytics", "DirectLake"],
    image: "/images/case-study/power-apps/ai.png",
    href: "https://www.softreetechnology.com/case-studies/ai-driven-itsm-analytics-platform-microsoft-fabric",
  },
  {
    title: "Customer 360 Platform",
    category: "Power BI",
    summary: "A unified customer intelligence platform that integrates sales pipelines, customer support metrics, and marketing touchpoints.",
    challenge: "Enterprise sales and support divisions operated on siloed databases, preventing a single unified view of customer journeys.",
    solution: "Developed a Power BI dashboard connecting CRM, ERP, and customer desk systems with row-level security protocols.",
    impact: "Boosted customer retention metrics by 25% and reduced support ticket resolution times by 30%.",
    tech: ["Power BI", "SQL Data Warehouse", "Azure Synapse", "CRM Integration"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/435596ec547c94a0855c288debc25f8f045768e4-1536x1024.png",
    href: "https://www.softreetechnology.com/case-studies/customer-360-platform",
  },
  {
    title: "HR Analytics & Employee Experience Platform",
    category: "Power BI",
    summary: "A unified HR analytics portal consolidating workforce metrics, hiring pipeline data, and employee experience tracking across legacy databases.",
    challenge: "A Fortune 500 financial services enterprise had employee data scattered across 12 legacy systems, making real-time reporting and onboarding metrics impossible.",
    solution: "Designed a web-based unified portal with analytics dashboards, predictive employee retention metrics, and self-service portals.",
    impact: "Saved 80% reporting time, achieved 65% HR query deflection via AI, and secured 90% self-service adoption rate.",
    tech: ["Power BI", "Azure Data Lake", "Data Modeling", "AI Insights"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/f5db5b044703073394b6042ba5d1409d926800bf-1536x1024.png",
    href: "https://www.softreetechnology.com/case-studies/hr-analytics-and-employee-experience-platform",
  },
];

export default function PowerBICaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative min-h-screen flex items-center">
      <div className="w-[86%] max-w-7xl mx-auto space-y-8">
        {/* ================= HEADER ================= */}
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold tracking-[0.18em] uppercase">
            Case Studies
          </span>

          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
            Power BI in Action:
            <span className="text-amber-500">
              {" "}
              Enterprise Analytics Success
            </span>
          </h2>

          <p className="mt-2 max-w-4xl mx-auto text-base text-gray-600">
            Discover how we transform raw enterprise data into strategic,
            decision-driving insights with Power BI.
          </p>
        </div>

        {/* ================= SLIDER ================= */}
        <div
          className="
            w-full
            h-[70vh] max-h-[680px]
         bg-gradient-to-r from-[#eef2f7] via-[#dbe3ff] to-[#eef2f7]
            rounded-[32px]
            border border-amber-200
            shadow-xl
            overflow-hidden
          "
        >
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={900}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="h-full w-full overflow-hidden"
          >
            {caseStudies.map((item, index) => (
              <SwiperSlide key={index} className="h-full w-full">
                <div className="relative w-full h-full overflow-hidden rounded-[32px]">
                  <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-white/15" />

                  {/* CARD BODY */}
                  <div
                    className="
              w-full
              h-full
              bg-gradient-to-r from-black via-[#0f2f7a] to-black
              p-10
              flex flex-col justify-center
            "
                  >
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-semibold text-white">
                        {item.title} — Case Study
                      </h3>

                      <p className="mt-2 text-sm text-slate-300 flex items-center justify-center gap-2">
                        📍 Client Country
                        <span className="font-medium text-white">
                          United States 🇺🇸
                        </span>
                      </p>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                      {/* Image */}
                      <div className="flex justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="
                    rounded-2xl
                    shadow-lg
                    max-h-[320px]
                    object-contain
                    ring-1 ring-white/10
                  "
                        />
                      </div>

                      {/* Text */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-white">
                            💡 Problem
                          </h4>
                          <p className="text-sm text-slate-300 leading-relaxed">
                            {item.challenge}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-white">
                            💡 Solution
                          </h4>
                          <p className="text-sm text-slate-300 leading-relaxed">
                            {item.solution}
                          </p>
                        </div>

                        {/* Impact Box */}
                        <div
                          className="
                    relative
                    rounded-2xl
                    px-7 py-5
                    flex flex-col gap-4
                    sm:flex-row sm:items-center sm:justify-between
                    bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600
                    text-white
                    shadow-[0_18px_40px_rgba(79,70,229,0.45)]
                    overflow-hidden
                  "
                        >
                          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />

                          <div className="relative z-10">
                            <p className="text-[10px] uppercase tracking-widest text-white/70">
                              Impact
                            </p>
                            <p className="text-sm sm:text-base font-semibold leading-snug">
                              {item.impact}
                            </p>
                          </div>

                          <div className="relative z-10 w-full h-px sm:w-px sm:h-10 bg-white/30 rounded-full" />

                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                      relative z-10
                      inline-flex items-center gap-2
                      px-5 py-2.5
                      text-xs font-semibold uppercase tracking-wider
                      whitespace-nowrap
                      rounded-full
                      bg-white text-indigo-700
                      shadow-md
                      hover:scale-105
                      transition
                    "
                          >
                            View Case Study →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
