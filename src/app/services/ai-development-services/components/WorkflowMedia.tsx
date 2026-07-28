"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
export default function WorkflowMedia({ activeStep }: { activeStep: number }) {
  const images = [
    '/images/ai-development-services/step-4.jpg',
    '/images/ai-development-services/step-3.jpg',
    '/images/ai-development-services/step-2.jpg',
    '/images/ai-development-services/step-1.jpg'
  ];

  return (
    <div className="relative w-full h-full flex-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[activeStep]}
            alt={`Enterprise AI Workflow Step ${activeStep + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center"
            quality={100}
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
