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
      "A secure mobile platform helping doctors manage appointments and patient consultations on the go.",

    challenge:
      "Doctors needed a streamlined mobile solution to manage appointments, patient records, and consultations efficiently.",

    solution:
      "Developed a dedicated doctor-facing mobile application with secure access to schedules, patient details, and consultation workflows.",

    impact:
      "Reduced appointment handling time by 40% and improved doctor productivity with faster patient access.",

    tech: ["Mobile App Development", "Healthcare Solutions", "UI/UX Design"],

    image: "/images/1.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Doctor-Document.pdf",
  },

  {
    title: "Wellkies Clinic Management App",
    category: "Mobile App Development",

    summary:
      "Centralized clinic operations with scheduling, staff coordination, and patient tracking in one app.",

    challenge:
      "Clinics struggled to coordinate doctors, appointments, and patient data across disconnected systems.",

    solution:
      "Built a clinic management mobile app to handle scheduling, staff coordination, and operational workflows from one platform.",

    impact:
      "Improved operational efficiency by 50% and eliminated manual scheduling conflicts.",

    tech: ["Mobile App Development", "Clinic Management", "System Integration"],

    image: "/images/2.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Clinic-App.pdf",
  },

  {
    title: "Wellkies User Mobile App",
    category: "Mobile App Development",

    summary:
      "A patient-friendly app for booking doctors, managing profiles, and accessing healthcare digitally.",

    challenge:
      "Patients lacked a simple way to discover doctors, book appointments, and manage their healthcare digitally.",

    solution:
      "Designed a user-centric mobile app enabling appointment booking, profile management, and seamless healthcare access.",

    impact:
      "Increased appointment bookings by 3× and enhanced patient engagement across the platform.",

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
      "A scalable eCommerce solution for managing school stationery orders and backend operations.",

    challenge:
      "The client needed a scalable eCommerce platform to manage school stationery products with smooth ordering and backend operations.",

    solution:
      "Developed a full-featured shopping application with a robust backend system, enabling efficient product management, order processing, and seamless user experience.",

    impact:
      "Automated inventory and order processing, reducing manual workload by 60% and improving order accuracy.",

    tech: ["Mobile Application Development", "eCommerce Platform"],

    image: "/images/school.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/School-Stationery-Shopping-App-Backend-Documentation.docx.pdf",
  },

  {
    title: "Live Appointment Booking App",
    category: "Mobile App Development",

    summary:
      "Real-time booking platform with instant confirmations and zero scheduling conflicts.",

    challenge:
      "Users needed a real-time solution to book appointments without delays, manual confirmations, or scheduling conflicts.",

    solution:
      "Developed a live appointment booking mobile application with real-time availability, instant confirmations, and streamlined booking flows.",

    impact:
      "Reduced booking delays by 70% and improved customer satisfaction with instant confirmations.",

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
