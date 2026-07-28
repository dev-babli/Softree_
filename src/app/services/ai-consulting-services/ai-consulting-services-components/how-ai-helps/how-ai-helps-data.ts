import { Activity, Brain, User, Shield, TrendingUp } from "lucide-react";

export interface HowAIHelpsStep {
  id: string;
  title: string;
  description: string;
  status: "Completed" | "In Progress" | "Upcoming";
  icon: React.ElementType;
  image: string;
}

export const howAIHelpsData: HowAIHelpsStep[] = [
  {
    id: "step-1",
    title: "Intelligent Automation",
    description: "Automate repetitive tasks and complex workflows",
    status: "Completed",
    icon: TrendingUp,
    image: "/images/ai-consulting-service-image/how-ai-helps/how-1.png",
  },
  {
    id: "step-2",
    title: "Smarter Insights",
    description: "Turn data into actionable insights",
    status: "Completed",
    icon: Activity,
    image: "/images/ai-consulting-service-image/how-ai-helps/how-2.png",
  },
  {
    id: "step-3",
    title: "Enhanced Decision Making",
    description: "AI-powered recommendations and predictions",
    status: "In Progress",
    icon: Brain,
    image: "/images/ai-consulting-service-image/how-ai-helps/how-3.png",
  },
  {
    id: "step-4",
    title: "Better Customer Experience",
    description: "Personalized interactions across all touchpoints",
    status: "Upcoming",
    icon: User,
    image: "/images/ai-consulting-service-image/how-ai-helps/how-4.png",
  },
  {
    id: "step-5",
    title: "Stronger Security & Compliance",
    description: "AI-driven threat detection and risk management",
    status: "Upcoming",
    icon: Shield,
    image: "/images/ai-consulting-service-image/how-ai-helps/how-5.png",
  },
];
