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
  image?: string;
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
    title: 'LangChain HR Knowledge Agent',
    problem:
      'Employees waited on HR for policy and leave questions scattered across documents and email.',
    solution:
      'A RAG-grounded LangChain agent with tool calling for common HR requests and scoped access to approved content.',
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
    title: 'LangChain Performance Insights Pipeline',
    problem:
      'Teams spent days manually reviewing sites for conversion, UX, and SEO issues.',
    solution:
      'Softree built a LangChain multi-step pipeline that analyzes signals and produces an actionable performance report in minutes.',
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
    title: 'LangGraph Scheduling Agent Team',
    problem:
      'Manual patient scheduling and follow-ups delayed responses and overloaded staff.',
    solution:
      'LangGraph agents orchestrating scheduling, reminders, and follow-ups with clinical oversight and tool integrations.',
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
