"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HealthcareTestingVideoHero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Fallback background */}
      <div className="absolute inset-0 bg-slate-900" />

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/ai-development-service-video/Health-testing.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/80" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-16 md:mt-0">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-medium tracking-wide">
            Healthcare Testing Services
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight max-w-4xl">
            Your Offshore Healthcare <br className="hidden md:block" />
            <span className="text-orange-500">Software Testing & QA Partner</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl font-light leading-relaxed">
            Ensure the quality, security, performance, and reliability of healthcare applications with an offshore testing team experienced in healthcare software, test automation, interoperability, compliance, and digital health platforms.
          </p>
        </motion.div>


      </div>
    </section>
  );
}
