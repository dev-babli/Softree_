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
    title: "Enterprise Intranet Portal",
    description:
      "A centralized SharePoint Online intranet designed to streamline communication and enhance document accessibility across departments.",
    challenge:
      "Disconnected systems and poor content discoverability slowed internal collaboration.",
    solution:
      "Implemented structured navigation, metadata tagging, and Power Automate workflows.",
    result:
      "Improved collaboration efficiency by 60% and reduced search time significantly.",
    image: "/images/sharepoint/case1.png",
    href: "/case-studies/sharepoint/intranet-portal",
  },
  {
    title: "Document Management System",
    description:
      "Enterprise-grade document lifecycle management with governance and compliance controls.",
    challenge:
      "Unstructured file storage created duplication and compliance risks.",
    solution:
      "Built metadata architecture, approval workflows, and retention policies.",
    result:
      "Achieved secure, compliant document governance across departments.",
    image: "/images/sharepoint/case2.png",
    href: "/case-studies/sharepoint/document-management",
  },
  {
    title: "HR Automation Portal",
    description:
      "Automated onboarding and HR processes integrated with SharePoint & Power Automate.",
    challenge: "Manual HR processes delayed productivity and increased errors.",
    solution:
      "Developed automated approval workflows and centralized employee records.",
    result: "Reduced onboarding time by 40%.",
    image: "/images/sharepoint/case3.png",
    href: "/case-studies/sharepoint/hr-automation",
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
                <div className="space-y-4 md:pr-8 md:border-r md:border-white/10">
                  <span className="inline-block text-[10px] uppercase tracking-wider text-blue-400 font-semibold">
                    Power App Case Study
                  </span>

                  <h2 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
                    {study.title}
                  </h2>

                  <p className="text-white/70 text-sm leading-relaxed">
                    {study.description}
                  </p>

                  <div className="w-12 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>

                  <div className="space-y-4 pt-1">
                    {/* Challenge */}
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500/10 text-red-400">
                        <AlertTriangle size={14} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-semibold text-red-400 uppercase tracking-wider">
                          Challenge
                        </h4>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>
                    </div>

                    {/* Solution */}
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 text-blue-400">
                        <Wrench size={14} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                          Solution
                        </h4>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Result */}
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500/10 text-green-400">
                        <TrendingUp size={14} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-semibold text-green-400 uppercase tracking-wider">
                          Result
                        </h4>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">
                          {study.result}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={study.href}
                    className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-md"
                  >
                    View Case Study →
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
