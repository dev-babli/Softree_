"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";

import "swiper/css";

const caseStudies = [
  {
    title: "EdTech Management Information System",
    category: "Web App Development",

    summary:
      "Centralized platform for managing students, courses, and operations.",

    challenge:
      "Institutions lacked a unified system for academic and admin management.",

    solution:
      "Built a web-based MIS to manage academics, users, and reporting.",

    impact: "Reduced manual work by 60% and enabled real-time reporting.",

    tech: ["Web Application", "EdTech", "System Management"],

    image: "/images/edtech.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/EdTech-Management-Information-System-.pdf",
  },

  {
    title: "Noteved Admin Web Portal",
    category: "Web App Development",

    summary: "Secure admin dashboard for centralized platform control.",

    challenge: "Admins needed better control over users and content.",

    solution: "Developed a role-based admin portal for system management.",

    impact: "Improved efficiency by 45% with faster operations.",

    tech: ["Admin Dashboard", "Web Management", "RBAC"],

    image: "/images/education.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/NotevedAdmin.docx.pdf",
  },

  {
    title: "Wellkies Admin Web Application",
    category: "Web App Development",

    summary: "Internal healthcare admin system for secure workflow management.",

    challenge: "Healthcare teams lacked centralized workflow control.",

    solution: "Built a secure admin app for managing users and services.",

    impact: "Reduced operational delays by 50%.",

    tech: ["Web Application", "Admin Panel", "Healthcare Platform"],

    image: "/images/2.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Website.docx.pdf",
  },

  {
    title: "Public Blogging Website (MERN Stack)",
    category: "Web App Development",

    summary: "Scalable blogging platform with authentication and CMS.",

    challenge: "Creators needed a secure and scalable publishing platform.",

    solution: "Built a full-stack MERN app with authentication and CMS.",

    impact: "Handled high traffic and increased engagement 3×.",

    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],

    image: "/images/3.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf",
  },

  {
    title: "Food & Wine Website",
    category: "Web App Development",

    summary: "Modern content-driven website with immersive UI.",

    challenge: "Needed a visually rich platform with strong performance.",

    solution: "Developed a responsive, performance-optimized website.",

    impact: "Improved page speed by 40% and boosted engagement.",

    tech: ["Web Design", "Responsive UI", "CMS"],

    image: "/images/food.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.pdf",
  },
];

export default function WebAppCaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center py-10 ">
      <div className="w-[86%] max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          {/* Badge */}
          <span className="inline-block mb-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-[0.18em] uppercase">
            Web App Case Studies
          </span>

          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
            Web Applications in Action:
            <span className="text-blue-600"> Scalable Digital Solutions</span>
          </h2>

          {/* Description */}
          <p className="mt-3 max-w-3xl mx-auto text-base text-gray-600 leading-relaxed">
            See how Softree designs and develops modern web applications,
            portals, and enterprise dashboards that automate workflows, improve
            efficiency, and deliver secure, high-performance experiences for
            growing businesses.
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
