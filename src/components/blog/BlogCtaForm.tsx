"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react"

export interface BlogCtaFormProps {
  /** Optional kicker text above headline (defaults to "LET'S TALK") */
  kicker?: string
  /** Custom headline prefix */
  title?: string
  /** Highlighted brand word in headline (defaults to "Softree") */
  highlightWord?: string
  /** Description text */
  description?: string
  /** Current article topic / category to intelligently tailor headlines */
  category?: string
  /** Image source for the visual side */
  imageSrc?: string
  /** Layout mode: "section" (full-width 2-column), "sidebar" (compact sidebar card), or "card" */
  variant?: "section" | "sidebar" | "card"
  /** Optional extra CSS classes */
  className?: string
}

function getCategoryHeadline(category?: string): string {
  if (!category) return "Build Smarter Solutions with"

  const cat = category.toLowerCase().trim()
  if (cat.includes("security") || cat.includes("testing") || cat.includes("qa") || cat.includes("quality")) {
    return "Elevate Quality & Security with"
  }
  if (cat.includes("web") || cat.includes("react") || cat.includes("frontend")) {
    return "Build High-Performance Web Apps with"
  }
  if (cat.includes("mobile") || cat.includes("app") || cat.includes("ios") || cat.includes("android")) {
    return "Build Next-Gen Mobile Apps with"
  }
  if (cat.includes("cloud") || cat.includes("azure") || cat.includes("devops")) {
    return "Modernize Cloud Infrastructure with"
  }
  if (cat.includes("data") || cat.includes("fabric") || cat.includes("analytics")) {
    return "Unlock Enterprise Data Potential with"
  }
  if (cat.includes("power") || cat.includes("sharepoint") || cat.includes("automation")) {
    return "Accelerate Workflow Automation with"
  }
  if (cat.includes("ai") || cat.includes("agent") || cat.includes("intelligence")) {
    return "Build Smarter Enterprise Solutions with"
  }

  return "Build Scalable Solutions with"
}

const TOPIC_OPTIONS = [
  "Custom Development",
  "Architecture & Strategy",
  "Quality Engineering",
  "Cloud & Modernization",
  "Enterprise Automation",
]

export function BlogCtaForm({
  kicker = "LET'S TALK",
  title,
  highlightWord = "Softree",
  description = "Discuss your use case, explore possibilities, and get expert guidance from our engineering team.",
  category,
  imageSrc = "/images/blog/blog-talk-cta.jpg",
  variant = "section",
  className = "",
}: BlogCtaFormProps) {
  const displayTitle = title || getCategoryHeadline(category)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: category || "Custom Development",
    message: "",
  })

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) {
      setStatus("error")
      setErrorMessage("Please fill in your name and email address.")
      return
    }

    setStatus("loading")
    setErrorMessage("")

    try {
      const sourceUrl = typeof window !== "undefined" ? window.location.href : ""
      const res = await fetch("/api/blog-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          topic: form.topic,
          message: form.message.trim(),
          sourceUrl,
        }),
      })

      if (res.ok) {
        setStatus("success")
        setForm({
          name: "",
          email: "",
          phone: "",
          topic: category || "Custom Development",
          message: "",
        })
      } else {
        const data = await res.json().catch(() => ({}))
        setStatus("error")
        setErrorMessage(data.error || "Failed to submit request. Please try again.")
      }
    } catch {
      setStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    }
  }

  // --------------------------------------------------------------------------
  // SIDEBAR VARIANT (Compact form tailored for sticky blog sidebar)
  // --------------------------------------------------------------------------
  if (variant === "sidebar") {
    return (
      <div
        className={`relative overflow-hidden rounded-3xl border border-[#ffdcd4]/90 bg-gradient-to-b from-[#fff7f5] via-[#fffaf8] to-[#ffffff] p-5 sm:p-6 shadow-[0_12px_36px_rgba(255,87,34,0.07)] ${className}`}
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-[#ff6b4a]/20 to-transparent blur-2xl" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-4.5 rounded-full bg-[#ff461e]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">
              {kicker}
            </span>
          </div>

          <h3 className="text-xl font-black leading-[1.2] tracking-[-0.025em] text-zinc-950">
            {displayTitle}{" "}
            <span className="block text-[#ff461e]">{highlightWord}</span>
          </h3>

          <p className="text-[13px] leading-relaxed text-zinc-600">
            {description}
          </p>

          {status === "success" ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
              <h4 className="text-sm font-bold text-emerald-950">Request Received!</h4>
              <p className="mt-1 text-xs text-emerald-700">
                Our team will reach out to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-3 text-xs font-semibold text-emerald-800 underline hover:text-emerald-950"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Your Name</label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-zinc-200 bg-white/90 pl-8 pr-3 py-2 text-xs text-zinc-900 outline-none transition focus:border-[#ff461e] focus:ring-2 focus:ring-[#ff461e]/15 placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-zinc-200 bg-white/90 pl-8 pr-3 py-2 text-xs text-zinc-900 outline-none transition focus:border-[#ff461e] focus:ring-2 focus:ring-[#ff461e]/15 placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">Phone / WhatsApp (Optional)</label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl border border-zinc-200 bg-white/90 pl-8 pr-3 py-2 text-xs text-zinc-900 outline-none transition focus:border-[#ff461e] focus:ring-2 focus:ring-[#ff461e]/15 placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">What can we help you with?</label>
                <textarea
                  rows={2}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your project or goal..."
                  className="w-full rounded-xl border border-zinc-200 bg-white/90 p-2.5 text-xs text-zinc-900 outline-none transition focus:border-[#ff461e] focus:ring-2 focus:ring-[#ff461e]/15 placeholder:text-zinc-400 resize-none"
                />
              </div>

              {status === "error" && errorMessage && (
                <p className="text-[11px] font-medium text-rose-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff461e] via-[#ff5426] to-[#ff6b3d] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(255,70,30,0.32)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_6px_22px_rgba(255,70,30,0.45)] active:scale-[0.98] disabled:opacity-70 cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Book Consultation</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Compact bottom graphic pill */}
          <div className="pt-2 border-t border-[#ffe6df] flex items-center justify-between text-[11px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Direct response within 24 hrs
            </span>
            <span className="font-semibold text-zinc-700">100% Confidential</span>
          </div>
        </div>
      </div>
    )
  }

  // --------------------------------------------------------------------------
  // SECTION / BANNER VARIANT (Full width 2-column high-conversion layout)
  // --------------------------------------------------------------------------
  return (
    <section
      className={`relative my-12 overflow-hidden rounded-3xl border border-[#ffdcd4]/90 bg-gradient-to-br from-[#fff7f5] via-[#fffaf8] to-[#ffffff] p-6 sm:p-8 lg:p-10 shadow-[0_16px_48px_rgba(255,87,34,0.08)] ${className}`}
      aria-label="Consultation Form"
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#ff6b4a]/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-gradient-to-tr from-[#ffa07a]/20 to-transparent blur-3xl" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 items-center">
        {/* Left Side: Brand Visual & Messaging */}
        <div className="space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="h-[2px] w-5 rounded-full bg-[#ff461e]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-500">
              {kicker}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.18] tracking-[-0.03em] text-zinc-950">
            {displayTitle}{" "}
            <span className="inline-block text-[#ff461e]">{highlightWord}</span>
          </h3>

          <p className="text-[14px] sm:text-[15px] leading-relaxed text-zinc-600 max-w-lg">
            {description}
          </p>

          {/* Branded Consultation Visual */}
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-[#ffe0d6] bg-gradient-to-b from-[#fff2ed] to-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] max-w-md">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={imageSrc}
                alt="Softree consulting team in discussion"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="p-3 bg-white/90 backdrop-blur-sm border-t border-[#ffe6df] flex items-center justify-between text-xs text-zinc-600">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-zinc-800">Softree Senior Architects</span>
              </div>
              <span className="text-[11px] text-zinc-500">Average response &lt; 2 hours</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Consultation Form */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-6 sm:p-8 shadow-sm backdrop-blur-md">
          {status === "success" ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h4 className="text-xl font-black text-zinc-950">Thank You for Reaching Out!</h4>
              <p className="text-sm leading-relaxed text-zinc-600 max-w-md mx-auto">
                We have received your consultation request. A senior engineer from Softree will review your details and contact you shortly.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="rounded-full border border-zinc-300 bg-white px-6 py-2.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 transition"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-zinc-100 pb-3">
                <h4 className="text-lg font-bold text-zinc-950">Request a Free Consultation</h4>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Share your project details and get architectural recommendations.
                </p>
              </div>

              {/* Topic Quick Selection */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-2">
                  Topic of Interest
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {TOPIC_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setForm({ ...form, topic: opt })}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        form.topic === opt
                          ? "bg-[#ff461e] text-white shadow-sm"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 1: Name & Email */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Full Name <span className="text-[#ff461e]">*</span>
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full rounded-xl border border-zinc-200 bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-zinc-900 outline-none transition focus:border-[#ff461e] focus:ring-2 focus:ring-[#ff461e]/15 placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Work Email <span className="text-[#ff461e]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full rounded-xl border border-zinc-200 bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-zinc-900 outline-none transition focus:border-[#ff461e] focus:ring-2 focus:ring-[#ff461e]/15 placeholder:text-zinc-400"
                    />
                  </div>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Phone / WhatsApp <span className="text-zinc-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl border border-zinc-200 bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-zinc-900 outline-none transition focus:border-[#ff461e] focus:ring-2 focus:ring-[#ff461e]/15 placeholder:text-zinc-400"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Project Scope or Questions
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your goals, tech stack, or challenges..."
                  className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs sm:text-sm text-zinc-900 outline-none transition focus:border-[#ff461e] focus:ring-2 focus:ring-[#ff461e]/15 placeholder:text-zinc-400 resize-none"
                />
              </div>

              {status === "error" && errorMessage && (
                <p className="text-xs font-medium text-rose-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#ff461e] via-[#ff5426] to-[#ff6b3d] px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_22px_rgba(255,70,30,0.35)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_8px_28px_rgba(255,70,30,0.45)] active:scale-[0.98] disabled:opacity-70 cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Get Free Consultation</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default BlogCtaForm
