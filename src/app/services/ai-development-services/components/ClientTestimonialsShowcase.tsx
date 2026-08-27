"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";

interface TestimonialItem {
  type: string;
  brand?: string;
  comment?: string;
  name: string;
  role: string;
  avatar?: string;
  img?: string;
  duration?: string;
}

export default function ClientTestimonialsShowcase() {
  const col1Items: TestimonialItem[] = [
    {
      type: "text",
      brand: "edfundo",
      comment: "We chose Softree to build our financial literacy and money management app from start to finish. From the first call, we were very impressed with Softree's professionalism, expertise, and commitment to delivering top-notch results.",
      name: "Simon Wing",
      role: "Co-Founder & CEO",
      avatar: "SW"
    },
    {
      type: "text",
      brand: "DOLIST APP",
      comment: "Softree delivered an exceptional mobile app that streamlined our task management features. Their AI integrations were seamless, and the performance exceeds our expectations.",
      name: "Tushar Patel",
      role: "CEO, DoList App",
      avatar: "TP"
    },
    {
      type: "text",
      brand: "Wicked Point LLC",
      comment: "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication.",
      name: "Natasha Adams",
      role: "CEO",
      avatar: "NA"
    },
    {
      type: "text",
      brand: "Nuvento",
      comment: "Softree demonstrated strong expertise in PowerApps development and delivered the project with excellent communication, responsiveness, and coordination throughout the engagement.",
      name: "Rahi Radhakrishnan",
      role: "Director of Delivery",
      avatar: "RR"
    }
  ];

  const col2Items: TestimonialItem[] = [
    {
      type: "text",
      brand: "ECG International",
      comment: "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
      name: "Arkady Fedorovtsjev",
      role: "IT Specialist",
      avatar: "AF"
    },
    {
      type: "text",
      brand: "MCCAW DIGITAL",
      comment: "Working with Softree was a game-changer. They transformed our legacy systems with smart automation and modern AI workflows, significantly reducing our operational overhead.",
      name: "Fred McCaw",
      role: "CEO, McCaw Digital LLC",
      avatar: "FM"
    },
    {
      type: "text",
      brand: "SP Marketplace",
      comment: "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed. Great experience all around.",
      name: "Darrell Trimble",
      role: "Founder",
      avatar: "DT"
    }
  ];

  // Duplicate arrays to create continuous infinite loops
  const col1Repeated = [...col1Items, ...col1Items];
  const col2Repeated = [...col2Items, ...col2Items];

  return (
    <section className="w-full font-sans overflow-hidden">

      {/* Dynamic Keyframes Injection */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .scroll-container-up {
          animation: scrollUp 30s linear infinite;
        }
        .scroll-container-down {
          animation: scrollDown 30s linear infinite;
        }
        .scroll-container-up:hover, .scroll-container-down:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* ================= TOP CTA BANNER ================= */}
      {/* <div className="w-full bg-[#FF8D6C] py-12 px-6 sm:px-12 lg:px-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

        <div className="relative z-10 max-w-2xl text-slate-900">
          <span className="text-[11px] font-extrabold tracking-widest uppercase opacity-85 block mb-2">
            Your AI Advantage Starts with the Right Technology Partner
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Let <span className="text-indigo-900">Softree</span> be your strategic competitive edge
          </h2>

          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md transition-all duration-300">
            Start AI Transformation
          </button>
        </div>

        <div className="relative w-full max-w-[360px] aspect-[1.7/1] hidden md:block select-none overflow-hidden rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] shrink-0 bg-black">
          <img
            src="/logo/Softree-Technology-Final-Logo-Dark-BG.png"
            alt="Softree Logo"
            className="w-full h-full object-contain p-4"
          />
        </div>
      </div> */}

      {/* ================= BOTTOM TESTIMONIALS SECTION ================= */}
      <div className="bg-black text-white py-20 lg:py-28 px-6 sm:px-12 lg:px-20 relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Title Block */}
          <div className="lg:col-span-4 flex flex-col justify-center items-start z-20">
            <span className="text-[11px] font-extrabold tracking-widest text-teal-400 uppercase mb-4 block">
              Testimonials
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-6">
              Our Clients on Working with Softree
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-sm">
              First-hand experiences from brands that scaled smarter, innovated faster, and achieved measurable growth with Softree.
            </p>

            <button className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 hover:bg-white hover:text-black text-white font-bold text-xs px-6 py-3 rounded-full transition-all duration-300 group">
              <span>View All Client Testimonials</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Staggered Masonry Scrolling Columns */}
          <div className="lg:col-span-8 h-[650px] overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 relative mask-gradient">
            {/* Fade effect at top & bottom of scrolling frame */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

            {/* Column 1 (Scrolls Upwards) */}
            <div className="flex flex-col gap-6 scroll-container-up">
              {col1Repeated.map((item, idx) => (
                <div key={idx} className="w-full shrink-0">
                  {item.type === "text" ? (
                    <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 backdrop-blur shadow-xl relative">
                      <span className="text-emerald-400 font-extrabold text-sm block mb-4 uppercase tracking-wider">{item.brand}</span>
                      <p className="text-[13.5px] leading-relaxed text-slate-300 mb-6">
                        "{item.comment}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs text-white">{item.avatar}</div>
                        <div>
                          <h5 className="text-[13px] font-bold text-white">{item.name}</h5>
                          <p className="text-[11px] text-slate-500">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl overflow-hidden aspect-[1.3/1] relative group cursor-pointer shadow-xl">
                      <img
                        src={item.img}
                        alt={`${item.name} Video Testimonial`}
                        className="w-full h-full object-cover opacity-65 group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-between p-6">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white self-center my-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                        <div>
                          <h5 className="text-[13px] font-bold text-white">{item.name}</h5>
                          <p className="text-[11px] text-slate-400">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Column 2 (Scrolls Downwards) */}
            <div className="flex flex-col gap-6 scroll-container-down">
              {col2Repeated.map((item, idx) => (
                <div key={idx} className="w-full shrink-0">
                  {item.type === "text" ? (
                    <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 backdrop-blur shadow-xl">
                      <span className="text-teal-400 font-extrabold text-sm block mb-4 uppercase tracking-wider">{item.brand}</span>
                      <p className="text-[13.5px] leading-relaxed text-slate-300 mb-6">
                        "{item.comment}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs text-white">{item.avatar}</div>
                        <div>
                          <h5 className="text-[13px] font-bold text-white">{item.name}</h5>
                          <p className="text-[11px] text-slate-500">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl overflow-hidden aspect-[1.3/1] relative group cursor-pointer shadow-xl">
                      <img
                        src={item.img}
                        alt={`${item.name} Video Testimonial`}
                        className="w-full h-full object-cover opacity-65 group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-between p-6">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white self-center my-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                        <div>
                          <h5 className="text-[13px] font-bold text-white">{item.name}</h5>
                          <p className="text-[11px] text-slate-400">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
