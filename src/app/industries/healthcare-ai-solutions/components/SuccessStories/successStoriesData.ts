export interface SuccessStory {
  id: string;
  industryLabel: string;
  title: string;
  problem: string;
  solution: string;
  results: string[];
  icon: string;
  color?: string;
  caseStudyUrl: string;
  clientOverview?: {
    name: string;
    industry: string;
    country: string;
    organizationSize: string;
    businessType: string;
  };
  productOverview?: {
    developedBy: string;
    solutionType: string;
    primaryUse: string;
    targetUsers: string;
    analysisAreas?: string;
  };
}

export const successStoriesList: SuccessStory[] = [
  {
    id: '01',
    industryLabel: 'HUMAN RESOURCES',
    title: 'HR Assistant Copilot Agent',
    problem: 'HR teams struggled with manual employee onboarding, leave management, and internal support, causing inefficiencies and poor employee experience.',
    solution: 'An AI-powered HR Assistant built on Microsoft Power Platform that automates employee onboarding, leave management, HR requests and internal employee support.',
    results: [
      'Automated HR workflows',
      'Improved employee self-service',
      'Reduced manual HR operations'
    ],
    icon: 'bank',
    color: 'from-blue-100/50 to-blue-50/50',
    caseStudyUrl: 'https://www.softreetechnology.com/case-studies/how-an-enterprise-organization-automated-hr-operations-using-ai',
    clientOverview: {
      name: 'UK Based Client',
      industry: 'Human Resources',
      country: 'United Kingdom',
      organizationSize: '1,200+ Employees',
      businessType: 'Enterprise HR Services Provider'
    }
  },
  {
    id: '02',
    industryLabel: 'AI & ANALYTICS',
    title: 'AI Performance Intelligence Report',
    problem: 'Businesses struggled to quickly identify conversion blockers, UX issues, SEO gaps, and performance opportunities on their websites.',
    solution: "Softree Technology's AI Performance Intelligence Report identifies these issues in minutes using enterprise AI analysis.",
    results: [
      '5 min audit completion',
      '100+ automated performance checks'
    ],
    icon: 'cart',
    color: 'from-orange-100/50 to-orange-50/50',
    caseStudyUrl: 'https://www.softreetechnology.com/case-studies/ai-powered-website-performance-platform',
    clientOverview: {
      name: 'Softree Technology',
      industry: 'AI & Analytics',
      country: 'India',
      organizationSize: '280+ Employees',
      businessType: 'AI-Powered Website Intelligence'
    }
  },
  {
    id: '03',
    industryLabel: 'HEALTHCARE',
    title: 'AI-Powered Healthcare Operations Platform',
    problem: 'The healthcare provider faced high administrative effort, inefficient patient scheduling, and complex hospital operations.',
    solution: 'Softree helped a multi-specialty healthcare provider streamline operations using AI Agents and Microsoft Power Platform.',
    results: [
      '58% reduction in administrative work',
      '46% faster appointment scheduling'
    ],
    icon: 'heart',
    color: 'from-emerald-100/50 to-emerald-50/50',
    caseStudyUrl: 'https://www.softreetechnology.com/case-studies/ai-powered-healthcare-operations-platform',
    clientOverview: {
      name: 'North America Client',
      industry: 'Healthcare',
      country: 'United States',
      organizationSize: '450+ Employees',
      businessType: 'Multi-Specialty Healthcare Provider'
    }
  },
  {
    id: '04',
    industryLabel: 'MANUFACTURING',
    title: 'AI-Powered Manufacturing Operations Platform',
    problem: 'Manufacturing teams relied on manual production planning, reactive maintenance and disconnected factory systems, leading to downtime and operational inefficiencies.',
    solution: 'Developed an AI-powered manufacturing operations platform that automates production planning, predicts equipment failures, monitors factory performance and provides real-time operational intelligence.',
    results: [
      '55% reduction in manual scheduling',
      '60% faster quality issue detection',
      '48% reduction in unplanned downtime'
    ],
    icon: 'manufacturing',
    color: 'from-blue-100/50 to-blue-50/50',
    caseStudyUrl: 'https://www.softreetechnology.com/case-studies/ai-powered-manufacturing-operations-platform',
    clientOverview: {
      name: 'UAE Based Client',
      industry: 'Manufacturing',
      country: 'United Arab Emirates',
      organizationSize: '2,300+ Employees',
      businessType: 'Industrial Manufacturing Company'
    }
  },
  {
    id: '05',
    industryLabel: 'CROSS INDUSTRY',
    title: 'AI Competitive Gap Report That Helps Businesses Outperform Their Competitors',
    problem: 'Competitive research required extensive manual effort and businesses lacked continuous visibility into changing competitor strategies.',
    solution: 'Built an AI-powered Competitive Intelligence platform that automatically scans competitor websites, benchmarks capabilities, detects changes and generates executive-ready reports.',
    results: [
      '85% reduction in manual competitive analysis',
      'Website analysis completed in under 2 minutes',
      'Continuous AI-driven competitor monitoring'
    ],
    icon: 'cross-industry',
    color: 'from-orange-100/50 to-orange-50/50',
    caseStudyUrl: 'https://www.softreetechnology.com/case-studies/ai-competitive-gap-report-businesses-outperform-competitors',
    clientOverview: {
      name: 'Softree Technology',
      industry: 'AI & Analytics',
      country: 'India',
      organizationSize: '850+ Employees',
      businessType: 'AI Competitive Intelligence'
    }
  },
  {
    id: '06',
    industryLabel: 'LOGISTICS & SUPPLY CHAIN',
    title: 'AI-Powered Shipment Delay Prediction Platform',
    problem: 'Organizations struggled with delayed deliveries, limited shipment visibility and reactive logistics planning.',
    solution: 'Developed an AI-powered shipment prediction platform that analyzes logistics data, predicts delays, recommends optimal routes and provides real-time operational insights.',
    results: [
      '91.2% prediction accuracy',
      '34% fewer delivery delays',
      'Improved logistics planning across global operations'
    ],
    icon: 'logistics',
    color: 'from-emerald-100/50 to-emerald-50/50',
    caseStudyUrl: 'https://www.softreetechnology.com/case-studies/ai-shipment-delay-prediction-platform',
    clientOverview: {
      name: 'European Logistics Provider',
      industry: 'Logistics & Supply Chain',
      country: 'Netherlands',
      organizationSize: '1,750+ Employees',
      businessType: 'Global Logistics Provider'
    }
  }
];

// Re-export for compatibility with components importing 'successStoriesData'
export const successStoriesData = successStoriesList;
