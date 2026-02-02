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
    challenge:
      "Educational institutions lacked a centralized system to manage students, courses, administration, and reporting efficiently.",
    solution:
      "Developed a comprehensive EdTech management web application to handle academic operations, user management, and analytics.",
    tech: ["Web Application", "EdTech Solutions", "System Management"],
    image: "/images/edtech.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/EdTech-Management-Information-System-.pdf",
  },
  {
    title: "Noteved Admin Web Portal",
    category: "Web App Development",
    challenge:
      "Administrators needed a secure platform to manage users, content, and platform operations efficiently.",
    solution:
      "Built an admin-focused web portal enabling centralized control over users, content, and system configurations.",
    tech: ["Admin Dashboard", "Web Management", "Role-Based Access"],
    image: "/images/education.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/NotevedAdmin.docx.pdf",
  },
  {
    title: "Wellkies Admin Web Application",
    category: "Web App Development",
    challenge:
      "Healthcare platforms required an internal admin system to manage users, services, and operational data securely.",
    solution:
      "Developed a robust admin web application to manage healthcare workflows, users, and system configurations.",
    tech: ["Web Application", "Admin Panel", "Healthcare Platform"],
    image: "/images/2.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Website.docx.pdf",
  },
  {
    title: "Public Blogging Website using MERN Stack",
    category: "Web App Development",
    challenge:
      "Content creators needed a scalable platform to publish, manage, and engage users with blog content securely.",
    solution:
      "Developed a full-stack public blogging web application using the MERN stack with authentication, content management, and responsive design.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    image: "/images/3.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf",
  },
  {
    title: "Food & Wine Website",
    category: "Web App Development",
    challenge:
      "The client required a visually rich platform to showcase food and wine content with smooth navigation and performance.",
    solution:
      "Built a modern, responsive food and wine website focusing on aesthetics, performance optimization, and user engagement.",
    tech: ["Web Design", "Responsive UI", "Content Management"],
    image: "/images/food.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.pdf",
  },
];

export default function WebAppCaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section
      className="relative py-12 
  overflow-hidden"
    >
      <div className="relative w-[86%] max-w-7xl mx-auto text-white">
        {/* HEADER */}
        <div className="text-center mb-20">
          {/* Eyebrow */}
          <span className="inline-block mb-4 text-xs font-semibold tracking-[0.25em] uppercase text-blue-600">
            Case Studies
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Web Applications in Action:{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Real-World Case Studies
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-2xl mx-auto text-base text-gray-600 leading-relaxed">
            Explore how Softree builds high-performance, scalable web
            applications that solve real business challenges.
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
                              Explore web app solutions →
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
