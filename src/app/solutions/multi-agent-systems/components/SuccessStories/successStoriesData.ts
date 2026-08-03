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
    title: 'HR Multi-Agent Operations Hub',
    problem:
      'HR teams struggled with manual employee onboarding, leave management, and internal support across disconnected tools.',
    solution:
      'A coordinated team of HR agents on Microsoft Power Platform that share context, automate requests, and escalate policy-sensitive cases.',
    results: [
      'Automated multi-step HR workflows',
      'Improved employee self-service',
      'Reduced manual HR operations',
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
    title: 'Multi-Agent Performance Intelligence',
    problem:
      'Businesses struggled to quickly identify conversion blockers, UX issues, SEO gaps, and performance opportunities.',
    solution:
      'Research, scoring, and reporting agents collaborate to produce an AI Performance Intelligence Report in minutes.',
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
    title: 'Healthcare Scheduling Agent Team',
    problem:
      'Manual patient scheduling and follow-ups delayed responses and overloaded administrative staff.',
    solution:
      'Softree helped a multi-specialty healthcare provider orchestrate scheduling and follow-up agents on Microsoft Power Platform.',
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

// Re-export for compatibility with components importing 'successStoriesData'
export const successStoriesData = successStoriesList;
