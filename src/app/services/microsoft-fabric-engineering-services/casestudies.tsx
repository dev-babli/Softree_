"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { FileText, AlertTriangle, Lightbulb } from "lucide-react";

import "swiper/css";

const caseStudies = [
  {
    title: "Azure Data Platform Migration to Microsoft Fabric",
    category: "Data Analytics",
    summary: "Modernize Azure data platforms with Microsoft Fabric, OneLake, and Power BI to create a unified, governed, and scalable analytics foundation.",
    challenge: "Operating separate Azure Data Factory, Synapse, and ADLS Gen2 services caused fragmented pipelines, complex data movement, and inconsistent metrics across reports.",
    solution: "Designed a Microsoft Fabric foundation with OneLake unified storage, Medallion Bronze/Silver/Gold architecture, and Fabric Warehouse semantic models with Direct Lake.",
    impact: "Unified analytics workloads into a single platform, standardized ingestion patterns, improved governance, and streamlined Power BI delivery with zero disruption.",
    tech: ["Microsoft Fabric", "OneLake", "Fabric Lakehouse", "Fabric Data Factory", "Fabric Warehouse", "Power BI", "Direct Lake", "Azure Synapse"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/b520d34302fc9be8aed988a4a73e72d82c7e421e-1672x941.png",
    href: "https://www.softreetechnology.com/case-studies/azure-data-platform-migration-microsoft-fabric",
  },
  {
    title: "AI-Powered ITSM Analytics Platform",
    category: "Data Analytics",
    summary: "Modernizes enterprise operations using Microsoft Fabric and AI to unify incident data, automate reporting, and enable predictive analytics.",
    challenge: "IT operations were overwhelmed by thousands of incidents daily across disconnected systems, resulting in delayed investigations and slow SLA tracking.",
    solution: "Designed and implemented a modern ITSM analytics platform using Microsoft Fabric as the centralized data foundation with interactive Power BI dashboards and AI-driven pattern detection.",
    impact: "Reduced incident resolution time by 79%, achieved 99.2% SLA compliance, and reduced manual reporting effort by 85%.",
    tech: ["Microsoft Fabric", "Power BI", "Azure Data Factory", "Azure Data Lake Storage", "Azure SQL Database", "Microsoft Copilot", "Apache Spark"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/877bb895e6acc7c622b9eeaa6d8d218266ed7162-1536x1024.png",
    href: "https://www.softreetechnology.com/case-studies/ai-powered-itsm-analytics-platform",
  },
  {
    title: "AI Emergency Department Analytics",
    category: "Healthcare Analytics",
    summary: "An intelligent healthcare analytics platform providing live operational visibility, surge forecasting, and automated clinical workflows.",
    challenge: "Critical emergency department data was scattered across triage, ambulance, EHR, lab, and radiology systems, leading to severe bottlenecks and long wait times.",
    solution: "Centralized operational data in Microsoft Fabric & Dataverse with Power BI real-time dashboards, Power Apps operational portal, and AI Builder predictive models.",
    impact: "Achieved 35% reduction in patient waiting times, 30% improvement in triage efficiency, and 40% reduction in manual reporting.",
    tech: ["Microsoft Fabric", "Power BI", "Power Apps", "Power Automate", "Microsoft Dataverse", "AI Builder", "Copilot Studio"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/4336f30d7c53c3f88806ed65e750dd05f78c7779-1536x1024.png",
    href: "https://www.softreetechnology.com/case-studies/ai-powered-emergency-department-performance-analytics",
  },
  {
    title: "Emergency Department Performance Analytics Platform",
    category: "Data Analytics",
    summary: "A unified Microsoft Fabric and Power BI analytics platform providing near real-time visibility into patient flow and emergency room capacity.",
    challenge: "Patient flow, clinical data, and facility capacity were fragmented across hospital sites, resulting in spreadsheet-delayed reporting and ER overcrowding.",
    solution: "Unified EHR, ambulance, and staffing systems in OneLake using Microsoft Fabric Data Factory pipelines, Lakehouses, Warehouses, and Power BI semantic models.",
    impact: "Reduced patient wait times by ~34% and cut manual reporting effort from 22 hours/week to under 6 hours/week.",
    tech: ["Microsoft Fabric", "OneLake", "Data Factory", "Lakehouse", "Warehouse", "Real-Time Intelligence", "Power BI"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/69f611d44619bc68125bb048e42001d0710314b9-1672x941.png",
    href: "https://www.softreetechnology.com/case-studies/emergency-department-performance-analytics-platform",
  },
  {
    title: "Predictive Hospital Bed Occupancy Analytics",
    category: "Healthcare Analytics",
    summary: "An AI-powered predictive hospital occupancy platform forecasting bed availability, admissions, and discharge timelines across 750+ beds.",
    challenge: "Hospital network struggled with fragmented bed occupancy data, ICU bottlenecks, and lack of predictive insights to anticipate patient surge demand.",
    solution: "Unified historical and streaming data in Microsoft Fabric Lakehouse and built predictive models with AI Builder and Azure Machine Learning integrated with Power BI.",
    impact: "Achieved 90% forecasting accuracy, reduced emergency wait times by 28%, and accelerated executive decision-making by 85%.",
    tech: ["Microsoft Fabric", "Power BI", "Power Apps", "Power Automate", "AI Builder", "Azure Machine Learning", "Copilot Studio"],
    image: "https://cdn.sanity.io/images/1zmh4sfw/production/f32b1a3b159ee77c85278d206f07d93656a8dfc4-1672x941.png",
    href: "https://www.softreetechnology.com/case-studies/predictive-hospital-bed-occupancy-analytics",
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 typo-caption">
            Case Studies
          </span>

          <h2 className="typo-heading-2 text-gray-900 mt-2">
            Power BI & Fabric in Action:
            <span className="text-orange-600"> Business Success Stories</span>
          </h2>

          <p className="mt-2 max-w-4xl mx-auto typo-description text-gray-600">
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
                      <h3 className="typo-heading-3 text-white">
                        {item.title} — Case Study
                      </h3>

                      <p className="mt-2 typo-body-sm text-slate-300 flex items-center justify-center gap-2">
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
                            <h4 className="typo-caption-meta text-orange-400 uppercase">
                              Summary
                            </h4>
                          </div>
                          <p className="typo-body-sm text-slate-300 leading-relaxed">
                            {item.summary}
                          </p>
                        </div>

                        {/* PROBLEM */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-400" />
                            <h4 className="typo-caption-meta text-rose-400 uppercase">
                              Problem
                            </h4>
                          </div>
                          <p className="typo-body-sm text-slate-300 leading-relaxed">
                            {item.challenge}
                          </p>
                        </div>

                        {/* SOLUTION */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-cyan-400" />
                            <h4 className="typo-caption-meta text-cyan-400 uppercase">
                              Solution
                            </h4>
                          </div>
                          <p className="typo-body-sm text-slate-300 leading-relaxed">
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
                            <p className="typo-caption-meta text-white/70 truncate uppercase">
                              Impact
                            </p>
                            <p className="typo-body-sm font-semibold break-words">
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
                              typo-button-sm uppercase
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
