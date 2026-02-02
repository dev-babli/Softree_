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
    challenge:
      "Manual business processes and fragmented data caused inefficiencies and limited visibility across teams.",
    solution:
      "Built a Power Apps model-driven solution using Microsoft Dataverse with role-based access and automated workflows.",
    tech: ["Power Apps", "Dataverse", "Power Automate"],
    image: "/images/case-study/power-apps/model.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Model-Driven-App-1.pdf",
    category: "Power Apps",
  },
  {
    title: "Employee Details Tracking System",
    challenge:
      "Employee records were maintained across spreadsheets, leading to duplication and data inconsistency.",
    solution:
      "Developed a centralized Power Apps solution to manage employee data with controlled access and automation.",
    tech: ["Power Apps", "SharePoint", "Power Automate"],
    image: "/images/case-study/power-apps/emp.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Employee-Details-tracking-System.pdf",
    category: "Power Apps",
  },
  {
    title: "Health Selector Mobile Application",
    challenge:
      "Users found it difficult to compare multiple health plans based on eligibility and coverage criteria.",
    solution:
      "Designed a mobile-first Power Apps application with guided plan comparison and filtering logic.",
    tech: ["Power Apps", "Dataverse", "Power Fx"],
    image: "/images/case-study/power-apps/health.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Health-Plan-Selector-Mobile-Application.pdf",
    category: "Power Apps",
  },
  {
    title: "Projects Portfolio Management",
    challenge:
      "Lack of centralized project tracking resulted in poor visibility and delayed decision-making.",
    solution:
      "Built a Dataverse-backed portfolio management app to track projects, progress, and KPIs.",
    tech: ["Power Apps", "Dataverse", "Power BI"],
    image: "/images/case-study/power-apps/project.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Projects-Portfolio-ManagementMicrosoft-Dataverse.pdf",
    category: "Power Apps",
  },
  {
    title: "Students Portal Mobile App",
    challenge:
      "Students had to access multiple systems for academic information and profile management.",
    solution:
      "Created a unified mobile app allowing students to manage profiles and access services from one place.",
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
    <section className="relative py-12 overflow-hidden">
      <div className="relative w-[86%] max-w-7xl mx-auto text-white">
        {/* HEADER */}
        <div className="text-center mb-16 px-4">
          {/* Eyebrow */}
          <span
            className="
      inline-block
      mb-4
      px-4 py-1.5
      rounded-full
      bg-blue-50
      text-blue-600
      text-xs
      font-semibold
      tracking-[0.18em]
      uppercase
    "
          >
            Case Studies
          </span>

          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight">
            Power Apps in Action:
            <span className="text-blue-600"> Business Success Stories</span>
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-2xl mx-auto text-base text-gray-600 leading-relaxed">
            Explore how Softree helps organizations automate workflows and
            deliver measurable, enterprise-grade results.
          </p>
        </div>

        {/* ================= SLIDER ================= */}
        <div
          className="
  relative
  h-[640px] md:h-[680px]

  bg-white
  rounded-[32px]
  border border-slate-200/70

    shadow-[0_24px_80px_rgba(0,0,0,0.7)]

  px-6 py-8
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
            className="h-full"
          >
            {caseStudies.map((item, index) => (
              <SwiperSlide key={index} className="h-full flex">
                <a href={item.href} className="w-full h-full group">
                  {/* ================= ADVANCED HERO CARD ================= */}
                  <div className="group relative w-full h-full">
                    {/* ===== FLOOR SHADOW (floating base) ===== */}
                    <div
                      className="
      pointer-events-none
      absolute
      -bottom-14
      left-1/2
      -translate-x-1/2
      w-[94%]
      h-24
      rounded-full
      bg-slate-400/40
      blur-3xl
      opacity-60
      transition
      group-hover:opacity-80
    "
                    />

                    {/* ===== GRADIENT FRAME BORDER ===== */}
                    <div className="rounded-3xl p-[1.5px] bg-gradient-to-br from-slate-200 via-white to-slate-200">
                      {/* ===== MAIN CARD ===== */}
                      <div
                        className="
        relative
        rounded-3xl
        bg-white
        border border-slate-200/70

        /* multi-layer hero depth */
        shadow-[
          0_6px_14px_rgba(15,23,42,0.06),
          0_30px_70px_rgba(15,23,42,0.12),
          0_100px_220px_-40px_rgba(15,23,42,0.30)
        ]

        flex flex-col md:flex-row
        overflow-hidden

        transition-all duration-500
        group-hover:-translate-y-4
      "
                      >
                        {/* subtle top highlight */}
                        <span className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent pointer-events-none" />

                        {/* ================= IMAGE ================= */}
                        <div
                          className="
  relative md:w-1/2
  flex items-center justify-center
  p-12

  bg-black
"
                        >
                          <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                            />

                            {/* darker cinematic overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-slate-900/10 to-transparent" />

                            {/* category badge */}
                            <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full bg-white/95 border border-slate-200 text-slate-700 shadow-sm">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        {/* ================= CONTENT ================= */}
                        <div className="md:w-1/2 p-16 flex flex-col">
                          <div className="flex-1">
                            <h3 className="text-3xl font-bold mb-10 text-black ">
                              {item.title}
                            </h3>

                            {/* DETAILS */}
                            <div className="space-y-12">
                              {/* Challenge */}
                              <div className="relative pl-7">
                                <span className="absolute left-0 top-1 h-9 w-[4px] rounded-full bg-gradient-to-b from-indigo-600 to-cyan-500" />

                                <p className="text-[11px] uppercase tracking-[0.25em] text-indigo-600 font-semibold mb-2">
                                  Challenge
                                </p>

                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {item.challenge}
                                </p>
                              </div>

                              {/* Solution */}
                              <div className="relative pl-7">
                                <span className="absolute left-0 top-1 h-9 w-[4px] rounded-full bg-gradient-to-b from-indigo-600 to-cyan-500" />

                                <p className="text-[11px] uppercase tracking-[0.25em] text-indigo-600 font-semibold mb-2">
                                  Solution
                                </p>

                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {item.solution}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* ================= TECH ================= */}
                          <div className="pt-12 mt-12 border-t border-gray-900">
                            <div className="flex flex-wrap gap-3">
                              {item.tech.map((tech, i) => (
                                <span
                                  key={i}
                                  className="
          px-4 py-2
          text-xs font-medium
          rounded-full

          bg-indigo-50
          text-indigo-700
          border border-indigo-100

          hover:bg-indigo-600
          hover:text-white
          transition
        "
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* ================= CTA ================= */}
                          <div className="mt-auto pt-12">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                router.push("/case-studies/mobile");
                              }}
                              className="
      group
      px-10 py-3.5
      rounded-full

      bg-gradient-to-r from-indigo-600 to-cyan-500
      text-white text-xs font-semibold uppercase tracking-[0.2em]

      shadow-[0_12px_30px_rgba(79,70,229,0.35)]
      hover:shadow-[0_20px_50px_rgba(79,70,229,0.45)]
      hover:scale-105
      transition-all duration-300
    "
                            >
                              Explore mobile app solutions →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ================= PAGINATION ================= */}
          <div className="absolute bottom-[-64px] left-1/2 -translate-x-1/2">
            <div
              className="
    flex flex-col items-center gap-3

    px-6 py-3
    rounded-full

    bg-white/90 backdrop-blur-md
    border border-gray-200

    shadow-[
      0_6px_20px_rgba(0,0,0,0.08),
      0_20px_40px_rgba(0,0,0,0.06)
    ]
  "
            >
              {/* numbers */}
              <div className="flex items-center gap-6">
                {caseStudies.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => swiperRef.current?.slideToLoop(i)}
                    className={`
            text-sm font-medium tracking-widest
            transition-all duration-200

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

              {/* progress bar */}
              <div className="w-40 h-[3px] bg-gray-200 rounded-full overflow-hidden">
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
      </div>
    </section>
  );
}
