'use client';

import React from 'react';

const keyServices = [
  "Website Redesign",
  "Web Development",
  "Branding",
  "WordPress",
  "Hubspot",
  "Webflow"
];

export default function BuildWebsiteSection() {
  return (
    <section className="bg-[#05020C] text-white py-24 px-6 md:px-12 relative overflow-hidden flex items-center justify-center min-h-screen font-sans">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Column: Content Area */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
          
          {/* Main Headings */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent leading-tight">
              Build the website you've always wanted
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
              You deserve more than &ldquo;good enough.&rdquo; We'll help you create the website your brand truly deserves&mdash;one that checks every box&mdash;strategic, stunning, easy to manage, and built to perform.
            </p>
          </div>

          {/* Key Services List */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-gray-300 uppercase">
              Key Services:
            </h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 max-w-md">
              {keyServices.map((service, index) => (
                <li key={index} className="text-gray-300 text-sm md:text-base font-medium flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-60"></span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="inline-flex items-center justify-center px-6 py-3.5 bg-[#E11D48] text-white font-bold text-xs tracking-wider uppercase rounded-full shadow-lg shadow-rose-600/20 hover:bg-[#BE123C] transition-all duration-200 group">
              Book A Strategy Session
              <svg className="w-3.5 h-3.5 ml-2 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>

            <button className="inline-flex items-center justify-center px-6 py-3.5 bg-[#1F1235]/60 border border-purple-500/20 text-white font-bold text-xs tracking-wider uppercase rounded-full backdrop-blur-sm hover:bg-[#1F1235]/90 transition-all duration-200 group">
              What To Expect With A Redesign
              <svg className="w-3.5 h-3.5 ml-2 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          </div>

          <hr className="border-gray-900 w-full pt-2" />

          {/* Updated Testimonial Block */}
          <div className="space-y-2 border-l-2 border-purple-500/30 pl-4">
            <p className="text-gray-400 italic text-xs md:text-sm leading-relaxed font-normal">
              &ldquo;SOFTREE has truly seen where we can take the website and make it look significantly different from all of our competitors. That’s been our main reason for engaging them. If you’re looking for a vendor with a unique perspective, then SOFTREE is the firm.&rdquo;
            </p>
          </div>

        </div>

        {/* Right Column: Stylized Portfolio Deck Graphics */}
        <div className="lg:col-span-5 relative w-full h-[400px] flex items-center justify-center">
          
          {/* Background Structural Grid Cards */}
          <div className="absolute grid grid-cols-2 gap-4 w-[120%] h-[120%] opacity-20 pointer-events-none scale-90 transform -rotate-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border border-purple-500/30 rounded-xl bg-[#120B24]/40 p-4 flex flex-col space-y-3">
                <div className="flex space-x-1"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div></div>
                <div className="h-3 w-2/3 bg-purple-500/20 rounded"></div>
                <div className="h-2 w-full bg-purple-500/10 rounded"></div>
              </div>
            ))}
          </div>

          {/* Foreground Featured Website Card */}
          <div className="relative w-full max-w-[420px] aspect-[16/10] rounded-xl border border-purple-500/30 bg-[#0F0A22] shadow-2xl p-4 flex flex-col space-y-3 z-10 transform hover:scale-[1.02] transition-transform duration-300">
            {/* Top Browser Bar Mock */}
            <div className="flex items-center justify-between border-b border-purple-500/10 pb-2">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-purple-500/40"></div>
                <div className="w-2 h-2 rounded-full bg-purple-500/40"></div>
                <div className="w-2 h-2 rounded-full bg-purple-500/40"></div>
              </div>
              <div className="h-2 w-24 bg-purple-500/10 rounded-full"></div>
            </div>
            
            {/* Inner Mock Content Image Graphic */}
            <div className="flex-grow rounded-lg bg-gradient-to-br from-[#1B113A] to-[#0A0518] relative overflow-hidden p-4 flex flex-col justify-end border border-purple-500/10">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0518] via-transparent to-transparent" />
              
              <div className="relative z-10 space-y-1.5 max-w-[200px]">
                <div className="h-2.5 w-16 bg-white/80 rounded"></div>
                <div className="h-1.5 w-full bg-white/40 rounded"></div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}