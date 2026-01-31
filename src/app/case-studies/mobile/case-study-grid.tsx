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
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/Building-a-Doctor-Appointment.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Building-a-Doctor-Appointment-Booking-System-with-React.pdf",
    category: "Healthcare App",
  },
  {
    title: "Education App Backend",
    description:
      "A scalable backend system powering mobile education platforms with secure APIs and real-time data access.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/Developing-Backend-for-Education-App.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Behind-the-Scenes-of-E.pdf",
    category: "Education App",
  },
  {
    title: "Movie Ticket Booking App",
    description:
      "A mobile ticket booking application with seat selection, payment processing, and booking confirmation.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/Movie-Ticket-Booking-App.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Movie-Ticket-Booking-App-Backend-Documentation.pdf",
    category: "Entertainment App",
  },
  {
    title: "Payment Gateway Integration",
    description:
      "A secure payment gateway integration enabling seamless online transactions across mobile platforms.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/Payment-Gateway.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Payment-Gateway-1.pdf",
    category: "Fintech App",
  },
  {
    title: "Education Mobile App",
    description:
      "A student-focused mobile application providing access to courses, learning material, and assessments.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/10/Education-App-1024x1024.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Education-App.pdf",
    category: "Education App",
  },
  {
    title: "Resort Management App",
    description:
      "A hospitality mobile app for managing reservations, guest services, and resort operations.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/10/Resort-Management-1024x1024.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Resort-Management-.pdf",
    category: "Hospitality App",
  },
  {
    title: "Room Rental App",
    description:
      "A mobile rental platform allowing users to search, book, and manage short-term accommodations.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/10/Room-Rental-App-1024x1024.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Homi-App.pdf",
    category: "Real Estate App",
  },
  {
    title: "Teacher Tracking App",
    description:
      "A mobile application to track teacher performance, schedules, and academic reporting.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/10/Teacher-Tracking-App-1024x1024.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Teacher-and-Student-Report-Generation-Website.pdf",
    category: "Education App",
  },
  {
    title: "Wellkies – Doctors App",
    description:
      "A healthcare mobile app enabling doctors to manage appointments, patients, and digital consultations.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/10/Wellkies-Doctors-1024x1024.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Doctor-Document.pdf",
    category: "Healthcare App",
  },
  {
    title: "Wellkies – Clinic App",
    description:
      "A clinic management mobile app designed to streamline operations and patient interactions.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/10/Wellkies-Clinic-1024x1024.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Clinic-App.pdf",
    category: "Healthcare App",
  },
  {
    title: "Wellkies – User App",
    description:
      "A user-facing healthcare app allowing patients to book appointments and manage health records.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/10/Wellkies-user-1024x1024.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-User-App.pdf",
    category: "Healthcare App",
  },
  {
    title: "Wellkies – Website",
    description:
      "A responsive healthcare website integrated with mobile applications and backend systems.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/10/Wellkies-Website-1024x1024.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Website.pdf",
    category: "Web Platform",
  },
  {
    title: "Live Appointment Booking",
    description:
      "A real-time appointment booking system optimized for mobile users.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/LIVE-appointment-bookings.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/LIVE-appointment-bookings.docx.pdf",
    category: "Healthcare App",
  },
  {
    title: "School Stationery Shopping App",
    description:
      "A mobile commerce application for purchasing school stationery with secure checkout.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/school.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/School-Stationery-Shopping-App-Backend-Documentation.docx.pdf",
    category: "E-Commerce App",
  },
  {
    title: "Pet Care Management App",
    description:
      "A mobile app for managing pet care services, appointments, and health records.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/Petcare-management-app.webp",
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
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-blue-600">
            Mobile Development • iOS & Android
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Mobile App Case Studies: Driving Growth Through Innovation
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Discover how organizations build high-performance mobile
            applications to improve user engagement, streamline operations, and
            scale efficiently across iOS and Android platforms.
          </p>

          <div className="mx-auto mt-8 h-[2px] w-28 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        </div>

        {/* ================= CARD CONTAINER ================= */}
        <section className="relative mt-24 rounded-[48px] px-6">
          {/* ================= GRID ================= */}
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCaseStudies.slice(0, 6).map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                whileHover={{ y: -6 }}
                className="
                  group relative overflow-hidden rounded-3xl
                  bg-white border border-slate-200
                  shadow-[0_20px_40px_-20px_rgba(15,23,42,0.25)]
                  flex flex-col h-full
                  transition-all duration-300
                  hover:shadow-[0_30px_60px_-25px_rgba(15,23,42,0.35)]
                "
              >
                {/* IMAGE */}
                <motion.div
                  className="relative overflow-hidden h-[220px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                {/* CONTENT */}
                <div className="relative z-10 flex flex-1 flex-col justify-between gap-4 p-6 bg-white border-t border-slate-200">
                  {/* INDEX */}
                  <span className="pointer-events-none absolute right-4 top-2 text-[26px] font-extrabold text-black select-none">
                    {String(startIndex + index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex flex-col gap-4">
                    <span className="w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {item.category}
                    </span>

                    <h3 className="text-xl font-semibold leading-snug tracking-tight text-slate-900">
                      {item.title}
                    </h3>

                    <p className="line-clamp-3 leading-relaxed text-slate-600 text-sm">
                      {item.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    href={item.href}
                    className="
                      mt-4 inline-flex items-center justify-between
                      rounded-xl bg-blue-600
                      px-4 py-3 text-sm font-semibold text-white
                      transition-all duration-300
                      hover:bg-blue-700 hover:shadow-lg
                    "
                  >
                    View App Case Study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ================= PAGINATION ================= */}
          <div className="mt-20 flex items-center justify-center gap-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`group flex items-center gap-2 rounded-xl border px-5 py-3
                text-sm font-semibold transition-all duration-300
                ${
                  currentPage === 1
                    ? "cursor-not-allowed border-slate-200 text-slate-400"
                    : "border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
                }`}
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Prev
            </button>

            <span className="text-sm text-slate-600">
              Page{" "}
              <span className="font-semibold text-slate-900">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">{totalPages}</span>{" "}
              — Mobile Case Studies
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`group flex items-center gap-2 rounded-xl border px-5 py-3
                text-sm font-semibold transition-all duration-300
                ${
                  currentPage === totalPages
                    ? "cursor-not-allowed border-slate-200 text-slate-400"
                    : "border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
                }`}
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
