"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const RESULTS = [
  {
    metric: "40%",
    label: "Stockout reduction",
    title: "Inventory agent team",
    body: "Forecasting, allocation, and replenishment agents sharing live inventory state.",
    href: "/case-studies/ai-shipment-delay-prediction-platform",
  },
  {
    metric: "68%",
    label: "Ticket automation",
    title: "Ops agent swarm",
    body: "Intake, research, and resolution agents with human approval on high-risk actions.",
    href: "/case-studies/enterprise-leave-management-system",
  },
  {
    metric: "58%",
    label: "Effort reduction",
    title: "EMR workflow agents",
    body: "Specialized documentation and follow-up agents under clinical governance.",
    href: "/case-studies/electronic-medical-records-emr-workflow-automation-ai-copilot",
  },
];

/** Softree-only proof — metric-first, no purple card chrome. */
export default function SoftreeProof() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl lg:mb-14"
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5812]">
            Outcomes
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Results from coordinated agent teams
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 divide-y divide-zinc-200 border-y border-zinc-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
        >
          {RESULTS.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className="group block p-6 transition-colors hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#FF5812] sm:p-8"
            >
              <p className="text-5xl font-extrabold tracking-tight text-[#FF5812]">
                {r.metric}
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                {r.label}
              </p>
              <p className="mt-4 text-base font-semibold text-zinc-900">{r.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-zinc-600">
                {r.body}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 transition group-hover:text-[#FF5812]">
                View case study
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
