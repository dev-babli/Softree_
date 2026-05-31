import Link from "next/link"
import Image from "next/image"
import NavigationClient from "@/components/sections/navigation-client"
import Footer from "@/components/sections/footer"
import { CASE_STUDY_LAYOUTS } from "@/lib/case-study-layouts"
import { client } from "@/sanity/client"
import { allCaseStudySlugsQuery } from "@/sanity/queries"

export const metadata = {
  title: "Case Study Layout Showcase | Softree",
  description: "Preview all 16 premium case study page designs side by side.",
}

const LAYOUT_MOODS: Record<
  string,
  {
    mood: string
    product: string
    previewClass: string
    accent: string
    labelClass: string
  }
> = {
  "manufacturing-power-platform": {
    product: "Enterprise Power Platform / Manufacturing",
    mood: "Dark industrial editorial, stats bar, architecture flow",
    previewClass: "from-[#0d0a23] via-[#151030] to-[#0d0a23]",
    accent: "#FF7A2F",
    labelClass: "text-white/90",
  },
  "sidebar-metadata": {
    product: "Compliance / Regulated Projects",
    mood: "Notion docs — narrow column, sticky spec sidebar",
    previewClass: "from-[#FBFBFA] to-[#F7F6F3]",
    accent: "#6366F1",
    labelClass: "text-[#37352F]/80",
  },
  "split-hero-mockup": {
    product: "Mobile / Web App Products",
    mood: "Product launch — 50/50 hero, device mockup, screenshot grid",
    previewClass: "from-indigo-50 via-violet-50/80 to-white",
    accent: "#6366F1",
    labelClass: "text-indigo-950/70",
  },
  "zigzag-alternating": {
    product: "Transformation / Modernization",
    mood: "Magazine editorial — full-bleed chapters, serif, pull quotes",
    previewClass: "from-[#F5F0E8] to-[#E8DFD0]",
    accent: "#9A7B4F",
    labelClass: "text-[#1A1612]/70",
  },
  "vertical-timeline": {
    product: "Multi-phase Agile Delivery",
    mood: "Timeline spine — dated milestones, process nodes",
    previewClass: "from-sky-50 to-cyan-50/60",
    accent: "#0284C7",
    labelClass: "text-sky-950/70",
  },
  "tabbed-deliverables": {
    product: "Multi-capability Platforms",
    mood: "SaaS product page — tabbed features, icon grids",
    previewClass: "from-zinc-100 to-zinc-50",
    accent: "#52525B",
    labelClass: "text-zinc-700/80",
  },
  "bento-results": {
    product: "Data Analytics / BI",
    mood: "Dashboard dark — bento metrics, chart placeholders",
    previewClass: "from-[#0B0F14] via-[#111827] to-[#0B0F14]",
    accent: "#22D3EE",
    labelClass: "text-cyan-200/80",
  },
  "video-hero": {
    product: "Brand / Creative Experience",
    mood: "Cinematic — full-viewport hero, scroll chapters",
    previewClass: "from-black via-zinc-900 to-black",
    accent: "#F472B6",
    labelClass: "text-white/70",
  },
  "before-after-table": {
    product: "Process Automation / ROI",
    mood: "Comparison table — before/after, numbers-first",
    previewClass: "from-white to-slate-50",
    accent: "#0F172A",
    labelClass: "text-slate-600",
  },
  "stats-dashboard": {
    product: "Enterprise Scale / Rollout",
    mood: "Executive briefing — KPI strip, corporate navy",
    previewClass: "from-[#1B2838] to-[#243447]",
    accent: "#38BDF8",
    labelClass: "text-slate-300/80",
  },
  "parallax-screenshots": {
    product: "UX/UI Design Products",
    mood: "Portfolio — layered parallax screenshots, violet accents",
    previewClass: "from-[#F3F0FF] to-violet-100/50",
    accent: "#7C3AED",
    labelClass: "text-violet-950/70",
  },
  "nexora-product-story": {
    product: "SaaS / Analytics / Product Launch",
    mood: "Nexora DataPulse — indigo hero, CSS dashboard mockups",
    previewClass: "from-[#0F172A] via-indigo-950 to-[#0F172A]",
    accent: "#6366F1",
    labelClass: "text-indigo-200/80",
  },
  "synqlab-product-story": {
    product: "SaaS / Analytics / Data Platform",
    mood: "SynqLab DataCore — white hero, light dashboard mockups",
    previewClass: "from-white via-indigo-50/40 to-white",
    accent: "#6366F1",
    labelClass: "text-indigo-950/60",
  },
  "payflow-fintech-story": {
    product: "Fintech / Payments / Global Infrastructure",
    mood: "PayFlow — Command Center mockup, architecture diagram",
    previewClass: "from-white via-blue-50/50 to-slate-50",
    accent: "#2563EB",
    labelClass: "text-slate-600",
  },
  "ai-horizontal-story": {
    product: "Enterprise AI / Neutrino Automation",
    mood: "Pinned sidebar, GSAP horizontal scrub, AI engine panels",
    previewClass: "from-[#F8F9FC] via-indigo-50/30 to-[#F8F9FC]",
    accent: "#6366F1",
    labelClass: "text-indigo-950/60",
  },
  "neutrino-dashboard-story": {
    product: "Enterprise AI / Neutrino Agent System",
    mood: "IDE chrome, split editor + live agent network, 5-step nav",
    previewClass: "from-[#F8F9FC] via-violet-50/25 to-[#F8F9FC]",
    accent: "#6366F1",
    labelClass: "text-slate-600/80",
  },
}

export default async function LayoutShowcasePage() {
  const slugs = await client.fetch<string[]>(allCaseStudySlugsQuery)
  const previewSlug = slugs?.[0] || "fix-customer-relations-30-days"

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <NavigationClient />
      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Layout showcase</p>
          <h1 className="mt-4 text-balance text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.03em] text-[#0d0a23]">
            16 distinct case study designs
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            Each layout is a complete page design — not a reorder of shared sections. Open any card to preview with{" "}
            <code className="rounded-md bg-white px-1.5 py-0.5 text-[13px] font-medium text-slate-800 ring-1 ring-slate-200">
              ?layout=
            </code>{" "}
            on slug <strong className="font-semibold text-slate-800">{previewSlug}</strong>.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDY_LAYOUTS.map((layout, index) => {
            const meta = LAYOUT_MOODS[layout.value]
            const href = `/case-studies/${previewSlug}?layout=${layout.value}`
            return (
              <Link
                key={layout.value}
                href={href}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200/80 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_20px_48px_-12px_rgba(15,23,42,0.12)] active:scale-[0.99] motion-reduce:transform-none"
              >
                <div
                  className={`relative flex h-40 items-end overflow-hidden bg-gradient-to-br p-5 ${meta?.previewClass || "from-slate-100 to-slate-50"}`}
                >
                  <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay">
                    <Image
                      src={`/Gallery/Prestige Bangalore-${(index % 7) + 1}.webp`}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="400px"
                    />
                  </div>
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background: `radial-gradient(ellipse 80% 60% at 100% 0%, ${meta?.accent || "#6366F1"}33 0%, transparent 70%)`,
                    }}
                    aria-hidden
                  />
                  <span
                    className={`relative text-[10px] font-bold uppercase tracking-[0.18em] ${meta?.labelClass || "text-slate-600"}`}
                  >
                    {layout.value.replace(/-/g, " ")}
                  </span>
                  <span
                    className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ background: meta?.accent || "#6366F1" }}
                  >
                    Preview
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2
                    className="text-[17px] font-bold leading-snug text-[#0d0a23] transition-colors duration-200 group-hover:text-[var(--card-accent)]"
                    style={{ ["--card-accent" as string]: meta?.accent || "#6366F1" }}
                  >
                    {layout.title}
                  </h2>
                  <p className="mt-1.5 text-xs font-medium" style={{ color: meta?.accent || "#6366F1" }}>
                    {meta?.product}
                  </p>
                  <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-slate-500">{meta?.mood}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                    Open layout
                    <span
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <section className="mt-16 rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold tracking-tight text-[#0d0a23]">Quick preview (5 min)</h2>
          <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-slate-600">
            <li>
              Open{" "}
              <Link href="/case-studies/layout-showcase" className="font-medium text-indigo-600 underline-offset-2 hover:underline">
                /case-studies/layout-showcase
              </Link>
            </li>
            <li>Click any card — opens the case study with a layout override (preview mode)</li>
            <li>
              Direct URL pattern:{" "}
              <code className="mt-1 block overflow-x-auto rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700 ring-1 ring-slate-200">
                /case-studies/{previewSlug}?layout=neutrino-dashboard-story
              </code>
            </li>
            <li>In Sanity Studio, use the Detail Layout picker — previews via iframe</li>
            <li>Open two layouts in split tabs — they should read as different products, not the same template</li>
          </ol>
        </section>
      </main>
      <Footer />
    </div>
  )
}
