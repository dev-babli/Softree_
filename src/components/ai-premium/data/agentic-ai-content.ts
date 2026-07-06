import {
  BarChart3,
  Banknote,
  BrainCircuit,
  Building2,
  ChefHat,
  Code2,
  Cpu,
  Database,
  Dumbbell,
  Droplet,
  Factory,
  Flame,
  Globe,
  GraduationCap,
  HardHat,
  HeartPulse,
  Landmark,
  MessageSquare,
  Network,
  Plane,
  RefreshCw,
  Rocket,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Sliders,
  Smartphone,
  Trophy,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react"

export const agenticHero = {
  pill: "Agentic AI",
  headline: "Autonomous agents built for",
  headlineAccent: "enterprise certainty.",
  subhead:
    "Design, deploy, and govern AI agents across Microsoft Copilot Studio, Azure AI, and Power Platform, with offshore delivery speed and production-grade guardrails.",
  announcement: {
    badge: "Microsoft stack",
    title: "Copilot + Power Platform agent programs",
    body: "We implement agentic workflows your IT team can audit, scale, and operate, not demos that stall in pilot.",
    href: "/case-studies/ai",
  },
  cards: [
    {
      id: "prebuilt",
      title: "Pre-built agent patterns",
      body: "HR, IT, finance, and customer ops accelerators on Copilot Studio and Power Automate.",
    },
    {
      id: "accelerators",
      title: "Integration accelerators",
      body: "SharePoint, Dataverse, Fabric, and line-of-business APIs wired into agent context.",
    },
    {
      id: "custom",
      title: "Custom agent systems",
      body: "Multi-agent orchestration, RAG pipelines, and human-in-the-loop governance.",
    },
  ],
  stats: [
    { value: "100+", label: "AI engineers" },
    { value: "4–16", label: "Weeks to production" },
    { value: "ISO", label: "27001 delivery" },
  ],
} as const

export const heroTestimonials = [
  {
    text: "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    name: "Darrell Trimble",
    role: "CEO",
    location: "California",
    company: "SP Marketplace",
  },
  {
    text: "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication.",
    name: "Natasha Adams",
    role: "Partner",
    location: "Virginia",
    company: "Wicked Point LLC",
  },
  {
    text: "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue, really makes a difference.",
    name: "Arkady Fedorovtsjev",
    role: "IT Specialist",
    location: "Netherlands",
    company: "ECG International",
  },
] as const

/** Kore "What changes" outcome columns + stat trio */
export const outcomePillars = [
  {
    brace: "Outcomes in weeks",
    body: "Softree handles Microsoft stack plumbing; your team starts at business logic. Agents ship faster with offshore velocity.",
    stat: "4×",
    statLabel: "faster time to production",
  },
  {
    brace: "Predictability at scale",
    body: "Every agent is defined, tested, and validated before deployment, so pilot success survives production load.",
    stat: "0",
    statLabel: "surprises in production",
  },
  {
    brace: "Security + governance",
    body: "DLP, Entra ID, and approval gates keep every action within policy, with full audit trails your IT team trusts.",
    stat: "100%",
    statLabel: "audited agent sessions",
  },
] as const

export const heroPhases = [
  {
    id: "build",
    label: "Build",
    title: "Build with Microsoft AI",
    body: "Copilot Studio, Azure AI, and Power Platform: from idea to governed agent in weeks, not quarters.",
  },
  {
    id: "scale",
    label: "Scale",
    title: "Scale with provable reliability",
    body: "Deploy across Teams, SharePoint, and line-of-business systems with observability built in from day one.",
  },
  {
    id: "optimize",
    label: "Optimize",
    title: "Optimize with every run",
    body: "Trace decisions, tune prompts, and improve ROI using real production signals, not guesswork.",
  },
] as const

/** Kore k2-scroll-tabs — bg URLs from aipage.html (AI-tab-bg-01..06) */
export const scrollCapabilityTabs = [
  {
    id: "build",
    verb: "Build",
    eyebrow: "Build with AI",
    title: "Copilot Studio patterns that ship in weeks.",
    body: "Pre-built agent accelerators on Microsoft 365: HR, IT, finance, and customer ops with governance baked in.",
    bg: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200eedc739e9f01c828053_AI-tab-bg-01.webp",
  },
  {
    id: "orchestrate",
    verb: "Orchestrate",
    eyebrow: "Orchestrate with AI",
    title: "Multi-agent handoffs your operators can trust.",
    body: "Specialist agents with memory, escalation paths, and clear ownership, not one brittle mega-prompt.",
    bg: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f1c7625f3aa1c41780b_AI-tab-bg-02.webp",
  },
  {
    id: "prove",
    verb: "Prove",
    eyebrow: "Prove with AI",
    title: "Deterministic guardrails, not probabilistic hope.",
    body: "DLP, Entra ID, and approval gates enforced before agents act, with auditable proof for IT and compliance.",
    bg: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f48a49ebaf1179b9047_AI-tab-bg-03.webp",
  },
  {
    id: "test",
    verb: "Test",
    eyebrow: "Test with AI",
    title: "Zero production surprises.",
    body: "Eval suites across personas and edge cases before deployment, and after every model change.",
    bg: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f647614509d2bdcbfe6_AI-tab-bg-04.webp",
  },
  {
    id: "deploy",
    verb: "Deploy",
    eyebrow: "Deploy with AI",
    title: "System-aware vs. operating blind.",
    body: "Agents wired to SharePoint, Dataverse, Fabric, and your APIs, deployed across Teams and channels you already use.",
    bg: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200f92d194fe7cd0d896f1_AI-tab-bg-05.webp",
  },
  {
    id: "govern",
    verb: "Govern",
    eyebrow: "Govern with AI",
    title: "100% of agent sessions traced.",
    body: "Observability, evals, and audit logs so operators see what happened and why, not sampled 5–10%.",
    bg: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a200fc4789fbc14787c3847_AI-tab-bg-06.webp",
  },
] as const

export const stackShowcaseCards = [
  {
    id: 1,
    img: "/images/case-study/power-apps/ai.png",
    title: "AI Copilot",
    desc: "Assist users with contextual intelligence and workflow automation inside Microsoft 365.",
  },
  {
    id: 2,
    img: "/service_image/ai.jpg",
    title: "Agent Builder",
    desc: "Create autonomous agents that orchestrate tasks, tools, and approvals around the clock.",
  },
  {
    id: 3,
    img: "/images/webanalyser-live.png",
    title: "Agent Analytics",
    desc: "Track decisions, actions, and business outcomes with observability your operators trust.",
  },
] as const

export const platformPillars = [
  {
    title: "Multi-agent orchestration",
    body: "Coordinate specialist agents with clear handoffs, memory, and escalation paths.",
  },
  {
    title: "Enterprise context layer",
    body: "Ground agents in SharePoint, Dataverse, Fabric, and your APIs, not generic chat.",
  },
  {
    title: "No-code + pro-code",
    body: "Copilot Studio for speed; Azure and Python when you need custom reasoning.",
  },
  {
    title: "Observability",
    body: "Tracing, evals, and cost dashboards so operators see what agents do.",
  },
  {
    title: "Safety & governance",
    body: "DLP, Entra ID, approval gates, and audit logs aligned to your policies.",
  },
  {
    title: "Offshore velocity",
    body: "Senior squads in India, white-label ready for agencies and system integrators.",
  },
] as const

export type IndustryTabId = "banking" | "healthcare" | "manufacturing" | "retail" | "it"

export const industryTabs: Array<{
  id: IndustryTabId
  label: string
  headline: string
  body: string
  outcomes: string[]
  logos: string[]
}> = [
  {
    id: "banking",
    label: "Banking",
    headline: "Compliance-ready agents for regulated workflows",
    body: "KYC research, policy Q&A, and advisor copilots with citation trails and role-based access.",
    outcomes: ["Faster policy answers", "Advisor time back", "Audit-friendly logs"],
    logos: ["Microsoft", "SharePoint", "Power BI", "Azure OpenAI"],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    headline: "Clinical ops agents with PHI guardrails",
    body: "Prior auth prep, scheduling assistants, and internal knowledge search across SOPs.",
    outcomes: ["Reduced admin load", "Consistent SOP adherence", "Secure data boundaries"],
    logos: ["Teams", "Dataverse", "Fabric", "Copilot Studio"],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    headline: "Plant-floor intelligence without brittle RPA",
    body: "Maintenance copilots, quality checks, and supply-chain exception handling.",
    outcomes: ["Less downtime", "Faster root-cause analysis", "Connected shop-floor data"],
    logos: ["Power Automate", "Azure IoT", "SharePoint", "Power Apps"],
  },
  {
    id: "retail",
    label: "Retail",
    headline: "Commerce agents that know your catalog",
    body: "Support automation, merchandising insights, and store-ops assistants.",
    outcomes: ["Higher CSAT", "Faster issue resolution", "Unified product context"],
    logos: ["Dynamics 365", "Fabric", "Azure AI", "Power Pages"],
  },
  {
    id: "it",
    label: "IT & HR",
    headline: "Service desk agents employees actually use",
    body: "Ticket triage, access requests, and onboarding flows on Teams and SharePoint.",
    outcomes: ["Deflected L1 volume", "Faster provisioning", "Happier internal users"],
    logos: ["ServiceNow", "Entra ID", "Teams", "SharePoint"],
  },
]

export const techStackTools: Array<{
  icon: LucideIcon
  title: string
  tags: string[]
}> = [
  {
    icon: Code2,
    title: "Core Engineering & Languages",
    tags: ["Python", "TypeScript", "Go", "Rust", "Node.js"],
  },
  {
    icon: Network,
    title: "Agent Orchestration Frameworks",
    tags: ["LangChain", "AutoGen", "CrewAI", "Semantic Kernel", "OpenAI Functions"],
  },
  {
    icon: Cpu,
    title: "Reasoning & Decision Systems",
    tags: ["PyTorch", "TensorFlow", "vLLM", "Ray RLlib", "Gymnasium"],
  },
  {
    icon: Database,
    title: "Memory & Retrieval",
    tags: ["Pinecone", "Weaviate", "FAISS", "Chroma", "Redis"],
  },
  {
    icon: RefreshCw,
    title: "Enterprise Integrations",
    tags: ["REST", "GraphQL", "gRPC", "Kafka", "Apache Airflow"],
  },
  {
    icon: Shield,
    title: "Safety, Risk & Governance",
    tags: ["Guardrails AI", "NeMo Guardrails", "Pydantic", "Humanloop", "OpenAI Evals"],
  },
  {
    icon: BarChart3,
    title: "Observability & Optimization",
    tags: ["LangSmith", "Weights & Biases", "Arize AI", "Prometheus", "Grafana"],
  },
  {
    icon: BrainCircuit,
    title: "Foundation Models",
    tags: ["GPT-4", "Claude", "Llama", "Mistral", "Gemini"],
  },
]

export const enterpriseBenefits = {
  eyebrow: "Business impact",
  title: "Transforming operations with intelligent AI agents",
  intro:
    "Enterprise AI agents help organizations run smarter, faster, and more efficiently. By autonomously executing tasks, orchestrating workflows, and learning from data, they reduce operational overhead while empowering teams to focus on strategic initiatives.",
  left: [
    {
      title: "Operational Excellence",
      desc: "Agents monitor workflows, predict disruptions, and resolve inefficiencies to keep operations at peak performance.",
    },
    {
      title: "Insight-Led Decisions",
      desc: "Transform enterprise data into real-time intelligence that empowers leaders to act faster with confidence.",
    },
    {
      title: "Workforce Amplification",
      desc: "Free teams from repetitive effort so they focus on innovation while AI handles execution at scale.",
    },
  ],
  right: [
    {
      title: "Elastic Scalability",
      desc: "Expand or contract AI-driven operations in response to market dynamics without traditional resourcing delays.",
    },
    {
      title: "Adaptive Learning",
      desc: "With every interaction, agents refine understanding and improve performance aligned to business goals.",
    },
    {
      title: "Sustainable Advantage",
      desc: "Operationalizing AI early creates compounding gains in speed and efficiency competitors struggle to match.",
    },
  ],
} as const

export const frameworkSteps = [
  { step: "01", title: "Discover & prioritize", body: "Map ROI, risk, and data readiness for each agent use case." },
  { step: "02", title: "Design agent architecture", body: "Personas, tools, memory, and human approval points." },
  { step: "03", title: "Build & integrate", body: "Copilot Studio, Azure AI, Power Automate, and custom APIs." },
  { step: "04", title: "Evaluate & harden", body: "Red-team prompts, regression suites, and load testing." },
  { step: "05", title: "Operate & improve", body: "Monitoring, retraining, and expansion to new departments." },
] as const

export const aiServices = [
  {
    id: "01",
    title: "AI Strategy & Consulting",
    points: [
      "AI readiness and maturity assessment",
      "High-impact use case identification",
      "End-to-end transformation roadmaps",
      "ROI and governance frameworks",
    ],
  },
  {
    id: "02",
    title: "Generative AI Solutions",
    points: [
      "Custom GPT applications",
      "Copilots for support and ops",
      "Prompt engineering at scale",
      "Content automation pipelines",
    ],
  },
  {
    id: "03",
    title: "Machine Learning",
    points: [
      "Model development pipelines",
      "Predictive analytics",
      "Recommendation systems",
      "Evaluation and tuning",
    ],
  },
  {
    id: "04",
    title: "Computer Vision",
    points: [
      "Image classification",
      "Object detection and tracking",
      "Video analytics",
      "Quality inspection automation",
    ],
  },
  {
    id: "05",
    title: "AI for Product & UX",
    points: [
      "UI personalization",
      "Smart search and recommendations",
      "Voice-enabled interfaces",
      "Conversational assistants",
    ],
  },
  {
    id: "06",
    title: "AI Infrastructure",
    points: [
      "Cloud-native deployment",
      "MLOps and monitoring",
      "GPU optimization",
      "Resilient system architecture",
    ],
  },
] as const

export const processSteps = [
  { step: "01", title: "Discover goals", body: "Understand objectives, challenges, and success metrics." },
  { step: "02", title: "Prepare data", body: "Collect, clean, and structure data for intelligent automation." },
  { step: "03", title: "Design agents", body: "Build agents tailored to workflows and decision models." },
  { step: "04", title: "Integrate systems", body: "Connect enterprise tools, APIs, and environments." },
  { step: "05", title: "Launch & improve", body: "Deploy, monitor, and continuously optimize performance." },
] as const

export const whyChooseItems = [
  { icon: Rocket, title: "Agile engineering", desc: "Rapid iterations and modern delivery practices." },
  { icon: Users, title: "Leadership access", desc: "Direct communication with decision-makers." },
  { icon: ShieldCheck, title: "Trusted since 2013", desc: "A decade of proven enterprise delivery." },
  { icon: Sliders, title: "Flexible engagement", desc: "Scalable teams aligned to your business goals." },
] as const

export const clientReviews = [
  {
    name: "Natasha Adams",
    company: "Wicked Point LLC",
    rating: 5,
    comment:
      "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time.",
    location: "Virginia",
  },
  {
    name: "Arkady Fedorovtsjev",
    company: "ECG Group",
    rating: 5,
    comment:
      "Overall, we are satisfied with our collaboration in the past and your last action and response to our reported issue really makes a difference.",
    location: "Netherlands",
  },
  {
    name: "Darrell Trimble",
    company: "SP Marketplace",
    rating: 5,
    comment:
      "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
    location: "California",
  },
] as const

export const proofStats = [
  { value: "100+", label: "AI and data engineers", icon: Users },
  { value: "75+", label: "AI / ML models delivered", icon: BrainCircuit },
  { value: "30+", label: "Countries served", icon: Globe },
  { value: "13+", label: "Years delivering enterprise software", icon: Trophy },
] as const

export const industryFocusPills = [
  { title: "Aerospace & Defence", icon: Rocket },
  { title: "Industrial Manufacturing", icon: Factory },
  { title: "Insurtech", icon: Shield },
  { title: "Education", icon: GraduationCap },
  { title: "Travel", icon: Plane },
  { title: "Energy & Utilities", icon: Zap },
  { title: "Petrochemical", icon: Droplet },
  { title: "Fintech", icon: Landmark },
  { title: "Sports", icon: Trophy },
  { title: "Real Estate", icon: Building2 },
  { title: "Social Media", icon: MessageSquare },
  { title: "Oil & Gas", icon: Flame },
  { title: "Healthcare", icon: HeartPulse },
  { title: "Fitness", icon: Dumbbell },
  { title: "E-commerce", icon: ShoppingCart },
  { title: "Construction", icon: HardHat },
  { title: "Restaurant", icon: ChefHat },
  { title: "Telecom", icon: Smartphone },
  { title: "Banking", icon: Banknote },
] as const
