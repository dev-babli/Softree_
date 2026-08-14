'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Box, TrendingUp, Cpu } from 'lucide-react';
import { HERO_DATA } from '../data/heroData';
import HeroChatDemo from './HeroChatDemo';

export const Hero: React.FC = () => {
  const { label, heading, paragraph, ctaButtons } = HERO_DATA;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const },
    },
  };

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-transparent pt-20 pb-12 font-sans text-base text-[#0A0F3C] lg:pt-28 lg:pb-16">
      <div className="pointer-events-none absolute top-1/2 right-0 h-[750px] w-[750px] -translate-y-1/2 opacity-30">
        <svg viewBox="0 0 700 700" fill="none" className="h-full w-full">
          <circle cx="500" cy="350" r="300" stroke="#FF5812" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" />
          <circle cx="500" cy="350" r="420" stroke="#FF5812" strokeWidth="1" opacity="0.15" />
          <circle cx="500" cy="350" r="540" stroke="#FF5812" strokeWidth="1" strokeDasharray="6 12" opacity="0.1" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* LEFT COLUMN */}
          <motion.div
            className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-orange-50 px-2.5 py-1"
            >
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-600" />
              <span className="text-[10px] font-bold tracking-wider text-orange-600 uppercase">
                {label}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 w-full text-3xl leading-[1.15] font-extrabold tracking-tight break-words whitespace-pre-line text-[#0A0F3C] sm:text-4xl sm:leading-[1.1] lg:text-5xl xl:text-[3.25rem]"
            >
              {heading.prefix}
              <span className="relative text-[#FF5812]">
                {' '}
                {heading.highlight}
              </span>
              {heading.suffix}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-md text-sm leading-relaxed font-normal text-slate-600 lg:text-base"
            >
              {paragraph}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mb-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
            >
              <Link
                href={ctaButtons.primary.href}
                className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-[#0A0F3C] transition-all duration-300 hover:bg-gray-50 sm:w-auto"
              >
                <span>{ctaButtons.primary.text}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {ctaButtons.secondary && ctaButtons.secondary.text && (
                <Link
                  href={ctaButtons.secondary.href}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200/80 bg-white px-7 py-3.5 text-base font-semibold text-[#0A0F3C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-50 sm:w-auto"
                >
                  {ctaButtons.secondary.text}
                </Link>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex w-full flex-col gap-5 border-t border-gray-100 pt-6 md:flex-row md:gap-4"
            >
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="mt-[1px] h-5 w-5 shrink-0 text-[#FF6B00]" strokeWidth={1.5} />
                  <h4 className="text-[12.5px] leading-[1.25] font-semibold text-[#0A0F3C]">
                    White-Label
                    <br />
                    Friendly
                  </h4>
                </div>
                <p className="pr-2 text-[11px] leading-relaxed text-gray-500">
                  Trusted partner for tech agencies.
                </p>
              </div>

              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex items-start gap-2">
                  <Box className="mt-[1px] h-5 w-5 shrink-0 text-[#FF6B00]" strokeWidth={1.5} />
                  <h4 className="text-[12.5px] leading-[1.25] font-semibold text-[#0A0F3C]">
                    Dedicated
                    <br />
                    Offshore Teams
                  </h4>
                </div>
                <p className="pr-2 text-[11px] leading-relaxed text-gray-500">
                  Scale engineering on demand.
                </p>
              </div>

              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex items-start gap-2">
                  <TrendingUp className="mt-[1px] h-5 w-5 shrink-0 text-[#FF6B00]" strokeWidth={1.5} />
                  <h4 className="text-[12.5px] leading-[1.25] font-semibold text-[#0A0F3C]">
                    Microsoft AI
                    <br />
                    Expertise
                  </h4>
                </div>
                <p className="pr-2 text-[11px] leading-relaxed text-gray-500">
                  Azure, OpenAI & Power Platform.
                </p>
              </div>

              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex items-start gap-2">
                  <Cpu className="mt-[1px] h-5 w-5 shrink-0 text-[#FF6B00]" strokeWidth={1.5} />
                  <h4 className="text-[12.5px] leading-[1.25] font-semibold text-[#0A0F3C]">
                    Enterprise-Ready
                    <br />
                    Delivery
                  </h4>
                </div>
                <p className="pr-2 text-[11px] leading-relaxed text-gray-500">
                  Secure, production-grade solutions.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Chatbot Q&A buds */}
          <motion.div
            className="relative mt-6 flex w-full items-center justify-center px-1 sm:px-0 lg:col-span-6 lg:mt-0"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <HeroChatDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
