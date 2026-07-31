import {
    IconBrain, IconCloud, IconHierarchy, IconShieldCheck, IconApps, IconChartLine,
    IconTargetArrow, IconChartBar, IconMap, IconServer, IconDatabase, IconBlocks,
    IconRobot, IconListCheck, IconBolt, IconShield, IconLock, IconChecklist,
    IconBrandAzure, IconMessageChatbot, IconDashboard, IconActivity, IconBulb, IconTrendingUp,
    IconAnalyze
} from '@tabler/icons-react';

export const coreCapabilitiesData = [
    {
        id: '01',
        title: 'AI Workflow Strategy',
        shortDesc: 'Design an AI-powered workflow automation roadmap aligned with your business goals, operational priorities, and digital transformation initiatives.',
        icon: IconMap,
        color: 'bg-indigo-100 text-indigo-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-1.png',

        description:
            'Softree helps organizations design comprehensive AI workflow automation strategies that identify high-value opportunities, assess operational readiness, and develop practical roadmaps to maximize efficiency and ROI.',

        highlights: [
            {
                title: 'Workflow Assessment',
                desc: 'Identify repetitive tasks and business processes that can be transformed with AI automation.',
                icon: IconTargetArrow
            },
            {
                title: 'Automation Roadmap',
                desc: 'Develop a phased automation implementation strategy aligned with business priorities.',
                icon: IconMap
            },
            {
                title: 'Tech Stack Alignment',
                desc: 'Align AI initiatives with your existing technology ecosystem and operational processes.',
                icon: IconChartBar
            }
        ],

        illustration: 'strategy',

        kpis: [
            { label: 'AI', value: 'Workflow' },
            { label: 'Intelligent', value: 'Automation' },
            { label: 'Enterprise', value: 'Governance' },
            { label: 'Seamless', value: 'Integration' }
        ]
    },
    {
        id: '02',
        title: 'Intelligent Process Automation',
        shortDesc: 'Automate repetitive business processes with AI-driven workflows that improve efficiency, reduce manual effort, and eliminate operational bottlenecks.',
        icon: IconRobot,
        color: 'bg-emerald-100 text-emerald-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-2.png',

        description:
            'Automate repetitive business processes with AI-driven workflows that improve efficiency, reduce manual effort, and eliminate operational bottlenecks across your enterprise. Softree implements robust automation to transform how you work.',

        highlights: [
            {
                title: 'Process Automation',
                desc: 'Streamline data entry, document processing, and repetitive tasks with intelligent bots.',
                icon: IconRobot
            },
            {
                title: 'Intelligent Workflows',
                desc: 'Build smart logic and decision-making capabilities directly into your business processes.',
                icon: IconBolt
            },
            {
                title: 'Operational Efficiency',
                desc: 'Drastically reduce manual effort and processing times while improving data accuracy.',
                icon: IconTrendingUp
            }
        ],

        illustration: 'readiness',

        kpis: [
            { label: 'AI', value: 'Workflow' },
            { label: 'Intelligent', value: 'Automation' },
            { label: 'Enterprise', value: 'Governance' },
            { label: 'Seamless', value: 'Integration' }
        ]
    },
    {
        id: '03',
        title: 'Microsoft Power Platform Automation',
        shortDesc: 'Build scalable workflow automation solutions using Power Automate, Power Apps, Dataverse, Microsoft 365, and Azure AI services.',
        icon: IconApps,
        color: 'bg-violet-100 text-violet-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-3.png',

        description:
            'Build scalable workflow automation solutions using Power Automate, Power Apps, Dataverse, Microsoft 365, and Azure AI services. Softree leverages the full Microsoft ecosystem to create enterprise-grade automated applications.',

        highlights: [
            {
                title: 'Power Automate Solutions',
                desc: 'Create powerful, automated workflows between your favorite apps and services.',
                icon: IconBolt
            },
            {
                title: 'Custom Power Apps',
                desc: 'Develop custom business applications that connect to your automated data workflows.',
                icon: IconBlocks
            },
            {
                title: 'Azure AI Integration',
                desc: 'Embed cognitive services and machine learning models directly into your automated processes.',
                icon: IconCloud
            }
        ],

        illustration: 'microsoft',

        kpis: [
            { label: 'AI', value: 'Workflow' },
            { label: 'Intelligent', value: 'Automation' },
            { label: 'Enterprise', value: 'Governance' },
            { label: 'Seamless', value: 'Integration' }
        ]
    },
    {
        id: '04',
        title: 'Enterprise System Integration',
        shortDesc: 'Connect ERP, CRM, SharePoint, Dynamics 365, SAP, Salesforce, and third-party applications through intelligent automated workflows.',
        icon: IconHierarchy,
        color: 'bg-amber-100 text-amber-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-4.png',

        description:
            'Connect ERP, CRM, SharePoint, Dynamics 365, SAP, Salesforce, and third-party applications through intelligent automated workflows. Softree breaks down data silos by seamlessly connecting your enterprise systems.',

        highlights: [
            {
                title: 'Seamless Connectivity',
                desc: 'Integrate disparate systems to ensure smooth and secure data flow across the enterprise.',
                icon: IconHierarchy
            },
            {
                title: 'Legacy System Integration',
                desc: 'Modernize legacy applications by connecting them to modern AI-driven automation workflows.',
                icon: IconDatabase
            },
            {
                title: 'Data Synchronization',
                desc: 'Maintain real-time data consistency and accuracy across all your business applications.',
                icon: IconActivity
            }
        ],

        illustration: 'offshore',

        kpis: [
            { label: 'AI', value: 'Workflow' },
            { label: 'Intelligent', value: 'Automation' },
            { label: 'Enterprise', value: 'Governance' },
            { label: 'Seamless', value: 'Integration' }
        ]
    },
    {
        id: '05',
        title: 'AI Agents & Copilot Automation',
        shortDesc: 'Deploy AI agents and Copilot-powered assistants to automate employee tasks, customer interactions, approvals, and knowledge retrieval.',
        icon: IconMessageChatbot,
        color: 'bg-blue-100 text-blue-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-5.png',

        description:
            'Deploy AI agents and Copilot-powered assistants to automate employee tasks, customer interactions, approvals, and knowledge retrieval. Softree builds intelligent agents that act as virtual team members to accelerate productivity.',

        highlights: [
            {
                title: 'Copilot Deployment',
                desc: 'Integrate Microsoft Copilot seamlessly into your daily business operations and workflows.',
                icon: IconMessageChatbot
            },
            {
                title: 'Intelligent Approvals',
                desc: 'Automate complex approval chains using AI-driven context and decision-making capabilities.',
                icon: IconListCheck
            },
            {
                title: 'Automated Task Management',
                desc: 'Allow AI agents to autonomously handle routine tasks, scheduling, and information retrieval.',
                icon: IconChecklist
            }
        ],

        illustration: 'whitelabel',

        kpis: [
            { label: 'AI', value: 'Workflow' },
            { label: 'Intelligent', value: 'Automation' },
            { label: 'Enterprise', value: 'Governance' },
            { label: 'Seamless', value: 'Integration' }
        ]
    },
    {
        id: '06',
        title: 'Workflow Optimization & Governance',
        shortDesc: 'Continuously monitor, optimize, and govern enterprise workflows to improve productivity, compliance, security, and operational performance.',
        icon: IconShieldCheck,
        color: 'bg-pink-100 text-pink-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-3.png',

        description:
            'Successful AI workflow automation extends beyond implementation. Softree helps organizations monitor workflow performance, optimize business processes, enforce governance policies, and continuously improve automation initiatives to maximize operational efficiency and business outcomes.',

        highlights: [
            {
                title: 'Continuous Workflow Monitoring',
                desc: 'Track workflow execution, identify bottlenecks, monitor KPIs, and improve operational visibility with real-time insights.',
                icon: IconActivity
            },
            {
                title: 'Secure Automation Governance',
                desc: 'Implement enterprise security, compliance, approval controls, and governance policies to ensure reliable and scalable workflow automation.',
                icon: IconShield
            },
            {
                title: 'AI-Driven Process Optimization',
                desc: 'Leverage analytics and AI insights to continuously refine workflows, improve efficiency, reduce costs, and enhance business productivity.',
                icon: IconTrendingUp
            }
        ],

        illustration: 'governance',

        kpis: [
            { label: 'AI', value: 'Workflow' },
            { label: 'Intelligent', value: 'Automation' },
            { label: 'Enterprise', value: 'Governance' },
            { label: 'Seamless', value: 'Integration' }
        ]
    }
];
