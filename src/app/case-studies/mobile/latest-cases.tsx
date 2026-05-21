"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, TrendingUp, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================
   CASE STUDIES DATA
========================= */

const caseStudies = [
  {
    title: "Doctor Appointment System",
    description:
      "A mobile application enabling patients to book appointments, manage schedules, and receive real-time notifications.",
    image:
      "/images/case-study/mobile/doctor.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Building-a-Doctor-Appointment-Booking-System-with-React.pdf",
    category: "Healthcare App",
    challenge:
      "Patients faced difficulties scheduling appointments due to manual processes, limited doctor availability visibility, and lack of automated reminders.",
    solution:
      "Developed a responsive mobile application with real-time appointment scheduling, calendar integration, push notifications, and admin dashboard for doctors.",
    result:
      "Reduced booking time by 60%, improved patient engagement, and streamlined clinic scheduling operations.",
  },
  {
    title: "Education App Backend",
    description:
      "A scalable backend system powering mobile education platforms with secure APIs and real-time data access.",
    image:
      "/images/case-study/mobile/education.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Behind-the-Scenes-of-E.pdf",
    category: "Education App",
    challenge:
      "The education platform required a robust backend capable of handling large user traffic, secure authentication, and real-time data updates.",
    solution:
      "Designed a scalable backend architecture using secure REST APIs, role-based access control, and optimized database management for high performance.",
    result:
      "Enabled seamless real-time learning access, improved platform reliability, and supported thousands of concurrent users.",
  },
  {
    title: "Movie Ticket Booking App",
    description:
      "A mobile ticket booking application with seat selection, payment processing, and booking confirmation.",
    image:
      "/images/case-study/mobile/movie.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Movie-Ticket-Booking-App-Backend-Documentation.pdf",
    category: "Entertainment App",
    challenge:
      "Users experienced booking conflicts and seat availability issues due to lack of real-time synchronization across theaters.",
    solution:
      "Built a real-time booking engine with dynamic seat mapping, secure payment integration, and automated confirmation system.",
    result:
      "Improved booking efficiency, minimized double bookings, and enhanced overall user experience.",
  },
  
  {
    title: "Education Mobile App",
    description:
      "A student-focused mobile application providing access to courses, learning material, and assessments.",
    image:
      "/images/case-study/mobile/education.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Education-App.pdf",
    category: "Education App",
    challenge:
      "Students lacked a centralized digital platform for accessing study materials, assignments, and performance tracking.",
    solution:
      "Developed a mobile learning application with interactive content modules, assessment tracking, and personalized dashboards.",
    result:
      "Improved student engagement, increased course completion rates, and streamlined digital learning delivery.",
  },
];

export default function MobileCaseStudies() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % caseStudies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const study = caseStudies[index];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-6 text-left max-w-3xl">
          <span
            className="inline-block px-4 py-1.5 rounded-full  bg-gradient-to-r
      from-blue-600
      via-cyan-500
      to-blue-600
      bg-clip-text
      text-transparent text-xs font-semibold uppercase tracking-wider border border-purple-500/20"
          >
            Featured
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-black leading-tight">
            Featured Mobile App{" "}
            <span
              className=" bg-gradient-to-r
      from-blue-600
      via-cyan-500
      to-blue-600    
      text-transparent bg-clip-text "
            >
              Success Stories
            </span>
          </h2>

          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            Discover how we design and develop powerful mobile applications that
            deliver seamless user experiences, real-time performance, and
            scalable backend systems across healthcare, fintech, education, and
            entertainment.
          </p>
        </div>
        {/* ================= SLIDER ================= */}
        <div className="relative overflow-hidden">
          <div className="relative h-[520px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                exit={{ x: -1000 }}
                transition={{
                  duration: 0.7,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute inset-0 grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-black via-zinc-900 to-gray-800 rounded-3xl border border-slate-200 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.25)] p-10"
              >
                {/* LEFT CONTENT */}
                <div className="space-y-6 md:pr-10 md:border-r md:border-white/10">
                  <span className="inline-block text-[11px] uppercase tracking-widest text-blue-400 font-semibold">
                    Mobile App Case Study
                  </span>

                  <h2 className="text-2xl md:text-3xl font-semibold text-white leading-snug">
                    {study.title}
                  </h2>

                  <div className="w-14 h-px bg-gradient-to-r from-blue-500 via-blue-400/40 to-transparent"></div>

                  <div className="space-y-5 pt-2">
                    {/* Challenge */}
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                        <AlertTriangle size={15} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-semibold text-red-400 uppercase tracking-wider">
                          Challenge
                        </h4>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>
                    </div>
                    {/* Solution */}
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <Lightbulb size={15} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                          Solution
                        </h4>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Result */}
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                        <TrendingUp size={15} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">
                          Results
                        </h4>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">
                          {study.result}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={study.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2  bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-600/30"
                  >
                    View Full Case Study
                    <span className="text-lg">→</span>
                  </Link>
                </div>

                {/* RIGHT IMAGE */}
                <div>
                  <Image
                    src={study.image}
                    alt={study.title}
                    width={1000}
                    height={600}
                    className="w-full h-[420px] object-cover rounded-2xl"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
