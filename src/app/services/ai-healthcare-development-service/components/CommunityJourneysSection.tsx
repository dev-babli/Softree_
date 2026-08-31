"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CommunityJourneysSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 text-neutral-900 relative overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Tagline & Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E58B6D] text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
            (Testimonials)
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#2A1D17] leading-tight">
            Health journeys shared by
            <span className="block text-[#BBA89B] font-semibold mt-1">
              our community
            </span>
          </h2>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Text Testimonial (Sarah M.) */}
          <div className="bg-[#F5EFE7] border border-[#E5DACD] rounded-[32px] p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              {/* Header Info */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="text-lg font-bold text-[#E58B6D]">Sarah M.</div>
                  <div className="text-xs text-[#8A7568] font-medium mt-0.5">
                    Health Conscious Member
                  </div>
                </div>
              </div>

              {/* Title & Quote */}
              <h3 className="text-xl font-bold text-[#2A1D17] mb-3">
                Quick and effortless
              </h3>
              <p className="text-xs sm:text-sm text-[#5E4C41] leading-relaxed font-normal">
                “Softree Health AI made lab testing & biomarker tracking stress-free. I requested data integration online, and had predictive health insights in less than 24 hours. I’ll never go back to waiting rooms again!”
              </p>
            </div>
          </div>

          {/* Card 2: Center Video Testimonial Card (Lucas P.) */}
          <div className="relative rounded-[32px] overflow-hidden min-h-[400px] flex flex-col justify-between p-6 sm:p-8 shadow-xl border border-[#E5DACD] group bg-[#2A1D17]">
            {/* HTML5 Video Element */}
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
              <source
                src="https://cdn.coverr.co/videos/coverr-doctor-typing-on-tablet-4848/1080p.mp4"
                type="video/mp4"
              />
            </video>

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C120C]/90 via-black/20 to-black/30 pointer-events-none" />

            {/* Top Play Button Badge */}
            <div className="relative z-10">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                aria-label="Play Healthcare Video"
                className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#E58B6D] shadow-lg hover:scale-110 transition-transform duration-300 group/btn cursor-pointer"
              >
                <Play size={20} className="fill-[#E58B6D] ml-0.5" />
              </button>
            </div>

            {/* Bottom Glass Overlay Info */}
            <div className="relative z-10 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white">
              <div className="text-base font-bold text-[#E58B6D]">Lucas P.</div>
              <div className="text-xs text-white/80 font-medium">
                Clinical AI Director
              </div>
            </div>
          </div>

          {/* Card 3: Text Testimonial with Avatar (David R.) */}
          <div className="bg-[#F5EFE7] border border-[#E5DACD] rounded-[32px] p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              {/* Header Info */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-[#E5DACD]">
                    <Image
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop"
                      alt="David R."
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#E58B6D]">David R.</div>
                    <div className="text-xs text-[#8A7568] font-medium">
                      Regular Health Tester
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Quote */}
              <h3 className="text-xl font-bold text-[#2A1D17] mb-3">
                Accurate results fast
              </h3>
              <p className="text-xs sm:text-sm text-[#5E4C41] leading-relaxed font-normal">
                “Having my health monitored regularly through Softree Healthcare AI keeps me confident and stress-free. The precision risk modeling and seamless clinical portal are top-tier!”
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          >
            <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              {/* Close Button */}
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <X size={20} />
              </button>

              {/* Modal Video Player */}
              <div className="aspect-video w-full relative">
                <video
                  autoPlay
                  controls
                  className="w-full h-full object-cover"
                  src="https://cdn.coverr.co/videos/coverr-doctor-typing-on-tablet-4848/1080p.mp4"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
