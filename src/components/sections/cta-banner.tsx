"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CTASection() {
  const testimonials = [
    {
      text: "Softree Technology helped us transform our digital presence with a seamless and scalable solution. Their team understood our vision and delivered beyond expectations.",
      name: "Rahul Sharma",
      role: "Founder & CEO, FinEdge Solutions",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      text: "Amazing experience working with Softree. Their technical expertise and commitment helped us scale faster than expected.",
      name: "Ankit Verma",
      role: "CTO, NexaTech",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      text: "From idea to execution, Softree delivered everything perfectly. The team is highly professional and responsive.",
      name: "Priya Mehta",
      role: "Product Head, ScaleUp Labs",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex(index === 0 ? testimonials.length - 1 : index - 1);
  };

  const nextSlide = () => {
    setIndex(index === testimonials.length - 1 ? 0 : index + 1);
  };

  const t = testimonials[index];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-black via-[#020d1a] to-black text-white">
      <div className="absolute inset-0" />

      {/* 🔥 MAIN CARD */}
      <div className="relative z-10 max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        {/* INNER BG */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-orange-500/20" />

        {/* CONTENT */}
        <div className="relative grid md:grid-cols-2">
          {/* ================= LEFT ================= */}
          <div className="p-8 md:p-10 text-white bg-gradient-to-br from-black via-red-950 to-black">
            <h2 className="text-2xl font-semibold mb-4">
              Wait — Let’s Build Something Great Together
            </h2>

            <p className="text-gray-300 text-sm mb-10">
              Discover why growing businesses trust Softree Technology for
              reliable, scalable, and impactful digital solutions.
            </p>

            {/* 🏆 Awards */}
            <div className="flex flex-wrap gap-3 mb-15">
              <div className="px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-xs">
                🏆 Top Software Company 2025
              </div>
              <div className="px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-xs">
                ⭐ 4.9 Client Rating
              </div>
              <div className="px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-xs">
                🚀 3000+ Projects Delivered
              </div>
            </div>

            {/* 🔥 Testimonial Slider */}
            {/* 🔥 Testimonial Slider */}
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              {/* ❝ Quote Icon */}
              <span className="absolute top-4 left-4 text-5xl text-white font-serif">
                “
              </span>

              <p className="text-sm leading-relaxed mb-6 pl-6">{t.text}</p>

              <div className="flex items-center gap-3 mb-6">
                <img
                  src={t.img}
                  className="w-10 h-10 rounded-full"
                  alt={t.name}
                />

                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>

              {/* Arrows */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="bg-white p-8 md:p-10 w-full max-w-xl rounded-2xl border border-gray-100 shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                Share your requirements so our experts can understand your goals
                and craft a tailored solution.
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-6 text-gray-900">
              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-black rounded-lg px-4 py-3 text-sm outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Company Email</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-black rounded-lg px-4 py-3 text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">
                    Contact Number
                  </label>
                  <div className="flex items-center border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-black rounded-lg px-4 py-3">
                    <span className="text-sm text-gray-500 mr-2">+91</span>
                    <input
                      type="text"
                      placeholder="9876543210"
                      className="w-full text-sm outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500">
                    Work Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="john@work.com"
                    className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-black rounded-lg px-4 py-3 text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Project Details</label>
                <textarea
                  rows={4}
                  placeholder="Describe your project"
                  className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-black rounded-lg px-4 py-3 text-sm outline-none resize-none transition"
                />
              </div>

              {/* Info Box */}
              <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3">
                <span>🛡️</span>
                <p className="text-sm text-gray-800">
                  Fast 2-minute response. NDA-protected.
                </p>
              </div>

              {/* Captcha */}
              <div className="flex items-center justify-between gap-4 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                <span className="text-sm text-gray-700 font-medium">
                  2 + 1 = ?
                </span>

                <input
                  type="text"
                  placeholder="3"
                  className="w-24 bg-white border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-black transition"
                />
              </div>

              {/* Button */}
              <button className="w-full bg-black text-white py-3 rounded-full">
                Submit Request →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
