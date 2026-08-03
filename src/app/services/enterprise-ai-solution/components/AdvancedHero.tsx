"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, Zap, BarChart, Shield } from "lucide-react";
import Link from "next/link";

export function AdvancedHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50 pb-14 pt-20 lg:pb-16 lg:pt-28">
      <div className="mx-auto max-w-[90rem] px-6 lg:px-10">
        <div className="flex flex-col items-center">
          <div className="mx-auto w-full max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5812]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
              Enterprise AI Solutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-5xl text-balance text-[clamp(38px,5.2vw,68px)] font-semibold leading-[0.96] tracking-[-0.04em] text-[#0a0a1a]"
            >
              Enterprise AI Solutions That Deliver{" "}
              <span className="text-[#FF5812]">Measurable Business Outcomes</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#0a0a1a]/70"
            >
              We help organizations automate workflows, build intelligent agents,
              and transform business operations with secure, scalable, and
              responsible enterprise AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
            >
              <Link
                href="https://www.softreetechnology.com/contact"
                className="flex items-center justify-center rounded-xl border border-[#FF6B00] bg-[#FF6B00] px-6 py-3 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(255,107,0,0.25)] transition-all hover:border-[#FF5812] hover:bg-[#FF5812] hover:shadow-md"
              >
                Talk to An Expert
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
            >
              {[
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  desc: "Built secure by design",
                },
                {
                  icon: Brain,
                  title: "Custom AI Solutions",
                  desc: "Tailored to your business",
                },
                {
                  icon: BarChart,
                  title: "Measurable Impact",
                  desc: "Real results. Real ROI.",
                },
                {
                  icon: Zap,
                  title: "Latest AI Models",
                  desc: "Powered by cutting-edge AI",
                },
              ].map(({ icon: Icon, title, desc }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 + index * 0.07 }}
                  whileHover={{ y: -2 }}
                  className="flex items-start gap-2.5 text-left"
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5812]" />
                  <div>
                    <h3 className="text-[11px] font-semibold leading-tight text-[#0a0a1a] sm:text-xs">
                      {title}
                    </h3>
                    <p className="mt-1 text-[9px] leading-tight text-[#0a0a1a]/45 sm:text-[10px]">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="relative mx-auto mt-14 aspect-video w-full max-w-6xl lg:aspect-[16/7]">
            <div className="pointer-events-none absolute -inset-2 translate-x-2 translate-y-2 rounded-[26px] border border-[#FF5812]/30" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 overflow-hidden rounded-3xl border border-orange-200 bg-[#111a32] shadow-[0_24px_60px_-16px_rgba(15,23,42,0.28)]"
            >
              <video
                className="pointer-events-none h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload noplaybackrate noremoteplayback"
                preload="metadata"
                aria-label="Enterprise AI Solutions by Softree"
              >
                <source
                  src="/images/enterprise-ai-solution/enterprise-ai-solutions.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video element.
              </video>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
