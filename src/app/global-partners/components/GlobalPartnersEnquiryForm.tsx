"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Check } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FormStatus = "idle" | "submitting" | "success" | "error";

const PARTNERSHIP_TYPES = [
  "Technology Partnership",
  "Business Partnership",
  "Delivery Partnership",
  "White-Label Development",
  "Strategic Partnership",
  "Other",
];

const AREAS_OF_INTEREST = [
  "AI & Agentic AI",
  "Microsoft Technologies",
  "Data Engineering & Analytics",
  "Software Development",
  "Cloud & Application Modernization",
  "Other",
];

export function GlobalPartnersEnquiryForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((item) => item !== area) : [...prev, area]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mbdwbkad", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("success");
        form.reset();
        setSelectedAreas([]);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="partnership-enquiry"
      className="relative scroll-mt-28 overflow-hidden bg-[#000000] py-16 sm:py-20 lg:py-24"
    >
      {/* Background dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.15)_0.6px,transparent_0.6px)] [background-size:28px_28px]"
      />

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff5812]/[0.05] rounded-full blur-[140px]" />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative mx-auto max-w-5xl rounded-2xl bg-[#09090d] border border-white/5 p-6 text-white shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)] sm:p-10 md:p-12 overflow-hidden group/formCard"
        >
          {/* Custom style for pulsing tech borders */}
          <style>{`
            @keyframes techPulse {
              0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 2px rgba(255, 88, 18, 0.25)); }
              50% { opacity: 1; filter: drop-shadow(0 0 8px rgba(255, 88, 18, 0.6)); }
            }
            .tech-glow-pulse {
              animation: techPulse 4s infinite ease-in-out;
            }
          `}</style>

          {/* Designed Corner Accents (Multi-layer Partial Borders) */}
          {/* Top Left */}
          <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none">
            <div
              className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-[#ff5812]/80 rounded-tl-2xl tech-glow-pulse"
              style={{ animationDelay: "0s" }}
            />
            <div className="absolute top-1.5 left-1.5 w-6 h-6 border-t border-l border-[#ff5812]/30 rounded-tl-xl" />
          </div>
          {/* Top Right */}
          <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
            <div
              className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-[#ff5812]/80 rounded-tr-2xl tech-glow-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div className="absolute top-1.5 right-1.5 w-6 h-6 border-t border-r border-[#ff5812]/30 rounded-tr-xl" />
          </div>
          {/* Bottom Left */}
          <div className="absolute bottom-0 left-0 w-10 h-10 pointer-events-none">
            <div
              className="absolute bottom-0 left-0 w-full h-full border-b-2 border-l-2 border-[#ff5812]/80 rounded-bl-2xl tech-glow-pulse"
              style={{ animationDelay: "2s" }}
            />
            <div className="absolute bottom-1.5 left-1.5 w-6 h-6 border-b border-l border-[#ff5812]/30 rounded-bl-xl" />
          </div>
          {/* Bottom Right */}
          <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none">
            <div
              className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-[#ff5812]/80 rounded-br-2xl tech-glow-pulse"
              style={{ animationDelay: "3s" }}
            />
            <div className="absolute bottom-1.5 right-1.5 w-6 h-6 border-b border-r border-[#ff5812]/30 rounded-br-xl" />
          </div>

          {/* Edge glowing lines (Partial Borders) */}
          <div className="absolute top-0 left-20 right-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#ff5812]/40 to-transparent pointer-events-none transition-all duration-500 group-hover/formCard:via-[#ff5812]/75" />
          <div className="absolute bottom-0 left-20 right-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#ff5812]/20 to-transparent pointer-events-none" />
          <div className="absolute left-0 top-16 bottom-16 w-[1.5px] bg-gradient-to-b from-transparent via-[#ff5812]/20 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-16 bottom-16 w-[1.5px] bg-gradient-to-b from-transparent via-[#ff5812]/20 to-transparent pointer-events-none" />

          {/* Form Header */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff5812] mb-3">
              PARTNERSHIP ENQUIRY FORM
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-white">
              Start Your Technology Partnership with Softree
            </h3>
            <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-white/60 max-w-3xl">
              Interested in becoming a technology partner, delivery partner, or exploring a white-label development relationship?
              <br className="hidden sm:inline" />{" "}
              Tell us about your organization and partnership objectives. Our team will review your enquiry and connect with you to discuss potential collaboration opportunities.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 space-y-6">
            <input type="hidden" name="_subject" value="Global Partnership Enquiry" />

            {/* Row 1: Full Name & Business Email */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="partner-name"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45"
                >
                  Full Name <span className="text-[#ff5812]">*</span>
                </label>
                <input
                  id="partner-name"
                  name="fullName"
                  required
                  aria-required="true"
                  autoComplete="name"
                  className="h-11 w-full border-0 border-b border-white/14 bg-transparent text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#ff5812]"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="partner-email"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45"
                >
                  Business Email <span className="text-[#ff5812]">*</span>
                </label>
                <input
                  id="partner-email"
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  autoComplete="email"
                  className="h-11 w-full border-0 border-b border-white/14 bg-transparent text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#ff5812]"
                  placeholder="Enter your business email"
                />
              </div>
            </div>

            {/* Row 2: Company Name & Website */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="partner-company"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45"
                >
                  Company Name <span className="text-[#ff5812]">*</span>
                </label>
                <input
                  id="partner-company"
                  name="company"
                  required
                  aria-required="true"
                  autoComplete="organization"
                  className="h-11 w-full border-0 border-b border-white/14 bg-transparent text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#ff5812]"
                  placeholder="Enter your organization name"
                />
              </div>

              <div>
                <label
                  htmlFor="partner-website"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45"
                >
                  Website
                </label>
                <input
                  id="partner-website"
                  name="website"
                  type="text"
                  autoComplete="url"
                  className="h-11 w-full border-0 border-b border-white/14 bg-transparent text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#ff5812]"
                  placeholder="Enter your company website"
                />
              </div>
            </div>

            {/* Row 3: Partnership Type */}
            <div>
              <label
                htmlFor="partner-type"
                className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45"
              >
                Partnership Type <span className="text-[#ff5812]">*</span>
              </label>
              <div className="relative">
                <select
                  id="partner-type"
                  name="partnershipType"
                  required
                  defaultValue=""
                  aria-required="true"
                  className="h-11 w-full appearance-none border-0 border-b border-white/14 bg-transparent text-[15px] text-white outline-none transition-colors focus:border-[#ff5812] cursor-pointer pr-8 [&>option]:bg-[#09090d] [&>option]:text-white"
                >
                  <option value="" disabled className="text-white/30">
                    Select partnership type:
                  </option>
                  {PARTNERSHIP_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/40">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Row 4: Areas of Interest */}
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Areas of Interest
                <span className="ml-2 font-normal lowercase tracking-normal text-white/35">
                  (Select technology areas:)
                </span>
              </label>
              <input
                type="hidden"
                name="areasOfInterest"
                value={selectedAreas.join(", ")}
              />
              <div className="flex flex-wrap gap-2.5 pt-1">
                {AREAS_OF_INTEREST.map((area) => {
                  const isSelected = selectedAreas.includes(area);
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleArea(area)}
                      aria-pressed={isSelected}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 border cursor-pointer ${
                        isSelected
                          ? "bg-[#ff5812] text-white border-[#ff5812] shadow-[0_2px_14px_rgba(255,88,18,0.45)]"
                          : "bg-white/[0.04] text-white/70 border-white/12 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      {area}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 5: Message */}
            <div>
              <label
                htmlFor="partner-message"
                className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45"
              >
                Message <span className="text-[#ff5812]">*</span>
              </label>
              <textarea
                id="partner-message"
                name="message"
                required
                aria-required="true"
                rows={4}
                maxLength={5000}
                className="w-full resize-none border-0 border-b border-white/14 bg-transparent py-3 text-[15px] leading-relaxed text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#ff5812]"
                placeholder="Tell us about your partnership goals, business requirements, or collaboration opportunities."
              />
            </div>

            {/* Anti-spam honeypot */}
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} />

            {/* CTA Button */}
            <div>
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="group mt-2 inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#ff5812] px-10 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-white hover:text-[#09090d] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer shadow-[0_4px_24px_-4px_rgba(255,88,18,0.55)]"
              >
                <span>
                  {status === "submitting"
                    ? "Submitting…"
                    : status === "success"
                      ? "Enquiry Submitted"
                      : "Submit Partnership Enquiry"}
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </button>
            </div>

            {/* Form Confirmation & Error Messages */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-[#ff5812]/30 bg-[#ff5812]/10 p-4 text-sm text-white/95"
              >
                <p className="font-medium text-white">
                  Thank you for your interest in partnering with Softree Technology. Your enquiry has been submitted successfully.
                </p>
              </motion.div>
            )}

            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again or email{" "}
                <a
                  href="mailto:sales@softreetechnology.com"
                  className="underline hover:text-white"
                >
                  sales@softreetechnology.com
                </a>
                .
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default GlobalPartnersEnquiryForm;

