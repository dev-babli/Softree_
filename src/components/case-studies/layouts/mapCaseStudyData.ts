import { CATEGORY_LABELS, type CaseStudyDetailLayout } from "@/lib/case-study-layouts"
import type {
  ApproachStep,
  BeforeAfterRow,
  CardItem,
  CaseStudyFAQ,
  CaseStudyLayoutData,
  GalleryItem,
  Highlight,
  Metric,
  OverviewBar,
  RelatedStudy,
} from "./types"

const ACCENT = "#FF7A2F"

type PortableTextLike = {
  _type?: string
  style?: string
  children?: Array<{ text?: string }>
  listItem?: string
}

export type SanityCaseStudyDoc = {
  _id: string
  _updatedAt?: string
  title: string
  slug: { current: string }
  detailLayout?: CaseStudyDetailLayout | string
  headerTitle?: string
  excerpt?: string
  category?: string
  industry?: string
  client?: string
  location?: string
  projectDuration?: string
  teamSize?: string
  projectType?: string
  region?: string
  endUsers?: string
  accentColor?: string
  videoUrl?: string
  mainImage?: { asset?: { url?: string } | null; alt?: string } | null
  mainImageUrl?: string
  technologies?: string[]
  highlights?: Highlight[]
  metrics?: Metric[]
  rawResults?: string[] | Metric[]
  challengeCards?: CardItem[]
  solutionArchitecture?: CardItem[]
  deliverables?: CardItem[]
  beforeAfter?: BeforeAfterRow[]
  challengeSummary?: string
  challengeContent?: PortableTextLike[]
  approachSummary?: string
  approachContent?: PortableTextLike[]
  approachSteps?: Array<{ title?: string; description?: string }>
  solutionSummary?: string
  solutionFeatures?: string[]
  myRole?: string
  servicesProvided?: string
  liveUrl?: string
  outcomeSummary?: string
  outcomeContent?: PortableTextLike[]
  testimonial?: {
    quote?: string
    name?: string
    role?: string
    company?: string
    location?: string
    avatar?: { asset?: { url?: string } } | null
  } | null
  gallery?: Array<{ asset?: { url?: string }; alt?: string; caption?: string }>
  galleryUrls?: Array<{ url?: string; alt?: string; caption?: string }>
  relatedCaseStudies?: RelatedStudy[]
  ctaHeadline?: string
  ctaSubtext?: string
  ctaButtonText?: string
  faqs?: CaseStudyFAQ[]
  publishedAt?: string
}

function categoryLabel(value?: string): string {
  if (!value) return ""
  return CATEGORY_LABELS[value] || value
}

function plainTextFromBlocks(blocks?: PortableTextLike[]): string {
  if (!blocks?.length) return ""
  return blocks
    .map((b) => (b.children || []).map((c) => c.text || "").join(" "))
    .join(" ")
    .trim()
}

function bulletsFromBlocks(blocks?: PortableTextLike[]): string[] {
  if (!blocks?.length) return []
  return blocks
    .filter((b) => b.listItem === "bullet" || b.style === "normal")
    .map((b) => (b.children || []).map((c) => c.text || "").join(" ").trim())
    .filter(Boolean)
}

function defaultChallengeCards(summary?: string): CardItem[] {
  const base = summary || "Legacy systems and manual workflows slowed operations across plants and regions."
  return [
    {
      title: "Manual Processes",
      description: `${base.split(".")[0]}. Teams relied on spreadsheets and email for critical approvals.`,
    },
    {
      title: "Data Silos",
      description: "Operational data lived in disconnected ERP, MES, and plant-floor systems with no single source of truth.",
    },
    {
      title: "Compliance Risk",
      description: "Audit trails were incomplete, making regulatory reporting slow and error-prone.",
    },
  ]
}

function defaultSolutionNodes(technologies: string[]): CardItem[] {
  const stack =
    technologies.length > 0
      ? technologies
      : ["Power Apps", "Dataverse", "Power Automate", "Power BI", "SharePoint"]
  return stack.slice(0, 5).map((title) => ({
    title,
    description: `Integrated ${title} layer in the enterprise architecture.`,
  }))
}

function defaultDeliverables(bullets: string[]): CardItem[] {
  const items =
    bullets.length >= 6
      ? bullets.slice(0, 6)
      : [
          "Unified plant operations dashboard",
          "Automated approval workflows",
          "Real-time KPI reporting",
          "Mobile inspection apps",
          "Compliance audit portal",
          "Executive analytics suite",
        ]
  return items.map((text, i) => ({
    title: text.split(":")[0]?.slice(0, 48) || `Deliverable ${i + 1}`,
    description: text.includes(":") ? text.split(":").slice(1).join(":").trim() : text,
  }))
}

const MANUFACTURING_HERO_HIGHLIGHTS: Highlight[] = [
  { value: "75%", label: "Reduction in manual effort", icon: "trending-down" },
  { value: "12 Weeks", label: "Project Duration", icon: "clock" },
  { value: "500+", label: "Employees Empowered", icon: "users" },
]

const MANUFACTURING_IMPACT_METRICS: Highlight[] = [
  { value: "75%", label: "Reduction in manual work", icon: "trending-down" },
  { value: "60%", label: "Faster approvals", icon: "clock" },
  { value: "500+", label: "Users adopted", icon: "users" },
  { value: "99.9%", label: "System availability", icon: "shield" },
]

const MANUFACTURING_HERO_IMAGE = "/Gallery/Prestige Bangalore-1.webp"

const MANUFACTURING_SECTION_IMAGES = {
  hero: MANUFACTURING_HERO_IMAGE,
  heroAlt: "Softree operations and digital workspace",
  challenge: "/Gallery/Prestige Bangalore-2.webp",
  solutionDashboard: "/Gallery/Prestige Bangalore-3.webp",
  impactBackground: "/Gallery/Prestige Bangalore-5.webp",
  testimonial: "/Gallery/Prestige Bangalore-1.webp",
} as const

const MANUFACTURING_DELIVERABLE_IMAGES = [
  "/Gallery/Prestige Bangalore-4.webp",
  "/Gallery/Prestige Bangalore-5.webp",
  "/Gallery/Prestige Bangalore-6.webp",
  "/Gallery/Prestige Bangalore-7.webp",
]

const MANUFACTURING_DEFAULT_FAQS: CaseStudyFAQ[] = [
  {
    question: "How long does a Power Platform manufacturing rollout typically take?",
    answer:
      "Most plant-floor and operations rollouts ship in 8–12 weeks. We start with a scoped MVP on one line or facility, validate adoption with floor teams, then expand to additional plants with reusable Dataverse schemas and Power Automate templates.",
  },
  {
    question: "Can Power Platform integrate with our existing ERP and MES?",
    answer:
      "Yes. We design a governed integration layer — Power Automate connectors, Azure API Management, and event-driven flows — so Power Apps read and write operational data without replacing ERP or MES investments.",
  },
  {
    question: "How do you measure success on manufacturing Power Platform projects?",
    answer:
      "We track manual effort reduction, approval cycle time, user adoption across plants, system availability, and audit-readiness. This case study highlights 75% less manual work, 60% faster approvals, and 500+ employees on the platform.",
  },
  {
    question: "Is the solution scalable across multiple facilities and regions?",
    answer:
      "The architecture uses a centralized Dataverse model with environment strategy, role-based access, and reusable app components. New plants inherit the same governed templates while localizing workflows where regulations or processes differ.",
  },
  {
    question: "Can Softree build a similar solution for our operations?",
    answer:
      "Absolutely. We specialize in manufacturing Power Platform programs — from discovery and architecture through deployment and change management. Schedule a consultation and we will map a fixed-scope plan based on your plants, systems, and compliance requirements.",
  },
]

function buildFaqs(study: SanityCaseStudyDoc, layout: CaseStudyDetailLayout): CaseStudyFAQ[] {
  if (study.faqs?.length) return study.faqs.slice(0, 8)
  if (layout === "manufacturing-power-platform") return MANUFACTURING_DEFAULT_FAQS
  return MANUFACTURING_DEFAULT_FAQS.slice(0, 4)
}

function buildHighlights(study: SanityCaseStudyDoc, layout: CaseStudyDetailLayout): Highlight[] {
  if (layout === "manufacturing-power-platform") return MANUFACTURING_HERO_HIGHLIGHTS
  if (study.highlights?.length) return study.highlights.slice(0, 3)
  if (study.metrics?.length) {
    return study.metrics.slice(0, 3).map((m, i) => ({
      value: m.value || "",
      label: m.label || m.description || "",
      icon: MANUFACTURING_HERO_HIGHLIGHTS[i]?.icon,
    }))
  }
  return [
    { value: "75%", label: "Reduction in manual processing" },
    { value: "99.9%", label: "Platform uptime" },
    { value: "3x", label: "Faster reporting cycles" },
  ]
}

function buildImpactMetrics(study: SanityCaseStudyDoc, layout: CaseStudyDetailLayout): Highlight[] {
  if (layout === "manufacturing-power-platform") return MANUFACTURING_IMPACT_METRICS
  if (layout === "nexora-product-story") {
    if (study.metrics?.length) {
      return study.metrics.slice(0, 5).map((m, i) => ({
        value: m.value || "",
        label: m.label || m.description || "",
        icon: MANUFACTURING_IMPACT_METRICS[i]?.icon,
      }))
    }
    return [
      { value: "+65%", label: "Faster reporting cycles", icon: "trending-down" },
      { value: "-40%", label: "Reduction in manual data entry", icon: "trending-down" },
      { value: "+28%", label: "Increase in operational visibility", icon: "zap" },
      { value: "99.9%", label: "Platform uptime achieved", icon: "shield" },
      { value: "+50%", label: "User adoption across plants", icon: "users" },
    ]
  }
  if (layout === "synqlab-product-story") {
    if (study.metrics?.length) {
      return study.metrics.slice(0, 5).map((m, i) => ({
        value: m.value || "",
        label: m.label || m.description || "",
        icon: MANUFACTURING_IMPACT_METRICS[i]?.icon,
      }))
    }
    return [
      { value: "+65%", label: "Increase in reporting efficiency", icon: "trending-down" },
      { value: "-40%", label: "Reduction in manual data entry", icon: "trending-down" },
      { value: "+28%", label: "Increase in operational visibility", icon: "zap" },
      { value: "99.9%", label: "Platform uptime achieved", icon: "shield" },
      { value: "+50%", label: "User adoption across teams", icon: "users" },
    ]
  }
  if (layout === "payflow-fintech-story") {
    if (study.metrics?.length) {
      return study.metrics.slice(0, 5).map((m, i) => ({
        value: m.value || "",
        label: m.label || m.description || "",
        icon: PAYFLOW_IMPACT_METRICS[i]?.icon,
      }))
    }
    return PAYFLOW_IMPACT_METRICS
  }
  if (layout === "ai-horizontal-story" || layout === "neutrino-dashboard-story") {
    if (study.metrics?.length) {
      return study.metrics.slice(0, 4).map((m, i) => ({
        value: m.value || "",
        label: m.label || m.description || "",
        icon: AI_HORIZONTAL_IMPACT_METRICS[i]?.icon,
      }))
    }
    return AI_HORIZONTAL_IMPACT_METRICS
  }
  if (study.metrics?.length) {
    return study.metrics.slice(0, 4).map((m, i) => ({
      value: m.value || "",
      label: m.label || m.description || "",
      icon: MANUFACTURING_IMPACT_METRICS[i]?.icon,
    }))
  }
  return [
    { value: "75%", label: "Manual work reduced" },
    { value: "99.9%", label: "Uptime achieved" },
    { value: "3x", label: "Reporting speed" },
    { value: "50+", label: "Apps deployed" },
  ]
}

const MANUFACTURING_GALLERY_CAPTIONS = [
  "Executive Dashboard",
  "Workflow Automation",
  "Analytical Dashboard",
  "Mobile Experience",
]

function buildGallery(study: SanityCaseStudyDoc, layout?: CaseStudyDetailLayout): GalleryItem[] {
  const fromAssets = (study.gallery || [])
    .filter((g) => g?.asset?.url)
    .map((g) => ({ url: g.asset!.url!, alt: g.alt, caption: g.caption }))
  const fromUrls = (study.galleryUrls || [])
    .filter((g) => g?.url)
    .map((g) => ({ url: g.url!, alt: g.alt, caption: g.caption }))
  let items = [...fromAssets, ...fromUrls]
  if (layout === "manufacturing-power-platform" && items.length > 0) {
    items = items.slice(0, 4).map((item, i) => ({
      ...item,
      caption: MANUFACTURING_GALLERY_CAPTIONS[i] || item.caption,
    }))
    return items
  }
  if (items.length > 0) return items
  if (layout === "nexora-product-story") {
    const captions = [
      "Executive Dashboard",
      "Analytics Overview",
      "Mobile Inspection App",
      "Reporting Suite",
    ]
    return [
      "/Gallery/Prestige Bangalore-1.webp",
      "/Gallery/Prestige Bangalore-4.webp",
      "/Gallery/Prestige Bangalore-6.webp",
      "/Gallery/Prestige Bangalore-7.webp",
    ].map((url, i) => ({
      url,
      alt: captions[i] || "Application screenshot",
      caption: captions[i],
    }))
  }
  if (layout === "synqlab-product-story") {
    const captions = [
      "Analytics Dashboard",
      "Revenue Overview",
      "User Insights",
      "Reporting Suite",
    ]
    return [
      "/Gallery/Prestige Bangalore-1.webp",
      "/Gallery/Prestige Bangalore-4.webp",
      "/Gallery/Prestige Bangalore-6.webp",
      "/Gallery/Prestige Bangalore-7.webp",
    ].map((url, i) => ({
      url,
      alt: captions[i] || "Application screenshot",
      caption: captions[i],
    }))
  }
  if (layout === "manufacturing-power-platform") {
    const captions = MANUFACTURING_GALLERY_CAPTIONS
    return [
      "/Gallery/Prestige Bangalore-1.webp",
      "/Gallery/Prestige Bangalore-4.webp",
      "/Gallery/Prestige Bangalore-6.webp",
      "/Gallery/Prestige Bangalore-7.webp",
    ].map((url, i) => ({
      url,
      alt: captions[i] || "Application screenshot",
      caption: captions[i],
    }))
  }
  const hero = study.mainImage?.asset?.url || study.mainImageUrl
  if (!hero) return []
  return [
    { url: hero, alt: "Application dashboard", caption: "Operations command center" },
    { url: hero, alt: "Workflow designer", caption: "Automated approval flows" },
    { url: hero, alt: "Analytics view", caption: "Executive KPI dashboard" },
    { url: hero, alt: "Mobile app", caption: "Field inspection experience" },
  ]
}

function defaultBeforeAfter(): BeforeAfterRow[] {
  return [
    { metric: "Report generation", before: "3–5 days manual", after: "Same-day automated" },
    { metric: "Approval cycle", before: "48+ hours email", after: "Under 4 hours" },
    { metric: "Data accuracy", before: "~82% spreadsheet", after: "99%+ governed" },
    { metric: "App deployment", before: "6–9 months custom", after: "8–12 weeks low-code" },
  ]
}

const NEXORA_CHALLENGE_CARDS: CardItem[] = [
  {
    title: "Scattered Data",
    description:
      "Operational metrics lived across ERP, MES, and plant-floor spreadsheets — making consolidated reporting slow and unreliable.",
  },
  {
    title: "Time-Consuming",
    description:
      "Analysts spent days each month manually compiling KPI packs for leadership instead of driving actionable insights.",
  },
  {
    title: "Limited Visibility",
    description:
      "Plant managers lacked real-time visibility into production, quality, and compliance metrics across facilities.",
  },
]

const SYNQLAB_CHALLENGE_CARDS: CardItem[] = [
  ...NEXORA_CHALLENGE_CARDS,
  {
    title: "High Complexity",
    description:
      "Legacy integrations and custom scripts made every change risky — scaling to new plants required months of rework.",
  },
]

const NEXORA_APPROACH_STEPS: ApproachStep[] = [
  {
    title: "Discovery",
    description: "Stakeholder workshops, data audit, and KPI mapping across plants.",
  },
  {
    title: "Strategy",
    description: "Platform roadmap, integration architecture, and phased rollout plan.",
  },
  {
    title: "Design",
    description: "Dashboard wireframes, UX flows, and design system for analytics UI.",
  },
  {
    title: "Development",
    description: "Power Platform build, Dataverse models, and ERP/MES integrations.",
  },
  {
    title: "Testing & Launch",
    description: "UAT with plant teams, training, and phased go-live across regions.",
  },
]

const NEXORA_SOLUTION_FEATURES = [
  "Unified real-time analytics dashboard for plant and executive teams",
  "Automated data pipelines from ERP, MES, and quality systems",
  "Role-based KPI views with drill-down across 40+ facilities",
  "Scheduled reporting with export to Power BI and SharePoint",
  "Mobile-friendly inspection and approval workflows",
]

const SYNQLAB_SOLUTION_FEATURES = [
  "Real-time data synchronization across all connected sources",
  "Role-based access control with granular permissions",
  "Customizable dashboards and KPI widgets",
  "Automated alerts and anomaly detection",
  "Export and API integrations for downstream tools",
]

const PAYFLOW_CHALLENGE_CARDS: CardItem[] = [
  {
    title: "Scalability Issues",
    description:
      "Legacy monolithic architecture couldn't handle peak transaction volumes — causing throttling and failed payments during high-traffic events.",
  },
  {
    title: "Security Risks",
    description:
      "Outdated security protocols and fragmented auth systems exposed the platform to compliance gaps and potential fraud vectors.",
  },
  {
    title: "High Downtime",
    description:
      "Frequent maintenance windows and single points of failure resulted in unacceptable service interruptions for global merchants.",
  },
  {
    title: "Poor Visibility",
    description:
      "Operations teams lacked real-time dashboards to monitor transaction health, chargebacks, and regional performance metrics.",
  },
]

const PAYFLOW_SOLUTION_FEATURES = [
  "Microservices architecture with independent scaling per service",
  "Real-time fraud detection and ML-powered risk scoring",
  "Multi-region deployment with 99.99% uptime SLA",
  "Command Center dashboard with live transaction monitoring",
  "PCI-DSS compliant payment processing pipeline",
]

const AI_HORIZONTAL_CHALLENGE_CARDS: CardItem[] = [
  {
    title: "Manual Repetitive Tasks",
    description:
      "Finance and operations teams spent thousands of hours on invoice matching, approvals, and status updates that never should have been manual.",
  },
  {
    title: "Siloed Data",
    description:
      "Critical context lived across ERP, CRM, and plant systems — agents could not reason across sources without brittle one-off integrations.",
  },
  {
    title: "Slow Operations",
    description:
      "Cycle times stretched to days while leadership waited for consolidated KPIs that were already stale when they arrived.",
  },
]

const AI_HORIZONTAL_IMPACT_METRICS: Highlight[] = [
  { value: "65%", label: "Faster decision cycles", icon: "zap" },
  { value: "3.8x", label: "Workflow throughput", icon: "trending-down" },
  { value: "$6.2M+", label: "Annualized efficiency gains", icon: "shield" },
  { value: "99.9%", label: "Platform availability", icon: "shield" },
]

const PAYFLOW_IMPACT_METRICS: Highlight[] = [
  { value: "3.6X", label: "Transaction capacity", icon: "zap" },
  { value: "99.99%", label: "Uptime", icon: "shield" },
  { value: "45%", label: "Cost reduction", icon: "trending-down" },
  { value: "60%", label: "Faster deployment", icon: "clock" },
  { value: "190+", label: "Countries supported", icon: "users" },
]

function buildApproachSteps(study: SanityCaseStudyDoc, layout: CaseStudyDetailLayout): ApproachStep[] {
  if (study.approachSteps?.length) {
    return study.approachSteps
      .filter((s) => s.title)
      .slice(0, 5)
      .map((s) => ({
        title: s.title!,
        description: s.description || "",
      }))
  }
  if (layout === "nexora-product-story") return NEXORA_APPROACH_STEPS
  if (layout === "synqlab-product-story") return NEXORA_APPROACH_STEPS
  return []
}

function buildSolutionFeatures(study: SanityCaseStudyDoc, layout: CaseStudyDetailLayout, bullets: string[]): string[] {
  if (study.solutionFeatures?.length) return study.solutionFeatures.slice(0, 8)
  if (bullets.length >= 5) return bullets.slice(0, 5)
  if (layout === "nexora-product-story") return NEXORA_SOLUTION_FEATURES
  if (layout === "synqlab-product-story") return SYNQLAB_SOLUTION_FEATURES
  if (layout === "payflow-fintech-story") return PAYFLOW_SOLUTION_FEATURES
  return bullets.slice(0, 5)
}

function buildOverviewBar(study: SanityCaseStudyDoc, layout: CaseStudyDetailLayout): OverviewBar | undefined {
  if (layout !== "nexora-product-story") return undefined
  const deliverableTitles =
    study.deliverables?.map((d) => d.title).filter(Boolean).join(", ") ||
    "Dashboard, Workflows, Mobile Apps, Reports"
  return {
    client: study.client || study.title,
    industry: study.industry || categoryLabel(study.category) || "Manufacturing",
    team: study.teamSize || "4 Designers, 3 Developers",
    duration: study.projectDuration || "12 Weeks",
    myRole: study.myRole || "Lead Product Designer & Developer",
    deliverables: deliverableTitles,
  }
}

export function mapCaseStudyToLayoutData(
  study: SanityCaseStudyDoc,
  related: RelatedStudy[],
  layout: CaseStudyDetailLayout,
): CaseStudyLayoutData {
  const approachBullets = bulletsFromBlocks(study.approachContent)
  const manufacturingChallengeCards: CardItem[] = [
    {
      title: "Manual Processes",
      description:
        "Plant teams relied on spreadsheets and email for production approvals, causing delays and inconsistent data across facilities.",
    },
    {
      title: "Lack of Visibility",
      description:
        "Leadership lacked a single source of truth for operational KPIs — ERP, MES, and quality data lived in disconnected silos.",
    },
    {
      title: "Delayed Approvals",
      description:
        "Multi-step sign-offs over email stretched cycle times and created compliance gaps during quarterly audits.",
    },
  ]

  const challengeCards =
    layout === "manufacturing-power-platform"
      ? manufacturingChallengeCards
      : layout === "nexora-product-story"
        ? study.challengeCards && study.challengeCards.length >= 3
          ? study.challengeCards.slice(0, 3)
          : NEXORA_CHALLENGE_CARDS
        : layout === "synqlab-product-story"
          ? study.challengeCards && study.challengeCards.length >= 4
            ? study.challengeCards.slice(0, 4)
            : SYNQLAB_CHALLENGE_CARDS
          : layout === "payflow-fintech-story"
            ? study.challengeCards && study.challengeCards.length >= 4
              ? study.challengeCards.slice(0, 4)
              : PAYFLOW_CHALLENGE_CARDS
            : layout === "ai-horizontal-story" || layout === "neutrino-dashboard-story"
              ? study.challengeCards && study.challengeCards.length >= 3
                ? study.challengeCards.slice(0, 3)
                : AI_HORIZONTAL_CHALLENGE_CARDS
              : study.challengeCards && study.challengeCards.length >= 3
            ? study.challengeCards.slice(0, 3)
            : defaultChallengeCards(study.challengeSummary || plainTextFromBlocks(study.challengeContent))

  const solutionNodes =
    study.solutionArchitecture && study.solutionArchitecture.length >= 3
      ? study.solutionArchitecture.slice(0, 6)
      : defaultSolutionNodes(study.technologies || [])

  const deliverablesRaw =
    study.deliverables && study.deliverables.length >= 4
      ? study.deliverables.slice(0, 6)
      : defaultDeliverables(approachBullets)

  const deliverables =
    layout === "manufacturing-power-platform"
      ? deliverablesRaw.map((item, i) => ({
          ...item,
          imageUrl: item.imageUrl || MANUFACTURING_DELIVERABLE_IMAGES[i % MANUFACTURING_DELIVERABLE_IMAGES.length],
          imageAlt: item.imageAlt || item.title,
        }))
      : deliverablesRaw

  const technologies =
    study.technologies?.length && study.technologies.length >= 4
      ? study.technologies
      : layout === "nexora-product-story"
        ? ["Power Apps", "Power Automate", "Dataverse", "Power BI", "SharePoint", "Azure", "React", "TypeScript"]
        : layout === "synqlab-product-story"
          ? ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS", "Docker", "Kubernetes", "Tailwind CSS"]
          : layout === "payflow-fintech-story"
            ? ["React", "TypeScript", "Node.js", "Go", "PostgreSQL", "Redis", "AWS", "Docker", "Kubernetes", "Terraform"]
            : ["Power Apps", "Power Automate", "Dataverse", "Power BI", "SharePoint", "Azure"]

  const nexoraChallengeTitle =
    layout === "nexora-product-story"
      ? "Manual Reporting Was Slow and Error-Prone"
      : undefined

  const synqlabChallengeTitle =
    layout === "synqlab-product-story" ? "Outdated, Slow & Hard to Scale" : undefined

  const payflowChallengeTitle =
    layout === "payflow-fintech-story" ? "Legacy Systems Were Holding Them Back" : undefined

  const nexoraSolutionTitle =
    layout === "nexora-product-story"
      ? "An Intelligent Dashboard That Drives Decisions"
      : undefined

  const synqlabSolutionTitle =
    layout === "synqlab-product-story" ? "A Unified Platform That Drives Decisions" : undefined

  const payflowSolutionTitle =
    layout === "payflow-fintech-story" ? "A Modern, Secure & Scalable Infrastructure" : undefined

  return {
    slug: study.slug.current,
    layout,
    title: study.title,
    headerTitle:
      study.headerTitle ||
      (layout === "nexora-product-story"
        ? "Building a Scalable Analytics Platform for Real-time Plant Insights"
        : layout === "synqlab-product-story"
          ? "Building a Scalable Analytics Platform for Real-time Insights"
          : layout === "payflow-fintech-story"
            ? "Building a Scalable Payment Infrastructure for Global Businesses"
            : layout === "neutrino-dashboard-story"
              ? "Building the AI Operating System for Enterprise Automation"
              : layout === "ai-horizontal-story"
                ? "Building the Future of AI Automation"
                : study.title) ||
      "Power Platform Modernization for a Global Manufacturing Company",
    excerpt:
      study.excerpt ||
      (layout === "synqlab-product-story"
        ? "We partnered with the client to design and build a modern analytics platform that transforms scattered operational data into real-time, actionable insights for teams and leadership."
        : layout === "payflow-fintech-story"
          ? "We partnered with PayFlow to rebuild their payment infrastructure from the ground up — delivering a cloud-native platform capable of processing millions of transactions daily across 190+ countries."
          : layout === "ai-horizontal-story" || layout === "neutrino-dashboard-story"
            ? "Softree partnered with Neutrino AI to design a governed intelligence engine — autonomous agents, real-time operations, and enterprise-grade automation on one platform."
            : "Softree delivered a unified low-code platform that connected plant operations, automated compliance workflows, and gave leadership real-time visibility across 40+ facilities worldwide."),
    client: study.client || study.title,
    category: study.category,
    industry: study.industry || categoryLabel(study.category),
    accentColor: study.accentColor || ACCENT,
    heroImageUrl:
      study.mainImage?.asset?.url ||
      study.mainImageUrl ||
      (layout === "manufacturing-power-platform" ? MANUFACTURING_HERO_IMAGE : undefined),
    heroImageAlt: study.mainImage?.alt || study.client || study.title,
    videoUrl: study.videoUrl,
    highlights: buildHighlights(study, layout),
    snapshot:
      layout === "manufacturing-power-platform"
        ? {
            projectType: study.projectType || "Power Platform Implementation",
            industry: study.industry || "Manufacturing",
            region: study.region || study.location || "North America",
            duration: study.projectDuration || "12 Weeks",
            teamSize: study.teamSize || "8 Specialists",
            users: study.endUsers || "500+ Employees",
          }
        : layout === "synqlab-product-story"
          ? {
              projectType: study.projectType || categoryLabel(study.category) || "SaaS / Analytics",
              industry: study.industry || "SaaS / Analytics",
              region: study.region || study.location || "Global",
              duration: study.projectDuration || "6 Months",
              teamSize: study.teamSize || "4 Designers, 3 Developers",
              users: study.endUsers || "2,400+ platform users",
            }
          : layout === "payflow-fintech-story"
            ? {
                projectType: study.projectType || "Payment Infrastructure",
                industry: study.industry || "Fintech",
                region: study.region || study.location || "Global — 190+ countries",
                duration: study.projectDuration || "8 Months",
                teamSize: study.teamSize || "5 Engineers",
                users: study.endUsers || "10M+ daily transactions",
              }
            : layout === "ai-horizontal-story" || layout === "neutrino-dashboard-story"
              ? {
                  projectType: study.projectType || "AI Automation Platform",
                  industry: study.industry || "Enterprise AI",
                  region: study.region || study.location || "North America & EMEA",
                  duration: study.projectDuration || "12 Months",
                  teamSize: study.teamSize || "18 Engineers",
                  users: study.endUsers || "2,400+ operators",
                }
              : {
              projectType: study.projectType || categoryLabel(study.category) || "Power Platform",
              industry: study.industry || "Manufacturing",
              region: study.region || study.location || "Global — 12 countries",
              duration: study.projectDuration || "14 months",
              teamSize: study.teamSize || "8 specialists",
              users: study.endUsers || "2,400+ plant users",
            },
    challengeHeading: "The Client Challenge",
    challengeTitle: nexoraChallengeTitle || synqlabChallengeTitle || payflowChallengeTitle,
    challengeSubheading:
      study.challengeSummary ||
      (layout === "payflow-fintech-story"
        ? "The client's legacy payment stack couldn't scale with global growth — fragmented systems, security vulnerabilities, and frequent downtime threatened merchant trust and revenue."
        : layout === "synqlab-product-story"
        ? "The client's legacy analytics stack couldn't keep pace with growth — fragmented data, slow reporting, and limited visibility made scaling to new markets nearly impossible."
        : layout === "nexora-product-story"
          ? "A global manufacturer relied on fragmented spreadsheets and delayed reports — leadership needed a single source of truth for real-time plant performance."
          : layout === "manufacturing-power-platform"
            ? "A global manufacturer needed to replace fragmented tools with a governed, scalable platform — without disrupting production on the floor."
            : "A global manufacturer needed to replace fragmented tools with a governed, scalable platform."),
    challengeCards,
    approachHeading:
      layout === "nexora-product-story" || layout === "synqlab-product-story"
        ? "A Collaborative & Agile Approach"
        : undefined,
    approachSummary:
      study.approachSummary ||
      (layout === "ai-horizontal-story" || layout === "neutrino-dashboard-story"
        ? "We architected a four-layer AI engine — agents, intelligence, automation, and governed data — so Neutrino could scale autonomous workflows without losing auditability."
        : layout === "nexora-product-story" || layout === "synqlab-product-story"
          ? "We partnered closely with stakeholders through iterative sprints — aligning discovery, design, and delivery with measurable milestones at every phase."
          : undefined),
    approachSteps: buildApproachSteps(study, layout),
    solutionHeading: "Our Solution Architecture",
    solutionTitle: nexoraSolutionTitle || synqlabSolutionTitle || payflowSolutionTitle,
    solutionSummary:
      study.solutionSummary ||
      (layout === "payflow-fintech-story"
        ? "We designed and built a cloud-native payment platform with microservices architecture, real-time fraud detection, and global scalability — enabling the client to process millions of transactions daily."
        : layout === "ai-horizontal-story" || layout === "neutrino-dashboard-story"
          ? "A unified operations command center where autonomous agents, live KPIs, and audit-ready workflows run on a single governed platform."
          : layout === "synqlab-product-story"
            ? "We delivered a unified analytics platform that consolidates operational data, automates reporting, and surfaces real-time KPIs for teams and leadership."
            : layout === "nexora-product-story"
              ? "We delivered a unified Power Platform analytics suite that consolidates operational data, automates reporting, and surfaces real-time KPIs for plant and executive teams."
              : undefined),
    solutionFeatures: buildSolutionFeatures(study, layout, approachBullets),
    resultsHeading:
      layout === "nexora-product-story" || layout === "synqlab-product-story"
        ? "Delivering Impact That Matters"
        : layout === "payflow-fintech-story"
          ? "Delivering Results That Matter"
          : undefined,
    overviewBar: buildOverviewBar(study, layout),
    servicesProvided:
      study.servicesProvided ||
      (layout === "nexora-product-story"
        ? "Product Design, Power Platform Development"
        : layout === "payflow-fintech-story"
          ? "Architecture, Backend Dev, DevOps"
          : undefined),
    liveUrl: study.liveUrl,
    solutionNodes,
    deliverablesHeading: "What We Delivered",
    deliverables,
    gallery: buildGallery(study, layout),
    impactHeading: "Results & Business Impact",
    impactMetrics: buildImpactMetrics(study, layout),
    technologies,
    testimonial:
      layout === "manufacturing-power-platform"
        ? {
            quote:
              study.testimonial?.quote ||
              "Softree transformed how our plants operate. We went from fragmented spreadsheets to a unified platform in weeks — and our teams adopted it because it was built for how they actually work on the floor.",
            role: "Director of Operations",
            company: study.testimonial?.company || study.client || "Global Manufacturing Company",
            location: study.testimonial?.location || "North America",
            avatarUrl:
              study.testimonial?.avatar?.asset?.url || MANUFACTURING_SECTION_IMAGES.testimonial,
          }
        : layout === "nexora-product-story"
          ? {
              quote:
                study.testimonial?.quote ||
                "Softree transformed how we see our operations. We went from delayed spreadsheet reports to real-time dashboards in weeks — and our plant teams actually use it every day.",
              name: study.testimonial?.name || "James Carter",
              role: study.testimonial?.role || "Director of Operations",
              company: study.testimonial?.company || study.client || "Global Manufacturing Company",
              avatarUrl: study.testimonial?.avatar?.asset?.url || MANUFACTURING_SECTION_IMAGES.testimonial,
            }
          : layout === "synqlab-product-story"
            ? {
                quote:
                  study.testimonial?.quote ||
                  "Softree transformed our data chaos into clarity. We went from scattered spreadsheets to a unified platform in weeks — and our teams adopted it because it was built for how they actually work.",
                name: study.testimonial?.name || "Michael Anderson",
                role: study.testimonial?.role || "CTO",
                company: study.testimonial?.company || study.client || "DataCore",
                avatarUrl: study.testimonial?.avatar?.asset?.url || MANUFACTURING_SECTION_IMAGES.testimonial,
              }
            : layout === "payflow-fintech-story"
              ? {
                  quote:
                    study.testimonial?.quote ||
                    "Softree rebuilt our entire payment infrastructure in months, not years. We went from struggling with 800K daily transactions to handling 2.8M+ with zero downtime — and our fraud detection is now best-in-class.",
                  name: study.testimonial?.name || "Daniel Morris",
                  role: study.testimonial?.role || "CTO",
                  company: study.testimonial?.company || study.client || "PayFlow",
                  avatarUrl: study.testimonial?.avatar?.asset?.url || MANUFACTURING_SECTION_IMAGES.testimonial,
                }
              : layout === "ai-horizontal-story" || layout === "neutrino-dashboard-story"
                ? {
                    quote:
                      study.testimonial?.quote ||
                      "Softree gave us an automation stack we actually trust. Agents handle the busywork, leadership sees live KPIs, and every decision stays auditable — that is the future we were aiming for.",
                    name: study.testimonial?.name || "David Chen",
                    role: study.testimonial?.role || "CTO",
                    company: study.testimonial?.company || study.client || "Neutrino AI",
                    avatarUrl:
                      study.testimonial?.avatar?.asset?.url || MANUFACTURING_SECTION_IMAGES.testimonial,
                  }
                : study.testimonial?.quote
          ? {
              quote: study.testimonial.quote,
              name: study.testimonial.name,
              role: study.testimonial.role,
              company: study.testimonial.company,
              location: study.testimonial.location,
              avatarUrl: study.testimonial.avatar?.asset?.url,
            }
          : undefined,
    beforeAfter: study.beforeAfter?.length ? study.beforeAfter : defaultBeforeAfter(),
    cta: {
      headline: study.ctaHeadline || "Ready to modernize your business applications?",
      subtext:
        study.ctaSubtext ||
        "Partner with Softree to design, build, and scale enterprise-grade Power Platform solutions.",
      buttonText: study.ctaButtonText || "Schedule a Consultation",
      buttonHref: "/contact",
    },
    related,
    faqs: buildFaqs(study, layout),
    sectionImages:
      layout === "manufacturing-power-platform"
        ? { ...MANUFACTURING_SECTION_IMAGES }
        : layout === "nexora-product-story"
          ? {
              hero: study.mainImage?.asset?.url || study.mainImageUrl || MANUFACTURING_HERO_IMAGE,
              heroAlt: study.mainImage?.alt || study.client || study.title,
              solutionDashboard: "/Gallery/Prestige Bangalore-4.webp",
              challenge: "/Gallery/Prestige Bangalore-2.webp",
            }
          : layout === "synqlab-product-story"
            ? {
                hero: study.mainImage?.asset?.url || study.mainImageUrl || MANUFACTURING_HERO_IMAGE,
                heroAlt: study.mainImage?.alt || study.client || study.title,
                solutionDashboard: "/Gallery/Prestige Bangalore-4.webp",
                challenge: "/Gallery/Prestige Bangalore-2.webp",
              }
            : undefined,
    publishedAt: study.publishedAt,
    updatedAt: study._updatedAt,
  }
}
