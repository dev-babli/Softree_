"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { trackModernizationEvent } from "./analytics"

const CASE_LINKS = [
  {
    href: "/case-studies/ai-website-performance-monitoring",
    title: "AI website performance monitoring",
    metric: "Core Web Vitals uplift",
  },
  {
    href: "/case-studies/web",
    title: "Web platform case studies",
    metric: "Enterprise portals & marketing sites",
  },
  {
    href: "/services/offshore-web-app-development",
    title: "Custom web app development",
    metric: "Next.js & React delivery",
  },
] as const

export default function ModernizationCaseStudies() {
  return (
    <section
      aria-labelledby="wm-cases-heading"
      className="bg-[#F3F0EE] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
              Proof
            </p>
            <h2
              id="wm-cases-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl"
            >
              Websites we have modernised
            </h2>
            <p className="mt-4 text-base text-zinc-600">
              Named outcomes and production delivery — not just audit PDFs.
            </p>
          </div>
          <Link
            href="/case-studies/web"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF5812] hover:underline"
            onClick={() => trackModernizationEvent("book_call_click", { target: "case_studies_hub" })}
          >
            View all web work
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {CASE_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-[#FF5812]/40 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {item.metric}
                </p>
                <h3 className="mt-3 flex-1 text-lg font-semibold text-zinc-900 group-hover:text-[#FF5812]">
                  {item.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#FF5812]">
                  Read more
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <blockquote className="mt-12 border-l-4 border-[#FF5812] pl-6">
          <p className="text-base italic leading-relaxed text-zinc-700">
            &ldquo;SOFTREE has truly seen where we can take the website and make it look
            significantly different from all of our competitors. That&apos;s been our main
            reason for engaging them.&rdquo;
          </p>
          <footer className="mt-3 text-sm text-zinc-500">
            — Client testimonial, website redesign engagement
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
