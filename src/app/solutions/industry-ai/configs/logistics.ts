import { MapPin, Package, Route, ShieldCheck, TrendingUp, Truck, Warehouse, Workflow } from "lucide-react";

import { IconActivity, IconChartBar, IconDatabase, IconRobot, IconSearch, IconServer, IconShieldLock, IconTrendingUp, IconUserCheck } from "@tabler/icons-react";

import type { IndustryPageConfig } from "../types";



const base = "/images/solutions/ai-for-logistics";



export const logisticsConfig: IndustryPageConfig = {

  slug: "ai-for-logistics",

  metadata: {

    title: "AI for Logistics Solutions | Softree Technology",

    description:

      "Softree builds AI for logistics—route optimization, warehouse automation, demand forecasting, shipment tracking agents, and end-to-end supply chain visibility.",

  },

  challengesColumnLabel: "Business Challenges",

  solutionsColumnLabel: "Logistics AI Solutions",

  hero: {

    label: "AI FOR LOGISTICS",

    heading: {

      prefix: "AI for Logistics",

      highlight: "That Moves Faster",

      suffix: "",

    },

    paragraph:

      "Softree Technology delivers AI for logistics that supports fleet, warehouse, and supply chain teams—route optimization, warehouse automation, demand forecasting, shipment exception agents, and real-time visibility across your network.",

    ctaButtons: {

      primary: {

        text: "Talk to an Expert",

        href: "https://www.softreetechnology.com/contact",

      },

    },

    features: [

      { icon: ShieldCheck, title: "White-Label Friendly", subtitle: "Seamless integration" },

      { icon: Truck, title: "Dedicated Offshore Teams", subtitle: "Scalable capacity" },

      { icon: Package, title: "Microsoft AI Expertise", subtitle: "Certified partners" },

      { icon: TrendingUp, title: "Enterprise-Ready Delivery", subtitle: "Proven execution" },

    ],

    capabilities: [

      { id: "route", title: "Routes", subtitle: "Optimize", icon: Route, angle: 270 },

      { id: "warehouse", title: "Warehouse", subtitle: "Automate", icon: Warehouse, angle: 330 },

      { id: "forecast", title: "Forecast", subtitle: "Demand", icon: TrendingUp, angle: 30 },

      { id: "track", title: "Tracking", subtitle: "Shipments", icon: MapPin, angle: 90 },

      { id: "exceptions", title: "Exceptions", subtitle: "Agents", icon: Workflow, angle: 150 },

      { id: "govern", title: "Govern", subtitle: "Visibility", icon: ShieldCheck, angle: 210 },

    ],

    heroImage: `${base}/hero.png?v=log-3`,

    heroVideo: `${base}/hero.mp4?v=log-vid-3`,

    layout: "stacked",

    heroMediaClass: "object-center",

    textTone: "dark",

    softGlow: true,

    panelLabel: "Logistics AI Runtime",

    panelChips: ["routing", "warehouse", "forecast", "tracking"],

    panelCaption: "Live logistics AI runtime",

    panelSubcaption: "Routing · Warehouse · Forecast · Tracking",

  },

  sections: {

    successStories: {

      badge: "SUCCESS STORIES",

      title: "AI for Logistics",

      highlight: "Real-World Impact",

      description:

        "See how Softree AI for logistics improves routing efficiency, warehouse throughput, and shipment visibility with measurable operational outcomes.",

    },

    coreCapabilities: {

      badge: "CORE CAPABILITIES",

      title: "AI for Logistics",

      highlight: "Capabilities",

      description:

        "Softree AI for logistics capabilities cover route and fleet optimization, warehouse automation, demand forecasting, shipment tracking agents, exception management, and supply chain visibility.",

    },

    businessChallenges: {

      badge: "BUSINESS CHALLENGES",

      title: "AI for Logistics Solves",

      highlight: "Supply Chain Challenges",

      description:

        "Logistics networks struggle with rising delivery costs, warehouse inefficiency, demand volatility, and siloed TMS/WMS data. Softree AI for logistics turns those friction points into governed, production workflows.",

    },

    businessOutcomes: {

      badge: "BUSINESS OUTCOMES",

      title: "Turn AI for Logistics into Measurable",

      highlight: "Business Outcomes",

      description:

        "Softree AI for logistics helps fleets cut miles, warehouses pick faster, forecast capacity accurately, and resolve shipment exceptions with proactive visibility.",

    },

    provenResults: {

      badge: "PROVEN RESULTS",

      title: "Proven AI for Logistics",

      highlight: "Results",

      description:

        "Explore Softree AI for logistics deployments that reduce miles driven, improve pick rates, and accelerate exception resolution across supply chain networks.",

    },

    useCases: {

      badge: "LOGISTICS USE CASES",

      title: "AI for Logistics Use Cases Across",

      highlight: "Supply Chain Operations",

      description:

        "From last-mile routing and warehouse automation to demand forecasting and exception management—Softree delivers AI for logistics tailored to modern supply chain environments.",

    },

    techStack: {

      badge: "AI TECHNOLOGY STACK",

      title: "Stack for enterprise",

      highlight: "AI for logistics",

      description:

        "We build production AI for logistics with TMS/WMS integrations, routing optimizers, forecasting models, carrier API orchestration, and real-time visibility tooling.",

    },

    howItWorks: {

      badge: "HOW AI WORKS",

      title: "From logistics AI strategy to",

      highlight: "production network workflows",

      description:

        "A structured Softree path for AI for logistics—from network assessment and data integration to pilot validation, scaled rollout, and continuous monitoring.",

    },

    faq: {

      badge: "FAQ",

      title: "Frequently Asked",

      highlight: "Questions.",

      description:

        "Common questions about Softree AI for logistics—TMS/WMS integration, routing ROI, warehouse AI, use cases, pilots, and multi-carrier deployment options.",

    },

  },

  coreCapabilities: [

    {

      id: "01",

      title: "Route & Fleet Optimization",

      shortDesc:

        "AI for logistics route planning—dynamic re-routing, load optimization, and ETA prediction for delivery fleets.",

      icon: IconActivity,

      color: "bg-blue-100 text-blue-600",

      image: `${base}/core-capabilities/cap-01.png?v=log-2`,

      description:

        "Reduce miles, fuel, and delivery times with Softree AI for logistics routing models that optimize in real time based on traffic, capacity, and delivery constraints.",

      highlights: [

        { title: "Dynamic Routing", desc: "Re-route based on live conditions.", icon: IconActivity },

        { title: "Load Optimization", desc: "Maximize vehicle utilization.", icon: IconChartBar },

        { title: "ETA Prediction", desc: "Accurate delivery time estimates.", icon: IconTrendingUp },

      ],

      illustration: "automation",

      kpis: [

        { label: "Miles Reduced", value: "15%+" },

        { label: "On-time Delivery", value: "95%+" },

        { label: "Fuel Savings", value: "12%+" },

        { label: "Fleet Utilization", value: "+20%" },

      ],

    },

    {

      id: "02",

      title: "Warehouse Automation & Picking",

      shortDesc:

        "AI for logistics warehouse optimization—AI-guided picking, slotting, and inventory placement for faster fulfillment.",

      icon: IconRobot,

      color: "bg-orange-100 text-orange-600",

      image: `${base}/core-capabilities/cap-02.png?v=log-2`,

      description:

        "Optimize warehouse layouts, pick paths, and inventory placement with Softree AI for logistics that learns from operational patterns and integrates with your WMS.",

      highlights: [

        { title: "Pick Path Optimization", desc: "Minimize travel time per order.", icon: IconRobot },

        { title: "Slotting Intelligence", desc: "Place fast movers near dispatch.", icon: IconSearch },

        { title: "Inventory Accuracy", desc: "Reduce stock discrepancies.", icon: IconDatabase },

      ],

      illustration: "architecture",

      kpis: [

        { label: "Pick Rate", value: "+30%" },

        { label: "Order Accuracy", value: "99%+" },

        { label: "Labor Efficiency", value: "+25%" },

        { label: "WMS Integration", value: "Yes" },

      ],

    },

    {

      id: "03",

      title: "Demand & Capacity Forecasting",

      shortDesc:

        "AI for logistics forecasting—ML models for shipment volumes, warehouse capacity, and seasonal demand patterns.",

      icon: IconChartBar,

      color: "bg-emerald-100 text-emerald-600",

      image: `${base}/core-capabilities/cap-03.png?v=log-2`,

      description:

        "Plan ahead with Softree AI for logistics demand forecasts that inform staffing, fleet sizing, and warehouse capacity decisions connected to your TMS data.",

      highlights: [

        { title: "Volume Forecasting", desc: "Predict shipment volumes by lane.", icon: IconChartBar },

        { title: "Seasonal Patterns", desc: "Account for peaks and holidays.", icon: IconTrendingUp },

        { title: "Capacity Planning", desc: "Right-size resources ahead of demand.", icon: IconActivity },

      ],

      illustration: "strategy",

      kpis: [

        { label: "Forecast Accuracy", value: "88%+" },

        { label: "Capacity Waste", value: "-20%" },

        { label: "Planning Cycle", value: "Weekly" },

        { label: "TMS Connected", value: "Yes" },

      ],

    },

    {

      id: "04",

      title: "Shipment Tracking & Visibility",

      shortDesc:

        "AI for logistics visibility—real-time shipment status agents and proactive exception alerts across your network.",

      icon: IconSearch,

      color: "bg-violet-100 text-violet-600",

      image: `${base}/core-capabilities/cap-04.png?v=log-2`,

      description:

        "Give customers and ops teams real-time visibility with Softree AI for logistics agents that track shipments, flag exceptions, and automate status communications.",

      highlights: [

        { title: "Real-time Tracking", desc: "Live status across carriers and lanes.", icon: IconSearch },

        { title: "Exception Alerts", desc: "Proactive delay and damage notifications.", icon: IconActivity },

        { title: "Customer Updates", desc: "Automated status communications.", icon: IconRobot },

      ],

      illustration: "automation",

      kpis: [

        { label: "Visibility Coverage", value: "95%+" },

        { label: "Exception Response", value: "3× faster" },

        { label: "Customer CSAT", value: "4.6/5" },

        { label: "Carrier Integration", value: "Multi" },

      ],

    },

    {

      id: "05",

      title: "Exception Management Agents",

      shortDesc:

        "AI for logistics exception handling—investigate delays, route exceptions, and coordinate resolution across teams.",

      icon: IconRobot,

      color: "bg-red-100 text-red-600",

      image: `${base}/core-capabilities/cap-05.png?v=log-2`,

      description:

        "Automate exception handling with Softree AI for logistics agents that investigate root causes, notify stakeholders, and trigger reroutes, refunds, or escalations.",

      highlights: [

        { title: "Root Cause Analysis", desc: "Identify why shipments are delayed.", icon: IconSearch },

        { title: "Stakeholder Routing", desc: "Notify the right team automatically.", icon: IconRobot },

        { title: "Resolution Workflows", desc: "Trigger reroutes, refunds, or escalations.", icon: IconActivity },

      ],

      illustration: "security",

      kpis: [

        { label: "Resolution Time", value: "-50%" },

        { label: "Manual Triage", value: "-60%" },

        { label: "Escalation Accuracy", value: "90%+" },

        { label: "TMS Integration", value: "Yes" },

      ],

    },

    {

      id: "06",

      title: "Supply Chain Visibility Platform",

      shortDesc:

        "AI for logistics end-to-end visibility—unified dashboard and anomaly detection across suppliers, warehouses, and carriers.",

      icon: IconShieldLock,

      color: "bg-cyan-100 text-cyan-600",

      image: `${base}/core-capabilities/cap-06.png?v=log-2`,

      description:

        "Connect your supply chain data into a single visibility layer with Softree AI for logistics—AI-driven insights, disruption alerts, and partner API integration included.",

      highlights: [

        { title: "End-to-End Visibility", desc: "Track from supplier to customer.", icon: IconDatabase },

        { title: "Anomaly Detection", desc: "Spot disruptions before they cascade.", icon: IconActivity },

        { title: "Partner Integration", desc: "Connect carriers, 3PLs, and suppliers.", icon: IconServer },

      ],

      illustration: "security",

      kpis: [

        { label: "Network Coverage", value: "Full" },

        { label: "Disruption Alerts", value: "Real-time" },

        { label: "Data Latency", value: "<5 min" },

        { label: "Partner APIs", value: "50+" },

      ],

    },

  ],

  businessChallenges: [

    { id: 1, title: "Rising fuel and last-mile delivery costs", icon: "badge-dollar" },

    { id: 2, title: "Warehouse labor shortages and inefficiency", icon: "workflow" },

    { id: 3, title: "Demand volatility breaks capacity planning", icon: "database" },

    { id: 4, title: "Customers demand real-time shipment visibility", icon: "clock" },

    { id: 5, title: "Exception handling is manual and slow", icon: "brain" },

    { id: 6, title: "Siloed TMS, WMS, and carrier data", icon: "link" },

    { id: 7, title: "Route planning doesn't adapt to live conditions", icon: "shield-alert" },

    { id: 8, title: "Supply chain disruptions lack early warning", icon: "lock" },

  ],

  aiSolutions: [

    { id: 1, title: "Dynamic Route Optimization", icon: "network" },

    { id: 2, title: "Warehouse Pick Optimization", icon: "robot" },

    { id: 3, title: "Demand Forecasting", icon: "database" },

    { id: 4, title: "Shipment Tracking Agents", icon: "workflow" },

    { id: 5, title: "Exception Management AI", icon: "brain" },

    { id: 6, title: "Supply Chain Visibility", icon: "link" },

    { id: 7, title: "TMS & WMS Integration", icon: "user" },

    { id: 8, title: "Carrier API Orchestration", icon: "lock" },

  ],

  businessOutcomes: [

    {

      step: "01",

      leftCard: {

        title: "Optimize Routes & Fleet",

        points: ["Dynamic route planning", "Load optimization", "Real-time re-routing", "ETA prediction"],

      },

      rightCard: {

        title: "Business Impact",

        points: ["Lower fuel costs", "More on-time deliveries", "Higher fleet utilization", "Better driver productivity"],

      },

    },

    {

      step: "02",

      leftCard: {

        title: "Automate Warehouse Operations",

        points: ["Pick path optimization", "Slotting intelligence", "Inventory accuracy", "WMS integration"],

      },

      rightCard: {

        title: "Business Impact",

        points: ["Higher pick rates", "Fewer errors", "Lower labor costs", "Faster order fulfillment"],

      },

    },

    {

      step: "03",

      leftCard: {

        title: "Forecast Demand & Capacity",

        points: ["Volume forecasting by lane", "Seasonal pattern detection", "Capacity planning", "TMS data integration"],

      },

      rightCard: {

        title: "Business Impact",

        points: ["Right-sized resources", "Fewer capacity crises", "Lower overtime costs", "Agile planning"],

      },

    },

    {

      step: "04",

      leftCard: {

        title: "Gain End-to-End Visibility",

        points: ["Real-time tracking", "Exception agents", "Anomaly detection", "Partner API integration"],

      },

      rightCard: {

        title: "Business Impact",

        points: ["Proactive disruption response", "Higher customer satisfaction", "Lower exception costs", "Connected supply chain"],

      },

    },

  ],

  provenResults: [

    {

      category: "LAST MILE",

      title: "AI for Logistics Route Optimization",

      challenge: "Static routes wasted fuel and missed delivery windows during peak demand for a regional delivery fleet.",

      solution: "Deployed Softree AI for logistics dynamic ML routing with real-time traffic and capacity constraints integrated to TMS.",

      outcome: "Reduced miles driven and improved on-time delivery rates across the delivery network.",

      metric: "15%",

      metricLabel: "Miles Reduction",

    },

    {

      category: "WAREHOUSE",

      title: "AI for Logistics Pick Path Optimization",

      challenge: "Warehouse pickers spent excessive time traveling between locations at an e-commerce fulfillment center.",

      solution: "Built Softree AI for logistics pick paths and slotting optimization integrated with WMS.",

      outcome: "Increased pick rates and order accuracy with the same headcount and faster fulfillment cycles.",

      metric: "30%",

      metricLabel: "Pick Rate Improvement",

    },

    {

      category: "VISIBILITY",

      title: "AI for Logistics Exception Management",

      challenge: "Manual exception triage delayed customer notifications and resolution at a global freight forwarder.",

      solution: "Softree AI for logistics agents that investigate delays, route exceptions, and trigger resolution workflows.",

      outcome: "Cut exception resolution time and improved customer communication across the logistics network.",

      metric: "50%",

      metricLabel: "Faster Exception Resolution",

    },

  ],

  useCases: [

    { id: "01", title: "Route Optimization", description: "AI for logistics dynamic fleet routing with real-time traffic and load optimization.", icon: "logistics", color: "from-blue-300/30 to-blue-200/10", image: `${base}/use-cases/uc-01.png?v=log-uc-2` },

    { id: "02", title: "Warehouse Automation", description: "AI for logistics guided picking, slotting, and inventory placement.", icon: "logistics", color: "from-orange-300/30 to-orange-200/10", image: `${base}/core-capabilities/cap-02.png?v=log-uc-2` },

    { id: "03", title: "Demand Forecasting", description: "AI for logistics ML volume and capacity forecasting for planning.", icon: "logistics", color: "from-emerald-300/30 to-emerald-200/10", image: `${base}/core-capabilities/cap-03.png?v=log-uc-2` },

    { id: "04", title: "Shipment Tracking", description: "AI for logistics real-time visibility and automated customer status updates.", icon: "logistics", color: "from-violet-300/30 to-violet-200/10", image: `${base}/success-stories/ss-01.png?v=log-uc-2` },

    { id: "05", title: "Exception Management", description: "AI for logistics agents for delay investigation and resolution routing.", icon: "logistics", color: "from-red-300/30 to-red-200/10", image: `${base}/success-stories/ss-02.png?v=log-uc-2` },

    { id: "06", title: "Supply Chain Visibility", description: "AI for logistics end-to-end network visibility with anomaly detection.", icon: "logistics", color: "from-cyan-300/30 to-cyan-200/10", image: `${base}/success-stories/ss-03.png?v=log-uc-2` },

  ],

  workflowSteps: [

    { id: "01", title: "Logistics AI Strategy & Assessment", description: "We map your network, TMS/WMS landscape, and high-ROI AI for logistics use cases across routing, warehouse, and visibility.", icon: "search-document", image: `${base}/delivery-process/dp-01.png?v=dp-1` },

    { id: "02", title: "Data Integration Architecture", description: "We connect TMS, WMS, carrier APIs, and ERP data into a unified AI-ready data layer for Softree AI for logistics.", icon: "development", image: `${base}/delivery-process/dp-02.png?v=dp-1` },

    { id: "03", title: "Model Development & Pilot", description: "We build and validate routing, forecasting, and agent models for AI for logistics on a focused lane or warehouse.", icon: "workflow", image: `${base}/delivery-process/dp-03.png?v=dp-1` },

    { id: "04", title: "Deploy, Monitor & Scale", description: "We ship Softree AI for logistics across your network with continuous monitoring and performance optimization.", icon: "analytics", image: `${base}/delivery-process/dp-04.png?v=dp-1` },

  ],

  faqs: [

    { id: 1, serial: "question 01", question: "Can Softree AI for logistics integrate with our TMS and WMS systems?", answer: "Yes. Softree AI for logistics integrates with major TMS and WMS platforms including SAP TM, Oracle, Manhattan, Blue Yonder, and custom systems via APIs and EDI." },

    { id: 2, serial: "question 02", question: "How much can AI for logistics route optimization reduce delivery costs?", answer: "Most fleets see 10–20% reduction in miles driven and 8–15% fuel savings with Softree AI for logistics, with improved on-time delivery rates of 5–10 percentage points." },

    { id: 3, serial: "question 03", question: "Does Softree AI for logistics warehouse automation require new hardware?", answer: "Not necessarily. Softree AI for logistics optimizes within your existing WMS and handheld infrastructure—adding computer vision or robotics only where ROI justifies it." },

    { id: 4, serial: "question 04", question: "What AI for logistics use cases does Softree support?", answer: "Route optimization, warehouse automation, demand forecasting, shipment tracking, exception management, and supply chain visibility—with integrations tailored to each logistics workflow." },

    { id: 5, serial: "question 05", question: "How long does an AI for logistics pilot take?", answer: "Most Softree AI for logistics pilots on a single lane, warehouse, or carrier launch in 6–10 weeks from data integration through model validation." },

    { id: 6, serial: "question 06", question: "Do you support multi-carrier and 3PL networks for AI for logistics?", answer: "Yes. Softree deploys AI for logistics that orchestrates data across multiple carriers, 3PLs, and freight forwarders into a unified visibility and optimization layer." },

  ],

  successStories: [

    {

      id: "01",

      industryLabel: "LOGISTICS",

      title: "AI for Logistics Route Optimization",

      problem: "Static routes wasted fuel and missed delivery windows during peak periods for a regional delivery company.",

      solution: "Softree AI for logistics ML routing with real-time traffic integration connected to TMS.",

      results: ["15% miles reduction", "95% on-time delivery", "12% fuel savings"],

      icon: "logistics",

      color: "from-blue-100/50 to-blue-50/50",

      caseStudyUrl: "https://www.softreetechnology.com/case-studies/ai-shipment-delay-prediction-platform",

      image: `${base}/success-stories/ss-01.png?v=log-ss-1`,

      clientOverview: { name: "Regional Delivery Company", industry: "Logistics", country: "United States", organizationSize: "1,200+ Employees", businessType: "Last-Mile Delivery" },

    },

    {

      id: "02",

      industryLabel: "WAREHOUSE",

      title: "AI for Logistics Pick Path Optimization",

      problem: "Pickers spent excessive time traveling between warehouse locations at an e-commerce fulfillment center.",

      solution: "Softree AI for logistics guided pick paths and slotting optimization integrated with WMS.",

      results: ["30% pick rate improvement", "99% order accuracy", "25% labor efficiency gain"],

      icon: "logistics",

      color: "from-orange-100/50 to-orange-50/50",

      caseStudyUrl: "https://www.softreetechnology.com/contact",

      image: `${base}/success-stories/ss-02.png?v=log-ss-1`,

      clientOverview: { name: "E-commerce Fulfillment Center", industry: "Logistics", country: "Netherlands", organizationSize: "800+ Employees", businessType: "3PL Fulfillment" },

    },

    {

      id: "03",

      industryLabel: "SUPPLY CHAIN",

      title: "AI for Logistics Exception Management",

      problem: "Manual exception triage delayed customer notifications and resolution at a global freight forwarder.",

      solution: "Softree AI for logistics agents investigating delays and routing exceptions to resolution teams.",

      results: ["50% faster resolution", "60% less manual triage", "4.6/5 customer CSAT"],

      icon: "logistics",

      color: "from-violet-100/50 to-violet-50/50",

      caseStudyUrl: "https://www.softreetechnology.com/contact",

      image: `${base}/success-stories/ss-03.png?v=log-ss-1`,

      clientOverview: { name: "Global Freight Forwarder", industry: "Logistics", country: "Singapore", organizationSize: "2,500+ Employees", businessType: "Freight & Logistics" },

    },

  ],

};


