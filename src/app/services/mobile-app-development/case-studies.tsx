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

    summary:
      "Secure mobile access for doctors to manage appointments and consultations.",

    challenge:
      "Doctors needed a faster way to handle schedules, patients, and consultations.",

    solution:
      "Built a secure mobile app with quick access to calendars, records, and workflows.",

    impact: "Cut appointment handling time by 40% and boosted productivity.",

    tech: ["Mobile App Development", "Healthcare Solutions", "UI/UX Design"],

    image: "/images/1.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Doctor-Document.pdf",
  },

  {
    title: "Wellkies Clinic Management App",
    category: "Mobile App Development",

    summary:
      "Unified platform for clinic scheduling, staff, and patient operations.",

    challenge:
      "Clinics faced inefficiencies from disconnected systems and manual coordination.",

    solution:
      "Delivered a centralized app to manage schedules and daily workflows.",

    impact: "Improved efficiency by 50% and removed booking conflicts.",

    tech: ["Mobile App Development", "Clinic Management", "System Integration"],

    image: "/images/2.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Clinic-App.pdf",
  },

  {
    title: "Wellkies User Mobile App",
    category: "Mobile App Development",

    summary:
      "Simple digital access for patients to find doctors and book visits.",

    challenge: "Patients lacked an easy way to search, book, and manage care.",

    solution:
      "Created an intuitive app for bookings, profiles, and healthcare access.",

    impact: "Tripled bookings and improved patient engagement.",

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

    summary:
      "Scalable eCommerce system for stationery ordering and management.",

    challenge:
      "The client needed efficient ordering, inventory, and backend control.",

    solution:
      "Built a shopping app with strong admin tools and smooth checkout.",

    impact: "Reduced manual effort by 60% and increased order accuracy.",

    tech: ["Mobile Application Development", "eCommerce Platform"],

    image: "/images/school.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/School-Stationery-Shopping-App-Backend-Documentation.docx.pdf",
  },

  {
    title: "Live Appointment Booking App",
    category: "Mobile App Development",

    summary: "Instant booking system with real-time availability.",

    challenge: "Users wanted quick confirmations without delays or clashes.",

    solution:
      "Developed live scheduling with instant approvals and smart flows.",

    impact: "Reduced booking delays by 70% and raised satisfaction.",

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
    <section className="relative min-h-screen flex items-center py-10 ">
      <div className="w-[86%] max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          {/* Badge */}
          <span className="inline-block mb-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-[0.18em] uppercase">
            Mobile App Case Studies
          </span>

          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">
            Mobile Apps in Action:
            <span className="text-indigo-600"> Real-World Success Stories</span>
          </h2>

          {/* Description */}
          <p className="mt-3 max-w-3xl mx-auto text-base text-gray-600 leading-relaxed">
            Discover how Softree builds high-performance mobile applications
            that streamline operations, enhance user experiences, and deliver
            measurable business growth across healthcare, eCommerce, and
            enterprise solutions.
          </p>
        </div>

        <div
          className="
             h-[70vh] max-h-[680px]    
             bg-gradient-to-r from-[#eef2f7] via-[#dbe3ff] to-[#eef2f7]
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
              <SwiperSlide
                key={index}
                className="h-full flex items-center justify-center overflow-visible"
              >
                {/* ===== OUTER CLIP WRAPPER (IMPORTANT) ===== */}
                <div
                  className="relative w-full max-w-6xl rounded-[48px] overflow-hidden
                           "
                >
                  {/* ===== BORDER / GLOW ===== */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[48px]
                             ring-1 ring-white/15"
                  />

                  {/* ===== CARD BODY ===== */}
                  <div
                    className="relative rounded-[48px]
                             bg-gradient-to-r from-black via-[#0f2f7a] to-black
                             p-10"
                  >
                    {/* ===== Header ===== */}
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

                    {/* ===== Main Content ===== */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                      {/* ===== Image ===== */}
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

                      {/* ===== Text Content ===== */}
                      <div className="space-y-6">
                        {/* Problem */}
                        <div>
                          <h4 className="flex items-center gap-2 font-semibold text-white">
                            💡 Problem
                          </h4>
                          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                            {item.challenge}
                          </p>
                        </div>

                        {/* Solution */}
                        <div>
                          <h4 className="flex items-center gap-2 font-semibold text-white">
                            💡 Solution
                          </h4>
                          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                            {item.solution}
                          </p>
                        </div>

                        {/* ===== Impact ===== */}
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
                          {/* Glow */}
                          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />

                          {/* Impact text */}
                          <div className="relative z-10">
                            <p className="text-[11px] uppercase tracking-widest text-white/70 mb-1">
                              Impact
                            </p>
                            <p className="text-sm sm:text-base font-semibold leading-snug">
                              {item.impact}
                            </p>
                          </div>

                          {/* Separator */}
                          <div
                            className="
                       relative z-10
                       w-full h-px
                       sm:w-px sm:h-10
                       bg-white/30
                       rounded-full
                     "
                          />

                          {/* CTA */}
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
                         hover:shadow-lg
                         transition
                       "
                          >
                            View Case Study
                            <span className="text-sm">→</span>
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
