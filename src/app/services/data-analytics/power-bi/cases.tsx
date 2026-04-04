"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const caseStudies = [
  {
    title: "Executive Sales Dashboard",

    summary: "Real-time enterprise sales analytics platform.",

    challenge:
      "Leadership lacked unified visibility into sales KPIs across regions and product lines.",

    solution:
      "Built a centralized Power BI dashboard integrating CRM, ERP, and marketing data with advanced DAX modeling.",

    impact:
      "Improved decision-making speed by 45% with real-time KPI visibility.",

    tech: ["Power BI", "Azure SQL", "DAX", "Power Query"],

    image: "/images/case-study/power-bi/sales-dashboard.png",

    href: "#",

    category: "Power BI",
  },

  {
    title: "Financial Performance Analytics",

    summary: "Automated reporting for CFO and finance teams.",

    challenge:
      "Manual Excel-based reporting caused delays and inconsistencies in financial insights.",

    solution:
      "Developed automated Power BI financial dashboards with row-level security and scheduled refresh.",

    impact:
      "Reduced reporting preparation time by 70% and improved data accuracy.",

    tech: ["Power BI", "Excel", "RLS", "Power Automate"],

    image: "/images/case-study/power-bi/finance-dashboard.png",

    href: "#",

    category: "Power BI",
  },

  {
    title: "HR Workforce Analytics",

    summary: "Data-driven employee performance and attrition insights.",

    challenge:
      "HR teams lacked consolidated analytics on attrition, performance, and hiring trends.",

    solution:
      "Designed interactive dashboards with predictive insights using Power BI and Azure Data Lake.",

    impact:
      "Reduced employee attrition by 18% through data-backed interventions.",

    tech: ["Power BI", "Azure Data Lake", "DAX", "AI Insights"],

    image: "/images/case-study/power-bi/hr-dashboard.png",

    href: "#",

    category: "Power BI",
  },

  {
    title: "Operations & Supply Chain Analytics",

    summary: "End-to-end supply chain performance visibility.",

    challenge:
      "Disconnected systems prevented accurate tracking of inventory and logistics performance.",

    solution:
      "Integrated ERP and warehouse data into a Power BI solution with drill-through insights.",

    impact: "Improved inventory forecasting accuracy by 35%.",

    tech: ["Power BI", "SQL Server", "Azure Synapse"],

    image: "/images/case-study/power-bi/supply-dashboard.png",

    href: "#",

    category: "Power BI",
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
