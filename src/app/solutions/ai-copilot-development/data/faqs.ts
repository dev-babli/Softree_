export interface FAQItem {
  id: number;
  serial: string;
  question: string;
  answer: string;
}

export const copilotFaqs: FAQItem[] = [
  {
    id: 1,
    serial: "question 01",
    question: "What are AI copilot development services?",
    answer:
      "AI copilot development services involve designing and building intelligent assistants that help users find information, answer questions, and complete tasks through natural language. Softree Technology helps businesses develop custom AI copilots, connect business knowledge, integrate applications, and support workflow automation using suitable AI technologies.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "Can Softree Technology build a custom AI copilot for my business?",
    answer:
      "Yes. Softree Technology supports custom AI copilot development based on your business goals, user needs, workflows, and existing applications. Our services can include solution planning, AI copilot development, knowledge integration, application connectivity, deployment, and ongoing improvements tailored to your requirements.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "What technologies does Softree use for AI copilot development?",
    answer:
      "Depending on the project, Softree can work with Microsoft Copilot Studio, Azure AI, Azure OpenAI Service, Power Platform, AI agents, and retrieval-augmented generation (RAG). We help select suitable technologies based on your use case, data sources, application requirements, and security needs.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can AI copilots integrate with our existing business applications?",
    answer:
      "Yes. AI copilots can be designed to integrate with supported applications and data sources, including Microsoft 365, SharePoint, Microsoft Teams, Dynamics 365, Dataverse, CRM, ERP, and third-party systems. Integration options depend on available APIs, connectors, permissions, and your existing technology environment.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "What business processes can custom AI copilots support?",
    answer:
      "Custom AI copilots can support employee assistance, knowledge search, document processing, customer service, information retrieval, and suitable workflow automation. Softree Technology helps identify relevant use cases and design copilot solutions around your processes, available data, and business objectives.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "How does Softree address AI copilot security and data privacy?",
    answer:
      "AI copilot solutions should account for identity management, user permissions, data access, secure integrations, and appropriate governance. Softree can incorporate these requirements into solution architecture and implementation planning, based on your data sensitivity, policies, and chosen technologies.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "Does Softree provide offshore AI copilot development teams?",
    answer:
      "Softree Technology provides offshore AI engineering support to help businesses and technology partners extend their development capacity. Depending on your requirements, the engagement can support custom AI copilot development, Microsoft AI integration, workflow automation, application connectivity, and ongoing engineering improvements.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "How long does it take to develop a custom AI copilot?",
    answer:
      "The timeline depends on the copilot's functionality, data readiness, number of integrations, security requirements, and testing scope. Softree Technology can assess your requirements and technical environment to define a practical development roadmap and delivery estimate.",
  },
];
