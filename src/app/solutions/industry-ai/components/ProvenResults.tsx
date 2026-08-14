"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Compass, CheckCircle2 } from "lucide-react";
import SectionBadge from "./SectionBadge";
import { useIndustryConfig } from "../context";

export default function ProvenResults() {
  const { provenResults, sections } = useIndustryConfig();
  const sectionCopy = sections.provenResults;
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 py-12 font-sans lg:py-16">
      <div className="relative z-10 mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-center text-center lg:mb-10"
        >
          <SectionBadge text={sectionCopy.badge} variant="line" />
          <h2 className="mt-4 mb-4 text-2xl font-extrabold leading-tight tracking-tight text-[#111827] md:text-4xl lg:text-[42px]">
            {sectionCopy.title}{" "}
            <span className="text-[#FF5812]">{sectionCopy.highlight}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-[#6B7280] lg:text-[17px]">
            {sectionCopy.description}
          </p>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:gap-10">
          {provenResults.map((result, idx) => {
            const gradientBg =
              idx === 0
                ? "from-blue-600 to-blue-500"
                : idx === 1
                  ? "from-[#FF6B00] via-[#FF5812] to-[#E64C00]"
                  : "from-purple-600 to-purple-500";

            const themes = [
              {
                cardHover: "hover:border-blue-500/25",
                textAccent: "text-blue-600",
                blockBg: "bg-blue-50/20",
                blockBorder: "border-blue-100/50",
                leftBorder: "border-l-blue-500",
                iconBg: "bg-blue-50",
                iconBorder: "border-blue-100",
                iconText: "text-blue-600",
              },
              {
                cardHover: "hover:border-[#FF5812]/25",
                textAccent: "text-[#FF5812]",
                blockBg: "bg-orange-50/20",
                blockBorder: "border-orange-100/50",
                leftBorder: "border-l-[#FF5812]",
                iconBg: "bg-orange-50",
                iconBorder: "border-orange-100",
                iconText: "text-[#FF5812]",
              },
              {
                cardHover: "hover:border-purple-500/25",
                textAccent: "text-purple-600",
                blockBg: "bg-purple-50/20",
                blockBorder: "border-purple-100/50",
                leftBorder: "border-l-purple-500",
                iconBg: "bg-purple-50",
                iconBorder: "border-purple-100",
                iconText: "text-purple-600",
              },
            ];

            const theme = themes[idx] || themes[0];

            return (
              <div
                key={idx}
                className={`flex flex-col items-stretch gap-3 rounded-[1.75rem] border border-slate-200/50 bg-slate-50/40 p-4 shadow-sm transition-all duration-300 min-[420px]:flex-row sm:gap-4 sm:rounded-[2rem] sm:p-5 ${theme.cardHover}`}
              >
                {/* Left Content Block */}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <span className="mb-1 inline-block text-[10px] font-bold tracking-widest uppercase text-slate-400">
                      {result.category}
                    </span>
                    <h3 className="mb-3 text-[16px] font-bold leading-tight text-slate-900">
                      {result.title}
                    </h3>

                    {/* Challenge */}
                    <div
                      className={`mb-2 flex items-start gap-2.5 rounded-r-xl rounded-l-sm border border-l-[3px] p-2 px-2.5 transition-colors duration-200 ${theme.blockBg} ${theme.blockBorder} ${theme.leftBorder}`}
                    >
                      <span
                        className={`mt-0.5 shrink-0 rounded-md border p-1 ${theme.iconBg} ${theme.iconText} ${theme.iconBorder}`}
                      >
                        <AlertCircle className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <h4
                          className={`mb-0.5 text-[9px] font-bold tracking-wider uppercase ${theme.textAccent}`}
                        >
                          Business Challenge
                        </h4>
                        <p className="text-[12px] font-medium leading-relaxed text-slate-700">
                          {result.challenge}
                        </p>
                      </div>
                    </div>

                    {/* Solution */}
                    <div
                      className={`mb-2 flex items-start gap-2.5 rounded-r-xl rounded-l-sm border border-l-[3px] p-2 px-2.5 transition-colors duration-200 ${theme.blockBg} ${theme.blockBorder} ${theme.leftBorder}`}
                    >
                      <span
                        className={`mt-0.5 shrink-0 rounded-md border p-1 ${theme.iconBg} ${theme.iconText} ${theme.iconBorder}`}
                      >
                        <Compass className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <h4
                          className={`mb-0.5 text-[9px] font-bold tracking-wider uppercase ${theme.textAccent}`}
                        >
                          Our Solution
                        </h4>
                        <p className="text-[12px] font-medium leading-relaxed text-slate-700">
                          {result.solution}
                        </p>
                      </div>
                    </div>

                    {/* Outcome */}
                    <div
                      className={`flex items-start gap-2.5 rounded-r-xl rounded-l-sm border border-l-[3px] p-2 px-2.5 transition-colors duration-200 ${theme.blockBg} ${theme.blockBorder} ${theme.leftBorder}`}
                    >
                      <span
                        className={`mt-0.5 shrink-0 rounded-md border p-1 ${theme.iconBg} ${theme.iconText} ${theme.iconBorder}`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <h4
                          className={`mb-0.5 text-[9px] font-bold tracking-wider uppercase ${theme.textAccent}`}
                        >
                          Outcome
                        </h4>
                        <p className="text-[12px] font-medium leading-relaxed text-slate-700">
                          {result.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Vertical Metric Pill */}
                <div
                  className={`relative flex h-20 w-full shrink-0 flex-row items-end justify-between overflow-hidden rounded-[1.25rem] border border-white/10 bg-gradient-to-r p-3 text-white shadow-md min-[420px]:h-auto min-[420px]:w-[4.5rem] min-[420px]:flex-col min-[420px]:bg-gradient-to-b sm:w-[5.5rem] sm:p-4 ${gradientBg}`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:0.75rem_0.75rem]" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />

                  <div className="relative z-10">
                    <div className="mb-1 text-2xl font-black leading-none tracking-tight sm:text-3xl">
                      {result.metric}
                    </div>
                    <div className="text-[9px] font-bold leading-tight uppercase opacity-90">
                      {result.metricLabel}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
