import { 
  IconDatabase, IconFileText, IconSearch, IconBrain, IconShieldLock, IconActivity,
  IconServer, IconLayersLinked, IconApi, IconLock, IconChartBar, IconTrendingUp,
  IconRobot, IconCheck
} from '@tabler/icons-react';

export const coreCapabilitiesData = [
  {
    id: '01',
    title: 'Enterprise Data Ingestion',
    shortDesc: 'Connect enterprise knowledge from SharePoint, PDFs, databases, APIs, cloud storage, CRM, and internal systems.',
    icon: IconDatabase,
    color: 'bg-indigo-100 text-indigo-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/llm-integration.jpg',
    description: 'Build secure data ingestion pipelines that connect fragmented enterprise knowledge and prepare it for accurate, scalable Retrieval-Augmented Generation (RAG).',
    highlights: [
      {
        title: 'Multi-Source Connectivity',
        desc: 'Connect SharePoint, databases, APIs, cloud storage, CRM, PDFs, and enterprise applications.',
        icon: IconApi
      },
      {
        title: 'Structured & Unstructured Data',
        desc: 'Process documents, records, web content, tables, and other enterprise knowledge formats.',
        icon: IconFileText
      },
      {
        title: 'Automated Data Pipelines',
        desc: 'Build scalable ingestion workflows that continuously synchronize and prepare enterprise knowledge.',
        icon: IconServer
      }
    ],
    illustration: 'strategy',
    kpis: [
      { label: 'Sources', value: 'Unlimited' },
      { label: 'Data Sync', value: 'Real-time' },
      { label: 'Accuracy', value: '99.9%' },
      { label: 'Scalability', value: 'Enterprise' }
    ]
  },
  {
    id: '02',
    title: 'Document Processing & Chunking',
    shortDesc: 'Transform enterprise documents into optimized, searchable knowledge for reliable RAG retrieval.',
    icon: IconFileText,
    color: 'bg-emerald-100 text-emerald-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/rag-integration.jpg',
    description: 'Prepare complex enterprise content for RAG using intelligent parsing, chunking, metadata enrichment, and content preprocessing strategies.',
    highlights: [
      {
        title: 'Intelligent Document Parsing',
        desc: 'Extract useful content from PDFs, Office documents, knowledge bases, and other enterprise files.',
        icon: IconFileText
      },
      {
        title: 'Context-Aware Chunking',
        desc: 'Create optimized content chunks that preserve meaning and improve retrieval accuracy.',
        icon: IconLayersLinked
      },
      {
        title: 'Metadata Enrichment',
        desc: 'Add document metadata, categories, permissions, and contextual information for precise retrieval.',
        icon: IconDatabase
      }
    ],
    illustration: 'architecture',
    kpis: [
      { label: 'Processing Speed', value: 'Fast' },
      { label: 'Context Kept', value: '100%' },
      { label: 'Formats', value: 'All Major' },
      { label: 'Enrichment', value: 'Automated' }
    ]
  },
  {
    id: '03',
    title: 'Embeddings & Vector Search',
    shortDesc: 'Enable fast semantic search across large enterprise knowledge bases using embeddings and vector databases.',
    icon: IconSearch,
    color: 'bg-violet-100 text-violet-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/api-integration.jpg',
    description: 'Implement enterprise-grade embedding pipelines and vector search architectures that help AI systems retrieve semantically relevant knowledge at scale.',
    highlights: [
      {
        title: 'Embedding Generation',
        desc: 'Convert enterprise knowledge into high-quality vector representations optimized for semantic retrieval.',
        icon: IconBrain
      },
      {
        title: 'Vector Database Integration',
        desc: 'Integrate scalable vector databases such as Azure AI Search, Pinecone, Weaviate, or other suitable platforms.',
        icon: IconServer
      },
      {
        title: 'Semantic Search',
        desc: 'Retrieve information based on meaning and context rather than relying only on keyword matching.',
        icon: IconSearch
      }
    ],
    illustration: 'automation',
    kpis: [
      { label: 'Search Speed', value: '<50ms' },
      { label: 'Vector Index', value: 'Scalable' },
      { label: 'Semantic Match', value: 'High' },
      { label: 'Databases', value: 'Agnostic' }
    ]
  },
  {
    id: '04',
    title: 'Intelligent Retrieval & Reranking',
    shortDesc: 'Improve RAG accuracy with hybrid search, semantic retrieval, filtering, reranking, and context optimization.',
    icon: IconTrendingUp,
    color: 'bg-amber-100 text-amber-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/memory-context.jpg',
    description: 'Build advanced enterprise retrieval pipelines that identify the most relevant knowledge before passing context to the language model.',
    highlights: [
      {
        title: 'Hybrid Retrieval',
        desc: 'Combine semantic vector search with keyword and structured search for stronger retrieval coverage.',
        icon: IconSearch
      },
      {
        title: 'Intelligent Reranking',
        desc: 'Rerank retrieved content based on relevance before sending context to the LLM.',
        icon: IconChartBar
      },
      {
        title: 'Context Optimization',
        desc: 'Filter and organize retrieved knowledge to reduce noise and improve grounded AI responses.',
        icon: IconCheck
      }
    ],
    illustration: 'microsoft',
    kpis: [
      { label: 'Relevance', value: 'High' },
      { label: 'Noise Reduction', value: 'Maximized' },
      { label: 'Coverage', value: 'Comprehensive' },
      { label: 'Reranking', value: 'Automated' }
    ]
  },
  {
    id: '05',
    title: 'LLM Integration & Grounded Generation',
    shortDesc: 'Connect enterprise knowledge with leading LLMs to generate accurate, context-aware, and grounded AI responses.',
    icon: IconBrain,
    color: 'bg-blue-100 text-blue-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/human-in-loop.jpg',
    description: 'Integrate enterprise RAG pipelines with leading language models to deliver AI responses grounded in trusted organizational knowledge.',
    highlights: [
      {
        title: 'Multi-Model Integration',
        desc: 'Integrate OpenAI, Azure OpenAI, Claude, Gemini, and other enterprise-ready language models.',
        icon: IconRobot
      },
      {
        title: 'Grounded AI Responses',
        desc: 'Generate answers using retrieved enterprise context instead of relying solely on model knowledge.',
        icon: IconShieldLock
      },
      {
        title: 'Prompt & Context Engineering',
        desc: 'Optimize prompts and retrieved context to improve response relevance, consistency, and reliability.',
        icon: IconBrain
      }
    ],
    illustration: 'automation',
    kpis: [
      { label: 'Models', value: 'Agnostic' },
      { label: 'Hallucinations', value: '0%' },
      { label: 'Context Size', value: 'Optimized' },
      { label: 'Response', value: 'Grounded' }
    ]
  },
  {
    id: '06',
    title: 'RAG Security, Governance & Monitoring',
    shortDesc: 'Protect enterprise knowledge and continuously monitor retrieval quality, AI accuracy, security, and system performance.',
    icon: IconShieldLock,
    color: 'bg-pink-100 text-pink-600',
    image: '/images/solutions/ai-agents-development/core-capabilities/security-governance.jpg',
    description: 'Deploy production-ready Enterprise RAG solutions with secure knowledge access, governance controls, observability, evaluation, and continuous optimization.',
    highlights: [
      {
        title: 'Enterprise Security',
        desc: 'Protect sensitive knowledge using role-based access, secure retrieval, permissions, and enterprise data policies.',
        icon: IconLock
      },
      {
        title: 'RAG Evaluation & Monitoring',
        desc: 'Track retrieval relevance, response accuracy, latency, quality, and overall RAG system performance.',
        icon: IconActivity
      },
      {
        title: 'Continuous Optimization',
        desc: 'Continuously improve chunking, retrieval, reranking, prompts, and model performance using production insights.',
        icon: IconTrendingUp
      }
    ],
    illustration: 'security',
    kpis: [
      { label: 'Security', value: 'Enterprise' },
      { label: 'Monitoring', value: '24/7' },
      { label: 'Access Control', value: 'RBAC' },
      { label: 'Optimization', value: 'Continuous' }
    ]
  }
];
