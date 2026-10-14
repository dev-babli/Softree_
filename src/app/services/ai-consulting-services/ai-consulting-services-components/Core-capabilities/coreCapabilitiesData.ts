import {
    IconBrain, IconCloud, IconHierarchy, IconShieldCheck, IconApps, IconChartLine,
    IconTargetArrow, IconChartBar, IconMap, IconServer, IconDatabase, IconBlocks,
    IconRobot, IconListCheck, IconBolt, IconShield, IconLock, IconChecklist,
    IconBrandAzure, IconMessageChatbot, IconDashboard, IconActivity, IconBulb, IconTrendingUp
} from '@tabler/icons-react';

export const coreCapabilitiesData = [
    {
        id: '01',
        title: 'AI Strategy & Advisory',
        shortDesc: 'Identify valuable AI opportunities, prioritize use cases, and develop a practical roadmap aligned with your business objectives.',
        icon: IconBrain,
        color: 'bg-indigo-100 text-indigo-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-1.webp',

        description:
            'Identify valuable AI opportunities, prioritize use cases, and develop a practical roadmap aligned with your business objectives.',

        highlights: [
            {
                title: 'AI Opportunity Assessment',
                desc: 'Identify high-impact AI use cases that solve real business challenges and create measurable value.',
                icon: IconTargetArrow
            },
            {
                title: 'Strategic AI Roadmap',
                desc: 'Develop a phased AI implementation strategy aligned with business priorities and digital transformation goals.',
                icon: IconMap
            },
            {
                title: 'Business & Technology Alignment',
                desc: 'Align AI initiatives with your existing technology ecosystem, operational processes, and future business vision.',
                icon: IconChartBar
            }
        ],

        illustration: 'strategy',

        kpis: [
            { label: 'Business-First', value: 'AI Strategy' },
            { label: 'Strategic', value: 'Roadmaps' },
            { label: 'AI', value: 'Readiness' },
            { label: 'Long-Term', value: 'Success' }
        ]
    },
    {
        id: '02',
        title: 'AI Readiness Assessment',
        shortDesc: 'Evaluate data quality, infrastructure, security, and existing workflows to identify gaps and prepare for AI implementation.',
        icon: IconCloud,
        color: 'bg-emerald-100 text-emerald-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-2.webp',

        description:
            'Evaluate data quality, infrastructure, security, and existing workflows to identify gaps and prepare for AI implementation.',

        highlights: [
            {
                title: 'Technology Assessment',
                desc: 'Evaluate your existing systems, cloud infrastructure, applications, and Microsoft ecosystem to identify AI integration opportunities.',
                icon: IconServer
            },
            {
                title: 'Data Readiness',
                desc: 'Assess data quality, availability, governance, and accessibility to ensure your organization is prepared for AI initiatives.',
                icon: IconDatabase
            },
            {
                title: 'AI Adoption Roadmap',
                desc: 'Deliver a clear implementation plan with prioritized recommendations, timelines, and business-focused next steps.',
                icon: IconMap
            }
        ],

        illustration: 'readiness',

        kpis: [
            { label: 'Technology', value: 'Assessment' },
            { label: 'Data', value: 'Readiness' },
            { label: 'AI', value: 'Adoption' },
            { label: 'Business', value: 'Alignment' }
        ]
    },
    {
        id: '03',
        title: 'Microsoft AI Consulting',
        shortDesc: 'Explore and implement suitable Microsoft AI solutions, including Azure AI, Azure OpenAI, Microsoft Copilot Studio, and Power Platform.',
        icon: IconHierarchy,
        color: 'bg-violet-100 text-violet-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-3.webp',

        description:
            'Explore and implement suitable Microsoft AI solutions, including Azure AI, Azure OpenAI, Microsoft Copilot Studio, and Power Platform.',

        highlights: [
            {
                title: 'Microsoft Copilot',
                desc: 'Plan, design, and implement Microsoft Copilot solutions that improve productivity and streamline business operations.',
                icon: IconMessageChatbot
            },
            {
                title: 'Azure AI & Azure OpenAI',
                desc: 'Adopt production-grade AI services using Azure AI, Azure OpenAI, and Microsofts intelligent cloud platform.',
                icon: IconBrandAzure
            },
            {
                title: 'Power Platform & Fabric',
                desc: 'Integrate Power Apps, Power Automate, Power BI, Dataverse, and Microsoft Fabric into a connected AI ecosystem.',
                icon: IconDashboard
            }
        ],

        illustration: 'microsoft',

        kpis: [
            { label: 'Microsoft', value: 'Copilot' },
            { label: 'Azure AI', value: 'Expertise' },
            { label: 'Power Platform', value: 'Solutions' },
            { label: 'Microsoft', value: 'AI' }
        ]
    },
    {
        id: '04',
        title: 'Offshore AI Engineering Teams',
        shortDesc: 'Extend your delivery capacity with offshore AI engineers supporting AI development, system integration, and workflow automation.',
        icon: IconShieldCheck,
        color: 'bg-amber-100 text-amber-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-4.webp',

        description:
            'Extend your delivery capacity with offshore AI engineers supporting AI development, system integration, and workflow automation.',

        highlights: [
            {
                title: 'Dedicated AI Engineers',
                desc: 'Access experienced Microsoft AI consultants, architects, and developers who work as an extension of your in-house team.',
                icon: IconHierarchy
            },
            {
                title: 'Flexible Engagement Models',
                desc: 'Choose dedicated teams, staff augmentation, or project-based delivery tailored to your business requirements.',
                icon: IconCloud
            },
            {
                title: 'Scalable AI Delivery',
                desc: 'Quickly expand your engineering capacity to accelerate AI projects without compromising quality.',
                icon: IconChartLine
            }
        ],

        illustration: 'offshore',

        kpis: [
            { label: 'Dedicated', value: 'AI Teams' },
            { label: 'Flexible', value: 'Engagement' },
            { label: 'Offshore', value: 'Delivery' },
            { label: 'Scalable', value: 'Growth' }
        ]
    },
    {
        id: '05',
        title: 'White-Label AI Delivery',
        shortDesc: 'Expand your AI services with offshore engineering support that works under your brand and delivery model.',
        icon: IconApps,
        color: 'bg-blue-100 text-blue-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-5.webp',

        description:
            'Expand your AI services with offshore engineering support that works under your brand and delivery model.',

        highlights: [
            {
                title: 'Your Brand, Our Expertise',
                desc: 'Deliver AI projects under your own brand while leveraging Softree’s experienced Microsoft AI consultants and engineers.',
                icon: IconBrandAzure
            },
            {
                title: 'Dedicated White-Label Teams',
                desc: 'Work with NDA-backed offshore AI professionals who seamlessly integrate into your delivery process as an extension of your organization.',
                icon: IconMessageChatbot
            },
            {
                title: 'Scalable Partnership Model',
                desc: 'Quickly scale delivery capacity with flexible engagement models that support consulting firms, agencies, ISVs, and technology partners.',
                icon: IconDashboard
            }
        ],

        illustration: 'whitelabel',

        kpis: [
            { label: '100%', value: 'White-Label' },
            { label: 'Dedicated', value: 'Teams' },
            { label: 'Flexible', value: 'Delivery' },
            { label: 'Trusted', value: 'Partnership' }
        ]
    },
    {
        id: '06',
        title: 'AI Governance & Adoption',
        shortDesc: 'Plan appropriate security controls, governance practices, and adoption processes for responsible AI implementation.',
        icon: IconChartLine,
        color: 'bg-pink-100 text-pink-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-1.webp',

        description:
            'Plan appropriate security controls, governance practices, and adoption processes for responsible AI implementation.',

        highlights: [
            {
                title: 'Responsible AI Governance',
                desc: 'Define governance frameworks, policies, and best practices that ensure secure, ethical, and compliant AI adoption.',
                icon: IconShield
            },
            {
                title: 'Change Management & User Adoption',
                desc: 'Support employees with training, enablement, and adoption strategies that increase AI usage and business productivity.',
                icon: IconBulb
            },
            {
                title: 'Continuous Optimization',
                desc: 'Monitor AI performance, identify improvement opportunities, and continuously optimize solutions to maximize business outcomes.',
                icon: IconTrendingUp
            }
        ],

        illustration: 'governance',

        kpis: [
            { label: 'Responsible', value: 'AI' },
            { label: 'Responsible', value: 'Governance' },
            { label: 'Continuous', value: 'Optimization' },
            { label: 'Long-Term', value: 'Success' }
        ]
    }
];
