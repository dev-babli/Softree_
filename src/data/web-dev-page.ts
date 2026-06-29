export type WebDevGallerySlide = {
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
};

export type WebDevLane = {
  id: string;
  title: string;
  n: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
};

/** Premium local showcase art — same asset family as homepage comps. */
export const WEB_DEV_GALLERY: WebDevGallerySlide[] = [
  {
    title: "SaaS product surfaces",
    category: "Product engineering",
    year: "2025",
    description:
      "Multi-tenant dashboards, billing, and admin — React, Next.js, and design systems built to scale.",
    image: "/showcase/avoora-crop-hero.png",
  },
  {
    title: "Enterprise portals",
    category: "Web platforms",
    year: "2024",
    description:
      "Role-based portals, workflow automation, and integrations with Microsoft and legacy systems.",
    image: "/showcase/avoora-sculpture.png",
  },
  {
    title: "Design systems & UI",
    category: "Interface",
    year: "2024",
    description:
      "Token-driven components, accessibility, and motion — shipped as reusable libraries.",
    image: "/showcase/gradient-sculpture.png",
  },
  {
    title: "API-first backends",
    category: "Platform",
    year: "2025",
    description:
      "Secure services, event-driven architecture, and cloud-native deployment pipelines.",
    image: "/showcase/avoora-crop-pearl.png",
  },
];

export const WEB_DEV_LANES: WebDevLane[] = [
  {
    id: "frontend",
    title: "Frontend & product UI",
    n: "01",
    description:
      "Next.js, React, and TypeScript — responsive interfaces, design systems, and Core Web Vitals budgets enforced from sprint one.",
    tags: ["Next.js", "React", "TypeScript", "a11y", "Design systems"],
    image: "/showcase/avoora-crop-hero.png",
    href: "/contact",
  },
  {
    id: "backend",
    title: "Backend & integrations",
    n: "02",
    description:
      "Node, Python, and REST/GraphQL APIs — secure auth, third-party integrations, and data layers architected for scale.",
    tags: ["Node.js", "PostgreSQL", "GraphQL", "Integrations"],
    image: "/showcase/avoora-reference-full.png",
    href: "/contact",
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    n: "03",
    description:
      "Azure, AWS, Docker, and CI/CD — staging environments, observability, and zero-downtime release playbooks.",
    tags: ["Azure", "AWS", "Docker", "CI/CD"],
    image: "/showcase/gradient-sculpture.png",
    href: "/contact",
  },
  {
    id: "quality",
    title: "Quality & launch",
    n: "04",
    description:
      "OWASP baselines, automated QA, penetration testing, and SLA-backed support after go-live.",
    tags: ["OWASP", "Cypress", "Monitoring", "Support"],
    image: "/showcase/avoora-crop-pearl.png",
    href: "/contact",
  },
];

export const WEB_DEV_STACKED_VIDEOS: Record<string, string> = {
  discovery: "/stacked_services/Fine_tune_scroll_reveal_effect_202605271100.webm",
  design: "/stacked_services/SaaS_animation_soft_glassmorphis_202605271614-ezgif.com-gif-maker (1).webm",
  build: "/stacked_services/3rdcard.webm",
  launch: "/stacked_services/4thcard.webm",
};

export const WEB_DEV_STACKED_SLIDES = [
  {
    key: "discovery",
    phase: "PHASE 01",
    index: "01",
    title: "DISCOVERY",
    headline: "Scope, architecture, and roadmap — locked before build.",
    description:
      "Stakeholder workshops, user flows, and technical feasibility. Fixed timelines agreed in discovery.",
    outcomes: ["Workshops", "Architecture", "Fixed scope"],
    tone: "light" as const,
  },
  {
    key: "design",
    phase: "PHASE 02",
    index: "02",
    title: "DESIGN",
    headline: "Wireframes to polished UI with tokens ready for code.",
    description:
      "Figma to component libraries — accessible patterns and brand consistency across every surface.",
    outcomes: ["Wireframes", "UI systems", "Prototypes"],
    tone: "ember" as const,
  },
  {
    key: "build",
    phase: "PHASE 03",
    index: "03",
    title: "BUILD",
    headline: "Full-stack sprints with weekly demos.",
    description:
      "Frontend, backend, and integrations in parallel — agile delivery with milestone checkpoints.",
    outcomes: ["Next.js", "APIs", "Weekly demos"],
    tone: "dark" as const,
  },
  {
    key: "launch",
    phase: "PHASE 04",
    index: "04",
    title: "LAUNCH",
    headline: "Hardening, deployment, and post-launch support.",
    description:
      "Security review, production pipelines, monitoring, and ongoing optimization.",
    outcomes: ["CI/CD", "OWASP", "Support"],
    tone: "violet" as const,
  },
];
