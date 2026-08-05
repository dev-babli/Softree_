"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { workflowSteps } from "../data/how-ai-works";

export default function HowItWorks() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="how-it-works"
      className="relative w-full border-y border-zinc-200/60 bg-zinc-50 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start"
          >
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5812]">
              How we deliver
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              Four steps to a production agent graph
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">
              Discovery, build, connect, govern—so multi-agent systems ship
              safely and keep improving after go-live.
            </p>
          </motion.div>

          <ol className="lg:col-span-7">
            {workflowSteps.map((step, idx) => {
              const isOpen = open === idx;
              return (
                <li key={step.id} className="border-b border-zinc-200 first:border-t">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : idx)}
                    className="flex w-full items-start gap-4 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5812] sm:gap-6"
                    aria-expanded={isOpen}
                    aria-controls={`how-step-panel-${step.id}`}
                    id={`how-step-${step.id}`}
                  >
                    <span
                      className={`mt-0.5 w-12 shrink-0 text-sm font-extrabold tabular-nums ${
                        isOpen ? "text-[#FF5812]" : "text-zinc-300"
                      }`}
                    >
                      {step.id}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-semibold text-zinc-900 sm:text-lg">
                        {step.title}
                      </span>
                      <span
                        id={`how-step-panel-${step.id}`}
                        role="region"
                        aria-labelledby={`how-step-${step.id}`}
                        className={`block text-[14px] leading-relaxed text-zinc-600 transition-[max-height,opacity,margin] duration-300 sm:text-[15px] ${
                          isOpen
                            ? "mt-2 max-h-48 opacity-100"
                            : "max-h-0 overflow-hidden opacity-0"
                        }`}
                      >
                        {step.description}
                      </span>
                    </span>
                    <span
                      className={`mt-1 shrink-0 text-lg leading-none text-[#FF5812] transition ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative mt-14 aspect-[16/10] w-full overflow-hidden bg-zinc-200 md:aspect-[21/9]"
        >
          <Image
            src="/images/solutions/multi-agent-systems/delivery-timeline.png"
            alt="Abstract Softree multi-agent delivery timeline"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
