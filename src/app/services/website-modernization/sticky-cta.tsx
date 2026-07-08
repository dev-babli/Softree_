"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { trackModernizationEvent } from "./analytics"

export default function StickyModernizationCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("wm-hero-heading")
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#050508]/95 px-4 py-3 backdrop-blur-md md:px-6"
      role="region"
      aria-label="Quick actions"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-center text-sm text-zinc-400 sm:text-left">
          Ready to modernise? Start with a free AI blueprint or book a strategy call.
        </p>
        <div className="flex shrink-0 gap-2">
          <a
            href="#wm-analyser"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-[#FF5812] px-4 text-sm font-semibold text-white hover:bg-[#e64f10] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050508]"
            onClick={() => trackModernizationEvent("book_call_click", { target: "sticky_blueprint" })}
          >
            Get blueprint
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </a>
          <Link
            href="/contact"
            className="inline-flex min-h-10 items-center rounded-lg border border-white/15 px-4 text-sm font-semibold text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            onClick={() => trackModernizationEvent("book_call_click", { target: "sticky_contact" })}
          >
            Book call
          </Link>
        </div>
      </div>
    </div>
  )
}
