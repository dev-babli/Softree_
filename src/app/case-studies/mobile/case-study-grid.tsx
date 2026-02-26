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
      "A feature-rich healthcare mobile application that enables patients to book appointments, manage schedules, receive real-time notifications, and access consultation details through a secure and user-friendly interface.",
    image: "/images/case-study/mobile/doctor.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Building-a-Doctor-Appointment-Booking-System-with-React.pdf",
    category: "Healthcare App",
  },
  {
    title: "Education App Backend",
    description:
      "A scalable and secure backend architecture designed to power mobile education platforms with RESTful APIs, real-time data synchronization, authentication mechanisms, and performance-optimized database management.",
    image: "/images/case-study/mobile/education.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Behind-the-Scenes-of-E.pdf",
    category: "Education App",
  },
  {
    title: "Movie Ticket Booking App",
    description:
      "A high-performance mobile ticket booking application offering seat selection, secure payment processing, real-time availability updates, and instant booking confirmations for a seamless entertainment experience.",
    image: "/images/case-study/mobile/movie.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Movie-Ticket-Booking-App-Backend-Documentation.pdf",
    category: "Entertainment App",
  },
  {
    title: "Payment Gateway Integration",
    description:
      "A secure and reliable payment gateway integration solution enabling encrypted online transactions, multi-payment support, and seamless checkout experiences across mobile platforms.",
    image: "/images/case-study/mobile/payment.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Payment-Gateway-1.pdf",
    category: "Fintech App",
  },
  {
    title: "Education Mobile App",
    description:
      "A student-centric mobile application providing access to courses, digital learning materials, assessments, and progress tracking through an intuitive and responsive user interface.",
    image: "/images/case-study/mobile/education.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Education-App.pdf",
    category: "Education App",
  },
  {
    title: "Resort Management App",
    description:
      "A hospitality-focused mobile solution designed to manage reservations, guest check-ins, service requests, and resort operations while enhancing overall customer experience.",
    image: "/images/case-study/mobile/resort.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Resort-Management-.pdf",
    category: "Hospitality App",
  },
  {
    title: "Room Rental App",
    description:
      "A real estate rental mobile platform enabling users to search properties, view details, book accommodations, and manage rental agreements through a streamlined digital experience.",
    image: "/images/case-study/mobile/room.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Homi-App.pdf",
    category: "Real Estate App",
  },
  {
    title: "Teacher Tracking App",
    description:
      "An academic performance tracking mobile application designed to monitor teacher schedules, attendance, reporting metrics, and institutional performance insights.",
    image: "/images/case-study/mobile/teacher.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Teacher-and-Student-Report-Generation-Website.pdf",
    category: "Education App",
  },
  {
    title: "Wellkies – Doctors App",
    description:
      "A healthcare mobile solution empowering doctors to manage appointments, access patient records, conduct digital consultations, and streamline clinical workflows securely.",
    image: "/images/case-study/mobile/doctor.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Doctor-Document.pdf",
    category: "Healthcare App",
  },
  {
    title: "Wellkies – Clinic App",
    description:
      "A clinic management mobile application built to optimize patient handling, appointment scheduling, billing processes, and administrative operations within healthcare facilities.",
    image: "/images/case-study/mobile/clinic.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-Clinic-App.pdf",
    category: "Healthcare App",
  },
  {
    title: "Wellkies – User App",
    description:
      "A patient-focused healthcare application allowing users to book appointments, access digital prescriptions, manage health records, and receive medical updates in real time.",
    image: "/images/case-study/mobile/user.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/09/Wellkies-User-App.pdf",
    category: "Healthcare App",
  },
  {
    title: "Live Appointment Booking",
    description:
      "A real-time mobile appointment booking system built for healthcare providers, enabling instant scheduling, automated reminders, and seamless coordination between patients and clinics.",
    image: "/images/case-study/mobile/appointment.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/LIVE-appointment-bookings.docx.pdf",
    category: "Healthcare App",
  },
  {
    title: "School Stationery Shopping App",
    description:
      "A mobile commerce application designed for purchasing school stationery products with secure checkout, order tracking, and streamlined inventory integration.",
    image: "/images/case-study/mobile/school.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/School-Stationery-Shopping-App-Backend-Documentation.docx.pdf",
    category: "E-Commerce App",
  },
  {
    title: "Pet Care Management App",
    description:
      "A lifestyle mobile application enabling pet owners to schedule services, manage pet health records, book appointments, and receive reminders for vaccinations and grooming.",
    image: "/images/case-study/mobile/pet.avif",
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
                initial="initial"
                whileHover="hover"
                className="
                   group relative h-[420px]
                   overflow-hidden
                   flex flex-col
                   bg-white
                   border border-slate-200
                   shadow-md
                   rounded-2xl
                   transition-all duration-300
                   hover:bg-slate-50
                   hover:border-blue-500
                   hover:shadow-2xl
                 "
              >
                {/* IMAGE — BIGGER */}
                <motion.div
                  variants={{
                    initial: { height: 300, opacity: 1 },
                    hover: { height: 0, opacity: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* CONTENT */}
                <div className="flex flex-col flex-1 px-5 py-4">
                  <motion.div
                    variants={{
                      initial: { y: 0 },
                      hover: { y: -10 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col"
                  >
                    <span className="text-[11px] font-medium bg-blue-50 text-blue-700 px-3 py-1 w-fit rounded-md mb-3">
                      {item.category}
                    </span>

                    <h3 className="text-base font-semibold text-slate-900 leading-snug mb-3">
                      {item.title}
                    </h3>

                    <p
                      className="
      text-sm text-slate-600
      line-clamp-2
      group-hover:line-clamp-none
      transition-all duration-300
    "
                    >
                      {item.description}
                    </p>
                  </motion.div>

                  {/* CTA — FIXED BOTTOM */}
                  <div className="mt-auto pt-4">
                    <Link
                      href={item.href}
                      target="_blank"
                      className="
                         inline-flex items-center gap-2
                         text-sm font-semibold text-blue-600
                         transition-all duration-300
                         group-hover:text-blue-700
                       "
                    >
                      View Case Study
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
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
