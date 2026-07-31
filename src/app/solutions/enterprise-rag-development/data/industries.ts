import { HeartPulse, Landmark, Factory, ShoppingBag, Truck } from 'lucide-react';

export const industriesList = [
  {
    id: '01',
    title: 'Healthcare',
    description: 'Enable secure clinical knowledge search, medical document retrieval, policy access, and grounded AI assistance across healthcare information.',
    icon: HeartPulse,
    image: '/images/ai-development-services/industries/healthcare.jpg',
    color: 'from-slate-300/40 to-slate-200/10'
  },
  {
    id: '02',
    title: 'Financial Services',
    description: 'Retrieve insights across financial reports, policies, compliance documents, research, and enterprise knowledge with secure RAG.',
    icon: Landmark,
    image: '/images/ai-development-services/industries/finance.jpg',
    color: 'from-blue-300/30 to-blue-200/10'
  },
  {
    id: '03',
    title: 'Manufacturing',
    description: 'Connect manuals, engineering documents, maintenance records, SOPs, and operational knowledge through intelligent enterprise search.',
    icon: Factory,
    image: '/images/ai-development-services/industries/manufacturing.jpg',
    color: 'from-orange-300/30 to-orange-200/10'
  },
  {
    id: '04',
    title: 'Retail & E-Commerce',
    description: 'Power product knowledge, customer support, employee assistance, and intelligent search across large retail content ecosystems.',
    icon: ShoppingBag,
    image: '/images/ai-development-services/industries/retail.jpg',
    color: 'from-purple-300/30 to-purple-200/10'
  },
  {
    id: '05',
    title: 'Logistics & Supply Chain',
    description: 'Retrieve operational knowledge across shipping documents, procedures, inventory systems, vendor data, and supply chain records.',
    icon: Truck,
    image: '/images/ai-development-services/industries/logistics.jpg',
    color: 'from-green-300/30 to-green-200/10'
  }
];
