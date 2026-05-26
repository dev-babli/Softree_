"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

/* ================================
   CASE STUDIES DATA
================================ */
const caseStudies = [
  {
    id: "wellkies-doctor",
    accent: "#22C55E",
    title: "Wellkies Doctor Mobile App",
    image: "/images/1.png",
    link: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Doctor-Document.pdf",
    challenge:
      "Doctors struggled with scattered patient records and inefficient appointment handling.",
    innovation:
      "We built a secure mobile-first platform with real-time patient management and smart scheduling.",
    tech: ["React Native", "Node.js", "MongoDB", "AWS"],
  },
  {
    id: "wellkies-clinic",
    accent: "#0EA5E9",
    title: "Wellkies Clinic Management App",
    image: "/images/2.png",
    link: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Clinic-App.pdf",
    challenge:
      "Clinic staff relied on manual workflows for billing, appointments, and records.",
    innovation:
      "An all-in-one clinic management system with automation and analytics.",
    tech: ["React", "NestJS", "PostgreSQL", "Azure"],
  },
  {
    id: "mern-blog",
    accent: "#A855F7",
    title: "Public Blogging Website using MERN Stack",
    image: "/images/3.png",
    link: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf",
    challenge:
      "Content creators needed a fast, scalable, and SEO-friendly blogging platform.",
    innovation:
      "A modern MERN-based blog with authentication, comments, and admin controls.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
  },
];

/* ================================
   COMPONENT
================================ */
export default function CaseStudiesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-100 via-white to-zinc-100 py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold text-black">
            Building Intelligent{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Digital Experiences
            </span>
          </h2>

          <p className="text-gray-500 text-sm mt-4 max-w-2xl mx-auto">
            From strategy to execution, we help brands grow through smart,
            future-ready technology solutions.
          </p>
        </div>

        {/* ================= SLIDER ================= */}
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={40}
          loop
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {caseStudies.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* ================= IMAGE ================= */}
                <div className="h-[300px] md:h-[540px] overflow-hidden rounded-3xl shadow-xl group">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* ================= CONTENT CARD ================= */}
                <div
                  className="
                    relative
                    rounded-3xl
                    p-10 lg:p-12
                    bg-white/80
                    backdrop-blur-xl
                    border border-zinc-200
                    shadow-lg
                    hover:shadow-2xl
                    transition
                  "
                >
                  {/* accent glow */}
                  <div
                    className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20"
                    style={{ backgroundColor: item.accent }}
                  />

                  {/* TITLE */}
                  <h3
                    className="text-3xl lg:text-4xl font-semibold mb-8 bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg,#111827,#6b7280,${item.accent})`,
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* CHALLENGE + INNOVATION */}
                  <div className="space-y-8 text-sm text-gray-600">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                        The Challenge
                      </p>
                      <p>{item.challenge}</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                        Our Innovation
                      </p>
                      <p>{item.innovation}</p>
                    </div>
                  </div>

                  {/* TECH STACK */}
                  <div className="mt-10 flex flex-wrap gap-3">
                    {item.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="
                          px-4 py-2
                          rounded-full
                          text-xs
                          bg-zinc-800
                          border border-zinc-200
                          hover:bg-zinc-200
                          transition
                        "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      mt-10 inline-flex items-center gap-2
                      px-6 py-3
                      rounded-full
                      text-xs font-semibold
                      bg-black text-white
                      hover:bg-zinc-800
                      transition
                    "
                  >
                    View Case Study →
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
