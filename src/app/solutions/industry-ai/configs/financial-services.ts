import { Landmark, Scale, ShieldCheck, TrendingUp, Users, Workflow } from "lucide-react";

import { IconActivity, IconChartBar, IconDatabase, IconRobot, IconSearch, IconServer, IconShieldLock, IconTrendingUp, IconUserCheck } from "@tabler/icons-react";

import type { IndustryPageConfig } from "../types";



const base = "/images/solutions/ai-for-financial-services";



export const financialServicesConfig: IndustryPageConfig = {

  slug: "ai-for-financial-services",

  metadata: {

    title: "AI for Financial Services Solutions | Softree Technology",

    description:

      "Softree builds AI for financial services—fraud detection, KYC automation, compliance knowledge assistants, customer service agents, and governed model risk workflows.",

  },

  challengesColumnLabel: "Business Challenges",

  solutionsColumnLabel: "Financial AI Solutions",

  hero: {

    label: "AI FOR FINANCIAL SERVICES",

    heading: {

      prefix: "AI for Financial Services",

      highlight: "Governed & Compliant",

      suffix: "",

    },

    paragraph:

      "Softree Technology delivers AI for financial services that supports banks, insurers, and fintech teams—fraud detection, KYC automation, compliance knowledge assistants, and customer service agents with full regulatory governance.",

    ctaButtons: {

      primary: {

        text: "Talk to an Expert",

        href: "https://www.softreetechnology.com/contact",

      },

    },

    features: [

      { icon: ShieldCheck, title: "White-Label Friendly", subtitle: "Seamless integration" },

      { icon: Users, title: "Dedicated Offshore Teams", subtitle: "Scalable capacity" },

      { icon: Landmark, title: "Microsoft AI Expertise", subtitle: "Certified partners" },

      { icon: TrendingUp, title: "Enterprise-Ready Delivery", subtitle: "Proven execution" },

    ],

    capabilities: [

      { id: "fraud", title: "Fraud", subtitle: "Detection", icon: ShieldCheck, angle: 270 },

      { id: "kyc", title: "KYC", subtitle: "Automation", icon: Users, angle: 330 },

      { id: "comply", title: "Comply", subtitle: "Assistants", icon: Scale, angle: 30 },

      { id: "support", title: "Support", subtitle: "Agents", icon: Workflow, angle: 90 },

      { id: "risk", title: "Risk", subtitle: "Analytics", icon: TrendingUp, angle: 150 },

      { id: "govern", title: "Govern", subtitle: "Controls", icon: Landmark, angle: 210 },

    ],

    heroImage: `${base}/hero.png?v=fin-3`,

    heroVideo: `${base}/hero.mp4?v=fin-vid-3`,

    layout: "stacked",

    heroMediaClass: "object-center",

    textTone: "light",

    panelLabel: "Financial AI Runtime",

    panelChips: ["fraud", "kyc", "compliance", "risk"],

    panelCaption: "Live financial AI runtime",

    panelSubcaption: "Fraud · KYC · Compliance · Risk",

  },

  sections: {

    successStories: {

      badge: "SUCCESS STORIES",

      title: "AI for Financial Services",

      highlight: "Real-World Impact",

      description:

        "See how Softree AI for financial services improves fraud detection, KYC onboarding, and compliance workflows with measurable operational outcomes.",

    },

    coreCapabilities: {

      badge: "CORE CAPABILITIES",

      title: "AI for Financial Services",

      highlight: "Capabilities",

      description:

        "Softree AI for financial services capabilities cover fraud detection, KYC automation, compliance knowledge assistants, customer service agents, risk analytics, and regulatory governance.",

    },

    businessChallenges: {

      badge: "BUSINESS CHALLENGES",

      title: "AI for Financial Services Solves",

      highlight: "Banking Challenges",

      description:

        "Banks and fintechs struggle with rising fraud losses, slow KYC onboarding, regulatory complexity, and model risk uncertainty. Softree AI for financial services turns those friction points into governed, production workflows.",

    },

    businessOutcomes: {

      badge: "BUSINESS OUTCOMES",

      title: "Turn AI for Financial Services into Measurable",

      highlight: "Business Outcomes",

      description:

        "Softree AI for financial services helps institutions detect fraud faster, accelerate customer onboarding, empower compliance teams, and deploy auditable AI with model risk governance.",

    },

    provenResults: {

      badge: "PROVEN RESULTS",

      title: "Proven AI for Financial Services",

      highlight: "Results",

      description:

        "Explore Softree AI for financial services deployments that cut false positives, accelerate KYC, and speed compliance research with auditable responses.",

    },

    useCases: {

      badge: "FINANCIAL USE CASES",

      title: "AI for Financial Services Use Cases Across",

      highlight: "Banking & Insurance",

      description:

        "From fraud prevention and KYC automation to compliance assistants and customer service—Softree delivers AI for financial services tailored to regulated banking environments.",

    },

    techStack: {

      badge: "AI TECHNOLOGY STACK",

      title: "Stack for enterprise",

      highlight: "AI for financial services",

      description:

        "We build production AI for financial services with secure LLMs, core banking integrations, vector search over policy libraries, model risk tooling, and audit-ready observability.",

    },

    howItWorks: {

      badge: "HOW AI WORKS",

      title: "From financial AI strategy to",

      highlight: "governed production systems",

      description:

        "A structured Softree path for AI for financial services—from regulatory assessment and secure architecture to model validation, deployment, and continuous governance.",

    },

    faq: {

      badge: "FAQ",

      title: "Frequently Asked",

      highlight: "Questions.",

      description:

        "Common questions about Softree AI for financial services—compliance alignment, core banking integration, explainability, use cases, pilots, and deployment options.",

    },

  },

  coreCapabilities: [

    {

      id: "01",

      title: "Fraud Detection & Prevention",

      shortDesc:

        "AI for financial services that monitors transactions in real time with explainable anomaly alerts and analyst-ready reason codes.",

      icon: IconShieldLock,

      color: "bg-red-100 text-red-600",

      image: `${base}/core-capabilities/cap-01.png?v=fin-2`,

      description:

        "Detect suspicious patterns across transactions, accounts, and behavioral signals with Softree AI for financial services fraud models tuned for low false-positive rates and full audit trails.",

      highlights: [

        { title: "Real-time Scoring", desc: "Sub-second fraud risk assessment.", icon: IconActivity },

        { title: "Explainable Alerts", desc: "Analyst-ready reason codes.", icon: IconSearch },

        { title: "Adaptive Models", desc: "Continuous learning from new patterns.", icon: IconTrendingUp },

      ],

      illustration: "security",

      kpis: [

        { label: "Fraud Catch Rate", value: "95%+" },

        { label: "False Positives", value: "-40%" },

        { label: "Alert Latency", value: "<100ms" },

        { label: "Audit Trails", value: "Full" },

      ],

    },

    {

      id: "02",

      title: "KYC & Onboarding Automation",

      shortDesc:

        "AI for financial services KYC—automated identity verification, document extraction, and AML risk scoring with compliance review gates.",

      icon: IconRobot,

      color: "bg-blue-100 text-blue-600",

      image: `${base}/core-capabilities/cap-02.png?v=fin-2`,

      description:

        "Accelerate customer onboarding with Softree AI for financial services that extracts, validates, and routes KYC documents—escalating high-risk cases to compliance teams with full context.",

      highlights: [

        { title: "Document Extraction", desc: "Parse IDs, proofs, and forms automatically.", icon: IconRobot },

        { title: "Risk Scoring", desc: "Tier customers by AML risk profile.", icon: IconChartBar },

        { title: "Human Review Gates", desc: "Escalate edge cases to compliance teams.", icon: IconUserCheck },

      ],

      illustration: "automation",

      kpis: [

        { label: "Onboarding Time", value: "-60%" },

        { label: "Doc Accuracy", value: "95%+" },

        { label: "AML Compliance", value: "Aligned" },

        { label: "Review Gates", value: "On" },

      ],

    },

    {

      id: "03",

      title: "Compliance Knowledge Assistants",

      shortDesc:

        "AI for financial services compliance search—permission-aware RAG over regulations, policies, and internal documentation.",

      icon: IconSearch,

      color: "bg-emerald-100 text-emerald-600",

      image: `${base}/core-capabilities/cap-03.png?v=fin-2`,

      description:

        "Give compliance teams instant, cited answers from approved regulatory content with Softree AI for financial services RAG—ACL enforcement, audit logging, and continuous index hygiene included.",

      highlights: [

        { title: "Regulatory RAG", desc: "Search across approved policy libraries.", icon: IconSearch },

        { title: "Cited Responses", desc: "Source-linked answers for audits.", icon: IconDatabase },

        { title: "Access Controls", desc: "Role-based content permissions.", icon: IconShieldLock },

      ],

      illustration: "architecture",

      kpis: [

        { label: "Search Time", value: "-55%" },

        { label: "Grounded Answers", value: "90%+" },

        { label: "Audit Logs", value: "Full" },

        { label: "Policy Coverage", value: "Complete" },

      ],

    },

    {

      id: "04",

      title: "Customer Service AI Agents",

      shortDesc:

        "AI for financial services customer agents—account-aware, policy-grounded support for banking and insurance inquiries.",

      icon: IconActivity,

      color: "bg-violet-100 text-violet-600",

      image: `${base}/core-capabilities/cap-04.png?v=fin-2`,

      description:

        "Deploy customer-facing Softree AI for financial services agents that handle inquiries, account lookups, and product questions—with secure escalation to human agents and PII protection.",

      highlights: [

        { title: "Account-Aware Agents", desc: "Personalized responses with CRM context.", icon: IconActivity },

        { title: "Policy Grounding", desc: "Answers grounded in approved product info.", icon: IconSearch },

        { title: "Secure Handoffs", desc: "Warm transfer to human agents with context.", icon: IconUserCheck },

      ],

      illustration: "automation",

      kpis: [

        { label: "Ticket Deflection", value: "45%+" },

        { label: "CSAT Score", value: "4.5/5" },

        { label: "Response Time", value: "<5s" },

        { label: "PII Protection", value: "On" },

      ],

    },

    {

      id: "05",

      title: "Risk Analytics & Credit Scoring",

      shortDesc:

        "AI for financial services risk models—explainable credit scoring, portfolio analytics, and stress testing support.",

      icon: IconChartBar,

      color: "bg-orange-100 text-orange-600",

      image: `${base}/core-capabilities/cap-05.png?v=fin-2`,

      description:

        "Improve lending decisions with Softree AI for financial services explainable ML models trained on your portfolio data and regulatory requirements—with full model documentation.",

      highlights: [

        { title: "Credit Models", desc: "Explainable scoring for lending decisions.", icon: IconChartBar },

        { title: "Portfolio Analytics", desc: "Risk concentration and exposure views.", icon: IconDatabase },

        { title: "Stress Testing", desc: "Scenario analysis for regulatory reporting.", icon: IconTrendingUp },

      ],

      illustration: "strategy",

      kpis: [

        { label: "Model Accuracy", value: "92%+" },

        { label: "Decision Speed", value: "10×" },

        { label: "Explainability", value: "Full" },

        { label: "Regulatory Fit", value: "Aligned" },

      ],

    },

    {

      id: "06",

      title: "Regulatory Governance & Audit",

      shortDesc:

        "AI for financial services governance—model risk management, bias testing, audit trails, and regulatory reporting.",

      icon: IconShieldLock,

      color: "bg-cyan-100 text-cyan-600",

      image: `${base}/core-capabilities/cap-06.png?v=fin-2`,

      description:

        "Ship Softree AI for financial services with confidence—SR 11-7 aligned model documentation, bias audits, centralized model registry, and continuous monitoring built into every deployment.",

      highlights: [

        { title: "Model Documentation", desc: "SR 11-7 aligned model risk management.", icon: IconShieldLock },

        { title: "Bias Testing", desc: "Fairness audits across protected classes.", icon: IconActivity },

        { title: "Audit Reporting", desc: "Automated regulatory report generation.", icon: IconServer },

      ],

      illustration: "security",

      kpis: [

        { label: "MRM Compliance", value: "Aligned" },

        { label: "Bias Audits", value: "Scheduled" },

        { label: "Audit Trails", value: "100%" },

        { label: "Model Registry", value: "Centralized" },

      ],

    },

  ],

  businessChallenges: [

    { id: 1, title: "Fraud losses growing faster than rule-based systems", icon: "shield-alert" },

    { id: 2, title: "KYC onboarding takes days and frustrates customers", icon: "clock" },

    { id: 3, title: "Compliance teams overwhelmed by regulatory changes", icon: "database" },

    { id: 4, title: "Customer service costs rising without quality gains", icon: "badge-dollar" },

    { id: 5, title: "AI adoption blocked by regulatory uncertainty", icon: "lock" },

    { id: 6, title: "Credit models lack explainability for auditors", icon: "brain" },

    { id: 7, title: "Siloed data prevents unified risk view", icon: "link" },

    { id: 8, title: "Generic chatbots create compliance liability", icon: "workflow" },

  ],

  aiSolutions: [

    { id: 1, title: "Real-time Fraud Detection", icon: "lock" },

    { id: 2, title: "KYC Document Automation", icon: "robot" },

    { id: 3, title: "Compliance RAG Assistants", icon: "database" },

    { id: 4, title: "Banking Support Agents", icon: "network" },

    { id: 5, title: "Credit Risk Models", icon: "brain" },

    { id: 6, title: "Regulatory Reporting AI", icon: "workflow" },

    { id: 7, title: "Model Risk Management", icon: "user" },

    { id: 8, title: "Core Banking Integration", icon: "link" },

  ],

  businessOutcomes: [

    {

      step: "01",

      leftCard: {

        title: "Detect Fraud in Real Time",

        points: ["Transaction anomaly scoring", "Explainable alert reason codes", "Adaptive model updates", "Analyst workflow integration"],

      },

      rightCard: {

        title: "Business Impact",

        points: ["Lower fraud losses", "Fewer false positives", "Faster investigations", "Regulatory confidence"],

      },

    },

    {

      step: "02",

      leftCard: {

        title: "Accelerate Customer Onboarding",

        points: ["Automated document extraction", "AML risk scoring", "Human review for edge cases", "CRM and core banking sync"],

      },

      rightCard: {

        title: "Business Impact",

        points: ["Faster time-to-revenue", "Better customer experience", "AML compliance maintained", "Lower ops cost per account"],

      },

    },

    {

      step: "03",

      leftCard: {

        title: "Empower Compliance Teams",

        points: ["Regulatory RAG search", "Cited policy answers", "Change monitoring alerts", "Audit-ready logging"],

      },

      rightCard: {

        title: "Business Impact",

        points: ["Faster regulatory response", "Reduced compliance risk", "Consistent policy application", "Lower advisory costs"],

      },

    },

    {

      step: "04",

      leftCard: {

        title: "Govern Financial AI",

        points: ["Model risk management", "Bias and fairness testing", "Audit trails and reporting", "Continuous monitoring"],

      },

      rightCard: {

        title: "Business Impact",

        points: ["Regulatory alignment", "Confident AI scaling", "Reduced model risk", "Board-ready governance"],

      },

    },

  ],

  provenResults: [

    {

      category: "FRAUD",

      title: "AI for Financial Services Fraud Detection",

      challenge: "Rule-based fraud systems generated excessive false positives and missed novel attack patterns at a digital bank.",

      solution: "Deployed Softree AI for financial services ML fraud scoring with explainable alerts integrated into transaction monitoring.",

      outcome: "Reduced fraud losses while cutting false positive investigation volume across the transaction network.",

      metric: "40%",

      metricLabel: "False Positive Reduction",

    },

    {

      category: "KYC",

      title: "AI for Financial Services KYC Automation",

      challenge: "Manual document review extended customer onboarding to 3+ days per account at a retail bank.",

      solution: "Built Softree AI for financial services document extraction with AML risk scoring and compliance review gates.",

      outcome: "Cut onboarding time while maintaining regulatory compliance and document accuracy.",

      metric: "60%",

      metricLabel: "Onboarding Time Reduction",

    },

    {

      category: "COMPLIANCE",

      title: "AI for Financial Services Compliance Assistant",

      challenge: "Compliance analysts spent hours searching across fragmented policy and regulatory documents.",

      solution: "Permission-aware Softree AI for financial services search over approved regulatory and internal policy libraries.",

      outcome: "Accelerated compliance research with governed, auditable, cited responses.",

      metric: "55%",

      metricLabel: "Faster Compliance Research",

    },

  ],

  useCases: [

    { id: "01", title: "Fraud Detection", description: "AI for financial services real-time transaction monitoring with explainable ML alerts.", icon: "finance", color: "from-red-300/30 to-red-200/10", image: `${base}/use-cases/uc-01.png?v=fin-uc-2` },

    { id: "02", title: "KYC Automation", description: "AI for financial services document extraction and AML risk scoring for onboarding.", icon: "finance", color: "from-blue-300/30 to-blue-200/10", image: `${base}/core-capabilities/cap-02.png?v=fin-uc-2` },

    { id: "03", title: "Compliance Assistants", description: "AI for financial services RAG search over regulations and internal policies.", icon: "finance", color: "from-emerald-300/30 to-emerald-200/10", image: `${base}/core-capabilities/cap-01.png?v=fin-uc-2` },

    { id: "04", title: "Customer Service AI", description: "AI for financial services secure banking and insurance support agents.", icon: "finance", color: "from-violet-300/30 to-violet-200/10", image: `${base}/success-stories/ss-01.png?v=fin-uc-2` },

    { id: "05", title: "Credit Risk Models", description: "AI for financial services explainable ML for lending and portfolio analytics.", icon: "finance", color: "from-orange-300/30 to-orange-200/10", image: `${base}/success-stories/ss-02.png?v=fin-uc-2` },

    { id: "06", title: "Regulatory Reporting", description: "AI for financial services automated report generation and model governance.", icon: "finance", color: "from-cyan-300/30 to-cyan-200/10", image: `${base}/success-stories/ss-03.png?v=fin-uc-2` },

  ],

  workflowSteps: [

    { id: "01", title: "Financial AI Strategy & Compliance", description: "We map regulatory requirements, data governance needs, and high-ROI AI for financial services use cases aligned to your institution.", icon: "search-document", image: `${base}/delivery-process/dp-01.png?v=dp-1` },

    { id: "02", title: "Secure Architecture Design", description: "We design Softree AI for financial services systems with encryption, access controls, and audit trails aligned to banking regulations.", icon: "development", image: `${base}/delivery-process/dp-02.png?v=dp-1` },

    { id: "03", title: "Model Development & Validation", description: "We build, validate, and document ML models with explainability and bias testing for regulatory review of AI for financial services.", icon: "workflow", image: `${base}/delivery-process/dp-03.png?v=dp-1` },

    { id: "04", title: "Deploy, Monitor & Govern", description: "We ship Softree AI for financial services with model risk management, continuous monitoring, and regulatory reporting frameworks.", icon: "analytics", image: `${base}/delivery-process/dp-04.png?v=dp-1` },

  ],

  faqs: [

    { id: 1, serial: "question 01", question: "Is Softree AI for financial services compliant with banking regulations?", answer: "We design Softree AI for financial services for regulatory alignment including SR 11-7 model risk management, AML/KYC requirements, and data privacy regulations—with audit trails and governance built into every deployment." },

    { id: 2, serial: "question 02", question: "Can Softree AI for financial services integrate with our core banking system?", answer: "Yes. Softree AI for financial services integrates with major core banking platforms, payment processors, and CRM systems via secure APIs—with scoped credentials and full transaction logging." },

    { id: 3, serial: "question 03", question: "How does Softree ensure AI for financial services models are explainable for auditors?", answer: "Softree AI for financial services uses SHAP, LIME, and reason-code frameworks so every AI decision can be explained to analysts, auditors, and regulators—with full model documentation." },

    { id: 4, serial: "question 04", question: "What AI for financial services use cases does Softree support?", answer: "Fraud detection, KYC automation, compliance knowledge assistants, customer service agents, credit risk models, and regulatory reporting—with governance tailored to each financial workflow." },

    { id: 5, serial: "question 05", question: "Do you support private cloud or on-premise AI for financial services?", answer: "Yes. Softree deploys AI for financial services on private cloud, on-premise, or hybrid architectures to meet data residency and security requirements for financial institutions." },

    { id: 6, serial: "question 06", question: "How long does an AI for financial services pilot take?", answer: "Most Softree AI for financial services pilots launch in 8–12 weeks—from regulatory assessment through model validation to a controlled production pilot." },

  ],

  successStories: [

    {

      id: "01",

      industryLabel: "FINTECH",

      title: "AI for Financial Services Fraud Detection",

      problem: "Rule-based systems missed novel fraud patterns and generated excessive false positives at a digital bank.",

      solution: "Softree AI for financial services ML fraud scoring with explainable alerts integrated into transaction monitoring.",

      results: ["40% fewer false positives", "95% fraud catch rate", "Sub-100ms scoring"],

      icon: "bank",

      color: "from-red-100/50 to-red-50/50",

      caseStudyUrl: "https://www.softreetechnology.com/contact",

      image: `${base}/success-stories/ss-01.png?v=fin-ss-1`,

      clientOverview: { name: "Digital Bank", industry: "Financial Services", country: "United Kingdom", organizationSize: "500+ Employees", businessType: "Neobank" },

    },

    {

      id: "02",

      industryLabel: "BANKING",

      title: "AI for Financial Services KYC Automation",

      problem: "Manual KYC review extended onboarding to 3+ days per customer at a regional retail bank.",

      solution: "Softree AI for financial services document extraction with AML risk scoring and compliance review gates.",

      results: ["60% faster onboarding", "95% document accuracy", "AML compliance maintained"],

      icon: "bank",

      color: "from-blue-100/50 to-blue-50/50",

      caseStudyUrl: "https://www.softreetechnology.com/contact",

      image: `${base}/success-stories/ss-02.png?v=fin-ss-1`,

      clientOverview: { name: "Regional Retail Bank", industry: "Financial Services", country: "India", organizationSize: "2,000+ Employees", businessType: "Retail Banking" },

    },

    {

      id: "03",

      industryLabel: "INSURANCE",

      title: "AI for Financial Services Compliance Assistant",

      problem: "Compliance teams spent hours searching fragmented regulatory documents at an insurance group.",

      solution: "Softree AI for financial services permission-aware RAG over approved regulatory and policy libraries.",

      results: ["55% faster research", "Cited audit-ready answers", "Reduced advisory costs"],

      icon: "bank",

      color: "from-emerald-100/50 to-emerald-50/50",

      caseStudyUrl: "https://www.softreetechnology.com/contact",

      image: `${base}/success-stories/ss-03.png?v=fin-ss-1`,

      clientOverview: { name: "Insurance Group", industry: "Financial Services", country: "Australia", organizationSize: "1,500+ Employees", businessType: "Insurance" },

    },

  ],

};


