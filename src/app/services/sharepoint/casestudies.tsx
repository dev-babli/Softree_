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
    challenge:
      "Organizations needed a consistent footer across all SharePoint pages without modifying individual pages.",
    solution:
      "Built an SPFx Application Customizer to inject a reusable, branded footer across the tenant.",
    tech: ["SPFx", "SharePoint Online", "TypeScript"],
    image: "/images/footer.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.pdf",
  },
  {
    title: "Global Notification Banner with SPFx",
    category: "SharePoint",
    challenge:
      "There was no centralized way to communicate important announcements across all SharePoint sites.",
    solution:
      "Implemented a global notification banner using SPFx Application Customizer with dynamic content control.",
    tech: ["SPFx", "SharePoint Framework", "Microsoft 365"],
    image: "/images/global.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Implementing-a-Global-Notification-Banner-with-SPFx-Application-Customizer.pdf",
  },
  {
    title: "Browse Documents in Panel using SPFx",
    category: "SharePoint",
    challenge:
      "Users needed to browse and select documents without leaving the current SharePoint page.",
    solution:
      "Developed an SPFx solution that opens SharePoint documents inside a panel using file picker integration.",
    tech: ["SPFx", "SharePoint Online", "React"],
    image: "/images/browse.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Inside-a-panel-Browse-Document-From-file-explorer.pdf",
  },
  {
    title: "Custom Copy & Move Panel for SharePoint Lists",
    category: "SharePoint",
    challenge:
      "Managing list items across SharePoint lists required multiple manual steps and lacked a user-friendly interface.",
    solution:
      "Developed a custom SPFx panel using Fluent UI to enable seamless copy and move operations within SharePoint lists.",
    tech: ["SPFx", "Fluent UI", "SharePoint Online"],
    image: "/images/custom.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.pdf",
  },
  {
    title: "Managing SharePoint Library Folders with Power Apps",
    category: "SharePoint",
    challenge:
      "Users struggled to manage folders and metadata efficiently within SharePoint document libraries.",
    solution:
      "Implemented a Power Apps–driven interface to create, update, and manage SharePoint library folders with automation.",
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
    <section className="relative py-12 overflow-hidden">
      <div className="relative w-[86%] max-w-7xl mx-auto text-white">
        {/* HEADER */}
        <div className="text-center mb-20 px-4">
          {/* Eyebrow */}
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-[0.18em]">
            Case Studies
          </span>

          {/* Title */}
          <h2 className="text-3xl lg:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
            SharePoint in Action:
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              SPFx Case Studies
            </span>
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-2xl mx-auto text-base text-gray-600 leading-relaxed">
            Explore how Softree delivers enterprise-grade SharePoint solutions
            using SPFx and Microsoft 365 to create scalable modern workplace
            experiences.
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
