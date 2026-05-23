"use client";

import React, { useState } from 'react';

// --- Types & Interfaces ---
interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  metric?: string;
}

// --- Shared Mock Data ---
const servicesData: ServiceItem[] = [
  { id: '01', title: 'Financial Architecture', desc: 'Comprehensive alignment mapping for enterprise scale and asset allocation management.', metric: '+142% ROI' },
  { id: '02', title: 'Growth Optimization', desc: 'Isolating operational bottlenecks and designing performance matrices that scale seamlessly.', metric: '2.4x Velocity' },
  { id: '03', title: 'Risk Compliance', desc: 'Future-proofing legal frameworks and system vulnerabilities against modern market shifts.', metric: 'Zero Risk' },
  { id: '04', title: 'Scale Automation', desc: 'Deploying custom infrastructure pipelines to cut structural overhead by half.', metric: '-40% Cost' }
];

export default function AscendiaShowcase() {
  // Switcher to view all three layout variants seamlessly in one file
  const [activeVariant, setActiveVariant] = useState<1 | 2 | 3>(1);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans selection:bg-blue-600 selection:text-white p-4 md:p-8">
      
      {/* ─── VARIANT SELECTOR CONTROLS ─── */}
      <div className="max-w-7xl mx-auto mb-8 bg-slate-900 text-white p-3 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="pl-3">
          <span className="text-xs uppercase tracking-widest font-mono text-slate-400">Layout Canvas Switcher</span>
          <h4 className="text-sm font-bold tracking-tight">Ascendia UI Kit Matrix</h4>
        </div>
        <div className="flex bg-slate-800 p-1.5 rounded-lg border border-slate-700 gap-1">
          {([1, 2, 3] as const).map((v) => (
            <button
              key={v}
              onClick={() => setActiveVariant(v)}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-tight transition-all ${
                activeVariant === v 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Variant {v === 1 ? '01: Overlap' : v === 2 ? '02: Asymmetric' : '03: Structured'}
            </button>
          ))}
        </div>
      </div>

      {/* ─── MAIN WHITE CANVAS COMPONENT CONTAINER ─── */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200/60 shadow-2xl overflow-hidden transition-all duration-500">
        
        {/* GLOBAL NAVIGATION HEAD HEADER */}
        <header className="w-full border-b border-slate-100 bg-white/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="text-xl font-black text-slate-900 tracking-tighter">
              Ascendia<span className="text-blue-600">.</span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-slate-500">
              <a href="#" className="text-slate-950 transition-colors">Home</a>
              <a href="#" className="hover:text-slate-950 transition-colors">Services</a>
              <a href="#" className="hover:text-slate-950 transition-colors">About Us</a>
              <a href="#" className="hover:text-slate-950 transition-colors">Pages</a>
              <a href="#" className="hover:text-slate-950 transition-colors">Contact</a>
            </nav>
            <div>
              <a href="#" className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-md transition-all">
                Consultation
              </a>
            </div>
          </div>
        </header>

        {/* ─── LAYOUT VARIANT 1: OVERLAPPING UI HERO ─── */}
        {activeVariant === 1 && (
          <div className="animate-fadeIn">
            <section className="relative w-full bg-slate-50/70 border-b border-slate-100 overflow-hidden">
              <div className="max-w-7xl mx-auto px-8 py-24 lg:py-32 grid lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded">
                    Corporate Excellence Matrix
                  </span>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                    Impressive Solutions <br />
                    <span className="text-slate-500 font-normal italic">Crafted for</span> Your Goal
                  </h1>
                  <p className="text-base text-slate-600 max-w-xl leading-relaxed">
                    Empowering modern enterprises with world-class operational blueprints, high-level structural strategy, and analytical infrastructure optimized for target scale benchmarks.
                  </p>
                  <div className="pt-4 flex flex-wrap gap-4">
                    <button className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-all">
                      Get Started Now
                    </button>
                    <button className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold text-xs uppercase tracking-wider rounded-md transition-all">
                      Watch Blueprint
                    </button>
                  </div>
                </div>

                {/* OVERLAPPING GRAPHICAL CARDS COLLAGE */}
                <div className="lg:col-span-5 relative w-full h-[480px] flex items-center justify-center bg-slate-100 rounded-xl border border-slate-200/50 overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
                  
                  {/* Backdrop Core Canvas Block */}
                  <div className="w-4/5 h-3/5 bg-slate-900 rounded-xl shadow-2xl relative transform -rotate-2 overflow-hidden border border-slate-800">
                    <div className="p-4 border-b border-slate-800 flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-slate-700" /><div className="w-2 h-2 rounded-full bg-slate-700" />
                    </div>
                  </div>

                  {/* Overlapping Floating Component Card */}
                  <div className="absolute top-1/4 left-12 w-2/3 bg-white border border-slate-200/80 p-5 rounded-xl shadow-xl transform translate-y-4 translate-x-2 transition-transform hover:translate-y-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">A</div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">Performance Index</h5>
                        <p className="text-[10px] text-slate-400">Live Metric Streaming</p>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-blue-600 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Standard Grid Grid for V1 */}
            <section className="w-full py-24 bg-white px-8">
              <div className="grid md:grid-cols-3 gap-8">
                {servicesData.slice(0, 3).map((s) => (
                  <div key={s.id} className="p-8 border border-slate-100 rounded-xl hover:shadow-xl hover:shadow-slate-100/50 transition-all">
                    <div className="w-10 h-10 rounded bg-slate-900 text-white font-bold text-xs flex items-center justify-center mb-6">{s.id}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ─── LAYOUT VARIANT 2: ASYMMETRIC CIRCULAR MASK ─── */}
        {activeVariant === 2 && (
          <div className="animate-fadeIn">
            <section className="w-full bg-white border-b border-slate-100 px-8 py-24 grid lg:grid-cols-12 gap-16 items-center">
              {/* Left Asymmetric Corporate Portrait Canvas */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-slate-900 relative overflow-hidden border-4 border-white shadow-2xl">
                  {/* Outer Circular Mask Graphics Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
                  <div className="absolute bottom-12 left-0 right-0 text-center text-white font-mono text-[10px] tracking-widest uppercase bg-slate-950/80 backdrop-blur py-2">
                    Executive Blueprint
                  </div>
                </div>
                {/* Floating Absolute Indicator Badge */}
                <div className="absolute -bottom-4 right-8 bg-blue-600 text-white text-xs font-black p-4 rounded-xl shadow-xl border border-blue-500">
                  EST. 2026
                </div>
              </div>

              {/* Right Context Copy Column */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600 block">02 / Tailored Framework Architecture</span>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
                  Innovative Solutions <br />Tailored for <span className="text-blue-600 underline decoration-2 underline-offset-4">Your Success</span>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                  We dismantle standard template operations. Our consulting team isolates exactly where your operational friction exists, integrating structural automations to secure repeatable asset acceleration.
                </p>

                {/* Split Sub-Points Grid */}
                <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">✓ Precision Scaling Blueprint</h4>
                    <p className="text-xs text-slate-500">Bespoke scaling mapping aligned with modern global market conditions.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">✓ Automated Risk Mitigation</h4>
                    <p className="text-xs text-slate-500">Proactive enterprise protection tracking architecture layers.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ─── LAYOUT VARIANT 3: STRUCTURED ROW MATRIX ─── */}
        {activeVariant === 3 && (
          <div className="animate-fadeIn">
            <section className="w-full bg-slate-950 text-white py-24 px-8">
              <div className="max-w-4xl mx-auto space-y-12">
                
                {/* Minimalist Centered Header */}
                <div className="text-center space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-blue-500 uppercase font-bold">03 / Data Matrix Presentation</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Structured Operational Capabilities</h2>
                  <p className="text-slate-400 text-xs max-w-md mx-auto">Realized efficiency statistics mapped directly across individual corporate system frameworks.</p>
                </div>

                {/* Structured List Row Component Feed */}
                <div className="border border-slate-800 rounded-xl bg-slate-900/50 divide-y divide-slate-800 overflow-hidden">
                  {servicesData.map((s) => (
                    <div 
                      key={s.id} 
                      className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900 transition-colors group"
                    >
                      <div className="flex items-start gap-4 sm:gap-6">
                        {/* Clean Border Icon Wrapper */}
                        <div className="w-10 h-10 border border-slate-700 rounded flex items-center justify-center font-mono text-xs font-bold text-slate-400 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors shrink-0">
                          {s.id}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                            {s.title}
                          </h4>
                          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                            {s.desc}
                          </p>
                        </div>
                      </div>

                      {/* Mini Metric Performance Badge Highlight */}
                      <div className="self-end sm:self-center">
                        <span className="inline-block px-3 py-1 text-[10px] font-mono font-bold bg-blue-950 text-blue-400 border border-blue-900 rounded">
                          {s.metric}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>
          </div>
        )}

        {/* COMPACT FOOTER OVERLAY BAR */}
        <footer className="w-full py-6 text-center border-t border-slate-100 bg-slate-50/50">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
            Ascendia UI Engineering Framework Engine © 2026
          </p>
        </footer>

      </div>
    </div>
  );
}