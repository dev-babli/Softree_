const fs = require('fs');
const path = './src/components/sections/ServicesStackedSlides.tsx';
let content = fs.readFileSync(path, 'utf8');

const newContent = `const SERVICE_SLIDES: ServiceSlide[] = [
  {
    key: "power-platform",
    phase: "SERVICE 01",
    index: "01",
    title: "Power Platform",
    headline: "Business Applications Delivery Support",
    description:
      "We operate as your extended engineering team, helping partners execute Power Platform and Dynamics implementations seamlessly.",
    outcomes: ["Power Apps", "Power Automate", "Dataverse", "Dynamics 365"],
    media: "/gif_assetsforservices/Scene.gif",
    tone: "light",
  },
  {
    key: "data-analytics",
    phase: "SERVICE 02",
    index: "02",
    title: "Data & BI",
    headline: "Data & Analytics Execution",
    description:
      "Bringing reliable data engineering and up-to-date analytics expertise to build scalable data solutions and BI environments.",
    outcomes: ["Power BI", "Microsoft Fabric", "Databricks", "Snowflake"],
    media: "/gif_assetsforservices/ORBIT-5-01-LITE.gif",
    tone: "ember",
  },
  {
    key: "ai-automation",
    phase: "SERVICE 03",
    index: "03",
    title: "Intelligent AI",
    headline: "AI & Intelligent Automation",
    description:
      "Operate with confidence using our AI integration expertise to improve business processes and user experiences.",
    outcomes: ["Azure AI", "Copilot Integration", "AI Agents", "RAG Workflows"],
    media: "/gif_assetsforservices/1-1.gif",
    tone: "dark",
  },
  {
    key: "digital-workspace",
    phase: "SERVICE 04",
    index: "04",
    title: "Workspace",
    headline: "Digital Workspace & App Engineering",
    description:
      "Securely deliver and support modern workspace solutions, enhancing and extending your Microsoft 365 environments.",
    outcomes: ["SharePoint", "Microsoft 365", "Web Apps", "Mobile Apps"],
    media: "/gif_assetsforservices/Website-landing-page-with-blocs.gif",
    tone: "violet",
  },
]

export function ServicesStackedSlides`;

content = content.replace(/const SERVICE_SLIDES: ServiceSlide\[\] = \[([\s\S]*?)export function ServicesStackedSlides/, newContent);

fs.writeFileSync(path, content, 'utf8');
console.log("Fixed successfully!");
