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
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/EdTech-Management-Information-System.webp",
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
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/Noteved-Admin-1024x1024.jpg",
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
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/wellkies-admin-1024x1024.jpg",
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
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/Node.js-Express.js-HTML-editor.webp",
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
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.pdf",
  },
];

export default function WebAppCaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section
      className="relative py-12 bg-gradient-to-b from-black via-[#020d1a] to-black
  overflow-hidden"
    >
      <div className="relative w-[86%] max-w-7xl mx-auto text-white">
        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-block mb-3 text-xs tracking-widest uppercase text-gray-400">
            Case Studies
          </span>

          <h2 className="text-3xl lg:text-4xl font-normal">
            Web Applications in Action: Real-World Case Studies
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-sm text-white/65">
            Explore how Softree builds high-performance, scalable web
            applications that solve real business challenges.
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
                        <span className="text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full bg-black/70 border border-white/20 text-white">
                          {item.category}
                        </span>
                        <span className="text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full bg-black border border-white/15 text-white">
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
                            router.push("/case-studies/web");
                          }}
                          className="group relative px-8 sm:px-10 py-3 rounded-full bg-black text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white border border-white/20 transition-all duration-300 hover:border-white/40 whitespace-nowrap"
                        >
                          <span className="relative flex items-center gap-3">
                            Explore web app solutions
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
        </div>
      </div>
    </section>
  );
}
