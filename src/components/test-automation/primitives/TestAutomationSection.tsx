import type { ReactNode } from "react"

import { SectionHeader } from "@/components/homepage-light/SectionHeader"
import type { SectionHeaderAccent } from "@/components/homepage-light/SectionHeader"

type TestAutomationSectionProps = {
  badge: string
  accent?: SectionHeaderAccent
  headline: ReactNode
  body?: ReactNode
  children: ReactNode
  className?: string
  id?: string
  variant?: "white" | "cream"
}

const BG = {
  white: "bg-white",
  cream: "bg-[#f8f4ec]",
} as const

export function TestAutomationSection({
  badge,
  accent = "#FF5812",
  headline,
  body,
  children,
  className = "",
  id,
  variant = "white",
}: TestAutomationSectionProps) {
  return (
    <section id={id} className={`w-full py-16 md:py-24 lg:py-28 ${BG[variant]} ${className}`}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="mb-10 md:mb-14 lg:mb-16">
          <SectionHeader badge={badge} accent={accent} headline={headline} body={body} />
        </div>
        {children}
      </div>
    </section>
  )
}
