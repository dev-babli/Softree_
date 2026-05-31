export const CASE_STUDY_LAYOUTS = [
  {
    value: "manufacturing-power-platform",
    title: "Manufacturing Power Platform (Reference)",
    description:
      "Dark industrial hero, snapshot bar, challenge cards, architecture flow, deliverables grid, screenshot carousel, impact stats, tech stack, testimonial, related stories, final CTA.",
  },
  {
    value: "sidebar-metadata",
    title: "Sidebar Sticky Metadata",
    description: "Sticky left sidebar with project metadata; main column scrolls through narrative sections.",
  },
  {
    value: "split-hero-mockup",
    title: "Split 50/50 Hero + Mockup",
    description: "Hero splits headline left and product mockup right; content flows below.",
  },
  {
    value: "zigzag-alternating",
    title: "Zig-Zag Alternating",
    description: "Alternating image/text rows for challenge, solution, and deliverables.",
  },
  {
    value: "vertical-timeline",
    title: "Vertical Timeline",
    description: "Solution and process shown as a vertical timeline with connected nodes.",
  },
  {
    value: "tabbed-deliverables",
    title: "Tabbed Deliverables",
    description: "Deliverables organized in interactive tabs by workstream.",
  },
  {
    value: "bento-results",
    title: "Bento Grid Results",
    description: "Impact metrics and outcomes in an asymmetric bento grid layout.",
  },
  {
    value: "video-hero",
    title: "Full-Width Video Hero",
    description: "Cinematic video hero with overlay stats and scroll-triggered sections.",
  },
  {
    value: "before-after-table",
    title: "Before / After Comparison",
    description: "Side-by-side before/after comparison table highlighting transformation.",
  },
  {
    value: "stats-dashboard",
    title: "Interactive Stats Dashboard",
    description: "Dashboard-style KPI cards with animated counters and metric groupings.",
  },
  {
    value: "parallax-screenshots",
    title: "Layered Parallax Screenshots",
    description: "Stacked parallax screenshot layers with depth and scroll motion.",
  },
  {
    value: "nexora-product-story",
    title: "Nexora Product Story (DataPulse)",
    description:
      "Dark hero with dashboard mockup, overview bar, challenge blocks, 5-step timeline, solution checklist, metric cards, purple testimonial, tech stack, next case study footer.",
  },
  {
    value: "synqlab-product-story",
    title: "SynqLab Product Story (DataCore)",
    description:
      "White hero with overlapping light dashboard mockup, 4-card challenge row, 5-step process timeline, analytics solution mockup, lavender metric cards, dark testimonial, tech stack, next case study footer.",
  },
  {
    value: "payflow-fintech-story",
    title: "PayFlow Fintech Story",
    description:
      "White hero with Command Center dashboard mockup, 4-card challenge row with colored icons, architecture diagram, 5 impact stat cards, lavender testimonial, tech stack.",
  },
  {
    value: "ai-horizontal-story",
    title: "AI Horizontal Story (Nexora)",
    description:
      "Pinned 320px sidebar, GSAP ScrollTrigger horizontal scrub with snap, 5 story panels (Challenge, Approach/AI Engine, Solution dashboard, Impact, Future CTA), bottom progress nodes.",
  },
  {
    value: "neutrino-dashboard-story",
    title: "Neutrino Dashboard Story",
    description:
      "Pinned sidebar with metadata, IDE-style dashboard frame with file tabs, 5-step bottom stepper (Problem, Architecture, Agent System, Infrastructure, Impact), split-pane code editor + live ops dashboard.",
  },
] as const

export type CaseStudyDetailLayout = (typeof CASE_STUDY_LAYOUTS)[number]["value"]

export const PREMIUM_LAYOUT_VALUES: CaseStudyDetailLayout[] = CASE_STUDY_LAYOUTS.map((l) => l.value)

export function isPremiumLayout(value?: string | null): value is CaseStudyDetailLayout {
  return !!value && PREMIUM_LAYOUT_VALUES.includes(value as CaseStudyDetailLayout)
}

export const CATEGORY_LABELS: Record<string, string> = {
  ai: "AI & Machine Learning",
  mobile: "Mobile Development",
  "power-platform": "Power Platform",
  sharepoint: "SharePoint",
  web: "Web Development",
  "data-analytics": "Data Analytics",
}
