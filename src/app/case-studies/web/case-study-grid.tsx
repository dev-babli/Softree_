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
      "A scalable e-commerce web platform with product management, secure payments, and optimized checkout flow.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/Shopping-E-Commerce.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/ShoppingEcommerce.pdf",
    category: "E-Commerce Website",
  },
  {
    title: "Pet Care Management Platform",
    description:
      "A web-based system for managing pet care services, bookings, and customer interactions.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/Pet-care.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/PET_CARE.pdf",
    category: "Business Platform",
  },
  {
    title: "Business Consultation Platform",
    description:
      "A professional consultation platform enabling client management, scheduling, and service tracking.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/Business-Consultation-App.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Business-Consultation-App-case-study-1.pdf",
    category: "Enterprise Website",
  },
  {
    title: "Public Blogging Website (MERN Stack)",
    description:
      "A full-stack blogging platform built with MERN stack supporting publishing, comments, and user authentication.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/Node.js-Express.js-HTML-editor.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf",
    category: "Web Application",
  },
  {
    title: "Food & Wine Website",
    description:
      "A visually rich marketing website designed for food and beverage brands with content-focused UX.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.pdf",
    category: "Marketing Website",
  },
  {
    title: "Auto Repair Pro Website",
    description:
      "A service-based business website for automotive repair companies with appointment booking features.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/AUTOREPAIR-PRO.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/AUTOREPAIR-PRO.pdf",
    category: "Service Website",
  },
  {
    title: "EdTech Management Information System",
    description:
      "A centralized web platform for managing educational data, reporting, and administration workflows.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/EdTech-Management-Information-System.webp",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/EdTech-Management-Information-System-.pdf",
    category: "Education Platform",
  },
  {
    title: "Noteved Admin Dashboard",
    description:
      "An admin dashboard for managing users, content, and analytics within an education ecosystem.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/Noteved-Admin-1024x1024.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/NotevedAdmin.docx.pdf",
    category: "Admin Dashboard",
  },
  {
    title: "Wellkies Admin Website",
    description:
      "A healthcare admin web portal for managing clinics, doctors, and platform configurations.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/wellkies-admin-1024x1024.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Website.docx.pdf",
    category: "Healthcare Platform",
  },
  {
    title: "Live Appointment Booking Web System",
    description:
      "A real-time web-based appointment booking system built for healthcare services.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/LIVE-appointment-bookings-web.webp",
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
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* ================= HEADER ================= */}
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-blue-600">
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

          <div className="mx-auto mt-8 h-[2px] w-28 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
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
