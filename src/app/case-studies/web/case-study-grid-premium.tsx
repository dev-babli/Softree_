"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const CUSTOM_EASE = [0.32, 0.72, 0, 1] as [number, number, number, number]

type CaseStudy = {
  title: string
  description: string
  image: string
  href: string
  highlight?: string
  category: string
}

const ITEMS_PER_PAGE = 6

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
]

export default function CaseStudyGridPremium() {
  const [currentPage, setCurrentPage] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const totalPages = Math.ceil(CASE_STUDIES.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const visibleCaseStudies = CASE_STUDIES.slice(startIndex, endIndex)

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1852FF]/15 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-[#1852FF]/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
        backgroundSize: "52px 52px",
      }} />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* ================= HEADER ================= */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: CUSTOM_EASE }}
        >
          {/* Outer Shell */}
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-[#1852FF]/10 rounded-full blur-lg" />
            <span className="relative inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1852FF] px-4 py-2 rounded-full border border-[#1852FF]/20 bg-[#1852FF]/5 backdrop-blur-sm">
              Web Development • Modern Platforms
            </span>
          </div>

          <h2 className="text-[clamp(28px,4vw,46px)] font-black tracking-tight text-white mb-4">
            Web Development Case Studies
          </h2>

          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-white/50 font-light md:text-base">
            Explore how we design and develop high-performance web platforms
            that improve user experience, streamline operations, and support
            long-term business growth.
          </p>

          <div className="mx-auto mt-6 h-[1px] w-28 bg-gradient-to-r from-transparent via-[#1852FF]/40 to-transparent" />
        </motion.div>

        {/* ================= CARD CONTAINER ================= */}
        <motion.section
          className="relative mt-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: CUSTOM_EASE }}
        >
          {/* ================= GRID ================= */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCaseStudies.slice(0, 6).map((item, index) => (
              <motion.article
                key={item.href}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.08, ease: CUSTOM_EASE }}
                className="group relative h-[450px] flex flex-col"
              >
                {/* Outer Shell */}
                <div className="relative h-full w-full bg-white/5 rounded-3xl p-1 ring-1 ring-white/10 transition-all duration-700 hover:bg-white/8 hover:ring-white/15 hover:shadow-[0_0_60px_-20px_rgba(24,82,255,0.2)]">
                  {/* Inner Core */}
                  <div className="relative h-full w-full rounded-[calc(1.5rem-0.25rem)] overflow-hidden bg-[#0a0a1a]/80 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-700 hover:bg-[#0a0a1a]/90">

                    {/* IMAGE */}
                    <motion.div
                      variants={{
                        initial: { height: 280, opacity: 1 },
                        hover: { height: 0, opacity: 0 },
                      }}
                      transition={{ duration: 0.5, ease: CUSTOM_EASE }}
                      className="overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* CONTENT */}
                    <div className="flex flex-col flex-1 px-6 py-5">
                      <motion.div
                        variants={{
                          initial: { y: 0 },
                          hover: { y: -8 },
                        }}
                        transition={{ duration: 0.4, ease: CUSTOM_EASE }}
                        className="flex flex-col"
                      >
                        {/* Category Badge */}
                        <div className="relative inline-block mb-4">
                          <div className="absolute inset-0 bg-[#1852FF]/10 rounded-md blur-md" />
                          <span className="relative text-[10px] font-semibold text-[#1852FF] px-3 py-1.5 rounded-md border border-[#1852FF]/20 bg-[#1852FF]/5 backdrop-blur-sm">
                            {item.category}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white leading-snug mb-3">
                          {item.title}
                        </h3>

                        <p className="text-sm text-white/50 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                          {item.description}
                        </p>
                      </motion.div>

                      {/* CTA */}
                      <div className="mt-auto pt-5">
                        <Link
                          href={item.href}
                          target="_blank"
                          className="group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#1852FF]/10 px-4 py-2.5 border border-[#1852FF]/20 hover:bg-[#1852FF]/20 hover:border-[#1852FF]/30 transition-all duration-500"
                        >
                          <span className="text-xs font-semibold text-[#1852FF] group-hover/cta:text-[#1852FF]">
                            View Case Study
                          </span>
                          <div className="relative h-6 w-6 rounded-full bg-[#1852FF]/20 flex items-center justify-center transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-[1px] group-hover/cta:scale-110">
                            <ArrowUpRight className="h-3 w-3 text-[#1852FF]" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ================= PAGINATION ================= */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: CUSTOM_EASE }}
          >
            {/* PREV */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`
                group relative inline-flex items-center gap-2 rounded-full px-6 py-3
                text-xs font-semibold transition-all duration-700
                ${currentPage === 1
                  ? "cursor-not-allowed bg-white/5 text-white/30 ring-1 ring-white/5"
                  : "bg-[#1852FF]/10 text-[#1852FF] ring-1 ring-[#1852FF]/20 hover:bg-[#1852FF] hover:text-white hover:ring-[#1852FF]/30 hover:shadow-[0_0_40px_-20px_rgba(24,82,255,0.3)]"
                }
              `}
            >
              <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Prev
            </button>

            {/* PAGE INFO */}
            <span className="text-sm text-white/50">
              Page{" "}
              <span className="font-semibold text-white">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-white">{totalPages}</span>
            </span>

            {/* NEXT */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`
                group relative inline-flex items-center gap-2 rounded-full px-6 py-3
                text-xs font-semibold transition-all duration-700
                ${currentPage === totalPages
                  ? "cursor-not-allowed bg-white/5 text-white/30 ring-1 ring-white/5"
                  : "bg-[#1852FF]/10 text-[#1852FF] ring-1 ring-[#1852FF]/20 hover:bg-[#1852FF] hover:text-white hover:ring-[#1852FF]/30 hover:shadow-[0_0_40px_-20px_rgba(24,82,255,0.3)]"
                }
              `}
            >
              Next
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </motion.section>
      </div>
    </section>
  )
}
