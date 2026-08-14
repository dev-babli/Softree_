import { FaCode, FaDatabase, FaCloud, FaShieldAlt, FaBrain, FaCogs, FaUsers, FaLock, FaGlobe, FaLink, FaChartLine, FaMicrosoft, FaAws } from "react-icons/fa";
import { SiDocker, SiKubernetes, SiLangchain, SiGooglecloud, SiRedis, SiPostgresql } from "react-icons/si";

export const technologyStackData = {
  badge: "TECHNOLOGY STACK",
  heading: {
    prefix: "Enterprise Technologies Powering ",
    highlight: "AI Agent Development",
    suffix: "",
  },
  subheading: "We leverage enterprise-grade AI models, orchestration frameworks, vector databases, cloud platforms, and integration technologies to build scalable, secure, and production-ready AI agents.",
  categories: [
    {
      title: "AI Models",
      badgeClass: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      iconClass: "bg-orange-500/10 text-orange-400",
      items: [
        { name: "OpenAI GPT-4o", icon: FaBrain },
        { name: "Claude 4", icon: FaBrain },
        { name: "Gemini", icon: FaBrain },
        { name: "Llama", icon: FaCode },
        { name: "Mistral", icon: FaCode },
        { name: "Azure OpenAI", icon: FaMicrosoft },
      ],
    },
    {
      title: "AI Frameworks",
      badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      iconClass: "bg-purple-500/10 text-purple-400",
      items: [
        { name: "LangGraph", icon: SiLangchain },
        { name: "CrewAI", icon: FaCogs },
        { name: "AutoGen", icon: FaCogs },
        { name: "Semantic Kernel", icon: FaCode },
        { name: "LangChain", icon: SiLangchain },
        { name: "Microsoft Copilot Studio", icon: FaMicrosoft },
      ],
    },
    {
      title: "Vector Databases",
      badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      iconClass: "bg-blue-500/10 text-blue-400",
      items: [
        { name: "Pinecone", icon: FaDatabase },
        { name: "Azure AI Search", icon: FaMicrosoft },
        { name: "Redis", icon: SiRedis },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "ChromaDB", icon: FaDatabase },
        { name: "Qdrant", icon: FaDatabase },
      ],
    },
    {
      title: "Cloud Platforms",
      badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      iconClass: "bg-cyan-500/10 text-cyan-400",
      items: [
        { name: "Microsoft Azure", icon: FaMicrosoft },
        { name: "AWS", icon: FaAws },
        { name: "Google Cloud", icon: SiGooglecloud },
        { name: "Azure Kubernetes Service", icon: SiKubernetes },
        { name: "Docker", icon: SiDocker },
        { name: "Kubernetes", icon: SiKubernetes },
      ],
    },
    {
      title: "Integrations",
      badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      iconClass: "bg-emerald-500/10 text-emerald-400",
      items: [
        { name: "REST APIs", icon: FaCode },
        { name: "Microsoft Graph", icon: FaMicrosoft },
        { name: "SharePoint", icon: FaGlobe },
        { name: "Dynamics 365", icon: FaCloud },
        { name: "Microsoft Teams", icon: FaUsers },
        { name: "Model Context Protocol (MCP)", icon: FaLink },
      ],
    },
    {
      title: "Monitoring & Security",
      badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      iconClass: "bg-rose-500/10 text-rose-400",
      items: [
        { name: "LangSmith", icon: FaShieldAlt },
        { name: "Azure Monitor", icon: FaChartLine },
        { name: "OpenTelemetry", icon: FaShieldAlt },
        { name: "Microsoft Entra ID", icon: FaLock },
        { name: "Key Vault", icon: FaShieldAlt },
        { name: "Application Insights", icon: FaShieldAlt },
      ],
    },
  ],
};
