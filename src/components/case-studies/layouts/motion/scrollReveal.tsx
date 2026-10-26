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

/** Softree editorial ease — confident, smooth, not bouncy */
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
  amount?: number | "some" | "all"
} & Omit<MotionProps, "children">

// Hardware-accelerated compositor-only properties (no costly Gaussian blur filter passes during scroll)
function hiddenState(variant: RevealVariant, distance: number) {
  switch (variant) {
    case "down":
      return { opacity: 0, y: -distance, x: 0, scale: 1 }
    case "left":
      return { opacity: 0, x: distance, y: 0, scale: 1 }
    case "right":
      return { opacity: 0, x: -distance, y: 0, scale: 1 }
    case "scale":
      return { opacity: 0, scale: 0.95, y: distance * 0.35, x: 0 }
    case "blur":
      return { opacity: 0, y: distance * 0.45, x: 0, scale: 1 }
    case "fade":
      return { opacity: 0, y: 0, x: 0, scale: 1 }
    case "up":
    default:
      return { opacity: 0, y: distance, x: 0, scale: 1 }
  }
}

const visibleState = {
  opacity: 1,
  y: 0,
  x: 0,
  scale: 1,
}

/** Scroll-triggered reveal — GPU compositor accelerated, 0 filter stalls */
export function Reveal({
  children,
  className = "",
  y,
  distance: distanceProp,
  delay = 0,
  variant = "up",
  once = true,
  amount = "some",
  style,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion()
  const distance = distanceProp ?? y ?? 24

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={hiddenState(variant, distance)}
      whileInView={visibleState}
      viewport={{ once, amount, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.52, ease: REVEAL_EASE, delay }}
      style={{ willChange: "transform, opacity", ...style }}
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
  distance = 28,
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
      transition={{ duration: 0.65, ease: REVEAL_EASE, delay }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  )
}

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.03,
    },
  },
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: REVEAL_EASE },
  },
}

export const staggerItemScaleVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.48, ease: REVEAL_EASE },
  },
}

/** Orchestrated scroll reveal for grids, card rows, metrics */
export function RevealStagger({
  children,
  className = "",
  stagger = 0.08,
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
    visible: { transition: { staggerChildren: stagger, delayChildren: 0.03 } },
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
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
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  )
}

/** Subtle parallax on images while scrolling through a section */
export function ParallaxLayer({
  children,
  className = "",
  strength = 24,
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
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      <motion.div style={{ y, willChange: "transform" }}>{children}</motion.div>
    </div>
  )
}

/** Section header: clean GPU-accelerated reveals */
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
        <Reveal variant="up" distance={16} delay={0}>
          {label}
        </Reveal>
      ) : null}
      <Reveal variant="up" distance={20} delay={label ? 0.04 : 0}>
        {title}
      </Reveal>
      {description ? (
        <Reveal variant="up" distance={20} delay={0.08} className="mt-4 max-w-2xl">
          {description}
        </Reveal>
      ) : null}
    </div>
  )
}
