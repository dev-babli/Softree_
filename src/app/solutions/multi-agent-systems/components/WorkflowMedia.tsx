"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const STEP_VISUALS = [
  {
    src: "/images/solutions/multi-agent-systems/process/step-01-strategy.jpg",
    caption: "Map roles · define orchestration graph",
  },
  {
    src: "/images/solutions/multi-agent-systems/process/step-02-development.jpg",
    caption: "Build specialized agent team contracts",
  },
  {
    src: "/images/solutions/multi-agent-systems/process/step-03-knowledge.jpg",
    caption: "Connect shared memory + tool mesh",
  },
  {
    src: "/images/solutions/multi-agent-systems/process/step-04-deploy.jpg",
    caption: "Govern, observe, and optimize in production",
  },
];

export default function WorkflowMedia({ activeStep }: { activeStep: number }) {
  const visual = STEP_VISUALS[activeStep % STEP_VISUALS.length];

  return (
    <div className="relative h-full w-full flex-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={visual.src}
            alt={visual.caption}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center"
            quality={75}
            priority={activeStep === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF6A13]">
              Step 0{activeStep + 1}
            </p>
            <p className="mt-1 text-sm font-semibold text-white sm:text-base">
              {visual.caption}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
