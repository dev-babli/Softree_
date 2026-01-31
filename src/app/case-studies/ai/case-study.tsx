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
    title: "AI-Powered E-Commerce Recommendation Engine",
    description:
      "A machine learning–driven recommendation system that personalizes product discovery and boosts conversion rates.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/Shopping-E-Commerce.webp",
    href:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/ShoppingEcommerce.pdf",
    category: "AI Recommendation System",
  },
  {
    title: "AI-Based Customer Support Automation",
    description:
      "An intelligent customer support system using LLM-powered chatbots and automated ticket routing.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/Pet-care.webp",
    href:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/PET_CARE.pdf",
    category: "Generative AI",
  },
  {
    title: "Enterprise AI Decision Intelligence Platform",
    description:
      "An AI-driven analytics platform delivering predictive insights and real-time decision support.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/Business-Consultation-App.webp",
    href:
      "https://www.softreetechnology.com/wp-content/uploads/2024/12/Business-Consultation-App-case-study-1.pdf",
    category: "Enterprise AI",
  },
  {
    title: "AI Knowledge Assistant (RAG Architecture)",
    description:
      "A retrieval-augmented generation system enabling natural-language search across enterprise knowledge bases.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/Node.js-Express.js-HTML-editor.webp",
    href:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/Public-Blogging-Website-Using-the-MERN-Stack.pdf",
    category: "RAG & LLM",
  },
  {
    title: "AI Marketing Intelligence Platform",
    description:
      "An AI-powered platform that analyzes customer behavior and optimizes marketing campaigns automatically.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.webp",
    href:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/FOOD-WINE-WEBSITE.pdf",
    category: "AI Analytics",
  },
  {
    title: "Predictive Maintenance AI System",
    description:
      "A machine learning solution that predicts equipment failures and reduces downtime in industrial environments.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/AUTOREPAIR-PRO.webp",
    href:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/AUTOREPAIR-PRO.pdf",
    category: "Machine Learning",
  },
  {
    title: "AI-Driven Education Intelligence Platform",
    description:
      "An AI-powered education platform delivering performance analytics and adaptive learning insights.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/EdTech-Management-Information-System.webp",
    href:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/EdTech-Management-Information-System-.pdf",
    category: "AI for Education",
  },
  {
    title: "AI Operations & Monitoring Dashboard",
    description:
      "A centralized dashboard for monitoring AI models, pipelines, and system performance in production.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/Noteved-Admin-1024x1024.jpg",
    href:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/NotevedAdmin.docx.pdf",
    category: "AI Ops",
  },
  {
    title: "Healthcare AI Appointment Intelligence",
    description:
      "An AI-enhanced scheduling system that predicts no-shows and optimizes appointment availability.",
    image:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/LIVE-appointment-bookings-web.webp",
    href:
      "https://www.softreetechnology.com/wp-content/uploads/2024/11/LIVE-appointment-bookings.docx.pdf",
    category: "Healthcare AI",
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
            Artificial Intelligence • Generative AI
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            AI Case Studies: Building Intelligent, Scalable Systems
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Explore how we design and deploy AI-powered platforms that automate
            workflows, enhance decision-making, and deliver measurable business
            impact.
          </p>

          <div className="mx-auto mt-8 h-[2px] w-28 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        </div>

        {/* ================= CARD CONTAINER ================= */}
        <section className="relative mt-24 rounded-[48px] px-6">
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCaseStudies.map((item, index) => (
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

                <div className="relative z-10 flex flex-1 flex-col justify-between gap-4 p-6 bg-white border-t border-slate-200">
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
                    View AI Case Study
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
              — AI Case Studies
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
