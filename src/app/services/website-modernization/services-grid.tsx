import Link from "next/link"
import {
  Gauge,
  LayoutTemplate,
  Layers,
  LineChart,
  Palette,
  Server,
} from "lucide-react"

const SERVICES = [
  {
    icon: Palette,
    title: "Website redesign & rebrand",
    body: "Conversion-first layouts, refreshed visual identity, and copy that matches buyer intent.",
    href: "/services/offshore-web-app-development",
  },
  {
    icon: Server,
    title: "WordPress / Webflow → Next.js",
    body: "Migrate off brittle page builders to a fast, maintainable React stack with headless CMS.",
    href: "/services/offshore-web-app-development",
  },
  {
    icon: Layers,
    title: "Headless CMS (Sanity)",
    body: "Editor-friendly content models your marketing team can update without developer tickets.",
    href: "/services/offshore-web-app-development",
  },
  {
    icon: LineChart,
    title: "CRO & funnel optimisation",
    body: "CTA placement, form friction, and trust-signal architecture backed by analytics.",
    href: "/webanalyser",
  },
  {
    icon: Gauge,
    title: "Core Web Vitals & performance",
    body: "Target LCP under 2.5s, fix CLS, and ship image/font strategies that protect rankings.",
    href: "/services/offshore-web-app-development",
  },
  {
    icon: LayoutTemplate,
    title: "Wireframe-to-production",
    body: "We take the AI blueprint (or your brief) through design, build, QA, and launch.",
    href: "/contact",
  },
] as const

export default function ModernizationServicesGrid() {
  return (
    <section
      aria-labelledby="wm-services-heading"
      className="bg-[#050508] py-20 text-white md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF5812]">
            What we modernise
          </p>
          <h2
            id="wm-services-heading"
            className="mt-3 text-3xl font-bold tracking-tight md:text-4xl"
          >
            End-to-end website modernisation
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            The AI blueprint shows what to fix. Softree engineers ship the modern
            site — strategy through launch. Also see{" "}
            <Link href="/services/legacy-application-modernization" className="text-[#FF5812] underline hover:no-underline">
              legacy app modernisation
            </Link>{" "}
            for enterprise systems.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-zinc-900/40 p-6 transition hover:border-[#FF5812]/40 hover:bg-zinc-900/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5812]"
              >
                <item.icon className="h-5 w-5 text-[#FF5812]" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold group-hover:text-[#FF5812]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                  {item.body}
                </p>
                <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#FF5812]">
                  Learn more →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
