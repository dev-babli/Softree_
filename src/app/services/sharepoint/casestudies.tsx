"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";

const caseStudies = [
  {
    title: "Automating Invoice Data Extraction with AI-Driven Power Apps",
    image: "/images/power-apps/case-study.png",
    challenge:
      "Manual invoice processing from email PDFs caused delays, errors, and poor integration with Business Central.",
    solution:
      "We built an AI-powered Power Apps solution with automated approvals and seamless SharePoint integration.",
    tech: ["Power Apps", "Power Automate", "AI Models", "Business Central"],
  },
  {
    title: "Automated Issue Management for Property Services",
    image: "/images/power-apps/case-study.png",
    challenge:
      "Email- and spreadsheet-based issue tracking caused slow resolutions and poor visibility.",
    solution:
      "Cynoteck delivered a Canvas App with Power Automate, reducing resolution time by 40%.",
    tech: ["Power Apps", "Power Automate", "SharePoint"],
  },
  {
    title: "Real-Time Reporting & Productivity Insights",
    image: "/images/power-apps/case-study.png",
    challenge:
      "Disconnected systems prevented real-time reporting and accurate decision-making.",
    solution:
      "We implemented Power BI dashboards with live Business Central data integration.",
    tech: ["Power BI", "Business Central"],
  },
];

export default function PowerAppsCaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* 🔥 BACKGROUND GLOW (CLICK SAFE) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.25),transparent_60%)]" />

      <div className="relative w-[86%] max-w-7xl mx-auto text-white">
        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-block mb-3 text-xs tracking-widest uppercase text-cyan-300">
            Case Studies
          </span>
          <h2 className="text-3xl lg:text-4.5xl font-normal">
            Power Apps in Action: Business Success Stories
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-white/70">
            Explore how Cynoteck helps organizations automate workflows and
            deliver measurable results.
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative h-[540px] md:h-[580px]">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="h-full"
          >
            {caseStudies.map((item, index) => (
              <SwiperSlide key={index} className="h-full">
                {/* CONNECTED CARD */}
                <div className="w-full h-full bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                  {/* IMAGE */}
                  <div className="relative md:w-1/2 h-[240px] md:h-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-4 left-4 text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
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
                          <p className="text-xs uppercase tracking-widest text-cyan-300 mb-1">
                            Challenge
                          </p>
                          <p className="text-sm text-white/80">
                            {item.challenge}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-widest text-cyan-300 mb-1">
                            Solution
                          </p>
                          <p className="text-sm text-white/80">
                            {item.solution}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* TECH */}
                    <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-white/10">
                      {item.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 text-xs rounded-full bg-white/10 border border-white/10"
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

          {/* 🔢 NUMBER PAGINATION (CLICKABLE) */}
          <div className="absolute bottom-[-48px] left-1/2 -translate-x-1/2 flex items-center gap-6 z-30">
            {caseStudies.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideTo(i)}
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
