import { DEFAULT_ACCENT } from '@/lib/brand-defaults'

export const CASE_STUDIES_HUB_ACCENT = DEFAULT_ACCENT

export const CASE_STUDIES_HUB_FAQS = [
  {
    id: 1,
    serial: 'question 01',
    question: 'What core technologies are covered in Softree\'s case studies?',
    answer:
      'Our case studies showcase enterprise solutions built across Microsoft Power Platform (Power Apps, Automate, Copilot Studio), SharePoint / SPFx, Microsoft Fabric, Azure AI, custom React/Next.js applications, and AI-powered test automation platforms.',
  },
  {
    id: 2,
    serial: 'question 02',
    question: 'Are the client metrics and success rates in these stories verified?',
    answer:
      'Yes. All metrics—such as processing time reductions, automated claims rates, and SLA improvements—are derived from actual client-approved delivery data. Where details are simplified for NDA compliance, the structural outcomes remain 100% verified.',
  },
  {
    id: 3,
    serial: 'question 03',
    question: 'Can Softree replicate or adapt a featured case study solution for my business?',
    answer:
      'Absolutely. Most of our client engagements begin with a comparable reference story. We leverage our existing accelerators, Microsoft patterns, and offshore delivery frameworks to replicate similar workflows and scale them to your specific operational needs.',
  },
  {
    id: 4,
    serial: 'question 04',
    question: 'What is the typical delivery timeline for an enterprise automation project?',
    answer:
      'As documented in our case studies, phased delivery timelines typically range from 4 to 12 weeks. We follow agile execution models with bi-weekly sprints, ensuring visible, leadership-ready milestones and ROI early in the lifecycle.',
  },
  {
    id: 5,
    serial: 'question 05',
    question: 'Do you work under NDA and support white-label development?',
    answer:
      'Yes. We operate as a trusted partner under strict NDA guidelines. For agency partnerships and enterprise sub-contracting, we provide fully white-labeled offshore delivery, ensuring all code, intellectual property, and client identity remain completely confidential.',
  },
  {
    id: 6,
    serial: 'question 06',
    question: 'How does Softree handle knowledge transfer and post-launch support?',
    answer:
      'Every case study concludes with a comprehensive handoff. We provide complete documentation, source files, training sessions for your internal teams, and structured post-launch support windows (typically 30 to 90 days) to guarantee a smooth operational transition.',
  },
  {
    id: 7,
    serial: 'question 07',
    question: 'What is your approach to integration with legacy systems?',
    answer:
      'We specialize in modernizing workflows without disrupting existing systems. Whether through Microsoft Power Automate RPA, custom API connectors, or secure Azure integration layers, we connect new AI and automation tools directly to your legacy databases and core ERP systems.',
  },
  {
    id: 8,
    serial: 'question 08',
    question: 'How does the offshore-onsite delivery model function for international clients?',
    answer:
      'We utilize a hybrid delivery model where architects and project managers align with your time zone for daily standups, design syncs, and reviews, while our engineering teams leverage high-efficiency offshore schedules to deliver rapid sprint cycles and cost-effective scaling.',
  },
] as const

export const CASE_STUDIES_HUB_PROOF = {
  challengeText: 'Ready to become the next customer story on this page?',
  solutionText:
    'Every project here started with understanding a specific operational challenge — not a technology checklist. Tell us yours.',
  quote:
    'Softree mapped our workflow, shipped in phases, and gave us metrics we could present to leadership within the first month.',
  quoteName: 'Program Director',
  quoteRole: 'Enterprise Client · Operations',
  ctaHref: '/contact',
  ctaLabel: 'Discuss your project',
}
