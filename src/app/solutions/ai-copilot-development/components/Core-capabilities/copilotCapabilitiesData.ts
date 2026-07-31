import {
    IconTargetArrow, IconHierarchy, IconRobot, IconLink, IconDatabase, IconShieldCheck,
    IconMap, IconChartBar, IconServer, IconCloud, IconMessageChatbot, IconAppWindow
} from '@tabler/icons-react';

export const copilotCapabilitiesData = [
    {
        id: '01',
        title: 'AI Copilot Strategy & Planning',
        shortDesc: 'Define a roadmap for building custom AI copilots aligned with your business goals, user needs, enterprise data, and digital transformation initiatives.',
        icon: IconTargetArrow,
        color: 'bg-indigo-100 text-indigo-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-1.png', 

        description:
            'Define a roadmap for building custom AI copilots aligned with your business goals, user needs, enterprise data, and digital transformation initiatives. We ensure your AI strategy connects with your long-term business objectives.',

        highlights: [
            {
                title: 'Strategic Alignment',
                desc: 'Align AI copilot initiatives with enterprise goals and digital transformation roadmaps.',
                icon: IconMap
            },
            {
                title: 'Use Case Identification',
                desc: 'Identify high-value business processes that benefit most from AI copilot automation.',
                icon: IconTargetArrow
            },
            {
                title: 'ROI Assessment',
                desc: 'Evaluate the expected business value and cost savings of your AI copilot investments.',
                icon: IconChartBar
            }
        ],

        illustration: 'strategy',

        kpis: [
            { label: 'Enterprise Design', value: 'Architecture' },
            { label: 'Connected Data', value: 'Knowledge' },
            { label: 'AI Powered', value: 'Intelligence' },
            { label: 'Enterprise Ready', value: 'Deployment' }
        ]
    },
    {
        id: '02',
        title: 'Enterprise Copilot Architecture',
        shortDesc: 'Design secure, scalable AI copilot architectures with Microsoft Copilot Studio, Azure AI, enterprise knowledge sources, and modern cloud technologies.',
        icon: IconHierarchy,
        color: 'bg-emerald-100 text-emerald-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-2.png', 

        description:
            'A successful enterprise AI copilot starts with a secure and scalable architecture. Softree designs AI copilot solutions that integrate Microsoft Copilot Studio, Azure AI, enterprise knowledge, and business applications to deliver intelligent, context-aware assistance while maintaining security, governance, and performance.',

        highlights: [
            {
                title: 'Secure AI Architecture',
                desc: 'Design enterprise-ready AI copilots with secure authentication, role-based access, governance policies, and scalable cloud infrastructure.',
                icon: IconServer
            },
            {
                title: 'Knowledge Integration',
                desc: 'Connect SharePoint, Microsoft 365, Dataverse, SQL databases, APIs, and enterprise documents to deliver accurate, context-aware AI responses.',
                icon: IconDatabase
            },
            {
                title: 'Scalable AI Deployment',
                desc: 'Deploy enterprise AI copilots across departments with continuous monitoring, optimization, and governance for long-term business success.',
                icon: IconCloud
            }
        ],

        illustration: 'architecture',

        kpis: [
            { label: 'Enterprise Design', value: 'Architecture' },
            { label: 'Connected Data', value: 'Knowledge' },
            { label: 'AI Powered', value: 'Intelligence' },
            { label: 'Enterprise Ready', value: 'Deployment' }
        ]
    },
    {
        id: '03',
        title: 'Custom AI Copilot Development',
        shortDesc: 'Build intelligent AI copilots and AI agents that automate tasks, answer business questions, assist employees, and streamline daily operations.',
        icon: IconRobot,
        color: 'bg-violet-100 text-violet-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-3.png', 

        description:
            'Build intelligent AI copilots and AI agents that automate tasks, answer business questions, assist employees, and streamline daily operations. Our custom development ensures the copilot exactly meets your unique workflow requirements.',

        highlights: [
            {
                title: 'Custom Workflows',
                desc: 'Design and build AI agents that seamlessly automate your specific business processes.',
                icon: IconAppWindow
            },
            {
                title: 'Natural Language Processing',
                desc: 'Implement advanced NLP for intelligent conversational interfaces.',
                icon: IconMessageChatbot
            },
            {
                title: 'Employee Assistance',
                desc: 'Empower employees with on-demand AI assistance for their daily tasks.',
                icon: IconRobot
            }
        ],

        illustration: 'automation',

        kpis: [
            { label: 'Enterprise Design', value: 'Architecture' },
            { label: 'Connected Data', value: 'Knowledge' },
            { label: 'AI Powered', value: 'Intelligence' },
            { label: 'Enterprise Ready', value: 'Deployment' }
        ]
    },
    {
        id: '04',
        title: 'Enterprise System Integration',
        shortDesc: 'Integrate AI copilots with Microsoft 365, SharePoint, Dynamics 365, Dataverse, CRM, ERP, Teams, and third-party business applications.',
        icon: IconLink,
        color: 'bg-amber-100 text-amber-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-4.png', 

        description:
            'Integrate AI copilots with Microsoft 365, SharePoint, Dynamics 365, Dataverse, CRM, ERP, Teams, and third-party business applications. Seamless connectivity brings AI directly into the tools your team already uses.',

        highlights: [
            {
                title: 'Microsoft 365 Integration',
                desc: 'Connect your copilot to Teams, SharePoint, and core Microsoft productivity apps.',
                icon: IconLink
            },
            {
                title: 'CRM & ERP Connectivity',
                desc: 'Integrate with Dynamics 365, Salesforce, SAP, and other enterprise systems.',
                icon: IconServer
            },
            {
                title: 'API Development',
                desc: 'Build custom APIs to connect AI copilots to proprietary internal applications.',
                icon: IconDatabase
            }
        ],

        illustration: 'microsoft',

        kpis: [
            { label: 'Enterprise Design', value: 'Architecture' },
            { label: 'Connected Data', value: 'Knowledge' },
            { label: 'AI Powered', value: 'Intelligence' },
            { label: 'Enterprise Ready', value: 'Deployment' }
        ]
    },
    {
        id: '05',
        title: 'Knowledge & Data Integration',
        shortDesc: 'Connect AI copilots to enterprise knowledge bases, SharePoint, SQL databases, documents, APIs, and internal business systems for accurate contextual responses.',
        icon: IconDatabase,
        color: 'bg-blue-100 text-blue-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-5.png', 

        description:
            'Connect AI copilots to enterprise knowledge bases, SharePoint, SQL databases, documents, APIs, and internal business systems for accurate contextual responses. Ground your AI in your own trusted enterprise data.',

        highlights: [
            {
                title: 'Data Ingestion',
                desc: 'Securely ingest structured and unstructured data from across your organization.',
                icon: IconDatabase
            },
            {
                title: 'Contextual Accuracy',
                desc: 'Ensure AI responses are accurate, grounded, and specific to your business context.',
                icon: IconTargetArrow
            },
            {
                title: 'Semantic Search',
                desc: 'Implement advanced semantic search capabilities over your enterprise documents.',
                icon: IconCloud
            }
        ],

        illustration: 'strategy',

        kpis: [
            { label: 'Enterprise Design', value: 'Architecture' },
            { label: 'Connected Data', value: 'Knowledge' },
            { label: 'AI Powered', value: 'Intelligence' },
            { label: 'Enterprise Ready', value: 'Deployment' }
        ]
    },
    {
        id: '06',
        title: 'AI Governance & Continuous Optimization',
        shortDesc: 'Ensure secure AI adoption with governance, compliance, performance monitoring, prompt optimization, and continuous improvements for enterprise AI copilots.',
        icon: IconShieldCheck,
        color: 'bg-rose-100 text-rose-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-1.png', 

        description:
            'Ensure secure AI adoption with governance, compliance, performance monitoring, prompt optimization, and continuous improvements for enterprise AI copilots. Maintain trust and performance at scale.',

        highlights: [
            {
                title: 'Security & Compliance',
                desc: 'Enforce enterprise security policies, data privacy, and compliance standards.',
                icon: IconShieldCheck
            },
            {
                title: 'Performance Monitoring',
                desc: 'Track AI copilot usage, response quality, and user satisfaction metrics.',
                icon: IconChartBar
            },
            {
                title: 'Prompt Optimization',
                desc: 'Continuously refine prompts and models based on user feedback and analytics.',
                icon: IconRobot
            }
        ],

        illustration: 'security',

        kpis: [
            { label: 'Enterprise Design', value: 'Architecture' },
            { label: 'Connected Data', value: 'Knowledge' },
            { label: 'AI Powered', value: 'Intelligence' },
            { label: 'Enterprise Ready', value: 'Deployment' }
        ]
    }
];
