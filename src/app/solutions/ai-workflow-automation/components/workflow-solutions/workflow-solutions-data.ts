import FileText from "lucide-react/dist/esm/icons/file-text";
import Receipt from "lucide-react/dist/esm/icons/receipt";
import Users from "lucide-react/dist/esm/icons/users";
import Headphones from "lucide-react/dist/esm/icons/headphones";
import Briefcase from "lucide-react/dist/esm/icons/briefcase";
import Truck from "lucide-react/dist/esm/icons/truck";

export interface WorkflowSolutionsStep {
  id: string;
  title: string;
  description: string;
  status: "Completed" | "In Progress" | "Upcoming";
  icon: React.ElementType;
  image: string;
}

export const workflowSolutionsData: WorkflowSolutionsStep[] = [
  {
    id: "step-1",
    title: "Document Processing Automation",
    description: "Automatically classify, extract, validate, route, and process invoices, contracts, forms, emails, and enterprise documents using AI-powered document intelligence.",
    status: "Completed",
    icon: FileText,
    image: "/images/ai-consulting-service-image/how-ai-helps/how-1.png",
  },

  {
    id: "step-2",
    title: "HR Workflow Automation",
    description: "Streamline employee onboarding, leave approvals, recruitment, document verification, payroll support, and HR service requests.",
    status: "Completed",
    icon: Users,
    image: "/images/ai-consulting-service-image/how-ai-helps/how-2.png",
  },
  {
    id: "step-3",
    title: "Customer Service Automation",
    description: "Automate customer inquiries, ticket routing, AI chatbots, case management, SLA tracking, and omnichannel support workflows.",
    status: "Completed",
    icon: Headphones,
    image: "/images/ai-consulting-service-image/how-ai-helps/how-3.png",
  },
  {
    id: "step-4",
    title: "Sales & CRM Automation",
    description: "Automate lead capture, opportunity management, follow-ups, approvals, CRM updates, customer engagement, and sales reporting.",
    status: "Completed",
    icon: Briefcase,
    image: "/images/ai-consulting-service-image/how-ai-helps/how-4.png",
  },
  {
    id: "step-5",
    title: "Supply Chain Automation",
    description: "Optimize procurement, inventory management, warehouse operations, order processing, shipment tracking, and supplier collaboration using AI.",
    status: "In Progress",
    icon: Truck,
    image: "/images/ai-consulting-service-image/how-ai-helps/how-5.png",
  },
];
