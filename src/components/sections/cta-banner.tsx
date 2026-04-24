"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const prevSlide = () => {
    setIndex(index === 0 ? testimonials.length - 1 : index - 1);
  };

  const nextSlide = () => {
    setIndex(index === testimonials.length - 1 ? 0 : index + 1);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const t = testimonials[index];

  return (
    <section className="relative py-14 px-4 bg-gradient-to-b from-black via-[#020d1a] to-black text-white">
      <div className="absolute inset-0" />

      {/* 🔥 MAIN CARD */}
      <div className="relative z-10 max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        {/* INNER BG */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-orange-500/20" />
        <div className="relative grid lg:grid-cols-[1.5fr_1fr] md:grid-cols-[1.3fr_1fr]">
          <div
            className="p-[2px] rounded-[20px] relative overflow-hidden h-full"
            style={{ background: "#1a1210" }}
          >
            {/* Conic gradient border ring */}
            <div
              className="absolute inset-0 rounded-[20px] opacity-35"
              style={{
                background:
                  "conic-gradient(from 200deg at 30% 20%, #ff7a2f 0deg, #c75a2a 60deg, #6b3a2a 120deg, #1a1210 200deg, #1a1210 360deg)",
              }}
            />

            {/* Inner panel */}
            <div
              className="relative rounded-[18px] overflow-hidden h-full"
              style={{
                background:
                  "linear-gradient(145deg, #1e1210 0%, #1a1010 40%, #151010 100%)",
              }}
            >
              {/* Ambient glow top-right */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: -60,
                  right: -40,
                  width: 220,
                  height: 220,
                  background:
                    "radial-gradient(circle, rgba(255,122,47,0.18) 0%, transparent 70%)",
                }}
              />
              {/* Ambient glow bottom-left */}
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: -40,
                  left: -20,
                  width: 160,
                  height: 160,
                  background:
                    "radial-gradient(circle, rgba(199,90,42,0.12) 0%, transparent 70%)",
                }}
              />

              {/* ⬇️ Reduced padding and gap here */}
              <div className="relative p-5 flex flex-col gap-4">
                {/* Trust chip */}
                <div
                  className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full border text-[11px] font-medium tracking-wide"
                  style={{
                    background: "rgba(255,122,47,0.15)",
                    borderColor: "rgba(255,122,47,0.3)",
                    color: "#ff9a5f",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "#ff7a2f",
                      boxShadow: "0 0 6px #ff7a2f",
                    }}
                  />
                  Trusted by 500+ Companies
                </div>

                {/* Heading */}
                <h2 className="text-[24px] font-semibold leading-snug tracking-tight text-white m-0">
                  Wait — Let's Build Something{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg, #ff7a2f, #ffaa70)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Great Together
                  </span>
                </h2>

                {/* Description */}
                <p
                  className="text-[13px] leading-relaxed max-w-3xl m-0"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Discover why growing businesses trust Softree Technology for
                  reliable, scalable, and impactful digital solutions.
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      icon: "star",
                      color: "#fbbf24",
                      label: "Top Software Co. 2025",
                    },
                    {
                      icon: "star",
                      color: "#34d399",
                      label: "4.9 Client Rating",
                    },
                    { icon: "bolt", color: "#818cf8", label: "3000+ Projects" },
                  ].map(({ icon, color, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.75)",
                      }}
                    >
                      {icon === "bolt" ? (
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill={color}
                        >
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                      ) : (
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill={color}
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      )}
                      {label}
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div
                  className="h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,122,47,0.4), transparent)",
                  }}
                />

                {/* Testimonial card — mt-auto pushes it to bottom if space allows */}
                <div
                  className="relative rounded-2xl p-4 overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Left accent stripe */}
                  <div
                    className="absolute top-0 left-0 w-[3px] h-full"
                    style={{
                      background: "linear-gradient(180deg, #ff7a2f, #c75a2a)",
                    }}
                  />

                  {/* Watermark quote SVG */}
                  <svg
                    className="absolute top-2 right-3 opacity-[0.06]"
                    width="36"
                    height="28"
                    viewBox="0 0 46 32"
                    fill="white"
                  >
                    <path d="M0 32V20C0 8.955 7.865 2.347 23.594 0L25 3.065C18.005 4.593 14.507 7.443 14.507 11.615H19V32H0ZM21 32V20C21 8.955 28.865 2.347 44.594 0L46 3.065C39.005 4.593 35.507 7.443 35.507 11.615H40V32H21Z" />
                  </svg>

                  {/* Quote text — clamp to 3 lines */}
                  <p
                    className="text-[12.5px] leading-relaxed pl-2 mb-3 italic mt-6"
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {t.text}
                  </p>

                  {/* Author row */}
                  <div className="flex items-center gap-2.5 pl-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold text-white shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #ff7a2f, #c75a2a)",
                        border: "1px solid rgba(255,122,47,0.5)",
                      }}
                    >
                      {t.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-white leading-tight m-0">
                        {t.name}
                      </p>
                      <p
                        className="text-[10px] m-0"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {t.role}
                      </p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="#fbbf24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
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
                  <label className="text-xs text-gray-500">Company Name</label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="Enter your company name"
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
