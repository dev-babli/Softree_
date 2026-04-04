"use client";

import { useState } from "react";
import { UploadCloud, Brain, Handshake, Sparkles } from "lucide-react";
import {
  User,
  Mail,
  Phone,
  DollarSign,
  FileText,
  Send,
  MapPin,
} from "lucide-react";

export default function ContactPage() {
  const [files, setFiles] = useState<FileList | null>(null);

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    phone: "",
    desc: "",
    company: "",
    country: "",
  });

  const inputStyle =
    "w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition";

  return (
    <section className="relative min-h-[85vh]  text-gray-900 overflow-hidden py-19">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-50 via-white to-blue-50" />

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

        {/* ================= RIGHT PANEL ================= */}
        <div className="h-full flex flex-col p-5 lg:p-6 rounded-[28px] bg-gradient-to-bl from-gray-900 via-gray-800 to-black border border-white/10 shadow-xl text-white">
          {/* HEADER */}
          <div>
            <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              Start Your Digital Transformation
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              Share your requirements and our experts will connect with you.
            </p>
          </div>

          {/* FORM */}
          <form className="flex flex-col flex-1 space-y-5">
            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  className={`${inputStyle} pl-9`}
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  className={`${inputStyle} pl-9`}
                  placeholder="Business Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Company + Country */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="relative">
                <FileText className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  className={`${inputStyle} pl-9`}
                  placeholder="Company Name"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  className={`${inputStyle} pl-9`}
                  placeholder="Country / Location"
                  value={form.country}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Budget + Phone */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="relative">
                <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <select
                  className={`${inputStyle} pl-9`}
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                >
                  <option>Estimated Budget</option>
                  <option>$5k – $10k</option>
                  <option>$10k – $25k</option>
                  <option>$25k+</option>
                </select>
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  className={`${inputStyle} pl-9`}
                  placeholder="Contact Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Description */}
            <div className="relative">
              <FileText className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <textarea
                rows={2}
                className={`${inputStyle} pl-9 resize-none`}
                placeholder="Briefly describe your project..."
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />
            </div>

            {/* Upload */}
            <label className="group flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-white/20 rounded-xl p-4 bg-white/5 hover:border-cyan-400 hover:bg-white/10 transition-all">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => setFiles(e.target.files)}
              />
              <UploadCloud className="w-5 h-5 text-cyan-400" />
              <p className="text-xs text-gray-300">
                Drag & Drop or browse files
              </p>
            </label>

            {/* BUTTON */}
            <div className="mt-auto">
              <button
                type="button"
                onClick={() => {
                  const subject = "New Consultation Request";

                  const body = `
Name: ${form.name}
Email: ${form.email}
Company: ${form.company}
Country: ${form.country}
Phone: ${form.phone}
Budget: ${form.budget}

Project Details:
${form.desc}
            `;

                  window.location.href = `mailto:srikantb@softreetechnology.com,sales@softreetechnology.com?subject=${encodeURIComponent(
                    subject,
                  )}&body=${encodeURIComponent(body)}`;
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] text-white py-3 rounded-lg font-medium transition"
              >
                <Send className="w-4 h-4" />
                Request Consultation
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
