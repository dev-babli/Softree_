"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type CaseStudy = {
  title: string;
  description: string;
  image: string;
  href: string;
  highlight?: string;
  category: string;
};

const ITEMS_PER_PAGE = 6;

const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Doctor Appointment Booking System",
    description:
      "A mobile application enabling patients to book appointments, manage schedules, and receive real-time notifications.",
    image:
      "/images/case-study/mobile/doctor.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Building-a-Doctor-Appointment-Booking-System-with-React.pdf",
    category: "Healthcare App",
  },
  {
    title: "Education App Backend",
    description:
      "A scalable backend system powering mobile education platforms with secure APIs and real-time data access.",
    image:
      "/images/case-study/mobile/education.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Behind-the-Scenes-of-E.pdf",
    category: "Education App",
  },
  {
    title: "Movie Ticket Booking App",
    description:
      "A mobile ticket booking application with seat selection, payment processing, and booking confirmation.",
    image:
      "/images/case-study/mobile/movie.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Movie-Ticket-Booking-App-Backend-Documentation.pdf",
    category: "Entertainment App",
  },
  {
    title: "Payment Gateway Integration",
    description:
      "A secure payment gateway integration enabling seamless online transactions across mobile platforms.",
    image:
      "/images/case-study/mobile/payment.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Payment-Gateway-1.pdf",
    category: "Fintech App",
  },
  {
    title: "Education Mobile App",
    description:
      "A student-focused mobile application providing access to courses, learning material, and assessments.",
    image:
      "/images/case-study/mobile/education.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Education-App.pdf",
    category: "Education App",
  },
  {
    title: "Resort Management App",
    description:
      "A hospitality mobile app for managing reservations, guest services, and resort operations.",
    image:
      "/images/case-study/mobile/resort.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Resort-Management-.pdf",
    category: "Hospitality App",
  },
  {
    title: "Room Rental App",
    description:
      "A mobile rental platform allowing users to search, book, and manage short-term accommodations.",
    image:
      "/images/case-study/mobile/room.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Homi-App.pdf",
    category: "Real Estate App",
  },
  {
    title: "Teacher Tracking App",
    description:
      "A mobile application to track teacher performance, schedules, and academic reporting.",
    image:
      "/images/case-study/mobile/teacher.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Teacher-and-Student-Report-Generation-Website.pdf",
    category: "Education App",
  },
  {
    title: "Wellkies – Doctors App",
    description:
      "A healthcare mobile app enabling doctors to manage appointments, patients, and digital consultations.",
    image:
      "/images/case-study/mobile/doctor.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Doctor-Document.pdf",
    category: "Healthcare App",
  },
  {
    title: "Wellkies – Clinic App",
    description:
      "A clinic management mobile app designed to streamline operations and patient interactions.",
    image:
      "/images/case-study/mobile/clinic.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Clinic-App.pdf",
    category: "Healthcare App",
  },
  {
    title: "Wellkies – User App",
    description:
      "A user-facing healthcare app allowing patients to book appointments and manage health records.",
    image:
      "/images/case-study/mobile/user.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-User-App.pdf",
    category: "Healthcare App",
  },
 
  {
    title: "Live Appointment Booking",
    description:
      "A real-time appointment booking system optimized for mobile users.",
    image:
      "/images/case-study/mobile/appointment.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/LIVE-appointment-bookings.docx.pdf",
    category: "Healthcare App",
  },
  {
    title: "School Stationery Shopping App",
    description:
      "A mobile commerce application for purchasing school stationery with secure checkout.",
    image:
      "/images/case-study/mobile/school.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/School-Stationery-Shopping-App-Backend-Documentation.docx.pdf",
    category: "E-Commerce App",
  },
  {
    title: "Pet Care Management App",
    description:
      "A mobile app for managing pet care services, appointments, and health records.",
    image:
      "/images/case-study/mobile/pet.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Pet-Care-Management-App.pdf",
    category: "Lifestyle App",
  },
];

export default function CaseStudyGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(CASE_STUDIES.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleCaseStudies = CASE_STUDIES.slice(startIndex, endIndex);

  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* ================= HEADER ================= */}
        <div className="mb-2 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-blue-600">
            Mobile Development • iOS & Android
          </span>

          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Mobile App Case Studies
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Discover how organizations build high-performance mobile
            applications to improve user engagement, streamline operations, and
            scale efficiently across iOS and Android platforms.
          </p>

          <div className="mx-auto mt-2 h-[2px] w-28 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        </div>

        {/* ================= CARD CONTAINER ================= */}
        <section
          className="
    relative mt-3 rounded-[48px]  
    px-6 "
        >
          {/* ================= GRID ================= */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCaseStudies.slice(0, 6).map((item, index) => (
              <motion.article
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: index * 0.06,
                }}
                whileHover={{ y: -4 }}
                className="
        group relative flex flex-col h-full
        bg-white
        border border-slate-200
        shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)]
        transition-all duration-300
        hover:shadow-[0_30px_70px_-40px_rgba(15,23,42,0.35)]
      "
              >
                {/* ===== IMAGE ===== */}
                <div className="relative h-[180px] overflow-hidden group">
                  {/* subtle image base */}
                  <div className="absolute inset-0 bg-slate-100" />

                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="relative h-full w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />

                  {/* light overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
                {/* ===== CONTENT ===== */}
                <div className="relative z-10 flex flex-1 flex-col justify-between gap-4 px-5 py-4">
                  {/* INDEX */}
                  <span
                    className="
            pointer-events-none absolute right-4 top-2
            text-[22px] font-extrabold text-slate-300
            select-none
          "
                  >
                    {String(startIndex + index + 1).padStart(2, "0")}
                  </span>

                  {/* TEXT */}
                  <div className="flex flex-col gap-3">
                    <span
                      className="
            w-fit
            bg-blue-50 text-blue-700
            px-3 text-[11px] font-medium
          "
                    >
                      {item.category}
                    </span>

                    <h3 className="text-lg font-semibold leading-snug text-slate-900">
                      {item.title}
                    </h3>

                    <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    href={item.href}
                    target="_blank"
                    className="
           inline-flex items-center justify-between
            bg-blue-600
            px-4 py-2.5
            text-sm font-semibold text-white
            transition-all duration-300
            hover:bg-blue-700
          "
                  >
                    View Case Study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ================= PAGINATION ================= */}
          <div className="mt-4 flex items-center justify-center gap-6">
            {/* PREV */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`
      group flex items-center gap-2 rounded-xl px-5 py-3
      text-sm font-semibold transition-all duration-300
      ${
        currentPage === 1
          ? "cursor-not-allowed bg-slate-100 text-slate-400"
          : "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-md"
      }
    `}
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Prev
            </button>

            {/* PAGE INFO */}
            <span className="text-sm text-slate-600">
              Page{" "}
              <span className="font-semibold text-slate-900">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">{totalPages}</span>
            </span>

            {/* NEXT */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`
      group flex items-center gap-2 rounded-xl px-5 py-3
      text-sm font-semibold transition-all duration-300
      ${
        currentPage === totalPages
          ? "cursor-not-allowed bg-slate-100 text-slate-400"
          : "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-md"
      }
    `}
            >
              Next
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
