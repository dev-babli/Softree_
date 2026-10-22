"use client";

import React from "react";
import { motion } from "framer-motion";
import TrustStrip from "@/components/sections/TrustStrip";
import ShaderBackground from "@/components/ui/shader-background";

export const Hero: React.FC = () => {
  const label = "OFFSHORE AI CHATBOT DEVELOPMENT";
  const paragraph =
    "Softree Technology builds custom AI chatbots that help businesses answer customer questions, automate routine inquiries, and connect conversational experiences with business systems. Our offshore AI engineering team develops chatbot solutions using relevant AI models, business knowledge, APIs, and workflow integrations.";

  return (
    <section className="relative flex min-h-[auto] w-full flex-col overflow-hidden bg-[#060403] font-sans text-white pt-20 pb-4 sm:pt-24 sm:pb-6 lg:min-h-[80svh] lg:pt-24 lg:pb-6">
      {/* WebGL Plasma Grid Shader Background in Orange Shade */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <ShaderBackground
          theme="orange"
          animate={true}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Ambient Breathing Glow Orb behind typography */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-[#FF5812]/15 blur-[120px]"
      />

      {/* Warm ember overlays — shader stays glowing and vibrant; text is crystal clear */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#060403]/85 via-[#060403]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#060403] via-transparent to-[#060403]/40" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-6 sm:px-8 lg:px-12">
        {/* Main Content Centered */}
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center text-center pt-1 pb-8 sm:pt-2 sm:pb-10 lg:pt-3 lg:pb-12">
          {/* Top Badge with Live Beacon Animation */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#FF5812] px-4 py-2 shadow-[0_4px_24px_-4px_rgba(255,88,18,0.55)] cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="typo-caption text-[11px] sm:text-xs font-bold text-white tracking-wider">
              {label}
            </span>
          </motion.div>

          {/* Centered Heading */}
          <h1 className="typo-heading-1 text-white leading-tight font-extrabold mt-3.5 sm:mt-4">
            <motion.span
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="inline"
            >
              Custom AI Chatbot Development for{" "}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="inline"
            >
              <span className="text-[#FF5812] drop-shadow-[0_0_25px_rgba(255,88,18,0.45)]">
                Customer Support
              </span>{" "}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="inline text-[#FF5812] drop-shadow-[0_0_30px_rgba(255,88,18,0.5)]"
            >
              &amp; Business Workflows
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="typo-description text-zinc-300 leading-relaxed max-w-3xl mt-3.5 sm:mt-4"
          >
            {paragraph}
          </motion.p>
        </div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-auto [&>div]:!mt-0 [&>div]:!gap-4 sm:[&>div]:!gap-6"
        >
          <TrustStrip theme="dark" />
        </motion.div>
      </div>

      {/* Subtle bottom glowing orange accent line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.8 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5812]/50 to-transparent"
      />
    </section>
  );
};

export default Hero;
