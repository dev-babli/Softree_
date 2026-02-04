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
    summary:
      "Enterprise-grade business process automation using Microsoft Dataverse.",

    challenge:
      "Manual business processes and fragmented data caused inefficiencies, duplicate work, and limited visibility across teams.",

    solution:
      "Built a Power Apps model-driven solution using Microsoft Dataverse with role-based access, automated approvals, and centralized records.",

    impact:
      "Reduced manual effort by 60% and improved reporting accuracy with real-time dashboards.",

    tech: ["Power Apps", "Dataverse", "Power Automate"],

    image: "/images/case-study/power-apps/model.png",

    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Model-Driven-App-1.pdf",

    category: "Power Apps",
  },

  {
    title: "Employee Details Tracking System",
    summary:
      "Centralized HR management platform replacing scattered spreadsheets.",

    challenge:
      "Employee records were maintained across spreadsheets, leading to duplication, errors, and inconsistent data updates.",

    solution:
      "Developed a centralized Power Apps solution to manage employee data with secure access, automated onboarding, and workflow approvals.",

    impact:
      "Improved data accuracy by 80% and significantly reduced HR administrative workload.",

    tech: ["Power Apps", "SharePoint", "Power Automate"],

    image: "/images/case-study/power-apps/emp.jpg",

    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Employee-Details-tracking-System.pdf",

    category: "Power Apps",
  },

  {
    title: "Health Selector Mobile Application",
    summary:
      "Mobile-first healthcare comparison app for faster and smarter decisions.",

    challenge:
      "Users found it difficult to compare multiple health plans based on eligibility, benefits, and coverage criteria.",

    solution:
      "Designed a mobile-first Power Apps application with guided plan comparison, dynamic filters, and simplified eligibility logic.",

    impact:
      "Helped users select plans 3x faster while improving decision confidence.",

    tech: ["Power Apps", "Dataverse", "Power Fx"],

    image: "/images/case-study/power-apps/health.jpg",

    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Health-Plan-Selector-Mobile-Application.pdf",

    category: "Power Apps",
  },

  {
    title: "Projects Portfolio Management",
    summary:
      "End-to-end project visibility and KPI tracking for leadership teams.",

    challenge:
      "Lack of centralized project tracking resulted in poor visibility, missed deadlines, and delayed decision-making.",

    solution:
      "Built a Dataverse-backed portfolio management app to monitor projects, budgets, risks, and KPIs with automated reports.",

    impact:
      "Enabled real-time insights and improved project delivery timelines by 40%.",

    tech: ["Power Apps", "Dataverse", "Power BI"],

    image: "/images/case-study/power-apps/project.avif",

    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Projects-Portfolio-ManagementMicrosoft-Dataverse.pdf",

    category: "Power Apps",
  },

  {
    title: "Students Portal Mobile App",
    summary:
      "Unified digital campus experience for students on mobile devices.",

    challenge:
      "Students had to access multiple disconnected systems for academic information, schedules, and profile management.",

    solution:
      "Created a unified mobile app allowing students to manage profiles, view schedules, receive updates, and access services in one place.",

    impact: "Increased student engagement and reduced support queries by 50%.",

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
    <section className="relative min-h-screen flex items-center py-10 ">
      <div className="w-[86%] max-w-7xl mx-auto space-y-8">
        {/* ================= HEADER ================= */}
        <div className="text-center">
          <span className="inline-block mb-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-[0.18em] uppercase">
            Case Studies
          </span>

          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
            Power Apps in Action:
            <span className="text-blue-600"> Business Success Stories</span>
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-600">
            Explore how Softree helps organizations automate workflows and
            deliver measurable results.
          </p>
        </div>

        {/* ================= SLIDER ================= */}
        <div
          className="
        h-[70vh] max-h-[680px]
        bg-white
        rounded-[32px]
        border border-slate-200
        shadow-xl
        p-6
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
              <SwiperSlide key={index} className="h-full">
                <a href={item.href} className="h-full flex group">
                  <div className="h-full w-full rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col md:flex-row overflow-hidden transition group-hover:-translate-y-1">
                    {/* ================= IMAGE ================= */}
                    <div className="md:w-1/2 p-8 bg-black flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="rounded-2xl object-cover w-full h-full"
                      />
                    </div>

                    {/* ================= CONTENT ================= */}
                    <div className="md:w-1/2 p-10 flex flex-col">
                      {/* TITLE */}
                      <h3 className="text-2xl font-bold text-black mb-2">
                        {item.title}
                      </h3>

                      {/* DETAILS */}
                      <div className="space-y-4 text-sm">
                        {/* Challenge */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
                            Challenge
                          </p>
                          <p className="text-gray-700">{item.challenge}</p>
                        </div>

                        {/* Impact (highlight box) */}
                        <div className="p-3 rounded-lg bg-indigo-700 border border-indigo-100">
                          <p className="text-M font-semibold uppercase tracking-wider text-indigo-100 mb-1">
                            Impact
                          </p>
                          <p className="text-indigo-100 font-medium">
                            {item.impact}
                          </p>
                        </div>
                      </div>

                      {/* TECH */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* ================= CTA BUTTON ================= */}
                      <div className="mt-auto pt-8">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            router.push("/case-studies/mobile");
                          }}
                          className="
                px-8 py-3
                rounded-full
                bg-gradient-to-r from-indigo-600 to-cyan-500
                text-white text-xs font-semibold uppercase tracking-widest
                shadow-md
                hover:scale-105
                transition
              "
                        >
                          Explore power app solutions →
                        </button>
                      </div>
                    </div>
                  </div>
                </a>
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
