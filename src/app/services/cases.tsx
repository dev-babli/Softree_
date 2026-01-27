"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const caseStudies = [
  {
    id: "wellkies-doctor",
    accent: "#22C55E",
    categories: ["Mobile App", "Healthcare"],
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
    categories: ["Mobile App", "Clinic Management"],
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
    categories: ["Web App", "MERN Stack"],
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

export default function CaseStudiesSection() {
  return (
    <section className="bg-black text-white py-12">
      <div className="mx-auto max-w-7xl py-16 w-[86%]">
        {/* Header */}
        <div className="text-center">
          <h2 className="capitalize text-3xl lg:text-4xl leading-snug font-normal text-white">
            Building Intelligent Digital Experiences
          </h2>
          <p className="text-white/70 mx-auto text-sm mt-4 max-w-2xl">
            From strategy to execution, we help brands grow through smart,
            future-ready technology solutions.
          </p>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={40}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="relative mt-10 pb-10"
        >
          {caseStudies.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                {/* Image */}
                <div className="h-[260px] md:h-[550px] overflow-hidden rounded-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div
                  className="group relative rounded-2xl p-8 lg:p-10 overflow-hidden
             backdrop-blur-xl border border-white/10
             transition-all duration-500 hover:border-white/20"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.02) 100%)",
                  }}
                >
                  {/* Accent Glow */}
                  <div
                    className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-30 blur-3xl"
                    style={{ backgroundColor: item.accent }}
                  />

                  {/* Title */}
                  <div className="relative mb-10">
                    <h2
                      className="text-3xl lg:text-4xl font-semibold leading-tight
               bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `
        linear-gradient(
          135deg,
          #ffffff 0%,
          #e5e7eb 35%,
          ${item.accent} 100%
        )
      `,
                      }}
                    >
                      {item.title}
                    </h2>

                    {/* Accent underline */}
                    <span
                      className="absolute left-0 -bottom-3 h-[3px] w-16 rounded-full"
                      style={{ backgroundColor: item.accent }}
                    />

                    {/* Soft glow */}
                    <span
                      className="absolute left-0 -bottom-6 h-6 w-32 blur-2xl opacity-40"
                      style={{ backgroundColor: item.accent }}
                    />
                  </div>

                  {/* Timeline */}
                  <div className="relative space-y-10 pl-6">
                    {/* Vertical Line */}
                    <div className="absolute left-[6px] top-0 bottom-0 w-px bg-white/15" />

                    {/* Challenge */}
                    <div className="relative flex gap-6">
                      <div
                        className="w-3 h-3 mt-1 rounded-full"
                        style={{ backgroundColor: item.accent }}
                      />
                      <div>
                        <span className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                          The Challenge
                        </span>
                        <p className="text-white/80 text-sm leading-relaxed max-w-md">
                          {item.challenge}
                        </p>
                      </div>
                    </div>

                    {/* Innovation */}
                    <div className="relative flex gap-6">
                      <div
                        className="w-3 h-3 mt-1 rounded-full"
                        style={{ backgroundColor: item.accent }}
                      />
                      <div>
                        <span className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                          Our Innovation
                        </span>
                        <p className="text-white/80 text-sm leading-relaxed max-w-md">
                          {item.innovation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-12">
                    <span className="block text-xs uppercase tracking-widest text-white/60 mb-4">
                      Technology Stack
                    </span>

                    <div className="flex flex-wrap gap-3">
                      {item.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 rounded-full text-xs text-white
                     bg-white/10 border border-white/10
                     backdrop-blur-md transition-all duration-300
                     hover:bg-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={item.link}
                    target="_blank"
                    className="relative mt-12 inline-flex items-center gap-3
               px-7 py-3 rounded-full text-xs uppercase tracking-widest
               text-black bg-white
               transition-all duration-300
               hover:scale-[1.03] hover:bg-black hover:text-white"
                  >
                    View Case Study
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
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
