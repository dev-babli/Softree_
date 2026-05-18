"use client";

import { useState } from "react";
import { UploadCloud, Brain, Handshake, Sparkles } from "lucide-react";
export default function ContactPage() {

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    phone: "",
    desc: "",
    company: "",
    country: "",
    service: "",
    timeline: "",
  });

  const inputStyle =
    "w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus";

  return (
    <section className="relative min-h-[85vh]  text-gray-900 overflow-hidden py-5">
   
      {/* ================= MAIN GRID ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-4 lg:py-5 grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-stretch min-h-[540px]">
        {/* ================= LEFT PANEL ================= */}
        <div className="h-full flex flex-col gap-5 p-5 lg:p-6 rounded-[28px] bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-white/10 shadow-xl text-white">
          {/* TOP CONTENT */}
          <div>
            <span className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 text-xs font-medium rounded-full bg-white/10 border border-white/20 text-gray-200">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Trusted Digital Engineering Partner
            </span>

            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
              Powering Businesses with
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Scalable Digital Engineering
              </span>
            </h1>

            <p className="mt-3 text-base text-gray-300 max-w-lg">
              Softree helps organizations design, develop, and modernize digital
              platforms with a focus on performance, security and scalability.
            </p>
          </div>

          {/* WHY CHOOSE US */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-center">
              <h4 className="text-lg font-semibold uppercase tracking-widest bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent relative inline-block">
                Why Choose Softree
                <span className="block h-[2px] w-20 bg-gradient-to-r from-cyan-300 to-blue-400 mx-auto mt-2 rounded-full"></span>
              </h4>
            </div>

            {/* Content Card */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-lg">
              <div className="grid grid-cols-2 gap-6 text-sm text-gray-300">
                {/* Left */}
                <ul className="space-y-3">
                  {[
                    "Agile Engineering",
                    "Leadership Access",
                    "Trusted Since 2013",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 group transition duration-300 hover:translate-x-1"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 text-xs group-hover:bg-cyan-400 group-hover:text-white transition">
                        ✓
                      </span>
                      <span className="group-hover:text-white transition">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Right */}
                <ul className="space-y-3">
                  {[
                    "Scalable Solutions",
                    "Client-Centric Approach",
                    "Continuous Innovation",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 group transition duration-300 hover:translate-x-1"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 text-xs group-hover:bg-cyan-400 group-hover:text-white transition">
                        ✓
                      </span>
                      <span className="group-hover:text-white transition">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* TRUST STATS */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "200+", label: "Projects" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "24h", label: "Response" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg bg-gray-800 border border-gray-700 p-3 text-center"
              >
                <div className="text-cyan-400 font-bold text-lg">
                  {item.value}
                </div>
                <div className="text-[11px] text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>

          {/* FOOT NOTE */}
          <div className="text-xs text-gray-400 border-t border-white/10 pt-3">
            Our consultants typically respond within one business day. All
            information shared will remain confidential.
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
                    alert("✅ Request submitted successfully! We will get back to you shortly.");
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
                  <label className="text-xs text-gray-500">Full Name</label>
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
                {/* Contact Number */}
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

                {/* Company Name */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-500">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your company"
                    className="w-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-black rounded-lg px-3 py-2 text-sm outline-none transition"
                    required
                  />
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-1">
                <label className="text-xs text-gray-500">Project Details</label>
                <textarea
                  name="message"
                  rows={4}
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

              {/* CAPTCHA */}
              <div className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <span className="text-sm text-gray-700 font-medium">
                  2 + 1 = ?
                </span>

                <input
                  type="text"
                  name="captcha"
                  placeholder="Enter answer"
                  className="w-28 bg-white border border-gray-300 rounded-md px-2 py-1 text-sm outline-none focus:border-black transition"
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
    </section>
  );
}
