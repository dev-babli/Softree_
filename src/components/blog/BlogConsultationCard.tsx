"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react"

export interface BlogConsultationCardProps {
  /** Optional kicker text above headline (defaults to "LET'S TALK") */
  kicker?: string
  /** Headline prefix before the highlighted brand name */
  title?: string
  /** Highlighted brand word or phrase (defaults to "Softree") */
  highlightWord?: string
  /** Description text (defaults to "Discuss your use case, explore possibilities, and get expert guidance from our team.") */
  description?: string
  /** CTA button label (defaults to "Contact Us") */
  buttonText?: string
  /** CTA button target link (defaults to "/contact") */
  buttonHref?: string
  /** Custom image source path */
  imageSrc?: string
  /** Custom alt text for the image */
  imageAlt?: string
  /** Topic/category to automatically derive relevant copy if not explicitly provided */
  category?: string
  /** Layout style: "sidebar" for vertical sidebar, "banner" for horizontal full-width/in-article, "inline" for compact mid-content */
  variant?: "sidebar" | "banner" | "inline" | "compact"
  /** Optional extra CSS classes */
  className?: string
}

/**
 * Returns a smart, generic headline tailored to the content category (without assuming AI)
 */
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
    return "Modernize Your Cloud Infrastructure with"
  }
  if (cat.includes("data") || cat.includes("fabric") || cat.includes("analytics")) {
    return "Unlock Enterprise Data Value with"
  }
  if (cat.includes("power") || cat.includes("sharepoint") || cat.includes("spfx") || cat.includes("automation")) {
    return "Accelerate Workflow Automation with"
  }
  if (cat.includes("ai") || cat.includes("agent") || cat.includes("intelligence")) {
    return "Build Smarter Enterprise Solutions with"
  }

  return "Build Scalable Solutions with"
}

export function BlogConsultationCard({
  kicker = "LET'S TALK",
  title,
  highlightWord = "Softree",
  description = "Discuss your use case, explore possibilities, and get expert guidance from our team.",
  buttonText = "Contact Us",
  buttonHref = "#contact",
  imageSrc = "/images/blog/blog-talk-cta.jpg",
  imageAlt = "Softree engineering & consulting experts discussing client solutions",
  category,
  variant = "sidebar",
  className = "",
}: BlogConsultationCardProps) {
  const displayTitle = title || getCategoryHeadline(category)

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (buttonHref?.startsWith("#")) {
      const targetId = buttonHref.replace("#", "")
      const el = document.getElementById(targetId)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // --------------------------------------------------------------------------
  // BANNER / HORIZONTAL VARIANT (Great for in-article or full-width sections)
  // --------------------------------------------------------------------------
  if (variant === "banner") {
    return (
      <aside
        className={`relative my-10 overflow-hidden rounded-3xl border border-[#ffdcd4]/80 bg-gradient-to-br from-[#fff7f5] via-[#fffaf8] to-[#ffffff] p-6 sm:p-8 lg:p-10 shadow-[0_16px_40px_rgba(255,87,34,0.06)] transition-all duration-300 hover:shadow-[0_20px_48px_rgba(255,87,34,0.1)] ${className}`}
        aria-label="Softree Consultation Callout"
      >
        {/* Soft background ambient glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#ff6b4a]/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-tr from-[#ffa07a]/15 to-transparent blur-3xl" />

        <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr] lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4 sm:space-y-5">
            {/* Top kicker */}
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-5 rounded-full bg-[#ff461e]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                {kicker}
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.18] tracking-[-0.03em] text-zinc-950">
              {displayTitle}{" "}
              <span className="inline-block text-[#ff461e]">{highlightWord}</span>
            </h3>

            {/* Description */}
            <p className="max-w-xl text-[14px] sm:text-[15px] leading-relaxed text-zinc-600">
              {description}
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href={buttonHref}
                onClick={handleCtaClick}
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#ff461e] via-[#ff5426] to-[#ff6b3d] px-7 py-3 text-sm font-semibold text-white shadow-[0_6px_22px_rgba(255,70,30,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_28px_rgba(255,70,30,0.45)] active:scale-[0.98]"
              >
                <span>{buttonText}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Image Graphic */}
          <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] md:max-w-none">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[#ffe0d6] bg-gradient-to-b from-[#fff2ed] to-white shadow-[0_12px_32px_rgba(0,0,0,0.04)]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
              />

              {/* Decorative Floating Chat Pill */}
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md border border-orange-100">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold text-zinc-700">Team Online</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    )
  }

  // --------------------------------------------------------------------------
  // INLINE COMPACT VARIANT (Great for short callouts inside paragraphs)
  // --------------------------------------------------------------------------
  if (variant === "inline" || variant === "compact") {
    return (
      <aside
        className={`relative my-8 overflow-hidden rounded-2xl border border-[#ffdcd4]/80 bg-gradient-to-br from-[#fff7f5] via-[#fffbf9] to-[#ffffff] p-5 sm:p-6 shadow-[0_10px_28px_rgba(255,87,34,0.05)] ${className}`}
        aria-label="Softree Consultation Callout"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-[2px] w-4 rounded-full bg-[#ff461e]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                {kicker}
              </span>
            </div>
            <h4 className="text-lg font-bold tracking-tight text-zinc-950">
              {displayTitle} <span className="text-[#ff461e]">{highlightWord}</span>
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-md">{description}</p>
          </div>
          <Link
            href={buttonHref}
            onClick={handleCtaClick}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#ff461e] to-[#ff5d2b] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(255,70,30,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(255,70,30,0.4)] active:scale-[0.98]"
          >
            <span>{buttonText}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </aside>
    )
  }

  // --------------------------------------------------------------------------
  // SIDEBAR VARIANT (Default: Perfect for sticky sidebar in blog post page)
  // Exact layout match to the screenshot!
  // --------------------------------------------------------------------------
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-[#ffdcd4]/90 bg-gradient-to-b from-[#fff7f5] via-[#fffaf8] to-[#ffffff] p-5 sm:p-6 shadow-[0_12px_36px_rgba(255,87,34,0.07)] transition-all duration-300 hover:shadow-[0_16px_44px_rgba(255,87,34,0.12)] ${className}`}
      aria-label="Softree Consultation Widget"
    >
      {/* Top subtle ambient glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-[#ff6b4a]/20 to-transparent blur-2xl" />

      <div className="relative z-10 space-y-4">
        {/* Top Kicker */}
        <div className="flex items-center gap-2">
          <span className="h-[2px] w-4.5 rounded-full bg-[#ff461e]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">
            {kicker}
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-xl sm:text-[22px] font-black leading-[1.2] tracking-[-0.025em] text-zinc-950">
          {displayTitle}{" "}
          <span className="block text-[#ff461e]">{highlightWord}</span>
        </h3>

        {/* Description */}
        <p className="text-[13px] leading-relaxed text-zinc-600">
          {description}
        </p>

        {/* CTA Button */}
        <div className="pt-1">
          <Link
            href={buttonHref}
            onClick={handleCtaClick}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff461e] via-[#ff5426] to-[#ff6b3d] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(255,70,30,0.32)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_6px_22px_rgba(255,70,30,0.45)] active:scale-[0.98]"
          >
            <span>{buttonText}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>


        {/* Visual Container */}
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-[#ffe2d8] bg-gradient-to-b from-[#fff3ee] to-white shadow-inner">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover object-center transition-transform duration-500 hover:scale-[1.04]"
            />
            {/* Subtle bottom fade to blend with card */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-40 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogConsultationCard
