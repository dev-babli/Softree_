"use client"

/**
 * Softree-native case study sections — About Us / Careers design language.
 * Light/dark alternation, Inter typography, brand orange, framer-motion reveals.
 */
import { useCallback, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe2,
  HelpCircle,
  Layers,
  Minus,
  Plus,
  Quote,
  Shield,
  Users,
  Workflow,
  Wrench,
} from "lucide-react"
import type {
  BeforeAfterRow,
  CardItem,
  CaseStudyFAQ,
  CaseStudyLayoutData,
  GalleryItem,
  Highlight,
  RelatedStudy,
} from "../types"
import { CATEGORY_LABELS } from "@/lib/case-study-layouts"
import { TechLogo } from "../shared/PowerPlatformLogos"
import {
  cardClasses,
  sectionBg,
  sectionText,
  SOFTREE,
  type SectionTheme,
} from "./softreeTokens"

const ACCENT = SOFTREE.accent
const EASE = SOFTREE.ease
const CONTAINER = "mx-auto w-full max-w-[1240px] px-5 md:px-8"
const SECTION_PY = "py-20 md:py-28"

function containerClass(embedded?: boolean) {
  return embedded ? "w-full" : CONTAINER
}

/* ── Primitives ── */

export function OrangePill({ children, theme = "dark" }: { children: React.ReactNode; theme?: SectionTheme }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
      style={{
        backgroundColor: theme === "dark" ? "rgba(255,122,47,0.15)" : "rgba(255,122,47,0.12)",
        color: "#FF7A2F",
      }}
    >
      {children}
    </span>
  )
}

function SectionHeading({
  title,
  subtitle,
  centered = true,
  theme = "dark",
}: {
  title: string
  subtitle?: string
  centered?: boolean
  theme?: SectionTheme
}) {
  const t = sectionText(theme)
  return (
    <motion.div
      className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <h2 className={`text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.02em] ${t.heading}`}>{title}</h2>
      {subtitle ? <p className={`mt-4 text-[1.05rem] leading-relaxed ${t.body}`}>{subtitle}</p> : null}
    </motion.div>
  )
}

function CornerTick({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={`pointer-events-none ${className}`}>
      <path d="M0 0 H14 M0 0 V14" stroke="#F5B947" strokeWidth="1" />
    </svg>
  )
}

/* ── Shells ── */

export function SoftreeShell({ children, theme = "dark" }: { children: React.ReactNode; theme?: SectionTheme }) {
  return (
    <div
      className={`min-h-screen font-sans antialiased ${theme === "dark" ? "bg-[#0a0a0a] text-white" : "bg-[#fafaf9] text-[#0f172a]"}`}
    >
      {children}
    </div>
  )
}

/** @deprecated alias */
export const PremiumShell = SoftreeShell

/* ── Heroes ── */

export function SoftreeDarkHero({ data }: { data: CaseStudyLayoutData }) {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(255,122,47,0.22)_0%,transparent_55%)]" />
      {data.heroImageUrl ? (
        <div className="pointer-events-none absolute inset-0 opacity-35">
          <Image src={data.heroImageUrl} alt="" fill unoptimized className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/60" />
        </div>
      ) : null}
      <div className={`relative ${CONTAINER} py-28 md:py-36`}>
        <OrangePill>Case Study</OrangePill>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          {data.headerTitle}
        </h1>
        <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/65">{data.excerpt}</p>
        {data.highlights.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {data.highlights.map((h) => (
              <HeroStat key={`${h.value}-${h.label}`} highlight={h} theme="dark" />
            ))}
          </div>
        ) : null}
        <Link
          href={data.cta.buttonHref}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[#FF7A2F] px-8 py-3.5 text-sm font-semibold text-[#0a0a0a] transition-transform hover:-translate-y-0.5"
        >
          Talk to Our Experts
        </Link>
      </div>
    </section>
  )
}

export function SoftreeLightHero({ data }: { data: CaseStudyLayoutData }) {
  return (
    <section className="relative overflow-hidden bg-[#fafaf9]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="careers-blob-1 absolute -left-[10%] top-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,122,47,0.12)_0%,transparent_70%)] blur-3xl" />
        <div className="careers-blob-2 absolute -right-[5%] bottom-[5%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(24,82,255,0.08)_0%,transparent_70%)] blur-3xl" />
      </div>
      <div className={`relative ${CONTAINER} py-24 md:py-32`}>
        <div className="relative max-w-4xl">
          <CornerTick className="absolute -left-4 -top-4" />
          <OrangePill theme="light">Case Study</OrangePill>
          <h1 className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.03em] text-[#0f172a]">
            {data.headerTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.65] text-[#64748b]">{data.excerpt}</p>
        </div>
        {data.highlights.length > 0 ? (
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-[rgba(15,23,42,0.08)] pt-10 lg:grid-cols-4">
            {data.highlights.map((h) => (
              <HeroStat key={`${h.value}-${h.label}`} highlight={h} theme="light" />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function SoftreeSplitHero({ data }: { data: CaseStudyLayoutData }) {
  return (
    <section className="relative overflow-hidden bg-[#fafaf9]">
      <div className={`relative ${CONTAINER} grid grid-cols-1 items-center gap-12 py-24 md:py-32 lg:grid-cols-2`}>
        <div>
          <OrangePill theme="light">Case Study</OrangePill>
          <h1 className="mt-6 text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#0f172a]">
            {data.headerTitle}
          </h1>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-[#64748b]">{data.excerpt}</p>
          {data.highlights.length > 0 ? (
            <div className="mt-8 grid grid-cols-3 gap-4">
              {data.highlights.map((h) => (
                <HeroStat key={`${h.value}-${h.label}`} highlight={h} theme="light" compact />
              ))}
            </div>
          ) : null}
        </div>
        {data.heroImageUrl ? (
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white shadow-[0_30px_80px_rgba(255,122,47,0.12)]"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <Image src={data.heroImageUrl} alt={data.heroImageAlt || data.client} fill unoptimized priority className="object-cover" />
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}

export function SoftreeVideoHero({ data }: { data: CaseStudyLayoutData }) {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-[#0a0a0a] text-white">
      {data.videoUrl ? (
        <div className="pointer-events-none absolute inset-0">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-45">
            <source src={data.videoUrl} />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/40" />
        </div>
      ) : data.heroImageUrl ? (
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <Image src={data.heroImageUrl} alt="" fill unoptimized className="object-cover" priority />
          <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        </div>
      ) : null}
      <div className={`relative flex min-h-[70vh] flex-col justify-end ${CONTAINER} pb-20 pt-32`}>
        <OrangePill>Case Study</OrangePill>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          {data.headerTitle}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/70">{data.excerpt}</p>
        {data.highlights.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-8">
            {data.highlights.map((h) => (
              <div key={`${h.value}-${h.label}`}>
                <div className="text-3xl font-bold text-[#FF7A2F]">{h.value}</div>
                <div className="mt-1 text-sm text-white/55">{h.label}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

/** @deprecated — use SoftreeDarkHero / SoftreeSplitHero / SoftreeVideoHero */
export function PremiumHero({
  data,
  variant = "reference",
}: {
  data: CaseStudyLayoutData
  variant?: "reference" | "split" | "video"
}) {
  if (variant === "split") return <SoftreeSplitHero data={data} />
  if (variant === "video") return <SoftreeVideoHero data={data} />
  return <SoftreeDarkHero data={data} />
}

function HeroStat({ highlight, theme, compact }: { highlight: Highlight; theme: SectionTheme; compact?: boolean }) {
  const t = sectionText(theme)
  return (
    <div className="flex items-start gap-3">
      {!compact ? (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(255,122,47,0.15)]">
          <BarChart3 className="h-4 w-4 text-[#FF7A2F]" />
        </div>
      ) : null}
      <div>
        <div className={`font-bold leading-none text-[#FF7A2F] ${compact ? "text-xl" : "text-[clamp(1.6rem,2.5vw,2rem)]"}`}>
          {highlight.value}
        </div>
        <div className={`mt-2 text-sm leading-snug ${t.body}`}>{highlight.label}</div>
      </div>
    </div>
  )
}

/* ── Snapshot bar ── */

export function ProjectSnapshotBar({ data, theme = "dark" }: { data: CaseStudyLayoutData; theme?: SectionTheme }) {
  const items = [
    { icon: Workflow, label: "Project Type", value: data.snapshot.projectType },
    { icon: Building2, label: "Industry", value: data.snapshot.industry },
    { icon: Globe2, label: "Region", value: data.snapshot.region },
    { icon: Clock, label: "Duration", value: data.snapshot.duration },
    { icon: Users, label: "Team Size", value: data.snapshot.teamSize },
    { icon: BarChart3, label: "Users", value: data.snapshot.users },
  ]
  const t = sectionText(theme)
  return (
    <section className={`border-y ${t.border} ${theme === "dark" ? "bg-[#111111]" : "bg-white"}`}>
      <div className={`${CONTAINER} grid grid-cols-2 gap-6 py-8 md:grid-cols-3 lg:grid-cols-6`}>
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col gap-2">
            <Icon className="h-4 w-4 text-[#FF7A2F]" />
            <div className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${t.muted}`}>{label}</div>
            <div className={`text-sm font-medium leading-snug ${t.heading}`}>{value}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Content sections ── */

const CHALLENGE_ICONS = [Wrench, Layers, Shield]

function IconCard({
  card,
  icon: Icon,
  theme,
  circular = false,
}: {
  card: CardItem
  icon: React.ComponentType<{ className?: string }>
  theme: SectionTheme
  circular?: boolean
}) {
  const t = sectionText(theme)
  return (
    <motion.div
      className={`${cardClasses(theme)} p-7`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center bg-[rgba(255,122,47,0.12)] ${circular ? "rounded-full" : "rounded-xl"}`}
      >
        <Icon className="h-5 w-5 text-[#FF7A2F]" />
      </div>
      <h3 className={`text-lg font-semibold ${t.heading}`}>{card.title}</h3>
      <p className={`mt-3 text-sm leading-relaxed ${t.body}`}>{card.description}</p>
    </motion.div>
  )
}

export function ChallengeCardsSection({
  data,
  theme = "dark",
  embedded,
}: {
  data: CaseStudyLayoutData
  theme?: SectionTheme
  embedded?: boolean
}) {
  return (
    <section className={embedded ? "" : `${sectionBg(theme)} ${SECTION_PY}`}>
      <div className={containerClass(embedded)}>
        <SectionHeading title={data.challengeHeading} subtitle={data.challengeSubheading} theme={theme} />
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.challengeCards.map((card, i) => {
            const Icon = CHALLENGE_ICONS[i % CHALLENGE_ICONS.length]
            return <IconCard key={card.title} card={card} icon={Icon} theme={theme} circular />
          })}
        </div>
      </div>
    </section>
  )
}

export function SolutionArchitectureFlow({
  data,
  theme = "dark",
  embedded,
}: {
  data: CaseStudyLayoutData
  theme?: SectionTheme
  embedded?: boolean
}) {
  const t = sectionText(theme)
  return (
    <section className={embedded ? "" : `${sectionBg(theme, true)} ${SECTION_PY}`}>
      <div className={containerClass(embedded)}>
        <SectionHeading title={data.solutionHeading} theme={theme} />
        <div className="mt-14 overflow-x-auto pb-2">
          <div className="flex min-w-[720px] items-stretch justify-between gap-0">
            {data.solutionNodes.slice(0, 5).map((node, i, arr) => (
              <div key={node.title} className="flex flex-1 items-center">
                <div className={`flex flex-1 flex-col items-center ${cardClasses(theme)} px-4 py-6 text-center`}>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#FF7A2F] text-xs font-bold text-[#0a0a0a]">
                    {i + 1}
                  </div>
                  <div className={`text-sm font-semibold ${t.heading}`}>{node.title}</div>
                  <p className={`mt-2 text-xs leading-relaxed ${t.body}`}>{node.description}</p>
                </div>
                {i < arr.length - 1 ? (
                  <div className="mx-1 hidden h-px w-8 shrink-0 border-t border-dashed border-[#FF7A2F] sm:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function DeliverablesGrid({
  data,
  theme = "dark",
  embedded,
}: {
  data: CaseStudyLayoutData
  theme?: SectionTheme
  embedded?: boolean
}) {
  return (
    <section className={embedded ? "" : `${sectionBg(theme, true)} ${SECTION_PY}`}>
      <div className={containerClass(embedded)}>
        <SectionHeading title={data.deliverablesHeading} theme={theme} />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.deliverables.map((item) => (
            <IconCard key={item.title} card={item} icon={Layers} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function ScreenshotsCarousel({ items, theme = "dark" }: { items: GalleryItem[]; theme?: SectionTheme }) {
  const [index, setIndex] = useState(0)
  const count = items.length
  const current = items[index]
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count])
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count])
  if (!count || !current) return null

  return (
    <section className={`${sectionBg(theme)} ${SECTION_PY}`}>
      <div className={CONTAINER}>
        <SectionHeading title="Solution Screenshots" theme={theme} />
        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className={`relative aspect-[16/10] overflow-hidden ${cardClasses(theme)}`}>
            <Image src={current.url} alt={current.alt || "Screenshot"} fill unoptimized className="object-cover" />
          </div>
          {current.caption ? <p className={`mt-4 text-center text-sm ${sectionText(theme).body}`}>{current.caption}</p> : null}
          {count > 1 ? (
            <>
              <button type="button" onClick={prev} aria-label="Previous" className={`absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${cardClasses(theme)} p-3 hover:border-[#FF7A2F]`}>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={next} aria-label="Next" className={`absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-full ${cardClasses(theme)} p-3 hover:border-[#FF7A2F]`}>
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export function ImpactStatsRow({ data, theme = "dark" }: { data: CaseStudyLayoutData; theme?: SectionTheme }) {
  const t = sectionText(theme)
  return (
    <section className={`${sectionBg(theme, true)} ${SECTION_PY}`}>
      <div className={CONTAINER}>
        <SectionHeading title={data.impactHeading} theme={theme} />
        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {data.impactMetrics.map((m) => (
            <motion.div
              key={`${m.value}-${m.label}`}
              className={`${cardClasses(theme)} p-6 text-center`}
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none text-[#FF7A2F]">{m.value}</div>
              <div className={`mt-3 text-sm ${t.body}`}>{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TechStackRow({ data, theme = "dark" }: { data: CaseStudyLayoutData; theme?: SectionTheme }) {
  const t = sectionText(theme)
  const logoVariant = theme === "light" ? "light" : "dark"
  return (
    <section className={`${sectionBg(theme)} ${SECTION_PY}`}>
      <div className={CONTAINER}>
        <SectionHeading title="Technology Stack" theme={theme} />
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {data.technologies.slice(0, 6).map((tech) => (
            <div key={tech} className={`flex min-w-[120px] flex-col items-center gap-3 ${cardClasses(theme)} px-6 py-5`}>
              <TechLogo name={tech} className="h-10 w-10" variant={logoVariant} />
              <span className={`text-sm font-medium ${t.heading}`}>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TestimonialSection({ data, theme = "dark" }: { data: CaseStudyLayoutData; theme?: SectionTheme }) {
  if (!data.testimonial?.quote) return null
  const t = data.testimonial
  const st = sectionText(theme)
  return (
    <section className={`${sectionBg(theme, true)} ${SECTION_PY}`}>
      <div className={CONTAINER}>
        <div className={`${cardClasses(theme)} p-8 md:flex md:items-center md:gap-10 md:p-12`}>
          <Quote className="h-16 w-16 shrink-0 text-[#FF7A2F]" />
          <div className="flex-1">
            <p className={`text-xl italic leading-relaxed md:text-2xl ${theme === "dark" ? "text-white/85" : "text-[#334155]"}`}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-4">
              {t.avatarUrl ? (
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={t.avatarUrl} alt={t.name || "Client"} fill unoptimized className="object-cover" />
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF7A2F] text-sm font-bold text-[#0a0a0a]">
                  {(t.name || t.role || "C").charAt(0)}
                </div>
              )}
              <div>
                {t.name ? <div className={`font-semibold ${st.heading}`}>{t.name}</div> : null}
                {t.role ? <div className={`text-sm ${st.body}`}>{t.role}{t.company ? ` · ${t.company}` : ""}</div> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function RelatedCaseStudiesSection({ related, theme = "dark" }: { related: RelatedStudy[]; theme?: SectionTheme }) {
  if (!related.length) return null
  const st = sectionText(theme)
  return (
    <section className={`${sectionBg(theme)} ${SECTION_PY}`}>
      <div className={CONTAINER}>
        <div className="mb-12 flex items-end justify-between gap-4">
          <h2 className={`text-[clamp(1.75rem,3vw,2.5rem)] font-bold ${st.heading}`}>More Case Studies</h2>
          <Link href="/case-studies" className="text-sm font-semibold text-[#FF7A2F]">View All →</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {related.slice(0, 3).map((study) => {
            const img = study.mainImage?.asset?.url || study.mainImageUrl
            const tag = study.industry || CATEGORY_LABELS[study.category || ""] || "Case Study"
            return (
              <Link key={study._id} href={`/case-studies/${study.slug.current}`} className={`group overflow-hidden ${cardClasses(theme)}`}>
                <div className={`relative aspect-[16/10] ${theme === "dark" ? "bg-[#1e1e1e]" : "bg-[#f1f0ec]"}`}>
                  {img ? <Image src={img} alt={study.mainImage?.alt || study.title} fill unoptimized className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /> : null}
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#FF7A2F]">{tag}</span>
                  <h3 className={`mt-2 text-lg font-semibold ${st.heading}`}>{study.client || study.title}</h3>
                  <span className={`mt-4 inline-flex items-center gap-1 text-sm ${st.body} group-hover:opacity-100`}>
                    View Case Study <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function FinalCTA({ data }: { data: CaseStudyLayoutData }) {
  return (
    <section className={`relative overflow-hidden bg-[#0a0a0a] ${SECTION_PY}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,47,0.2)_0%,transparent_65%)]" />
      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <h2 className="text-[clamp(1.85rem,3.5vw,2.75rem)] font-bold tracking-[-0.02em] text-white">{data.cta.headline}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">{data.cta.subtext}</p>
        <Link href={data.cta.buttonHref} className="mt-9 inline-flex items-center justify-center rounded-full bg-[#FF7A2F] px-10 py-4 text-sm font-semibold text-[#0a0a0a]">
          {data.cta.buttonText}
        </Link>
      </div>
    </section>
  )
}

export function SoftreeFAQSection({ faqs }: { faqs: CaseStudyFAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  if (!faqs.length) return null
  return (
    <section id="faq" className={`scroll-mt-24 bg-[#fafaf9] ${SECTION_PY}`}>
      <div className={CONTAINER}>
        <motion.div className="mb-12 max-w-2xl md:mb-16" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE }}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(255,122,47,0.25)] bg-[rgba(255,122,47,0.08)] px-4 py-2">
            <HelpCircle className="h-4 w-4 text-[#FF7A2F]" aria-hidden />
            <span className="text-sm font-medium text-[#FF7A2F]">FAQ</span>
          </div>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.02em] text-[#0f172a]">
            Common questions about this project
          </h2>
        </motion.div>
        <div className="divide-y divide-[rgba(15,23,42,0.08)] rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-start justify-between gap-6 px-6 py-6 text-left transition-colors hover:bg-[#fafaf9]/80 md:px-8 md:py-7"
                  aria-expanded={isOpen}
                >
                  <div className="flex gap-5">
                    <span className="mt-0.5 shrink-0 text-lg text-[#FF7A2F]/50">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-base font-semibold leading-snug text-[#0f172a] md:text-lg">{faq.question}</span>
                  </div>
                  <span className="mt-1 shrink-0 text-[#94a3b8]">{isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 pl-[4.25rem] text-base leading-[1.75] text-[#64748b] md:px-8 md:pb-7 md:pl-[4.75rem]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Structural variants ── */

export function BeforeAfterTable({ rows, theme = "light" }: { rows: BeforeAfterRow[]; theme?: SectionTheme }) {
  const t = sectionText(theme)
  return (
    <section className={`${sectionBg(theme, true)} ${SECTION_PY}`}>
      <div className={CONTAINER}>
        <SectionHeading title="Before & After" subtitle="Measurable transformation across core operational metrics." theme={theme} />
        <div className={`mt-14 overflow-hidden rounded-2xl border ${t.border}`}>
          <div className={`grid grid-cols-3 text-xs font-semibold uppercase tracking-[0.14em] ${t.muted} ${theme === "dark" ? "bg-[#141414]" : "bg-[#f8f9fc]"}`}>
            <div className="px-6 py-4">Metric</div>
            <div className={`border-l ${t.border} px-6 py-4`}>Before</div>
            <div className={`border-l ${t.border} px-6 py-4`}>After</div>
          </div>
          {rows.map((row) => (
            <div key={row.metric} className={`grid grid-cols-3 border-t text-sm ${t.border} ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"}`}>
              <div className={`px-6 py-5 font-medium ${t.heading}`}>{row.metric}</div>
              <div className={`border-l ${t.border} px-6 py-5 ${t.body}`}>{row.before}</div>
              <div className={`border-l ${t.border} px-6 py-5 font-medium text-[#FF7A2F]`}>{row.after}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TabbedDeliverables({ items, theme = "light" }: { items: CardItem[]; theme?: SectionTheme }) {
  const tabs = [
    { id: "apps", label: "Applications", items: items.slice(0, 2) },
    { id: "automation", label: "Automation", items: items.slice(2, 4) },
    { id: "analytics", label: "Analytics", items: items.slice(4, 6) },
  ].filter((t) => t.items.length > 0)
  const [active, setActive] = useState(tabs[0]?.id || "apps")
  const current = tabs.find((t) => t.id === active) || tabs[0]

  return (
    <section className={`${sectionBg(theme)} ${SECTION_PY}`}>
      <div className={CONTAINER}>
        <SectionHeading title="What We Delivered" subtitle="Explore deliverables by workstream." theme={theme} />
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                active === tab.id ? "bg-[#FF7A2F] text-[#0a0a0a]" : theme === "dark" ? "border border-white/15 text-white/70" : "border border-[rgba(15,23,42,0.12)] text-[#64748b]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {current?.items.map((item) => <IconCard key={item.title} card={item} icon={Layers} theme={theme} />)}
        </div>
      </div>
    </section>
  )
}

export function BentoImpactGrid({ data, theme = "dark" }: { data: CaseStudyLayoutData; theme?: SectionTheme }) {
  const [a, b, c, d] = data.impactMetrics
  return (
    <section className={`${sectionBg(theme)} ${SECTION_PY}`}>
      <div className={CONTAINER}>
        <SectionHeading title={data.impactHeading} theme={theme} />
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-5">
          {[a, b, c, d].filter(Boolean).map((m, i) => {
            const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"]
            return (
              <motion.div
                key={`${m!.value}-${i}`}
                className={`${cardClasses(theme)} p-8 ${spans[i] || ""}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
              >
                <div className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-[#FF7A2F]">{m!.value}</div>
                <div className={`mt-3 max-w-sm text-base ${sectionText(theme).body}`}>{m!.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function VerticalTimeline({ nodes, theme = "light" }: { nodes: CardItem[]; theme?: SectionTheme }) {
  return (
    <section className={`${sectionBg(theme, true)} ${SECTION_PY}`}>
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionHeading title="Solution Journey" subtitle="Phased delivery from discovery to enterprise rollout." theme={theme} />
        <div className="relative mt-14 space-y-0">
          <div className="absolute bottom-4 left-[19px] top-4 w-px border-l border-dashed border-[#FF7A2F]" />
          {nodes.map((node, i) => (
            <div key={node.title} className="relative flex gap-6 pb-10 last:pb-0">
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF7A2F] text-sm font-bold text-[#0a0a0a]">
                {i + 1}
              </div>
              <div className={`${cardClasses(theme)} flex-1 p-6`}>
                <h3 className={`font-semibold ${sectionText(theme).heading}`}>{node.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${sectionText(theme).body}`}>{node.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StatsDashboard({ data, theme = "light" }: { data: CaseStudyLayoutData; theme?: SectionTheme }) {
  const t = sectionText(theme)
  return (
    <section className={`${sectionBg(theme)} ${SECTION_PY}`}>
      <div className={CONTAINER}>
        <SectionHeading title="Performance Dashboard" subtitle="Live KPIs modeled after the production analytics suite." theme={theme} />
        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className={`${cardClasses(theme)} p-6 lg:col-span-8`}>
            <div className={`mb-4 text-xs font-semibold uppercase tracking-wider ${t.muted}`}>Primary KPIs</div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {data.impactMetrics.map((m) => (
                <div key={m.value} className={`rounded-xl p-4 ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-[#fafaf9]"}`}>
                  <div className="text-2xl font-bold text-[#FF7A2F]">{m.value}</div>
                  <div className={`mt-1 text-xs ${t.body}`}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={`${cardClasses(theme)} p-6 lg:col-span-4`}>
            <div className={`mb-4 text-xs font-semibold uppercase tracking-wider ${t.muted}`}>Snapshot</div>
            <dl className="space-y-4 text-sm">
              {(Object.entries(data.snapshot) as [string, string][]).map(([key, val]) => (
                <div key={key}>
                  <dt className={t.muted}>{key.replace(/([A-Z])/g, " $1")}</dt>
                  <dd className={`mt-1 font-medium ${t.heading}`}>{val}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ParallaxScreenshots({ items, theme = "dark" }: { items: GalleryItem[]; theme?: SectionTheme }) {
  const layers = items.slice(0, 3)
  if (!layers.length) return null
  return (
    <section className={`relative overflow-hidden ${sectionBg(theme, true)} px-5 py-24 md:px-8 md:py-32`}>
      <div className={CONTAINER.replace("px-5 md:px-8", "")}>
        <SectionHeading title="Solution in Motion" subtitle="Layered product views with depth and perspective." theme={theme} />
        <div className="relative mx-auto mt-16 h-[420px] max-w-3xl md:h-[480px]">
          {layers.map((item, i) => (
            <motion.div
              key={item.url}
              className={`absolute overflow-hidden ${cardClasses(theme)} shadow-2xl`}
              style={{ width: `${88 - i * 8}%`, left: `${6 + i * 6}%`, top: `${i * 36}px`, zIndex: layers.length - i }}
              initial={{ opacity: 0, y: 30 + i * 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
            >
              <div className="relative aspect-[16/10] w-full" style={{ transform: `rotate(${i === 0 ? -2 : i === 1 ? 1 : 3}deg)` }}>
                <Image src={item.url} alt={item.alt || "Screenshot"} fill unoptimized className="object-cover" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ZigZagSection({ data, theme = "light" }: { data: CaseStudyLayoutData; theme?: SectionTheme }) {
  const blocks = [
    { title: data.challengeHeading, body: data.challengeSubheading, image: data.gallery[0] },
    { title: data.solutionHeading, body: data.solutionNodes[0]?.description || "", image: data.gallery[1] },
    { title: data.deliverablesHeading, body: data.deliverables[0]?.description || "", image: data.gallery[2] },
  ].filter((b) => b.body || b.image)
  const t = sectionText(theme)

  return (
    <section className={`${sectionBg(theme)} ${SECTION_PY}`}>
      <div className={`${CONTAINER} space-y-20`}>
        {blocks.map((block, i) => (
          <motion.div
            key={block.title}
            className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div>
              <h2 className={`text-2xl font-bold md:text-3xl ${t.heading}`}>{block.title}</h2>
              <p className={`mt-4 text-base leading-relaxed ${t.body}`}>{block.body}</p>
            </div>
            {block.image ? (
              <div className={`relative aspect-[16/10] overflow-hidden ${cardClasses(theme)}`}>
                <Image src={block.image.url} alt={block.image.alt || block.title} fill unoptimized className="object-cover" />
              </div>
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function StickySidebarLayout({
  data,
  children,
  theme = "light",
}: {
  data: CaseStudyLayoutData
  children: React.ReactNode
  theme?: SectionTheme
}) {
  const t = sectionText(theme)
  return (
    <section className={`${sectionBg(theme)} ${SECTION_PY}`}>
      <div className={`${CONTAINER} grid grid-cols-1 gap-12 lg:grid-cols-[280px_minmax(0,1fr)]`}>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className={`${cardClasses(theme)} p-6`}>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FF7A2F]">Project Snapshot</div>
            <dl className="mt-6 space-y-5 text-sm">
              {(Object.entries(data.snapshot) as [string, string][]).map(([key, val]) => (
                <div key={key}>
                  <dt className={t.muted}>{key.replace(/([A-Z])/g, " $1")}</dt>
                  <dd className={`mt-1 font-medium ${t.heading}`}>{val}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
        <div className="space-y-16">{children}</div>
      </div>
    </section>
  )
}

/** Shared layout footer block: FAQ + CTA */
export function SoftreeLayoutFooter({ data, theme = "dark" }: { data: CaseStudyLayoutData; theme?: SectionTheme }) {
  return (
    <>
      <RelatedCaseStudiesSection related={data.related} theme={theme} />
      <SoftreeFAQSection faqs={data.faqs} />
      <FinalCTA data={data} />
    </>
  )
}
