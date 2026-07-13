/** Softree copy for the AI home clone. Services positioning on the Microsoft stack. */

export const heroContent = {
  heading: "Autonomous agents built for enterprise certainty.",
  sub: [
    "Microsoft-stack agent programs that ship in weeks —",
    "not demos that stall in pilot.",
  ],
  ctaPrimary: { label: "Let's talk", href: "/contact" },
  ctaSecondary: { label: "DELIVERY PROOF", href: "/case-studies" },
  meetPanel: {
    eyebrow: "Agentic AI on Microsoft",
    title: "Softree",
    badge: "NEW",
    description:
      "Microsoft-stack agents your IT team can audit, scale, and operate. The delivery model for building AI agents for customer and employee experiences with certainty.",
    href: "/agentic-ai-platform",
  },
}

export const industriesHeader = {
  heading: "We've built our practice serving complex enterprises",
  sub: "Deep domain context — not generic bots.",
  foot: "Why enterprises choose Softree for agentic delivery.",
  ctaPrimary: { label: "Book a working session", href: "/contact" },
  ctaSecondary: { label: "See our work", href: "/case-studies" },
}

const CDN = "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b"

/**
 * Industry slides. Layout + animation match the reference; the borrowed
 * client-logo marquees are replaced with honest Softree capability chips
 * (no invented clients).
 */
export const industries = [
  {
    id: "financial",
    tab: "Banking",
    heading: "Banks, Insurers & Financial Institutions",
    bg: `${CDN}/68c1998017adc89faa49388c_fshome.avif`,
    capLabel: "Agents we build:",
    caps: ["KYC & AML copilots", "Fraud triage agents", "Contact-center deflection", "Dispute & statement automation"],
  },
  {
    id: "healthcare",
    tab: "Healthcare",
    heading: "Payers, Providers & Life Sciences",
    bg: `${CDN}/68c19a3bfda82c7f2e12c79a_healthcarehome.avif`,
    capLabel: "Agents we build:",
    caps: ["Prior-auth automation", "Clinical documentation copilots", "Patient support agents", "Claims triage"],
  },
  {
    id: "consumer",
    tab: "Retail",
    heading: "Retail & Consumer Brands",
    bg: `${CDN}/68c19a3b38b198ea6f222a3f_351a023e6b7126c0fc226cf7c9d3a1df_consumerhome.avif`,
    capLabel: "Agents we build:",
    caps: ["Order & returns agents", "Product discovery copilots", "Store-ops assistants", "Service automation"],
  },
  {
    id: "telecom",
    tab: "Telecom + Media",
    heading: "Telecom, Media & Communications",
    bg: `${CDN}/68c19a3bfdc0d853dd98ecae_telecomhome.avif`,
    capLabel: "Agents we build:",
    caps: ["Tier-1 support deflection", "Field-service copilots", "Billing dispute agents", "Content-ops assistants"],
  },
  {
    id: "business",
    tab: "Business",
    heading: "Enterprise Shared Services",
    bg: `${CDN}/68c19a3b2513192e19a6dcc2_b2bhome.avif`,
    capLabel: "Agents we build:",
    caps: ["HR & IT helpdesk agents", "Finance & procurement copilots", "Knowledge assistants", "Employee onboarding"],
  },
] as const

export const heroProductCards = [
  {
    href: "#pre-built-agents",
    title: "Pre-built agent patterns",
    body: "HR, IT, finance, and customer ops accelerators on Copilot Studio and Power Automate.",
    rive: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/69942ca43878add673c056c0_Pre_built_applications.riv",
    delay: "3",
  },
  {
    href: "#integration-accelerators",
    title: "Integration accelerators",
    body: "SharePoint, Dataverse, Fabric, and line-of-business APIs wired into agent context.",
    rive: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/69933a25e901a06cbc06c28b_Accelerator_application.riv",
    delay: "7",
  },
  {
    href: "#custom-agent-systems",
    title: "Custom agent systems",
    body: "Multi-agent orchestration, RAG pipelines, and human-in-the-loop governance.",
    rive: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/69942ca45c9fb7ab98c06f1e_Tailored_applications.riv",
    delay: "7",
  },
] as const

const CDN_EC = "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b"

/** Explore Products section */
export const exploreProductsHeader = {
  heading: "Drive faster business outcomes in customer service and employee productivity.",
}

export const exploreTabButtons = [
  { label: "Pre-built Applications", href: "#Pre-built-Applications" },
  { label: "Application Accelerators", href: "#Application-Accelerators" },
  { label: "Tailored Applications", href: "#Tailored-Applications" },
  { label: "Agent Platform { Artemis }", href: "#Artemis", isNew: true },
] as const

export const exploreProductCards = [
  {
    id: "banking",
    industry: "Banking",
    desc: "Coordinate self-service and agent support with shared context, consistency, and built-in compliance.",
    learnHref: "/ai-for-service/ai-for-banking",
    guideHref: "/e-guides/agentic-ai-in-banking",
    guideLabel: "Guide: Banking",
    img: `${CDN_EC}/69860a42eef109546eda2fed_AI%20for%20Banking%20Screen.webp`,
    img500: `${CDN_EC}/69860a42eef109546eda2fed_AI%20for%20Banking%20Screen-p-500.webp`,
  },
  {
    id: "healthcare",
    industry: "Healthcare",
    desc: "Enable 24/7 patient and member self-service and reduce staff burden with HIPAA-compliant intelligent assistance.",
    learnHref: "/ai-for-service/ai-for-healthcare",
    guideHref: "/e-guides/agentic-ai-in-healthcare",
    guideLabel: "Guide: Healthcare",
    img: `${CDN_EC}/69860a43383b29c2bdcad64d_0efa01f4fec4684336096ceb5ea54a64_AI%20for%20Healthcare%20Screen.webp`,
    img500: `${CDN_EC}/69860a43383b29c2bdcad64d_0efa01f4fec4684336096ceb5ea54a64_AI%20for%20Healthcare%20Screen-p-500.webp`,
  },
  {
    id: "retail",
    industry: "Retail",
    desc: "Frictionless shopping and optimized operations with instant, personalized support at every touchpoint.",
    learnHref: "/ai-for-service/ai-for-retail",
    guideHref: "/e-guides/ai-for-retail-operations",
    guideLabel: "Guide: Retail",
    img: `${CDN_EC}/69860a48529a45f1c4084731_eeccd0d9ae87ba882f4ca184b420fb3e_AI%20for%20Retail%20Screen.webp`,
    img500: `${CDN_EC}/69860a48529a45f1c4084731_eeccd0d9ae87ba882f4ca184b420fb3e_AI%20for%20Retail%20Screen-p-500.webp`,
  },
  {
    id: "it",
    industry: "IT",
    desc: "Resolve incidents, reduce ticket volume, and deliver 24/7 IT support",
    learnHref: "/ai-for-work/ai-for-it",
    guideHref: null as string | null,
    guideLabel: null as string | null,
    img: `${CDN_EC}/69860a49ec663d66128fa180_AI%20for%20IT%20Screen.webp`,
    img500: `${CDN_EC}/69860a49ec663d66128fa180_AI%20for%20IT%20Screen-p-500.webp`,
  },
]

/** Proof section — analyst reports */
export const analystReports = [
  {
    tab: "Forrester CAI platforms",
    heading: "named a leader in the Forrester Wave™ Cognitive Search Platforms, Q4 2025",
    body: "The Forrester Wave™ for Conversational AI for Customer Service evaluates leading platforms that help organizations deliver AI-powered customer self-service across digital and voice channels.",
    ctaLabel: "GET ACCESS TO THE REPORT",
    ctaHref: "/ai-research-reports/kore-ai-named-a-leader-in-the-forrester-wave-conversational-ai-platforms-for-customer-service-q2-2026",
    img: `${CDN_EC}/69e72dfddcf9789de3939ad2_Forrester%20Wave%202026.png`,
    img500: `${CDN_EC}/69e72dfddcf9789de3939ad2_Forrester%20Wave%202026-p-500.png`,
    imgClass: "img-contain",
  },
  {
    tab: "Gartner CAI platforms",
    heading: "named a leader in the 2025 Gartner® Magic Quadrant™",
    body: "The Gartner® Magic Quadrant™ for Conversational AI Platforms now includes conversational AI agents and tools increasingly leveraging generative AI.",
    ctaLabel: "Access the Report",
    ctaHref: "/ai-research-reports/leader-gartner-magic-quadrant-conversational-ai-2025",
    img: `${CDN_EC}/68c10ed7030fe3b28f506940_Magic_Quadrant_for_Conversational_AI_Platforms.png`,
    img500: `${CDN_EC}/68c10ed7030fe3b28f506940_Magic_Quadrant_for_Conversational_AI_Platforms-p-500.png`,
    imgClass: "",
  },
  {
    tab: "Agentic AI Products",
    heading: "named a leader in Everest Group's Agentic AI Products PEAK Matrix® Assessment 2026",
    body: "The Everest Group Agentic AI Products PEAK Matrix® Assessment evaluates leading enterprise platforms that enable organizations to build, orchestrate, deploy, and manage AI agents.",
    ctaLabel: "Access the report",
    ctaHref: "/ai-research-reports/kore-ai-named-a-leader-in-everest-groups-agentic-ai-products-peak-matrix-assessment-2026",
    img: `${CDN_EC}/6a1d4c946bbce8dec1939c1c_Kore.ai%20named%20a%20Leader%20in%20Everest%20Group%27s%20Agentic%20AI%20Products%20PEAK%20Matrix%C2%AE%20Assessment%202026-p-800.jpg`,
    img500: `${CDN_EC}/6a1d4c946bbce8dec1939c1c_Kore.ai%20named%20a%20Leader%20in%20Everest%20Group%27s%20Agentic%20AI%20Products%20PEAK%20Matrix%C2%AE%20Assessment%202026-p-500.jpg`,
    imgClass: "",
  },
  {
    tab: "Cognitive Search platforms",
    heading: "named a leader in the Forrester Wave™ Cognitive Search Platforms",
    body: "The Forrester Wave™ for Cognitive Search evaluates platforms that power enterprise search, knowledge retrieval, and AI-driven question answering.",
    ctaLabel: "Access the Report",
    ctaHref: "/ai-research-reports",
    img: `${CDN_EC}/69e72dfddcf9789de3939ad2_Forrester%20Wave%202026.png`,
    img500: `${CDN_EC}/69e72dfddcf9789de3939ad2_Forrester%20Wave%202026-p-500.png`,
    imgClass: "img-contain",
  },
]

/** Testimonials */
export const testimonials = [
  { company: "AWS", quote: "As a global leader in AI, we saw a clear opportunity to bring that leadership into our own workplace. Our work with Kore.ai shows what's possible when you use AI not to replace people, but to enhance how they work, connect, and lead.", name: "Chris Casey", title: "Head of AWS Partnerships, Asia-Pacific and Japan" },
  { company: "AMD", quote: "As a global leader in AI, we saw a clear opportunity to bring that leadership into our own workplace. Our work with Kore.ai shows what's possible when you use AI not to replace people, but to enhance how they work, connect, and lead.", name: "Robert Gama", title: "SVP & Chief Human Resources Officer" },
  { company: "Boardwalk REIT", quote: "At Boardwalk, our commitment has always been to put residents first. Partnering with Kore.ai amplified our ability to deliver empathetic, timely service at scale. This is more than technology; it's a foundation for smarter, more connected community experience.", name: "Karine Dal Collo", title: "Director, Customer Service" },
  { company: "Autodoc", quote: "We are passionate about using technology to empower our people. That's why we partnered with Kore.ai to integrate AI into our customer and employee support operations. We have observed 74% first-call resolution and significant savings.", name: "Yuliya Teteryuk", title: "Customer Care Director" },
  { company: "AMD", quote: "We knew this wasn't just about automating tasks — it was about creating a smarter, more intuitive HR experience. By designing with our employees in mind, we've built a solution that's fast, reliable, and ready to evolve with our business.", name: "Lesa Sayer", title: "CVP, Global HR Shared Services" },
  { company: "Guidewell", quote: "This is about raising the bar — not just implementing technology, but evolving how we deliver healthcare support. With Kore.ai, we've moved from siloed experiences to a true ecosystem that's modern, scalable, and member-centric.", name: "Anne Hoverson", title: "VP, Digital Transformation & Strategy" },
  { company: "Deutsche Bank", quote: "I have the honour of representing Deutsche Bank HR, sharing our AI journey — from a humble FAQ chatbot in one region back in 2020 to a multi-jurisdiction automation strategy by 2025.", name: "Paul Hewitt", title: "Head of AI Innovation & Digital Employee Experience, HR" },
  { company: "Eli Lilly", quote: "AI transformed our Tech@Lilly service desk, now handling 70% of requests, enabling colleagues to maximize productivity.", name: "Michael Leist", title: "Associate Director - Tech" },
]

/** Strategic Partners */
export const strategicPartners = [
  {
    img: `${CDN_EC}/68acb73e632d51db064e1b3b_Frame%201984079612.avif`,
    body: "Deploy the Kore.ai Agent Platform and AI solutions within Microsoft environments including Azure AI Foundry, Microsoft Teams, Microsoft 365 Copilot, and Microsoft Copilot Studio to see AI value faster from your AI business use cases.",
    ctaPrimary: { label: "Read more", href: "/news/kore-ai-forges-strategic-partnership-with-microsoft-to-accelerate-enterprise-ai-transformation" },
    ctaSecondary: { label: "AZURE MARKETPLACE", href: "https://azuremarketplace.microsoft.com/en-us/marketplace/apps?search=kore.ai&page=1" },
  },
  {
    img: `${CDN_EC}/68acb73efa1938400f416b0b_Frame%201984079611.avif`,
    body: "The Kore.ai Agent Platform and AI solutions are integrated with AWS services including Amazon Bedrock, Amazon Q and Amazon Connect to accelerate the deployment of AWS AI tools across business use cases.",
    ctaPrimary: { label: "Read more", href: "/news/kore-ai-announces-strategic-collaboration-agreement-with-aws-to-accelerate-enterprise-ai-adoption" },
    ctaSecondary: { label: "AWS MARKETPLACE", href: "https://aws.amazon.com/marketplace/seller-profile?id=seller-ihhlsmvs4dyow" },
  },
]

/** Insights / blog posts */
export const insightsPosts = [
  {
    href: "/ai-insights/configured-not-coded-the-engineering-discipline-gap-in-agent-development",
    img: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfcec3/691463d2d3afc6512828bbda_AI%20Insights%20Thumbnail%2009.webp",
    date: "May 15, 2026",
    readTime: null as string | null,
    title: "Configured, not coded. The engineering discipline gap in agent development",
    featured: true,
  },
  {
    href: "/ai-insights/can-todays-ai-agents-survive-their-own-runtime",
    img: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfcec3/6a072ac99e4c9c7cab3defb2_AI%20Insights%20Thumbnail%2005.webp",
    date: "May 15, 2026",
    readTime: null as string | null,
    title: "Can Today's AI Agents Survive Their Own Runtime?",
    featured: false,
  },
  {
    href: "/ai-insights/whats-new-in-ai-for-work-features-that-drive-enterprise-productivity",
    img: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfcec3/6900c68c16d8a7cd9f3fa6ed_AI%20Insights%20Thumbnail%2006.webp",
    date: "February 20, 2026",
    readTime: "8 Min",
    title: "What's new in AI for Work: features that drive enterprise productivity",
    featured: false,
  },
  {
    href: "/ai-insights/parallel-agent-processing",
    img: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfcec3/68fa2b1e71584b6d574a1c6e_AI%20Insights%20Abstract%2007.webp",
    date: "January 16, 2026",
    readTime: "6 Min",
    title: "Parallel Agent Processing",
    featured: false,
  },
  {
    href: "/ai-insights/ai-productivity-paradox",
    img: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfcec3/68c27b14f28aa19ae7a18ca4_AI%20Insights%20Thumbnail%2001.webp",
    date: "January 12, 2026",
    readTime: null as string | null,
    title: "The AI productivity paradox: why employees are moving faster than enterprises",
    featured: false,
  },
]
