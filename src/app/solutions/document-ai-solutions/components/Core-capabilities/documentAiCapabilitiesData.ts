import {
    IconRobot, IconFileText, IconHierarchy, IconLink, IconDatabase, IconShieldCheck,
    IconSettings, IconCheck, IconServer, IconCloud, IconAppWindow
} from '@tabler/icons-react';

export const documentAiCapabilitiesData = [
    {
        id: '01',
        title: 'Intelligent Document Processing',
        shortDesc: 'Automate the extraction, classification, and validation of structured and unstructured business documents using AI.',
        icon: IconRobot,
        color: 'bg-indigo-100 text-indigo-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-1.png',

        description:
            'Automate the extraction, classification, and validation of structured and unstructured business documents using AI.',

        highlights: [
            { title: 'Automated Extraction', desc: 'Automatically extract data from varied document formats.', icon: IconAppWindow },
            { title: 'Smart Classification', desc: 'Classify documents accurately based on their content.', icon: IconHierarchy },
            { title: 'Data Validation', desc: 'Ensure data integrity with automated validation rules.', icon: IconCheck }
        ],

        illustration: 'automation',

        kpis: [
            { label: 'Document Intelligence', value: 'AI-Powered Extraction' },
            { label: 'Enterprise Integration', value: 'Connected Systems' },
            { label: 'Workflow Automation', value: 'Business Automation' },
            { label: 'Secure Processing', value: 'Enterprise Ready' }
        ]
    },
    {
        id: '02',
        title: 'Document Intelligence & OCR',
        shortDesc: 'Extract accurate data from invoices, contracts, forms, PDFs, receipts, and scanned documents with AI-powered OCR.',
        icon: IconFileText,
        color: 'bg-emerald-100 text-emerald-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-2.png',

        description:
            'Extract accurate data from invoices, contracts, forms, PDFs, receipts, and scanned documents with AI-powered OCR.',

        highlights: [
            { title: 'Advanced OCR', desc: 'Digitize text from scanned documents and images with high accuracy.', icon: IconFileText },
            { title: 'Form Recognizer', desc: 'Extract key-value pairs and tables from structured forms.', icon: IconCheck },
            { title: 'Multi-Format Support', desc: 'Process PDFs, Word, images, and other formats seamlessly.', icon: IconDatabase }
        ],

        illustration: 'architecture',

        kpis: [
            { label: 'Document Intelligence', value: 'AI-Powered Extraction' },
            { label: 'Enterprise Integration', value: 'Connected Systems' },
            { label: 'Workflow Automation', value: 'Business Automation' },
            { label: 'Secure Processing', value: 'Enterprise Ready' }
        ]
    },
    {
        id: '03',
        title: 'AI Document Automation',
        shortDesc: 'Automate document-centric workflows, approvals, routing, and business processes to improve operational efficiency.',
        icon: IconHierarchy,
        color: 'bg-violet-100 text-violet-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-3.png',

        description:
            'Automate document-centric workflows, approvals, routing, and business processes to improve operational efficiency.',

        highlights: [
            { title: 'Workflow Routing', desc: 'Automatically route documents to the right stakeholders for approval.', icon: IconLink },
            { title: 'Process Automation', desc: 'Streamline repetitive manual document handling processes.', icon: IconSettings },
            { title: 'Operational Efficiency', desc: 'Reduce manual intervention and accelerate business operations.', icon: IconAppWindow }
        ],

        illustration: 'strategy',

        kpis: [
            { label: 'Document Intelligence', value: 'AI-Powered Extraction' },
            { label: 'Enterprise Integration', value: 'Connected Systems' },
            { label: 'Workflow Automation', value: 'Business Automation' },
            { label: 'Secure Processing', value: 'Enterprise Ready' }
        ]
    },
    {
        id: '04',
        title: 'Enterprise Document Integration',
        shortDesc: 'Connect Document AI with Microsoft 365, SharePoint, Dynamics 365, ERP, CRM, Dataverse, and enterprise business applications.',
        icon: IconLink,
        color: 'bg-amber-100 text-amber-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-2.png',

        description:
            'Integrate Document AI with Microsoft 365, SharePoint, Dynamics 365, Dataverse, ERP, CRM, cloud storage, and third-party business applications. Enable seamless document processing across your enterprise while ensuring secure data flow and operational efficiency.',

        highlights: [
            { title: 'Microsoft 365 & SharePoint Integration', desc: 'Automatically process documents stored in SharePoint, OneDrive, Teams, and Microsoft 365.', icon: IconCloud },
            { title: 'ERP & CRM Connectivity', desc: 'Extract and synchronize document data with Dynamics 365, SAP, Salesforce, Oracle, and enterprise applications.', icon: IconServer },
            { title: 'API & Workflow Integration', desc: 'Connect Document AI with Power Automate, REST APIs, and existing business workflows for end-to-end automation.', icon: IconLink }
        ],

        illustration: 'microsoft',

        kpis: [
            { label: 'Document Intelligence', value: 'AI-Powered Extraction' },
            { label: 'Enterprise Integration', value: 'Connected Systems' },
            { label: 'Workflow Automation', value: 'Business Automation' },
            { label: 'Secure Processing', value: 'Enterprise Ready' }
        ]
    },
    {
        id: '05',
        title: 'Knowledge Extraction & Search',
        shortDesc: 'Transform enterprise documents into searchable knowledge using AI-powered indexing, metadata extraction, and semantic search.',
        icon: IconDatabase,
        color: 'bg-blue-100 text-blue-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-5.png',

        description:
            'Transform enterprise documents into searchable knowledge using AI-powered indexing, metadata extraction, and semantic search.',

        highlights: [
            { title: 'Semantic Search', desc: 'Enable natural language search across vast document repositories.', icon: IconDatabase },
            { title: 'Metadata Extraction', desc: 'Automatically generate tags and metadata for better organization.', icon: IconCheck },
            { title: 'Knowledge Base Integration', desc: 'Build intelligent knowledge graphs from your unstructured documents.', icon: IconHierarchy }
        ],

        illustration: 'strategy',

        kpis: [
            { label: 'Document Intelligence', value: 'AI-Powered Extraction' },
            { label: 'Enterprise Integration', value: 'Connected Systems' },
            { label: 'Workflow Automation', value: 'Business Automation' },
            { label: 'Secure Processing', value: 'Enterprise Ready' }
        ]
    },
    {
        id: '06',
        title: 'Document Security & Compliance',
        shortDesc: 'Protect sensitive documents with enterprise-grade security, compliance controls, audit trails, and governance.',
        icon: IconShieldCheck,
        color: 'bg-rose-100 text-rose-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-1.png',

        description:
            'Protect sensitive documents with enterprise-grade security, compliance controls, audit trails, and governance.',

        highlights: [
            { title: 'Data Privacy', desc: 'Ensure sensitive information is handled with enterprise-grade encryption.', icon: IconShieldCheck },
            { title: 'Compliance Controls', desc: 'Meet regulatory requirements with strict data governance policies.', icon: IconCheck },
            { title: 'Audit Trails', desc: 'Maintain detailed logs of document processing and access history.', icon: IconDatabase }
        ],

        illustration: 'security',

        kpis: [
            { label: 'Document Intelligence', value: 'AI-Powered Extraction' },
            { label: 'Enterprise Integration', value: 'Connected Systems' },
            { label: 'Workflow Automation', value: 'Business Automation' },
            { label: 'Secure Processing', value: 'Enterprise Ready' }
        ]
    }
];
