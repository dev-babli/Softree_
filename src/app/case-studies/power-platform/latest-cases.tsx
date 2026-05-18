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
    title: "Barcode Scanner App",
    description:
      "A Power Apps barcode scanner solution designed to simplify inventory management with real-time scanning and automated data capture.",
    image: "/images/case-study/power-apps/barcode.png",
    href: "/pdf/Barcode Scanner App.pdf",
    challenge:
      "Manual inventory tracking caused delays and frequent stock inaccuracies.",
    solution:
      "Built a real-time barcode scanning Power App integrated with SharePoint and Dataverse.",
    result:
      "Improved inventory accuracy and reduced stock processing time significantly.",
  },

  {
    title: "ES Speaks & Travel Requests System",
    description:
      "A Power Platform-based internal communication and travel request management application integrated with SharePoint and Microsoft Teams.",
    image: "/images/case-study/power-apps/travel.png",
    href: "/pdf/ES Speaks and Travel Requests Management System.pdf",
    challenge:
      "Employee communication and travel approvals were fragmented and inefficient.",
    solution:
      "Developed a centralized Power Apps solution with automated approval workflows and Teams integration.",
    result:
      "Enhanced employee engagement and streamlined travel request processing.",
  },

  {
    title: "New Store Opening Process",
    description:
      "A centralized Power Platform solution to manage store setup tasks, approvals, vendor coordination, and progress tracking.",
    image: "/images/case-study/power-apps/store.png",
    href: "/pdf/New Store Opening Process.pdf",
    challenge:
      "Coordinating store launch activities across teams lacked visibility and control.",
    solution:
      "Created a Power Apps & Power Automate workflow system integrated with SharePoint.",
    result:
      "Improved project tracking efficiency and accelerated new store launch timelines.",
  },
  {
    title: "Project Portfolio Management",
    description:
      "A portfolio management solution built on Microsoft Dataverse to centralize project tracking.",
    image: "/images/case-study/power-apps/project.avif",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Projects-Portfolio-ManagementMicrosoft-Dataverse.pdf",
    category: "Power Apps",
    challenge:
      "Lack of centralized project visibility made tracking progress and resource allocation difficult.",
    solution:
      "Implemented a Dataverse-based portfolio management system with dashboards, milestone tracking, and reporting.",
    result:
      "Enabled data-driven decision-making and improved overall project delivery performance.",
  },
];

export default function SharePointCaseStudies() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  /* =========================
     AUTO SLIDER (5s)
  ========================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % caseStudies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const study = caseStudies[index];

  return (
    <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <div className="mb-6 text-left max-w-3xl">
          <span
            className="inline-block px-4 py-1.5 rounded-full  bg-gradient-to-r
      from-blue-600
      via-cyan-500
      to-blue-600
      bg-clip-text
      text-transparent text-xs font-semibold uppercase tracking-wider border border-blue-500/20"
          >
            Featured
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl lg:text-4xl font-semibold text-black leading-tight">
            Featured Power Apps{" "}
            <span
              className=" bg-gradient-to-r
      from-blue-600
      via-cyan-500
      to-blue-600
      bg-clip-text
      text-transparent"
            >
              Success Stories
            </span>
          </h2>

          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            Explore how we leverage Microsoft Power Apps to build scalable,
            secure, and high-performance business solutions that streamline
            operations, improve productivity, and drive measurable growth.
          </p>
        </div>

        {/* ================= SLIDER ================= */}
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
                    SharePoint Case Study
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
