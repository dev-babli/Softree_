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
    summary: "A Dataverse-based barcode app for real-time inventory tracking and check-in/check-out workflows.",
    challenge: "Manual tracking of expensive audio gear led to asset losses and scheduling conflicts.",
    solution: "Built a model-driven Power App with native barcode scanning and automated alerts.",
    impact: "Achieved 100% asset traceability and zero equipment scheduling conflicts.",
    tech: ["Power Apps", "Dataverse", "Power Automate", "Barcode Scanner"],
    image: "/images/case-study/power-apps/barcode.png",
    href: "https://www.softreetechnology.com/case-studies/barcode-scanner-app-audio-equipment-management",
    category: "Power Apps",
  },
  {
    title: "AI-Powered Task Automation using Copilot in Power Apps",
    summary: "Automates repetitive business tasks using AI-driven Copilot assistance.",
    challenge: "Manual data entry and classification processes were time-consuming and error-prone.",
    solution: "Integrated Copilot AI in canvas Power Apps with automated cloud flows.",
    impact: "Boosted operational productivity by 60% and eliminated human data entry errors.",
    tech: ["Power Apps", "Copilot AI", "Power Automate", "Dataverse"],
    image: "/images/case-study/power-apps/copilot.png",
    href: "https://www.softreetechnology.com/case-studies/ai-powered-task-automation-copilot-power-apps",
    category: "Power Apps",
  },
  {
    title: "Enterprise Leave Management System",
    summary: "A centralized Power Apps solution for managing leave requests, balance tracking, and approvals.",
    challenge: "Manual leave tracking through spreadsheets caused payroll errors and resource scheduling conflicts.",
    solution: "Built a canvas Power App integrated with SharePoint and Power Automate for instant automated approvals.",
    impact: "Reduced leave processing time by 75% and eliminated tracking discrepancies.",
    tech: ["Power Apps", "Power Automate", "SharePoint Online", "Microsoft Teams"],
    image: "/images/case-study/power-apps/hr.png",
    href: "https://www.softreetechnology.com/case-studies/enterprise-leave-management-system",
    category: "Power Apps",
  },
  {
    title: "Power Apps Ceramic Manufacturing Automation",
    summary: "Automating factory floor tracking, quality checks, and production line reporting.",
    challenge: "Paper-based logs in the ceramic manufacturing unit caused delayed reporting and high defect rates.",
    solution: "Created a tablet-optimized canvas Power App with custom forms and automated defect logging.",
    impact: "Reduced production defects by 30% and enabled real-time inventory visibility.",
    tech: ["Power Apps", "Dataverse", "Power Automate", "AI Builder"],
    image: "/images/case-study/power-apps/project.avif",
    href: "https://www.softreetechnology.com/case-studies/power-apps-ceramic-manufacturing-automation",
    category: "Power Apps",
  },
  {
    title: "AI IT Service Management Analytics Platform",
    summary: "Predictive ITSM analytics and ticket resolution automation dashboard.",
    challenge: "IT teams struggled to resolve critical tickets within SLA due to a lack of analytics.",
    solution: "Delivered a Power BI and Power Apps dashboard with AI-driven predictive insights and Copilot agent integration.",
    impact: "Improved SLA compliance by 45% and reduced ticket volume through self-service automation.",
    tech: ["Power BI", "Power Apps", "Copilot Studio", "Azure AI"],
    image: "/images/case-study/power-apps/emp.jpg",
    href: "https://www.softreetechnology.com/case-studies/ai-it-service-management-analytics-platform",
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold tracking-[0.18em] uppercase">
            Case Studies
          </span>

          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
            Power Apps in Action:
            <span className="text-orange-600"> Business Success Stories</span>
          </h2>

          <p className="mt-2 max-w-4xl mx-auto text-base text-gray-600">
            Explore how Softree helps organizations automate workflows and
            deliver measurable results.
          </p>
        </div>

        <div
          className="
                w-full
                h-auto min-h-[680px] md:h-[70vh] md:max-h-[680px]
                bg-gradient-to-r from-[#fff7ed] via-[#ffedd5] to-[#fff7ed]
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
                        <div className="w-full aspect-video overflow-hidden rounded-xl shadow-md ring-1 ring-white/10 shrink-0">
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
                    bg-gradient-to-r from-orange-600 via-orange-700 to-amber-600
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
