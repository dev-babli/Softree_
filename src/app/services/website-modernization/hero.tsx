"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, ChevronRight, Shield } from "lucide-react"
import { DUR, EASE_T, REVEAL } from "@/lib/motion"
import { trackModernizationEvent } from "./analytics"

const TRUST_CHIPS = [
  "No credit card",
  "Blueprint in minutes",
  "ISO-certified delivery",
] as const

type HeroProps = {
  onAnalyze: (url: string) => void
}

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed) return ""
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export default function ModernizationHero({ onAnalyze }: HeroProps) {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    const normalized = normalizeUrl(url)
    if (!normalized) {
      setError("Enter your website URL to continue.")
      return
    }
    try {
      const parsed = new URL(normalized)
      if (!parsed.hostname.includes(".")) {
        setError("Enter a valid domain, e.g. yourcompany.com")
        return
      }
    } catch {
      setError("Enter a valid website URL.")
      return
    }
    trackModernizationEvent("hero_submit", { url: normalized })
    onAnalyze(normalized)
    requestAnimationFrame(() => {
      document.getElementById("wm-analyser")?.focus({ preventScroll: true })
    })
  }

  return (
    <section
      aria-labelledby="wm-hero-heading"
      className="relative overflow-hidden bg-[#050508] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,88,18,0.18),transparent)]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36 lg:flex-row lg:items-center lg:gap-16">
        <nav aria-label="Breadcrumb" className="absolute left-6 top-24 md:left-10 md:top-28">
          <ol className="flex flex-wrap items-center gap-1 text-[11px] text-zinc-600">
            <li>
              <Link href="/services" className="hover:text-[#FF5812] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]">
                Services
              </Link>
            </li>
            <li aria-hidden><ChevronRight className="h-3 w-3" /></li>
            <li aria-current="page" className="text-zinc-400">Website Modernisation</li>
          </ol>
        </nav>
        <motion.div
          className="flex-1"
          initial={REVEAL.up.initial}
          animate={REVEAL.up.animate}
          transition={{ duration: DUR.section, ease: EASE_T.silk }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            Website Modernisation
          </p>
          <h1
            id="wm-hero-heading"
            className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.25rem]"
          >
            Paste your URL. Get a free modernisation blueprint.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Our AI scans your site, audits trust and positioning, compares you to
            competitors, and generates a wireframe blueprint — so you know exactly
            what to fix before you spend on a redesign.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-xl" noValidate>
            <label htmlFor="wm-hero-url" className="sr-only">
              Website URL to analyse
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="wm-hero-url"
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder="https://yourcompany.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="min-h-12 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-zinc-500 focus:border-[#FF5812] focus:outline-none focus:ring-2 focus:ring-[#FF5812]/40"
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? "wm-hero-url-error" : undefined}
              />
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF5812] px-6 text-sm font-semibold text-white transition hover:bg-[#e64f10] focus:outline-none focus:ring-2 focus:ring-[#FF5812] focus:ring-offset-2 focus:ring-offset-[#050508]"
              >
                Get free blueprint
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
            {error ? (
              <p id="wm-hero-url-error" role="alert" className="mt-2 text-sm text-red-400">
                {error}
              </p>
            ) : null}
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="/contact"
              className="inline-flex min-h-10 items-center rounded-lg border border-white/15 px-4 text-sm font-medium text-zinc-300 transition hover:border-white/30 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]"
              onClick={() => trackModernizationEvent("book_call_click", { target: "hero_secondary" })}
            >
              Book a modernisation strategy call
            </a>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2" aria-label="Trust highlights">
            {TRUST_CHIPS.map((chip) => (
              <li key={chip} className="flex items-center gap-1.5 text-xs text-zinc-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#FF5812]" aria-hidden />
                {chip}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.section, delay: 0.15, ease: EASE_T.silk }}
        >
          <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-2xl backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
              <Shield className="h-3.5 w-3.5" aria-hidden />
              Sample blueprint preview — demo data only
            </div>
            <div className="space-y-3 rounded-xl border border-white/5 bg-black/40 p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Modernisation score</span>
                <span className="font-semibold text-amber-400">62 / 100</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-amber-500 to-[#FF5812]" />
              </div>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex gap-2">
                  <span className="text-red-400" aria-hidden>●</span>
                  Weak trust signals above the fold
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400" aria-hidden>●</span>
                  Mobile CTA contrast below WCAG AA
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400" aria-hidden>●</span>
                  Competitors lead with proof — you lead with features
                </li>
              </ul>
            </div>
            <p className="mt-3 text-center text-[11px] text-zinc-600">
              Your actual report is generated from the URL you submit.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
