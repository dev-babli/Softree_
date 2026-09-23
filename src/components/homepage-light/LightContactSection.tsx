"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Check, Brain, Shield, Code2, Cloud, Mail, MapPin } from "lucide-react"
import { useState, type FormEvent, type ReactNode } from "react"
import CalendlyPopupButton from "@/components/calendly/CalendlyPopupButton"

type Status = "idle" | "submitting" | "success" | "error"

type LightContactSectionProps = {
  headlineLead?: string
  headlineAccent?: string
  headlineLabel?: string
  body?: string
  messagePlaceholder?: string
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-all duration-300 hover:border-white/40 hover:bg-white hover:text-[#09090d] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5812]"
    >
      <span className="h-[18px] w-[18px]">{children}</span>
    </a>
  )
}



function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function MicrosoftIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="0.5" />
      <rect x="13" y="3" width="8" height="8" rx="0.5" />
      <rect x="3" y="13" width="8" height="8" rx="0.5" />
      <rect x="13" y="13" width="8" height="8" rx="0.5" />
    </svg>
  )
}

export default function LightContactSection({
  headlineLead = "Let's Start a",
  headlineAccent = "Conversation",
  headlineLabel,
}: LightContactSectionProps = {}) {
  const [status, setStatus] = useState<Status>("idle")
  const reduceMotion = useReducedMotion()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("submitting")

    const form = event.currentTarget
    const formData = new FormData(form)

    if (formData.get("_gotcha")) return

    try {
      const response = await fetch("https://formspree.io/f/mbdwbkad", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-white py-12 text-[#0a0a1a] sm:py-16 lg:py-20 font-sans"
    >
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={reduceMotion ? false : { y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: EASE }}
          className="mb-8 text-center sm:mb-10"
        >
          <h2
            aria-label={headlineLabel}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0a0a1a]"
          >
            {headlineLead} <span className="text-[#ff5812]">{headlineAccent}</span>
          </h2>
        </motion.div>

        {/* Master Dark Card */}
        <motion.div
          initial={reduceMotion ? false : { y: 30, opacity: 0, scale: 0.99 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: EASE, delay: 0.05 }}
          className="overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#07080c] text-white shadow-[0_30px_90px_-20px_rgba(0,0,0,0.6)]"
        >
          {/* Main 3-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[82px_1.7fr_1.05fr] border-b border-white/10">

            {/* 1. Left Strip: Follow us */}
            <aside className="border-b lg:border-b-0 lg:border-r border-white/10 p-3.5 flex flex-col items-center justify-start gap-3.5">
              <span className="text-[10.5px] font-semibold text-white/80 tracking-tight text-center whitespace-nowrap">
                Follow us
              </span>
              <div className="flex flex-wrap lg:flex-col gap-2.5 items-center justify-center">
                <SocialIcon href="https://www.linkedin.com/company/softree-technology-pvt-ltd/" label="LinkedIn">
                  <LinkedinIcon />
                </SocialIcon>
              </div>
            </aside>

            {/* 2. Middle Column: Value Prop, Capabilities & What we offer */}
            <div className="border-b lg:border-b-0 lg:border-r border-white/10 p-5 sm:p-7 flex flex-col justify-between gap-6">

              {/* TOP: Image + Partner With Softree */}
              <div className="grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-6 items-center">
                <div className="relative aspect-[4/3] sm:aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl bg-white/10 shrink-0 shadow-lg">
                  <Image
                    src="https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69ce260749d7110937223c7f_CTA%20Picture.webp"
                    alt="Engineer wearing futuristic VR headset"
                    fill
                    sizes="(max-width: 640px) 200px, 170px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#07080c]/50 to-transparent"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  {/* Eyebrow Badge */}
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md w-fit mb-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff5812] shadow-[0_0_8px_#ff5812] animate-pulse" />
                    <span className="text-[10.5px] font-mono font-bold tracking-[0.16em] uppercase text-zinc-300">
                      PARTNER WITH <span className="text-[#ff5812]">SOFTREE</span>
                    </span>
                  </div>

                  {/* Headline */}
                  <h4 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-extrabold text-white tracking-tight leading-[1.25] mb-2.5">
                    Extend Your Engineering Capacity.
                    <br />
                    <span className="text-zinc-400 font-semibold">Not Your </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5812] to-[#ff7e40]">
                      Hiring Complexity.
                    </span>
                  </h4>

                  {/* Subtitle with subtle accent hairline */}
                  <p className="text-xs sm:text-[13px] text-zinc-300/90 leading-relaxed max-w-md border-l-2 border-[#ff5812]/50 pl-3 py-0.5">
                    Build, scale and deliver more with an engineering partner that works as an{" "}
                    <span className="text-white font-medium">extension of your team</span>.
                  </p>
                </div>
              </div>

              {/* MIDDLE: What We Offer + 6-Point Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 py-6 border-t border-white/10">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-3 tracking-tight">
                    What we offer
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {[
                      "Agentic AI & Automation",
                      "Web Application Development",
                      "Power Platform & SharePoint",
                      "Data Engineering & Power BI",
                      "Mobile App Development",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-zinc-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5812] shrink-0 shadow-[0_0_6px_#ff5812]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 6-Point Checklist */}
                <div className="flex flex-col justify-center gap-2.5">
                  {[
                    "Offshore Engineering",
                    "White-Label Delivery",
                    "Flexible Team Capacity",
                    "AI & Agentic AI",
                    "Microsoft Technologies",
                    "Automation & Security Testing",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-xs font-medium text-zinc-200">
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#ff5812] text-white">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BOTTOM: How we can extend your team (Unified Single Box with Column Dividers) */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff5812] shadow-[0_0_8px_#ff5812] animate-pulse" />
                  <p className="text-[10.5px] font-mono font-bold uppercase tracking-[0.22em] text-zinc-300">
                    HOW WE CAN EXTEND YOUR TEAM
                  </p>
                </div>

                {/* Single Unified Container with Column Dividers */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-white/10">

                    {/* 1. AI Engineering */}
                    <div className="p-3 xl:p-3.5 flex flex-col justify-start transition-colors duration-200 hover:bg-white/[0.02]">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="h-3.5 w-3.5 text-[#ff5812] shrink-0" />
                        <h5 className="font-mono text-[10.5px] xl:text-[11px] font-bold tracking-[0.12em] text-[#ff5812] uppercase leading-tight">
                          AI ENGINEERING
                        </h5>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {["Agentic AI", "AI Automation", "RAG"].map((skill) => (
                          <li
                            key={skill}
                            className="group/item relative flex items-center overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[11px] xl:text-[11.5px] font-medium text-zinc-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-200 hover:border-[#ff5812]/50 hover:bg-[#ff5812]/[0.08] hover:text-white hover:translate-x-0.5 cursor-default"
                          >
                            <span className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-transparent transition-colors duration-200 group-hover/item:bg-[#ff5812] group-hover/item:shadow-[0_0_6px_#ff5812]" />
                            <span className="leading-snug tracking-tight">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 2. Microsoft */}
                    <div className="p-3 xl:p-3.5 flex flex-col justify-start transition-colors duration-200 hover:bg-white/[0.02]">
                      <div className="flex items-center gap-2 mb-3">
                        <MicrosoftIcon className="h-3.5 w-3.5 text-[#ff5812] shrink-0" />
                        <h5 className="font-mono text-[10.5px] xl:text-[11px] font-bold tracking-[0.12em] text-[#ff5812] uppercase leading-tight">
                          MICROSOFT
                        </h5>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {["Azure", "Fabric", "Power Platform"].map((skill) => (
                          <li
                            key={skill}
                            className="group/item relative flex items-center overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[11px] xl:text-[11.5px] font-medium text-zinc-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-200 hover:border-[#ff5812]/50 hover:bg-[#ff5812]/[0.08] hover:text-white hover:translate-x-0.5 cursor-default"
                          >
                            <span className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-transparent transition-colors duration-200 group-hover/item:bg-[#ff5812] group-hover/item:shadow-[0_0_6px_#ff5812]" />
                            <span className="leading-snug tracking-tight">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 3. Quality Engineering */}
                    <div className="p-3 xl:p-3.5 flex flex-col justify-start transition-colors duration-200 hover:bg-white/[0.02]">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="h-3.5 w-3.5 text-[#ff5812] shrink-0" />
                        <h5 className="font-mono text-[10.5px] xl:text-[11px] font-bold tracking-[0.12em] text-[#ff5812] uppercase leading-tight">
                          QUALITY ENGINEERING
                        </h5>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {["AI Testing", "Security Testing", "Automation Testing"].map((skill) => (
                          <li
                            key={skill}
                            className="group/item relative flex items-center overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[11px] xl:text-[11.5px] font-medium text-zinc-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-200 hover:border-[#ff5812]/50 hover:bg-[#ff5812]/[0.08] hover:text-white hover:translate-x-0.5 cursor-default"
                          >
                            <span className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-transparent transition-colors duration-200 group-hover/item:bg-[#ff5812] group-hover/item:shadow-[0_0_6px_#ff5812]" />
                            <span className="leading-snug tracking-tight">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 4. Software Engineering */}
                    <div className="p-3 xl:p-3.5 flex flex-col justify-start transition-colors duration-200 hover:bg-white/[0.02]">
                      <div className="flex items-center gap-2 mb-3">
                        <Code2 className="h-3.5 w-3.5 text-[#ff5812] shrink-0" />
                        <h5 className="font-mono text-[10.5px] xl:text-[11px] font-bold tracking-[0.12em] text-[#ff5812] uppercase leading-tight">
                          SOFTWARE ENGINEERING
                        </h5>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {["React / Next.js", "Node.js / Python", "FastAPI"].map((skill) => (
                          <li
                            key={skill}
                            className="group/item relative flex items-center overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[11px] xl:text-[11.5px] font-medium text-zinc-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-200 hover:border-[#ff5812]/50 hover:bg-[#ff5812]/[0.08] hover:text-white hover:translate-x-0.5 cursor-default"
                          >
                            <span className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-transparent transition-colors duration-200 group-hover/item:bg-[#ff5812] group-hover/item:shadow-[0_0_6px_#ff5812]" />
                            <span className="leading-snug tracking-tight">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 5. Cloud & Data */}
                    <div className="p-3 xl:p-3.5 flex flex-col justify-start transition-colors duration-200 hover:bg-white/[0.02]">
                      <div className="flex items-center gap-2 mb-3">
                        <Cloud className="h-3.5 w-3.5 text-[#ff5812] shrink-0" />
                        <h5 className="font-mono text-[10.5px] xl:text-[11px] font-bold tracking-[0.12em] text-[#ff5812] uppercase leading-tight">
                          CLOUD & DATA
                        </h5>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {["Azure / AWS", "Data Engineering", "DevOps"].map((skill) => (
                          <li
                            key={skill}
                            className="group/item relative flex items-center overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[11px] xl:text-[11.5px] font-medium text-zinc-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-200 hover:border-[#ff5812]/50 hover:bg-[#ff5812]/[0.08] hover:text-white hover:translate-x-0.5 cursor-default"
                          >
                            <span className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-transparent transition-colors duration-200 group-hover/item:bg-[#ff5812] group-hover/item:shadow-[0_0_8px_#ff5812]" />
                            <span className="leading-snug tracking-tight">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              </div>

            </div>

            {/* 3. Right Column: Form & Scheduler */}
            <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-1">
                  Got a question, challenge, or idea?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mb-4">
                  Fill out the form or pick a time on our scheduler:
                </p>

                {/* 30-min discovery call banner */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:p-3.5 flex items-center justify-between gap-3 mb-6">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-[13px] font-bold text-white leading-tight">
                      30-min discovery call
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-zinc-400 leading-tight mt-0.5">
                      Same Calendly as our booking page · instant invite
                    </p>
                  </div>
                  <CalendlyPopupButton
                    label="PICK A TIME"
                    className="group inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-[#ff5812] hover:bg-[#e04a0e] px-3.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white transition duration-200 cursor-pointer shadow-sm"
                  />
                </div>

                {/* The Contact Form */}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 text-white"
                >
                  <input type="hidden" name="_subject" value="New Softree Lead" />
                  <input type="text" name="_gotcha" style={{ display: "none" }} />

                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-zinc-400 mb-1">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder=""
                      className="w-full border-0 border-b border-white/15 bg-transparent py-1 text-sm text-white placeholder-transparent outline-none transition-colors focus:border-[#ff5812]"
                    />
                  </div>

                  {/* E-Mail */}
                  <div className="flex flex-col">
                    <label className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-zinc-400 mb-1">
                      E-MAIL <span className="text-[#ff5812]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder=""
                      className="w-full border-0 border-b border-white/15 bg-transparent py-1 text-sm text-white placeholder-transparent outline-none transition-colors focus:border-[#ff5812]"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col">
                    <label className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-zinc-400 mb-1">
                      COMPANY NAME
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder=""
                      className="w-full border-0 border-b border-white/15 bg-transparent py-1 text-sm text-white placeholder-transparent outline-none transition-colors focus:border-[#ff5812]"
                    />
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-col">
                    <label className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-zinc-400 mb-0.5">
                      TELL US ABOUT YOUR PROJECT
                    </label>
                    <span className="text-[11px] text-zinc-400 mb-1">
                      Timeline, scope, budget — the more detail, the better we can help.
                    </span>
                    <textarea
                      name="message"
                      rows={2}
                      className="w-full resize-none border-0 border-b border-white/15 bg-transparent py-1 text-sm text-white placeholder-transparent outline-none transition-colors focus:border-[#ff5812]"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-[#ff5812] hover:bg-[#e04a0e] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(255,88,18,0.35)] transition duration-200 cursor-pointer disabled:opacity-50"
                    >
                      <span>{status === "submitting" ? "SENDING..." : "SEND MESSAGE"}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                    </button>

                    <CalendlyPopupButton
                      label="BOOK A CALL"
                      className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-transparent hover:bg-white/10 hover:border-white/40 px-5 sm:px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition duration-200 cursor-pointer"
                    />
                  </div>

                  {status === "success" && (
                    <p className="text-xs text-emerald-400 mt-2 font-medium">
                      ✓ Thank you! We have received your request and will get back to you shortly.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-xs text-red-400 mt-2 font-medium">
                      ✕ Submission failed. Please try again or reach out to sales@softreetechnology.com.
                    </p>
                  )}
                </form>
              </div>
            </div>

          </div>

          {/* 4. Bottom Strip: E-Mail & Offices across all 3 zones */}
          <div className="border-t border-white/10 bg-white/[0.015] p-5 sm:p-6 lg:p-7">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {/* E-Mail */}
              <div className="md:col-span-4 flex items-start gap-3.5 pr-0 md:pr-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ff5812]/15 border border-[#ff5812]/30 text-[#ff5812] shadow-xs">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400 mb-1">
                    Direct Inquiry
                  </span>
                  <a
                    href="mailto:sales@softreetechnology.com"
                    className="group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white transition-colors duration-200 hover:text-[#ff5812]"
                  >
                    <span>sales@softreetechnology.com</span>
                    <ArrowUpRight className="h-3 w-3 text-zinc-500 transition-all duration-200 group-hover/link:text-[#ff5812] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                  <span className="text-[10.5px] text-zinc-500 mt-1">
                    Response within 2 hours · NDA guaranteed
                  </span>
                </div>
              </div>

              {/* Bengaluru Office */}
              <div className="md:col-span-4 pt-5 md:pt-0 pl-0 md:pl-6 flex items-start gap-3.5 pr-0 md:pr-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ff5812]/15 border border-[#ff5812]/30 text-[#ff5812] shadow-xs">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#ff5812]">
                      HQ · Bengaluru
                    </span>
                  </div>
                  <p className="text-[11.5px] text-zinc-300 leading-relaxed">
                    11th Floor, Prestige Tech Park, Platina 2 · Outer Ring Rd, Kadubeesanahalli, Bengaluru 560087
                  </p>
                </div>
              </div>

              {/* Cuttack Office */}
              <div className="md:col-span-4 pt-5 md:pt-0 pl-0 md:pl-6 flex items-start gap-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/10 text-zinc-400 shadow-xs">
                  <MapPin className="h-4 w-4 text-[#ff5812]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-300">
                      Engineering Hub · Cuttack
                    </span>
                  </div>
                  <p className="text-[11.5px] text-zinc-300 leading-relaxed">
                    PLOT 5C/1283, SECTOR-10, CDA, Cuttack, Odisha 753014, India
                  </p>
                </div>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  )
}
