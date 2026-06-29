"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
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
      className="relative scroll-mt-28 overflow-hidden bg-[#FAFAF8] py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#1a1a1a_0.6px,transparent_0.6px)] [background-size:28px_28px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff5812]">
            Reach our team
          </p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-neutral-950">
            Send a message{" "}
            <span className="font-serif italic font-normal text-neutral-800">
              or book a call
            </span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
            Two paths, same outcome — a scoped conversation with engineers who
            have shipped 3,000+ enterprise projects.
          </p>
        </motion.div>

        <div className="mb-10 grid gap-3 sm:grid-cols-3">
          {CONTACT_CHANNELS.map((channel) => (
            <div
              key={channel.city}
              className="rounded-xl border border-neutral-200/90 bg-white/70 px-4 py-4 backdrop-blur-sm"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                {channel.city}
              </p>
              <p className="mt-1 text-[14px] font-medium text-neutral-900">
                {channel.contact}
              </p>
              <div className="mt-3 flex flex-col gap-1.5 text-[13px]">
                <a
                  href={`mailto:${channel.email}`}
                  className="inline-flex items-center gap-2 text-neutral-600 transition-colors hover:text-[#ff5812]"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                  <span className="truncate">{channel.email}</span>
                </a>
                <a
                  href={`tel:${channel.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-neutral-600 transition-colors hover:text-[#ff5812]"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                  {channel.phone}
                </a>
              </div>
              <p className="mt-2 text-[11px] text-neutral-400">{channel.hours}</p>
            </div>
          ))}
        </div>

        {/* Form — own row, not squeezed beside calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.05 }}
          className="mx-auto max-w-2xl rounded-2xl bg-[#09090d] p-6 text-white shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)] sm:p-8"
        >
          <p className="text-[18px] font-medium tracking-[-0.02em]">
            Project inquiry
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/52">
            Share scope, timeline, or stack — we route it to the right practice
            lead.
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
              className="group mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#ff5812] px-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-white hover:text-[#09090d] disabled:cursor-not-allowed disabled:opacity-60"
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
          <div className="h-px flex-1 bg-neutral-200/90" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Or book directly
          </span>
          <div className="h-px flex-1 bg-neutral-200/90" />
        </div>

        {/* Embedded Calendly — full width, room to breathe */}
        <CalendlyEmbeddedSection
          meetingTypes={CONTACT_MEETING_TYPES}
          className="mx-auto max-w-[960px]"
        />

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-neutral-200/80 pt-8">
          {CONTACT_TRUST_ITEMS.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 text-[13px] text-neutral-500"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff5812]/10 text-[10px] font-bold text-[#ff5812]">
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
