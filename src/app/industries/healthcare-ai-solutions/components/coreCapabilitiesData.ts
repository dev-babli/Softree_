import { 
  IconBrain, IconCloud, IconHierarchy, IconShieldCheck, IconApps, IconChartLine,
  IconTargetArrow, IconChartBar, IconMap, IconServer, IconDatabase, IconBlocks,
  IconRobot, IconListCheck, IconBolt, IconShield, IconLock, IconChecklist,
  IconBrandAzure, IconMessageChatbot, IconDashboard, IconActivity, IconBulb, IconTrendingUp,
  IconFileText
} from '@tabler/icons-react';

export const coreCapabilitiesData = [
  {
    id: '01',
    title: 'Healthcare AI Development',
    shortDesc: 'Custom AI solutions designed for healthcare workflows and patient outcomes.',
    icon: IconBrain,
    color: 'bg-indigo-100 text-indigo-600',
    image: '/images/ai-healthcare-images/health-1.png',
    description: 'We help hospitals, clinics, and medtech companies define and build custom AI solutions that align with patient care and operational goals.',
    highlights: [
      { title: 'Clinical AI Strategy', desc: 'Aligning AI initiatives with patient care and operational goals.', icon: IconTargetArrow },
      { title: 'Custom Model Training', desc: 'Training AI on your secure medical data.', icon: IconChartBar },
      { title: 'Medical AI Roadmap', desc: 'Building a clear, scalable roadmap for long-term clinical success.', icon: IconMap }
    ],
    illustration: 'strategy',
    kpis: [
      { label: 'Healthcare AI Projects', value: '150+' },
      { label: 'Clinical Readiness', value: '98%' },
      { label: 'Operational Reliability', value: '24/7' },
      { label: 'HIPAA Compliance', value: '100%' }
    ]
  },
  {
    id: '02',
    title: 'Generative AI Solutions',
    shortDesc: 'Leverage LLMs for clinical documentation, patient communication, and medical research.',
    icon: IconCloud,
    color: 'bg-emerald-100 text-emerald-600',
    image: '/images/ai-healthcare-images/health-2.png',
    description: 'Build Generative AI applications that summarize patient histories, draft clinical notes, and provide conversational interfaces for patients.',
    highlights: [
      { title: 'HIPAA-Compliant GenAI', desc: 'Building resilient and secure foundations for LLM applications.', icon: IconServer },
      { title: 'Medical RAG Systems', desc: 'Connecting GenAI securely with your EHR data.', icon: IconDatabase },
      { title: 'Clinical Note Generation', desc: 'Automating the drafting of medical documentation.', icon: IconBlocks }
    ],
    illustration: 'architecture',
    kpis: [
      { label: 'Time Saved per Doc', value: '2 hrs/day' },
      { label: 'Documentation Accuracy', value: '98%' },
      { label: 'Patient Data Processed', value: 'Petabytes' },
      { label: 'Uptime', value: '99.99%' }
    ]
  },
  {
    id: '03',
    title: 'AI Healthcare Automation',
    shortDesc: 'Automating administrative and clinical processes using Medical AI Agents.',
    icon: IconHierarchy,
    color: 'bg-violet-100 text-violet-600',
    image: '/images/ai-healthcare-images/health-3.png',
    description: 'Build AI-powered workflows that automate repetitive healthcare processes, such as medical billing, claims processing, and appointment scheduling.',
    highlights: [
      { title: 'Clinical AI Agents', desc: 'Deploying autonomous agents for complex administrative tasks.', icon: IconRobot },
      { title: 'Revenue Cycle Automation', desc: 'Streamlining medical billing to eliminate manual overhead.', icon: IconListCheck },
      { title: 'Care Pathway Optimization', desc: 'Continuously refining clinical logic for peak efficiency.', icon: IconBolt }
    ],
    illustration: 'automation',
    kpis: [
      { label: 'Claims Automated', value: '500k+' },
      { label: 'Admin Hours Saved', value: '2M+' },
      { label: 'Coding Accuracy', value: '99.9%' },
      { label: 'Cost Reduction', value: '40%' }
    ]
  },
  {
    id: '04',
    title: 'Healthcare Chatbots',
    shortDesc: 'Intelligent conversational agents for patient triage, scheduling, and support.',
    icon: IconMessageChatbot,
    color: 'bg-amber-100 text-amber-600',
    image: '/images/ai-healthcare-images/health-4.png',
    description: 'Deploy empathetic and secure AI chatbots that assist patients 24/7, route them to the right care providers, and handle routine inquiries.',
    highlights: [
      { title: 'Patient Triage Bots', desc: 'Symptom checking and care routing.', icon: IconShield },
      { title: 'Automated Scheduling', desc: 'Connecting directly to your booking systems.', icon: IconLock },
      { title: 'Post-Care Follow-up', desc: 'Checking in on patients after discharge automatically.', icon: IconChecklist }
    ],
    illustration: 'security',
    kpis: [
      { label: 'Patient Inquiries Handled', value: '2M+' },
      { label: 'Wait Time Reduction', value: '80%' },
      { label: 'Patient Satisfaction', value: '95%' },
      { label: '24/7 Availability', value: '100%' }
    ]
  },
  {
    id: '05',
    title: 'Predictive Analytics',
    shortDesc: 'Turn healthcare data into actionable operational insights.',
    icon: IconChartLine,
    color: 'bg-blue-100 text-blue-600',
    image: '/images/ai-healthcare-images/health-5.png',
    description: 'Leverage machine learning to predict patient readmissions, optimize hospital resource allocation, and foresee disease outbreaks.',
    highlights: [
      { title: 'Readmission Risk Scoring', desc: 'Identifying high-risk patients before discharge.', icon: IconBrandAzure },
      { title: 'Resource Optimization', desc: 'Predicting bed availability and staffing needs.', icon: IconActivity },
      { title: 'Population Health Analytics', desc: 'Analyzing trends across large patient cohorts.', icon: IconDashboard }
    ],
    illustration: 'microsoft',
    kpis: [
      { label: 'Readmissions Avoided', value: '15%' },
      { label: 'Resource Efficiency', value: '+30%' },
      { label: 'Predictive Accuracy', value: '92%' },
      { label: 'Deployment Time', value: '-50%' }
    ]
  },
  {
    id: '06',
    title: 'Healthcare Document AI',
    shortDesc: 'Extract and organize information from healthcare documents automatically.',
    icon: IconFileText,
    color: 'bg-pink-100 text-pink-600',
    image: '/images/ai-healthcare-images/health-6.png',
    description: 'Use advanced OCR and NLP to process medical records, lab reports, invoices, and insurance claims with near-perfect accuracy.',
    highlights: [
      { title: 'Automated Data Extraction', desc: 'Pulling key patient data from unstructured documents.', icon: IconActivity },
      { title: 'Claims Processing', desc: 'Digitizing and verifying medical insurance claims.', icon: IconBulb },
      { title: 'Lab Report Parsing', desc: 'Converting PDF lab results into structured EHR data.', icon: IconTrendingUp }
    ],
    illustration: 'optimization',
    kpis: [
      { label: 'Extraction Accuracy', value: '99%' },
      { label: 'Processing Speed', value: '10x faster' },
      { label: 'Manual Data Entry', value: '-90%' },
      { label: 'Documents Processed', value: 'Millions' }
    ]
  },
  {
    id: '07',
    title: 'Medical Data Processing',
    shortDesc: 'Securely handle, clean, and structure massive volumes of clinical data.',
    icon: IconDatabase,
    color: 'bg-emerald-100 text-emerald-600',
    image: '/images/ai-healthcare-images/health-7.png',
    description: 'Build robust data pipelines that clean, anonymize, and prepare fragmented medical data for AI training and analytics.',
    highlights: [
      { title: 'PHI De-identification', desc: 'Securely stripping personal data for compliance.', icon: IconShieldCheck },
      { title: 'Data Harmonization', desc: 'Standardizing medical codes (ICD-10, SNOMED).', icon: IconChecklist },
      { title: 'Real-time Streaming', desc: 'Processing IoT and wearable medical device data.', icon: IconActivity }
    ],
    illustration: 'strategy',
    kpis: [
      { label: 'Data Pipelines', value: 'Enterprise-grade' },
      { label: 'PHI Protection', value: '100% secure' },
      { label: 'Latency', value: 'Sub-second' },
      { label: 'Scalability', value: 'Infinite' }
    ]
  },
  {
    id: '08',
    title: 'AI Integration Services',
    shortDesc: 'Connect AI securely with EHR systems and hospital databases.',
    icon: IconApps,
    color: 'bg-indigo-100 text-indigo-600',
    image: '/images/ai-healthcare-images/health-8.png',
    description: 'Deliver fully integrated healthcare AI using seamless connectivity with Epic, Cerner, HL7/FHIR networks, and internal APIs.',
    highlights: [
      { title: 'FHIR Interoperability', desc: 'Accelerating medical data exchange and rapid AI delivery.', icon: IconBlocks },
      { title: 'EHR App Integration', desc: 'Embedding AI insights directly into clinician workflows.', icon: IconBrandAzure },
      { title: 'Legacy System Sync', desc: 'Bridging modern AI with older hospital infrastructure.', icon: IconServer }
    ],
    illustration: 'architecture',
    kpis: [
      { label: 'EHRs Integrated', value: '100%' },
      { label: 'Clinician Adoption', value: '85%' },
      { label: 'Seamless Interop', value: 'Yes' },
      { label: 'Deployment Time', value: '-50%' }
    ]
  }
];
