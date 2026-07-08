"use client"

import type { ReactNode } from "react"
import { SectionHeader } from "@/components/homepage-light/SectionHeader"
import type { SectionHeaderAccent } from "@/components/homepage-light/SectionHeader"

type AgenticSectionProps = {
  badge: string
  accent?: SectionHeaderAccent
  headline: React.ReactNode
  body?: React.ReactNode
  children: React.ReactNode
  className?: string
  id?: string
  variant?: "white" | "cream"
}

const BG = {
  white: "bg-white",
  cream: "bg-[#F8F9FC]",
} as const

export function AgenticSection({
  badge,
  accent = "#FF5812",
  headline,
  body,
  children,
  className = "",
  id,
  variant = "white",
}: AgenticSectionProps) {
  return (
    <section id={id} className={`w-full py-20 md:py-24 lg:py-28 ${BG[variant]} ${className}`}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-12 md:mb-14 lg:mb-16">
          <SectionHeader badge={badge} accent={accent} headline={headline} body={body} />
        </div>
        {children}
      </div>
    </section>
  )
}
