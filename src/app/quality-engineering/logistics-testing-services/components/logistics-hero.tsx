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
              LOGISTICS TESTING SERVICES
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Your Offshore{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              Logistics Software Testing & QA Partner
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            Validate logistics and supply chain applications with comprehensive software testing across TMS, WMS, warehouse automation, visibility platforms, EDI integrations, APIs, and enterprise logistics systems.
          </p>


        </div>
      </div>

      {/* Trust Strip Overlay */}
      <div className="absolute bottom-8 left-0 w-full z-20 px-6 md:px-12">
        <TrustStrip theme="dark" />
      </div>
    </section>
  )
}
