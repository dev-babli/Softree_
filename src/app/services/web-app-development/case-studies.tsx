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
      "A centralized academic platform to manage students, courses, and institutional operations.",

    challenge:
      "Educational institutions lacked a centralized system to manage students, courses, administration, and reporting efficiently.",

    solution:
      "Developed a comprehensive EdTech management web application to handle academic operations, user management, and analytics.",

    impact:
      "Reduced manual administrative work by 60% and improved reporting accuracy with real-time dashboards.",

    tech: ["Web Application", "EdTech Solutions", "System Management"],

    image: "/images/edtech.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/EdTech-Management-Information-System-.pdf",
  },

  {
    title: "Noteved Admin Web Portal",
    category: "Web App Development",

    summary:
      "A secure admin dashboard for managing users, content, and platform operations from one place.",

    challenge:
      "Administrators needed a secure platform to manage users, content, and platform operations efficiently.",

    solution:
      "Built an admin-focused web portal enabling centralized control over users, content, and system configurations.",

    impact:
      "Improved operational efficiency by 45% with faster management and reduced manual processes.",

    tech: ["Admin Dashboard", "Web Management", "Role-Based Access"],

    image: "/images/education.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/NotevedAdmin.docx.pdf",
  },

  {
    title: "Wellkies Admin Web Application",
    category: "Web App Development",

    summary:
      "An internal healthcare admin system for managing workflows, users, and services securely.",

    challenge:
      "Healthcare platforms required an internal admin system to manage users, services, and operational data securely.",

    solution:
      "Developed a robust admin web application to manage healthcare workflows, users, and system configurations.",

    impact:
      "Enabled centralized control and reduced operational delays by 50% across departments.",

    tech: ["Web Application", "Admin Panel", "Healthcare Platform"],

    image: "/images/2.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Website.docx.pdf",
  },

  {
    title: "Public Blogging Website using MERN Stack",
    category: "Web App Development",

    summary:
      "A scalable full-stack blogging platform with authentication and content management.",

    challenge:
      "Content creators needed a scalable platform to publish, manage, and engage users with blog content securely.",

    solution:
      "Developed a full-stack public blogging web application using the MERN stack with authentication, content management, and responsive design.",

    impact:
      "Handled thousands of concurrent users with optimized performance and increased engagement by 3×.",

    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],

    image: "/images/3.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf",
  },

  {
    title: "Food & Wine Website",
    category: "Web App Development",

    summary:
      "A visually rich content-driven website delivering immersive food and wine experiences.",

    challenge:
      "The client required a visually rich platform to showcase food and wine content with smooth navigation and performance.",

    solution:
      "Built a modern, responsive food and wine website focusing on aesthetics, performance optimization, and user engagement.",

    impact:
      "Improved page speed by 40% and boosted user engagement with higher session durations.",

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
