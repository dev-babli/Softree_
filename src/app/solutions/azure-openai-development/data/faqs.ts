export const faqs = [
  {
    id: 1,
    serial: "question 01",
    question: "What is Azure OpenAI development, and how does Softree deliver enterprise solutions?",
    answer:
      "Azure OpenAI development entails engineering production-ready applications powered by OpenAI models (such as GPT-4o, GPT-4o-mini, and text-embedding-3) hosted inside your dedicated Microsoft Azure subscription. Softree provides end-to-end consulting, enterprise landing zone provisioning, architecture design, API middleware integration, custom copilot development, and ongoing model evaluation so systems launch secure, performant, and measurable.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How is Azure OpenAI different and more secure than using public OpenAI APIs directly?",
    answer:
      "Azure OpenAI guarantees that customer enterprise data is never used to train or retrain OpenAI foundation models. Your data remains fully contained within your designated Microsoft Azure geographical boundary. Furthermore, Azure OpenAI integrates natively with Microsoft Entra ID (SSO/MFA), Azure Virtual Network (VNet) private endpoints, Customer-Managed Keys (CMK), Azure AI Content Safety filtering, and compliance certifications including HIPAA, SOC 2 Type II, and ISO 27001.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How do you prevent hallucinations and ensure grounded enterprise accuracy?",
    answer:
      "We implement advanced Retrieval-Augmented Generation (RAG) leveraging Azure AI Search with hybrid keyword-vector retrieval, semantic re-ranking, and strict citation grounding. Every AI response is enforced to link directly to verifiable internal source snippets. Additionally, we integrate deterministic schema validators, prompt guardrails, and automated evaluation suites that benchmark answer relevance, faithfulness, and latency before production rollout.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "What security, network isolation, and access controls are implemented?",
    answer:
      "We establish secure landing zones adhering to the Microsoft Cloud Adoption Framework (CAF). Key controls include zero public internet exposure via Azure Private Link, least-privilege Role-Based Access Control (RBAC) via Entra ID, Azure Key Vault for API secrets, data-at-rest encryption with customer keys, and continuous audit logging via Azure Monitor and Log Analytics.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Can Softree integrate Azure OpenAI with Microsoft 365, Teams, and Dynamics 365?",
    answer:
      "Yes. Our engineers build custom copilots and assistants that interface seamlessly with Microsoft Graph, SharePoint libraries, Microsoft Teams bots, Power Platform (Power Automate & Power Apps), and Dynamics 365 CRM/ERP. All interactions maintain user-level permission awareness, ensuring employees only retrieve data they are authorized to access.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "How do you manage Azure OpenAI token consumption and control cloud costs?",
    answer:
      "We deploy multi-tier token governance including intelligent prompt caching, semantic caching with Redis/Cosmos DB, dynamic model tiering (routing low-complexity queries to GPT-4o-mini and complex reasoning to GPT-4o), prompt compression, and Azure Cost Management budget alerts to prevent runaway usage and maximize ROI.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "What is the typical deployment timeline for an enterprise Azure OpenAI pilot?",
    answer:
      "A typical Azure OpenAI implementation progresses through a structured 4 to 8-week cycle: Weeks 1–2 focus on use case prioritization, Azure landing zone setup, and security compliance review. Weeks 3–5 encompass RAG ingestion pipelines, vector indexing, and prototype API integration. Weeks 6–8 involve security penetration testing, prompt tuning, user acceptance testing (UAT), and phased production deployment.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "Who owns the intellectual property, code, and custom model assets after project completion?",
    answer:
      "Your organization retains 100% intellectual property ownership of all custom software, API wrappers, RAG indexing pipelines, system prompt architectures, and fine-tuned model artifacts. Softree provides complete source code delivery to your private Azure DevOps or GitHub repositories alongside architectural runbooks and knowledge-transfer workshops.",
  },
];
