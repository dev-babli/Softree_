"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  CheckCircle2,
  Shield,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";
import SectionBadge from "@/app/services/ai-development-services/components/SectionBadge";
import {
  langchainTechCategories,
  TechCategory,
} from "../data/tech-stack";

export default function AiTechnologyStack() {
  const [activeTabId, setActiveTabId] = useState<string>("ai-llm");

  const activeCategory = useMemo<TechCategory>(() => {
    return (
      langchainTechCategories.find((cat) => cat.id === activeTabId) ||
      langchainTechCategories[0]
    );
  }, [activeTabId]);

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden bg-white text-zinc-900 px-4 sm:px-8 md:px-[3cm]">
      {/* Background Soft Glow & Grid Mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[850px] rounded-full bg-orange-500/[0.04] blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-[350px] w-[350px] rounded-full bg-amber-500/[0.03] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #e4e4e7 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col items-center w-full mb-8 sm:mb-10 text-center">
          <SectionBadge text="TECHNOLOGY STACK" variant="line" />

          <h2 className="text-2xl md:text-3xl lg:text-[2.35rem] font-extrabold text-[#111827] mb-3 tracking-tight leading-tight max-w-4xl">
            Technology Stack for{" "}
            <span className="text-[#FF5812]">LangChain AI Development</span>
          </h2>

          <p className="text-[14.5px] lg:text-[16px] text-zinc-600 max-w-3xl leading-relaxed">
            Modern technologies for building scalable LangChain applications, AI agents, RAG solutions, and enterprise AI platforms.
          </p>
        </div>

        {/* ================= CATEGORY TABS (Flex-Wrap, No horizontal scroller) ================= */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-5xl mx-auto w-full mb-8 sm:mb-10">
          {langchainTechCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeTabId === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveTabId(category.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-[13.5px] font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-[#FF5812] text-white shadow-[0_8px_24px_rgba(255,88,18,0.28)] scale-[1.02] border border-[#FF5812]"
                    : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200/90 shadow-xs"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-[#FF5812]"}`} />
                <span>{category.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                    isActive
                      ? "bg-black/20 text-white"
                      : "bg-zinc-200/80 text-zinc-600"
                  }`}
                >
                  {category.items.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* ================= MAIN ADVANCED SHOWCASE CARD ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.24, ease: "easeInOut" }}
            className="w-full rounded-2xl sm:rounded-3xl border border-zinc-200/90 bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06),0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden"
          >
            {/* Top Accent Gradient Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#FF5812] via-orange-400 to-amber-500" />

            <div className="p-6 sm:p-8 lg:p-10">
              {/* Category Header Hub */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 sm:pb-8 border-b border-zinc-200">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-[#FF5812]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812] shadow-[0_0_8px_#FF5812]" />
                      {activeCategory.badge}
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-zinc-600">
                      <Layers className="h-3 w-3 text-[#FF5812]" />
                      <span>{activeCategory.items.length} Tech Components</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#111827] tracking-tight leading-tight">
                    {activeCategory.label}
                  </h3>

                  <p className="text-xs sm:text-sm md:text-[14.5px] text-zinc-600 mt-2 max-w-3xl leading-relaxed font-normal">
                    {activeCategory.description}
                  </p>

                  {/* Architecture Feature Chips */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500">
                    <div className="flex items-center gap-1.5 rounded-lg bg-zinc-100/80 px-2.5 py-1 text-zinc-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#FF5812]" />
                      <span>Enterprise Grade</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-zinc-100/80 px-2.5 py-1 text-zinc-700">
                      <Zap className="h-3.5 w-3.5 text-amber-500" />
                      <span>Sub-Second Latency</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-zinc-100/80 px-2.5 py-1 text-zinc-700">
                      <Shield className="h-3.5 w-3.5 text-emerald-600" />
                      <span>LangChain Validated</span>
                    </div>
                  </div>
                </div>

                {/* Right Category Icon Badge Card */}
                <div className="flex items-center gap-3.5 self-start lg:self-center bg-gradient-to-br from-orange-500/[0.06] via-orange-500/[0.03] to-transparent border border-orange-500/20 rounded-2xl p-4 sm:p-5">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-[#FF5812] text-white shadow-[0_8px_20px_rgba(255,88,18,0.35)]">
                    <activeCategory.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-orange-600 font-bold">
                      Domain Focus
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-zinc-900 leading-tight mt-0.5">
                      {activeCategory.subtitle}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Technology Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-4.5 mt-8">
                {activeCategory.items.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: idx * 0.025 }}
                    className="group relative rounded-2xl border border-zinc-200/90 bg-gradient-to-b from-zinc-50/50 via-white to-white p-4 sm:p-5 transition-all duration-300 hover:border-[#FF5812] hover:shadow-[0_12px_28px_rgba(255,88,18,0.12)] hover:-translate-y-1 flex flex-col justify-between shadow-xs"
                  >
                    {/* Top Row: Tech Clean Name & Core/Featured Tag */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
                          <h4 className="text-sm sm:text-[15px] font-extrabold text-zinc-900 group-hover:text-[#FF5812] transition-colors">
                            {item.name}
                          </h4>
                        </div>

                        {item.featured && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-orange-50 border border-orange-200/90 px-1.5 py-0.5 text-[10px] font-bold text-[#FF5812]">
                            <Sparkles className="h-2.5 w-2.5" />
                            Core
                          </span>
                        )}
                      </div>

                      {/* Tag Capsule */}
                      {item.tag && (
                        <div className="inline-block text-[11px] font-semibold text-orange-700 bg-orange-500/[0.08] px-2 py-0.5 rounded-md mb-2">
                          {item.tag}
                        </div>
                      )}

                      {/* Description */}
                      {item.description && (
                        <p className="text-xs sm:text-[12.5px] text-zinc-600 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom Feature Divider */}
                    <div className="mt-3.5 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                      <span className="font-mono text-[10.5px] text-zinc-400">Softree Integration</span>
                      <ArrowRight className="h-3 w-3 text-zinc-400 group-hover:text-[#FF5812] group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
