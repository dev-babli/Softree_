"use client";

import { motion } from "framer-motion";
import { Handshake, Rocket, Code2, Users, Brain, Target, Eye, Sliders } from "lucide-react";

// Dotted Wave background SVG pattern for gradient cards
const DottedWave = () => (
  <svg
    className="absolute bottom-0 right-0 w-[60%] h-[75%] opacity-25 pointer-events-none select-none mix-blend-screen"
    viewBox="0 0 400 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Horizontal perspective waves */}
    <path d="M 50,180 C 150,150 220,100 380,160" stroke="white" strokeWidth="0.8" strokeDasharray="1 5" />
    <path d="M 0,165 C 130,130 220,80 390,135" stroke="white" strokeWidth="0.8" strokeDasharray="1 5" />
    <path d="M -50,150 C 100,105 220,60 410,110" stroke="white" strokeWidth="0.8" strokeDasharray="1 5" />
    <path d="M -100,135 C 70,85 220,40 430,85" stroke="white" strokeWidth="0.8" strokeDasharray="1 5" />
    <path d="M -150,120 C 40,65 220,20 450,60" stroke="white" strokeWidth="0.8" strokeDasharray="1 5" />
    
    {/* Cross/Vertical perspective grid lines */}
    <path d="M 40,180 C 60,135 100,85 180,50" stroke="white" strokeWidth="0.6" strokeDasharray="1 5" />
    <path d="M 100,180 C 130,130 180,80 260,45" stroke="white" strokeWidth="0.6" strokeDasharray="1 5" />
    <path d="M 160,180 C 200,130 260,75 340,40" stroke="white" strokeWidth="0.6" strokeDasharray="1 5" />
    <path d="M 220,180 C 270,140 330,85 410,45" stroke="white" strokeWidth="0.6" strokeDasharray="1 5" />
    <path d="M 280,180 C 330,145 390,95 470,55" stroke="white" strokeWidth="0.6" strokeDasharray="1 5" />
  </svg>
);

// Flexible Delivery custom 4-square outline icon
const FlexibleIcon = () => (
  <svg
    className="w-12 h-12 text-[#1852FF]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" strokeDasharray="2 2.5" />
  </svg>
);

export default function CoreValuesSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section className="bg-white py-8 md:py-10 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ROW 1: MISSION & VISION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 md:mb-8">
          
          {/* Mission Card */}
          <motion.div
            {...fadeInUp}
            className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br from-[#021A52] via-[#083681] to-[#0A52A4] text-white flex flex-col justify-between min-h-[200px] h-full shadow-[0_15px_40px_rgba(2,26,82,0.12)] group hover:-translate-y-0.5 transition-all duration-300"
          >
            <DottedWave />
            <div className="absolute top-5 right-5 md:top-6 md:right-6 text-white/20 group-hover:text-white/45 group-hover:scale-105 transition-all duration-300 pointer-events-none select-none">
              <Target className="w-8 h-8 md:w-9 h-9" strokeWidth={1.5} />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 text-white text-[9px] font-bold tracking-widest uppercase mb-3 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Mission
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold leading-tight tracking-tight mb-1">
                Extend engineering capabilities.
              </h3>
              <p className="text-blue-100/90 text-sm leading-relaxed max-w-xl font-medium">
                We help businesses and technology partners access the expertise, teams, and technology they need to build and scale digital solutions.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br from-[#021A52] via-[#083681] to-[#0A52A4] text-white flex flex-col justify-between min-h-[200px] h-full shadow-[0_15px_40px_rgba(2,26,82,0.12)] group hover:-translate-y-0.5 transition-all duration-300"
          >
            <DottedWave />
            <div className="absolute top-5 right-5 md:top-6 md:right-6 text-white/20 group-hover:text-white/45 group-hover:scale-105 transition-all duration-300 pointer-events-none select-none">
              <Eye className="w-8 h-8 md:w-9 h-9" strokeWidth={1.5} />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 text-white text-[9px] font-bold tracking-widest uppercase mb-3 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Vision
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold leading-tight tracking-tight mb-1">
                Be the engineering partner teams trust.
              </h3>
              <p className="text-blue-100/90 text-sm leading-relaxed max-w-xl font-medium">
                Our vision is to become a long-term engineering partner for organizations building what comes next across AI, modern engineering, and Microsoft technologies.
              </p>
            </div>
          </motion.div>

        </div>

        {/* ROW 2: FOUR DIFFERENTIATORS */}
        <motion.div
          {...fadeInUp}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 py-8 md:py-10 border-y border-zinc-200/80 mb-6 md:mb-8"
        >
          {/* AI-First Engineering */}
          <div className="flex flex-col items-center text-center px-4 lg:border-r border-zinc-200/80 last:border-r-0">
            <div className="flex items-center justify-center mb-3 text-[#1852FF]">
              <Brain className="w-9 h-9" strokeWidth={1.5} />
            </div>
            <h4 className="text-zinc-950 text-xs font-extrabold tracking-wider uppercase mb-1">
              AI-First Engineering
            </h4>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-[240px] font-medium">
              Building intelligent solutions with future-ready technologies.
            </p>
          </div>

          {/* Partnership Mindset */}
          <div className="flex flex-col items-center text-center px-4 lg:border-r border-zinc-200/80">
            <div className="flex items-center justify-center mb-3 text-[#1852FF]">
              <Handshake className="w-9 h-9" strokeWidth={1.5} />
            </div>
            <h4 className="text-zinc-950 text-xs font-extrabold tracking-wider uppercase mb-1">
              Partnership Mindset
            </h4>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-[240px] font-medium">
              Working as an extension of your team.
            </p>
          </div>

          {/* Flexible Delivery */}
          <div className="flex flex-col items-center text-center px-4 lg:border-r border-zinc-200/80">
            <div className="flex items-center justify-center mb-3">
              <FlexibleIcon />
            </div>
            <h4 className="text-zinc-950 text-xs font-extrabold tracking-wider uppercase mb-1">
              Flexible Delivery
            </h4>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-[240px] font-medium">
              Engagement models built around your needs.
            </p>
          </div>

          {/* End-to-End Delivery */}
          <div className="flex flex-col items-center text-center px-4">
            <div className="flex items-center justify-center mb-3 text-[#1852FF]">
              <Rocket className="w-9 h-9" strokeWidth={1.5} />
            </div>
            <h4 className="text-zinc-950 text-xs font-extrabold tracking-wider uppercase mb-1">
              End-to-End Delivery
            </h4>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-[240px] font-medium">
              From idea to production and beyond.
            </p>
          </div>
        </motion.div>

        {/* ROW 3: THREE CARDS (APPROACH, EXPERTISE, MODEL) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr] gap-6">
          
          {/* Approach Card (Gradient) */}
          <motion.div
            {...fadeInUp}
            className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br from-[#021A52] via-[#083681] to-[#0A52A4] text-white flex flex-col justify-between min-h-[200px] h-full shadow-[0_15px_40px_rgba(2,26,82,0.12)] group hover:-translate-y-0.5 transition-all duration-300 lg:col-span-1"
          >
            <DottedWave />
            <div className="absolute top-5 right-5 md:top-6 md:right-6 text-white/20 group-hover:text-white/45 group-hover:scale-105 transition-all duration-300 pointer-events-none select-none">
              <Sliders className="w-8 h-8 md:w-9 h-9" strokeWidth={1.5} />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 text-white text-[9px] font-bold tracking-widest uppercase mb-3 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Our Approach
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold leading-tight tracking-tight mb-1">
                Senior teams, proven delivery.
              </h3>
              <p className="text-blue-100/90 text-sm leading-relaxed max-w-xl font-medium">
                We work as an extension of your team, combining experienced engineering talent, modern technology, and structured delivery to move projects from idea to production.
              </p>
            </div>
          </motion.div>

          {/* Engineering Expertise Card */}
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.05 }}
            className="rounded-3xl p-5 md:p-6 bg-white border border-zinc-200/60 shadow-[0_10px_35px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center justify-center min-h-[200px] h-full"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50 border border-blue-100/50 mb-3 text-[#1852FF] shadow-sm">
              <Code2 className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <h4 className="text-[#1852FF] text-xs font-extrabold tracking-wider uppercase mb-1">
              Engineering Expertise
            </h4>
            <p className="text-zinc-600 text-xs leading-relaxed font-medium px-2">
              AI, modern engineering, Microsoft, cloud, and data expertise brought together to solve complex technology challenges.
            </p>
          </motion.div>

          {/* Partnership Model Card */}
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
            className="rounded-3xl p-5 md:p-6 bg-white border border-zinc-200/60 shadow-[0_10px_35px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center justify-center min-h-[200px] h-full"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E6F8F7] border border-teal-100/50 mb-3 text-teal-600 shadow-sm">
              <Users className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <h4 className="text-teal-600 text-xs font-extrabold tracking-wider uppercase mb-1">
              Partnership Model
            </h4>
            <p className="text-zinc-600 text-xs leading-relaxed font-medium px-2">
              Dedicated teams, white-label delivery, staff augmentation, project delivery, and managed services designed around how you work.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
