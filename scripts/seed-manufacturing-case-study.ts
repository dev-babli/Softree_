/**

 * Seed the manufacturing Power Platform reference case study with premium layout content.

 *

 * Usage: npm run sanity:seed-manufacturing-case-study

 */

import { createClient } from "@sanity/client"

import { loadEnvConfig } from "@next/env"



loadEnvConfig(process.cwd())



const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN

if (!token) {

  console.error("Missing SANITY_API_WRITE_TOKEN or SANITY_API_TOKEN")

  process.exit(1)

}



const client = createClient({

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "1zmh4sfw",

  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-21",

  token,

  useCdn: false,

})



const DOC_ID = "caseStudy-manufacturing-power-platform"

const SLUG = "power-platform-manufacturing-modernization"



const HERO_IMAGE =

  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80"



const doc = {

  _id: DOC_ID,

  _type: "caseStudy" as const,

  title: "Power Platform Modernization for a Global Manufacturing Company",

  slug: { _type: "slug" as const, current: SLUG },

  client: "Global Manufacturing Company",

  headerTitle: "Power Platform Modernization for a Global Manufacturing Company",

  excerpt:

    "Softree helped a global manufacturer replace fragmented spreadsheets and email workflows with a governed Power Platform ecosystem — delivering real-time visibility, faster approvals, and scalable low-code apps across North American operations.",

  category: "power-platform",

  industry: "Manufacturing",

  projectType: "Power Platform Implementation",

  region: "North America",

  location: "North America",

  projectDuration: "12 Weeks",

  teamSize: "8 Specialists",

  endUsers: "500+ Employees",

  accentColor: "#FF7A2F",

  detailLayout: "manufacturing-power-platform",

  status: "published",

  featured: true,

  publishedAt: "2025-11-15T10:00:00.000Z",

  mainImageUrl: HERO_IMAGE,

  technologies: ["Power Apps", "Power Automate", "Dataverse", "Power BI", "SharePoint", "Azure"],

  highlights: [

    { value: "75%", label: "Reduction in manual effort" },

    { value: "12 Weeks", label: "Project Duration" },

    { value: "500+", label: "Employees Empowered" },

  ],

  metrics: [

    { label: "Reduction in manual work", value: "75%" },

    { label: "Faster approvals", value: "60%" },

    { label: "Users adopted", value: "500+" },

    { label: "System availability", value: "99.9%" },

  ],

  challengeCards: [

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

  ],

  solutionArchitecture: [

    { title: "Power Apps", description: "Canvas and model-driven apps for plant floor and quality workflows." },

    { title: "Dataverse", description: "Governed data layer connecting ERP, MES, and operational records." },

    { title: "Power Automate", description: "Cloud flows for approvals, notifications, and compliance routing." },

    { title: "Power BI", description: "Executive and plant-level dashboards with drill-through analytics." },

  ],

  deliverables: [

    { title: "Operations Command Center", description: "Unified dashboard for plant managers with live production KPIs." },

    { title: "Automated Approval Flows", description: "Digital workflows replacing email-based sign-offs." },

    { title: "Quality Inspection App", description: "Mobile-first app for line-side quality checks with offline support." },

    { title: "Compliance Audit Portal", description: "Traceable audit logs and automated regulatory report generation." },

    { title: "Executive Analytics Suite", description: "Power BI workspace with role-based views for leadership." },

    { title: "Integration Framework", description: "Azure API layer connecting legacy ERP and MES systems to Dataverse." },

  ],

  beforeAfter: [

    { metric: "Report generation", before: "3–5 days manual", after: "Same-day automated" },

    { metric: "Approval cycle", before: "48+ hours via email", after: "Under 4 hours" },

    { metric: "Data accuracy", before: "~82% spreadsheet-based", after: "99%+ governed in Dataverse" },

    { metric: "App deployment", before: "6–9 months custom code", after: "8–12 weeks low-code" },

  ],

  galleryUrls: [

    {

      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",

      alt: "Executive dashboard",

      caption: "Executive Dashboard",

    },

    {

      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",

      alt: "Workflow automation",

      caption: "Workflow Automation",

    },

    {

      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80&sat=-20",

      alt: "Analytical dashboard",

      caption: "Analytical Dashboard",

    },

    {

      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",

      alt: "Mobile experience",

      caption: "Mobile Experience",

    },

  ],

  testimonial: {

    quote:

      "Softree transformed how our plants operate. We went from fragmented spreadsheets to a unified platform in weeks — and our teams adopted it because it was built for how they work on the floor.",

    name: "Director of Operations",

    role: "Director of Operations",

    company: "Global Manufacturing Company",

    location: "North America",

  },

  ctaHeadline: "Ready to modernize your business applications?",

  ctaSubtext:

    "Partner with Softree to design, build, and scale enterprise-grade Power Platform solutions tailored to your operations.",

  ctaButtonText: "Schedule a Consultation",

  metaTitle: "Power Platform Manufacturing Case Study | Softree Technology",

  metaDescription:

    "See how Softree modernized operations for a global manufacturer with Power Apps, Dataverse, Power Automate, and Power BI — 75% less manual work across 500+ users.",

}



async function main() {

  console.log(`Upserting case study: ${SLUG}`)

  await client.createOrReplace(doc)

  console.log(`Done. View at /case-studies/${SLUG}`)

}



main().catch((err) => {

  console.error(err)

  process.exit(1)

})


