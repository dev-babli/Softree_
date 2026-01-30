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
    title: "Live Appointment Booking Mobile App",
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
        <div className="text-center mb-14">
          <span className="inline-block mb-3 text-xs tracking-widest uppercase text-gray-400">
            Case Studies
          </span>

          <h2 className="text-3xl lg:text-4xl font-normal">
            Mobile Apps in Action: Real-World Success Stories
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-sm text-white/65">
            Discover how Softree designs and develops high-performance mobile
            applications that deliver seamless user experiences and measurable
            business impact.
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
                  className="relative w-full h-full flex group"
                >
                  {/* CARD */}
                  <div
                    className="relative w-full h-full rounded-3xl  bg-gradient-to-br
from-[#0f0f10] via-[#2a2a2d] to-[#0b0b0c] backdrop-blur-2xl shadow-[0_60px_140px_rgba(0,0,0,0.75)] flex flex-col md:flex-row"
                  >
                    {/* IMAGE */}
                    <div className="relative md:w-1/2 flex items-center justify-center p-10">
                      {/* IMAGE WRAPPER */}
                      <div className="relative w-full max-w-md aspect-[4/3] min-h-[490px] rounded-2xl overflow-hidden border border-white/20 shadow-xl group">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        />

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/20 to-transparent" />

                        {/* BADGES */}
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-[0.3em] px-3 py-1 rounded-full bg-black/70 border border-white/20 text-white">
                            {item.category}
                          </span>
                          
                        </div>
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
                            router.push("/case-studies/mobile");
                          }}
                          className="group relative px-8 sm:px-10 py-3 rounded-full bg-black text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white border border-white/20 transition-all duration-300 hover:border-white/40 whitespace-nowrap"
                        >
                          <span className="relative flex items-center gap-3">
                            Explore mobile app solutions
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

              {/* TOTAL — becomes active on last slide */}
              <span
                className={`text-sm tracking-widest transition-all duration-300 ${
                  activeIndex === caseStudies.length - 1
                    ? "text-white scale-110"
                    : "text-white/40"
                }`}
              >
                / {String(caseStudies.length).padStart(2, "0")}
              </span>
            </div>

            {/* Progress bar */}
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
