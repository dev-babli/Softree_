"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";

import "swiper/css";

const caseStudies = [
  {
    title: "Wellkies Doctor Mobile App",
    category: "Mobile App Development",
    challenge:
      "Doctors needed a streamlined mobile solution to manage appointments, patient records, and consultations efficiently.",
    solution:
      "Developed a dedicated doctor-facing mobile application with secure access to schedules, patient details, and consultation workflows.",
    tech: ["Mobile App Development", "Healthcare Solutions", "UI/UX Design"],
    image: "/images/1.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Doctor-Document.pdf",
  },
  {
    title: "Wellkies Clinic Management App",
    category: "Mobile App Development",
    challenge:
      "Clinics struggled to coordinate doctors, appointments, and patient data across disconnected systems.",
    solution:
      "Built a clinic management mobile app to handle scheduling, staff coordination, and operational workflows from one platform.",
    tech: ["Mobile App Development", "Clinic Management", "System Integration"],
    image: "/images/2.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Clinic-App.pdf",
  },
  {
    title: "Wellkies User Mobile App",
    category: "Mobile App Development",
    challenge:
      "Patients lacked a simple way to discover doctors, book appointments, and manage their healthcare digitally.",
    solution:
      "Designed a user-centric mobile app enabling appointment booking, profile management, and seamless healthcare access.",
    tech: [
      "Mobile App Development",
      "Patient Experience",
      "Secure Authentication",
    ],
    image: "/images/wellkies.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-User-App.pdf",
  },
  {
    title: "School Stationery Shopping App",
    category: "Web & Mobile Solutions",
    challenge:
      "The client needed a scalable eCommerce platform to manage school stationery products with smooth ordering and backend operations.",
    solution:
      "Developed a full-featured shopping application with a robust backend system, enabling efficient product management, order processing, and seamless user experience.",
    tech: ["Mobile Application Development", "eCommerce Platform"],
    image: "/images/school.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/School-Stationery-Shopping-App-Backend-Documentation.docx.pdf",
  },

  {
    title: "Live Appointment Booking App",
    category: "Mobile App Development",
    challenge:
      "Users needed a real-time solution to book appointments without delays, manual confirmations, or scheduling conflicts.",
    solution:
      "Developed a live appointment booking mobile application with real-time availability, instant confirmations, and streamlined booking flows.",
    tech: ["Mobile App Development", "Real-Time Booking", "UI/UX Design"],
    image: "/images/appointment.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/LIVE-appointment-bookings.docx.pdf",
  },
];

export default function MobileAppCaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section className="relative py-12 overflow-hidden">
      <div className="relative w-[86%] max-w-7xl mx-auto text-white">
        {/* HEADER */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          {/* Small label */}
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500">
            Case Studies
          </span>

          {/* Title */}
          <h2 className="mt-4 text-3xl lg:text-5xl font-extrabold leading-tight text-black">
            Mobile Apps in Action:{" "}
            <span className="text-cyan-600">Real-World Success Stories</span>
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-base leading-relaxed">
            Discover how{" "}
            <span className="font-semibold text-black">Softree</span> designs
            and develops high-performance mobile applications that deliver
            seamless user experiences and measurable business impact.
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
