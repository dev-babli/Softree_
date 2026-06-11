"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionProps,
  type Variants,
} from "framer-motion"
import { useRef, type ReactNode } from "react"

/** Softree editorial ease — confident, not bouncy */
export const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "fade"

type RevealProps = {
  children: ReactNode
  className?: string
  /** @deprecated use distance */
  y?: number
  distance?: number
  delay?: number
  variant?: RevealVariant
  once?: boolean
  amount?: number
} & Omit<MotionProps, "children">

function hiddenState(variant: RevealVariant, distance: number) {
  switch (variant) {
    case "down":
      return { opacity: 0, y: -distance, x: 0, scale: 1, filter: "blur(0px)" }
    case "left":
      return { opacity: 0, x: distance, y: 0, scale: 1, filter: "blur(0px)" }
    case "right":
      return { opacity: 0, x: -distance, y: 0, scale: 1, filter: "blur(0px)" }
    case "scale":
      return { opacity: 0, scale: 0.92, y: distance * 0.35, x: 0, filter: "blur(0px)" }
    case "blur":
      return { opacity: 0, y: distance * 0.65, x: 0, scale: 1, filter: "blur(14px)" }
    case "fade":
      return { opacity: 0, y: 0, x: 0, scale: 1, filter: "blur(0px)" }
    case "up":
    default:
      return { opacity: 0, y: distance, x: 0, scale: 1, filter: "blur(0px)" }
  }
}

const visibleState = {
  opacity: 1,
  y: 0,
  x: 0,
  scale: 1,
  filter: "blur(0px)",
}

/** Scroll-triggered reveal — use in page sections below the fold */
export function Reveal({
  children,
  className = "",
  y,
  distance: distanceProp,
  delay = 0,
  variant = "up",
  once = true,
  amount = 0.2,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion()
  const distance = distanceProp ?? y ?? 28

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={hiddenState(variant, distance)}
      whileInView={visibleState}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.68, ease: REVEAL_EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Above-the-fold hero cascade — plays on mount, not scroll */
export function HeroReveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  distance = 32,
}: {
  children: ReactNode
  className?: string
  delay?: number
  variant?: RevealVariant
  distance?: number
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={hiddenState(variant, distance)}
      animate={visibleState}
      transition={{ duration: 0.75, ease: REVEAL_EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.62, ease: REVEAL_EASE },
  },
}

export const staggerItemScaleVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 110, damping: 22, mass: 0.85 },
  },
}

/** Orchestrated scroll reveal for grids, card rows, metrics */
export function RevealStagger({
  children,
  className = "",
  stagger = 0.09,
  variant = "default",
}: {
  children: ReactNode
  className?: string
  stagger?: number
  variant?: "default" | "scale"
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: 0.04 } },
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -6% 0px" }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className = "",
  variant = "default",
}: {
  children: ReactNode
  className?: string
  variant?: "default" | "scale"
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={variant === "scale" ? staggerItemScaleVariants : staggerItemVariants}
    >
      {children}
    </motion.div>
  )
}

/** Subtle parallax on images while scrolling through a section */
export function ParallaxLayer({
  children,
  className = "",
  strength = 36,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength])

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}

/** Section header: label blur-in, then title scale-up */
export function SectionHeaderReveal({
  label,
  title,
  description,
  className = "",
}: {
  label?: ReactNode
  title: ReactNode
  description?: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      {label ? (
        <Reveal variant="blur" distance={20} delay={0}>
          {label}
        </Reveal>
      ) : null}
      <Reveal variant="scale" distance={24} delay={label ? 0.06 : 0}>
        {title}
      </Reveal>
      {description ? (
        <Reveal variant="up" distance={20} delay={0.12} className="mt-4 max-w-2xl">
          {description}
        </Reveal>
      ) : null}
    </div>
  )
}
