import {
  Activity,
  Database,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import {
  IconActivity,
  IconChartBar,
  IconDatabase,
  IconRobot,
  IconSearch,
  IconServer,
  IconShieldLock,
  IconTrendingUp,
  IconUserCheck,
} from "@tabler/icons-react";
import type { IndustryPageConfig } from "../types";

const base = "/images/solutions/ai-for-healthcare";

export const healthcareConfig: IndustryPageConfig = {
  slug: "ai-for-healthcare",
  metadata: {
    title: "AI for Healthcare Solutions | Softree Technology",
    description:
      "Softree builds AI for healthcare—HIPAA-aware clinical documentation, patient scheduling, medical imaging assist, secure clinical knowledge search, and governed care-team workflows.",
  },
  challengesColumnLabel: "Business Challenges",
  solutionsColumnLabel: "Healthcare AI Solutions",
  hero: {
    label: "AI FOR HEALTHCARE",
    heading: {
      prefix: "AI for Healthcare",
      highlight: "Built for Clinical Teams",
      suffix: "",
    },
    paragraph:
      "Softree Technology delivers AI for healthcare that supports clinicians and care operations—secure clinical documentation, intelligent patient scheduling, imaging assist, and HIPAA-aware knowledge search grounded in approved medical content.",
    ctaButtons: {
      primary: {
        text: "Talk to an Expert",
        href: "https://www.softreetechnology.com/contact",
      },
    },
    features: [
      { icon: ShieldCheck, title: "White-Label Friendly", subtitle: "Seamless integration" },
      { icon: Users, title: "Dedicated Offshore Teams", subtitle: "Scalable capacity" },
      { icon: Database, title: "Microsoft AI Expertise", subtitle: "Certified partners" },
      { icon: TrendingUp, title: "Enterprise-Ready Delivery", subtitle: "Proven execution" },
    ],
    capabilities: [
      { id: "clinical", title: "Clinical", subtitle: "Documentation", icon: Stethoscope, angle: 270 },
      { id: "scheduling", title: "Scheduling", subtitle: "Patient access", icon: Users, angle: 330 },
      { id: "imaging", title: "Imaging", subtitle: "AI assist", icon: Activity, angle: 30 },
      { id: "records", title: "Records", subtitle: "Secure search", icon: Database, angle: 90 },
      { id: "ops", title: "Ops", subtitle: "Admin agents", icon: Workflow, angle: 150 },
      { id: "govern", title: "Govern", subtitle: "HIPAA controls", icon: ShieldCheck, angle: 210 },
    ],
    heroImage: `${base}/hero.png?v=hc-3`,
    heroVideo: `${base}/hero.mp4?v=hc-vid-3`,
    layout: "stacked",
    heroMediaClass: "object-center",
    panelLabel: "Healthcare AI Runtime",
    panelChips: ["clinical", "scheduling", "imaging", "hipaa"],
    panelCaption: "Live healthcare AI runtime",
    panelSubcaption: "Clinical · Scheduling · Imaging · HITL",
  },
  sections: {
    successStories: {
      badge: "SUCCESS STORIES",
      title: "AI for Healthcare",
      highlight: "Real-World Impact",
      description:
        "See how Softree AI for healthcare improves patient access, clinical documentation, and care-team knowledge workflows with measurable operational outcomes.",
    },
    coreCapabilities: {
      badge: "CORE CAPABILITIES",
      title: "AI for Healthcare",
      highlight: "Capabilities",
      description:
        "Softree AI for healthcare capabilities cover clinical documentation, patient scheduling, medical imaging assist, secure clinical knowledge search, care operations agents, and HIPAA governance.",
    },
    businessChallenges: {
      badge: "BUSINESS CHALLENGES",
      title: "AI for Healthcare Solves",
      highlight: "Care Delivery Challenges",
      description:
        "Hospitals and clinics struggle with documentation load, scheduling bottlenecks, fragmented clinical knowledge, and compliance risk. Softree AI for healthcare turns those friction points into governed, production workflows.",
    },
    businessOutcomes: {
      badge: "BUSINESS OUTCOMES",
      title: "Turn AI for Healthcare into Measurable",
      highlight: "Business Outcomes",
      description:
        "Softree AI for healthcare helps care organizations reduce documentation time, improve patient access, ground answers in approved medical knowledge, and deploy HIPAA-aware AI with clinical oversight.",
    },
    provenResults: {
      badge: "PROVEN RESULTS",
      title: "Proven AI for Healthcare",
      highlight: "Results",
      description:
        "Explore Softree AI for healthcare deployments that cut scheduling effort, reduce documentation burden, and accelerate trusted clinical knowledge access.",
    },
    useCases: {
      badge: "HEALTHCARE USE CASES",
      title: "AI for Healthcare Use Cases Across",
      highlight: "Clinical Operations",
      description:
        "From clinical documentation and patient scheduling to imaging assist and revenue cycle support—Softree delivers AI for healthcare tailored to regulated care environments.",
    },
    techStack: {
      badge: "AI TECHNOLOGY STACK",
      title: "Stack for enterprise",
      highlight: "AI for healthcare",
      description:
        "We build production AI for healthcare with secure LLMs, EHR integrations, vector search over clinical content, Azure/AWS cloud controls, evaluation harnesses, and observability for governed deployments.",
    },
    howItWorks: {
      badge: "HOW AI WORKS",
      title: "From healthcare AI strategy to",
      highlight: "production care workflows",
      description:
        "A structured Softree path for AI for healthcare—from HIPAA-aligned use-case discovery and clinical workflow design to EHR integration, governance, and continuous monitoring.",
    },
    faq: {
      badge: "FAQ",
      title: "Frequently Asked",
      highlight: "Questions.",
      description:
        "Common questions about Softree AI for healthcare—HIPAA alignment, EHR integration, clinical oversight, use cases, pilots, and secure deployment options.",
    },
  },
  coreCapabilities: [
    {
      id: "01",
      title: "Clinical Documentation AI",
      shortDesc:
        "AI for healthcare that drafts clinical notes and visit summaries with mandatory clinician review before EHR entry.",
      icon: IconRobot,
      color: "bg-emerald-100 text-emerald-600",
      image: `${base}/core-capabilities/cap-01.png?v=hc-3`,
      description:
        "Reduce charting burden with Softree AI for healthcare documentation assistants that draft SOAP notes and encounter summaries—always routed through clinician sign-off before the record is updated.",
      highlights: [
        { title: "Ambient & Structured Notes", desc: "Draft SOAP notes and visit summaries from encounters.", icon: IconRobot },
        { title: "Clinician Review Gates", desc: "Human sign-off before EHR submission.", icon: IconUserCheck },
        { title: "Specialty Templates", desc: "Templates tuned for departments and care pathways.", icon: IconTrendingUp },
      ],
      illustration: "strategy",
      kpis: [
        { label: "Doc Time Saved", value: "40%+" },
        { label: "Review Gates", value: "100%" },
        { label: "EHR Integration", value: "Yes" },
        { label: "HIPAA Controls", value: "On" },
      ],
    },
    {
      id: "02",
      title: "Patient Scheduling & Triage AI",
      shortDesc:
        "AI for healthcare scheduling that routes appointments, reminders, and patient inquiries with staff escalation.",
      icon: IconActivity,
      color: "bg-blue-100 text-blue-600",
      image: `${base}/core-capabilities/cap-02.png?v=hc-3`,
      description:
        "Improve patient access with Softree AI for healthcare agents that handle booking, reminders, and triage—escalating complex cases to care teams with full context.",
      highlights: [
        { title: "Smart Scheduling", desc: "Match patients to providers, slots, and care settings.", icon: IconActivity },
        { title: "Triage Routing", desc: "Route urgency to the right clinical path.", icon: IconSearch },
        { title: "Reminder Automation", desc: "Reduce no-shows with proactive outreach.", icon: IconChartBar },
      ],
      illustration: "automation",
      kpis: [
        { label: "Scheduling Effort", value: "-58%" },
        { label: "Response Speed", value: "3.5×" },
        { label: "No-show Reduction", value: "25%+" },
        { label: "HITL Escalation", value: "Clear" },
      ],
    },
    {
      id: "03",
      title: "Medical Imaging Assist",
      shortDesc:
        "AI for healthcare imaging support—worklist prioritization, annotation assist, and structured reporting with radiologist review.",
      icon: IconSearch,
      color: "bg-violet-100 text-violet-600",
      image: `${base}/core-capabilities/cap-03.png?v=hc-3`,
      description:
        "Accelerate radiology workflows with Softree AI for healthcare that flags priorities and assists reporting—always with human interpretation and complete audit trails.",
      highlights: [
        { title: "Worklist Prioritization", desc: "Surface urgent studies faster for reading.", icon: IconActivity },
        { title: "Annotation Assist", desc: "Support measurement and marking workflows.", icon: IconRobot },
        { title: "Structured Reporting", desc: "Draft reports for radiologist review.", icon: IconChartBar },
      ],
      illustration: "architecture",
      kpis: [
        { label: "Turnaround Time", value: "-30%" },
        { label: "Priority Detection", value: "High" },
        { label: "Audit Trails", value: "Full" },
        { label: "Radiologist Review", value: "Required" },
      ],
    },
    {
      id: "04",
      title: "Secure Clinical Knowledge Search",
      shortDesc:
        "AI for healthcare knowledge search—permission-aware retrieval over policies, protocols, and approved medical libraries.",
      icon: IconDatabase,
      color: "bg-indigo-100 text-indigo-600",
      image: `${base}/core-capabilities/cap-04.png?v=hc-3`,
      description:
        "Give care teams instant, cited answers from approved clinical content with Softree AI for healthcare RAG—ACL enforcement, audit logging, and continuous index hygiene included.",
      highlights: [
        { title: "Permission-Aware Retrieval", desc: "Respect role-based clinical access at query time.", icon: IconDatabase },
        { title: "Cited Clinical Answers", desc: "Source-linked responses for auditability.", icon: IconSearch },
        { title: "Index Hygiene", desc: "Keep policies and protocols current.", icon: IconServer },
      ],
      illustration: "security",
      kpis: [
        { label: "Search Time", value: "-55%" },
        { label: "Grounded Answers", value: "90%+" },
        { label: "ACL Enforcement", value: "Yes" },
        { label: "Audit Logs", value: "Full" },
      ],
    },
    {
      id: "05",
      title: "Healthcare Operations Agents",
      shortDesc:
        "AI for healthcare operations—nursing and admin agents for policy Q&A, workflows, and hospital system actions.",
      icon: IconRobot,
      color: "bg-orange-100 text-orange-600",
      image: `${base}/core-capabilities/cap-05.png?v=hc-3`,
      description:
        "Free clinical staff from repetitive admin work with Softree AI for healthcare agents connected to EHR, ticketing, and scheduling—scoped tools, clear escalation, and governed actions.",
      highlights: [
        { title: "Policy & Procedure Q&A", desc: "Instant answers for nursing stations.", icon: IconSearch },
        { title: "Workflow Automation", desc: "Automate routine operational tasks.", icon: IconActivity },
        { title: "System Integrations", desc: "Connect to EHR, ticketing, and scheduling.", icon: IconServer },
      ],
      illustration: "automation",
      kpis: [
        { label: "Admin Time Saved", value: "35%+" },
        { label: "Ticket Deflection", value: "40%+" },
        { label: "Tool Scope", value: "Governed" },
        { label: "Escalation Paths", value: "Clear" },
      ],
    },
    {
      id: "06",
      title: "HIPAA Governance & Compliance",
      shortDesc:
        "AI for healthcare governance—PHI handling, audit trails, evaluation guardrails, and compliance-ready controls.",
      icon: IconShieldLock,
      color: "bg-cyan-100 text-cyan-600",
      image: `${base}/core-capabilities/cap-06.png?v=hc-3`,
      description:
        "Ship Softree AI for healthcare with confidence—BAAs, encryption, PHI handling policies, evaluation suites, and continuous monitoring built into every deployment.",
      highlights: [
        { title: "PHI Handling", desc: "De-identification and minimum-necessary access.", icon: IconShieldLock },
        { title: "Audit & Logging", desc: "Full traceability for compliance reviews.", icon: IconActivity },
        { title: "Eval & Guardrails", desc: "Regression tests before every release.", icon: IconTrendingUp },
      ],
      illustration: "security",
      kpis: [
        { label: "HIPAA Alignment", value: "Built-in" },
        { label: "Audit Coverage", value: "100%" },
        { label: "Guardrails", value: "On" },
        { label: "BAA Support", value: "Yes" },
      ],
    },
  ],
  businessChallenges: [
    { id: 1, title: "Clinicians buried in documentation overhead", icon: "workflow" },
    { id: 2, title: "Patient scheduling bottlenecks and no-shows", icon: "clock" },
    { id: 3, title: "Siloed medical knowledge hard to search", icon: "database" },
    { id: 4, title: "Imaging backlogs delay critical diagnoses", icon: "brain" },
    { id: 5, title: "HIPAA compliance blocks AI adoption", icon: "lock" },
    { id: 6, title: "Admin staff overwhelmed with repetitive inquiries", icon: "badge-dollar" },
    { id: 7, title: "AI pilots lack clinical oversight and governance", icon: "shield-alert" },
    { id: 8, title: "EHR integrations too complex for generic chatbots", icon: "link" },
  ],
  aiSolutions: [
    { id: 1, title: "Clinical Documentation Assistants", icon: "robot" },
    { id: 2, title: "Patient Scheduling Agents", icon: "workflow" },
    { id: 3, title: "Medical Imaging AI Support", icon: "brain" },
    { id: 4, title: "Secure Clinical Knowledge Search", icon: "database" },
    { id: 5, title: "Healthcare Operations Automation", icon: "network" },
    { id: 6, title: "HIPAA Governance Framework", icon: "lock" },
    { id: 7, title: "Human-in-the-Loop Clinical Review", icon: "user" },
    { id: 8, title: "EHR & HL7 FHIR Integrations", icon: "link" },
  ],
  businessOutcomes: [
    {
      step: "01",
      leftCard: {
        title: "Reduce Clinical Documentation Burden",
        points: ["AI-assisted note drafting", "Clinician review gates", "EHR-ready structured output", "Specialty workflow templates"],
      },
      rightCard: {
        title: "Business Impact",
        points: ["More time with patients", "Lower clinician burnout risk", "Consistent documentation quality", "Faster chart completion"],
      },
    },
    {
      step: "02",
      leftCard: {
        title: "Improve Patient Access & Scheduling",
        points: ["Intelligent appointment routing", "Automated reminders", "Triage and escalation", "Self-service patient inquiries"],
      },
      rightCard: {
        title: "Business Impact",
        points: ["Fewer scheduling delays", "Reduced no-show rates", "Better patient experience", "Lower front-desk load"],
      },
    },
    {
      step: "03",
      leftCard: {
        title: "Ground AI in Approved Medical Knowledge",
        points: ["Permission-aware clinical search", "Cited clinical answers", "Policy and protocol retrieval", "Continuous index updates"],
      },
      rightCard: {
        title: "Business Impact",
        points: ["Faster clinical decisions", "Fewer policy errors", "Trusted knowledge access", "Audit-ready responses"],
      },
    },
    {
      step: "04",
      leftCard: {
        title: "Govern AI for Healthcare Compliance",
        points: ["HIPAA-aligned controls", "PHI handling policies", "Audit trails and logging", "Eval suites and guardrails"],
      },
      rightCard: {
        title: "Business Impact",
        points: ["Confident AI adoption", "Regulatory alignment", "Reduced compliance risk", "Production-ready deployments"],
      },
    },
  ],
  provenResults: [
    {
      category: "PATIENT ACCESS",
      title: "AI for Healthcare Scheduling Agent",
      challenge: "Manual scheduling and follow-ups delayed patient access and overloaded hospital staff.",
      solution: "Deployed Softree AI for healthcare scheduling agents with EHR integration, triage routing, and clinical escalation paths.",
      outcome: "Cut scheduling effort and accelerated patient inquiry responses across the care network.",
      metric: "58%",
      metricLabel: "Scheduling Effort Reduction",
    },
    {
      category: "CLINICAL OPS",
      title: "AI for Healthcare Documentation Assistant",
      challenge: "Physicians spent excessive time on after-hours clinical documentation.",
      solution: "Built Softree AI for healthcare note drafting with mandatory clinician review before EHR submission.",
      outcome: "Reduced documentation time while maintaining clinical oversight and chart quality.",
      metric: "40%",
      metricLabel: "Documentation Time Saved",
    },
    {
      category: "KNOWLEDGE",
      title: "AI for Healthcare Clinical Knowledge Platform",
      challenge: "Care teams could not quickly find trusted answers across policies and protocols.",
      solution: "Permission-aware Softree AI for healthcare search over approved clinical content with citations and audit logging.",
      outcome: "Accelerated knowledge access with governed, auditable clinical responses.",
      metric: "55%",
      metricLabel: "Faster Knowledge Access",
    },
  ],
  useCases: [
    { id: "01", title: "Clinical Documentation", description: "AI for healthcare notes and visit summaries with clinician review before EHR entry.", icon: "healthcare", color: "from-emerald-300/30 to-emerald-200/10", image: `${base}/use-cases/uc-01.png?v=hc-uc-1` },
    { id: "02", title: "Patient Scheduling", description: "AI for healthcare appointment booking, reminders, and triage with staff escalation.", icon: "healthcare", color: "from-blue-300/30 to-blue-200/10", image: `${base}/use-cases/uc-02.png?v=hc-uc-1` },
    { id: "03", title: "Medical Imaging Assist", description: "AI for healthcare radiology support—worklist prioritization and reporting assist.", icon: "healthcare", color: "from-violet-300/30 to-violet-200/10", image: `${base}/use-cases/uc-03.png?v=hc-uc-1` },
    { id: "04", title: "Clinical Knowledge Search", description: "AI for healthcare RAG over policies, protocols, and approved medical libraries.", icon: "healthcare", color: "from-indigo-300/30 to-indigo-200/10", image: `${base}/use-cases/uc-04.png?v=hc-uc-1` },
    { id: "05", title: "Nursing & Admin Support", description: "AI for healthcare policy Q&A and operational agents for nursing and admin teams.", icon: "healthcare", color: "from-orange-300/30 to-orange-200/10", image: `${base}/use-cases/uc-05.png?v=hc-uc-1` },
    { id: "06", title: "Revenue Cycle Assist", description: "AI for healthcare coding suggestions and prior-auth workflows with human review.", icon: "finance", color: "from-cyan-300/30 to-cyan-200/10", image: `${base}/use-cases/uc-06.png?v=hc-uc-1` },
  ],
  workflowSteps: [
    { id: "01", title: "Healthcare AI Strategy & Compliance", description: "We map clinical workflows, HIPAA requirements, and high-ROI AI for healthcare use cases aligned to your care delivery model.", icon: "search-document", image: `${base}/delivery-process/dp-01.png?v=dp-1` },
    { id: "02", title: "Clinical Workflow Design", description: "We design Softree AI for healthcare assistants with human-in-the-loop review, EHR integration points, and role-based access controls.", icon: "development", image: `${base}/delivery-process/dp-02.png?v=dp-1` },
    { id: "03", title: "Secure Data & EHR Integration", description: "We connect EHR, imaging systems, and clinical knowledge bases with PHI handling, encryption, and audit trails for AI for healthcare.", icon: "workflow", image: `${base}/delivery-process/dp-03.png?v=dp-1` },
    { id: "04", title: "Deploy, Monitor & Clinical Governance", description: "We ship Softree AI for healthcare with eval suites, clinical oversight workflows, and continuous monitoring for safety and quality.", icon: "analytics", image: `${base}/delivery-process/dp-04.png?v=dp-1` },
  ],
  faqs: [
    { id: 1, serial: "question 01", question: "Is Softree AI for healthcare HIPAA compliant?", answer: "We design Softree AI for healthcare for HIPAA alignment from day one—PHI handling policies, encryption, access controls, audit logging, and BAAs. Every deployment includes governance workflows and human oversight for clinical actions." },
    { id: 2, serial: "question 02", question: "Can Softree AI for healthcare integrate with our EHR?", answer: "Yes. Softree AI for healthcare integrates with major EHR platforms via HL7 FHIR, APIs, and secure middleware—connecting documentation, scheduling, and knowledge workflows to your existing clinical systems." },
    { id: 3, serial: "question 03", question: "How do you prevent AI errors in clinical settings?", answer: "Softree AI for healthcare uses human-in-the-loop review gates, grounded retrieval over approved content, evaluation suites, output guardrails, and clear escalation paths—AI assists clinicians; it does not replace clinical judgment." },
    { id: 4, serial: "question 04", question: "What AI for healthcare use cases does Softree support?", answer: "Clinical documentation, patient scheduling, medical imaging assist, secure clinical knowledge search, nursing and admin support, and revenue cycle assistance—with governance tailored to each healthcare workflow." },
    { id: 5, serial: "question 05", question: "How long does an AI for healthcare pilot take?", answer: "Most Softree AI for healthcare pilots launch in 6–10 weeks depending on EHR integration complexity, data access, and compliance requirements. We prioritize a focused use case with measurable clinical or operational outcomes." },
    { id: 6, serial: "question 06", question: "Do you support private cloud or on-premise AI for healthcare?", answer: "Yes. Softree deploys AI for healthcare on Azure, AWS, GCP, or private cloud environments to meet data residency, security, and compliance requirements for healthcare organizations." },
  ],
  successStories: [
    {
      id: "01",
      industryLabel: "HEALTHCARE",
      title: "AI for Healthcare Scheduling Agent",
      problem: "Manual patient scheduling and follow-ups delayed access and overloaded hospital staff.",
      solution: "Softree AI for healthcare scheduling agents with EHR integration, triage routing, and clinical escalation.",
      results: ["58% reduction in scheduling effort", "3.5× faster inquiry responses", "Improved patient experience"],
      icon: "heart",
      color: "from-emerald-100/50 to-emerald-50/50",
      caseStudyUrl: "https://www.softreetechnology.com/case-studies/ai-powered-patient-scheduling",
      image: `${base}/success-stories/ss-01.png?v=hc-ss-1`,
      clientOverview: { name: "US Healthcare Provider", industry: "Healthcare", country: "United States", organizationSize: "2,500+ Employees", businessType: "Regional Health System" },
    },
    {
      id: "02",
      industryLabel: "HEALTHCARE",
      title: "AI for Healthcare Documentation Assistant",
      problem: "Physicians spent hours on after-hours documentation, impacting burnout and patient time.",
      solution: "Softree AI for healthcare note drafting with mandatory clinician review and EHR-ready structured output.",
      results: ["40% documentation time saved", "Higher chart completion rates", "Clinician oversight maintained"],
      icon: "heart",
      color: "from-blue-100/50 to-blue-50/50",
      caseStudyUrl: "https://www.softreetechnology.com/contact",
      image: `${base}/success-stories/ss-02.png?v=hc-ss-1`,
      clientOverview: { name: "UK Healthcare Network", industry: "Healthcare", country: "United Kingdom", organizationSize: "1,200+ Employees", businessType: "Multi-site Clinic Network" },
    },
    {
      id: "03",
      industryLabel: "HEALTHCARE",
      title: "AI for Healthcare Clinical Knowledge Platform",
      problem: "Nursing and admin teams could not quickly find trusted policy and protocol answers.",
      solution: "Softree AI for healthcare permission-aware search over approved clinical content with citations and full audit trails.",
      results: ["55% faster knowledge access", "Consistent policy answers", "Reduced compliance inquiries"],
      icon: "heart",
      color: "from-violet-100/50 to-violet-50/50",
      caseStudyUrl: "https://www.softreetechnology.com/contact",
      image: `${base}/success-stories/ss-03.png?v=hc-ss-1`,
      clientOverview: { name: "APAC Hospital Group", industry: "Healthcare", country: "Singapore", organizationSize: "800+ Employees", businessType: "Private Hospital Group" },
    },
  ],
};
