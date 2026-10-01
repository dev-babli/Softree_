"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { FileText, AlertTriangle, Lightbulb } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const caseStudies = [
  {
    title: "Smart Hospital Analytics Platform",
    category: "Power BI",
    summary: "An enterprise-grade Power BI dashboard for real-time patient admissions tracking, resource allocation, and clinical analytics.",
    challenge: "Healthcare executives lacked a centralized, real-time platform to monitor hospital capacity, patient outcomes, and staffing needs.",
    solution: "Implemented a HIPAA-compliant Power BI data platform integrated with hospital EHR databases and predictive analytics models.",
    impact: "Enhanced hospital operational efficiency by 40% and improved patient admissions forecasting accuracy.",
    tech: ["Power BI", "Data Analytics", "Azure Data Factory", "EHR Integration"],
    image: "/images/case-study/power-apps/hr.webp",
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
    image: "/images/case-study/home/health.webp",
    href: "https://www.softreetechnology.com/case-studies/healthcare-revenue-cycle-intelligence-dashboard",
  },
  {
    title: "AI-Powered ITSM Analytics Platform",
    category: "Power BI",
    summary: "Global enterprise unified ITSM operations with Microsoft Fabric and AI, reducing incident resolution time by 79% and achieving 99.2% SLA compliance.",
    challenge: "ITSM, monitoring, and cloud data were fragmented across disconnected systems with manual reporting and slow incident investigation.",
    solution: "Designed a centralized Microsoft Fabric and Power BI analytics platform with automated ingestion and AI-driven pattern recognition.",
    impact: "Reduced incident resolution time by 79%, boosted SLA compliance to 99.2%, and cut manual reporting efforts by over 85%.",
    tech: ["Microsoft Fabric", "Power BI", "Azure Data Factory", "Azure Data Lake Storage"],
    image: "/images/case-study/power-apps/itsm-analytics.webp",
    href: "https://www.softreetechnology.com/case-studies/ai-powered-itsm-analytics-platform",
  },
  {
    title: "AI-Based Fraud Detection in Logistics",
    category: "Power BI",
    summary: "A global logistics enterprise used AI-based fraud detection to identify suspicious orders, shipment patterns, and delivery activity while reducing fraud risk.",
    challenge: "Predefined rule-based systems caused high false positives and lacked centralized Power BI dashboards for monitoring transaction risk.",
    solution: "Implemented an AI/ML fraud detection engine with Power BI risk dashboards, anomaly tracking, and automated risk scoring.",
    impact: "Transformed rule-based detection into behavioral AI analysis, reducing fraudulent shipments, financial losses, and manual investigation.",
    tech: ["Microsoft Power BI", "Microsoft Fabric", "Data Analytics", "DAX", "AI/ML"],
    image: "/images/case-study/power-apps/fraud-detection.webp",
    href: "https://www.softreetechnology.com/case-studies/ai-based-fraud-detection-in-logistics",
  },
  {
    title: "HR Analytics & Employee Experience Platform",
    category: "Power BI",
    summary: "A unified HR analytics portal consolidating workforce metrics, hiring pipeline data, and employee experience tracking across legacy databases.",
    challenge: "A Fortune 500 financial services enterprise had employee data scattered across 12 legacy systems, making real-time reporting and onboarding metrics impossible.",
    solution: "Designed a web-based unified portal with analytics dashboards, predictive employee retention metrics, and self-service portals.",
    impact: "Saved 80% reporting time, achieved 65% HR query deflection via AI, and secured 90% self-service adoption rate.",
    tech: ["Power BI", "Azure Data Lake", "Data Modeling", "AI Insights"],
    image: "/images/case-study/power-apps/hr-analytics.webp",
    href: "https://www.softreetechnology.com/case-studies/hr-analytics-and-employee-experience-platform",
  },
];

export default function PowerAppsCaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8 w-full">
        {/* ================= HEADER ================= */}
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold tracking-[0.18em] uppercase">
            Case Studies
          </span>

          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
            Power BI in Action:
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
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
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
