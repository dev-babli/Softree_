"use client"

import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust"

export function AiPremiumMarquee() {
  return (
    <section aria-label="Trusted by enterprises" className="border-y border-[var(--ai-line)] bg-white">
      <TrustedBrandsMarquee surface="light" />
    </section>
  )
}
