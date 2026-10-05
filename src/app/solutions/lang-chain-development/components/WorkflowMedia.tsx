"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { workflowSteps } from "../data/how-ai-works";

export default function WorkflowMedia({ activeStep }: { activeStep: number }) {
  const step = workflowSteps[activeStep % workflowSteps.length];
  const src = step?.image;
  const caption = step
    ? `${step.title} · ${step.description.slice(0, 72)}${step.description.length > 72 ? "…" : ""}`
    : "";

  if (!src) return null;

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
            src={src}
            alt={step.title}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center"
            quality={75}
            priority={activeStep === 0}
            unoptimized
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
