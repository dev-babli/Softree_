export type ContactMeetingType = {
  icon: string;
  label: string;
  duration: string;
  url: string;
  description?: string;
};

export const CONTACT_MEETING_TYPES: readonly ContactMeetingType[] = [
  {
    icon: "🔍",
    label: "Discovery",
    duration: "30 min",
    url: "https://calendly.com/shradhabhagat/new-meeting",
    description: "Align on goals, timeline, and whether we are the right fit.",
  },
  {
    icon: "⚙️",
    label: "Technical",
    duration: "60 min",
    url: "https://calendly.com/shradhabhagat/new-meeting",
    description: "Deep-dive on architecture, integrations, and delivery approach.",
  },
  {
    icon: "🎯",
    label: "Demo",
    duration: "45 min",
    url: "https://calendly.com/shradhabhagat/new-meeting",
    description: "See relevant work samples and solution patterns for your stack.",
  },
  {
    icon: "🤝",
    label: "Partnership",
    duration: "30 min",
    url: "https://calendly.com/shradhabhagat/new-meeting",
    description: "Explore reseller, referral, or long-term delivery partnerships.",
  },
] as const;

export const CONTACT_TRUST_ITEMS = [
  { label: "Reply within 1 business day" },
  { label: "NDA available on request" },
  { label: "Free discovery call" },
  { label: "Senior engineers on every call" },
] as const;

export const CONTACT_CHANNELS = [
  {
    city: "Global sales",
    email: "sales@softreetechnology.com",
    phone: "+91 90404 92078",
    contact: "Shradha Bhagat",
    hours: "Mon–Fri · 9:00–18:00 IST",
  },
  {
    city: "Bengaluru",
    email: "shradhab@softreetechnology.com",
    phone: "+91 90404 92078",
    contact: "Shradha Bhagat",
    hours: "IST business hours",
  },
  {
    city: "San Francisco",
    email: "sales@softreetechnology.com",
    phone: "",
    contact: "Sophie Lynn",
    hours: "PST business hours",
  },
] as const;

export const CONTACT_FAQS = [
  {
    id: 1,
    serial: "question 01",
    question: "How Can I Start a Project with Softree Technology?",
    answer:
      "Getting started is simple. Share your business requirements, project goals, and expected timeline through our contact form. Our team will review your inquiry and discuss the project scope, technical requirements, and next steps.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "What Software Development Services Does Softree Offer?",
    answer:
      "Softree Technology provides AI development, custom software engineering, Microsoft technology services, cloud development, data engineering, business intelligence, and software testing. We help businesses build, modernize, integrate, and maintain digital products.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "Does Softree Provide AI Development and Generative AI Services?",
    answer:
      "Yes. Softree supports AI development initiatives, including generative AI applications, AI agents, enterprise copilots, retrieval-augmented generation (RAG), and AI workflow automation, based on your business requirements.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can Softree Provide Dedicated Developers for My Project?",
    answer:
      "Softree offers flexible engagement models, including dedicated development teams, staff augmentation, fixed-scope project delivery, and technical consulting. Our team can help you identify the right approach based on your project objectives and technical requirements.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How Long Does a Software Development Project Take?",
    answer:
      "Project timelines depend on the scope, technical complexity, integrations, and testing requirements. After reviewing your objectives, our team can outline the development phases, milestones, and estimated delivery schedule.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "Can Softree Help Modernize Existing Applications and Systems?",
    answer:
      "Yes. Softree can help businesses modernize existing applications, improve system performance, integrate new technologies, and streamline legacy workflows. We assess your current environment and recommend an approach aligned with your technical and business goals.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "Does Softree Work with Businesses Across Different Industries?",
    answer:
      "Softree works on technology initiatives across business domains, including healthcare, logistics, and other industry-specific use cases. Our development approach is shaped by each project's workflows, data requirements, and operational needs.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "Does Softree Provide Ongoing Software Support and Maintenance?",
    answer:
      "Softree can assist with application maintenance, troubleshooting, performance optimization, software enhancements, and ongoing technical support. Support arrangements can be tailored to your application's requirements and operational priorities.",
  },
  {
    id: 9,
    serial: "question 09",
    question: "What Technologies Does Softree Use for Software Development?",
    answer:
      "Softree works with modern technologies across AI, cloud computing, data engineering, Microsoft platforms, and custom application development. The technology stack is selected based on project requirements, system architecture, scalability, and integration needs.",
  },
  {
    id: 10,
    serial: "question 10",
    question: "Can Softree Integrate AI into Existing Business Workflows?",
    answer:
      "Yes. Softree can help businesses explore AI integration for existing applications and workflows, including AI-powered automation, intelligent assistants, enterprise knowledge retrieval, and data-driven processes. The approach depends on your current systems, data sources, and business objectives.",
  },

] as const;

export const CONTACT_OFFICE_CLOCKS = [
  { city: "Bengaluru", tz: "Asia/Kolkata", label: "IST" },
  { city: "Cuttack", tz: "Asia/Kolkata", label: "IST" },
  { city: "San Francisco", tz: "America/Los_Angeles", label: "PST" },
] as const;
