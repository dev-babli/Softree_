export const faqs = [
  {
    id: 1,
    serial: "question 01",
    question: "What is Azure OpenAI development, and how does Softree deliver it?",
    answer:
      "Azure OpenAI development means building production apps on GPT and related models hosted in your Azure subscription—APIs, copilots, RAG assistants, and automations. Softree covers strategy, architecture, engineering, security, and ongoing optimization so solutions ship governed and measurable.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How is Azure OpenAI different from using OpenAI directly?",
    answer:
      "Azure OpenAI runs models inside your Azure tenancy with Microsoft enterprise controls—Entra ID, private endpoints, regional residency options, Azure Monitor, and Content Safety. Softree helps you design that landing zone and connect it to Microsoft 365, Dynamics, and your data estate.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How do you prevent hallucinations in Azure OpenAI apps?",
    answer:
      "We ground responses with Azure AI Search and permission-aware RAG, constrain tools, add evaluation suites, and use human approval for high-risk actions. Content filters and prompt policies further reduce unsafe or off-policy outputs.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "What security controls do you implement?",
    answer:
      "Typical baselines include Entra ID / SSO, RBAC, Key Vault, private networking, network isolation where required, audit logging, data loss prevention patterns, and scoped API access. We align controls to your compliance requirements before go-live.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "Can Softree integrate Azure OpenAI with Microsoft 365 and Dynamics?",
    answer:
      "Yes. We build copilots and assistants that use Graph, SharePoint, Teams, Power Platform, Dataverse, and Dynamics 365—while keeping retrieval and actions permission-aware.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "How do you manage token cost and performance?",
    answer:
      "We instrument token usage, cache where safe, choose the right model per task, batch and stream thoughtfully, and set budgets with alerts. Continuous evaluation helps cut retries and low-value prompts.",
  },
];
