"use client";

import React from "react";
import Link from "next/link";
import { Search, Cpu, ShieldCheck, Activity, ArrowRight } from "lucide-react";

export default function DocumentAiResilience() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-transparent font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Wrapper */}
        <div className="relative rounded-[32px] border border-zinc-800 bg-zinc-950 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-16 shadow-2xl overflow-hidden">
          
          <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-orange-600/10 blur-[100px]" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-orange-500/5 blur-[100px]" />

          {/* Left Column */}
          <div className="flex flex-col justify-center w-full lg:w-[45%] z-10">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white leading-tight tracking-tight">
              Enabling Enterprise-Grade <br className="hidden sm:inline" />
              <span className="text-[#FF5812]">Document AI Resilience</span>
            </h2>
            
            <p className="mt-6 text-[15px] md:text-base text-zinc-400 leading-relaxed">
              While deep document understanding architectures accelerate processing speeds, handling unstructured variations, table layout errors, and data privacy remain major challenges in enterprise workflows.
            </p>
            
            <p className="mt-4 text-[15px] md:text-base text-zinc-400 leading-relaxed">
              Softree delivers reliable document extraction pipelines—customizing parser models, checking layout accuracy, and masking private details within your secure cloud tenant boundaries.
            </p>

            <div className="mt-8">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-zinc-950 hover:border-white transition-all duration-300 focus:outline-none"
              >
                <span>Discuss Your Project Requirements</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-[55%] z-10 items-stretch">
            
            {/* Card 1 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 text-[#FF5812] flex items-center justify-center mb-5 border border-zinc-700/50 transition-colors group-hover:bg-[#FF5812] group-hover:text-white">
                <Search size={20} strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold text-white mb-2.5">
                Identifying Gaps
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                We audit OCR scan errors, map complex form boundaries, and optimize reading orders to guarantee accurate document text representation.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 text-[#FF5812] flex items-center justify-center mb-5 border border-zinc-700/50 transition-colors group-hover:bg-[#FF5812] group-hover:text-white">
                <Cpu size={20} strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold text-white mb-2.5">
                Enabling Automation
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                We automate model deployments, setup auto-scaling file ingestion pipelines, and configure API integrations with downstream databases.
              </p>
            </div>

            {/* Card 3 - Highlighted in Orange */}
            <div className="group rounded-2xl bg-gradient-to-br from-[#FF6B00] via-[#FF5812] to-[#E64C00] p-6 flex flex-col border border-white/10 hover:scale-[1.01] transition-all duration-300 text-white shadow-[0_15px_30px_rgba(255,88,18,0.2)]">
              <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center mb-5 border border-white/10">
                <ShieldCheck size={20} strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold text-white mb-2.5">
                Ensuring Compliance
              </h3>
              <p className="text-xs sm:text-sm text-orange-50/90 leading-relaxed">
                We enforce data safety, automatically redacting PII, masking SSNs, and capturing detailed logs for SOC2, HIPAA, and GDPR audits.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 text-[#FF5812] flex items-center justify-center mb-5 border border-zinc-700/50 transition-colors group-hover:bg-[#FF5812] group-hover:text-white">
                <Activity size={20} strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold text-white mb-2.5">
                Monitoring Risks
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                We monitor parser pipeline performance, checking average document latency, model extraction confidence scores, and API error rates.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
