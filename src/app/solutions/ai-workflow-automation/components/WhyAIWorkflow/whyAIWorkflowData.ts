import Target from "lucide-react/dist/esm/icons/target";
import LayoutGrid from "lucide-react/dist/esm/icons/layout-grid";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Activity from "lucide-react/dist/esm/icons/activity";
import Code from "lucide-react/dist/esm/icons/code";

import wsimg1 from "../../../../../../public/images/ai-consulting-service-image/why-softree/wsimg-1.png";
import wsimg2 from "../../../../../../public/images/ai-consulting-service-image/why-softree/wsimg-2.png";
import wsimg3 from "../../../../../../public/images/ai-consulting-service-image/why-softree/wsimg-3.png";
import wsimg4 from "../../../../../../public/images/ai-consulting-service-image/why-softree/wsimg-4.png";
import wsimg5 from "../../../../../../public/images/ai-consulting-service-image/why-softree/wsimg-5.png";
import wsimg6 from "../../../../../../public/images/ai-consulting-service-image/why-softree/wsimg-5.png";

export interface Feature {
  title: string;
  description: string;
  icon: any;
}

export interface WhyAIWorkflowItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  image: any;
  features: Feature[];
  icon: any;
}

export const WhyAIWorkflowData: WhyAIWorkflowItem[] = [
  {
    id: "enterprise-first",
    number: "01",
    title: "Eliminate Manual Processes",
    shortTitle: "Eliminate Manual Processes",
    description: "Replace repetitive manual tasks with AI-powered workflow automation that streamlines business processes, improves productivity, and reduces operational overhead.",
    image: wsimg1,
    icon: Target,
    features: [
      {
        title: "Task Automation",
        description: "Automate repetitive business tasks with intelligent AI workflows.",
        icon: Target,
      },
      {
        title: "Workflow Standardization",
        description: "Create consistent and error-free processes across teams.",
        icon: ShieldCheck,
      },
      {
        title: "Reduced Manual Effort",
        description: "Free employees to focus on strategic and high-value work.",
        icon: LayoutGrid,
      }
    ]
  },
  {
    id: "operational-efficiency",
    number: "02",
    title: "Increase Operational Efficiency",
    shortTitle: "Increase Operational Efficiency",
    description: "Optimize business operations with intelligent workflow automation that accelerates execution, improves collaboration, and maximizes organizational productivity.",
    image: wsimg2,
    icon: LayoutGrid,
    features: [
      {
        title: "Faster Workflows",
        description: "Automate end-to-end business processes with minimal delays.",
        icon: LayoutGrid,
      },
      {
        title: "Seamless Collaboration",
        description: "Connect teams, systems, and data within a unified workflow.",
        icon: Code,
      },
      {
        title: "Process Optimization",
        description: "Continuously improve workflow performance using AI insights.",
        icon: Activity,
      }
    ]
  },
  {
    id: "business-decisions",
    number: "03",
    title: "Accelerate Business Decisions",
    shortTitle: "Accelerate Business Decisions",
    description: "Enable faster, data-driven decision-making by combining AI intelligence, business rules, and real-time workflow automation.",
    image: wsimg3,
    icon: ShieldCheck,
    features: [
      {
        title: "Real-Time Insights",
        description: "Access actionable business intelligence instantly.",
        icon: ShieldCheck,
      },
      {
        title: "AI Recommendations",
        description: "Receive intelligent suggestions to improve decision-making.",
        icon: Activity,
      },
      {
        title: "Automated Approvals",
        description: "Accelerate approvals through intelligent workflow routing.",
        icon: Target,
      }
    ]
  },
  {
    id: "reduce-errors",
    number: "04",
    title: "Reduce Human Errors",
    shortTitle: "Reduce Human Errors",
    description: "Improve process accuracy by automating repetitive tasks, enforcing business rules, and minimizing manual intervention across workflows.",
    image: wsimg4,
    icon: Activity,
    features: [
      {
        title: "Consistent Execution",
        description: "Standardized workflows ensure reliable process outcomes.",
        icon: Target,
      },
      {
        title: "Error Prevention",
        description: "AI validation minimizes mistakes before they impact operations.",
        icon: Activity,
      },
      {
        title: "Automated Compliance",
        description: "Enforce policies and business rules automatically.",
        icon: LayoutGrid,
      }
    ]
  },
  {
    id: "customer-experience",
    number: "05",
    title: "Improve Customer Experience",
    shortTitle: "Improve Customer Experience",
    description: "Deliver faster responses, personalized experiences, and seamless customer interactions through AI-powered workflow automation.",
    image: wsimg5,
    icon: Code,
    features: [
      {
        title: "Faster Response Times",
        description: "Automate customer requests and service workflows instantly.",
        icon: Code,
      },
      {
        title: "Personalized Experiences",
        description: "Deliver tailored interactions using AI-powered insights.",
        icon: Activity,
      },
      {
        title: "Connected Customer Journey",
        description: "Integrate CRM, support, and communication systems seamlessly.",
        icon: LayoutGrid,
      }
    ]
  },
  {
    id: "scale-business-operations",
    number: "06",
    title: "Scale Business Operations",
    shortTitle: "Scale Business Operations",
    description: "Scale enterprise automation across departments with intelligent AI workflows that integrate seamlessly with your existing business systems.",
    image: wsimg6,
    icon: Code,
    features: [
      {
        title: "Enterprise Scalability",
        description: "Expand AI workflows across teams, processes, and locations.",
        icon: Code,
      },
      {
        title: "System Integration",
        description: "Connect ERP, CRM, Microsoft 365, and third-party applications.",
        icon: Activity,
      },
      {
        title: "Continuous Automation",
        description: "Monitor, optimize, and scale workflows as your business grows.",
        icon: LayoutGrid,
      }
    ]
  }
];
