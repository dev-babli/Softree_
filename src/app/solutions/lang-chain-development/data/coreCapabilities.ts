import {
  IconDatabase,
  IconApi,
  IconUserCheck,
  IconShieldLock,
  IconChartBar,
  IconTrendingUp,
  IconServer,
  IconRobot,
  IconActivity,
  IconSearch,
  IconGitBranch,
  IconPlugConnected,
  IconSparkles,
  IconFileText,
  IconMessages,
  IconBrain,
} from '@tabler/icons-react';

export const coreCapabilitiesData = [
  {
    id: '01',
    title: 'AI Agent Development with LangChain',
    shortDesc:
      'Build autonomous and task-oriented AI agents using LangChain that reason through complex requests, use external tools, and execute multi-step business processes.',
    icon: IconRobot,
    color: 'bg-orange-100 text-orange-600',
    image: '/images/solutions/lang-chain-development/core-capabilities/cap-03-langgraph.jpg?v=lc-cap-2',
    description:
      'We develop autonomous and semi-autonomous AI agents using LangChain and LangGraph. These agents reason over dynamic business requests, select appropriate tools, access enterprise context, and execute workflows with human-in-the-loop safeguards.',
    highlights: [
      {
        title: 'Autonomous Multi-Step Reasoning',
        desc: 'Chain-of-thought and ReAct architectures for problem decomposition.',
        icon: IconBrain,
      },
      {
        title: 'Tool & API Invocation',
        desc: 'Dynamic tool selection for ERP, CRM, databases, and third-party APIs.',
        icon: IconPlugConnected,
      },
      {
        title: 'Human-in-the-Loop Verification',
        desc: 'Approval checkpoints before executing irreversible business operations.',
        icon: IconUserCheck,
      },
    ],
    illustration: 'strategy',
    kpis: [
      { label: 'Task Automation', value: '75%+' },
      { label: 'Execution Accuracy', value: '98%' },
      { label: 'Tool Integrations', value: '50+' },
      { label: 'Human Oversight', value: 'Built-in' },
    ],
  },
  {
    id: '02',
    title: 'LangChain RAG Application Development',
    shortDesc:
      'Build secure Retrieval-Augmented Generation applications connecting LLMs with enterprise documents, vector databases, APIs, and knowledge bases for context-aware responses.',
    icon: IconSearch,
    color: 'bg-emerald-100 text-emerald-600',
    image: '/images/solutions/lang-chain-development/core-capabilities/cap-02-rag.jpg?v=lc-cap-2',
    description:
      'Eliminate hallucination by grounding LangChain models in verified enterprise data. We engineer advanced chunking, hybrid keyword/vector search, re-ranking algorithms, and permission-aware retrieval pipelines.',
    highlights: [
      {
        title: 'Hybrid Vector & Semantic Retrieval',
        desc: 'Vector embeddings paired with BM25 full-text search and reciprocal rank fusion.',
        icon: IconSearch,
      },
      {
        title: 'Document Partitioning & Chunking',
        desc: 'Hierarchical chunking preserving tables, headers, and metadata context.',
        icon: IconFileText,
      },
      {
        title: 'Permission-Aware Access Control',
        desc: 'Role-based access filtering (RBAC) enforced at query time.',
        icon: IconShieldLock,
      },
    ],
    illustration: 'architecture',
    kpis: [
      { label: 'Answer Grounding', value: '95%+' },
      { label: 'Query Latency', value: '<700ms' },
      { label: 'Source Citations', value: '100%' },
      { label: 'ACL Enforcement', value: 'Strict' },
    ],
  },
  {
    id: '03',
    title: 'Enterprise AI Assistant Development',
    shortDesc:
      'Develop enterprise AI assistants with LangChain that connect organizational knowledge and business systems with LLMs, helping employees make faster decisions.',
    icon: IconUserCheck,
    color: 'bg-blue-100 text-blue-600',
    image: '/images/solutions/lang-chain-development/core-capabilities/cap-01-apps-apis.jpg?v=lc-cap-2',
    description:
      'Empower internal teams with smart enterprise assistants that unify fragmented operational knowledge across SharePoint, Confluence, internal databases, and ticketing systems into conversational interfaces.',
    highlights: [
      {
        title: 'Cross-System Knowledge Aggregation',
        desc: 'Unified discovery across scattered files, emails, and intranets.',
        icon: IconDatabase,
      },
      {
        title: 'Contextual Departmental Scopes',
        desc: 'Customized memory and specialized skill sets for HR, Legal, IT, and Finance.',
        icon: IconRobot,
      },
      {
        title: 'Enterprise Single Sign-On',
        desc: 'Seamless integration with Microsoft Entra ID, Okta, and OAuth providers.',
        icon: IconShieldLock,
      },
    ],
    illustration: 'automation',
    kpis: [
      { label: 'Search Time Cut', value: '65%' },
      { label: 'Employee Adoption', value: '88%' },
      { label: 'Ticket Deflection', value: '45%' },
      { label: 'SSO Compliance', value: 'Full' },
    ],
  },
  {
    id: '04',
    title: 'AI Copilot Development with LangChain',
    shortDesc:
      'Create specialized AI copilots working alongside users to support coding, research, content creation, customer service, data analysis, and decision-making.',
    icon: IconSparkles,
    color: 'bg-purple-100 text-purple-600',
    image: '/images/solutions/lang-chain-development/core-capabilities/cap-04-tools.jpg?v=lc-cap-2',
    description:
      'We build embedded AI copilots designed as interactive partners within existing software environments, augmenting user productivity with proactive suggestions, real-time code/text generation, and deep insights.',
    highlights: [
      {
        title: 'Proactive Workflow Assistance',
        desc: 'Context-aware suggestions based on active user actions and screen states.',
        icon: IconSparkles,
      },
      {
        title: 'Multi-Modal Understanding',
        desc: 'Processing tabular data, codebases, natural language, and visual inputs.',
        icon: IconActivity,
      },
      {
        title: 'Custom In-App Embedding',
        desc: 'Seamless iframe, web component, or native React/Next.js client integration.',
        icon: IconApi,
      },
    ],
    illustration: 'observability',
    kpis: [
      { label: 'Productivity Lift', value: '3.2x' },
      { label: 'Workflow Velocity', value: '+40%' },
      { label: 'Context Retention', value: '100%' },
      { label: 'User Satisfaction', value: '94%' },
    ],
  },
  {
    id: '05',
    title: 'Intelligent Document Processing',
    shortDesc:
      'Build LangChain-powered document intelligence applications that ingest, classify, summarize, extract, and retrieve info from contracts, reports, manuals, and policies.',
    icon: IconFileText,
    color: 'bg-amber-100 text-amber-600',
    image: '/images/solutions/lang-chain-development/core-capabilities/cap-02-rag.jpg?v=lc-cap-2',
    description:
      'Transform complex, unstructured PDF, Word, and scanned documents into structured business intelligence with LangChain document loaders, schema extraction, OCR pipelines, and semantic parsers.',
    highlights: [
      {
        title: 'Structured Schema Extraction',
        desc: 'Zero-shot and few-shot extraction to validated JSON/Pydantic models.',
        icon: IconFileText,
      },
      {
        title: 'Automated Redaction & Compliance',
        desc: 'PII, PHI, and financial entity masking before cloud model ingestion.',
        icon: IconShieldLock,
      },
      {
        title: 'Multi-Page Contract Summarization',
        desc: 'Map-reduce and refine summarization chains over massive document sets.',
        icon: IconTrendingUp,
      },
    ],
    illustration: 'architecture',
    kpis: [
      { label: 'Extraction Precision', value: '99.2%' },
      { label: 'Processing Speed', value: '<3s/doc' },
      { label: 'PII Redaction', value: '100%' },
      { label: 'Manual Effort Cut', value: '80%' },
    ],
  },
  {
    id: '06',
    title: 'Conversational AI Development',
    shortDesc:
      'Create context-aware conversational AI applications using LangChain, LLMs, memory, retrieval, and business logic to deliver intelligent interactions across digital channels.',
    icon: IconMessages,
    color: 'bg-teal-100 text-teal-600',
    image: '/images/solutions/lang-chain-development/core-capabilities/cap-05-observability.jpg?v=lc-cap-2',
    description:
      'Deploy multichannel conversational AI systems that maintain persistent multi-turn memory, follow structured conversation dialog graphs, adhere to corporate guardrails, and resolve customer queries.',
    highlights: [
      {
        title: 'Persistent Multi-Turn Memory',
        desc: 'Summary memory, sliding window buffers, and entity memory stores.',
        icon: IconDatabase,
      },
      {
        title: 'Omnichannel Connectors',
        desc: 'Deploy to Web chat, Microsoft Teams, Slack, WhatsApp, and custom apps.',
        icon: IconApi,
      },
      {
        title: 'Tone & Guardrail Enforcement',
        desc: 'Output moderation and corporate compliance verification on every reply.',
        icon: IconShieldLock,
      },
    ],
    illustration: 'automation',
    kpis: [
      { label: 'CSAT Improvement', value: '+35%' },
      { label: 'First-Contact Res.', value: '78%' },
      { label: 'Channel Coverage', value: 'Multi' },
      { label: 'Response Latency', value: '<500ms' },
    ],
  },
  {
    id: '07',
    title: 'AI-Powered Workflow Automation',
    shortDesc:
      'Connect LangChain with APIs, databases, enterprise applications, and AI tools to automate multi-step workflows, coordinate AI tasks, and reduce repetitive operations.',
    icon: IconGitBranch,
    color: 'bg-indigo-100 text-indigo-600',
    image: '/images/solutions/lang-chain-development/core-capabilities/cap-01-apps-apis.jpg?v=lc-cap-2',
    description:
      'Bridge legacy enterprise backends and cutting-edge generative AI models. We design asynchronous LangChain execution pipelines that trigger actions across cloud services, databases, and enterprise platforms.',
    highlights: [
      {
        title: 'Asynchronous Event Orchestration',
        desc: 'Event-driven triggers, message queuing, and reliable batch execution.',
        icon: IconServer,
      },
      {
        title: 'State Checkpointing & Resumption',
        desc: 'Durable LangGraph state recovery in the event of external service timeouts.',
        icon: IconGitBranch,
      },
      {
        title: 'Enterprise API Adapters',
        desc: 'Prebuilt connectors for SAP, Salesforce, Microsoft Graph, and ServiceNow.',
        icon: IconPlugConnected,
      },
    ],
    illustration: 'security',
    kpis: [
      { label: 'Cycle Time Reduction', value: '70%' },
      { label: 'Error Rate', value: '<0.1%' },
      { label: 'Throughput', value: '10k+ req/day' },
      { label: 'SLA Guarantee', value: '99.9%' },
    ],
  },
  {
    id: '08',
    title: 'Enterprise Knowledge Applications',
    shortDesc:
      'Transform scattered business information into intelligent knowledge applications using LangChain, RAG, LLMs, vector databases, and enterprise search for accurate answers.',
    icon: IconDatabase,
    color: 'bg-rose-100 text-rose-600',
    image: '/images/solutions/lang-chain-development/core-capabilities/cap-06-guardrails.jpg?v=lc-cap-2',
    description:
      'Unify enterprise knowledge silos into interactive, semantically searchable intelligence hubs. We build knowledge graph integrations, automated corpus indexing, and domain-tuned retrieval systems.',
    highlights: [
      {
        title: 'GraphRAG & Knowledge Graphs',
        desc: 'Combining vector similarity with graph relationships for deep structured insights.',
        icon: IconDatabase,
      },
      {
        title: 'Automated Corpus Indexing',
        desc: 'Continuous synchronization with cloud file stores, databases, and CMSs.',
        icon: IconTrendingUp,
      },
      {
        title: 'LangSmith Observability & Tracing',
        desc: 'Full visibility into retriever quality, latency metrics, and user feedback loops.',
        icon: IconActivity,
      },
    ],
    illustration: 'observability',
    kpis: [
      { label: 'Knowledge Coverage', value: '100%' },
      { label: 'Discovery Speed', value: '4x' },
      { label: 'Hallucination Rate', value: '<1%' },
      { label: 'Telemetry Spans', value: 'End-to-End' },
    ],
  },
];
