"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import type { ReactNode } from "react"

import { DUR, EASE_T, REVEAL, VIEWPORT } from "@/lib/motion"

type AiRevealProps = {
  children: ReactNode
  className?: string
  variant?: keyof typeof REVEAL
  delay?: number
} & Omit<HTMLMotionProps<"div">, "children">

export function AiReveal({
  children,
  className,
  variant = "up",
  delay = 0,
  ...rest
}: AiRevealProps) {
  const v = REVEAL[variant]

  return (
    <motion.div
      className={className}
      initial={v.initial}
      whileInView={v.animate}
      viewport={VIEWPORT.default}
      transition={{ duration: DUR.section, ease: EASE_T.silk, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
