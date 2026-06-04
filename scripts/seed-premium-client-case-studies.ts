/**
 * Premium client case studies — Softree editorial layout + Sanity-hosted imagery.
 * Does NOT use /public/Gallery/* office photos.
 *
 * Usage: npm run sanity:seed-premium-case-studies
 */
import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import { ptBullet, ptH3, ptP, ptQuote } from "./lib/portable-text-blocks";
import { uploadRemoteImage } from "./lib/upload-remote-image";
import {
  CASE_STUDY_STOCK,
  type CaseStudyImageTheme,
  themeForCaseStudySlug,
} from "../src/lib/case-study-stock-images";

loadEnvConfig(process.cwd());

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN or SANITY_API_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "1zmh4sfw",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-21",
  token,
  useCdn: false,
});

type GallerySeed = { url: string; alt: string; caption?: string };

type StudySeed = Record<string, unknown> & {
  _id: string;
  slug: { current: string };
  _gallerySeed?: GallerySeed[];
};

const STUDIES: StudySeed[] = [
  {
    _id: "caseStudy-wicked-point-power-platform",
    _type: "caseStudy",
    title: "62% Faster Approvals in 8 Weeks",
    slug: { _type: "slug", current: "wicked-point-power-platform-governance" },
    client: "Wicked Point LLC",
    detailLayout: "manufacturing-power-platform",
    storyType: "standard",
    heroLayout: "split",
    headerTitle: "Governed Power Platform estate — live in eight weeks",
    excerpt:
      "Softree stood up Power Apps, Dataverse, and Power Automate with ALM guardrails so Wicked Point could ship low-code solutions fast without losing control of data or approvals.",
    industry: "Professional Services",
    useCase: "Process Automation",
    companySize: "mid-market",
    location: "Virginia, United States",
    employees: "120+",
    scaleOfOperation: "Multi-site professional services across the U.S. East Coast",
    projectType: "Microsoft Power Platform",
    region: "North America",
    projectDuration: "8 Weeks",
    teamSize: "4 engineers + 1 solution architect",
    endUsers: "85+ staff",
    accentColor: "#FF7A2F",
    status: "published",
    featuredRank: 1,
    heroEyebrow: "Power Platform · Customer story",
    heroHeadline: "62% faster approvals in 8 weeks",
    publishedAt: "2026-02-18T10:00:00.000Z",
    technologies: ["Power Apps", "Power Automate", "Dataverse", "SharePoint", "Azure AD"],
    highlights: [
      { value: "62%", label: "Faster approval cycles" },
      { value: "8 wks", label: "Production go-live" },
      { value: "85+", label: "Daily active users" },
    ],
    metrics: [
      { label: "Manual processing reduced", value: "58%", description: "Quote-to-cash workflows" },
      { label: "Data accuracy in Dataverse", value: "99%+", description: "Governed single source" },
      { label: "Flow success rate", value: "99.5%", description: "First 30 days post-launch" },
      { label: "Shadow IT apps retired", value: "11", description: "Consolidated into catalog" },
    ],
    challengeSummary:
      "Intake lived in email and spreadsheets — leadership could not see bottlenecks until month-end, and makers had no safe path to production.",
    approachSummary:
      "We deployed a three-environment ALM model, solution-aware pipelines, and a connector catalog before opening the tenant to citizen developers.",
    outcomeSummary:
      "Intake, approvals, and executive dashboards now run on Dataverse with hourly refresh — makers onboard in under two hours.",
    challengeContent: [
      ptH3("When every team owns a different spreadsheet"),
      ptP(
        "Sales, delivery, and finance each tracked work in separate files. Compliance reviews meant exporting CSVs and reconciling by hand — a process that could not scale with new Virginia contracts.",
      ),
      ptBullet("Duplicate customer records ", "across CRM exports and local trackers."),
      ptBullet("Discount exceptions ", "stalled for days in personal inboxes."),
      ptBullet("Personal flows ", "connected to production without review or documentation."),
    ],
    approachContent: [
      ptH3("Governance that accelerates — not blocks"),
      ptP(
        "Softree paired environment strategy with reusable solution layers so Wicked Point could pilot in days and promote with audit trails.",
      ),
      ptBullet("Dev / Test / Prod ", "with DLP policies aligned to business units."),
      ptBullet("Managed solutions ", "for intake, routing, and leadership analytics."),
      ptBullet("Maker office hours ", "and a SharePoint playbook for guardrails."),
    ],
    outcomeContent: [
      ptH3("Outcomes leadership can see in the first quarter"),
      ptP(
        "Approval SLAs are visible in Power BI, and plant managers receive Teams cards when exceptions need attention — no more inbox archaeology.",
      ),
      ptQuote(
        "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time — the final product was exactly what we wanted.",
      ),
    ],
    challengeCards: [
      {
        title: "Shadow spreadsheets",
        description:
          "Critical KPIs were trapped in files that could not be audited, shared securely, or refreshed automatically.",
      },
      {
        title: "Approval sprawl",
        description:
          "Discount and scope exceptions waited days in inboxes with no SLA tracking or escalation path.",
      },
      {
        title: "Ungoverned makers",
        description:
          "Personal flows connected to production data without review, documentation, or lifecycle management.",
      },
    ],
    deliverables: [
      { title: "Intake canvas app", description: "Role-based mobile forms with offline-friendly capture." },
      { title: "Approval hub", description: "Adaptive Teams cards, escalations, and SLA timers." },
      { title: "Dataverse core", description: "Accounts, projects, and immutable approval history." },
      { title: "Executive dashboard", description: "Power BI with drill-through by region and service line." },
      { title: "ALM pipeline", description: "Solution checker gates and automated export/import." },
      { title: "Maker playbook", description: "Naming standards, connector catalog, and review checklist." },
    ],
    _gallerySeed: [
      { url: CASE_STUDY_STOCK["power-platform"].gallery[0], alt: "Analytics workspace", caption: "Operations analytics" },
      { url: CASE_STUDY_STOCK["power-platform"].gallery[1], alt: "Team collaboration", caption: "Maker enablement session" },
      { url: CASE_STUDY_STOCK["power-platform"].gallery[2], alt: "Engineering standup", caption: "Sprint planning" },
      { url: CASE_STUDY_STOCK["power-platform"].gallery[3], alt: "Executive review", caption: "Leadership dashboard review" },
    ],
    testimonial: {
      quote:
        "We had a very positive experience working with Softree Technology. The developers were responsive and delivery was on time. We appreciate the attention they gave our project and their great communication.",
      name: "Natasha Adams",
      role: "Operations Lead",
      company: "Wicked Point LLC",
      location: "Virginia",
    },
    faqs: [
      {
        question: "How long did governance take before users could build?",
        answer:
          "Environments, DLP, and ALM were live in week two. Citizen developers started pilot apps in week three with solution checker enforced on every export.",
      },
      {
        question: "Can this scale to additional regions?",
        answer:
          "Yes — the Dataverse model and solution layers were designed for regional configuration without forking the core apps.",
      },
    ],
    ctaHeadline: "Need Power Platform without the chaos?",
    ctaSubtext: "Softree designs ALM, DLP, and solution architecture so your makers ship safely.",
    ctaButtonText: "Talk to our Power Platform team",
    metaTitle: "Wicked Point: 62% Faster Approvals | Softree Case Study",
    metaDescription:
      "How Softree delivered governed Power Apps and Power Automate for Wicked Point LLC in 8 weeks with measurable outcomes.",
    relatedSlugs: [
      "ecg-group-ai-copilot-transformation",
      "sp-marketplace-installation-automation",
    ],
  },
  {
    _id: "caseStudy-ecg-ai-copilot",
    _type: "caseStudy",
    title: "40% Faster Resolution with Grounded Copilots",
    slug: { _type: "slug", current: "ecg-group-ai-copilot-transformation" },
    client: "ECG Group",
    detailLayout: "manufacturing-power-platform",
    storyType: "standard",
    heroLayout: "editorial",
    headerTitle: "Grounded M365 copilots with cited, auditable answers",
    excerpt:
      "Softree built retrieval-augmented copilots with entitlement-aware SharePoint indexes, human-in-the-loop escalation, and weekly knowledge gap reports for ECG's 1,200+ agents.",
    industry: "Financial Services",
    useCase: "AI Agents",
    companySize: "enterprise",
    location: "Amsterdam, Netherlands",
    employees: "2,800+",
    scaleOfOperation: "Pan-European B2B services with regulated client portfolios",
    projectType: "AI & Microsoft 365",
    region: "EMEA",
    projectDuration: "14 weeks",
    teamSize: "5 engineers + 1 AI architect",
    endUsers: "1,200+ knowledge workers",
    accentColor: "#FF7A2F",
    status: "published",
    featuredRank: 2,
    heroEyebrow: "AI · Financial services",
    heroHeadline: "40% faster ticket resolution",
    publishedAt: "2026-02-12T10:00:00.000Z",
    technologies: [
      "Microsoft Copilot Studio",
      "Azure OpenAI",
      "SharePoint",
      "Microsoft Graph",
      "Power Automate",
    ],
    highlights: [
      { value: "40%", label: "Faster tier-1 resolution" },
      { value: "100%", label: "Answers with citations" },
      { value: "14 wks", label: "Program delivery" },
    ],
    metrics: [
      { label: "Deflection rate", value: "38%", description: "Tier-1 handled by copilot" },
      { label: "CSAT (copilot)", value: "4.6/5", description: "Post-conversation survey" },
      { label: "Shadow bots retired", value: "12", description: "Consolidated to one program" },
      { label: "Knowledge gaps surfaced", value: "Weekly", description: "Automated content ops report" },
    ],
    challengeSummary:
      "Support teams re-answered the same policy questions while early M365 pilots lacked grounding — creating compliance risk when models hallucinated.",
    approachSummary:
      "We indexed approved SharePoint libraries with Graph-scoped permissions, ran red-team evaluation harnesses, and wired escalation to existing ITSM queues.",
    outcomeSummary:
      "ECG runs copilots with cited answers, regional data residency, and a feedback loop that feeds knowledge managers every Monday.",
    challengeContent: [
      ptH3("Pilot enthusiasm without production guardrails"),
      ptP(
        "Early copilots answered confidently but could not cite sources — unacceptable for client-facing policy workflows under EBA scrutiny.",
      ),
    ],
    approachContent: [
      ptH3("Grounded retrieval with human escalation"),
      ptP(
        "Chunking strategies respected library sensitivity tiers; every response includes source links and confidence metadata for reviewers.",
      ),
    ],
    outcomeContent: [
      ptH3("Trust and speed moved together"),
      ptP(
        "Median resolution time dropped from 18 hours to 11 while compliance reviewers gained citation trails for every automated response.",
      ),
      ptQuote("Overall, we are satisfied with our collaboration — your last action really makes a difference."),
    ],
    challengeCards: [
      {
        title: "Ungrounded pilots",
        description: "Early bots answered confidently without sources — unacceptable for regulated workflows.",
      },
      {
        title: "Permission blind spots",
        description: "Indexes ignored Graph entitlements, risking over-exposure of restricted libraries.",
      },
      {
        title: "Shadow automation",
        description: "A dozen unsanctioned bots created conflicting answers and audit gaps.",
      },
    ],
    deliverables: [
      { title: "Retrieval pipeline", description: "Permission-aware SharePoint indexes with chunk metadata." },
      { title: "Evaluation harness", description: "Red-team prompts and citation accuracy benchmarks." },
      { title: "Copilot Studio agents", description: "Tier-1 deflection with ITSM handoff." },
      { title: "Feedback loop", description: "In-product thumbs and weekly gap reports for content ops." },
    ],
    _gallerySeed: [
      { url: CASE_STUDY_STOCK["ai-copilot"].gallery[0], alt: "AI operations center", caption: "Operations analytics" },
      { url: CASE_STUDY_STOCK["ai-copilot"].gallery[1], alt: "Knowledge workflow", caption: "Knowledge graph layer" },
      { url: CASE_STUDY_STOCK["ai-copilot"].gallery[2], alt: "Compliance review", caption: "Audit-ready responses" },
      { url: CASE_STUDY_STOCK["ai-copilot"].gallery[3], alt: "Executive dashboard", caption: "Leadership dashboard" },
    ],
    beforeAfter: [
      { metric: "Tier-1 resolution", before: "18h median", after: "11h median" },
      { metric: "Cited answers", before: "0%", after: "100% in production" },
      { metric: "Sanctioned bots", before: "12 shadow", after: "1 governed program" },
    ],
    testimonial: {
      quote:
        "Overall, we are satisfied with our collaboration in the past and your last action really makes a difference.",
      name: "Arkady Fedorovtsjev",
      role: "IT Director",
      company: "ECG Group",
      location: "Netherlands",
    },
    ctaHeadline: "Need copilots that cite their sources?",
    ctaSubtext: "Softree ships governed Microsoft 365 AI with audit-friendly retrieval.",
    ctaButtonText: "Plan an AI workshop",
    metaTitle: "ECG Group AI Copilot Case Study | Softree",
    metaDescription:
      "ECG Group cut resolution time 40% with grounded SharePoint copilots and measurable compliance outcomes.",
    relatedSlugs: [
      "wicked-point-power-platform-governance",
      "sp-marketplace-installation-automation",
    ],
  },
  {
    _id: "caseStudy-sp-marketplace-automation",
    _type: "caseStudy",
    title: "97.8% Install Success on a Bi-Weekly Train",
    slug: { _type: "slug", current: "sp-marketplace-installation-automation" },
    client: "SP Marketplace",
    detailLayout: "manufacturing-power-platform",
    storyType: "product-showcase",
    heroLayout: "full-bleed",
    headerTitle: "Installation portal with bi-weekly releases from week six",
    excerpt:
      "Softree embedded a product squad that learned SP Marketplace's install stack and delivered a Next.js control plane with retry-safe orchestration and real-time customer timelines.",
    industry: "Technology",
    useCase: "Product Engineering",
    companySize: "mid-market",
    location: "California, United States",
    employees: "90+",
    scaleOfOperation: "B2B marketplace connecting installers and enterprise buyers nationwide",
    projectType: "Web Application Modernization",
    region: "North America",
    projectDuration: "16 weeks",
    teamSize: "6 engineers + 1 product designer",
    endUsers: "400+ operators",
    accentColor: "#FF7A2F",
    status: "published",
    featuredRank: 3,
    heroEyebrow: "Product engineering",
    heroHeadline: "Bi-weekly releases from week six",
    publishedAt: "2026-02-08T10:00:00.000Z",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Azure", "GitHub Actions"],
    highlights: [
      { value: "97.8%", label: "Install success rate" },
      { value: "2 wk", label: "Release cadence" },
      { value: "400+", label: "Active operators" },
    ],
    metrics: [
      { label: "Deploy frequency", value: "2× / month", description: "After pipeline hardening" },
      { label: "P95 dashboard load", value: "1.4s", description: "Authenticated views" },
      { label: "Support tickets", value: "-34%", description: "Status-related inquiries" },
      { label: "Failed installs recovered", value: "91%", description: "Via automated retry" },
    ],
    challengeSummary:
      "Installation runbooks were manual and opaque — customers could not see progress, and support reconciled status in spreadsheets.",
    approachSummary:
      "Softree shadowed live installs, captured edge cases in executable specs, and rebuilt the control plane as a typed Next.js app with observable job orchestration.",
    outcomeSummary:
      "Customers track installs in real time, operators get actionable retries, and the squad ships on a predictable bi-weekly train.",
    solutionSummary:
      "A modular portal orchestrates provisioning scripts, signed webhooks, and SLA-aware timelines — with role-based views for installers, support, and customer success.",
    solutionFeatures: [
      "Live installation timeline with SLA badges",
      "Retry-safe job orchestration with idempotent webhooks",
      "Role-based dashboards for installers and CS",
      "Audit log export for enterprise buyers",
      "Feature flags for progressive rollout",
    ],
    solutionArchitecture: [
      { title: "Next.js portal", description: "App Router UI with server actions for mutations." },
      { title: "Orchestration API", description: "Node services coordinating install scripts and queues." },
      { title: "PostgreSQL", description: "Event-sourced job history with replay support." },
      { title: "Webhook gateway", description: "Signed partner callbacks with dead-letter queue." },
      { title: "Observability", description: "OpenTelemetry traces in operator dashboards." },
      { title: "CI/CD", description: "Preview environments per pull request." },
    ],
    challengeCards: [
      {
        title: "Opaque installs",
        description: "Buyers could not see progress between kickoff and completion — eroding trust.",
      },
      {
        title: "Fragile scripts",
        description: "Upstream API changes broke runbooks without automated detection.",
      },
      {
        title: "Slow releases",
        description: "Quarterly deploys blocked customer commitments and revenue recognition.",
      },
      {
        title: "Support load",
        description: "Status tickets consumed CS hours that should have been proactive outreach.",
      },
    ],
    approachSteps: [
      { title: "Discover", description: "Shadowed live installs and mapped failure modes." },
      { title: "Model", description: "Event-sourced job schema with idempotent webhooks." },
      { title: "Build", description: "Portal + API with preview envs per PR." },
      { title: "Harden", description: "Retry policies, OTel traces, and smoke suites." },
      { title: "Scale", description: "Bi-weekly train with feature flags for enterprise cohorts." },
    ],
    _gallerySeed: [
      { url: CASE_STUDY_STOCK["product-engineering"].gallery[0], alt: "Product workshop", caption: "Discovery sprint" },
      { url: CASE_STUDY_STOCK["product-engineering"].gallery[1], alt: "Engineering sprint", caption: "Build phase" },
      { url: CASE_STUDY_STOCK["product-engineering"].gallery[2], alt: "Code review", caption: "Release hardening" },
      { url: CASE_STUDY_STOCK["product-engineering"].gallery[3], alt: "Operator dashboard", caption: "Live install timeline" },
    ],
    testimonial: {
      quote:
        "SOFTREE staff worked with us to learn our installation automation technology and built exactly what we needed.",
      name: "Darrell Trimble",
      role: "VP Engineering",
      company: "SP Marketplace",
      location: "California",
    },
    ctaHeadline: "Need a product squad on your stack?",
    ctaSubtext: "Softree embeds offshore engineers on bi-weekly trains with design and QA included.",
    ctaButtonText: "Start a discovery sprint",
    metaTitle: "SP Marketplace Platform Case Study | Softree",
    metaDescription:
      "SP Marketplace reached 97.8% install success with Softree's product squad and bi-weekly release train.",
    relatedSlugs: [
      "wicked-point-power-platform-governance",
      "ecg-group-ai-copilot-transformation",
    ],
  },
];

const LOGO_UPLOADS: Array<{
  studyId: string;
  path: string;
  filename: string;
  alt: string;
}> = [
  {
    studyId: "caseStudy-wicked-point-power-platform",
    path: "images/logo/wickedpoint.jpg",
    filename: "wickedpoint-logo.jpg",
    alt: "Wicked Point LLC logo",
  },
  {
    studyId: "caseStudy-ecg-ai-copilot",
    path: "images/logo/ecg.png",
    filename: "ecg-logo.png",
    alt: "ECG Group logo",
  },
  {
    studyId: "caseStudy-sp-marketplace-automation",
    path: "images/logo/1.jpg",
    filename: "sp-marketplace-logo.jpg",
    alt: "SP Marketplace logo",
  },
];

async function uploadLocalLogo(relativePath: string, filename: string, alt: string) {
  const full = path.join(process.cwd(), "public", relativePath.replace(/^\//, ""));
  if (!fs.existsSync(full)) return undefined;
  const buffer = fs.readFileSync(full);
  const uploaded = await client.assets.upload("image", buffer, { filename });
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: uploaded._id },
    alt,
  };
}

async function attachStudyImages(study: StudySeed) {
  const slug = study.slug.current;
  const theme: CaseStudyImageTheme = themeForCaseStudySlug(slug);
  const pack = CASE_STUDY_STOCK[theme];

  console.log(`  Images (${theme}): uploading hero + gallery to Sanity…`);

  const mainImage = await uploadRemoteImage(
    client,
    pack.hero,
    `${slug}-hero.jpg`,
    `${study.client} hero`,
  );

  const gallerySeeds = study._gallerySeed ?? pack.gallery.map((url, i) => ({
    url,
    alt: `Visual ${i + 1}`,
    caption: undefined,
  }));

  const gallery = [];
  for (let i = 0; i < gallerySeeds.length; i++) {
    const item = gallerySeeds[i];
    const image = await uploadRemoteImage(
      client,
      item.url,
      `${slug}-gallery-${i + 1}.jpg`,
      item.alt,
    );
    gallery.push({ ...image, caption: item.caption });
  }

  const { _gallerySeed: _omit, ...doc } = study;
  return {
    ...doc,
    mainImage,
    gallery,
    galleryUrls: undefined,
    mainImageUrl: undefined,
  };
}

async function main() {
  console.log("Seeding premium client case studies (Sanity assets, no /Gallery/)…\n");

  const logoByStudy = new Map<string, Awaited<ReturnType<typeof uploadLocalLogo>>>();

  for (const logo of LOGO_UPLOADS) {
    console.log(`Uploading logo: ${logo.alt}`);
    const asset = await uploadLocalLogo(logo.path, logo.filename, logo.alt);
    if (asset) logoByStudy.set(logo.studyId, asset);
  }

  for (const study of STUDIES) {
    const slug = study.slug.current;
    const withImages = await attachStudyImages(study);
    const withLogo = {
      ...withImages,
      ...(logoByStudy.has(study._id) ? { clientLogo: logoByStudy.get(study._id) } : {}),
    };

    console.log(
      `Upserting: ${slug}\n  layout: ${withLogo.detailLayout}\n  → /case-studies/${slug}\n`,
    );
    await client.createOrReplace(withLogo);
  }

  console.log("Done. Refresh case study URLs — imagery is served from Sanity CDN.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
