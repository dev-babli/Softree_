"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CTASection() {
  const testimonials = [
    {
      text: "Softree Technology helped us transform our digital presence with a seamless and scalable solution. Their team understood our vision and expectations.",
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
    <section className="relative py-14 px-4  text-white">
      <div className="absolute inset-0" />

      {/* 🔥 MAIN CARD */}
      <div className="relative z-10 max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        {/* INNER BG */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-orange-500/20" />

        <div className="relative grid md:grid-cols-[1.3fr_1fr]">
          {/* ================= LEFT ================= */}
          <div
            className="p-6 md:p-8 text-white bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/cta.png')" }}
          >
            <h2 className="text-3xl font-bold mb-4 text-white">
              Wait — Let’s Build Something Great Together
            </h2>

            <p className="text-gray-300 text-sm mb-6">
              Discover why growing businesses trust Softree Technology for
              reliable, scalable, and impactful digital solutions.
            </p>

            {/* 🏆 Awards */}
            <div className="flex flex-wrap gap-3 mb-10">
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
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3">
              {/* ❝ Quote */}
              <span className="absolute top-2 left-2 text-2xl text-white font-serif">
                “
              </span>

              <p className="text-m leading-relaxed mb-3 pl-4">{t.text}</p>

              <div className="flex items-center gap-2 mb-3">
                <img
                  src={t.img}
                  className="w-7 h-7 rounded-full"
                  alt={t.name}
                />

                <div>
                  <p className="text-xs font-medium">{t.name}</p>
                  <p className="text-[10px] text-gray-400">{t.role}</p>
                </div>
              </div>

              {/* Arrows */}
              <div className="flex justify-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  <ChevronLeft size={17} />
                </button>

                <button
                  onClick={nextSlide}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="bg-white p-6 md:p-8 w-full rounded-2xl border border-gray-100 shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                Share your requirements so our experts can understand your goals
                and craft a tailored solution.
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-4 text-gray-900">
              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-black rounded-lg px-3 py-2 text-sm outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Company Email</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-black rounded-lg px-3 py-2 text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">
                    Contact Number
                  </label>
                  <div className="flex items-center border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-black rounded-lg px-3 py-2">
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
                    className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-black rounded-lg px-3 py-2 text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Project Details</label>
                <textarea
                  rows={3}
                  placeholder="Describe your project"
                  className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-black rounded-lg px-3 py-2 text-sm outline-none resize-none transition"
                />
              </div>

              {/* Info Box */}
              <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                <span>🛡️</span>
                <p className="text-sm text-gray-800">
                  Fast 2-minute response. NDA-protected.
                </p>
              </div>

              {/* Captcha */}
              <div className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <span className="text-sm text-gray-700 font-medium">
                  2 + 1 = ?
                </span>

                <input
                  type="text"
                  placeholder="3"
                  className="w-20 bg-white border border-gray-300 rounded-md px-2 py-1 text-sm outline-none focus:border-black transition"
                />
              </div>

              {/* Button */}
              <button className="w-full bg-black text-white py-2.5 rounded-full text-sm">
                Submit Request →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
