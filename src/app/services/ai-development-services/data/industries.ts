export interface IndustryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  colorClass: string;
  glowClass: string;
}

export const industriesList: IndustryItem[] = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    subtitle: 'Clinical Workflows & Diagnostics',
    description: 'Deploy secure, HIPAA-compliant clinical assistants, automated patient scheduling, and diagnostic insight engines using Azure OpenAI.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=150&h=150&fit=crop',
    colorClass: 'hover:border-rose-300 hover:shadow-rose-500/10',
    glowClass: 'from-rose-500/20 to-transparent'
  },
  {
    id: 'finance',
    title: 'Finance & Banking',
    subtitle: 'Fraud Detection & Risk Intelligence',
    description: 'Implement automated fraud detection models, risk valuation pipelines, and secure virtual banking agents with strict enterprise data guardrails.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=150&h=150&fit=crop',
    colorClass: 'hover:border-emerald-300 hover:shadow-emerald-500/10',
    glowClass: 'from-emerald-500/20 to-transparent'
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & IoT',
    subtitle: 'Predictive Maintenance & QA',
    description: 'Architect predictive maintenance models, computer vision systems for real-time quality assurance, and smart industrial IoT automation.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=150&h=150&fit=crop',
    colorClass: 'hover:border-amber-300 hover:shadow-amber-500/10',
    glowClass: 'from-amber-500/20 to-transparent'
  },
  {
    id: 'retail',
    title: 'Retail & eCommerce',
    subtitle: 'Personalized Shopping & Pricing',
    description: 'Scale personalized recommendation systems, real-time dynamic pricing algorithms, and intelligent inventory demand forecasting.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=150&h=150&fit=crop',
    colorClass: 'hover:border-blue-300 hover:shadow-blue-500/10',
    glowClass: 'from-blue-500/20 to-transparent'
  },
  {
    id: 'logistics',
    title: 'Logistics & Supply Chain',
    subtitle: 'Warehouse Automation & Routing',
    description: 'Deploy AI-driven delivery route optimization, autonomous warehouse dispatch agents, and end-to-end supply chain visibility systems.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=150&h=150&fit=crop',
    colorClass: 'hover:border-violet-300 hover:shadow-violet-500/10',
    glowClass: 'from-violet-500/20 to-transparent'
  },
  {
    id: 'education',
    title: 'Education & EdTech',
    subtitle: 'Personalized Learning & Admin AI',
    description: 'Build personalized student learning pathways, automated administrative grading workflows, and predictive academic success analytics.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=150&h=150&fit=crop',
    colorClass: 'hover:border-cyan-300 hover:shadow-cyan-500/10',
    glowClass: 'from-cyan-500/20 to-transparent'
  },
  {
    id: 'realestate',
    title: 'Real Estate & PropTech',
    subtitle: 'Automated Valuations & Market Analytics',
    description: 'Integrate automated property valuation systems, predictive market trend analyzers, and custom tenant/customer onboarding agents.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=150&h=150&fit=crop',
    colorClass: 'hover:border-orange-300 hover:shadow-orange-500/10',
    glowClass: 'from-orange-500/20 to-transparent'
  },
  {
    id: 'energy',
    title: 'Energy & Utilities',
    subtitle: 'Grid Load & Resource Optimization',
    description: 'Predict utility grid load demands, optimize smart grid resource distribution, and automate smart meter anomaly diagnostics.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=150&h=150&fit=crop',
    colorClass: 'hover:border-yellow-300 hover:shadow-yellow-500/10',
    glowClass: 'from-yellow-500/20 to-transparent'
  },
  {
    id: 'legal',
    title: 'Legal & Compliance',
    subtitle: 'Contract Analysis & Document Audit',
    description: 'Accelerate contract auditing, policy compliance analysis, and automated document generation with secure custom language models.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=150&h=150&fit=crop',
    colorClass: 'hover:border-indigo-300 hover:shadow-indigo-500/10',
    glowClass: 'from-indigo-500/20 to-transparent'
  }
];
