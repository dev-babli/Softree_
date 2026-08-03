"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PAIRS = [
  {
    friction: "Single agents fail on complex multi-step work",
    response: "Role-based agent teams with explicit handoffs",
  },
  {
    friction: "Tools and systems stay siloed",
    response: "Shared orchestration across CRM, ERP, and APIs",
  },
  {
    friction: "Handoffs between teams are slow and lossy",
    response: "Structured messaging with full context on every transfer",
  },
  {
    friction: "Agents conflict, loop, or act without oversight",
    response: "Governor gates, confidence thresholds, and audit trails",
  },
  {
    friction: "Knowledge is fragmented across platforms",
    response: "Permission-aware shared memory and RAG layers",
  },
];

export default function ProblemSolution() {
  return (
    <section className="relative w-full bg-zinc-50 py-20 lg:py-28">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-xl lg:mb-16"
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5812]">
            Why multi-agent
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Where one agent stalls, a team finishes the job
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="relative aspect-[4/3] overflow-hidden bg-zinc-200 lg:sticky lg:top-28 lg:col-span-4 lg:aspect-auto lg:min-h-[22rem] lg:max-h-[calc(100vh-8rem)]"
          >
            <Image
              src="/images/solutions/multi-agent-systems/friction-map.png"
              alt="Abstract visualization of chaotic single-agent work versus ordered multi-agent lanes"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </motion.div>

          <ul className="lg:col-span-8">
            {PAIRS.map((row) => (
              <li
                key={row.friction}
                className="grid gap-2 border-b border-zinc-200/80 py-5 sm:grid-cols-[1fr_1.15fr] sm:gap-x-10"
              >
                <p className="text-[15px] text-zinc-500">{row.friction}</p>
                <p className="border-l-0 pl-0 text-[15px] font-medium text-zinc-900 sm:border-l-2 sm:border-[#FF5812]/40 sm:pl-4">
                  {row.response}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
