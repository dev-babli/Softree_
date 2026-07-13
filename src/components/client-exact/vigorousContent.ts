/**
 * Vigorous Softech — lead-magnet copy for /client (Hanza shell).
 * Source: vigoroussoftech.com + multi-agent SEO/AEO/content/risk loop.
 * Rules: no fake metrics/testimonials/prices; CTA = free intro / GCC fit check.
 */

export const brand = {
  name: "Vigorous Softech",
  legal: "Vigorous Softech Systems Pvt Ltd",
  short: "Vigorous",
  location: "Indore, India",
  profession: "CEO, Vigorous Softech",
  leader: "Ashish Gangrade",
} as const

export const assets = {
  founderPortrait: "/client/image.png",
  ctaPortrait: "/client/image.png",
  founderAlt: "Ashish Gangrade, CEO, Vigorous Softech",
  logoWordmark: "/images/hero/LOGOWHITE.png",
} as const

export const seo = {
  title: "GCC as a Service | Vigorous Softech India",
  description:
    "Explore GCC and Colocation-as-a-Service with Vigorous Softech—Central India talent and cost-effective capability centres. Book a free GCC fit check.",
} as const

export const ctas = {
  primary: "Book a free intro",
  primaryShort: "Book Intro",
  fitCheck: "GCC fit check",
  leadership: "Talk to leadership",
  startProject: "Book Intro", // top-bar CTA (was agency "start" label)
  brandSlash: "/Vigorous Softech",
} as const

export const hero = {
  headlineLead: "We help enterprises and growing teams ",
  headlineRestSegments: [
    { text: "build " },
    { text: "GCC", accent: true },
    { text: " and " },
    { text: "digital capability", accent: true },
    { text: " in India." },
  ] as const,
  services: ["GCC Solutions", "Digital Services", "Business Advisory"] as const,
  // Hide fake rating — keep structure but honest trust line
  rating: "24+",
  ratingSuffix: " yrs leadership",
  trustLead: "Led by ",
  trustRest: "24+ years of leadership",
  logoAlt: "Vigorous Softech",
  logoSrc: "/images/hero/LOGOWHITE.png",
  logoSrcSet: "/images/hero/LOGOWHITE.png",
  avatars: [
    "/client/image.png",
    "/client/image.png",
    "/client/image.png",
    "/client/image.png",
  ] as const,
  noiseBg:
    "https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256",
} as const

export const about = {
  missionEyebrow: "01",
  missionLabel: "Our Mission",
  greeting: "Hello. We’re Vigorous.",
  body:
    "We drive digital transformation and growth by harnessing talent in India’s Tier 2 and Tier 3 cities—IT consulting, advisory, software, and GCC services that help enterprises operate smarter. Building an innovative GCC capability in Central India.",
  profileName: "Ashish Gangrade",
  profession: "CEO, Vigorous Softech",
  location: "Indore, India",
  getInTouch: "Book Intro",
  brandSlash: "/Vigorous Softech",
} as const

export const services = {
  eyebrow: "03",
  label: "Services",
  headlineMuted: "What we",
  headlineAccent: "Deliver.",
  subhead: "From strategy to GCC operations—built for scale.",
  items: [
    {
      title: "Global Capability Centre (GCC)",
      body:
        "Setup & ops strategy, Micro GCC & shared infrastructure, talent & workforce planning, compliance & IT controls, CoE development, AI-augmented ops, and GCC-as-a-Service delivery—scoped per engagement.",
    },
    {
      title: "Business Advisory",
      body:
        "Growth strategy, market entry, financial & risk advisory, change management, investment readiness, performance improvement, and policy & PPP advisory for the public sector.",
    },
    {
      title: "Shared Services",
      body:
        "HR, finance & accounting, IT helpdesk, procurement, admin & facilities, and centralized support for startups and SMBs.",
    },
    {
      title: "Digital Services",
      body:
        "IT strategy & architecture, digital transformation, cloud & DevOps, AI/ML & automation, data & BI, cybersecurity, custom software, and UI/UX experience engineering.",
    },
  ],
} as const

export const process = {
  eyebrow: "04",
  label: "Process",
  headline: "5 Steps to Fit.",
  subhead: "From first conversation to a clear engagement path—scoped to your functions.",
  steps: [
    {
      num: "01",
      tag: "Discover",
      title: "Scope & Fit Assessment",
      body: "Free intro: goals, constraints, and whether a GCC, Micro GCC, or digital engagement fits.",
    },
    {
      num: "02",
      tag: "Blueprint",
      title: "Operating Model & Location Plan",
      body: "Define towers, governance, Tier 2/3 location logic, and what we enable vs what you own.",
    },
    {
      num: "03",
      tag: "Enable",
      title: "Setup & Colocation Readiness",
      body: "Stand up the foundation—workspace path, hiring plan, and process readiness for go-live.",
    },
    {
      num: "04",
      tag: "Operate",
      title: "Shared Services & Delivery",
      body: "Run agreed IT, digital, or business shared-services work under the defined operating model.",
    },
    {
      num: "05",
      tag: "Improve",
      title: "Review, Govern & Scale",
      body: "Review against agreed measures, tighten governance, and decide what to expand next.",
    },
  ],
} as const

export const industries = {
  sectionCta: "All Industries",
  headline:
    "Industries we enable for GCC setup, digital delivery, and shared operations.",
  marquee: [
    { name: "BFSI", src: "/client/industry-bfsi.svg" },
    { name: "Healthcare", src: "/client/industry-healthcare.svg" },
    { name: "Manufacturing", src: "/client/industry-manufacturing.svg" },
    { name: "Retail", src: "/client/industry-retail.svg" },
    { name: "SaaS", src: "/client/industry-saas.svg" },
    { name: "Logistics", src: "/client/industry-logistics.svg" },
    { name: "Energy", src: "/client/industry-energy.svg" },
    { name: "Public Sector", src: "/client/industry-public.svg" },
  ] as const,
  cards: [
    {
      name: "BFSI & Enterprise",
      sector: "2026",
      cta: "Explore",
      blurb: "GCC and colocation paths for regulated, multi-tower enterprise operations.",
      tags: ["BFSI", "Enterprise GCC"],
      preview: "/client/industry-card-bfsi.jpg",
      wide: "/client/industry-wide-bfsi.jpg",
      badge: "/client/industry-bfsi.svg",
    },
    {
      name: "Technology & SaaS",
      sector: "2026",
      cta: "Explore",
      blurb: "Product engineering, cloud, AI/ML, and platform ops from Central India.",
      tags: ["Technology", "SaaS"],
      preview: "/client/industry-card-saas.jpg",
      wide: "/client/industry-wide-saas.jpg",
      badge: "/client/industry-saas.svg",
    },
    {
      name: "Manufacturing & Logistics",
      sector: "2026",
      cta: "Explore",
      blurb: "Shared services and digital backbone for supply-chain-heavy sectors.",
      tags: ["Manufacturing", "Logistics"],
      preview: "/client/industry-card-mfg.jpg",
      wide: "/client/industry-wide-mfg.jpg",
      badge: "/client/industry-manufacturing.svg",
    },
  ],
} as const

/** @deprecated use industries — kept for any stale imports */
export const portfolio = industries

export const testimonials = {
  trustLead: "Leadership perspective",
  cta: "Book Intro",
  brandSlash: "/Vigorous Softech",
  /** CEO statement — not a client testimonial */
  quote: {
    author: "Ashish Gangrade",
    role: "CEO, Vigorous Softech",
    text:
      "Vigorous Softech is committed to delivering innovative, scalable solutions while tapping into the untapped potential of Tier 2 and Tier 3 cities in India—contributing to regional growth and job creation.",
  },
} as const

export const stats = {
  items: [
    {
      value: "24+",
      label: "Years",
      body: "Leadership experience across consulting, IT, and digital transformation.",
    },
    {
      value: "Tier 2/3",
      label: "Focus",
      body: "Capability built around emerging-city talent and cost-effective delivery.",
    },
    {
      value: "GCC",
      label: "Model",
      body: "Colocation-as-a-Service and GCC-as-a-Service engagement paths.",
    },
  ],
} as const

export const caseStudy = {
  eyebrow: "06",
  label: "Focus",
  quote:
    "GCCs help mid-sized global companies scale operations while focusing on core strengths—colocation and GCC-as-a-Service make that path more accessible.",
  author: "Vigorous Softech · GCC practice",
  body:
    "Mid-market firms often need capability without building a full metro campus. We help design Micro GCC and shared-infrastructure models from Central India—talent, controls, and operating rhythm—then support digital and shared-services layers as needed.",
  cta: "Book a GCC fit check",
} as const

export const pricing = {
  eyebrow: "07",
  label: "Engage",
  headline: "Ways to start",
  cards: [
    {
      tier: "Discovery call",
      price: "Free",
      unit: "intro",
      includesLabel: "What’s included",
      includes: [
        "30–45 min fit conversation",
        "High-level GCC / digital scoping",
        "Clear next-step recommendation",
      ],
      timelineLabel: "Format",
      timeline: "Live / video",
      cta: "Book a free intro",
    },
    {
      tier: "GCC readiness workshop",
      price: "Scoped",
      unit: "workshop",
      includesLabel: "What’s included",
      includes: [
        "Location & model options",
        "Talent & controls checklist",
        "Shared vs dedicated paths",
        "Written readiness summary",
      ],
      timelineLabel: "Format",
      timeline: "Proposal-based",
      cta: "Request workshop",
    },
    {
      tier: "Custom proposal",
      price: "Custom",
      unit: "engagement",
      includesLabel: "What’s included",
      includes: [
        "GCC-as-a-Service",
        "Digital delivery",
        "Shared services",
        "Advisory—scoped after discovery",
      ],
      timelineLabel: "Format",
      timeline: "After discovery",
      cta: "Talk to leadership",
    },
  ],
} as const

export const faq = {
  headline: "Quick Answers.",
  subhead: "Everything you should know before we talk.",
  items: [
    {
      q: "What does Vigorous Softech do?",
      a: "We provide IT consulting, business advisory, custom software, shared services, and GCC setup support—helping organizations build capability using talent from India’s Tier 2 and Tier 3 cities.",
    },
    {
      q: "What is your GCC model?",
      a: "We help organizations build, scale, and operate GCCs through Colocation-as-a-Service and GCC-as-a-Service paths—covering strategy, infrastructure, talent planning, governance, and CoE practices. Scope is defined per engagement.",
    },
    {
      q: "Where do you operate from?",
      a: "We focus on Central India and broader Tier 2/3 talent markets, with registered presence in Indore. Exact delivery locations depend on the engagement.",
    },
    {
      q: "Who leads the practice?",
      a: "Ashish Gangrade, CEO, brings 24+ years across Deloitte, PwC, BDO, Infosys, and Wipro, including work tied to India’s National eGovernance Plan and international development programs.",
    },
    {
      q: "How do engagements start?",
      a: "Start with a free intro or GCC fit check. If there’s a fit, we may run a readiness workshop or prepare a custom proposal. We don’t publish fixed package prices on this page.",
    },
    {
      q: "Which industries do you serve?",
      a: "BFSI, healthcare, manufacturing, retail & eCommerce, public sector / government, and startups.",
    },
  ],
} as const

export const blog = {
  eyebrow: "Insights",
  cta: "All Insights",
  posts: [
    {
      title: "GCC-as-a-Service and GCC Colocation",
      tag: "GCC",
      image: "/client/blog-post-1.jpg",
      href: "https://www.vigoroussoftech.com/blogs/post/gcc-as-a-service-and-gcc-colocation-a-game-changer-for-mid-sized-global-companies",
    },
    {
      title: "Tier-2 Cities: The Gamechanger for GCC Colocation",
      tag: "Locations",
      image: "/client/blog-post-2.jpg",
      href: "https://www.vigoroussoftech.com/",
    },
    {
      title: "How AI and Agentic Workforce Capabilities Transform Growth",
      tag: "Digital",
      image: "/client/blog-post-3.jpg",
      href: "https://www.vigoroussoftech.com/",
    },
    {
      title: "Building delivery governance for shared services",
      tag: "Operations",
      image: "/client/blog-post-4.jpg",
      href: "https://www.vigoroussoftech.com/",
    },
  ],
} as const

export const footer = {
  heading: "Get in Touch",
  brandSlash: "/Vigorous Softech",
  email: "info@vigoroussoftech.com",
  profileName: "Ashish Gangrade",
  profession: "CEO, Vigorous Softech",
  location: "Indore, Madhya Pradesh",
  address: "C, 919 Sukhaliya, Indore, MP 452001",
  form: {
    nameLabel: "Your name",
    namePlaceholder: "Your name",
    emailLabel: "Email address",
    emailPlaceholder: "you@company.com",
    messageLabel: "How can we help?",
    messagePlaceholder: "Tell us about your GCC or digital goals…",
    submit: "Book a free intro",
    privacy:
      "By submitting, you agree that Vigorous Softech Systems Pvt Ltd may contact you about your enquiry. We use your details only to respond.",
  },
  copyright: "© 2026 Vigorous Softech Systems Pvt Ltd. All rights reserved.",
  builtBy: "Softree Technology",
  builtByUrl: "https://softree.technology",
  nav: ["Home", "Industries", "About", "Contact", "Blog"] as const,
} as const

export const menu = {
  links: [
    { label: "Home", href: "#home-hero" },
    { label: "Industries", href: "#home-industries" },
    { label: "About", href: "#home-about" },
    { label: "Contact", href: "#home-contact" },
    { label: "Blog", href: "#home-blog" },
  ] as const,
  profileName: "Ashish Gangrade",
  profileRole: "CEO, Vigorous Softech",
} as const
