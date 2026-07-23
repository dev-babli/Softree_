"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, Zap, BarChart, Shield } from "lucide-react";

export function AdvancedHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 pb-14 pt-20 lg:pb-16 lg:pt-28">
      {/* Technical Dot Grid Pattern */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(10,10,26,0.06)_1.2px,transparent_1.2px)] [background-size:24px_24px] -z-10" 
      />

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] bg-[#FF5812]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[25%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] bg-[#1852FF]/5 blur-[110px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[5%] left-[10%] w-[35vw] h-[35vw] max-w-[450px] bg-amber-200/8 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-[90rem] px-6 lg:px-10">
        <div className="flex flex-col items-center">
          <div className="mx-auto w-full max-w-5xl text-center">
            {/* Subtle glow behind header */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-orange-100/40 blur-[120px] rounded-full pointer-events-none -z-10" />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200/50 bg-orange-50/50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5812]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812] animate-pulse" />
              Enterprise AI Solutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-5xl text-balance text-[clamp(38px,5.2vw,68px)] font-semibold leading-[0.96] tracking-[-0.04em] text-[#0a0a1a]"
            >
              Enterprise AI Solutions That Deliver{" "}
              <span className="bg-gradient-to-r from-[#FF5812] to-[#FF7A2F] bg-clip-text text-transparent font-bold">
                Measurable Business Outcomes
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="body-prose mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#0a0a1a]/70"
            >
              We help organizations automate workflows, build intelligent agents,
              and transform business operations with secure, scalable, and
              responsible enterprise AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-col items-center justify-center gap-3"
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#FF5812] px-7 py-3 text-xs font-semibold text-white shadow-[0_6px_20px_rgba(255,88,18,0.25)] transition-all duration-300 hover:bg-[#FF6B00] hover:shadow-[0_8px_24px_rgba(255,107,0,0.35)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]"
              >
                Talk to An Expert
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400/80 flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                Proven 4.8x Average ROI within 12 Months
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="relative overflow-hidden mx-auto mt-14 w-full max-w-5xl rounded-3xl border border-orange-950/40 bg-gradient-to-r from-zinc-950 via-[#180902] to-zinc-950 p-5 sm:p-6 shadow-[0_24px_55px_-16px_rgba(255,88,18,0.12)]"
            >
              {/* Tactile Dot Grid Texture */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(#fff_0.8px,transparent_0.8px)] [background-size:10px_10px]"
              />

              <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2 lg:divide-x lg:divide-white/10">
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
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 text-left px-2 lg:px-6 first:pl-0 last:pr-0 transition-transform duration-300 hover:translate-y-[-2px]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#FF5812]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold leading-tight text-white">
                        {title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-normal text-zinc-400">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="relative mx-auto mt-16 w-full max-w-6xl rounded-[32px] border-2 border-orange-200/80 bg-[#f4f0e8] p-4 sm:p-5 shadow-[0_24px_60px_-15px_rgba(10,10,26,0.08)]">
            {/* Glowing Backdrop Platform */}
            <div className="pointer-events-none absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-[#1852FF]/10 via-[#FF5812]/15 to-[#FF5812]/5 blur-2xl opacity-90" />
            
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col overflow-hidden rounded-[20px] border border-zinc-800 bg-zinc-950 shadow-[0_30px_80px_rgba(10,10,26,0.45),0_0_50px_rgba(255,88,18,0.12)] hover:shadow-[0_40px_100px_rgba(10,10,26,0.55),0_0_60px_rgba(255,88,18,0.20)] hover:-translate-y-2 transition-all duration-500"
            >
              {/* Console Top Window Header */}
              <div className="flex h-11 items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-5 text-white/40 select-none">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#FF5812]/30 border border-[#FF5812]/40" />
                  <div className="h-3 w-3 rounded-full bg-zinc-700/50" />
                  <div className="h-3 w-3 rounded-full bg-zinc-700/50" />
                </div>
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-zinc-400">
                  softree_agent_core_feed.sh
                </span>
                <span className="text-[9px] font-bold tracking-wider uppercase text-emerald-500/80 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  CONNECTED
                </span>
              </div>

              {/* Console Screen (Aspect Video Container) */}
              <div className="relative aspect-video w-full lg:aspect-[16/7] overflow-hidden">
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
                  <source src="/images/enterprise-ai-solution/enterprise-ai-solutions.mp4" type="video/mp4" />
                  Your browser does not support the video element.
                </video>

                {/* Laser Scanning Line */}
                <motion.div
                  initial={{ top: 0 }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-[2px] bg-[#FF5812]/40 shadow-[0_0_12px_rgba(255,88,18,0.5)] pointer-events-none z-10"
                />

                {/* Viewport Corner Brackets */}
                <div className="absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-[#FF5812]/70 pointer-events-none z-10" />
                <div className="absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-[#FF5812]/70 pointer-events-none z-10" />
                <div className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-[#FF5812]/70 pointer-events-none z-10" />
                <div className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-[#FF5812]/70 pointer-events-none z-10" />

                {/* Cinematic Bottom Shadow Vignette */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                {/* Ambient Inner Border Highlight */}
                <div className="absolute inset-0 border border-white/5 rounded-none pointer-events-none" />

                {/* HUD / Advanced Tech Overlay Elements */}
                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between pointer-events-none select-none z-10">
                  {/* Top Row: System Status and Live indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10 text-[9px] font-bold uppercase tracking-[0.15em] text-white/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Secure Sandbox // System Core
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10 text-[9px] font-bold uppercase tracking-[0.15em] text-[#FF5812]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                      </span>
                      Live Feed
                    </div>
                  </div>

                  {/* Bottom Row: Coordinate metadata / tech details */}
                  <div className="flex items-end justify-between text-[9px] font-mono text-white/50 tracking-wider">
                    <div>
                      <p>LATENCY: 140ms</p>
                      <p>BANDWIDTH: 10 Gbps</p>
                    </div>
                    <div className="text-right">
                      <p>MODEL: GPT-4o ENTERPRISE</p>
                      <p>SYS.LOC: AZURE VAULT US-EAST</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
