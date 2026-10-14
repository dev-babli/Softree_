export interface SuccessStoryResult {
  value: string;
  label: string;
}

export interface SuccessStory {
  id: string;
  industryLabel: string;
  title: string;
  problem: string;
  solution: string;
  results: string[];
  metrics?: SuccessStoryResult[];
  icon: string;
  color: string;
  caseStudyUrl: string;
  imageUrl?: string;
  technologies?: string[];
  clientOverview: {
    name: string;
    industry: string;
    country: string;
    organizationSize: string;
    businessType: string;
  };
}

export const successStoriesList: SuccessStory[] = [
  {
    id: "intelligent-customer-support",
    industryLabel: "CUSTOMER SERVICE & SUPPORT",
    title: "Intelligent Customer Support Automation with AI Agent",
    problem: "Customer support teams were burdened by repetitive FAQs, surging support ticket queues, and long wait times across channels.",
    solution: "An AI-powered customer support solution delivered 24/7 assistance and reduced customer response time by 60% through intelligent automation.",
    results: [
      "60% Support Ticket Deflection",
      "3.5x Faster Policy Answers",
      "70% Faster First Response Time"
    ],
    metrics: [
      { value: "60%", label: "Support Ticket Deflection" },
      { value: "3.5x", label: "Faster Policy Answers" }
    ],
    icon: "bank",
    color: "from-orange-100/50 to-orange-50/50",
    caseStudyUrl: "/case-studies/intelligent-customer-support-automation-ai-agent",
    imageUrl: "https://cdn.sanity.io/images/1zmh4sfw/production/a18b295fcfe42ab7c73cd6a93970b7dcd5743cb9-1672x941.png",
    technologies: [
      "Amazon Bedrock",
      "AWS AgentCore",
      "Azure AI Foundry",
      "LangChain",
      "LangGraph",
      "RAG",
      "Vector Database",
      "FastAPI",
      "MCP Server",
      "n8n"
    ],
    clientOverview: {
      name: "Global Enterprise",
      industry: "Customer Service & Support",
      country: "United States",
      organizationSize: "2,500+ Employees",
      businessType: "Omnichannel Customer Support"
    }
  },
  {
    id: "intelligent-warehouse-assistant",
    industryLabel: "LOGISTICS & SUPPLY CHAIN / WAREHOUSING",
    title: "Intelligent Warehouse Operations Assistant with AI Agents",
    problem: "Warehouse operators faced operational delays locating SKUs, searching procedural SOPs manually, and handling exception resolutions.",
    solution: "A global logistics company used AI agents, RAG, and voice automation to streamline warehouse operations and accelerate issue resolution.",
    results: [
      "Faster Warehouse Issue Resolution",
      "Reduced Manual Information Searches",
      "Improved Employee Productivity"
    ],
    metrics: [
      { value: "Faster", label: "Warehouse Issue Resolution" },
      { value: "Reduced", label: "Manual Information Searches" }
    ],
    icon: "manufacturing",
    color: "from-blue-100/50 to-blue-50/50",
    caseStudyUrl: "/case-studies/intelligent-warehouse-operations-assistant-with-ai-agents",
    imageUrl: "https://cdn.sanity.io/images/1zmh4sfw/production/e4cb4151ef2bc2122f60f84e05350b173fc72dae-1672x941.png",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "AWS",
      "LangChain",
      "LangGraph",
      "AutoGen",
      "Amazon OpenSearch",
      "Microsoft Azure",
      "FastAPI"
    ],
    clientOverview: {
      name: "Global Logistics Provider",
      industry: "Logistics & Supply Chain",
      country: "Global Operations",
      organizationSize: "5,000+ Employees",
      businessType: "Logistics & Freight Operations"
    }
  },
  {
    id: "hr-employee-onboarding",
    industryLabel: "HUMAN RESOURCES",
    title: "HR Employee Onboarding Automation",
    problem: "HR departments struggled with scattered onboarding paperwork, manual role-provisioning coordination, and high volume of repetitive new-hire inquiries.",
    solution: "AI-powered employee onboarding automation reduces manual HR coordination, accelerates routine tasks, and improves visibility across the onboarding process.",
    results: [
      "85% Faster Onboarding",
      "60% Reduced Manual Work",
      "95% Employee Satisfaction"
    ],
    metrics: [
      { value: "85%", label: "Faster Onboarding" },
      { value: "60%", label: "Reduced Manual Work" }
    ],
    icon: "cart",
    color: "from-emerald-100/50 to-emerald-50/50",
    caseStudyUrl: "/case-studies/hr-employee-onboarding-automation",
    imageUrl: "https://cdn.sanity.io/images/1zmh4sfw/production/28dd848ea9e0f6ebc534b757d55fb5c2748b06b1-1672x941.png",
    technologies: [
      "Azure OpenAI",
      "Microsoft Foundry",
      "Foundry Agent Service",
      "Azure AI Document Intelligence",
      "Azure AI Search",
      "LangChain",
      "LangGraph",
      "RAG",
      "FastAPI",
      "Next.js",
      "Python"
    ],
    clientOverview: {
      name: "Enterprise Organization",
      industry: "Human Resources",
      country: "United Kingdom",
      organizationSize: "1,200+ Employees",
      businessType: "Enterprise HR Operations"
    }
  },
  {
    id: "ai-invoice-processing",
    industryLabel: "FINANCE",
    title: "AI-Powered Invoice Processing Automation",
    problem: "Finance teams were bogged down by manual invoice data entry, GL code matching errors, and slow multi-tier approval cycles.",
    solution: "AI-powered invoice automation that reduced processing time by 90% while improving validation, approval routing, and invoice-status visibility.",
    results: [
      "90% Reduction in Manual Effort",
      "98%+ Accuracy Rate",
      "5x Faster Approval Routing"
    ],
    metrics: [
      { value: "90%", label: "Reduction in Manual Effort" },
      { value: "98%+", label: "Accuracy Rate" }
    ],
    icon: "heart",
    color: "from-purple-100/50 to-purple-50/50",
    caseStudyUrl: "/case-studies/ai-powered-invoice-processing-automation",
    imageUrl: "https://cdn.sanity.io/images/1zmh4sfw/production/373a21c50768a331e886178baed555fb12ca2a64-1672x941.png",
    technologies: [
      "Azure AI Document Intelligence",
      "Azure AI Foundry",
      "LangChain",
      "LangGraph",
      "RAG",
      "Vector Database",
      "FastAPI",
      "MCP Server",
      "n8n"
    ],
    clientOverview: {
      name: "Corporate Finance Division",
      industry: "Finance",
      country: "United States",
      organizationSize: "3,000+ Employees",
      businessType: "Financial Services & Accounting"
    }
  }
];

export const successStoriesData = successStoriesList;
