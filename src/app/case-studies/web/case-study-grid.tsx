"use client";

import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Lock, X, Download, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ROIMetric = { label: string; value: string };

type CaseStudy = {
  title: string;
  description: string;
  image: string;
  href: string;
  highlight?: string;
  category: string;
  roiMetrics: ROIMetric[];
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
    roiMetrics: [
      { label: "Conversion Rate Lift", value: "+38%" },
      { label: "Checkout Drop-off Reduced", value: "52%" },
      { label: "Revenue Growth", value: "$1.2M" },
    ],
  },
  {
    title: "Pet Care Management Platform",
    description:
      "A comprehensive web-based solution for managing pet care services, online bookings, customer profiles, and service history. The platform streamlines operations while enhancing customer engagement and appointment tracking.",
    image: "/images/case-study/web/pet.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/PET_CARE.pdf",
    category: "Business Platform",
    roiMetrics: [
      { label: "Booking Efficiency", value: "+65%" },
      { label: "Manual Work Eliminated", value: "40hrs/mo" },
      { label: "Customer Retention", value: "+29%" },
    ],
  },
  {
    title: "Business Consultation Platform",
    description:
      "A professional consultation management platform designed to handle client onboarding, appointment scheduling, service tracking, and communication workflows, enabling businesses to operate efficiently and deliver premium services.",
    image: "/images/case-study/web/business.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Business-Consultation-App-case-study-1.pdf",
    category: "Enterprise Website",
    roiMetrics: [
      { label: "Client Onboarding Time", value: "-70%" },
      { label: "Operational Cost Saved", value: "$85K" },
      { label: "Staff Productivity", value: "+44%" },
    ],
  },
  {
    title: "Public Blogging Website (MERN Stack)",
    description:
      "A full-stack blogging platform developed using the MERN stack, supporting content publishing, role-based authentication, comment management, and responsive design for seamless cross-device user experience.",
    image: "/images/case-study/web/blog.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf",
    category: "Web Application",
    roiMetrics: [
      { label: "Page Load Speed", value: "-60%" },
      { label: "Monthly Active Users", value: "+120%" },
      { label: "SEO Traffic Growth", value: "+85%" },
    ],
  },
  {
    title: "Food & Wine Website",
    description:
      "A visually engaging marketing website crafted for food and beverage brands, focusing on immersive storytelling, rich media presentation, and a content-driven user experience to elevate brand identity.",
    image: "/images/case-study/web/food.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.pdf",
    category: "Marketing Website",
    roiMetrics: [
      { label: "Brand Engagement", value: "+92%" },
      { label: "Bounce Rate Reduced", value: "48%" },
      { label: "Online Inquiries", value: "+3.2x" },
    ],
  },
  {
    title: "Auto Repair Pro Website",
    description:
      "A service-oriented business website tailored for automotive repair companies, featuring service listings, online appointment booking, customer inquiry forms, and responsive design for local customer acquisition.",
    image: "/images/case-study/web/auto.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/AUTOREPAIR-PRO.pdf",
    category: "Service Website",
    roiMetrics: [
      { label: "Online Bookings", value: "+210%" },
      { label: "Local Search Rank", value: "Top 3" },
      { label: "Revenue Uplift", value: "$45K" },
    ],
  },
  {
    title: "EdTech Management Information System",
    description:
      "A centralized education management platform designed to handle student records, performance analytics, reporting, and administrative workflows, enabling institutions to streamline academic and operational processes.",
    image: "/images/case-study/web/edtech.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/EdTech-Management-Information-System-.pdf",
    category: "Education Platform",
    roiMetrics: [
      { label: "Admin Time Saved", value: "30hrs/wk" },
      { label: "Report Generation", value: "-80%" },
      { label: "Data Accuracy", value: "99.8%" },
    ],
  },
  {
    title: "Noteved Admin Dashboard",
    description:
      "A powerful admin dashboard built for managing users, educational content, analytics, and system configurations within a digital learning ecosystem, providing real-time insights and operational control.",
    image: "/images/case-study/web/noteved.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/NotevedAdmin.docx.pdf",
    category: "Admin Dashboard",
    roiMetrics: [
      { label: "Dashboard Load Time", value: "<1.2s" },
      { label: "User Management Ops", value: "-65%" },
      { label: "Content Published", value: "+4x" },
    ],
  },
  {
    title: "Wellkies Admin Website",
    description:
      "A healthcare administration portal developed to manage clinics, doctors, appointments, and platform settings. The system enhances operational efficiency and ensures secure data management within the healthcare ecosystem.",
    image: "/images/case-study/web/admin.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/Website.docx.pdf",
    category: "Healthcare Platform",
    roiMetrics: [
      { label: "Clinic Ops Efficiency", value: "+55%" },
      { label: "Data Errors Reduced", value: "91%" },
      { label: "Patient Wait Time", value: "-35%" },
    ],
  },
  {
    title: "Live Appointment Booking Web System",
    description:
      "A real-time web-based appointment scheduling system built for healthcare providers, enabling patients to book, reschedule, and manage appointments seamlessly while offering administrative control and automated notifications.",
    image: "/images/case-study/web/appointment.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/11/LIVE-appointment-bookings.docx.pdf",
    category: "Healthcare Platform",
    roiMetrics: [
      { label: "No-show Rate", value: "-42%" },
      { label: "Booking Time", value: "<2 min" },
      { label: "Staff Freed Up", value: "20hrs/wk" },
    ],
  },
];

function ROIUnlockModal({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      window.open(study.href, "_blank");
      onClose();
    }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-200" />
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest">ROI Unlock Report</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{study.title}</h3>
          <p className="text-blue-200 text-sm">Unlock the full breakdown — real metrics, real impact.</p>
        </div>

        {/* Blurred Metrics Preview */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Teased Results</p>
          <div className="grid grid-cols-3 gap-3">
            {study.roiMetrics.map((m, i) => (
              <div key={i} className="text-center p-3 bg-white rounded-xl border border-slate-200 relative overflow-hidden">
                <div className="text-lg font-bold text-blue-600 blur-sm select-none">{m.value}</div>
                <div className="text-[10px] text-slate-500 mt-1">{m.label}</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <p className="text-sm text-slate-600 mb-4">
                Enter your work email to instantly unlock the full PDF case study with detailed metrics, methodology, and ROI breakdown.
              </p>
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                <Download className="w-4 h-4" />
                Unlock Full ROI Report
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-3">No spam. Unsubscribe anytime.</p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-xl">✓</span>
              </div>
              <p className="font-semibold text-slate-900 mb-1">Opening your report...</p>
              <p className="text-sm text-slate-500">The full case study PDF is loading now.</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CaseStudyGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [unlockStudy, setUnlockStudy] = useState<CaseStudy | null>(null);

  const totalPages = Math.ceil(CASE_STUDIES.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleCaseStudies = CASE_STUDIES.slice(startIndex, endIndex);

  return (
    <section className="relative bg-white">
      <AnimatePresence>
        {unlockStudy && <ROIUnlockModal study={unlockStudy} onClose={() => setUnlockStudy(null)} />}
      </AnimatePresence>
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
            {visibleCaseStudies.slice(0, 6).map((item) => (
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

                  {/* ROI Teaser */}
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {item.roiMetrics.map((m, i) => (
                      <div key={i} className="text-center bg-blue-50 rounded-lg px-1 py-1.5">
                        <div className="text-xs font-bold text-blue-700">{m.value}</div>
                        <div className="text-[9px] text-slate-500 leading-tight">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA — FIXED BOTTOM */}
                  <div className="mt-auto pt-4 flex items-center gap-3">
                    <button
                      onClick={() => setUnlockStudy(item)}
                      className="
                inline-flex items-center gap-2
                text-sm font-semibold text-blue-600
                transition-all duration-300
                group-hover:text-blue-700
              "
                    >
                      <Lock className="h-3.5 w-3.5" />
                      Unlock Full Report
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
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
      ${currentPage === 1
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
      ${currentPage === totalPages
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
