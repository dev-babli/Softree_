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
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.webp",
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
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/Implementing-a-Global-Notification-Banner-with-SPFx-Application-Customizer.webp",
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
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/web-app-case-study-mock-copy.webp",
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
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2025/03/Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.webp",
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
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2025/03/Managing-SharePoint-Library-Folders-with-Power-Apps.webp",
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
        <div className="text-center mb-14">
          <span className="inline-block mb-3 text-xs tracking-widest uppercase text-gray-400">
            Case Studies
          </span>

          <h2 className="text-3xl lg:text-4xl font-normal">
            SharePoint in Action: SPFx Case Studies
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-sm text-white/65">
            Explore how Softree delivers enterprise-grade SharePoint solutions
            using SPFx and Microsoft 365.
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative h-[540px] md:h-[580px]">
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
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full h-full flex group"
                >
                  {/* CARD */}
                  <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-white/[0.08] via-[#151515] to-[#090909] backdrop-blur-2xl shadow-[0_60px_140px_rgba(0,0,0,0.75)] flex flex-col md:flex-row">
                    {/* IMAGE */}
                    <div className="relative md:w-1/2 h-[240px] md:h-full overflow-hidden rounded-l-3xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/75 via-black/30 to-transparent" />

                      <div className="absolute top-5 left-5 flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full bg-black/70 border border-white/20">
                          {item.category}
                        </span>
                        <span className="text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full bg-black border border-white/15">
                          View case →
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="md:w-1/2 p-16 flex flex-col h-full">
                      <div className="flex-1">
                        <h3 className="text-2xl lg:text-3xl font-medium mb-8 bg-gradient-to-r from-[#5fb3ff] via-[#7fd7ff] to-[#cbefff] bg-clip-text text-transparent">
                          {item.title}
                        </h3>

                        <div className="space-y-12">
                          <div className="relative pl-6">
                            <span className="absolute left-0 top-1 h-8 w-[2px] bg-gradient-to-b from-white/50 to-transparent" />
                            <p className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-3">
                              Challenge
                            </p>
                            <p className="text-sm text-white/80">
                              {item.challenge}
                            </p>
                          </div>

                          <div className="relative pl-6">
                            <span className="absolute left-0 top-1 h-8 w-[2px] bg-gradient-to-b from-white/50 to-transparent" />
                            <p className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-3">
                              Solution
                            </p>
                            <p className="text-sm text-white/80">
                              {item.solution}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* TECH */}
                      <div className="pt-10 mt-12 border-t border-white/10">
                        <div className="flex flex-wrap gap-3">
                          {item.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 text-xs rounded-full bg-black/70 border border-white/25 text-white/75"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-auto pt-12 flex justify-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            router.push("/case-studies/sharepoint");
                          }}
                          className="group relative px-8 sm:px-10 py-3 rounded-full bg-black text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white border border-white/20 transition-all duration-300 hover:border-white/40 whitespace-nowrap"
                        >
                          <span className="relative flex items-center gap-3">
                            Explore SharePoint solutions
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* NUMBER PAGINATION */}
          <div className="absolute bottom-[-56px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30">
            {/* NUMBERS */}
            <div className="flex items-center gap-6">
              {caseStudies.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  className={`relative text-sm tracking-widest transition-all duration-300 ${
                    activeIndex === i
                      ? "text-white scale-125 after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-px after:bg-white"
                      : "text-white/40 hover:text-white hover:scale-110"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}

              {/* TOTAL */}
              <span
                className={`text-sm transition-colors duration-300 ${
                  activeIndex === caseStudies.length - 1
                    ? "text-white font-medium"
                    : "text-white/40"
                }`}
              >
                / {String(caseStudies.length).padStart(2, "0")}
              </span>
            </div>

            {/* PROGRESS BAR */}
            <div className="relative w-40 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-white transition-all duration-500 ease-out"
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
