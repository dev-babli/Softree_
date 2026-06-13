/** Curated abstract / editorial imagery for the web development service page. */
export const WEB_DEV_VISUALS = {
  hero: [
    {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=85",
      alt: "Iridescent abstract gradient forms",
    },
    {
      src: "https://images.unsplash.com/photo-1558591710-4bfb4aefaa0e?auto=format&fit=crop&w=1400&q=85",
      alt: "Fluid abstract color waves",
    },
    {
      src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1400&q=85",
      alt: "Dimensional abstract purple composition",
    },
  ],
  lead: {
    src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1600&q=85",
    alt: "Geometric mesh light study",
  },
  works: [
    {
      title: "NEXORA",
      year: "2025",
      src: "https://images.unsplash.com/photo-1579546929518-9fa396ef5109?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "FORMERA",
      year: "2024",
      src: "https://images.unsplash.com/photo-1557682250-33bd709cbe55?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "LUMINEX",
      year: "2025",
      src: "https://images.unsplash.com/photo-1614850715647-1bb02751b9e8?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "ARCETA",
      year: "2025",
      src: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "KREO",
      year: "2025",
      src: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "DESYNE",
      year: "2024",
      src: "https://images.unsplash.com/photo-1604871000639-842f62a57252?auto=format&fit=crop&w=1200&q=85",
    },
  ],
  capabilities: [
    {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85",
      alt: "Code on screen — frontend engineering",
    },
    {
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85",
      alt: "Global network — cloud and APIs",
    },
    {
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=85",
      alt: "Cyber security aesthetic",
    },
  ],
  process: [
    "https://images.unsplash.com/photo-1526374965328-7a61d4dc5420?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1517694712202-14dd9538ac97?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
  ],
  mosaic: [
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=85",
  ],
} as const;

export const WEB_DEV_CAPABILITIES = [
  {
    title: "Product & interface engineering",
    description:
      "Next.js, React, and design systems — interfaces that feel premium and perform under load.",
    tags: ["Next.js", "React", "TypeScript", "Design systems", "Accessibility"],
    imageIndex: 0,
  },
  {
    title: "Backend, APIs & cloud",
    description:
      "Node, Python, and Azure/AWS — secure services, integrations, and data layers built to scale.",
    tags: ["Node.js", "PostgreSQL", "REST & GraphQL", "AWS", "Azure"],
    imageIndex: 1,
  },
  {
    title: "Quality, security & launch",
    description:
      "OWASP baselines, automated QA, CI/CD, and observability before anything hits production.",
    tags: ["OWASP", "CI/CD", "Jest", "Cypress", "Monitoring"],
    imageIndex: 2,
  },
] as const;

export const WEB_DEV_PROCESS = [
  {
    step: "01",
    title: "Discover",
    body: "Workshops, user flows, and technical scope — fixed before a line of code.",
  },
  {
    step: "02",
    title: "Design",
    body: "Wireframes to polished UI with tokens ready for component build-out.",
  },
  {
    step: "03",
    title: "Build",
    body: "Full-stack sprints with weekly demos and milestone checkpoints.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Hardening, deployment pipelines, and post-launch support playbooks.",
  },
] as const;
