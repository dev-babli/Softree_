"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

const caseStudies = [
  {
    title: "AI-Powered Web Platform for Invoice Automation",
    image: "/images/web-dev/case-study-1.png",
    challenge:
      "Manual invoice processing through emails and PDFs caused delays, errors, and limited financial visibility.",
    solution:
      "We built a secure web platform with AI-based data extraction, automated approval workflows, and real-time dashboards.",
    tech: ["Web Platform", "AI", "Automation", "Cloud Architecture"],
  },
  {
    title: "Enterprise Web Portal for Service Operations",
    image: "/images/web-dev/case-study-2.png",
    challenge:
      "Service teams relied on spreadsheets and emails, leading to slow response times and poor customer tracking.",
    solution:
      "Our team developed a centralized web portal enabling real-time issue tracking, role-based access, and operational insights.",
    tech: ["Web Application", "APIs", "Role-Based Access", "Dashboards"],
  },
  {
    title: "Real-Time Analytics Web Dashboard",
    image: "/images/web-dev/case-study-3.png",
    challenge:
      "Leadership lacked real-time business insights due to disconnected systems and delayed reporting.",
    solution:
      "We delivered a high-performance web analytics dashboard with live data integration and customizable reporting.",
    tech: [
      "Web Dashboards",
      "Cloud Integration",
      "Analytics",
      "Data Pipelines",
    ],
  },
];

export default function WebDevelopmentCaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      <div className="relative w-[86%] max-w-7xl mx-auto text-white">
        {/* ===== Header ===== */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-24">
          {/* Eyebrow */}
          <span
            className="inline-block mb-4 px-4 py-1.5 rounded-full
            text-xs uppercase tracking-[0.3em]
            text-cyan-100
            bg-cyan-100/10 border border-cyan-100/20"
          >
            Case Studies
          </span>

          {/* Title */}
          <h2 className="relative text-4xl md:text-4xl font-semibold tracking-tight mb-6">
            Web Solutions That Deliver Measurable Business Results
            {/* Gradient Underline */}
            <span
              className="absolute left-1/2 -bottom-3 w-32 h-[3px]
              -translate-x-1/2 rounded-full
              bg-gradient-to-r from-cyan-100 via-purple-100 to-pink-100"
            />
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            Explore how our web development expertise helps organizations
            streamline operations, improve visibility, and scale with
            confidence.
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative h-[540px] md:h-[580px]">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000, // ⏱️ 5 seconds
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
                <div
                  className="
                    w-full h-full
                    bg-gradient-to-br from-white/[0.06] via-[#141414] to-[#0b0b0b]
                    backdrop-blur-xl
                    border border-white/12
                    rounded-2xl
                    shadow-[0_40px_120px_rgba(0,0,0,0.65)]
                    overflow-hidden
                    flex flex-col md:flex-row
                  "
                >
                  {/* IMAGE */}
                  <div className="relative md:w-1/2 h-[240px] md:h-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute top-4 left-4 text-xs uppercase tracking-widest bg-white/10 border border-white/15 px-3 py-1 rounded-full text-gray-200">
                      Case Study
                    </span>
                  </div>

                  {/* DIVIDER */}
                  <div className="hidden md:block w-px bg-white/10" />

                  {/* CONTENT */}
                  <div className="md:w-1/2 p-10 flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="text-2xl lg:text-3xl font-medium mb-6">
                        {item.title}
                      </h3>

                      <div className="space-y-6">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                            Challenge
                          </p>
                          <p className="text-sm text-white/80">
                            {item.challenge}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                            Solution
                          </p>
                          <p className="text-sm text-white/80">
                            {item.solution}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* TECH STACK */}
                    <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-white/10">
                      {item.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 text-xs rounded-full bg-white/5 border border-white/15 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* NUMBER PAGINATION */}
          <div className="absolute bottom-[-48px] left-1/2 -translate-x-1/2 flex items-center gap-6 z-30">
            {caseStudies.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                className={`text-sm tracking-widest transition-all ${
                  activeIndex === i
                    ? "text-white font-semibold"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
            <span className="text-white/40 text-sm">
              / {String(caseStudies.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
