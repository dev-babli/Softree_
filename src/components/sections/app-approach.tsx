"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Lightbulb,
  Code2,
  Bug,
  Rocket,
  Wrench,
  FileCheck,
} from "lucide-react";

const steps = [
  { title: "Requirements & Planning", icon: ClipboardList },
  { title: "Feasibility Assessment\n(POC / POV)", icon: Lightbulb },
  { title: "Quality Assurance\n& Testing", icon: Bug },
  { title: "Application Development\n& Implementation", icon: Code2 },
  { title: "Release & Deployment", icon: Rocket },
  { title: "Operations &\nSupport", icon: Wrench },
  { title: "Review &\nOptimization", icon: FileCheck },
];

export default function ApplicationApproachAdvanced() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-black via-[#020d1a] to-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f59e0b20,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:110px_110px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="text-5xl font-bold text-white">
          Our Application Development Process
        </h2>
        <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
          From planning and feasibility to deployment and support, our process
          is designed to deliver reliable, secure, and scalable applications.
        </p>

        {/* Flow */}
        <div className="relative mt-28">
          <svg
            className="absolute top-1/2 left-0 w-full -translate-y-1/2"
            height="200"
            viewBox="0 0 1200 200"
            fill="none"
          >
            {/* Soft glow dots (background layer) */}
            <path
              d="M0 100 C200 0, 400 200, 600 100 C800 0, 1000 200, 1200 100"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="0.1 26"
            />

            {/* Foreground dotted line */}
            <motion.path
              d="M0 100 C200 0, 400 200, 600 100 C800 0, 1000 200, 1200 100"
              stroke="rgba(215, 216, 233, 0.4)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="0.1 18"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            />
          </svg>

          {/* Steps */}
          <div className="relative flex justify-between gap-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const num = String(i + 1).padStart(2, "0");

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -18 }}
                  className="relative group w-[170px]"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition blur-3xl bg-orange-400/25 rounded-3xl" />

                  {/* Card */}
                  <div
                    className="
                      relative h-[210px]
                      rounded-3xl
                 bg-gradient-to-r from-gray-300 to-gray-100 text-black

                      backdrop-blur-xl
                      border border-white/10
                      shadow-[0_30px_80px_rgba(0,0,0,0.85)]
                      flex flex-col items-center justify-center
                    "
                  >
                    {/* Large Number Capsule */}
                    <div
                      className="absolute -top-6 px-5 py-1.5 rounded-full bg-gradient-to-r from-gray-300 to-gray-100 text-black
 text-black text-sm font-bold tracking-[0.25em] shadow-lg"
                    >
                      {num}
                    </div>

                    {/* Icon */}
                    <div className="mt-4 w-14 h-14 rounded-2xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-orange-400" />
                    </div>

                    {/* Title */}
                    <p className="mt-5 text-sm font-medium text-black text-center whitespace-pre-line leading-relaxed px-4">
                      {step.title}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
