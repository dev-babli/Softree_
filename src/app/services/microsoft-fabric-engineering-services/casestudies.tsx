"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { FileText, AlertTriangle, Lightbulb } from "lucide-react";

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

export default function FabricCaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section className="relative py-16">
      <div className="w-[86%] max-w-7xl mx-auto space-y-8">
        {/* ================= HEADER ================= */}
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold tracking-[0.18em] uppercase">
            Case Studies
          </span>

          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mt-2">
            Power BI & Fabric in Action:
            <span className="text-orange-600"> Business Success Stories</span>
          </h2>

          <p className="mt-2 max-w-4xl mx-auto text-base text-gray-600">
            Explore how Softree helps organizations leverage data to uncover insights and
            drive strategic decision-making.
          </p>
        </div>

        <div
          className="
                w-full
                h-auto min-h-[680px] md:h-[70vh] md:max-h-[680px]
                bg-gradient-to-r from-[#eef2f7] via-[#ffedd5] to-[#eef2f7]
                rounded-[32px]
                border border-slate-200
                shadow-xl
                overflow-hidden
              "
        >
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop
            observer={true}
            observeParents={true}
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
                {/* FULL WIDTH CARD */}
                <div className="relative w-full h-full overflow-hidden rounded-[32px]">
                  {/* Border */}
                  <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-white/15" />

                  {/* CARD BODY */}
                  <div
                    className="
                          w-full
                          h-full
                          bg-gradient-to-r from-black via-[#4c1c02] to-black
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                      {/* Image */}
                      <div className="flex justify-center w-full min-w-0 max-w-sm mx-auto lg:max-w-none">
                        <div className="w-full aspect-video overflow-hidden rounded-xl shadow-md ring-1 ring-white/10 shrink-0 bg-black/40">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Text */}
                      <div className="space-y-5 min-w-0 w-full">
                        {/* SUMMARY */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-orange-400" />
                            <h4 className="text-xs font-semibold tracking-wide text-orange-400 uppercase">
                              Summary
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {item.summary}
                          </p>
                        </div>

                        {/* PROBLEM */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-400" />
                            <h4 className="text-xs font-semibold tracking-wide text-rose-400 uppercase">
                              Problem
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {item.challenge}
                          </p>
                        </div>

                        {/* SOLUTION */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-cyan-400" />
                            <h4 className="text-xs font-semibold tracking-wide text-cyan-400 uppercase">
                              Solution
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {item.solution}
                          </p>
                        </div>

                        {/* IMPACT BOX */}
                        <div
                          className="
                            relative
                            rounded-xl
                            px-5 py-4
                            flex flex-col gap-4
                            xl:flex-row xl:items-center xl:justify-between
                            bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500
                            text-white
                            shadow-lg
                            overflow-hidden
                            w-full
                          "
                        >
                          <div className="relative z-10 space-y-0.5 flex-1 min-w-0 pr-3">
                            <p className="text-xs uppercase tracking-wider text-white/70 truncate">
                              Impact
                            </p>
                            <p className="text-sm font-semibold leading-snug break-words">
                              {item.impact}
                            </p>
                          </div>

                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              relative z-10
                              inline-flex items-center justify-center
                              px-4 py-2
                              text-xs font-semibold uppercase tracking-wide
                              rounded-full
                              bg-white text-orange-700
                              hover:scale-105
                              transition-all duration-300
                              whitespace-nowrap
                              flex-shrink-0
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

        {/* ================= PAGINATION (clean spacing) ================= */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-md">
            <div className="flex items-center gap-5">
              {caseStudies.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  className={`text-xs font-medium tracking-widest transition
                    ${
                      activeIndex === i
                        ? "text-orange-600 scale-125"
                        : "text-gray-400 hover:text-gray-700"
                    }
                  `}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            <div className="w-36 h-[3px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-500"
                style={{
                  width: `${((activeIndex + 1) / caseStudies.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
