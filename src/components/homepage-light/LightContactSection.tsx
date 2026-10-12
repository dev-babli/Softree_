"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useState, type FormEvent, type ReactNode } from "react"
import { SOFTREE_OFFICES_CONTACT } from "@/data/softree-offices"
import CalendlyPopupButton from "@/components/calendly/CalendlyPopupButton"
import { cn } from "@/lib/utils"

type Status = "idle" | "submitting" | "success" | "error"

type LightContactSectionProps = {
  headlineLead?: string
  headlineAccent?: string
  headlineLabel?: string
  body?: string
  messagePlaceholder?: string
  fullWidth?: boolean
  className?: string
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
      className="grid h-11 w-11 place-items-center rounded-full border border-white/16 bg-white/[0.055] text-white transition duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white hover:text-[#09090d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5812]/70"
    >
      <span className="h-[22px] w-[22px]">{children}</span>
    </a>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 23 23" fill="none" aria-hidden="true">
      <path
        d="M22.2611 22.261V14.108C22.2611 10.101 21.3985 7.04016 16.7237 7.04016C14.4698 7.04016 12.9672 8.26451 12.355 9.4332H12.2993V7.4019H7.875V22.261H12.4941V14.8871C12.4941 12.9393 12.8559 11.0749 15.2489 11.0749C17.6141 11.0749 17.6419 13.2732 17.6419 14.9984V22.2332H22.2611V22.261Z"
        fill="currentColor"
      />
      <path d="M0.361328 7.40149H4.98045V22.2606H0.361328V7.40149Z" fill="currentColor" />
      <path
        d="M2.6713 0C1.19652 0 0 1.19652 0 2.6713C0 4.14608 1.19652 5.37043 2.6713 5.37043C4.14608 5.37043 5.3426 4.14608 5.3426 2.6713C5.3426 1.19652 4.14608 0 2.6713 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

function Field({
  id,
  name,
  type = "text",
  placeholder,
  required,
}: {
  id: string
  name: string
  type?: string
  placeholder: string
  required?: boolean
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="sr-only">{placeholder}</span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-11 w-full rounded-none border-0 border-b border-white/14 bg-transparent px-0 text-[15px] font-medium text-white outline-none transition-colors duration-300 placeholder:text-white/40 focus:border-[var(--legacy-ff7a2f)]"
      />
    </label>
  )
}

export default function LightContactSection({
  headlineLead = "Build faster with a reliable",
  headlineAccent = "offshore engineering partner",
  headlineLabel = "Build faster with a reliable offshore engineering partner",
  body = "Partner with Softree to accelerate product delivery, modernize enterprise systems, and scale with confidence.",
  messagePlaceholder = "Project Message",
  fullWidth = true,
  className,
}: LightContactSectionProps = {}) {
  const [status, setStatus] = useState<Status>("idle")
  const reduceMotion = useReducedMotion()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("submitting")

    const form = event.currentTarget
    const formData = new FormData(form)

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
      className={cn(
        "relative isolate overflow-hidden bg-[#0a0a0a] text-white py-10 sm:py-14 lg:py-16 font-sans",
        !fullWidth ? "px-4 sm:px-6 lg:px-8" : "px-0",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(#fff_0.7px,transparent_0.7px)] [background-size:22px_22px]"
      />

      <div className={cn("relative w-full", !fullWidth && "mx-auto max-w-[1440px]")}>
        <motion.div
          initial={reduceMotion ? false : { y: 28, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.75, ease: EASE }}
          className="mb-8 px-4 text-center sm:mb-10 sm:px-6 max-w-4xl mx-auto"
        >
          <h2
            aria-label={headlineLabel}
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em]"
          >
            {headlineLead} <span className="text-[#ff5812]">{headlineAccent}</span>.
          </h2>
          <p className="mt-2 text-white/60 text-sm sm:text-base">
            {body}
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { y: 34, opacity: 0, scale: 0.985 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.85, ease: EASE, delay: 0.05 }}
          className={cn(
            "w-full overflow-hidden bg-[#09090d] text-white shadow-[0_34px_100px_-50px_rgba(0,0,0,0.75)]",
            fullWidth
              ? "rounded-none border-y border-white/10"
              : "rounded-[8px] border border-white/10"
          )}
        >
          <div className={cn(
            "grid lg:min-h-[420px] grid-cols-1",
            fullWidth
              ? "lg:grid-cols-[96px_1.4fr_1.1fr] xl:grid-cols-[108px_1.4fr_1.1fr]"
              : "lg:grid-cols-[0.32fr_1.12fr_1fr]"
          )}>
            <aside className={cn(
              "flex flex-col justify-between border-b border-white/10 p-4 sm:p-5 lg:border-b-0 lg:border-r",
              fullWidth && "items-center text-center px-2 py-5 sm:p-5"
            )}>
              <div className="flex flex-col items-center">
                <p className="text-[12px] font-semibold tracking-[-0.01em] text-white/80">
                  Follow us
                </p>
                <div className="mt-4 flex flex-wrap gap-3 lg:flex-col items-center justify-center">
                  <SocialIcon href="https://www.linkedin.com/company/softree-technology-pvt-ltd/" label="LinkedIn">
                    <LinkedinIcon />
                  </SocialIcon>
                </div>
              </div>

              <div className="mt-10 hidden h-px w-full bg-white/10 lg:block" />
            </aside>

            <div className="flex flex-col justify-between gap-5 border-b border-white/10 p-5 sm:p-6 lg:p-7 xl:p-8 lg:border-b-0 lg:border-r">
              <div className="grid gap-4 xl:grid-cols-[0.86fr_1fr]">
                <div className="relative min-h-[100px] sm:min-h-[120px] md:min-h-[160px] overflow-hidden rounded-[6px] bg-white/8">
                  <Image
                    src="https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69ce260749d7110937223c7f_CTA%20Picture.webp"
                    alt="Person wearing a white hooded jacket and virtual reality headset against a shimmering abstract background."
                    fill
                    sizes="(min-width: 1280px) 320px, (min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(9,9,13,0.58)_100%)]"
                  />
                </div>

                <div>
                  <p className="text-[18px] font-medium tracking-[-0.02em]">
                    What we offer
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {[
                      "Enterprise Integration",
                      "Cloud Architecture",
                      "AI & Automation",
                      "Microsoft Solutions",
                      "Offshore Engineering",
                    ].map((service) => (
                      <div
                        key={service}
                        className="group flex items-center gap-3 border-b border-white/10 py-2"
                      >
                        <span className="h-2 w-2 rounded-full bg-[#ff5812] transition-transform duration-300 group-hover:scale-[1.45]" />
                        <span className="text-sm leading-none text-white/72 transition-colors group-hover:text-white">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 border-t border-white/10 pt-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <p className="text-[18px] font-medium tracking-[-0.02em]">
                    E-Mail
                  </p>
                  <a
                    href="mailto:sales@softreetechnology.com"
                    className="mt-2 block text-[14px] leading-6 text-white/58 transition-colors hover:text-[#ff5812]"
                  >
                    sales@softreetechnology.com
                  </a>
                </div>

                <div className="min-w-0">
                  <p className="text-[22px] font-semibold tracking-[-0.02em]">
                    Offices
                  </p>

                  <ul className="mt-4 flex flex-col gap-4">
                    {SOFTREE_OFFICES_CONTACT.map((office) => (
                      <li key={office.city}>
                        <p className="text-[15px] font-medium leading-tight text-white/80">
                          {office.city}
                        </p>
                        <p className="mt-1 text-[13px] leading-relaxed text-white/60">
                          {office.lines.slice(1).join(" · ")}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            <div className="flex flex-col p-5 sm:p-6 lg:p-7 xl:p-8">
              <div>
                <p className="text-[18px] font-medium tracking-[-0.02em]">
                  Got a question, challenge, or idea?
                </p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/52">
                  Fill out the form or pick a time on our scheduler.
                </p>
              </div>

              <div className="my-4 sm:my-5 rounded-[6px] border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-white/85">
                      30-min discovery call
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-white/42">
                      Same Calendly as our booking page · instant invite
                    </p>
                  </div>
                  <CalendlyPopupButton
                    label="Pick a time"
                    className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#ff5812] px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-white hover:text-[#09090d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5812]/60"
                  />
                </div>
              </div>

              <div className="my-4 sm:my-5 h-px w-full bg-white/10" />

              <form
                id="email-form"
                name="email-form"
                aria-label="Email Form"
                onSubmit={handleSubmit}
                className="flex flex-1 flex-col justify-start gap-8"
              >
                <div className="flex flex-col gap-5 sm:gap-6">
                  <Field id="CTA-Name" name="CTA-Name" placeholder="Full Name" />
                  <Field id="email" name="email" type="email" placeholder="E-Mail" required />
                  <Field id="company-name" name="company" placeholder="Company name" />
                  <label className="block" htmlFor="field">
                    <span className="sr-only">{messagePlaceholder}</span>
                    <textarea
                      id="field"
                      name="field"
                      placeholder={messagePlaceholder}
                      maxLength={5000}
                      className="min-h-[80px] sm:min-h-[110px] w-full resize-none rounded-none border-0 border-b border-white/14 bg-transparent px-0 py-4 text-[15px] font-medium text-white outline-none transition-colors duration-300 placeholder:text-white/40 focus:border-[#ff5812]"
                    />
                  </label>
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 w-full sm:w-auto">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex h-11 sm:h-12 w-full sm:w-fit sm:px-8 gap-3 items-center justify-center rounded-full bg-[#ff5812] px-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-white hover:text-[#09090d] disabled:cursor-not-allowed disabled:opacity-65"
                    >
                      <span>{status === "submitting" ? "Please wait..." : "Start a Project"}</span>
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
                        strokeWidth={2}
                      />
                    </button>
                    <CalendlyPopupButton />
                  </div>

                  {status === "success" && (
                    <p
                      role="status"
                      aria-live="polite"
                      aria-label="Email Form success"
                      className="mt-5 text-sm leading-6 text-white/68"
                    >
                      Thanks. Our team will get back to you within one business day.
                    </p>
                  )}

                  {status === "error" && (
                    <p
                      role="alert"
                      aria-live="assertive"
                      aria-label="Email Form failure"
                      className="mt-5 text-sm leading-6 text-red-500"
                    >
                      Submission failed. Please try again in a moment.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}