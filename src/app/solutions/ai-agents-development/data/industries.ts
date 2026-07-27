import {
  Hospital,
  Landmark,
  ShoppingBag,
  Factory,
  Scale,
  Truck,
} from 'lucide-react';

export const industriesData = {
  badge: "INDUSTRIES WE SERVE",
  heading: {
    prefix: "AI Agent Solutions Built for ",
    highlight: "Every Industry",
    suffix: "",
  },
  subheading: "We develop enterprise AI agents tailored to industry-specific workflows, compliance requirements, and operational challenges, enabling organizations to automate intelligently and scale with confidence.",
  items: [
    {
      id: "healthcare",
      industry: "Healthcare",
      description: "Build AI agents for patient support, clinical knowledge retrieval, appointment automation, and healthcare workflow optimization while maintaining compliance.",
      icon: Hospital,
      alignment: "left"
    },
    {
      id: "financial-services",
      industry: "Financial Services",
      description: "Develop secure AI agents for customer support, document processing, fraud detection assistance, and financial operations automation.",
      icon: Landmark,
      alignment: "right"
    },
    {
      id: "retail",
      industry: "Retail & eCommerce",
      description: "Deploy AI agents that improve customer engagement, automate order management, provide personalized recommendations, and streamline inventory operations.",
      icon: ShoppingBag,
      alignment: "left"
    },
    {
      id: "manufacturing",
      industry: "Manufacturing",
      description: "Implement AI agents for production monitoring, maintenance assistance, SOP guidance, quality control, and operational efficiency.",
      icon: Factory,
      alignment: "right"
    },
    {
      id: "legal",
      industry: "Legal & Professional Services",
      description: "Create AI agents for legal research, document summarization, contract analysis, compliance support, and knowledge management.",
      icon: Scale,
      alignment: "left"
    },
    {
      id: "logistics",
      industry: "Logistics & Supply Chain",
      description: "Develop AI agents that automate shipment tracking, warehouse operations, procurement workflows, vendor communication, and logistics optimization.",
      icon: Truck,
      alignment: "right"
    }
  ]
};
