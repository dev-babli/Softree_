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
  Eye,
  Globe,
  Layers,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import type { CaseStudyLayoutData } from "../../types"
import { TechLogo } from "../../shared/PowerPlatformLogos"
import { ArchitectureDiagram } from "./ArchitectureDiagram"
import { CommandCenterMockup } from "./CommandCenterMockup"
import {
  PAYFLOW_CHALLENGE_ICON_COLORS,
  PAYFLOW_IMPACT_ICON_COLORS,
  PAYFLOW_TOKENS as T,
  payflowCssVars,
} from "./tokens"

const CONTAINER = "mx-auto w-full max-w-7xl"

const CHALLENGE_ICONS = [Layers, Shield, Clock, Eye] as const
const IMPACT_ICONS = [TrendingUp, Shield, Zap, Clock, Globe] as const

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
  const duration = data.snapshot.duration || "8 Months"
  const industry = data.industry || data.snapshot.industry || "Fintech"
  const team = data.snapshot.teamSize || "5 Engineers"
  const services = data.servicesProvided || "Architecture, Backend Dev, DevOps"

  return (
    <section className="relative overflow-hidden bg-white px-5 pb-16 pt-12 md:px-8 md:pb-20 md:pt-16">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
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
                { icon: Building2, label: "Industry", value: industry },
                { icon: Clock, label: "Duration", value: duration },
                { icon: Users, label: "Team", value: team },
                { icon: Briefcase, label: "Services", value: services },
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
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                  style={{ background: T.accent }}
                >
                  View Live Platform
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                  style={{ background: T.accent }}
                >
                  View Live Platform
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
              <Link
                href="#architecture"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ color: T.accent }}
              >
                Explore Architecture
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <CommandCenterMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

function ChallengeSection({ data }: { data: CaseStudyLayoutData }) {
  return (
    <section id="challenge" className="scroll-mt-24 bg-white px-5 py-20 md:px-8 md:py-24">
      <div className={CONTAINER}>
        <div className="max-w-2xl">
          <SectionLabel>The Challenge</SectionLabel>
          <SectionTitle>{data.challengeTitle || "Legacy Systems Were Holding Them Back"}</SectionTitle>
          <p className="mt-5 text-base leading-relaxed" style={{ color: T.body }}>
            {data.challengeSubheading}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {data.challengeCards.slice(0, 4).map((card, i) => {
            const Icon = CHALLENGE_ICONS[i] || Layers
            const colors = PAYFLOW_CHALLENGE_ICON_COLORS[i] || PAYFLOW_CHALLENGE_ICON_COLORS[0]
            return (
              <article
                key={card.title}
                className="flex flex-col rounded-xl border p-5 md:p-6"
                style={{ borderColor: T.border, background: T.cardBg }}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: colors.bg }}
                >
                  <Icon className="h-5 w-5" style={{ color: colors.icon }} strokeWidth={2} />
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

function SolutionSection({ data }: { data: CaseStudyLayoutData }) {
  const features = data.solutionFeatures || []

  return (
    <section id="architecture" className="scroll-mt-24 bg-white px-5 py-20 md:px-8 md:py-24">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionLabel>Our Solution</SectionLabel>
            <SectionTitle>{data.solutionTitle || "A Modern, Secure & Scalable Infrastructure"}</SectionTitle>
            <p className="mt-5 text-base leading-relaxed" style={{ color: T.body }}>
              {data.solutionSummary ||
                "We designed and built a cloud-native payment platform with microservices architecture, real-time fraud detection, and global scalability — enabling the client to process millions of transactions daily."}
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

          <ArchitectureDiagram />
        </div>
      </div>
    </section>
  )
}

function ImpactIcon({ index }: { index: number }) {
  const Icon = IMPACT_ICONS[index] || TrendingUp
  const colors = PAYFLOW_IMPACT_ICON_COLORS[index] || PAYFLOW_IMPACT_ICON_COLORS[0]
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-xl"
      style={{ background: colors.bg }}
    >
      <Icon className="h-5 w-5" style={{ color: colors.icon } as CSSProperties} strokeWidth={2} />
    </div>
  )
}

function ImpactSection({ data }: { data: CaseStudyLayoutData }) {
  const metrics = data.impactMetrics.slice(0, 5)

  return (
    <section id="impact" className="scroll-mt-24 bg-white px-5 py-20 md:px-8 md:py-24">
      <div className={CONTAINER}>
        <div className="max-w-2xl">
          <SectionLabel>The Impact</SectionLabel>
          <SectionTitle>{data.resultsHeading || data.impactHeading || "Delivering Results That Matter"}</SectionTitle>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className="relative flex flex-col rounded-xl border p-5 md:p-6"
              style={{ borderColor: T.border, background: T.white }}
            >
              <div className="absolute right-4 top-4">
                <ImpactIcon index={i} />
              </div>
              <div
                className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-none tracking-tight"
                style={{ color: T.heading }}
              >
                {metric.value}
              </div>
              <p className="mt-3 pr-12 text-sm leading-snug" style={{ color: T.body }}>
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

  const name = t.name || "Daniel Morris"
  const roleLine = [t.role, t.company].filter(Boolean).join(", ")

  return (
    <section className="px-5 py-20 md:px-8 md:py-24" style={{ background: T.purpleMuted }}>
      <div className={CONTAINER}>
        <div className="mx-auto max-w-4xl">
          <span className="text-6xl font-serif leading-none md:text-7xl" style={{ color: T.accent }} aria-hidden>
            &ldquo;
          </span>
          <blockquote
            className="-mt-6 text-xl font-medium leading-relaxed md:text-2xl lg:text-[1.65rem]"
            style={{ color: T.heading }}
          >
            {t.quote}
          </blockquote>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {t.avatarUrl ? (
                <Image
                  src={t.avatarUrl}
                  alt={name}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-white/60"
                />
              ) : (
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white"
                  style={{ background: T.accent }}
                >
                  {name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-bold" style={{ color: T.heading }}>
                  {name}
                </p>
                {roleLine ? (
                  <p className="mt-0.5 text-sm" style={{ color: T.body }}>
                    {roleLine}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-0.5" aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" style={{ color: T.purple }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TechStackSection({ data }: { data: CaseStudyLayoutData }) {
  return (
    <section id="tech-stack" className="scroll-mt-24 bg-white px-5 py-14 md:px-8 md:py-16">
      <div className={CONTAINER}>
        <SectionLabel>Tech Stack</SectionLabel>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6">
          {data.technologies.slice(0, 10).map((tech) => (
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

/**
 * PayFlow fintech product-story layout — white hero with Command Center mockup,
 * 4-card challenge row with colored icons, architecture diagram, 5 impact stats,
 * lavender testimonial, tech stack. No process timeline or next-case-study footer.
 */
export function PayFlowFintechStoryPage({ data }: { data: CaseStudyLayoutData }) {
  return (
    <article className="bg-white font-sans antialiased" style={payflowCssVars}>
      <HeroSection data={data} />
      <ChallengeSection data={data} />
      <SolutionSection data={data} />
      <ImpactSection data={data} />
      <TestimonialSection data={data} />
      <TechStackSection data={data} />
    </article>
  )
}
