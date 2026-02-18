"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/pagination";

const caseStudies = [
  {
    title: "Model Driven App",

    summary: "Enterprise automation built on Microsoft Dataverse.",

    challenge:
      "Manual processes and scattered data reduced efficiency and visibility.",

    solution:
      "Developed a model-driven app with role-based access and automated workflows.",

    impact: "Reduced manual work by 60% with real-time dashboards.",

    tech: ["Power Apps", "Dataverse", "Power Automate"],

    image: "/images/case-study/power-apps/model.png",

    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Model-Driven-App-1.pdf",

    category: "Power Apps",
  },

  {
    title: "Employee Details Tracking System",

    summary: "Centralized HR platform replacing spreadsheets.",

    challenge:
      "Employee data was scattered across spreadsheets causing errors.",

    solution: "Built a secure Power Apps system with automated HR workflows.",

    impact: "Improved data accuracy by 80% and reduced admin workload.",

    tech: ["Power Apps", "SharePoint", "Power Automate"],

    image: "/images/case-study/power-apps/emp.jpg",

    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Employee-Details-tracking-System.pdf",

    category: "Power Apps",
  },

  {
    title: "Health Selector Mobile Application",

    summary: "Mobile app for easy health plan comparison.",

    challenge: "Users struggled to compare plans and eligibility options.",

    solution:
      "Designed a mobile-first app with guided comparisons and filters.",

    impact: "Enabled users to choose plans 3x faster.",

    tech: ["Power Apps", "Dataverse", "Power Fx"],

    image: "/images/case-study/power-apps/health.jpg",

    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Health-Plan-Selector-Mobile-Application.pdf",

    category: "Power Apps",
  },

  {
    title: "Projects Portfolio Management",

    summary: "Centralized project tracking with KPI dashboards.",

    challenge: "No unified system for tracking projects and risks.",

    solution: "Built a Dataverse-powered portfolio management app.",

    impact: "Improved project delivery timelines by 40%.",

    tech: ["Power Apps", "Dataverse", "Power BI"],

    image: "/images/case-study/power-apps/project.avif",

    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Projects-Portfolio-ManagementMicrosoft-Dataverse.pdf",

    category: "Power Apps",
  },

  {
    title: "Students Portal Mobile App",

    summary: "Unified mobile app for campus services.",

    challenge: "Students used multiple disconnected systems.",

    solution: "Developed a single app for profiles, schedules, and updates.",

    impact: "Increased engagement and reduced support queries by 50%.",

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
      <div className="w-[86%] max-w-7xl mx-auto space-y-8">
        {/* ================= HEADER ================= */}
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-[0.18em] uppercase">
            Case Studies
          </span>

          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
            Power Apps in Action:
            <span className="text-blue-600"> Business Success Stories</span>
          </h2>

          <p className="mt-2 max-w-4xl mx-auto text-base text-gray-600">
            Explore how Softree helps organizations automate workflows and
            deliver measurable results.
          </p>
        </div>

        <div
          className="
    w-full
    h-[70vh] max-h-[680px]
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
