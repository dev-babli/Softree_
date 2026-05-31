"use client"

import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Database,
  Eye,
  Shield,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import type { CaseStudyLayoutData, Highlight, RelatedStudy } from "../../types"
import { TechLogo } from "../../shared/PowerPlatformLogos"
import { DashboardMockupDark } from "./DashboardMockupDark"
import { DashboardMockupLight } from "./DashboardMockupLight"
import { NEXORA_TOKENS as T, nexoraCssVars } from "./tokens"

const CONTAINER = "mx-auto w-full max-w-6xl"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[11px] font-bold uppercase tracking-[0.2em]"
      style={{ color: T.accent }}
    >
      {children}
    </p>
  )
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`mt-3 text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold leading-[1.15] tracking-tight ${className}`}
      style={{ color: T.heading }}
    >
      {children}
    </h2>
  )
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value || "—"}</p>
    </div>
  )
}

function HeroSection({ data }: { data: CaseStudyLayoutData }) {
  const services = data.servicesProvided || "Product Design, Web Development"
  const duration = data.snapshot.duration || data.overviewBar?.duration || "4 Months"
  const industry = data.industry || data.snapshot.industry || "SaaS / Analytics"

  return (
    <section
      className="relative overflow-hidden px-5 pb-28 pt-12 md:px-8 md:pb-32 md:pt-16"
      style={{ background: T.heroGradient }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: T.heroGlow }}
      />

      <div className={`${CONTAINER} relative`}>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </Link>

            <div className="mt-8">
              <SectionLabel>Case Study</SectionLabel>
            </div>

            <h1 className="mt-4 text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-white">
              {data.headerTitle}
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-400 md:text-[1.05rem]">
              {data.excerpt}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              <MetaCell label="Client" value={data.client} />
              <MetaCell label="Industry" value={industry} />
              <MetaCell label="Duration" value={duration} />
              <MetaCell label="Services" value={services} />
            </div>

            {data.liveUrl ? (
              <a
                href={data.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                style={{ background: T.accent }}
              >
                View Live Project
                <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <Link
                href="/contact"
                className="mt-9 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                style={{ background: T.accent }}
              >
                View Live Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <DashboardMockupDark className="w-full" title="Analytics Overview" />
        </div>
      </div>
    </section>
  )
}

function OverviewBarSection({ data }: { data: CaseStudyLayoutData }) {
  const overview = data.overviewBar
  if (!overview) return null

  const items = [
    { label: "Client", value: overview.client },
    { label: "Industry", value: overview.industry },
    { label: "Team", value: overview.team },
    { label: "Duration", value: overview.duration },
    { label: "My Role", value: overview.myRole },
    { label: "Deliverables", value: overview.deliverables },
  ]

  return (
    <section className="relative z-10 -mt-16 px-5 md:-mt-20 md:px-8">
      <div className={CONTAINER}>
        <div
          className="rounded-xl border bg-white px-4 py-8 md:px-8 md:py-10"
          style={{ borderColor: T.border, boxShadow: T.cardShadow }}
        >
          <div className="grid grid-cols-2 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
            {items.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col gap-1.5 px-3 ${
                  i < items.length - 1 ? "lg:border-r lg:border-slate-200" : ""
                }`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  {item.label}
                </p>
                <p className="text-sm font-bold leading-snug md:text-base" style={{ color: T.heading }}>
                  {item.value || "—"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const CHALLENGE_ICONS = [Database, Clock, Eye] as const

function ChallengeSection({ data }: { data: CaseStudyLayoutData }) {
  return (
    <section id="challenge" className="scroll-mt-32 bg-white px-5 py-20 md:px-8 md:py-24">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <SectionLabel>The Challenge</SectionLabel>
            <SectionTitle>{data.challengeTitle || data.challengeHeading}</SectionTitle>
            <p className="mt-5 text-base leading-relaxed" style={{ color: T.body }}>
              {data.challengeSubheading}
            </p>
          </div>

          <div className="space-y-6">
            {data.challengeCards.slice(0, 3).map((card, i) => {
              const Icon = CHALLENGE_ICONS[i] || Database
              return (
                <article key={card.title} className="flex gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: T.accentIconBg }}
                  >
                    <Icon className="h-5 w-5" style={{ color: T.accent }} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: T.heading }}>
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: T.body }}>
                      {card.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function ApproachSection({ data }: { data: CaseStudyLayoutData }) {
  const steps = data.approachSteps || []
  if (steps.length === 0) return null

  return (
    <section id="approach" className="scroll-mt-32 bg-white px-5 py-20 md:px-8 md:py-24">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <SectionLabel>Our Approach</SectionLabel>
            <SectionTitle>{data.approachHeading || "A Collaborative & Agile Approach"}</SectionTitle>
            <p className="mt-5 text-base leading-relaxed" style={{ color: T.body }}>
              {data.approachSummary ||
                "We partnered closely with stakeholders through iterative sprints — aligning discovery, design, and delivery with measurable milestones at every phase."}
            </p>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="relative min-w-[480px] pt-2">
              <div className="absolute left-[10%] right-[10%] top-[18px] h-px bg-slate-200" aria-hidden />
              <ol className="relative flex justify-between gap-2">
                {steps.slice(0, 5).map((step, i) => (
                  <li key={step.title} className="flex w-[18%] flex-col items-center text-center">
                    <span
                      className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ background: T.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-xs font-bold leading-tight sm:text-sm" style={{ color: T.heading }}>
                      {step.title}
                    </h3>
                    <p className="mt-1.5 hidden text-[11px] leading-relaxed sm:block" style={{ color: T.body }}>
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SolutionSection({ data }: { data: CaseStudyLayoutData }) {
  const features = data.solutionFeatures || []

  return (
    <section id="solution" className="scroll-mt-32 bg-white px-5 py-20 md:px-8 md:py-24">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionLabel>The Solution</SectionLabel>
            <SectionTitle>{data.solutionTitle || data.solutionHeading}</SectionTitle>
            <p className="mt-5 text-base leading-relaxed" style={{ color: T.body }}>
              {data.solutionSummary ||
                "We delivered a unified analytics platform that consolidates operational data, automates reporting, and surfaces real-time KPIs for teams and leadership."}
            </p>
            {features.length > 0 ? (
              <ul className="mt-8 space-y-3.5">
                {features.slice(0, 5).map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm" style={{ color: T.body }}>
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: T.accent }}
                    >
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="pb-8 pr-4 sm:pr-8">
            <DashboardMockupLight />
          </div>
        </div>
      </div>
    </section>
  )
}

function ImpactIcon({ icon }: { icon?: Highlight["icon"] }) {
  const props = { className: "h-5 w-5", style: { color: T.accent } as CSSProperties, strokeWidth: 2 }
  switch (icon) {
    case "trending-down":
      return <TrendingDown {...props} />
    case "clock":
      return <Clock {...props} />
    case "users":
      return <Users {...props} />
    case "shield":
      return <Shield {...props} />
    case "zap":
      return <Zap {...props} />
    default:
      return <TrendingUp {...props} />
  }
}

function ResultsSection({ data }: { data: CaseStudyLayoutData }) {
  const metrics = data.impactMetrics.slice(0, 5)

  return (
    <section id="results" className="scroll-mt-32 bg-white px-5 py-20 md:px-8 md:py-24">
      <div className={CONTAINER}>
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>The Results</SectionLabel>
          <SectionTitle className="mt-3">
            {data.resultsHeading || data.impactHeading}
          </SectionTitle>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-1 flex-col items-center rounded-xl border px-4 py-6 text-center md:py-8"
              style={{ background: T.accentMuted, borderColor: `${T.accent}22` }}
            >
              <ImpactIcon icon={metric.icon} />
              <div
                className="mt-4 text-[clamp(1.5rem,2.5vw,1.85rem)] font-bold leading-none tracking-tight"
                style={{ color: T.heading }}
              >
                {metric.value}
              </div>
              <p className="mt-3 text-xs leading-snug sm:text-sm" style={{ color: T.body }}>
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialSection({ data }: { data: CaseStudyLayoutData }) {
  const t = data.testimonial
  if (!t?.quote) return null

  const name = t.name || "James Carter"
  const roleLine = [t.role, t.company].filter(Boolean).join(", ")

  return (
    <section className="px-5 py-12 md:px-8 md:py-16">
      <div className={CONTAINER}>
        <div
          className="flex flex-col gap-8 rounded-2xl px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-12 md:px-12 md:py-14"
          style={{ background: T.accent }}
        >
          <div className="max-w-2xl">
            <span className="text-5xl font-serif leading-none text-white/40 md:text-6xl" aria-hidden>
              &ldquo;
            </span>
            <blockquote className="-mt-4 text-lg font-medium leading-relaxed text-white md:text-xl">
              {t.quote}
            </blockquote>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            {t.avatarUrl ? (
              <Image
                src={t.avatarUrl}
                alt={name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-white/30"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-lg font-bold text-white">
                {name.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-bold text-white">{name}</p>
              {roleLine ? <p className="mt-0.5 text-sm text-white/80">{roleLine}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TechStackSection({ data }: { data: CaseStudyLayoutData }) {
  return (
    <section id="tech-stack" className="scroll-mt-32 border-t bg-white px-5 py-14 md:px-8 md:py-16" style={{ borderColor: T.border }}>
      <div className={CONTAINER}>
        <SectionLabel>Tech Stack</SectionLabel>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6">
          {data.technologies.slice(0, 9).map((tech) => (
            <div key={tech} className="flex items-center gap-3">
              <TechLogo name={tech} className="h-9 w-9" variant="light" />
              <span className="text-sm font-semibold" style={{ color: T.heading }}>
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function NextCaseStudySection({ related }: { related: RelatedStudy[] }) {
  const next = related[0]
  if (!next) return null

  const slug = next.slug?.current
  const title = next.title || "Next project"
  const category = next.category || next.industry || "Case Study"

  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-24" style={{ background: T.heroGradient }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: T.heroGlow }}
      />

      <div className={`${CONTAINER} relative`}>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionLabel>
              <span className="text-indigo-300">Next Case Study</span>
            </SectionLabel>
            <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight text-white">
              {title}
            </h2>
            <p className="mt-3 text-sm text-slate-400">{category}</p>
            {slug ? (
              <Link
                href={`/case-studies/${slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                View Case Study
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>

          <div className="lg:translate-x-4 lg:rotate-1">
            <DashboardMockupDark compact title="Platform Overview" />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Nexora DataPulse product-story layout — indigo SaaS case study (reference-aligned).
 * No manufacturing hero, FAQ, or Softree orange accents.
 */
export function NexoraProductStoryPage({ data }: { data: CaseStudyLayoutData }) {
  return (
    <article className="bg-white font-sans antialiased" style={nexoraCssVars}>
      <HeroSection data={data} />
      <OverviewBarSection data={data} />
      <ChallengeSection data={data} />
      <ApproachSection data={data} />
      <SolutionSection data={data} />
      <ResultsSection data={data} />
      <TestimonialSection data={data} />
      <TechStackSection data={data} />
      <NextCaseStudySection related={data.related} />
    </article>
  )
}
