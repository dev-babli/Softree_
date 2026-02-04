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
      "A tenant-wide branded footer ensuring consistent navigation and corporate identity across all SharePoint sites.",

    challenge:
      "Organizations needed a consistent footer across all SharePoint pages without modifying individual pages.",

    solution:
      "Built an SPFx Application Customizer to inject a reusable, branded footer across the tenant.",

    impact:
      "Improved brand consistency across 100+ pages and reduced manual page customization efforts by 80%.",

    tech: ["SPFx", "SharePoint Online", "TypeScript"],
    image: "/images/footer.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Enhancing-User-Experience-with-a-Custom-Footer-using-SPFx.pdf",
  },

  {
    title: "Global Notification Banner with SPFx",
    category: "SharePoint",

    summary:
      "A centralized announcement system for broadcasting important updates across all SharePoint sites.",

    challenge:
      "There was no centralized way to communicate important announcements across all SharePoint sites.",

    solution:
      "Implemented a global notification banner using SPFx Application Customizer with dynamic content control.",

    impact:
      "Enabled instant communication to all users and reduced missed announcements by 60%.",

    tech: ["SPFx", "SharePoint Framework", "Microsoft 365"],
    image: "/images/global.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Implementing-a-Global-Notification-Banner-with-SPFx-Application-Customizer.pdf",
  },

  {
    title: "Browse Documents in Panel using SPFx",
    category: "SharePoint",

    summary:
      "Inline document browsing experience without leaving the current SharePoint page.",

    challenge:
      "Users needed to browse and select documents without leaving the current SharePoint page.",

    solution:
      "Developed an SPFx solution that opens SharePoint documents inside a panel using file picker integration.",

    impact:
      "Reduced navigation time by 40% and improved document selection efficiency.",

    tech: ["SPFx", "SharePoint Online", "React"],
    image: "/images/browse.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Inside-a-panel-Browse-Document-From-file-explorer.pdf",
  },

  {
    title: "Custom Copy & Move Panel for SharePoint Lists",
    category: "SharePoint",

    summary:
      "A user-friendly panel to quickly copy or move list items across SharePoint lists.",

    challenge:
      "Managing list items across SharePoint lists required multiple manual steps and lacked a user-friendly interface.",

    solution:
      "Developed a custom SPFx panel using Fluent UI to enable seamless copy and move operations within SharePoint lists.",

    impact:
      "Reduced manual operations by 70% and improved productivity for daily list management tasks.",

    tech: ["SPFx", "Fluent UI", "SharePoint Online"],
    image: "/images/custom.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Enhancing-SharePoint-List-Management-with-a-Custom-Copy-Move-Panel-Using-SPFx-and-Fluent-UI.pdf",
  },

  {
    title: "Managing SharePoint Library Folders with Power Apps",
    category: "SharePoint",

    summary:
      "A Power Apps interface to simplify folder creation, metadata updates, and document management.",

    challenge:
      "Users struggled to manage folders and metadata efficiently within SharePoint document libraries.",

    solution:
      "Implemented a Power Apps–driven interface to create, update, and manage SharePoint library folders with automation.",

    impact:
      "Improved document organization accuracy by 50% and reduced dependency on manual SharePoint configurations.",

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
