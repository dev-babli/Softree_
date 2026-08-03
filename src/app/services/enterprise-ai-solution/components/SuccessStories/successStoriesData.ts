export interface SuccessStory {
  id: string;
  industryLabel: string;
  title: string;
  problem: string;
  solution: string;
  results: string[];
  icon: string;
  color: string;
  caseStudyUrl: string;
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
    id: "01",
    industryLabel: "ENTERPRISE OPERATIONS",
    title: "Enterprise AI Operating Model",
    problem:
      "Leadership funded scattered AI pilots with no shared architecture, unclear ownership, and no path to production ROI.",
    solution:
      "Softree defined a prioritized use-case portfolio, target architecture, and governance model—then delivered the first production solutions.",
    results: [
      "Clear AI roadmap",
      "Production-ready pilots",
      "Shared governance model",
    ],
    icon: "bank",
    color: "from-blue-100/50 to-blue-50/50",
    caseStudyUrl:
      "https://www.softreetechnology.com/case-studies/how-an-enterprise-organization-automated-hr-operations-using-ai",
    clientOverview: {
      name: "UK Based Client",
      industry: "Enterprise Services",
      country: "United Kingdom",
      organizationSize: "1,200+ Employees",
      businessType: "Multi-Department Enterprise",
    },
  },
  {
    id: "02",
    industryLabel: "HUMAN RESOURCES",
    title: "HR Copilot & Knowledge AI",
    problem:
      "HR teams struggled with manual employee onboarding, leave management, and internal support requests.",
    solution:
      "An enterprise AI assistant on Microsoft Power Platform that automates HR requests and grounds answers in approved policy content.",
    results: [
      "Automated HR workflows",
      "Improved employee self-service",
      "Reduced manual HR operations",
    ],
    icon: "cart",
    color: "from-orange-100/50 to-orange-50/50",
    caseStudyUrl:
      "https://www.softreetechnology.com/case-studies/how-an-enterprise-organization-automated-hr-operations-using-ai",
    clientOverview: {
      name: "UK Based Client",
      industry: "Human Resources",
      country: "United Kingdom",
      organizationSize: "1,200+ Employees",
      businessType: "Enterprise HR Services Provider",
    },
  },
  {
    id: "03",
    industryLabel: "HEALTHCARE",
    title: "AI-Powered Healthcare Operations",
    problem:
      "The healthcare provider faced high administrative effort, inefficient scheduling, and fragmented operational knowledge.",
    solution:
      "Softree delivered governed AI workflows and assistants integrated with Microsoft Power Platform for hospital operations.",
    results: [
      "58% reduction in administrative work",
      "46% faster appointment scheduling",
    ],
    icon: "heart",
    color: "from-emerald-100/50 to-emerald-50/50",
    caseStudyUrl:
      "https://www.softreetechnology.com/case-studies/ai-powered-healthcare-operations-platform",
    clientOverview: {
      name: "North America Client",
      industry: "Healthcare",
      country: "United States",
      organizationSize: "450+ Employees",
      businessType: "Multi-Specialty Healthcare Provider",
    },
  },
  {
    id: "04",
    industryLabel: "MANUFACTURING",
    title: "Manufacturing AI Operations Platform",
    problem:
      "Manufacturing teams relied on manual planning and disconnected systems, causing downtime and slow decisions.",
    solution:
      "Developed an enterprise AI platform for production planning support, quality signals, and operational intelligence.",
    results: [
      "55% reduction in manual scheduling",
      "60% faster quality issue detection",
      "48% reduction in unplanned downtime",
    ],
    icon: "manufacturing",
    color: "from-blue-100/50 to-blue-50/50",
    caseStudyUrl:
      "https://www.softreetechnology.com/case-studies/ai-powered-manufacturing-operations-platform",
    clientOverview: {
      name: "UAE Based Client",
      industry: "Manufacturing",
      country: "United Arab Emirates",
      organizationSize: "800+ Employees",
      businessType: "Industrial Manufacturing",
    },
  },
];

export const successStoriesData = successStoriesList;
