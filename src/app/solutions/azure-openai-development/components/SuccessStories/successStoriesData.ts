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
    id: '01',
    industryLabel: 'HUMAN RESOURCES',
    title: 'Azure OpenAI HR Knowledge Assistant',
    problem:
      'Employees waited on HR for policy and leave questions scattered across SharePoint and email.',
    solution:
      'A RAG-grounded Azure OpenAI assistant on Microsoft 365 that answers from approved HR content with Entra-aware access.',
    results: [
      'Faster employee self-service',
      'Lower HR ticket volume',
      'Consistent policy answers',
    ],
    icon: 'bank',
    color: 'from-blue-100/50 to-blue-50/50',
    caseStudyUrl:
      'https://www.softreetechnology.com/case-studies/how-an-enterprise-organization-automated-hr-operations-using-ai',
    clientOverview: {
      name: 'UK Based Client',
      industry: 'Human Resources',
      country: 'United Kingdom',
      organizationSize: '1,200+ Employees',
      businessType: 'Enterprise HR Services Provider',
    },
  },
  {
    id: '02',
    industryLabel: 'AI & ANALYTICS',
    title: 'Azure OpenAI Performance Insights',
    problem:
      'Teams spent days manually reviewing sites for conversion, UX, and SEO issues.',
    solution:
      'Softree built an Azure OpenAI pipeline that analyzes signals and produces an actionable performance report in minutes.',
    results: ['5 min audit completion', '100+ automated performance checks'],
    icon: 'cart',
    color: 'from-orange-100/50 to-orange-50/50',
    caseStudyUrl:
      'https://www.softreetechnology.com/case-studies/ai-powered-website-performance-platform',
    clientOverview: {
      name: 'Softree Technology',
      industry: 'AI & Analytics',
      country: 'India',
      organizationSize: '280+ Employees',
      businessType: 'AI Solutions Provider',
    },
  },
  {
    id: '03',
    industryLabel: 'HEALTHCARE',
    title: 'Azure OpenAI Scheduling Copilot',
    problem:
      'Manual patient scheduling and follow-ups delayed responses and overloaded staff.',
    solution:
      'An Azure OpenAI–assisted scheduling and follow-up experience on Microsoft Power Platform with clinical oversight.',
    results: [
      '58% reduction in scheduling effort',
      '3.5x faster inquiry responses',
      'Improved patient experience',
    ],
    icon: 'heart',
    color: 'from-emerald-100/50 to-emerald-50/50',
    caseStudyUrl:
      'https://www.softreetechnology.com/case-studies/ai-powered-patient-appointment-and-follow-up-automation',
    clientOverview: {
      name: 'US Healthcare Provider',
      industry: 'Healthcare',
      country: 'United States',
      organizationSize: '500+ Employees',
      businessType: 'Multi-Specialty Clinic Network',
    },
  },
];

export const successStoriesData = successStoriesList;
