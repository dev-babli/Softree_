export interface ClientOverview {
  name: string;
  businessType: string;
  industry: string;
  country: string;
}

export interface SuccessStory {
  id: string;
  title: string;
  industryLabel: string;
  icon: string;
  problem: string;
  solution: string;
  results: string[];
  caseStudyUrl: string;
  clientOverview: ClientOverview;
}

export const caseStudyData: SuccessStory[] = [
  {
    id: "multi-specialty-healthcare",
    title: "Multi-Specialty Healthcare Network",
    industryLabel: "Healthcare",
    icon: "heart",
    problem: "Manual processing of Electronic Medical Records (EMR) and inefficient workflows were causing significant delays in patient care and administrative bottlenecks.",
    solution: "Streamlined Electronic Medical Records (EMR) workflows using AI Copilot and Power Platform, automating manual record processing and approval cycles.",
    results: [
      "75% reduction in manual processing",
      "65% faster approval cycles",
      "90% improved data accuracy",
      "40% reduction in operational costs"
    ],
    caseStudyUrl: "/case-studies/electronic-medical-records-workflow-automation",
    clientOverview: {
      name: "Multi-Specialty Healthcare Network",
      businessType: "Healthcare Provider",
      industry: "Healthcare",
      country: "United States"
    }
  },
  {
    id: "leading-healthcare-provider",
    title: "Leading Multi-Specialty Healthcare Provider",
    industryLabel: "Healthcare",
    icon: "heart",
    problem: "Manual referral management and insurance pre-authorizations were creating long wait times for patients and high administrative overhead.",
    solution: "Automated referral management and insurance pre-authorizations using Power Automate to accelerate the approval approach.",
    results: [
      "80% Reduction in Manual Processing Time",
      "70% Faster Insurance Approvals",
      "35% increase in operational efficiency"
    ],
    caseStudyUrl: "/case-studies/healthcare-referral-management-insurance-pre-authorization-automation",
    clientOverview: {
      name: "Leading Healthcare Provider",
      businessType: "Healthcare Services",
      industry: "Healthcare",
      country: "United States"
    }
  },
  {
    id: "neucart-qa-testing",
    title: "NeuCart PowerApps & Power Automate QA Testing Success Story",
    industryLabel: "Retail & E-Commerce",
    icon: "cart",
    problem: "Slow release cycles and high defect rates were impacting the e-commerce platform's reliability and customer shopping experience.",
    solution: "Implemented comprehensive PowerApps and Power Automate QA testing to ensure quality and accelerate releases.",
    results: [
      "80% Faster Regression Testing",
      "94% Test Pass Rate",
      "Zero production defects",
      "500K+ users impacted seamlessly"
    ],
    caseStudyUrl: "/case-studies/neucart-powerapps-power-automate-qa-testing-case-study",
    clientOverview: {
      name: "NeuCart",
      businessType: "E-Commerce Platform",
      industry: "Retail & E-Commerce",
      country: "United States"
    }
  },
  {
    id: "modern-contacts-management",
    title: "Modern Contacts Management System",
    industryLabel: "Information Technology",
    icon: "bank",
    problem: "Decentralized contact data and manual entry processes were leading to inefficiencies in managing enterprise connections and growth.",
    solution: "Softree Technology developed a mobile Contacts Management System using Power Apps and SharePoint, enabling centralized contact management.",
    results: [
      "Mobile Application successfully deployed",
      "Contact Automation achieved across teams",
      "Centralized and secure data management"
    ],
    caseStudyUrl: "/case-studies/contacts-management-system-application",
    clientOverview: {
      name: "Confidential Enterprise",
      businessType: "Enterprise Operations",
      industry: "Information Technology",
      country: "United States"
    }
  },
  {
    id: "tour-travel-company",
    title: "Tour & Travel Company",
    industryLabel: "Travel & Tourism",
    icon: "cross-industry",
    problem: "Content duplication, lack of tracking visibility, and manual scheduling processes were hindering the marketing team's productivity.",
    solution: "Developed a Content Scheduler App using Power Apps and SharePoint, helping teams plan, manage, approve, and publish content in one place.",
    results: [
      "Content Automation streamlined operations",
      "Approval Management accelerated by 50%",
      "Eliminated content duplication entirely"
    ],
    caseStudyUrl: "/case-studies/content-scheduler-app-powerapps-sharepoint",
    clientOverview: {
      name: "Tour & Travel Company",
      businessType: "Tourism Services",
      industry: "Travel & Tourism",
      country: "Global"
    }
  },
  {
    id: "claim-request-management",
    title: "Claim Request Management System for Enterprise Operations",
    industryLabel: "Information Technology",
    icon: "manufacturing",
    problem: "Manual claim submissions and approval workflows were causing delays, tracking issues, and frustration among enterprise employees.",
    solution: "Developed a Claim Request Management solution using Power Apps and SharePoint to digitalize workflows and automate approvals.",
    results: [
      "Digital Workflow implemented globally",
      "Approval Automation achieved",
      "Significantly faster claim processing times"
    ],
    caseStudyUrl: "/case-studies/claim-request-management-platform",
    clientOverview: {
      name: "Enterprise Operations",
      businessType: "Corporate Enterprise",
      industry: "Information Technology",
      country: "United States"
    }
  },
  {
    id: "powerapps-retail-store",
    title: "PowerApps Retail Store Opening Automation",
    industryLabel: "Retail",
    icon: "cart",
    problem: "A Fortune 500 retailer struggled with manual, paper-based workflows that delayed new store launches and lacked cross-departmental visibility.",
    solution: "Automated store opening workflows with Microsoft Power Platform, digitalizing the entire process for cross-department collaboration.",
    results: [
      "100% Paperless Process",
      "40% Faster Store Launches",
      "24/7 Approval Visibility"
    ],
    caseStudyUrl: "/case-studies/powerapps-retail-store-opening-automation",
    clientOverview: {
      name: "Fortune 500 Retailer",
      businessType: "Retail Chain",
      industry: "Retail",
      country: "United States"
    }
  }
];
