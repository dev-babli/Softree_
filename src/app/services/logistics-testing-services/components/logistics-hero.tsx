'use client'

import { ArrowRight } from 'lucide-react'
import AgenticFactory3D from './agentic-factory-3d'
import TrustStrip from '@/components/sections/TrustStrip'

export default function LogisticsHero() {
  return (
    <section className="relative w-full min-h-[650px] md:min-h-[850px] h-screen bg-[#07090e] text-white flex items-center overflow-hidden">
      {/* 3D Agentic Factory Scene */}
      <div className="absolute inset-0 z-0">
        <AgenticFactory3D embed={true} height="100%" />
      </div>

      {/* Hero Left Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pointer-events-none mt-16 sm:mt-0">
        <div className="max-w-xl pointer-events-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-[2px] bg-orange-500 inline-block" />
            <span className="text-xs uppercase tracking-widest text-orange-400 font-medium">
              Logistics Testing Services
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Validate Every Layer of Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              Logistics Systems
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            Test TMS, WMS, warehouse automation, visibility platforms, and EDI
            integrations before they hit production. Softree validates dispatch,
            inventory, carrier data, APIs, performance, and security across the supply chain stack.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto justify-center bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 text-sm">
              Talk to Our Logistics Testing Team
              <ArrowRight size={16} />
            </button>
            <button className="w-full sm:w-auto justify-center border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-full transition-all text-sm backdrop-blur-sm">
              Explore What We Test &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Trust Strip Overlay */}
      <div className="absolute bottom-8 left-0 w-full z-20 px-6 md:px-12">
        <TrustStrip theme="dark" />
      </div>
    </section>
  )
}
