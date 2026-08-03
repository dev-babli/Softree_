import {
    IconMap2,
    IconChecklist,
    IconUsers,
    IconTrendingUp,
    IconBrandAzure,
    IconTargetArrow,
    IconSearch,
    IconBrain,
    IconUsersGroup,
    IconBuildingStore,
} from "@tabler/icons-react";

export const businessChallengesData = [
    {
        id: 1,
        title: "Scaling AI from PoC to Production",
        description:
            "Many organizations successfully build an AI prototype but struggle to deploy it across the enterprise due to architecture and integration limits.",
        icon: IconChecklist,
    },
    {
        id: 2,
        title: "Data Security and Compliance Risks",
        description:
            "Exposing sensitive corporate data to external LLMs creates massive security, privacy, and regulatory (SOC2/GDPR) compliance bottlenecks.",
        icon: IconUsers,
    },
    {
        id: 3,
        title: "Integrating AI with Legacy Systems",
        description:
            "Connecting modern AI workflows with siloed legacy ERP, CRM, and bespoke operational systems is technically complex and resource-intensive.",
        icon: IconMap2,
    },
    {
        id: 4,
        title: "Controlling Hallucinations & Accuracy",
        description:
            "In enterprise environments, inaccurate AI outputs (hallucinations) can cause catastrophic business errors and erode user trust.",
        icon: IconTrendingUp,
    },
    {
        id: 5,
        title: "Lack of Internal AI Engineering Talent",
        description:
            "Building highly robust, fault-tolerant AI architectures requires specialized engineering talent that is scarce and expensive to hire.",
        icon: IconBrandAzure,
    },
];

export const aiSolutionsData = [
    {
        id: 1,
        title: "Enterprise Architecture & MLOps",
        description:
            "Design highly available, scalable architectures that take AI models from local prototypes to global enterprise deployments.",
        icon: IconTargetArrow,
    },
    {
        id: 2,
        title: "Private AI & RAG Implementation",
        description:
            "Deploy secure, isolated LLMs and Retrieval-Augmented Generation (RAG) pipelines that run entirely within your secure cloud boundary.",
        icon: IconSearch,
    },
    {
        id: 3,
        title: "Seamless API & Legacy Integration",
        description:
            "We build custom middleware and intelligent agents that securely connect generative AI with your existing ERP and CRM systems.",
        icon: IconBrain,
    },
    {
        id: 4,
        title: "Guardrails & Output Validation",
        description:
            "Implement strict output validation layers, semantic caching, and fact-checking workflows to guarantee accuracy and eliminate hallucinations.",
        icon: IconUsersGroup,
    },
    {
        id: 5,
        title: "Dedicated AI Engineering Pods",
        description:
            "Scale your delivery immediately with our dedicated, NDA-backed teams of specialized enterprise AI engineers and architects.",
        icon: IconBuildingStore,
    },
];