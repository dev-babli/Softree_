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
        shortDesc: 'Define an enterprise AI roadmap aligned with your business objectives, digital transformation goals, and long-term growth strategy.',
        icon: IconBrain,
        color: 'bg-indigo-100 text-indigo-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-1.png',

        description:
            'Softree helps organizations identify high-value AI opportunities, assess business readiness, and develop practical AI strategies that deliver measurable business outcomes. Our consultants create tailored roadmaps that reduce implementation risk and accelerate enterprise AI adoption.',

        highlights: [
            {
                title: 'AI Opportunity Assessment',
                desc: 'Identify high-impact AI use cases that solve real business challenges and create measurable value.',
                icon: IconTargetArrow
            },
            {
                title: 'Enterprise AI Roadmap',
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
            { label: 'Enterprise', value: 'Roadmaps' },
            { label: 'AI', value: 'Readiness' },
            { label: 'Long-Term', value: 'Success' }
        ]
    },
    {
        id: '02',
        title: 'AI Readiness Assessment',
        shortDesc: 'Evaluate your people, processes, data, and technology to determine your organization’s readiness for successful AI adoption.',
        icon: IconCloud,
        color: 'bg-emerald-100 text-emerald-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-2.png',

        description:
            'Our AI readiness assessment helps organizations evaluate their current technology landscape, data maturity, business processes, and operational capabilities. We identify opportunities, potential challenges, and provide practical recommendations for a successful enterprise AI implementation.',

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
        shortDesc: 'Leverage Microsoft’s AI ecosystem to design, implement, and scale secure enterprise AI solutions.',
        icon: IconHierarchy,
        color: 'bg-violet-100 text-violet-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-3.png',

        description:
            'Softree helps organizations unlock the full potential of Microsoft AI technologies. From Microsoft Copilot and Azure AI to Power Platform, Microsoft Fabric, and Azure OpenAI, we provide expert consulting to accelerate AI adoption and enterprise innovation.',

        highlights: [
            {
                title: 'Microsoft Copilot',
                desc: 'Plan, design, and implement Microsoft Copilot solutions that improve productivity and streamline business operations.',
                icon: IconMessageChatbot
            },
            {
                title: 'Azure AI & Azure OpenAI',
                desc: 'Adopt enterprise-grade AI services using Azure AI, Azure OpenAI, and Microsofts intelligent cloud platform.',
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
            { label: 'Enterprise', value: 'AI' }
        ]
    },
    {
        id: '04',
        title: 'Offshore AI Engineering Teams',
        shortDesc: 'Scale your AI initiatives with dedicated offshore engineering teams specializing in Microsoft AI technologies.',
        icon: IconShieldCheck,
        color: 'bg-amber-100 text-amber-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-4.png',

        description:
            'Softree provides dedicated offshore AI engineering teams that seamlessly integrate with your organization. Our Microsoft AI specialists help enterprises and consulting firms accelerate AI delivery, reduce development costs, and scale projects with flexible engagement models.',

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
                desc: 'Quickly expand your engineering capacity to accelerate enterprise AI projects without compromising quality.',
                icon: IconChartLine
            }
        ],

        illustration: 'offshore',

        kpis: [
            { label: 'Dedicated', value: 'AI Teams' },
            { label: 'Flexible', value: 'Engagement' },
            { label: 'Enterprise', value: 'Delivery' },
            { label: 'Scalable', value: 'Growth' }
        ]
    },
    {
        id: '05',
        title: 'White-Label AI Delivery',
        shortDesc: 'Deliver enterprise AI solutions under your brand with Softree’s dedicated white-label engineering teams.',
        icon: IconApps,
        color: 'bg-blue-100 text-blue-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-5.png',

        description:
            'Expand your AI delivery capabilities without increasing in-house resources. Softree acts as your trusted white-label technology partner, providing Microsoft AI expertise, dedicated offshore engineers, and enterprise-grade delivery while you retain complete ownership of your client relationships and brand.',

        highlights: [
            {
                title: 'Your Brand, Our Expertise',
                desc: 'Deliver enterprise AI projects under your own brand while leveraging Softree’s experienced Microsoft AI consultants and engineers.',
                icon: IconBrandAzure
            },
            {
                title: 'Dedicated White-Label Teams',
                desc: 'Work with NDA-backed offshore AI professionals who seamlessly integrate into your delivery process as an extension of your organization.',
                icon: IconMessageChatbot
            },
            {
                title: 'Scalable Partnership Model',
                desc: 'Quickly scale delivery capacity with flexible engagement models that support consulting firms, agencies, ISVs, and enterprise partners.',
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
        shortDesc: 'Establish secure AI governance, drive user adoption, and maximize long-term business value from enterprise AI investments.',
        icon: IconChartLine,
        color: 'bg-pink-100 text-pink-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-1.png',

        description:
            'Successful AI transformation extends beyond implementation. Softree helps organizations establish AI governance frameworks, ensure responsible AI practices, strengthen security and compliance, and drive organization-wide adoption to maximize the long-term value of enterprise AI initiatives.',

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
            { label: 'Enterprise', value: 'Governance' },
            { label: 'Continuous', value: 'Optimization' },
            { label: 'Long-Term', value: 'Success' }
        ]
    }
];
