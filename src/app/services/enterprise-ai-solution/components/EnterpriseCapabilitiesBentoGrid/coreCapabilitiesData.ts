import {
    IconBrain, IconCloud, IconHierarchy, IconShieldCheck, IconApps, IconChartLine,
    IconTargetArrow, IconChartBar, IconMap, IconServer, IconDatabase, IconBlocks,
    IconRobot, IconListCheck, IconBolt, IconShield, IconLock, IconChecklist,
    IconBrandAzure, IconMessageChatbot, IconDashboard, IconActivity, IconBulb, IconTrendingUp
} from '@tabler/icons-react';

export const coreCapabilitiesData = [
    {
        id: '01',
        title: 'Enterprise Architecture & MLOps',
        shortDesc: 'Design highly available, scalable architectures that take AI models from local prototypes to global enterprise deployments.',
        icon: IconBrain,
        color: 'bg-indigo-100 text-indigo-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-1.png',
        description: 'We build robust AI infrastructure using Kubernetes, Azure Machine Learning, and Databricks. We implement CI/CD pipelines for models, ensuring they remain accurate and performant at scale.',
        highlights: [
            {
                title: 'Scalable Infrastructure',
                desc: 'Deploy resilient architectures capable of handling millions of inference requests.',
                icon: IconServer
            },
            {
                title: 'Automated CI/CD for ML',
                desc: 'Implement seamless training, testing, and deployment pipelines.',
                icon: IconBlocks
            },
            {
                title: 'Performance Monitoring',
                desc: 'Real-time observability for latency, throughput, and model drift.',
                icon: IconChartLine
            }
        ],
        illustration: 'architecture',
        kpis: [
            { label: 'Uptime', value: '99.99%' },
            { label: 'Latency', value: '<50ms' },
            { label: 'Deployments', value: 'Zero-Downtime' },
            { label: 'Scale', value: 'Global' }
        ]
    },
    {
        id: '02',
        title: 'Private AI & Secure RAG',
        shortDesc: 'Deploy secure, isolated LLMs and Retrieval-Augmented Generation (RAG) pipelines within your cloud boundary.',
        icon: IconShieldCheck,
        color: 'bg-emerald-100 text-emerald-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-2.png',
        description: 'Protect intellectual property by hosting models entirely within your VPC. We build RAG systems that connect to your secure databases without exposing data to public APIs.',
        highlights: [
            {
                title: 'Data Privacy',
                desc: 'Zero data leakage to external providers. SOC2 & GDPR compliant.',
                icon: IconLock
            },
            {
                title: 'Vector Databases',
                desc: 'Implement highly scalable vector stores like Pinecone or Milvus.',
                icon: IconDatabase
            },
            {
                title: 'Contextual Accuracy',
                desc: 'Ground AI responses in your proprietary enterprise data.',
                icon: IconTargetArrow
            }
        ],
        illustration: 'security',
        kpis: [
            { label: 'Data Leakage', value: 'Zero' },
            { label: 'Compliance', value: 'SOC2/GDPR' },
            { label: 'Accuracy', value: '99%+' },
            { label: 'Access', value: 'RBAC' }
        ]
    },
    {
        id: '03',
        title: 'Agentic Workflows',
        shortDesc: 'Build autonomous AI agents that orchestrate complex, multi-step business processes.',
        icon: IconRobot,
        color: 'bg-violet-100 text-violet-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-3.png',
        description: 'Move beyond chat interfaces. We engineer AI agents capable of reasoning, using tools, and making decisions to automate entire departments and operational workflows.',
        highlights: [
            {
                title: 'Multi-Agent Systems',
                desc: 'Deploy collaborative agents using frameworks like AutoGen and CrewAI.',
                icon: IconHierarchy
            },
            {
                title: 'Tool Integration',
                desc: 'Agents that can read emails, query SQL databases, and call REST APIs.',
                icon: IconApps
            },
            {
                title: 'Human-in-the-Loop',
                desc: 'Secure approval gates for high-stakes automated decisions.',
                icon: IconChecklist
            }
        ],
        illustration: 'automation',
        kpis: [
            { label: 'Automation', value: 'End-to-End' },
            { label: 'Cost Savings', value: 'Up to 40%' },
            { label: 'Speed', value: '10x Faster' },
            { label: 'Errors', value: 'Reduced' }
        ]
    },
    {
        id: '04',
        title: 'Legacy System Integration',
        shortDesc: 'Securely connect generative AI with your existing ERP, CRM, and bespoke operational systems.',
        icon: IconBlocks,
        color: 'bg-amber-100 text-amber-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-4.png',
        description: 'AI is only as good as the data it accesses. We build custom middleware, APIs, and data ingestion pipelines to unify your legacy systems with modern AI capabilities.',
        highlights: [
            {
                title: 'Custom Connectors',
                desc: 'Bridging the gap between modern AI and mainframe/legacy systems.',
                icon: IconBolt
            },
            {
                title: 'Real-time Sync',
                desc: 'Event-driven architectures using Kafka or Azure Service Bus.',
                icon: IconCloud
            },
            {
                title: 'Data Transformation',
                desc: 'Cleaning and normalizing legacy data for AI readiness.',
                icon: IconDatabase
            }
        ],
        illustration: 'strategy',
        kpis: [
            { label: 'Integration', value: 'Seamless' },
            { label: 'Data Flow', value: 'Real-time' },
            { label: 'Tech Debt', value: 'Reduced' },
            { label: 'ROI', value: 'Maximized' }
        ]
    },
    {
        id: '05',
        title: 'Dedicated Engineering Pods',
        shortDesc: 'Scale your delivery immediately with our dedicated, NDA-backed teams of specialized enterprise AI engineers.',
        icon: IconHierarchy,
        color: 'bg-blue-100 text-blue-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-5.png',
        description: 'Bypass the talent shortage. Our fully managed engineering pods integrate seamlessly into your agile workflow, bringing deep expertise in LLMs, vector DBs, and cloud architecture.',
        highlights: [
            {
                title: 'Specialized Talent',
                desc: 'AI Architects, ML Engineers, and Data Scientists ready to deploy.',
                icon: IconBrain
            },
            {
                title: 'Agile Delivery',
                desc: 'Two-week sprints integrated directly into your Jira/ADO boards.',
                icon: IconListCheck
            },
            {
                title: 'NDA Secured',
                desc: 'Strict confidentiality and IP assignment for all deliverables.',
                icon: IconShield
            }
        ],
        illustration: 'offshore',
        kpis: [
            { label: 'Time-to-Market', value: 'Accelerated' },
            { label: 'Talent Gap', value: 'Bridged' },
            { label: 'Flexibility', value: 'High' },
            { label: 'Delivery', value: 'Agile' }
        ]
    },
    {
        id: '06',
        title: 'AI Security & Guardrails',
        shortDesc: 'Implement strict output validation layers and fact-checking workflows to eliminate hallucinations.',
        icon: IconShield,
        color: 'bg-pink-100 text-pink-600',
        image: '/images/ai-consulting-service-image/how-ai-helps/how-1.png',
        description: 'Enterprise AI requires enterprise safety. We implement rigorous input filtering, output validation, and semantic firewalls to ensure AI behaves predictably and safely.',
        highlights: [
            {
                title: 'Hallucination Control',
                desc: 'Fact-checking loops and semantic similarity constraints.',
                icon: IconTargetArrow
            },
            {
                title: 'Prompt Injection Defense',
                desc: 'Protect models from adversarial attacks and jailbreaks.',
                icon: IconLock
            },
            {
                title: 'Audit Logging',
                desc: 'Comprehensive tracing of all AI decisions for compliance.',
                icon: IconListCheck
            }
        ],
        illustration: 'governance',
        kpis: [
            { label: 'Safety', value: 'Enterprise-Grade' },
            { label: 'Hallucinations', value: 'Eliminated' },
            { label: 'Audits', value: 'Passed' },
            { label: 'Trust', value: 'Established' }
        ]
    }
];
