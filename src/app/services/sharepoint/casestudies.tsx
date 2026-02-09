"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";

import "swiper/css";

const caseStudies = [
  {
    title: "Custom Footer using SPFx",
    category: "SharePoint",

    summary:
      "Tenant-wide branded footer for consistent navigation across sites.",

    challenge: "Needed a unified footer without editing pages individually.",

    solution:
      "Built an SPFx Application Customizer to deploy a reusable footer.",

    impact:
      "Standardized branding across 100+ pages and cut manual effort by 80%.",

    tech: ["SPFx", "SharePoint Online", "TypeScript"],
    image: "/images/footer.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.pdf",
  },

  {
    title: "Global Notification Banner with SPFx",
    category: "SharePoint",

    summary: "Centralized banner for broadcasting updates across sites.",

    challenge: "No simple way to push announcements tenant-wide.",

    solution: "Implemented a dynamic SPFx banner with centralized control.",

    impact: "Improved communication reach and reduced misses by 60%.",

    tech: ["SPFx", "SharePoint Framework", "Microsoft 365"],
    image: "/images/global.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Implementing-a-Global-Notification-Banner-with-SPFx-Application-Customizer.pdf",
  },

  {
    title: "Browse Documents in Panel using SPFx",
    category: "SharePoint",

    summary: "View and pick documents without leaving the page.",

    challenge: "Users needed faster document access with fewer redirects.",

    solution: "Built an SPFx panel with integrated file browsing.",

    impact: "Reduced navigation time by 40% and improved efficiency.",

    tech: ["SPFx", "SharePoint Online", "React"],
    image: "/images/browse.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Inside-a-panel-Browse-Document-From-file-explorer.pdf",
  },

  {
    title: "Custom Copy & Move Panel for SharePoint Lists",
    category: "SharePoint",

    summary: "Simplified way to copy or move list items.",

    challenge: "Traditional operations required multiple manual steps.",

    solution: "Created a Fluent UI–based SPFx panel for quick actions.",

    impact: "Cut manual work by 70% and improved daily productivity.",

    tech: ["SPFx", "Fluent UI", "SharePoint Online"],
    image: "/images/custom.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.pdf",
  },

  {
    title: "Managing SharePoint Library Folders with Power Apps",
    category: "SharePoint",

    summary: "Simplified folder and metadata management via Power Apps.",

    challenge: "Managing libraries and metadata was slow and complex.",

    solution: "Delivered a Power Apps interface with automation support.",

    impact: "Improved accuracy by 50% and reduced manual setup.",

    tech: ["Power Apps", "SharePoint Online", "Power Automate"],
    image: "/images/manage.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Managing-SharePoint-Library-Folders-with-Power-Apps-Updated-.pdf",
  },
];

export default function SharePointCaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center py-10 ">
      <div className="w-[86%] max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          {/* Badge */}
          <span className="inline-block mb-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold tracking-[0.18em] uppercase">
            SharePoint Case Studies
          </span>

          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
            SharePoint in Action:
            <span className="text-emerald-600">
              {" "}
              Modern Workplace Solutions
            </span>
          </h2>

          {/* Description */}
          <p className="mt-3 max-w-3xl mx-auto text-base text-gray-600 leading-relaxed">
            Discover how Softree builds intelligent SharePoint intranets,
            portals, and SPFx solutions that streamline collaboration, automate
            workflows, and enhance productivity across Microsoft 365
            environments.
          </p>
        </div>

        <div
          className="
                     h-[70vh] max-h-[680px]    
                     bg-gradient-to-r from-[#eef2f7] via-[#dbe3ff] to-[#eef2f7]
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
              <SwiperSlide
                key={index}
                className="h-full flex items-center justify-center overflow-visible"
              >
                {/* ===== OUTER CLIP WRAPPER (IMPORTANT) ===== */}
                <div
                  className="relative w-full max-w-6xl rounded-[48px] overflow-hidden
                                   "
                >
                  {/* ===== BORDER / GLOW ===== */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[48px]
                                     ring-1 ring-white/15"
                  />

                  {/* ===== CARD BODY ===== */}
                  <div
                    className="relative rounded-[48px]
                                     bg-gradient-to-r from-black via-[#0f2f7a] to-black
                                     p-10"
                  >
                    {/* ===== Header ===== */}
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

                    {/* ===== Main Content ===== */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                      {/* ===== Image ===== */}
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

                      {/* ===== Text Content ===== */}
                      <div className="space-y-6">
                        {/* Problem */}
                        <div>
                          <h4 className="flex items-center gap-2 font-semibold text-white">
                            💡 Problem
                          </h4>
                          <p className=" text-sm text-slate-300 leading-relaxed">
                            {item.challenge}
                          </p>
                        </div>

                        {/* Solution */}
                        <div>
                          <h4 className="flex items-center gap-2 font-semibold text-white">
                            💡 Solution
                          </h4>
                          <p className="text-sm text-slate-300 leading-relaxed">
                            {item.solution}
                          </p>
                        </div>

                        {/* ===== Impact ===== */}
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
                          {/* Glow */}
                          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />

                          {/* Impact text */}
                          <div className="relative z-10">
                            <p className="text-[10px] uppercase tracking-widest text-white/70 ">
                              Impact
                            </p>
                            <p className="text-sm sm:text-base font-semibold leading-snug">
                              {item.impact}
                            </p>
                          </div>

                          {/* Separator */}
                          <div
                            className="
                               relative z-10
                               w-full h-px
                               sm:w-px sm:h-10
                               bg-white/30
                               rounded-full
                             "
                          />

                          {/* CTA */}
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
                                 hover:shadow-lg
                                 transition
                               "
                          >
                            View Case Study
                            <span className="text-sm">→</span>
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
