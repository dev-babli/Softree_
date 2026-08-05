import {
  Search,
  Brain,
  ScanSearch,
  Workflow,
  ShieldCheck,
  Rocket,
  BarChart3,
  Building2,
  RefreshCcw
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ProcessItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const processData: ProcessItem[] = [
  {
    id: "01",
    title: "Document Assessment & Discovery",
    description: "Analyze existing document workflows, identify automation opportunities, and define business goals for Intelligent Document Processing implementation.",
    icon: Search
  },
  {
    id: "02",
    title: "AI Model Design & Training",
    description: "Configure Azure AI Document Intelligence, OCR, and custom AI models to accurately classify, extract, and understand business documents.",
    icon: Brain
  },
  {
    id: "03",
    title: "Document Extraction & Validation",
    description: "Extract key information from invoices, contracts, forms, emails, and PDFs while validating business rules for high data accuracy.",
    icon: ScanSearch
  },
  {
    id: "04",
    title: "Workflow Automation & Integration",
    description: "Integrate Document AI with Microsoft 365, SharePoint, Dynamics 365, ERP, CRM, and Power Automate to automate end-to-end business processes.",
    icon: Workflow
  },
  {
    id: "05",
    title: "Testing, Security & Compliance",
    description: "Validate AI models, ensure enterprise-grade security, role-based access, audit trails, and compliance with organizational policies.",
    icon: ShieldCheck
  },
  {
    id: "06",
    title: "Deployment & Optimization",
    description: "Deploy Document AI into production, monitor performance, improve extraction accuracy, and continuously optimize workflows using AI insights.",
    icon: Rocket
  },
  {
    id: "07",
    title: "Analytics & Business Insights",
    description: "Transform extracted document data into dashboards, reports, and actionable insights using Microsoft Fabric and Power BI.",
    icon: BarChart3
  },

];
