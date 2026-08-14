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
    industryLabel: 'CUSTOMER SUPPORT',
    title: 'Enterprise Support Chatbot',
    problem: 'Support teams were overwhelmed by repetitive FAQs and inconsistent answers across outdated help articles, driving long wait times.',
    solution: 'A knowledge-grounded AI chatbot that answers FAQs, creates tickets, and hands off to live agents with full conversation context.',
    results: [
      'Higher ticket deflection',
      'Faster first response',
      'Smoother live-agent handoffs'
    ],
    icon: 'bank',
    color: 'from-blue-100/50 to-blue-50/50',
    caseStudyUrl: 'https://www.softreetechnology.com/case-studies/how-an-enterprise-organization-automated-hr-operations-using-ai',
    clientOverview: {
      name: 'UK Based Client',
      industry: 'Customer Support',
      country: 'United Kingdom',
      organizationSize: '1,200+ Employees',
      businessType: 'Enterprise Services Provider'
    }
  },
  {
    id: '02',
    industryLabel: 'HUMAN RESOURCES',
    title: 'Employee Self-Service Chatbot',
    problem: 'HR teams struggled with manual employee onboarding questions, leave inquiries, and policy lookups that clogged shared inboxes.',
    solution: 'An AI-powered HR chatbot on Microsoft Teams that answers policy questions, guides leave requests, and escalates sensitive cases.',
    results: [
      'Automated HR FAQs',
      'Improved employee self-service',
      'Reduced manual HR operations'
    ],
    icon: 'cart',
    color: 'from-orange-100/50 to-orange-50/50',
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
    id: '03',
    industryLabel: 'HEALTHCARE',
    title: 'Patient & Staff Concierge Chatbot',
    problem: 'The healthcare provider faced high administrative effort answering scheduling and policy questions from patients and staff.',
    solution: 'Softree helped a multi-specialty healthcare provider launch conversational assistants grounded in approved clinical ops content.',
    results: [
      '58% reduction in repetitive inquiries',
      'Faster appointment guidance'
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
    title: 'Plant Floor Knowledge Chatbot',
    problem: 'Manufacturing teams relied on tribal knowledge and slow searches for SOPs, leading to downtime and inconsistent troubleshooting.',
    solution: 'Developed an AI chatbot that retrieves SOP and maintenance guidance, and routes unresolved issues to the right ops queue.',
    results: [
      'Faster SOP lookup',
      'Fewer repeated floor questions',
      'Clearer escalation paths'
    ],
    icon: 'manufacturing',
    color: 'from-blue-100/50 to-blue-50/50',
    caseStudyUrl: 'https://www.softreetechnology.com/case-studies/ai-powered-manufacturing-operations-platform',
    clientOverview: {
      name: 'UAE Based Client',
      industry: 'Manufacturing',
      country: 'United Arab Emirates',
      organizationSize: '800+ Employees',
      businessType: 'Industrial Manufacturing'
    }
  },
];

export const successStoriesData = successStoriesList;
