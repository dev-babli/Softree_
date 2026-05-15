export const proofItems = [
  "React 19",
  "Next.js",
  "GSAP",
  "Tailwind",
  "CMS ready",
  "API ready",
  "SEO ready",
  "Core Web Vitals",
]

export const painPoints = [
  {
    title: "The site looks fine, but does not sell",
    body: "We rebuild the page around intent, proof, and clear next actions instead of decoration.",
  },
  {
    title: "The frontend is slow to change",
    body: "We turn repeated UI into a reusable React system so new sections and campaigns ship faster.",
  },
  {
    title: "Performance is treated as a last step",
    body: "We design with image budgets, interaction cost, metadata, and launch checks from day one.",
  },
]

export type ServiceIcon = "code" | "layers" | "component" | "database" | "gauge" | "shield" | "workflow"

export const services: Array<{
  icon: ServiceIcon
  title: string
  body: string
  span: string
}> = [
  {
    icon: "code",
    title: "React landing pages",
    body: "Conversion pages, product launches, and campaign pages built with motion, analytics, and clear offer framing.",
    span: "lg:col-span-7",
  },
  {
    icon: "layers",
    title: "Next.js company websites",
    body: "Service sites with structured content, fast routing, optimized assets, and clean editorial systems.",
    span: "lg:col-span-5",
  },
  {
    icon: "component",
    title: "Design systems",
    body: "Reusable sections, tokenized styles, interaction states, and component patterns that reduce redesign churn.",
    span: "lg:col-span-5",
  },
  {
    icon: "database",
    title: "CMS and API integration",
    body: "Content models, dashboards, forms, CRM flows, product data, and secure server-side integration.",
    span: "lg:col-span-7",
  },
  {
    icon: "gauge",
    title: "Performance repair",
    body: "LCP, INP, CLS, image delivery, bundle checks, lazy loading, and scroll-animation cleanup.",
    span: "lg:col-span-4",
  },
  {
    icon: "shield",
    title: "Launch support",
    body: "QA, accessibility sweeps, metadata, redirects, analytics, deployment, and post-launch iteration.",
    span: "lg:col-span-4",
  },
  {
    icon: "workflow",
    title: "Frontend migration",
    body: "Move legacy pages, fragile Webflow builds, or slow React code into a maintainable production stack.",
    span: "lg:col-span-4",
  },
]

export const buildSteps = [
  {
    title: "Diagnose",
    body: "We map page intent, audience friction, content gaps, speed issues, and conversion blockers before touching visuals.",
    image: "/web-development-story/story-discovery.svg",
  },
  {
    title: "Position",
    body: "We turn the service into a sharp offer: who it is for, what changes, why Softree, and what action comes next.",
    image: "/web-development-story/story-architecture.svg",
  },
  {
    title: "Design system",
    body: "We define type, spacing, reusable sections, interaction states, and responsive rules before building the full page.",
    image: "/web-development-story/story-build.svg",
  },
  {
    title: "Build",
    body: "We implement the React experience with scoped client islands, optimized assets, structured data, and clean components.",
    image: "/web-development-story/hero-platform.svg",
  },
  {
    title: "Optimize",
    body: "We check Core Web Vitals, animation cost, bundle size, crawlability, accessibility, and mobile reading comfort.",
    image: "/web-development-story/story-launch.svg",
  },
]

export const performanceChecks = [
  "Largest Contentful Paint planned around a single meaningful hero visual.",
  "Interaction to Next Paint protected by transform-only scroll motion.",
  "Cumulative Layout Shift controlled with fixed media ratios and stable sections.",
  "Reduced-motion users receive a complete static version of every story beat.",
]

export const offers = [
  {
    name: "Launch Sprint",
    fit: "Best for a focused service or campaign page",
    points: ["Positioning workshop", "One premium React page", "Performance and SEO setup", "Launch checklist"],
  },
  {
    name: "Growth Website",
    fit: "Best for a complete React/Next.js service website",
    points: ["Information architecture", "Reusable section system", "CMS/API ready build", "Analytics and conversion events"],
  },
  {
    name: "Product Frontend",
    fit: "Best for SaaS, dashboards, and web app interfaces",
    points: ["UX flows and component logic", "Authenticated UI patterns", "API integration support", "Design system handoff"],
  },
]

export const faqs = [
  {
    question: "Can Softree build only the frontend?",
    answer:
      "Yes. We can build the React/Next.js frontend and integrate with your existing CMS, API, CRM, or backend team.",
  },
  {
    question: "Will this be SEO friendly?",
    answer:
      "Yes. The build includes metadata, semantic headings, structured page content, optimized assets, and launch checks for crawlability.",
  },
  {
    question: "Can we use advanced GSAP without hurting performance?",
    answer:
      "Yes, if it is limited to a few high-value moments, scoped through useGSAP, and backed by reduced-motion and mobile fallbacks.",
  },
  {
    question: "Do we need real screenshots before starting?",
    answer:
      "No. We can start with high-fidelity interface compositions, then replace them with real product or project visuals when available.",
  },
]
