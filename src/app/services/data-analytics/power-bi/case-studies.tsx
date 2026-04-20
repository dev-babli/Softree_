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
    title: "Barcode Scanner Model-Driven App",
    summary: "A Dataverse-based barcode app for real-time inventory tracking.",
    challenge: "Manual inventory caused inaccuracies and delays.",
    solution: "Built a model-driven Power App with barcode scanning.",
    impact: "Improved accuracy and reduced manual effort.",
    tech: ["Power Apps", "Dataverse", "Power Automate", "Barcode Scanner"],
    image: "/images/case-study/power-apps/barcode.png",
    href: "/pdf/Barcode Scanner App.pdf",
    category: "Power Apps",
  },

  {
    title: "Employee Details Tracking System",
    summary: "Centralized HR platform replacing spreadsheets.",
    challenge: "Employee data scattered across multiple sheets.",
    solution: "Built a secure Power Apps HR system with automation.",
    impact: "Improved accuracy by 80% and reduced workload.",
    tech: ["Power Apps", "SharePoint", "Power Automate"],
    image: "/images/case-study/power-apps/emp.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Employee-Details-tracking-System.pdf",
    category: "Power Apps",
  },

  {
    title: "Projects Portfolio Management",
    summary: "Centralized tracking with KPI dashboards.",
    challenge: "No unified system for projects and risks.",
    solution: "Built a Dataverse-powered portfolio app.",
    impact: "Improved delivery timelines by 40%.",
    tech: ["Power Apps", "Dataverse", "Power BI"],
    image: "/images/case-study/power-apps/project.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Projects-Portfolio-ManagementMicrosoft-Dataverse.pdf",
    category: "Power Apps",
  },

  {
    title: "Students Portal Mobile App",
    summary: "Unified app for campus services.",
    challenge: "Students used multiple disconnected systems.",
    solution: "Built a single app for profiles and schedules.",
    impact: "Reduced queries by 50% and increased engagement.",
    tech: ["Power Apps", "Dataverse", "Power Automate"],
    image: "/images/case-study/power-apps/student.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Students-Portal-Mobile-App.pdf",
    category: "Power Apps",
  },
];

export default function PowerAppsCaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center ">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8 w-full">
        {/* ================= HEADER ================= */}
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-[0.18em] uppercase">
            Case Studies
          </span>

          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
            Power BI in Action:
            <span className="text-blue-600"> Business Success Stories</span>
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
                bg-gradient-to-r from-[#eef2f7] via-[#dbe3ff] to-[#eef2f7]
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                       {/* Image */}
                      <div className="flex justify-center w-full min-w-0 max-w-md mx-auto lg:max-w-none">
                        <div className="w-full aspect-video sm:aspect-[4/3] overflow-hidden rounded-xl shadow-md ring-1 ring-white/10 shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>


                      {/* Text */}
                      <div className="space-y-5 min-w-0 w-full">
                        {/* SUMMARY */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-indigo-400" />
                            <h4 className="text-xs font-semibold tracking-wide text-indigo-400 uppercase">
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
                    bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600
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
                bg-white text-indigo-700
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
                    ? "text-indigo-600 scale-125"
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
                className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 transition-all duration-500"
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
