"use client"

import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  Check,
  Clock,
  Database,
  Eye,
  Puzzle,
  Shield,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import type { CaseStudyLayoutData, Highlight, RelatedStudy } from "../../types"
import { TechLogo } from "../../shared/PowerPlatformLogos"
import { DashboardMockupAnalytics } from "./DashboardMockupAnalytics"
import { DashboardMockupDarkPreview } from "./DashboardMockupDarkPreview"
import { DashboardMockupHero } from "./DashboardMockupHero"
import { SYNQLAB_TOKENS as T, synqlabCssVars } from "./tokens"

const CONTAINER = "mx-auto w-full max-w-7xl"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: T.accent }}>
      {children}
    </p>
  )
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.15] tracking-tight ${className}`}
      style={{ color: T.heading }}
    >
      {children}
    </h2>
  )
}

function HeroSection({ data }: { data: CaseStudyLayoutData }) {
  const duration = data.snapshot.duration || "6 Months"
  const industry = data.industry || data.snapshot.industry || "SaaS / Analytics"
  const team = data.snapshot.teamSize || "4 Designers, 3 Developers"

  return (
    <section className="relative overflow-visible bg-white px-5 pb-8 pt-12 md:px-8 md:pb-12 md:pt-16">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80"
              style={{ color: T.body }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Work
            </Link>

            <div className="mt-8">
              <SectionLabel>Case Study</SectionLabel>
            </div>

            <h1
              className="mt-4 text-[clamp(2rem,4.5vw,2.75rem)] font-bold leading-[1.12] tracking-tight"
              style={{ color: T.heading }}
            >
              {data.headerTitle}
            </h1>

            <p className="mt-5 text-base leading-relaxed md:text-[1.05rem]" style={{ color: T.body }}>
              {data.excerpt}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {[
                { icon: Building2, label: "Client", value: data.client },
                { icon: Briefcase, label: "Industry", value: industry },
                { icon: Clock, label: "Duration", value: duration },
                { icon: Users, label: "Team", value: team },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <div className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" style={{ color: T.label }} strokeWidth={2} />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: T.label }}>
                      {label}
                    </p>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold" style={{ color: T.heading }}>
                    {value || "—"}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              {data.liveUrl ? (
                <a
                  href={data.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                  style={{ background: T.accent }}
                >
                  View Live Project
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                  style={{ background: T.accent }}
                >
                  View Live Project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
              <Link
                href="#solution"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ color: T.accent }}
              >
                Explore Platform
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative z-20 lg:-mb-32">
            <DashboardMockupHero brandName={data.client?.split(" ")[0] || "DataCore"} />
          </div>
        </div>
      </div>
    </section>
  )
}

const CHALLENGE_ICONS = [Database, Clock, Eye, Puzzle] as const

function ChallengeSection({ data }: { data: CaseStudyLayoutData }) {
  return (
    <section id="challenge" className="scroll-mt-32 bg-white px-5 pb-20 pt-24 md:px-8 md:pb-24 md:pt-32">
      <div className={CONTAINER}>
        <div className="max-w-2xl">
          <SectionLabel>The Challenge</SectionLabel>
          <SectionTitle>{data.challengeTitle || data.challengeHeading}</SectionTitle>
          <p className="mt-5 text-base leading-relaxed" style={{ color: T.body }}>
            {data.challengeSubheading}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {data.challengeCards.slice(0, 4).map((card, i) => {
            const Icon = CHALLENGE_ICONS[i] || Database
            return (
              <article
                key={card.title}
                className="flex flex-col rounded-xl border p-5 md:p-6"
                style={{ borderColor: T.border, background: T.white }}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-lg"
                  style={{ background: T.accentIconBg }}
                >
                  <Icon className="h-5 w-5" style={{ color: T.accent }} strokeWidth={2} />
                </div>
                <h3 className="mt-4 text-base font-bold" style={{ color: T.heading }}>
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: T.body }}>
                  {card.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProcessSection({ data }: { data: CaseStudyLayoutData }) {
  const steps = data.approachSteps || []
  if (steps.length === 0) return null

  return (
    <section id="process" className="scroll-mt-32 bg-white px-5 py-20 md:px-8 md:py-24">
      <div className={CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Our Process</SectionLabel>
          <SectionTitle>{data.approachHeading || "A Collaborative & Agile Approach"}</SectionTitle>
          {data.approachSummary ? (
            <p className="mt-5 text-base leading-relaxed" style={{ color: T.body }}>
              {data.approachSummary}
            </p>
          ) : null}
        </div>

        <div className="mt-14 overflow-x-auto pb-2">
          <div className="relative mx-auto min-w-[520px] max-w-5xl pt-2">
            <div className="absolute left-[8%] right-[8%] top-[18px] h-px bg-slate-200" aria-hidden />
            <ol className="relative flex justify-between gap-1">
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

        <div className="mt-8 space-y-6 sm:hidden">
          {steps.slice(0, 5).map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ background: T.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-sm font-bold" style={{ color: T.heading }}>
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: T.body }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
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

          <DashboardMockupAnalytics />
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

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-center rounded-xl px-4 py-6 text-center md:py-8"
              style={{ background: T.accentMuted }}
            >
              <ImpactIcon icon={metric.icon} />
              <div
                className="mt-4 text-[clamp(1.35rem,2.5vw,1.85rem)] font-bold leading-none tracking-tight"
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

function TechStackSection({ data }: { data: CaseStudyLayoutData }) {
  return (
    <section id="tech-stack" className="scroll-mt-32 bg-white px-5 py-14 md:px-8 md:py-16">
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

function TestimonialSection({ data }: { data: CaseStudyLayoutData }) {
  const t = data.testimonial
  if (!t?.quote) return null

  const name = t.name || "Michael Anderson"
  const roleLine = [t.role, t.company].filter(Boolean).join(", ")

  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-24" style={{ background: T.navy }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: T.darkGlow }}
      />

      <div className={`${CONTAINER} relative`}>
        <div className="mx-auto max-w-4xl">
          <span className="text-6xl font-serif leading-none md:text-7xl" style={{ color: T.accent }} aria-hidden>
            &ldquo;
          </span>
          <blockquote className="-mt-6 text-xl font-medium leading-relaxed text-white md:text-2xl lg:text-[1.65rem]">
            {t.quote}
          </blockquote>

          <div className="mt-10 flex items-center gap-4">
            {t.avatarUrl ? (
              <Image
                src={t.avatarUrl}
                alt={name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-white/20"
              />
            ) : (
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{ background: `${T.accent}66` }}
              >
                {name.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-bold text-white">{name}</p>
              {roleLine ? <p className="mt-0.5 text-sm text-slate-400">{roleLine}</p> : null}
            </div>
          </div>
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

  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-24" style={{ background: T.navy }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: T.darkGlow }}
      />

      <div className={`${CONTAINER} relative`}>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionLabel>
              <span style={{ color: "#A5B4FC" }}>Next Case Study</span>
            </SectionLabel>
            <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight text-white">
              {title}
            </h2>
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

          <div className="lg:translate-x-4">
            <DashboardMockupDarkPreview />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * SynqLab / DataCore product-story layout — white hero, light dashboard mockups,
 * 4-card challenge row, 5-step process timeline, dark testimonial footer.
 */
export function SynqLabProductStoryPage({ data }: { data: CaseStudyLayoutData }) {
  return (
    <article className="bg-white font-sans antialiased" style={synqlabCssVars}>
      <HeroSection data={data} />
      <ChallengeSection data={data} />
      <ProcessSection data={data} />
      <SolutionSection data={data} />
      <ResultsSection data={data} />
      <TechStackSection data={data} />
      <TestimonialSection data={data} />
      <NextCaseStudySection related={data.related} />
    </article>
  )
}
