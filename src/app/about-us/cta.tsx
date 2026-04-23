"use client";

import { useState, useEffect } from "react";

export default function CTASection() {
  const testimonials = [
    {
      text: "Softree has been a wonderful partner for ECG Group. Their team is always responsive and committed to delivering top-quality solutions. We value their professionalism and look forward to continuing our successful collaboration.",
      name: "Arkady Fedorovtsjev",
      role: "IT Specialist, ECG Group",
    },
    {
      text: "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
      name: "Darrell Trimble",
      role: "CEO, SP Marketplace",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const t = testimonials[index];

  return (
    <section className="relative py-14 px-4  text-white">
      <div className="absolute inset-0" />

      {/* 🔥 MAIN CARD */}
      <div className="relative z-10 max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        {/* INNER BG */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-orange-500/20" />

        <div className="relative grid lg:grid-cols-[1.5fr_1fr] md:grid-cols-[1.3fr_1fr]">
          {/* ================= LEFT ================= */}
          <div
            className="p-6 md:p-8 text-white bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{ backgroundImage: "url('/images/cta.png')" }}
          >
            <h2 className="text-3xl font-bold mb-3 text-white leading-snug">
              Wait — Let's Build Something
              <br />
              Great Together
            </h2>

            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Discover why growing businesses trust Softree Technology for
              reliable, scalable, and impactful digital solutions.
            </p>

            {/* 🏆 Award Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-xs whitespace-nowrap">
                🏆 Top Software Company 2025
              </div>
              <div className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-xs whitespace-nowrap">
                ⭐ 4.9 Client Rating
              </div>
              <div className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-xs whitespace-nowrap">
                🚀 3000+ Projects Delivered
              </div>
            </div>

            {/* 🔥 Testimonial Card */}
            <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 pt-2">
              {/* ❝ Quote mark */}
              <span className="absolute top-2 left-3 text-3xl text-orange-400 font-serif leading-none">
                "
              </span>

              <p className="text-sm text-gray-200 leading-relaxed mb-2 pl-2">
                {t.text}
              </p>

              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-bold text-sm uppercase shrink-0">
                  {t.name?.charAt(0)}
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">{t.name}</p>
                  <p className="text-[10px] text-gray-400">{t.role}</p>
                </div>
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
            <form
              action="https://formspree.io/f/myklkyya"
              method="POST"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const captcha = formData.get("captcha")?.toString().trim();

                if (captcha !== "3") {
                  alert("❌ Incorrect captcha. Please try again.");
                  return;
                }

                try {
                  const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                      Accept: "application/json",
                    },
                  });

                  if (response.ok) {
                    alert(
                      "✅ Request submitted successfully! We will get back to you shortly.",
                    );
                    form.reset();
                  } else {
                    alert("❌ Something went wrong. Please try again.");
                  }
                } catch (error) {
                  alert("❌ Something went wrong. Please try again.");
                }
              }}
              className="space-y-4 text-gray-900"
            >
              {/* Hidden */}
              <input
                type="hidden"
                name="_subject"
                value="New Softree Lead 🚀"
              />

              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="John"
                    className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-black rounded-lg px-3 py-2 text-sm outline-none transition"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Company Email</label>
                  <input
                    type="email"
                    name="company_email"
                    placeholder="john@company.com"
                    className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-black rounded-lg px-3 py-2 text-sm outline-none transition"
                    required
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
                      name="phone"
                      placeholder="9876543210"
                      className="w-full text-sm outline-none bg-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500">
                    Work Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="work_email"
                    placeholder="john@work.com"
                    className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-black rounded-lg px-3 py-2 text-sm outline-none transition"
                  />
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Project Details</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Describe your project"
                  className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-black rounded-lg px-3 py-2 text-sm outline-none resize-none transition"
                  required
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
                  name="captcha"
                  placeholder="3"
                  className="w-20 bg-white border border-gray-300 rounded-md px-2 py-1 text-sm outline-none focus:border-black transition"
                  required
                />
              </div>

              {/* Honeypot */}
              <input type="text" name="_gotcha" style={{ display: "none" }} />

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-2.5 rounded-full text-sm hover:bg-gray-900 transition"
              >
                Submit Request →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
