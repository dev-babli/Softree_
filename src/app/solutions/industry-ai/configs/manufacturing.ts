import {

  Factory,

  Gauge,

  Network,

  ShieldCheck,

  TrendingUp,

  Wrench,

  Workflow,

  Zap,

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



const base = "/images/solutions/ai-for-manufacturing";



export const manufacturingConfig: IndustryPageConfig = {

  slug: "ai-for-manufacturing",

  metadata: {

    title: "AI for Manufacturing Solutions | Softree Technology",

    description:

      "Softree builds AI for manufacturing—predictive maintenance, computer vision quality inspection, supply chain planning, SOP assistants, and governed OT workflows for the plant floor.",

  },

  challengesColumnLabel: "Business Challenges",

  solutionsColumnLabel: "Manufacturing AI Solutions",

  hero: {

    label: "AI FOR MANUFACTURING",

    heading: {

      prefix: "AI for Manufacturing",

      highlight: "Built for the Plant Floor",

      suffix: "",

    },

    paragraph:

      "Softree Technology delivers AI for manufacturing that supports production and operations teams—predictive maintenance, computer vision quality inspection, supply chain planning, and intelligent SOP assistants grounded in your plant data.",

    ctaButtons: {

      primary: {

        text: "Talk to an Expert",

        href: "https://www.softreetechnology.com/contact",

      },

    },

    features: [

      { icon: ShieldCheck, title: "White-Label Friendly", subtitle: "Seamless integration" },

      { icon: Network, title: "Dedicated Offshore Teams", subtitle: "Scalable capacity" },

      { icon: Factory, title: "Microsoft AI Expertise", subtitle: "Certified partners" },

      { icon: TrendingUp, title: "Enterprise-Ready Delivery", subtitle: "Proven execution" },

    ],

    capabilities: [

      { id: "maint", title: "Maint", subtitle: "Predictive", icon: Wrench, angle: 270 },

      { id: "quality", title: "Quality", subtitle: "Vision AI", icon: Gauge, angle: 330 },

      { id: "supply", title: "Supply", subtitle: "Planning", icon: Network, angle: 30 },

      { id: "sop", title: "SOPs", subtitle: "Knowledge", icon: Workflow, angle: 90 },

      { id: "edge", title: "Edge", subtitle: "On-prem", icon: Zap, angle: 150 },

      { id: "govern", title: "Govern", subtitle: "OT security", icon: ShieldCheck, angle: 210 },

    ],

    heroImage: `${base}/hero.png?v=mfg-3`,

    heroVideo: `${base}/hero.mp4?v=mfg-vid-3`,

    layout: "stacked",

    heroMediaClass: "object-center",

    panelLabel: "Manufacturing AI Runtime",

    panelChips: ["maintenance", "quality", "supply", "edge"],

    panelCaption: "Live manufacturing AI runtime",

    panelSubcaption: "Maintenance · Quality · Supply · Edge",

  },

  sections: {

    successStories: {

      badge: "SUCCESS STORIES",

      title: "AI for Manufacturing",

      highlight: "Real-World Impact",

      description:

        "See how Softree AI for manufacturing improves uptime, quality, and supply planning with measurable plant-floor outcomes.",

    },

    coreCapabilities: {

      badge: "CORE CAPABILITIES",

      title: "AI for Manufacturing",

      highlight: "Capabilities",

      description:

        "Softree AI for manufacturing capabilities cover predictive maintenance, computer vision quality inspection, supply chain planning, SOP assistants, digital twins, and OT security governance.",

    },

    businessChallenges: {

      badge: "BUSINESS CHALLENGES",

      title: "AI for Manufacturing Solves",

      highlight: "Plant Challenges",

      description:

        "Factories struggle with unplanned downtime, manual quality inspection, supply volatility, and OT security risk. Softree AI for manufacturing turns those friction points into governed, production workflows.",

    },

    businessOutcomes: {

      badge: "BUSINESS OUTCOMES",

      title: "Turn AI for Manufacturing into Measurable",

      highlight: "Business Outcomes",

      description:

        "Softree AI for manufacturing helps plants reduce downtime, automate quality inspection, optimize supply and production planning, and deploy secure AI on the plant floor.",

    },

    provenResults: {

      badge: "PROVEN RESULTS",

      title: "Proven AI for Manufacturing",

      highlight: "Results",

      description:

        "Explore Softree AI for manufacturing deployments that cut unplanned downtime, improve defect detection, and optimize inventory and production planning.",

    },

    useCases: {

      badge: "MANUFACTURING USE CASES",

      title: "AI for Manufacturing Use Cases Across",

      highlight: "Smart Production",

      description:

        "From predictive maintenance and quality inspection to supply chain planning and SOP assistants—Softree delivers AI for manufacturing tailored to modern plant environments.",

    },

    techStack: {

      badge: "AI TECHNOLOGY STACK",

      title: "Stack for enterprise",

      highlight: "AI for manufacturing",

      description:

        "We build production AI for manufacturing with IoT telemetry, vision models, MES/ERP integrations, edge inference, Azure/AWS cloud controls, and observability for governed OT deployments.",

    },

    howItWorks: {

      badge: "HOW AI WORKS",

      title: "From manufacturing AI strategy to",

      highlight: "production plant workflows",

      description:

        "A structured Softree path for AI for manufacturing—from plant assessment and data architecture to edge deployment, OT security, and continuous monitoring.",

    },

    faq: {

      badge: "FAQ",

      title: "Frequently Asked",

      highlight: "Questions.",

      description:

        "Common questions about Softree AI for manufacturing—edge deployment, MES/ERP integration, OT security, ROI, pilots, and on-premise options.",

    },

  },

  coreCapabilities: [

    {

      id: "01",

      title: "Predictive Maintenance AI",

      shortDesc:

        "AI for manufacturing that predicts equipment failures from sensor telemetry and triggers maintenance before unplanned downtime.",

      icon: IconActivity,

      color: "bg-orange-100 text-orange-600",

      image: `${base}/core-capabilities/cap-01.png?v=mfg-2`,

      description:

        "Reduce unplanned downtime with Softree AI for manufacturing maintenance models trained on vibration, temperature, and operational telemetry—integrated to CMMS with automated work order routing.",

      highlights: [

        { title: "Sensor Fusion", desc: "Combine IoT signals for early warnings.", icon: IconActivity },

        { title: "Work Order Automation", desc: "Trigger maintenance tickets automatically.", icon: IconRobot },

        { title: "Downtime Reduction", desc: "Shift from reactive to predictive ops.", icon: IconTrendingUp },

      ],

      illustration: "automation",

      kpis: [

        { label: "Downtime Cut", value: "35%+" },

        { label: "MTBF Improvement", value: "25%+" },

        { label: "Alert Accuracy", value: "90%+" },

        { label: "Edge Ready", value: "Yes" },

      ],

    },

    {

      id: "02",

      title: "Computer Vision Quality Inspection",

      shortDesc:

        "AI for manufacturing vision inspection—inline defect detection at production speed with human review for edge cases.",

      icon: IconSearch,

      color: "bg-red-100 text-red-600",

      image: `${base}/core-capabilities/cap-02.png?v=mfg-2`,

      description:

        "Catch defects before they ship with Softree AI for manufacturing vision models that inspect surfaces, alignments, and packaging at line speed—escalating uncertain cases to operators with full audit trails.",

      highlights: [

        { title: "Real-time Inspection", desc: "Inline quality checks at line speed.", icon: IconSearch },

        { title: "Defect Classification", desc: "Categorize issues for root-cause analysis.", icon: IconChartBar },

        { title: "Human Review Loop", desc: "Escalate uncertain cases to operators.", icon: IconUserCheck },

      ],

      illustration: "architecture",

      kpis: [

        { label: "Defect Detection", value: "98%+" },

        { label: "False Positives", value: "Low" },

        { label: "Line Speed", value: "Maintained" },

        { label: "Audit Trails", value: "Full" },

      ],

    },

    {

      id: "03",

      title: "Supply Chain & Production Planning",

      shortDesc:

        "AI for manufacturing demand forecasting, inventory optimization, and production scheduling connected to ERP and MES.",

      icon: IconDatabase,

      color: "bg-blue-100 text-blue-600",

      image: `${base}/core-capabilities/cap-03.png?v=mfg-2`,

      description:

        "Align production with demand using Softree AI for manufacturing forecasting and scheduling models connected to ERP and MES—balancing inventory costs with service levels.",

      highlights: [

        { title: "Demand Forecasting", desc: "Predict demand across SKUs and regions.", icon: IconChartBar },

        { title: "Inventory Optimization", desc: "Balance stock levels and service levels.", icon: IconDatabase },

        { title: "Schedule Optimization", desc: "Optimize production runs and changeovers.", icon: IconActivity },

      ],

      illustration: "strategy",

      kpis: [

        { label: "Forecast Accuracy", value: "85%+" },

        { label: "Inventory Cost", value: "-20%" },

        { label: "ERP Integration", value: "Yes" },

        { label: "Planning Cycle", value: "Faster" },

      ],

    },

    {

      id: "04",

      title: "SOP & Technician Assistants",

      shortDesc:

        "AI for manufacturing knowledge search—RAG-powered SOPs, troubleshooting guides, and plant documentation for technicians.",

      icon: IconRobot,

      color: "bg-emerald-100 text-emerald-600",

      image: `${base}/core-capabilities/cap-04.png?v=mfg-2`,

      description:

        "Give technicians instant access to procedures and troubleshooting steps with Softree AI for manufacturing RAG—grounded in approved plant documentation with multilingual support.",

      highlights: [

        { title: "SOP Search", desc: "Find procedures by equipment or fault code.", icon: IconSearch },

        { title: "Troubleshooting Guides", desc: "Step-by-step guided resolution.", icon: IconRobot },

        { title: "Multilingual Support", desc: "Support global plant workforces.", icon: IconServer },

      ],

      illustration: "security",

      kpis: [

        { label: "Resolution Time", value: "-40%" },

        { label: "Knowledge Access", value: "Instant" },

        { label: "Training Time", value: "-30%" },

        { label: "Grounded Answers", value: "90%+" },

      ],

    },

    {

      id: "05",

      title: "Digital Twin & Process Optimization",

      shortDesc:

        "AI for manufacturing digital twins—simulate production scenarios and optimize throughput, yield, and energy consumption.",

      icon: IconActivity,

      color: "bg-violet-100 text-violet-600",

      image: `${base}/core-capabilities/cap-05.png?v=mfg-2`,

      description:

        "Model production lines digitally with Softree AI for manufacturing to test what-if scenarios, predict bottlenecks, and optimize resource allocation without disrupting live operations.",

      highlights: [

        { title: "Process Simulation", desc: "Test what-if scenarios safely.", icon: IconActivity },

        { title: "Yield Optimization", desc: "Identify parameters that improve output.", icon: IconTrendingUp },

        { title: "Energy Efficiency", desc: "Reduce waste in high-consumption processes.", icon: IconChartBar },

      ],

      illustration: "automation",

      kpis: [

        { label: "Throughput Gain", value: "15%+" },

        { label: "Energy Savings", value: "10%+" },

        { label: "Simulation Speed", value: "Real-time" },

        { label: "MES Connected", value: "Yes" },

      ],

    },

    {

      id: "06",

      title: "OT Security & AI Governance",

      shortDesc:

        "AI for manufacturing governance—secure edge deployments with OT network segmentation, model versioning, and audit trails.",

      icon: IconShieldLock,

      color: "bg-cyan-100 text-cyan-600",

      image: `${base}/core-capabilities/cap-06.png?v=mfg-2`,

      description:

        "Deploy Softree AI for manufacturing on the plant floor with confidence—OT network segmentation, model versioning, edge health monitoring, and continuous governance built into every deployment.",

      highlights: [

        { title: "OT Network Security", desc: "Segment AI workloads from critical systems.", icon: IconShieldLock },

        { title: "Model Versioning", desc: "Track and rollback model deployments.", icon: IconActivity },

        { title: "Edge Monitoring", desc: "Health checks for on-prem AI nodes.", icon: IconServer },

      ],

      illustration: "security",

      kpis: [

        { label: "OT Compliance", value: "Aligned" },

        { label: "Model Governance", value: "Full" },

        { label: "Edge Uptime", value: "99%+" },

        { label: "Audit Trails", value: "On" },

      ],

    },

  ],

  businessChallenges: [

    { id: 1, title: "Unplanned downtime costs millions per hour", icon: "clock" },

    { id: 2, title: "Manual quality inspection misses defects at speed", icon: "workflow" },

    { id: 3, title: "Supply chain volatility disrupts production plans", icon: "database" },

    { id: 4, title: "Technicians lack instant access to SOPs", icon: "brain" },

    { id: 5, title: "Siloed plant data blocks AI adoption", icon: "link" },

    { id: 6, title: "OT security concerns block cloud AI", icon: "lock" },

    { id: 7, title: "Energy and yield optimization is manual", icon: "badge-dollar" },

    { id: 8, title: "AI pilots never reach production on the floor", icon: "shield-alert" },

  ],

  aiSolutions: [

    { id: 1, title: "Predictive Maintenance AI", icon: "robot" },

    { id: 2, title: "Vision Quality Inspection", icon: "brain" },

    { id: 3, title: "Supply Chain Forecasting", icon: "database" },

    { id: 4, title: "SOP Knowledge Assistants", icon: "network" },

    { id: 5, title: "Digital Twin Simulation", icon: "workflow" },

    { id: 6, title: "Edge AI Deployment", icon: "link" },

    { id: 7, title: "MES & ERP Integration", icon: "user" },

    { id: 8, title: "OT Security Governance", icon: "lock" },

  ],

  businessOutcomes: [

    {

      step: "01",

      leftCard: {

        title: "Reduce Unplanned Downtime",

        points: ["Sensor-driven predictions", "Automated work orders", "Maintenance scheduling", "Equipment health dashboards"],

      },

      rightCard: {

        title: "Business Impact",

        points: ["Higher OEE", "Lower repair costs", "Extended asset life", "Predictable production"],

      },

    },

    {

      step: "02",

      leftCard: {

        title: "Automate Quality Inspection",

        points: ["Inline vision inspection", "Defect classification", "Human review for edge cases", "Root-cause analytics"],

      },

      rightCard: {

        title: "Business Impact",

        points: ["Fewer defects shipped", "Consistent quality", "Lower scrap rates", "Faster line speeds"],

      },

    },

    {

      step: "03",

      leftCard: {

        title: "Optimize Supply & Production",

        points: ["Demand forecasting", "Inventory optimization", "Production scheduling", "ERP/MES integration"],

      },

      rightCard: {

        title: "Business Impact",

        points: ["Lower inventory costs", "Better service levels", "Reduced waste", "Agile planning"],

      },

    },

    {

      step: "04",

      leftCard: {

        title: "Govern OT AI Deployments",

        points: ["Edge security controls", "Model versioning", "Audit trails", "Continuous monitoring"],

      },

      rightCard: {

        title: "Business Impact",

        points: ["Secure AI on the floor", "Regulatory alignment", "Confident scaling", "Production reliability"],

      },

    },

  ],

  provenResults: [

    {

      category: "MAINTENANCE",

      title: "AI for Manufacturing Predictive Maintenance",

      challenge: "Unplanned line stoppages cost $50K+ per hour in lost production at an auto parts plant.",

      solution: "Deployed Softree AI for manufacturing sensor fusion models with automated maintenance ticketing integrated to CMMS.",

      outcome: "Cut unplanned downtime and extended mean time between failures across critical production lines.",

      metric: "35%",

      metricLabel: "Downtime Reduction",

    },

    {

      category: "QUALITY",

      title: "AI for Manufacturing Vision Inspection",

      challenge: "Manual inspection missed micro-defects at high assembly line speeds.",

      solution: "Built Softree AI for manufacturing inline computer vision with human review loop for uncertain classifications.",

      outcome: "Improved defect catch rate while maintaining production throughput and audit-ready quality records.",

      metric: "98%",

      metricLabel: "Defect Detection Rate",

    },

    {

      category: "SUPPLY CHAIN",

      title: "AI for Manufacturing Demand Forecasting",

      challenge: "Volatile demand caused excess inventory and frequent stockouts for a consumer goods producer.",

      solution: "Softree AI for manufacturing forecasting connected to ERP with automated production schedule adjustments.",

      outcome: "Reduced inventory carrying costs while improving fill rates and planning agility.",

      metric: "20%",

      metricLabel: "Inventory Cost Reduction",

    },

  ],

  useCases: [

    { id: "01", title: "Predictive Maintenance", description: "AI for manufacturing sensor-driven failure prediction and automated maintenance scheduling.", icon: "manufacturing", color: "from-orange-300/30 to-orange-200/10", image: `${base}/use-cases/uc-01.png?v=mfg-uc-1` },

    { id: "02", title: "Quality Inspection", description: "AI for manufacturing computer vision defect detection on production lines.", icon: "manufacturing", color: "from-red-300/30 to-red-200/10", image: `${base}/use-cases/uc-02.png?v=mfg-uc-1` },

    { id: "03", title: "Supply Chain Planning", description: "AI for manufacturing demand forecasting and inventory optimization.", icon: "manufacturing", color: "from-blue-300/30 to-blue-200/10", image: `${base}/use-cases/uc-03.png?v=mfg-uc-1` },

    { id: "04", title: "SOP Assistants", description: "AI for manufacturing RAG-powered troubleshooting and procedure guides for technicians.", icon: "manufacturing", color: "from-emerald-300/30 to-emerald-200/10", image: `${base}/use-cases/uc-04.png?v=mfg-uc-1` },

    { id: "05", title: "Digital Twins", description: "AI for manufacturing process simulation and yield optimization.", icon: "manufacturing", color: "from-violet-300/30 to-violet-200/10", image: `${base}/use-cases/uc-05.png?v=mfg-uc-1` },

    { id: "06", title: "Energy Optimization", description: "AI for manufacturing energy consumption analysis and waste reduction.", icon: "manufacturing", color: "from-cyan-300/30 to-cyan-200/10", image: `${base}/use-cases/uc-06.png?v=mfg-uc-1` },

  ],

  workflowSteps: [

    { id: "01", title: "Manufacturing AI Strategy & Assessment", description: "We map plant workflows, OT constraints, and high-ROI AI for manufacturing use cases across maintenance, quality, and supply chain.", icon: "search-document", image: `${base}/delivery-process/dp-01.png?v=dp-1` },

    { id: "02", title: "Data & Edge Architecture", description: "We design Softree AI for manufacturing data pipelines from sensors, MES, and ERP—with edge deployment for latency-sensitive workloads.", icon: "development", image: `${base}/delivery-process/dp-02.png?v=dp-1` },

    { id: "03", title: "Model Development & Integration", description: "We build and validate ML models, vision systems, and agent workflows integrated to your plant systems for AI for manufacturing.", icon: "workflow", image: `${base}/delivery-process/dp-03.png?v=dp-1` },

    { id: "04", title: "Deploy, Monitor & Scale", description: "We ship Softree AI for manufacturing with OT security hardening, edge or cloud deployment, and continuous model performance monitoring.", icon: "analytics", image: `${base}/delivery-process/dp-04.png?v=dp-1` },

  ],

  faqs: [

    { id: 1, serial: "question 01", question: "Can Softree AI for manufacturing run on the plant floor without cloud connectivity?", answer: "Yes. Softree deploys edge AI for manufacturing for latency-sensitive workloads like vision inspection and predictive maintenance, with optional cloud sync for model updates and analytics." },

    { id: 2, serial: "question 02", question: "How does Softree AI for manufacturing integrate with MES and ERP systems?", answer: "Softree AI for manufacturing connects via APIs, OPC-UA, MQTT, and standard ERP connectors—ensuring AI workflows read production data and trigger actions within your existing systems." },

    { id: 3, serial: "question 03", question: "Is Softree AI for manufacturing secure for OT environments?", answer: "We follow OT security best practices for AI for manufacturing—network segmentation, least-privilege access, model governance, and audit trails—so deployments don't compromise critical infrastructure." },

    { id: 4, serial: "question 04", question: "What ROI can we expect from AI for manufacturing predictive maintenance?", answer: "Most manufacturers see 25–40% reduction in unplanned downtime within the first year of Softree AI for manufacturing, with payback periods of 6–12 months depending on equipment criticality and sensor coverage." },

    { id: 5, serial: "question 05", question: "Does Softree AI for manufacturing support legacy equipment without IoT sensors?", answer: "Yes. Softree AI for manufacturing can retrofit IoT gateways, use existing PLC data, or start with knowledge-based SOP assistants while building toward sensor-driven predictive models." },

    { id: 6, serial: "question 06", question: "How long does an AI for manufacturing pilot take?", answer: "Most Softree AI for manufacturing pilots launch in 8–12 weeks—from data assessment through model validation to a production pilot on one line or asset class." },

  ],

  successStories: [

    {

      id: "01",

      industryLabel: "MANUFACTURING",

      title: "AI for Manufacturing Predictive Maintenance",

      problem: "Unplanned stoppages cost millions in lost production annually at a global auto parts plant.",

      solution: "Softree AI for manufacturing sensor fusion models with CMMS-integrated maintenance automation.",

      results: ["35% downtime reduction", "25% MTBF improvement", "ROI in 8 months"],

      icon: "manufacturing",

      color: "from-orange-100/50 to-orange-50/50",

      caseStudyUrl: "https://www.softreetechnology.com/contact",

      image: `${base}/success-stories/ss-01.png?v=mfg-ss-1`,

      clientOverview: { name: "Global Auto Parts Manufacturer", industry: "Manufacturing", country: "Germany", organizationSize: "5,000+ Employees", businessType: "Automotive Supplier" },

    },

    {

      id: "02",

      industryLabel: "MANUFACTURING",

      title: "AI for Manufacturing Vision Inspection",

      problem: "Manual inspection missed defects at production line speeds for an electronics manufacturer.",

      solution: "Softree AI for manufacturing inline computer vision with human review for uncertain cases.",

      results: ["98% defect detection", "Maintained line speed", "Reduced scrap by 22%"],

      icon: "manufacturing",

      color: "from-red-100/50 to-red-50/50",

      caseStudyUrl: "https://www.softreetechnology.com/contact",

      image: `${base}/success-stories/ss-02.png?v=mfg-ss-1`,

      clientOverview: { name: "Electronics Manufacturer", industry: "Manufacturing", country: "Taiwan", organizationSize: "3,200+ Employees", businessType: "Consumer Electronics" },

    },

    {

      id: "03",

      industryLabel: "MANUFACTURING",

      title: "AI for Manufacturing Supply Chain Forecasting",

      problem: "Demand volatility caused excess inventory and frequent stockouts for an FMCG producer.",

      solution: "Softree AI for manufacturing ML forecasting integrated with ERP and production scheduling.",

      results: ["20% inventory cost reduction", "85% forecast accuracy", "Improved fill rates"],

      icon: "manufacturing",

      color: "from-blue-100/50 to-blue-50/50",

      caseStudyUrl: "https://www.softreetechnology.com/contact",

      image: `${base}/success-stories/ss-03.png?v=mfg-ss-1`,

      clientOverview: { name: "FMCG Producer", industry: "Manufacturing", country: "United States", organizationSize: "1,800+ Employees", businessType: "Consumer Goods" },

    },

  ],

};


