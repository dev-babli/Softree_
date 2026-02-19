"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, Wrench, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================
   CASE STUDIES DATA
========================= */
const caseStudies = [
  {
    title: "Model-Driven App for Business Process Automation",
    description:
      "A Microsoft Power Apps model-driven application built on Dataverse to automate structured business processes and deliver scalable workflows.",
    image: "/images/case-study/power-apps/model.png",
    href: "https://www.softreetechnology.com/wp-content/uploads/2025/03/Model-Driven-App-1.pdf",
    category: "Power Apps",
    challenge:
      "Manual and disconnected business processes were causing inefficiencies, data duplication, and limited visibility across departments.",
    solution:
      "Developed a model-driven app using Dataverse with role-based access, automated workflows, and structured data architecture.",
    result:
      "Improved process efficiency, reduced manual errors, and enabled real-time operational insights across teams.",
  },
  {
    title: "Employee Details Tracking System",
    description:
      "A centralized employee management solution built using Power Apps for improved visibility and data accuracy.",
    image: "/images/case-study/power-apps/emp.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Employee-Details-tracking-System.pdf",
    category: "Power Apps",
    challenge:
      "Employee data was scattered across spreadsheets and systems, leading to inconsistencies and reporting delays.",
    solution:
      "Built a centralized Power Apps solution to manage employee records, departments, and roles with secure access control.",
    result:
      "Enhanced data accuracy, improved reporting speed, and streamlined HR operations across the organization.",
  },
  {
    title: "Health Plan Selector Mobile Application",
    description:
      "A mobile-first Power Apps solution for comparing and selecting health plans.",
    image: "/images/case-study/power-apps/health.jpg",
    href: "https://www.softreetechnology.com/wp-content/uploads/2024/12/Health-Plan-Selector-Mobile-Application.pdf",
    category: "Power Apps",
    challenge:
      "Users struggled to compare complex health plans due to fragmented and unclear eligibility information.",
    solution:
      "Created a mobile-friendly Power Apps solution enabling dynamic filtering, eligibility validation, and side-by-side comparisons.",
    result:
      "Improved user decision-making experience and reduced plan selection time significantly.",
  },
  {
    title: "Project Portfolio Management on Dataverse",
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
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);

  /* =========================
     AUTO SLIDER (3s)
  ========================= */
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % caseStudies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const study = caseStudies[index];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 600 : -600,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -600 : 600,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-20">
      <div
        className="max-w-7xl mx-auto px-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ================= HEADER ================= */}
        <div className="mb-6 text-left max-w-3xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider border border-blue-500/20">
            Featured
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl lg:text-4xl font-semibold text-black leading-tight">
            Featured Power Apps{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
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
                  {/* Label */}
                  <span className="inline-block text-[11px] uppercase tracking-widest text-blue-400 font-semibold">
                    Power Apps Case Study
                  </span>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-semibold text-white leading-snug">
                    {study.title}
                  </h2>

                  {/* Divider */}
                  <div className="w-14 h-px bg-gradient-to-r from-blue-500 via-blue-400/40 to-transparent"></div>

                  {/* Challenge • Solution • Result */}
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

                  {/* CTA */}
                  <Link
                    href={study.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-600/30"
                  >
                    View Full Case Study
                    <span className="text-lg">→</span>
                  </Link>
                </div>

                {/* RIGHT IMAGE */}
                <div>
                  <Image
                    src={study.image}
                    alt=""
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
