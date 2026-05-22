"use client";

import React from "react";

const CornerSmooth = ({ className, color = "white" }: { className?: string; color?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 24C0 10.7452 10.7452 0 24 0V24H0Z" fill={color} />
  </svg>
);

export default function ChannelCard() {
  return (
    <div className="w-full h-full max-h-screen bg-[#0a0a0a] flex items-center justify-center p-3 lg:p-6 overflow-hidden">
      
      {/* ── MAIN WHITE CARD ── */}
      <div className="w-full h-full max-w-[1600px] bg-white rounded-[40px] flex flex-col font-sans text-black relative overflow-hidden shadow-2xl">
        
        {/* ── BANNER (TOP HALF) ── */}
        <div className="relative flex-[0.55] min-h-0 w-full p-2 lg:p-3 pb-0">
          <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-gray-100">
            {/* Banner Image */}
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000" 
              alt="Interior Design" 
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Top-Left Logo Area */}
            <div className="absolute top-0 left-0 bg-white rounded-br-[36px] pt-3 pl-3 pr-6 pb-6 z-20">
              <div className="w-14 h-14 md:w-[64px] md:h-[64px] bg-[#0a0a0a] rounded-[20px] flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 18L10 12L4 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 18L18 12L12 6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Smooth Cuts */}
              <CornerSmooth className="absolute top-0 -right-[23.5px] rotate-180" color="white" />
              <CornerSmooth className="absolute left-0 -bottom-[23.5px] rotate-180" color="white" />
            </div>

            {/* Top-Right Menu Area (Pill Shape) */}
            <div className="absolute top-0 right-0 bg-white rounded-bl-[36px] pt-3 pr-3 pl-6 pb-6 z-20">
              <div className="w-[80px] h-14 md:w-[96px] md:h-[64px] bg-[#0a0a0a] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              {/* Smooth Cuts */}
              <CornerSmooth className="absolute top-0 -left-[23.5px] -rotate-90" color="white" />
              <CornerSmooth className="absolute right-0 -bottom-[23.5px] -rotate-90" color="white" />
            </div>

            {/* Center Badge Cutout */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180px] h-[90px] bg-white rounded-t-full z-20">
              <CornerSmooth className="absolute bottom-0 -left-[23.5px] rotate-0" color="white" />
              <CornerSmooth className="absolute bottom-0 -right-[23.5px] rotate-90" color="white" />
            </div>
          </div>
        </div>

        {/* CENTER BADGE */}
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pt-3">
          <div className="w-[140px] h-[140px] md:w-[150px] md:h-[150px] bg-[#0a0a0a] rounded-full flex items-center justify-center relative cursor-pointer hover:scale-105 transition-transform duration-500 shadow-2xl shadow-black/20">
            {/* Circular Text SVG */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_15s_linear_infinite]">
              <path id="textCircle" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
              <text className="text-[10px] uppercase font-bold tracking-wider" fill="white">
                <textPath href="#textCircle" startOffset="0%" textLength="215">
                  VIEW OUR WORK • VIEW OUR WORK • VIEW OUR WORK • 
                </textPath>
              </text>
            </svg>
            {/* Center Arrow */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="rotate-45">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* ── BOTTOM CONTENT (BOTTOM HALF) ── */}
        <div className="flex-[0.45] min-h-0 w-full mt-4 lg:mt-8 flex flex-col lg:flex-row gap-8 lg:gap-10 px-5 lg:px-10 pb-5 lg:pb-8">
          
          {/* ════ LEFT COLUMN ════ */}
          <div className="flex-[1.2] flex flex-col min-h-0">
            
            <h1 className="text-[2.75rem] lg:text-[3.75rem] xl:text-[4.25rem] font-bold tracking-tight leading-[1.05] text-[#0a0a0a]">
              Designing spaces<br/>that feel timeless
            </h1>

            <div className="flex-1 flex gap-6 lg:gap-10 mt-6 lg:mt-8 min-h-0">
              
              {/* Sub-column A: Text, Button, Socials (Stacked with natural gap at bottom) */}
              <div className="flex-[0.8] flex flex-col gap-6 lg:gap-8 h-full">
                <p className="text-gray-500 text-sm lg:text-[0.95rem] leading-relaxed font-medium max-w-[280px]">
                  We create calm, functional, and emotionally engaging interiors tailored for modern lifestyles.
                </p>
                
                <button className="bg-[#0a0a0a] text-white px-8 py-4 lg:px-9 lg:py-4 rounded-[40px] w-fit text-[10px] lg:text-xs font-bold tracking-[0.15em] hover:bg-gray-800 hover:shadow-lg transition-all mt-1">
                  BOOK CONSULTATION
                </button>

                {/* Social Icons floating higher up, leaving empty space below */}
                <div className="flex gap-3 lg:gap-4 mt-2 lg:mt-6">
                  <a href="#" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-[1.5px] border-gray-200 flex items-center justify-center text-[#0a0a0a] hover:bg-gray-50 hover:border-gray-400 transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-[1.5px] border-gray-200 flex items-center justify-center text-[#0a0a0a] hover:bg-gray-50 hover:border-gray-400 transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                  </a>
                  <a href="#" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-[1.5px] border-gray-200 flex items-center justify-center text-[#0a0a0a] hover:bg-gray-50 hover:border-gray-400 transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                </div>
              </div>

              {/* Sub-column B: 3 Vertical Cards spanning the full height to the bottom */}
              <div className="flex-[1.2] flex gap-3 lg:gap-4 h-full pb-1 lg:pb-0">
                {[
                  { title: 'Commercial', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400' },
                  { title: 'Residential', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09c15faa?auto=format&fit=crop&q=80&w=400' },
                  { title: 'Renovation', img: 'https://images.unsplash.com/photo-1505691938895-1758d7def51a?auto=format&fit=crop&q=80&w=400' }
                ].map((card, i) => (
                  <div key={i} className="flex-1 relative rounded-[24px] lg:rounded-[32px] overflow-hidden group cursor-pointer shadow-sm">
                    <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                    <span className="absolute bottom-5 w-full text-center text-white text-xs lg:text-sm font-semibold tracking-wide z-10">{card.title}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ════ RIGHT COLUMN ════ */}
          <div className="flex-[0.9] flex flex-col gap-4 lg:gap-5 min-h-0 pb-1 lg:pb-0">
            {[
              { title: 'Casa Noir Residence', img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800' },
              { title: 'Aurelia Living', img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=800' }
            ].map((card, i) => (
              <div key={i} className="flex-1 relative rounded-[28px] lg:rounded-[40px] overflow-hidden group cursor-pointer bg-gray-100 shadow-sm">
                <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-6 lg:bottom-8 left-6 lg:left-8 right-6 lg:right-8 flex justify-between items-end">
                  <span className="text-white font-medium text-lg lg:text-xl tracking-wide">{card.title}</span>
                  <span className="text-white/90 text-[10px] lg:text-xs tracking-widest uppercase font-semibold flex items-center gap-2 group-hover:text-white transition-colors">
                    View Project <span className="text-2xl leading-none font-light -mt-1">&rarr;</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
