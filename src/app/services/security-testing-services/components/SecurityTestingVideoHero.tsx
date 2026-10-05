"use client";

import { motion } from "framer-motion";
import TrustStrip from "@/components/sections/TrustStrip";
import { typography } from "@/lib/typography";

export default function SecurityTestingVideoHero() {
  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col bg-[#050505]">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none"
      >
        <source
          src="/ai-development-service-video/security-testing-video.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505]/90 via-black/30 to-[#050505]/60 pointer-events-none"></div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-1 w-full items-center justify-center px-4 py-20 sm:px-6 text-center">
        <div className="container mx-auto flex flex-col items-center gap-5 sm:gap-8 max-w-4xl mt-10 sm:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-orange-500/30 bg-black/40 backdrop-blur-sm text-orange-400 text-[10px] sm:text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(255,107,44,0.15)]">
              SECURITY TESTING SERVICES
            </div>
          </motion.div>

          <motion.h1
            className={`${typography.heading.h1} text-white`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Your Offshore{" "}
            <span className="text-orange-500">Security Testing & QA Partner</span>
          </motion.h1>

          <motion.p
            className={`${typography.description.default} text-gray-300 max-w-3xl mt-2 sm:mt-4`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Secure your applications with Softree’s comprehensive security testing
            services, including application security, web and mobile testing, API
            security, vulnerability assessment, and penetration testing for
            reliable, resilient software.
          </motion.p>
        </div>
      </div>
      {/* Trust Strip anchored to bottom */}
      <div className="relative w-full z-20 pb-6 sm:pb-8 mt-auto">
        <TrustStrip theme="dark" />
      </div>
    </div>
  );
}
