"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { csLightClasses } from "../../design-system/caseStudyLightTokens"

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1]

export function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p className={`${csLightClasses.label} mb-4 ${className}`}>{children}</p>
  )
}

export function SectionTitle({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode
  className?: string
  as?: "h1" | "h2" | "h3"
}) {
  return (
    <Tag className={`${csLightClasses.headingSection} ${className}`}>{children}</Tag>
  )
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 16,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.45, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export function PageContainer({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode
  className?: string
  wide?: boolean
}) {
  return (
    <div
      className={`${csLightClasses.container} px-5 md:px-8 ${wide ? "max-w-[1280px]" : ""} ${className}`}
    >
      {children}
    </div>
  )
}

/** Primary CTA — matches homepage / classic case study pills */
export function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full bg-[var(--softree-accent,#FF7A2F)] px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:bg-[var(--softree-accent-hover,#E85A1F)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F] focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </a>
  )
}

export function OutlineButton({
  href,
  children,
  className = "",
  dark = false,
}: {
  href: string
  children: ReactNode
  className?: string
  dark?: boolean
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full border px-8 py-3.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F] focus-visible:ring-offset-2 ${
        dark
          ? "border-white/25 text-white hover:border-white/50 hover:bg-white/10"
          : "border-[#191919] text-[#191919] hover:bg-[#191919] hover:text-white"
      } ${className}`}
    >
      {children}
    </a>
  )
}
