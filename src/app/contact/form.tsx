"use client";

import { useState } from "react";
import { UploadCloud, Brain, Handshake, Sparkles } from "lucide-react";
import { User, Mail, Phone, DollarSign, FileText, Send } from "lucide-react";

export default function ContactPage() {
  const [files, setFiles] = useState<FileList | null>(null);

  const inputStyle =
    "w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition";

  return (
    <section className="relative min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-50 via-white to-blue-50" />

      {/* ================= MAIN GRID ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:py-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-stretch">
        {/* ================= LEFT PANEL ================= */}
        <div
          className="
      h-full
      flex flex-col gap-12
      p-8 lg:p-10
      rounded-[28px]
      bg-gradient-to-br from-gray-900 via-gray-800 to-black
      border border-white/10
      shadow-xl
      text-white
    "
        >
          {/* TOP CONTENT */}
          <div>
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 text-xs font-medium rounded-full bg-white/10 border border-white/20 text-gray-200">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Trusted Digital Engineering Partner
            </span>

            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              Powering Businesses with
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Scalable Digital Engineering
              </span>
            </h1>

            <p className="mt-5 text-base text-gray-300 max-w-lg">
              Softree helps organizations design, develop, and modernize digital
              platforms with a focus on performance, security, and scalability.
            </p>
          </div>

          {/* ================= FEATURE CARDS ================= */}
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Share Your Requirements",
                desc: "Tell us about your goals and challenges.",
                icon: Brain,
              },
              {
                title: "Expert Consultation",
                desc: "Connect directly with our architects.",
                icon: Handshake,
              },
            ].map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="
    group
    p-5 rounded-xl
    bg-gray-800
    border border-gray-700
    shadow-sm
    hover:bg-gray-700
    hover:shadow-lg
    hover:-translate-y-1
    transition-all duration-300
  "
                >
                  {/* Icon */}
                  <div
                    className="
      w-10 h-10 mb-3
      flex items-center justify-center
      rounded-lg
      bg-gray-700
      group-hover:bg-cyan-500/20
      transition
    "
                  >
                    <Icon className="w-4 h-4 text-gray-300 group-hover:text-cyan-400" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div
          className="
    h-full
    flex flex-col gap-8
    p-8 lg:p-10
    rounded-[28px]
    bg-gradient-to-bl from-gray-900 via-gray-800 to-black
    border border-white/10
    shadow-xl
    text-white
  "
        >
          <div>
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              Start Your Digital Transformation
            </h3>

            <p className="text-sm text-gray-400 mb-6">
              Share your requirements and our experts will connect with you.
            </p>
          </div>

          <form className="space-y-4">
            {/* ================= Inputs ================= */}

            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  className={`${inputStyle} pl-9`}
                  placeholder="Full Name"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  className={`${inputStyle} pl-9`}
                  placeholder="Business Email"
                />
              </div>
            </div>

            {/* Budget + Phone */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="relative">
                <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <select className={`${inputStyle} pl-9`}>
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
                />
              </div>
            </div>

            {/* Description */}
            <div className="relative">
              <FileText className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <textarea
                rows={3}
                className={`${inputStyle} pl-9 resize-none`}
                placeholder="Briefly describe your project..."
              />
            </div>

            {/* ================= Upload ================= */}
            <label
              className="
        group flex flex-col items-center justify-center gap-2
        cursor-pointer border-2 border-dashed border-white/20
        rounded-xl p-6
        bg-white/5
        hover:border-cyan-400 hover:bg-white/10
        transition-all
      "
            >
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

            {/* ================= Submit ================= */}
            <button
              type="submit"
              className="
        w-full mt-4
        flex items-center justify-center gap-2
        bg-gradient-to-r from-cyan-500 to-blue-600
        hover:scale-[1.02]
        text-white
        py-3 rounded-lg
        font-medium
        transition
      "
            >
              <Send className="w-4 h-4" />
              Request Consultation
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
