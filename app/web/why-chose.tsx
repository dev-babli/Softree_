"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

const stats = [
  "1000+ Web Developers",
  "300+ Full Stack Developers",
  "95% Project Success Ratio",
  "2500+ Web Applications Delivered",
  "50 Million+ Users Served",
  "End-to-end Web Development Support",
  "Flexible Hiring Models",
];

export default function WhyChooseSoftreeWeb() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-yellow-500/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* LEFT STICKY BOX */}
          <div className="sticky top-28 h-max self-start">
            <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-10 md:p-16 flex flex-col justify-center shadow-lg">
              <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6 leading-tight">
                Why Choose <span className="text-white">Softree</span> as Your Web App Development Company?
              </h2>
              <p className="text-white text-lg md:text-xl leading-relaxed">
                Softree is a top-tier web app development company delivering robust, scalable, and user-focused solutions worldwide. 
                Our team blends deep technical expertise with modern frameworks to build web applications that drive business growth.
              </p>
            </div>
          </div>

          {/* RIGHT GLASSMORPHISM STATS BOX */}
          <div className="flex items-start">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 w-full shadow-xl">
              <h3 className="text-3xl md:text-4xl text-white font-light mb-10">
                <span className="font-semibold text-white">12+ Years</span> of Web App Development Experience
              </h3>

              <ul className="space-y-6">
                {stats.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-white text-lg md:text-xl hover:text-blue-400 transition-colors duration-300"
                  >
                    <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mr-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
