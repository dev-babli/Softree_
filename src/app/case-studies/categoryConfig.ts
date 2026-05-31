export type CaseStudyCategoryKey =
  | "ai"
  | "power-platform"
  | "sharepoint"
  | "web"
  | "mobile"
  | "data-analytics"

export const CASE_STUDY_CATEGORY_KEYS: CaseStudyCategoryKey[] = [
  "ai",
  "power-platform",
  "sharepoint",
  "web",
  "mobile",
  "data-analytics",
]

export function isCaseStudyCategory(value: string): value is CaseStudyCategoryKey {
  return CASE_STUDY_CATEGORY_KEYS.includes(value as CaseStudyCategoryKey)
}

type CategoryFAQ = {
  id: number
  serial: string
  question: string
  answer: string
}

export type CaseStudyCategoryConfig = {
  key: CaseStudyCategoryKey
  title: string
  titleItalic: string
  eyebrow: string
  description: string
  accentColor: string
  heroStat: string
  heroStatLabel: string
  projectCount: number
  sectionTitle: string
  sectionSubtitle: string
  proofChallenge: string
  proofSolution: string
  proofQuote: string
  proofName: string
  proofRole: string
  metaTitle: string
  metaDescription: string
  faqs: CategoryFAQ[]
}

export const CASE_STUDY_CATEGORY_CONFIG: Record<CaseStudyCategoryKey, CaseStudyCategoryConfig> = {
  ai: {
    key: "ai",
    title: "AI",
    titleItalic: "case studies",
    eyebrow: "Artificial Intelligence · Machine Learning",
    description:
      "Real-world AI solutions engineered to automate workflows, enhance decision-making, and drive measurable business impact across industries.",
    accentColor: "#8B5CF6",
    heroStat: "412%",
    heroStatLabel: "ROI achieved for Enterprise AI Decision Platform",
    projectCount: 25,
    sectionTitle: "AI & machine learning projects",
    sectionSubtitle:
      "Generative AI, predictive analytics, and intelligent automation delivering transformative results.",
    proofChallenge: "Ready to turn your data into a competitive advantage?",
    proofSolution:
      "Every AI project above started with understanding a specific business problem — not a technology. Let's find yours.",
    proofQuote:
      "The AI decision platform delivered 412% ROI in year one. We now make faster, more accurate decisions at every level.",
    proofName: "Chief Analytics Officer",
    proofRole: "Enterprise Client · Financial Services",
    metaTitle: "AI Case Studies",
    metaDescription:
      "Explore how Softree Technology delivers AI-powered solutions — recommendation engines, chatbots, computer vision, and intelligent automation driving measurable ROI.",
    faqs: [
      {
        id: 1,
        serial: "question 01",
        question: "What AI projects are featured in your case studies?",
        answer:
          "Our AI case studies showcase generative AI solutions, AI agents, intelligent automation, and machine learning applications with measurable business outcomes.",
      },
      {
        id: 2,
        serial: "question 02",
        question: "What AI technologies do you use in your projects?",
        answer:
          "We use OpenAI, Azure OpenAI, custom LLMs, and machine learning frameworks tailored to each client's stack and compliance requirements.",
      },
      {
        id: 3,
        serial: "question 03",
        question: "How do you measure success in AI projects?",
        answer:
          "We track accuracy, efficiency gains, cost savings, and user satisfaction — each case study includes quantitative metrics and qualitative feedback.",
      },
    ],
  },
  web: {
    key: "web",
    title: "Web",
    titleItalic: "case studies",
    eyebrow: "Web Development · Modern Platforms",
    description:
      "Real-world web platforms engineered for performance, scalability, and measurable business growth.",
    accentColor: "#1852FF",
    heroStat: "+210%",
    heroStatLabel: "online bookings for Auto Repair Pro",
    projectCount: 40,
    sectionTitle: "Web development projects",
    sectionSubtitle:
      "Enterprise platforms, SaaS apps, and marketing websites delivering real business outcomes.",
    proofChallenge: "Need a web platform that actually moves the numbers?",
    proofSolution:
      "Every project above started with a free consultation. We scope, build, and deliver — then show you the metrics that matter.",
    proofQuote:
      "Our online bookings jumped 210% in the first quarter. The ROI paid for the project in 6 weeks.",
    proofName: "Auto Repair Pro",
    proofRole: "Service Business · United States",
    metaTitle: "Web Development Case Studies",
    metaDescription:
      "See how Softree Technology builds high-performance web applications — React, Next.js, and full-stack solutions delivering real business outcomes.",
    faqs: [
      {
        id: 1,
        serial: "question 01",
        question: "What types of web application case studies do you feature?",
        answer:
          "We showcase enterprise web applications, SaaS platforms, e-commerce solutions, and custom web portals with clear before-and-after outcomes.",
      },
      {
        id: 2,
        serial: "question 02",
        question: "What technologies are used in your web application projects?",
        answer:
          "We use React, Next.js, Node.js, TypeScript, and cloud platforms like AWS and Azure depending on scale and compliance needs.",
      },
      {
        id: 3,
        serial: "question 03",
        question: "How do you measure success in web application projects?",
        answer:
          "Performance, adoption, conversion, and operational efficiency — each case study highlights the metrics that mattered to the client.",
      },
    ],
  },
  mobile: {
    key: "mobile",
    title: "Mobile",
    titleItalic: "case studies",
    eyebrow: "Mobile Development · iOS & Android",
    description:
      "Native and cross-platform mobile products built for reliability, engagement, and measurable growth.",
    accentColor: "#EC4899",
    heroStat: "4.8★",
    heroStatLabel: "average app store rating across recent launches",
    projectCount: 30,
    sectionTitle: "Mobile app projects",
    sectionSubtitle:
      "Consumer and enterprise apps with secure backends, payments, and real-time experiences.",
    proofChallenge: "Launching a mobile product that users actually keep?",
    proofSolution:
      "We design, build, and ship mobile apps with the infrastructure to scale — from MVP to enterprise rollout.",
    proofQuote:
      "The app handled peak traffic without downtime and cut support tickets by 40% in the first month.",
    proofName: "Product Director",
    proofRole: "Healthcare · United States",
    metaTitle: "Mobile App Case Studies",
    metaDescription:
      "Explore Softree mobile app case studies — iOS, Android, and cross-platform solutions with secure backends and real business outcomes.",
    faqs: [
      {
        id: 1,
        serial: "question 01",
        question: "Do you build native or cross-platform mobile apps?",
        answer:
          "Both — we choose the stack based on performance, timeline, and maintenance requirements for each product.",
      },
      {
        id: 2,
        serial: "question 02",
        question: "Can you integrate payments and push notifications?",
        answer:
          "Yes. Our mobile case studies include payment gateways, push notifications, offline sync, and enterprise SSO integrations.",
      },
    ],
  },
  "power-platform": {
    key: "power-platform",
    title: "Power Platform",
    titleItalic: "case studies",
    eyebrow: "Power Apps · Power Automate · Dataverse",
    description:
      "Low-code solutions that streamline operations, automate workflows, and connect data across the Microsoft ecosystem.",
    accentColor: "#742774",
    heroStat: "60%",
    heroStatLabel: "reduction in manual data entry for enterprise clients",
    projectCount: 35,
    sectionTitle: "Power Platform projects",
    sectionSubtitle:
      "Canvas apps, model-driven apps, and automation flows delivering enterprise ROI.",
    proofChallenge: "Still running critical processes on spreadsheets?",
    proofSolution:
      "We modernize operations with Power Platform — scoped sprints, governed delivery, and measurable efficiency gains.",
    proofQuote:
      "We replaced five manual trackers with one Power App and cut processing time in half.",
    proofName: "Operations Lead",
    proofRole: "Enterprise · Manufacturing",
    metaTitle: "Power Platform Case Studies",
    metaDescription:
      "Power Apps, Power Automate, and Dataverse case studies from Softree Technology — real low-code outcomes for enterprise teams.",
    faqs: [
      {
        id: 1,
        serial: "question 01",
        question: "Which Power Platform products do you implement?",
        answer:
          "Power Apps, Power Automate, Power BI integrations, and Dataverse — often combined with SharePoint and Microsoft 365.",
      },
      {
        id: 2,
        serial: "question 02",
        question: "How fast can a Power Platform MVP launch?",
        answer:
          "Many engagements ship a production-ready MVP in 4–8 weeks depending on integrations and governance requirements.",
      },
    ],
  },
  sharepoint: {
    key: "sharepoint",
    title: "SharePoint",
    titleItalic: "case studies",
    eyebrow: "SharePoint Online · SPFx · Microsoft 365",
    description:
      "Intranets, document management, and custom SPFx experiences that improve collaboration at enterprise scale.",
    accentColor: "#038387",
    heroStat: "50%",
    heroStatLabel: "faster document retrieval after SPFx modernization",
    projectCount: 28,
    sectionTitle: "SharePoint & M365 projects",
    sectionSubtitle:
      "SPFx extensions, migration programs, and collaboration portals with measurable adoption gains.",
    proofChallenge: "SharePoint feeling slow, fragmented, or hard to adopt?",
    proofSolution:
      "We redesign information architecture, automate workflows, and extend SharePoint with modern SPFx components.",
    proofQuote:
      "Employees found what they needed twice as fast after the new intranet launched.",
    proofName: "Digital Workplace Manager",
    proofRole: "Enterprise · Europe",
    metaTitle: "SharePoint Case Studies",
    metaDescription:
      "SharePoint and Microsoft 365 case studies — SPFx, intranet modernization, and collaboration solutions from Softree Technology.",
    faqs: [
      {
        id: 1,
        serial: "question 01",
        question: "Do you build custom SPFx web parts?",
        answer:
          "Yes — application customizers, web parts, and extensions using React, Fluent UI, and the SharePoint Framework.",
      },
      {
        id: 2,
        serial: "question 02",
        question: "Can you migrate legacy SharePoint sites?",
        answer:
          "We plan and execute migrations to SharePoint Online with minimal downtime and clear governance models.",
      },
    ],
  },
  "data-analytics": {
    key: "data-analytics",
    title: "Data & Analytics",
    titleItalic: "case studies",
    eyebrow: "Power BI · Fabric · Modern Data Platforms",
    description:
      "Analytics programs that turn fragmented data into dashboards, forecasts, and decisions leaders trust.",
    accentColor: "#0F5CC0",
    heroStat: "3x",
    heroStatLabel: "faster reporting cycles after Fabric implementation",
    projectCount: 20,
    sectionTitle: "Data & analytics projects",
    sectionSubtitle:
      "Warehousing, BI dashboards, and ML pipelines with clear executive visibility.",
    proofChallenge: "Leaders waiting weeks for numbers that should be real-time?",
    proofSolution:
      "We unify data sources, model metrics correctly, and ship dashboards teams actually use every day.",
    proofQuote:
      "Executive reporting went from monthly spreadsheets to live dashboards in under ten weeks.",
    proofName: "VP of Data",
    proofRole: "Retail · Global",
    metaTitle: "Data Analytics Case Studies",
    metaDescription:
      "Data analytics and BI case studies — Power BI, Microsoft Fabric, and modern data platform outcomes from Softree Technology.",
    faqs: [
      {
        id: 1,
        serial: "question 01",
        question: "Which analytics platforms do you work with?",
        answer:
          "Power BI, Microsoft Fabric, Azure Synapse, Databricks, and Snowflake depending on scale and existing investments.",
      },
      {
        id: 2,
        serial: "question 02",
        question: "Do you help with data governance?",
        answer:
          "Yes — we define semantic models, access policies, and refresh pipelines so analytics stays trustworthy as you scale.",
      },
    ],
  },
}

export function getCaseStudyCategoryConfig(
  category: string,
): CaseStudyCategoryConfig | null {
  if (!isCaseStudyCategory(category)) return null
  return CASE_STUDY_CATEGORY_CONFIG[category]
}

export function buildCaseStudyCategoryMetadata(category: CaseStudyCategoryKey) {
  const config = CASE_STUDY_CATEGORY_CONFIG[category]
  const canonical = `https://www.softreetechnology.com/case-studies/${category}`

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: `${config.metaTitle} | Softree Technology`,
      description: config.metaDescription,
      url: canonical,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: config.metaTitle }],
    },
  }
}
