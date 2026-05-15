"use client";

import { useState, useCallback, FormEvent } from "react";
import { motion } from "framer-motion";

const SERVICES = [
  "Brand Strategy",
  "Brand Identity",
  "Design",
  "Development",
  "WebGL/VR",
  "3D",
  "Motion",
  "Growth",
];

const BUDGETS = [
  "£10k – £25k",
  "£25k – £50k",
  "£50k – £100k",
  "£100k+",
  "Let's talk",
];

const DEADLINES = [
  "ASAP",
  "1–2 Months",
  "3–6 Months",
  "6+ Months",
];

function CheckboxPill({
  label,
  checked,
  onToggle,
  isRadio = false,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  isRadio?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      data-check={checked ? "true" : undefined}
      className="group relative flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all duration-300
        border-(--cp-border) bg-transparent text-(--cp-text)
        hover:border-(--cp-border60)
        data-[check=true]:border-(--cp-text) data-[check=true]:bg-(--cp-text) data-[check=true]:text-(--cp-bg)"
    >
      <span
        className="flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300
        border-(--cp-border) bg-(--cp-input-bg)
        group-data-[check=true]:border-(--cp-text) group-data-[check=true]:bg-(--cp-text)"
      >
        {isRadio ? (
          <span
            className="h-1.5 w-1.5 rounded-full bg-(--cp-text) opacity-0 transition-opacity duration-300
            group-data-[check=true]:opacity-100 group-data-[check=true]:bg-(--cp-bg)"
          />
        ) : (
          <svg
            viewBox="0 0 12 12"
            className="h-2.5 w-2.5 fill-(--cp-bg) opacity-0 transition-opacity duration-300 group-data-[check=true]:opacity-100"
          >
            <path d="M1 6l3.5 3.5L11 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

export default function ContactHero() {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [budget, setBudget] = useState<string | null>(null);
  const [deadline, setDeadline] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = useCallback((s: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputBase =
    "w-full border-b bg-transparent py-3 text-[15px] font-medium outline-none transition-colors duration-300 placeholder:text-(--cp-text-alt)/50 text-(--cp-text) border-(--cp-border) focus:border-(--cp-text)";

  return (
    <section className="relative px-6 pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-5xl">
        {/* Giant headline */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.21, 1.02, 0.73, 1] }}
          className="mb-16 sm:mb-24"
        >
          <h1 className="text-[clamp(3rem,10vw,8.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-(--cp-text)">
            Let&apos;s chat
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-[1.6] text-(--cp-text-alt)">
            Tell us about your project. We&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 1.02, 0.73, 1] }}
          className="flex flex-col gap-14"
        >
          {/* Name + Email row */}
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-(--cp-text-alt)">
                What&apos;s your name?
              </label>
              <input type="text" name="name" placeholder="Full Name" required className={inputBase} />
              <div className="mt-1 h-px w-full bg-(--cp-border)" />
            </div>
            <div>
              <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-(--cp-text-alt)">
                What&apos;s your email?
              </label>
              <input type="email" name="email" placeholder="email@company.com" required className={inputBase} />
              <div className="mt-1 h-px w-full bg-(--cp-border)" />
            </div>
          </div>

          {/* Company + Phone */}
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-(--cp-text-alt)">
                What&apos;s your company?
              </label>
              <input type="text" name="company" placeholder="Company Name" className={inputBase} />
              <div className="mt-1 h-px w-full bg-(--cp-border)" />
            </div>
            <div>
              <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-(--cp-text-alt)">
                What&apos;s your phone?
              </label>
              <input type="tel" name="phone" placeholder="+44 7700 900000" className={inputBase} />
              <div className="mt-1 h-px w-full bg-(--cp-border)" />
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-(--cp-text-alt)">
              What Services do you need?
            </label>
            <div className="flex flex-wrap gap-2.5">
              {SERVICES.map((s) => (
                <CheckboxPill
                  key={s}
                  label={s}
                  checked={selectedServices.has(s)}
                  onToggle={() => toggleService(s)}
                />
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-(--cp-text-alt)">
              What&apos;s your budget?
            </label>
            <div className="flex flex-wrap gap-2.5">
              {BUDGETS.map((b) => (
                <CheckboxPill
                  key={b}
                  label={b}
                  checked={budget === b}
                  onToggle={() => setBudget(b === budget ? null : b)}
                  isRadio
                />
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-(--cp-text-alt)">
              What&apos;s your deadline?
            </label>
            <div className="flex flex-wrap gap-2.5">
              {DEADLINES.map((d) => (
                <CheckboxPill
                  key={d}
                  label={d}
                  checked={deadline === d}
                  onToggle={() => setDeadline(d === deadline ? null : d)}
                  isRadio
                />
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-(--cp-text-alt)">
              Tell us about your project
            </label>
            <textarea
              name="message"
              rows={4}
              placeholder="We need a new brand identity and website for our fintech startup..."
              className={`${inputBase} resize-y`}
            />
            <div className="mt-1 h-px w-full bg-(--cp-border)" />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between gap-6 pt-4">
            <p className="max-w-xs text-[12px] leading-normal text-(--cp-text-alt)">
              By submitting this form you agree to our privacy policy.
            </p>
            <button
              type="submit"
              className="group relative overflow-hidden rounded-full bg-(--cp-text) px-8 py-4 text-[13px] font-semibold text-(--cp-bg) transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {submitted ? "Message Sent" : "Send Message"}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  -&gt;
                </span>
              </span>
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
