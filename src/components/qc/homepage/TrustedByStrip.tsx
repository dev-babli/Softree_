"use client"

import { motion } from "framer-motion"

const LOGOS = [
  {
    name: "Microsoft Gold Partner",
    svg: (
      <svg viewBox="0 0 42 42" fill="none" aria-hidden="true" className="h-6 w-6 shrink-0">
        <rect width="20" height="20" fill="#F25022" />
        <rect x="22" width="20" height="20" fill="#7FBA00" />
        <rect y="22" width="20" height="20" fill="#00A4EF" />
        <rect x="22" y="22" width="20" height="20" fill="#FFB900" />
      </svg>
    ),
  },
  {
    name: "Power Platform",
    svg: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="h-6 w-6 shrink-0">
        <path d="M16 2L30 10v12L16 30 2 22V10L16 2z" fill="#742774" />
        <path d="M16 8l9 5.2v8.6L16 27l-9-5.2V13.2L16 8z" fill="white" opacity=".2" />
      </svg>
    ),
  },
  {
    name: "SharePoint",
    svg: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="h-6 w-6 shrink-0">
        <circle cx="16" cy="16" r="14" fill="#038387" />
        <text x="7" y="21" fontFamily="system-ui" fontSize="12" fontWeight="700" fill="white">SP</text>
      </svg>
    ),
  },
  {
    name: "Azure DevOps",
    svg: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="h-6 w-6 shrink-0">
        <path d="M0 22.674l4.627-5.92L19.19 5.307 23.5 3l.5 3.885-9.5 8.654L28 17.693 32 9.5V26L22 32l-12-4.5 14 .154V15.5L6 24.385 0 22.674z" fill="#0078D4" />
      </svg>
    ),
  },
]

const STATS = [
  { value: "200+", label: "enterprise projects" },
  { value: "47 days", label: "median ship time" },
  { value: "98%", label: "on-time delivery" },
  { value: "5★", label: "avg. client rating" },
]

export default function TrustedByStrip() {
  return (
    <section
      aria-label="Trust indicators"
      className="border-y border-[#E5E5E5] bg-white py-7"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Partner logos */}
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#999]">
              Certified on
            </span>
            {LOGOS.map((logo) => (
              <motion.div
                key={logo.name}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="flex items-center gap-2 text-[13px] font-medium text-[#444]"
                title={logo.name}
              >
                {logo.svg}
                <span className="hidden sm:inline">{logo.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-[#E5E5E5] lg:block" aria-hidden="true" />

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-[18px] font-bold leading-none tracking-tight text-[#111]">
                  {stat.value}
                </span>
                <span className="mt-0.5 text-[11px] text-[#888]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
