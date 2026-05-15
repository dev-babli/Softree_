"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 block sm:hidden"
      role="complementary"
      aria-label="Book a call CTA"
    >
      <div className="safe-area-pb flex items-center justify-between gap-3 border-t border-white/10 bg-[#09090d]/95 px-4 py-3 backdrop-blur-xl">
        <p className="text-[13px] font-medium text-white/80">
          Ready to scope your project?
        </p>
        <Link
          href="/contact"
          onClick={() => {
            if (typeof window !== "undefined") {
              (window as unknown as { dataLayer?: object[] }).dataLayer?.push({
                event: "cta_click",
                cta_location: "mobile_sticky",
                cta_text: "Book a call",
              })
            }
          }}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#ff5812] px-4 py-2.5 text-[12px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#e04800] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5812]/60"
        >
          Book a call
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}
