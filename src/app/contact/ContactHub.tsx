"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, Copy, Check } from "lucide-react";
import {
  CONTACT_CHANNELS,
  CONTACT_MEETING_TYPES,
  CONTACT_TRUST_ITEMS,
} from "@/data/contact-page";

const CalendlyEmbeddedSection = dynamic(
  () => import("@/components/calendly/CalendlyEmbeddedSection"),
  { ssr: false },
);

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FormStatus = "idle" | "submitting" | "success" | "error";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="ml-2 p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition-all duration-200 focus:outline-none flex items-center justify-center shrink-0"
      title="Copy email"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-400" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

export default function ContactHub() {
  const [status, setStatus] = useState<FormStatus>("idle");

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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="schedule"
      className="relative scroll-mt-28 overflow-hidden bg-[#000000] py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.15)_0.6px,transparent_0.6px)] [background-size:28px_28px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-10 mx-auto max-w-5xl"
        >
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff5812]">
              Reach our team
            </p>
            <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
              Send a message{" "}
              <span className="font-serif italic font-normal text-white/80">
                or book a call
              </span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/60">
              Two paths, same outcome — a scoped conversation with engineers who
              have shipped 3,000+ enterprise projects.
            </p>
          </div>
        </motion.div>

        <div className="mb-10 mx-auto max-w-5xl rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {CONTACT_CHANNELS.map((channel) => (
            <div
              key={channel.city}
              className="px-6 py-6 flex flex-col justify-between"
            >
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40">
                  {channel.city}
                </p>
                <p className="mt-1 text-[14px] font-medium text-white">
                  {channel.contact}
                </p>
                <div className="mt-3 flex flex-col gap-1.5 text-[13px]">
                  <div className="flex items-center justify-between group/mail min-w-0">
                    <a
                      href={`mailto:${channel.email}`}
                      className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-[#ff5812] min-w-0"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                      <span className="truncate">{channel.email}</span>
                    </a>
                    <CopyButton text={channel.email} />
                  </div>
                  {channel.phone && (
                    <a
                      href={`tel:${channel.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-[#ff5812]"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                      {channel.phone}
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-3 text-[11px] text-white/35">{channel.hours}</p>
            </div>
          ))}
        </div>

        {/* Form — own row, not squeezed beside calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.05 }}
          className="relative mx-auto max-w-5xl rounded-2xl bg-[#09090d] border border-white/5 p-6 text-white shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)] sm:p-8 overflow-hidden group/formCard"
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
            <div className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-[#ff5812]/80 rounded-tl-2xl tech-glow-pulse" style={{ animationDelay: '0s' }} />
            <div className="absolute top-1.5 left-1.5 w-6 h-6 border-t border-l border-[#ff5812]/30 rounded-tl-xl" />
          </div>
          {/* Top Right */}
          <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-[#ff5812]/80 rounded-tr-2xl tech-glow-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1.5 right-1.5 w-6 h-6 border-t border-r border-[#ff5812]/30 rounded-tr-xl" />
          </div>
          {/* Bottom Left */}
          <div className="absolute bottom-0 left-0 w-10 h-10 pointer-events-none">
            <div className="absolute bottom-0 left-0 w-full h-full border-b-2 border-l-2 border-[#ff5812]/80 rounded-bl-2xl tech-glow-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1.5 left-1.5 w-6 h-6 border-b border-l border-[#ff5812]/30 rounded-bl-xl" />
          </div>
          {/* Bottom Right */}
          <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-[#ff5812]/80 rounded-br-2xl tech-glow-pulse" style={{ animationDelay: '3s' }} />
            <div className="absolute bottom-1.5 right-1.5 w-6 h-6 border-b border-r border-[#ff5812]/30 rounded-br-xl" />
          </div>

          {/* Edge glowing lines (Partial Borders) */}
          <div className="absolute top-0 left-20 right-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#ff5812]/40 to-transparent pointer-events-none transition-all duration-500 group-hover/formCard:via-[#ff5812]/75" />
          <div className="absolute bottom-0 left-20 right-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#ff5812]/20 to-transparent pointer-events-none" />
          <div className="absolute left-0 top-16 bottom-16 w-[1.5px] bg-gradient-to-b from-transparent via-[#ff5812]/20 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-16 bottom-16 w-[1.5px] bg-gradient-to-b from-transparent via-[#ff5812]/20 to-transparent pointer-events-none" />
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-white">
            Tell us about your project
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/52">
            Outline your scope, timeline, or technical architecture. We route inquiries directly to our specialized practice leads for a structured engineering review.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input type="hidden" name="_subject" value="Contact page inquiry" />

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Full name
              </span>
              <input
                name="name"
                required
                autoComplete="name"
                className="h-11 w-full border-0 border-b border-white/14 bg-transparent text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#ff5812]"
                placeholder="Your name"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Work email <span className="text-[#ff5812]">*</span>
              </span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="h-11 w-full border-0 border-b border-white/14 bg-transparent text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#ff5812]"
                placeholder="you@company.com"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Company
              </span>
              <input
                name="company"
                autoComplete="organization"
                className="h-11 w-full border-0 border-b border-white/14 bg-transparent text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#ff5812]"
                placeholder="Organization"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                What are you building?
              </span>
              <textarea
                name="message"
                required
                rows={4}
                maxLength={5000}
                className="w-full resize-none border-0 border-b border-white/14 bg-transparent py-3 text-[15px] leading-relaxed text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#ff5812]"
                placeholder="Timeline, budget range, platforms, integrations…"
              />
            </label>

            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} />

            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="group mt-2 inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#ff5812] px-10 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-white hover:text-[#09090d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>
                {status === "submitting"
                  ? "Sending…"
                  : status === "success"
                    ? "Message sent"
                    : "Send message"}
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </button>

            {status === "success" && (
              <p className="text-sm text-white/65">
                Thanks — we&apos;ll reply within one business day.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again or email{" "}
                <a
                  href="mailto:sales@softreetechnology.com"
                  className="underline"
                >
                  sales@softreetechnology.com
                </a>
                .
              </p>
            )}
          </form>
        </motion.div>

        {/* Divider */}
        <div className="my-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Or book directly
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Embedded Calendly — full width, room to breathe */}
        <CalendlyEmbeddedSection
          meetingTypes={CONTACT_MEETING_TYPES}
          className="mx-auto max-w-[960px]"
        />

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8">
          {CONTACT_TRUST_ITEMS.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 text-[13px] text-white/50"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff5812]/15 text-[10px] font-bold text-[#ff5812]">
                ✓
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
