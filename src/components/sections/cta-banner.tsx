"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FormStatus = "idle" | "submitting" | "success" | "error" | "captcha";

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
  const paused = useRef(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused.current) {
        setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const t = testimonials[index];

  return (
    <section className="relative py-14 px-4 sm:px-6 bg-[#0a0a0a] text-white">
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
                  Wait — Let&apos;s Build Something{" "}
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

                <div
                  className="relative rounded-2xl p-4 overflow-hidden"
                  style={{
                    background: "rgba(255, 122, 47, 0.08)",
                    border: "1px solid rgba(255, 122, 47, 0.15)",
                  }}
                >
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

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                      transition={{ type: "spring", duration: 0.45, bounce: 0 }}
                      onMouseEnter={() => { paused.current = true; }}
                      onMouseLeave={() => { paused.current = false; }}
                    >
                      {/* Quote text */}
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
                    </motion.div>
                  </AnimatePresence>

                  {/* Testimonial navigation dots */}
                  <div className="flex justify-center gap-1.5 mt-3">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        style={{
                          width: i === index ? 16 : 6,
                          height: 6,
                          borderRadius: 999,
                          background:
                            i === index ? "#ff7a2f" : "rgba(255,255,255,0.2)",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* ISO Certificates */}
                <div className="mt-2 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                  <p
                    className="text-[11px] mb-3 m-0"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Certified & Trusted
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* ISO 9001 */}
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                    >
                      <div
                        className="w-[27px] h-[27px] rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: "#1e3a5f" }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#60a5fa"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <div>
                        <span
                          className="block text-[12px] font-semibold"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          ISO 9001
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.45)" }}>
                          Quality mgmt.
                        </span>
                      </div>
                    </div>

                    {/* ISO 27001 */}
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                    >
                      <div
                        className="w-[22px] h-[22px] rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: "#1a3a2a" }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#4ade80"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <div>
                        <span
                          className="block text-[12px] font-semibold"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          ISO 27001
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.45)" }}>
                          Info security
                        </span>
                      </div>
                    </div>

                    {/* SOC 2 Type II */}
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                    >
                      <div
                        className="w-[22px] h-[22px] rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: "#2e1065" }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                      </div>
                      <div>
                        <span
                          className="block text-[12px] font-semibold"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          SOC 2 Type II
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.45)" }}>
                          Data privacy
                        </span>
                      </div>
                    </div>

                    {/* CMMI Level 3 */}
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                    >
                      <div
                        className="w-[22px] h-[22px] rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: "#451a03" }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21 12 17.77 5.82 21 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </div>
                      <div>
                        <span
                          className="block text-[12px] font-semibold"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          CMMI Level 3
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.45)" }}>
                          Process maturity
                        </span>
                      </div>
                    </div>

                    {/* GDPR Compliant */}
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                    >
                      <div
                        className="w-[22px] h-[22px] rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: "#082f49" }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          <path d="M2 12h20" />
                        </svg>
                      </div>
                      <div>
                        <span
                          className="block text-[12px] font-semibold"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          GDPR Ready
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.45)" }}>
                          Data protection
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ================= RIGHT ================= */}
          <div className="bg-[#111111] p-6 md:p-8 w-full rounded-2xl border border-white/8">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <p className="text-sm text-white/50 leading-relaxed max-w-md">
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
                  setFormStatus("captcha");
                  return;
                }

                setFormStatus("submitting");
                try {
                  const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: { Accept: "application/json" },
                  });

                  if (response.ok) {
                    setFormStatus("success");
                    form.reset();
                  } else {
                    setFormStatus("error");
                  }
                } catch {
                  setFormStatus("error");
                }
              }}
              className="space-y-4 text-white"
            >
              {/* Hidden */}
              <input
                type="hidden"
                name="_subject"
                value="New Softree Lead"
              />

              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-white/45">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="Your name"
                    className="w-full border border-white/10 bg-white/5 focus:bg-white/8 focus:border-[#ff7a2f]/50 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-white/45">Company Name</label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="Your company"
                    className="w-full border border-white/10 bg-white/5 focus:bg-white/8 focus:border-[#ff7a2f]/50 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition"
                    required
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-white/45">
                    Contact Number
                  </label>
                  <div className="flex items-center border border-white/10 bg-white/5 focus-within:bg-white/8 focus-within:border-[#ff7a2f]/50 rounded-lg px-3 py-2">
                    <span className="text-sm text-white/40 mr-2">+91</span>
                    <input
                      type="text"
                      name="phone"
                      placeholder="9876543210"
                      className="w-full text-sm text-white placeholder:text-white/30 outline-none bg-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/45">
                    Work Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="work_email"
                    placeholder="you@work.com"
                    className="w-full border border-white/10 bg-white/5 focus:bg-white/8 focus:border-[#ff7a2f]/50 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition"
                  />
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-1">
                <label className="text-xs text-white/45">Project Details</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Describe your project"
                  className="w-full border border-white/10 bg-white/5 focus:bg-white/8 focus:border-[#ff7a2f]/50 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none resize-none transition"
                  required
                />
              </div>

              {/* Info Box */}
              <div className="flex items-start gap-3 bg-[#ff7a2f]/8 border border-[#ff7a2f]/15 rounded-lg px-3 py-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff7a2f" strokeWidth="2" strokeLinecap="round" className="mt-0.5 shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <p className="text-sm text-white/65">
                  Fast 2-minute response. NDA-protected.
                </p>
              </div>

              {/* Captcha */}
              <div className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <span className="text-sm text-white/60 font-medium">
                  2 + 1 = ?
                </span>

                <input
                  type="text"
                  name="captcha"
                  placeholder="3"
                  className="w-20 bg-white/5 border border-white/15 rounded-md px-2 py-1 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#ff7a2f]/50 transition"
                  required
                />
              </div>

              {/* Honeypot */}
              <input type="text" name="_gotcha" style={{ display: "none" }} />

              {/* Inline form status */}
              <AnimatePresence mode="wait">
                {formStatus === "captcha" && (
                  <motion.p
                    key="captcha"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-red-400 px-1"
                  >
                    Incorrect captcha answer. Please try again.
                  </motion.p>
                )}
                {formStatus === "error" && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-red-400 px-1"
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}
                {formStatus === "success" && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-green-400 px-1"
                  >
                    ✓ Request submitted. We&apos;ll be in touch shortly.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Button */}
              <button
                type="submit"
                disabled={formStatus === "submitting" || formStatus === "success"}
                className="w-full bg-[#ff7a2f] text-white py-2.5 rounded-full text-sm font-medium hover:bg-[#e56a20] transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formStatus === "submitting" ? "Submitting…" : formStatus === "success" ? "Submitted ✓" : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
