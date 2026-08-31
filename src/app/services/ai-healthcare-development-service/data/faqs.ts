export interface FAQItem {
  id: number;
  serial: string;
  question: string;
  answer: string;
}

export const healthcareFaqs: FAQItem[] = [
  {
    id: 1,
    serial: "QUESTION 01",
    question: "How does Softree ensure HIPAA and GDPR compliance for Healthcare AI applications?",
    answer:
      "We build security and compliance directly into the architecture. All patient health information (PHI) is encrypted at rest (AES-256) and in transit (TLS 1.3), using zero-retention AI models, strict role-based access control (RBAC), BAA-signed cloud services (AWS HealthOmics / Azure Health Data Services), and comprehensive audit logging.",
  },
  {
    id: 2,
    serial: "QUESTION 02",
    question: "How do your Patient & Staff Concierge Chatbots reduce administrative burdens?",
    answer:
      "Our AI-driven Patient & Staff Concierge Chatbots handle routine patient appointment scheduling, answer complex hospital and clinic policy inquiries 24/7, automate pre-visit intake, and provide staff assistance—reducing manual administrative calls and charting overhead for medical staff by up to 40%.",
  },
  {
    id: 3,
    serial: "QUESTION 03",
    question: "How does Softree integrate 125+ lab tests and clinical AI models?",
    answer:
      "As demonstrated in platforms like Softree Health AI, we build data pipelines that ingest and harmonize data across 125+ clinical lab tests and diagnostic categories. Our machine learning algorithms analyze historical biomarkers to move beyond merely treating active symptoms toward uncovering root health causes.",
  },
  {
    id: 4,
    serial: "QUESTION 04",
    question: "What are production-ready Healthcare LLMs & RAG solutions?",
    answer:
      "Production-ready healthcare Retrieval-Augmented Generation (RAG) systems connect large language models to your secure internal medical knowledge bases, clinical guidelines, and EHR data. This allows clinicians and administrators to ask complex questions in plain natural language and receive grounded, hallucination-free, citation-backed answers.",
  },
  {
    id: 5,
    serial: "QUESTION 05",
    question: "Can your AI solutions integrate with our existing EHR/EMR systems (Epic, Cerner, AthenaHealth)?",
    answer:
      "Yes. We specialize in HL7 FHIR (Fast Healthcare Interoperability Resources) and SMART on FHIR integrations. Our AI pipelines seamlessly read and write structured clinical data, notes, and lab results without disrupting existing clinical workflows.",
  },
  {
    id: 6,
    serial: "QUESTION 06",
    question: "Do you offer dedicated offshore healthcare engineering teams?",
    answer:
      "Absolutely. Softree provides dedicated, HIPAA-trained offshore healthcare developers, data scientists, and DevOps engineers who work as a seamless extension of your in-house product and medical leadership team at significant cost savings.",
  },
];
