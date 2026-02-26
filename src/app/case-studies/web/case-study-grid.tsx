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
    title: "Shopping E-Commerce Platform",
    description:
      "A scalable and high-performance e-commerce web platform featuring advanced product management, secure payment gateway integration, inventory tracking, and an optimized checkout experience to maximize conversions and user satisfaction.",
    image: "/images/case-study/web/shopping.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ShoppingEcommerce.pdf",
    category: "E-Commerce Website",
  },
  {
    title: "Pet Care Management Platform",
    description:
      "A comprehensive web-based solution for managing pet care services, online bookings, customer profiles, and service history. The platform streamlines operations while enhancing customer engagement and appointment tracking.",
    image: "/images/case-study/web/pet.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/PET_CARE.pdf",
    category: "Business Platform",
  },
  {
    title: "Business Consultation Platform",
    description:
      "A professional consultation management platform designed to handle client onboarding, appointment scheduling, service tracking, and communication workflows, enabling businesses to operate efficiently and deliver premium services.",
    image: "/images/case-study/web/business.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Business-Consultation-App-case-study-1.pdf",
    category: "Enterprise Website",
  },
  {
    title: "Public Blogging Website (MERN Stack)",
    description:
      "A full-stack blogging platform developed using the MERN stack, supporting content publishing, role-based authentication, comment management, and responsive design for seamless cross-device user experience.",
    image: "/images/case-study/web/blog.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf",
    category: "Web Application",
  },
  {
    title: "Food & Wine Website",
    description:
      "A visually engaging marketing website crafted for food and beverage brands, focusing on immersive storytelling, rich media presentation, and a content-driven user experience to elevate brand identity.",
    image: "/images/case-study/web/food.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.pdf",
    category: "Marketing Website",
  },
  {
    title: "Auto Repair Pro Website",
    description:
      "A service-oriented business website tailored for automotive repair companies, featuring service listings, online appointment booking, customer inquiry forms, and responsive design for local customer acquisition.",
    image: "/images/case-study/web/auto.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/AUTOREPAIR-PRO.pdf",
    category: "Service Website",
  },
  {
    title: "EdTech Management Information System",
    description:
      "A centralized education management platform designed to handle student records, performance analytics, reporting, and administrative workflows, enabling institutions to streamline academic and operational processes.",
    image: "/images/case-study/web/edtech.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/EdTech-Management-Information-System-.pdf",
    category: "Education Platform",
  },
  {
    title: "Noteved Admin Dashboard",
    description:
      "A powerful admin dashboard built for managing users, educational content, analytics, and system configurations within a digital learning ecosystem, providing real-time insights and operational control.",
    image: "/images/case-study/web/noteved.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/NotevedAdmin.docx.pdf",
    category: "Admin Dashboard",
  },
  {
    title: "Wellkies Admin Website",
    description:
      "A healthcare administration portal developed to manage clinics, doctors, appointments, and platform settings. The system enhances operational efficiency and ensures secure data management within the healthcare ecosystem.",
    image: "/images/case-study/web/admin.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Website.docx.pdf",
    category: "Healthcare Platform",
  },
  {
    title: "Live Appointment Booking Web System",
    description:
      "A real-time web-based appointment scheduling system built for healthcare providers, enabling patients to book, reschedule, and manage appointments seamlessly while offering administrative control and automated notifications.",
    image: "/images/case-study/web/appointment.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/LIVE-appointment-bookings.docx.pdf",
    category: "Healthcare Platform",
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
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* ================= HEADER ================= */}
        <div className="mb-10 text-center">
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-blue-600">
            Web Development • Modern Platforms
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Web Development Case Studies
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Explore how we design and develop high-performance web platforms
            that improve user experience, streamline operations, and support
            long-term business growth.
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
