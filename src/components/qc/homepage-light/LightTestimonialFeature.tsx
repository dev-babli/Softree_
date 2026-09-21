"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

// Real client data from TestimonialsSplitSlider
const testimonials = [
  {
    text: "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    name: "Darrell Trimble",
    role: "CEO",
    company: "SP Marketplace",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256",
    logoText: "SP MARKETPLACE",
    bgImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    country: "California",
  },
  {
    text: "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication.",
    name: "Natasha Adams",
    role: "Partner",
    company: "Wicked Point LLC",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256",
    logoText: "WICKED POINT",
    bgImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    country: "Virginia",
  },
  {
    text: "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
    name: "Arkady Fedorovtsjev",
    role: "IT Specialist",
    company: "ECG International",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256&h=256",
    logoText: "ECG INT",
    bgImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    country: "Netherlands",
  },
  {
    text: "Softree demonstrated strong expertise in PowerApps development and delivered the project with excellent communication, responsiveness, and coordination throughout the engagement.",
    name: "Rahi Radhakrishnan",
    role: "Director of Delivery",
    company: "Nuvento",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256&h=256",
    logoText: "NUVENTO",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    country: "USA",
  },
  {
    text: "A trusted technology solutions provider with strong expertise in security, compliance, and enterprise delivery.",
    name: "Asif Mohamed",
    role: "CTO",
    company: "Adiva Information Technology LLC",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
    logoText: "ADIVA IT",
    bgImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    country: "UAE",
  },
];

/* ── Company-to-logo mapping ─────────────────────────────────────── */
const companyLogos: Record<string, string> = {
  "SP Marketplace": "/images/logo/sp-marketplace.png",
  "Wicked Point LLC": "/images/logo/wickedpoint.jpg",
  "ECG International": "/images/logo/ecg.png",
  Nuvento: "/images/logo/nuvento.jpg",
  Bosch: "/images/logo/bosch.png",
  Deloitte: "/images/logo/deloitte.png",
  Microsoft: "/images/logo/microsoft.png",
  Sanofi: "/images/logo/sanofi.jpg",
  "Snap-on": "/images/logo/snapon.jpg",
  Google: "/images/logo/google.png",
};

export function LightTestimonialFeature() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const currentSlide = testimonials[currentIndex];

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const companyLogo = companyLogos[currentSlide.company];

  return (
    <section
      data-section="testimonials"
      className="bg-white py-10 md:py-14 overflow-hidden w-full border-t border-[#0a0a1a]/[0.05]"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-[1400px] px-4 sm:px-6 lg:px-12 w-full mx-auto">

        {/* Custom Designed Section Header (No commas, black & orange scheme) */}
        <div className="text-center mb-10 md:mb-12 flex flex-col items-center max-w-6xl mx-auto px-4">

          {/* Pill Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF5812]/20 bg-[#FF5812]/05 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.20em] text-[#FF5812] mb-5 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5812]" />
            CLIENT TESTIMONIALS
          </span>

          {/* Designed Main Title (One size, black & orange scheme, comma-free) */}
          <h2 id="testimonials-heading" className="text-[#0a0a1a] tracking-tight mb-4 flex flex-col items-center">
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-zinc-400/90 uppercase mb-2.5">
              What Clients Say
            </span>
            <span className="font-black text-3xl md:text-5xl leading-[1.1] max-w-none block w-full">
              <span className="text-[#0a0a1a]">Trusted by</span>{" "}
              <span className="text-[#FF5812] drop-shadow-[0_2px_12px_rgba(255,88,18,0.15)]">
                Businesses Worldwide
              </span>
            </span>
          </h2>

          {/* Subheading Description (Comma-free) */}
          <p className="text-zinc-600/90 font-medium text-base md:text-lg leading-relaxed max-w-2xl mt-1">
            See how organizations across industries have transformed their operations with Softree Technology enterprise solutions
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-5 items-stretch">

          {/* Left Side (3 columns wide on desktop) */}
          <div className="lg:col-span-3 flex flex-col gap-4 md:gap-5">

            {/* Top Row: 2 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

              {/* Profile Card */}
              <div className="relative bg-gradient-to-br from-[#FF5812]/20 via-[#0a0a0f] to-[#FF5812]/05 rounded-[1.25rem] p-4 flex items-center gap-4 border border-zinc-800/80 overflow-hidden shadow-lg h-[130px]">
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0" />

                {/* Ambient Glow Orb */}
                <div className="absolute -top-16 -right-16 w-[180px] h-[180px] bg-[#FF5812]/10 rounded-full blur-[50px] pointer-events-none z-0" />

                {/* Avatar Initials Box (Rotating HUD design with orange glow) */}
                <div className="relative w-[84px] h-[84px] rounded-full bg-gradient-to-br from-[#FF5812]/15 via-[#050505] to-[#FF5812]/5 border border-[#FF5812]/30 shrink-0 flex items-center justify-center z-10 shadow-inner group">
                  {/* Glowing rotating dash ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#FF5812]/40 animate-[spin_40s_linear_infinite] pointer-events-none" />
                  <span className="text-[#FF5812] font-black text-3xl tracking-tighter select-none drop-shadow-[0_2px_8px_rgba(255,88,18,0.4)]">
                    {getInitials(currentSlide.name)}
                  </span>
                </div>

                {/* Profile Details */}
                <div className="flex flex-col justify-center pr-2 z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-white font-bold text-base mb-1">{currentSlide.name}</h4>
                      <p className="text-white/60 text-xs leading-normal">
                        <span className="font-semibold text-white/80">{currentSlide.role}</span>
                        <br />
                        <span className="text-[#FF5812] font-semibold">{currentSlide.company}</span>
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Logo & Enterprise Region Card - High-Tech Glass Cockpit */}
              <div className="relative bg-gradient-to-br from-[#FF5812]/20 via-[#0a0a0f] to-[#FF5812]/05 rounded-[1.25rem] p-3.5 sm:p-4 flex items-center border border-zinc-800/80 overflow-hidden shadow-lg h-[130px]">
                {/* Micro Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0" />

                {/* Ambient Warm Orange Glow */}
                <div className="absolute -bottom-16 -right-16 w-[180px] h-[180px] bg-[#FF5812]/12 rounded-full blur-[50px] pointer-events-none z-0" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`logo-${currentIndex}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between z-10 w-full h-full gap-3"
                  >
                    {/* Left Side: Dedicated White Logo Plaque for 100% Logo Visibility */}
                    <div className="flex-1 flex items-center justify-center h-full max-w-[170px] sm:max-w-[190px]">
                      <div className="w-full h-[76px] rounded-xl bg-white flex items-center justify-center p-2.5 sm:p-3 border border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-transform duration-300 hover:scale-[1.03]">
                        {companyLogo ? (
                          <img
                            src={companyLogo}
                            alt={`${currentSlide.company} logo`}
                            className="max-w-[130px] sm:max-w-[150px] max-h-[52px] sm:max-h-[58px] w-auto h-auto object-contain"
                          />
                        ) : (
                          <span className="border border-[#FF5812]/30 bg-[#FF5812]/05 px-3 py-1.5 rounded-full text-[#FF5812] font-black tracking-widest uppercase text-xs text-center truncate">
                            {currentSlide.logoText}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Gradient Laser Divider */}
                    <div className="w-[1px] h-[65%] bg-gradient-to-b from-transparent via-[#FF5812]/50 to-transparent shrink-0" />

                    {/* Right Side: High-Tech Global Region Station */}
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 pl-1">
                      <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#FF5812]/25 via-[#FF5812]/10 to-transparent border border-[#FF5812]/40 shrink-0 shadow-inner">
                        <span className="absolute inset-0 rounded-full bg-[#FF5812]/25 animate-ping opacity-75 pointer-events-none" />
                        <MapPin className="w-4 h-4 text-[#FF5812] relative z-10" />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-mono tracking-widest text-[#FF5812] font-bold uppercase">
                          REGION
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white tracking-tight truncate drop-shadow-sm">
                          {currentSlide.country}
                        </span>
                       
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Bottom Row: Quote Card (Dynamic, compact height to remove empty space) */}
            <div className="relative bg-gradient-to-br from-[#FF5812]/20 via-[#0a0a0f] to-[#FF5812]/05 rounded-[1.5rem] p-6 md:p-8 flex flex-col justify-between border border-zinc-800/80 overflow-hidden shadow-xl min-h-[250px] md:min-h-[270px]">
              {/* Grid Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

              {/* Ambient Glow Orb */}
              <div className="absolute -top-32 -right-32 w-[350px] h-[350px] bg-[#FF5812]/15 rounded-full blur-[90px] pointer-events-none z-0" />

              <div className="z-10 flex flex-col">
                {/* Quotation mark */}
                <span className="text-6xl font-serif text-[#FF5812] leading-none block select-none mb-1 -translate-y-2 opacity-90">
                  “
                </span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`quote-${currentIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Modern advanced quote message styled with an elegant, responsive serif italic font */}
                    <p className="text-xl md:text-2xl text-zinc-100 font-serif italic leading-relaxed tracking-wide max-w-[95%]">
                      {currentSlide.text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation (Advanced styled HUD orange buttons with hover animations) */}
              <div className="flex justify-end items-center gap-4 mt-6 z-10">
                <button
                  onClick={handlePrev}
                  className="relative w-[48px] h-[48px] rounded-full border border-[#FF5812]/30 bg-black/40 flex items-center justify-center text-[#FF5812] hover:text-white hover:border-[#FF5812] hover:bg-[#FF5812] hover:shadow-[0_0_15px_rgba(255,88,18,0.4)] transition-all duration-300 focus:outline-none cursor-pointer group"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="relative w-[48px] h-[48px] rounded-full border border-[#FF5812]/30 bg-black/40 flex items-center justify-center text-[#FF5812] hover:text-white hover:border-[#FF5812] hover:bg-[#FF5812] hover:shadow-[0_0_15px_rgba(255,88,18,0.4)] transition-all duration-300 focus:outline-none cursor-pointer group"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Side (1 column wide on desktop) - Tall Image Card (stretches to match left side height) */}
          <div className="lg:col-span-1 h-[260px] lg:h-auto rounded-[1.5rem] overflow-hidden relative border border-zinc-800/80 shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={`bg-${currentIndex}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 h-full w-full"
              >
                <img
                  src={currentSlide.bgImage}
                  alt="Client background"
                  className="w-full h-full object-cover brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85" />

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

export default LightTestimonialFeature;