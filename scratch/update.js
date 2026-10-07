const fs = require('fs');
const path = require('path');

const srcFile = 'src/app/quality-engineering/agentic-ai-testing-services/components/AgenticAITesting.tsx';
const destFile = 'src/app/quality-engineering/logistics-testing-services/components/AgenticLogisticsTesting.tsx';

let content = fs.readFileSync(srcFile, 'utf8');

// Replace component name
content = content.replace(/AgenticAITesting/g, 'AgenticLogisticsTesting');

// Replace the PROJECT_DATA array
const newProjectData = `export const PROJECT_DATA: ProjectData[] = [
  {
    title: "3PL & Logistics Service Providers",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    category: "01 — 3PL & LOGISTICS SERVICE PROVIDERS",
    year: "3PL & Logistics",
    focusArea: "3PL & LOGISTICS SERVICE PROVIDERS",
    description: "Validate TMS, WMS, shipment management, carrier integrations, billing workflows, and customer-facing logistics applications across complex operational environments.",
    impact: "Reliable logistics operations across multiple customers and workflows.",
    badge: "3PL & Logistics",
    deliverables: [
      { name: "TMS & WMS functional testing", detail: "End-to-end operational validation." },
      { name: "Shipment workflow validation", detail: "Ensuring orders are processed correctly." },
      { name: "Carrier API & EDI testing", detail: "Validating integration payloads." },
      { name: "Regression test automation", detail: "Continuous automated testing." },
    ],
    tools: ["TMS", "WMS", "EDI", "API"],
    engagement: "QA Team",
  },
  {
    title: "Shippers & Supply Chain Teams",
    image: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80",
    category: "02 — SHIPPERS & SUPPLY CHAIN TEAMS",
    year: "Shippers",
    focusArea: "SHIPPERS & SUPPLY CHAIN TEAMS",
    description: "Test transportation, inventory, order fulfillment, visibility, and supply chain workflows to improve data accuracy, operational reliability, and end-to-end quality.",
    impact: "Reliable supply chain workflows from order to delivery.",
    badge: "Shippers",
    deliverables: [
      { name: "Transportation workflow testing", detail: "Validate movement of goods." },
      { name: "Inventory & order validation", detail: "Ensure stock levels match orders." },
      { name: "Supply chain integration testing", detail: "Verify end-to-end data flow." },
      { name: "End-to-end regression testing", detail: "Automated regression pipelines." },
    ],
    tools: ["Transportation", "Inventory", "ERP"],
    engagement: "QA Team",
  },
  {
    title: "Carriers & Transportation Companies",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
    category: "03 — CARRIERS & TRANSPORTATION COMPANIES",
    year: "Carriers",
    focusArea: "CARRIERS & TRANSPORTATION",
    description: "Validate dispatch, routing, scheduling, tracking, carrier APIs, mobile workflows, and transportation management systems across critical delivery operations.",
    impact: "Reliable transportation systems and connected carrier workflows.",
    badge: "Carriers",
    deliverables: [
      { name: "TMS testing", detail: "Transportation management validation." },
      { name: "Dispatch & routing validation", detail: "Optimized route verification." },
      { name: "Tracking & ETA testing", detail: "Real-time visibility validation." },
      { name: "API & EDI testing", detail: "Third-party connector testing." },
    ],
    tools: ["Dispatch", "Routing", "Tracking", "EDI"],
    engagement: "QA Team",
  },
  {
    title: "Warehouse & Fulfillment Operations",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    category: "04 — WAREHOUSE & FULFILLMENT OPERATIONS",
    year: "Warehouse",
    focusArea: "WAREHOUSE & FULFILLMENT",
    description: "Test WMS, inventory, receiving, picking, packing, shipping, warehouse automation, and connected systems that support high-volume fulfillment operations.",
    impact: "Accurate and reliable warehouse operations.",
    badge: "Warehouse",
    deliverables: [
      { name: "WMS testing", detail: "Core warehouse system validation." },
      { name: "Inventory validation", detail: "Accurate stock counting logic." },
      { name: "Warehouse automation testing", detail: "Validate scanners and robotics." },
      { name: "End-to-end fulfillment testing", detail: "Order-to-shipment validation." },
    ],
    tools: ["WMS", "Automation", "Inventory"],
    engagement: "QA Team",
  },
  {
    title: "Logistics Technology & SaaS Companies",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
    category: "05 — LOGISTICS TECHNOLOGY & SAAS",
    year: "Logistics SaaS",
    focusArea: "LOGISTICS TECHNOLOGY & SAAS",
    description: "Extend your engineering capabilities with offshore logistics QA, automation, API testing, performance testing, and continuous quality engineering for logistics products.",
    impact: "Scalable logistics products with continuous quality assurance.",
    badge: "Tech & SaaS",
    deliverables: [
      { name: "Logistics software testing", detail: "Custom application testing." },
      { name: "Test automation", detail: "Reusable automated test scripts." },
      { name: "API & integration testing", detail: "Third-party API validation." },
      { name: "Performance & security testing", detail: "Load and vulnerability testing." },
    ],
    tools: ["SaaS QA", "API Automation", "Performance"],
    engagement: "QA Team",
  },
  {
    title: "Enterprise Supply Chain Teams",
    image: "https://images.unsplash.com/photo-1508614589041-8f5b5b03dfdf?auto=format&fit=crop&w=1200&q=80",
    category: "06 — ENTERPRISE SUPPLY CHAIN TEAMS",
    year: "Enterprise",
    focusArea: "ENTERPRISE SUPPLY CHAIN",
    description: "Support complex supply chain technology environments with end-to-end testing across enterprise applications, integrations, data flows, and operational workflows.",
    impact: "Reliable enterprise supply chain technology at scale.",
    badge: "Enterprise",
    deliverables: [
      { name: "Enterprise integration testing", detail: "Testing connected systems." },
      { name: "TMS & WMS testing", detail: "Validating core enterprise platforms." },
      { name: "Data & workflow validation", detail: "Ensuring accurate data pipelines." },
      { name: "Continuous regression testing", detail: "Ongoing quality assurance." },
    ],
    tools: ["Enterprise ERP", "TMS", "WMS", "CI/CD"],
    engagement: "QA Team",
  }
];`;

content = content.replace(/export const PROJECT_DATA: ProjectData\[\] = \[[\s\S]*?\n\];/g, newProjectData);

// Replace headings and text
content = content.replace(/Supporting Teams Building the{" "}\s*<span className="text-\[#FF6B2C\]">Next Generation of AI-Powered Products<\/span>/g, 'Supporting Teams Building Reliable{" "}\n          <span className="text-[#FF6B2C]">Logistics & Supply Chain Software</span>');
content = content.replace(/Softree works with startups, SaaS companies, enterprises, product teams, and technology organizations developing AI agents, LLM applications, intelligent automation, and AI-powered digital products./g, 'Softree supports 3PLs, shippers, carriers, warehouse operators, logistics technology companies, and enterprise teams that rely on TMS, WMS, transportation, warehouse, integration, and supply chain applications.');
content = content.replace(/Scale AI quality engineering and evaluation across your products./g, 'Scale logistics quality engineering and test automation across your products.');
content = content.replace(/WORK WITH OUR AI TESTING TEAM/g, 'EXPLORE LOGISTICS TESTING SERVICES →');
content = content.replace(/● AI TESTING & EVALUATION/g, '● LOGISTICS TESTING & EVALUATION');
content = content.replace(/Test Your AI/g, 'Test Your Software');


fs.writeFileSync(destFile, content);
console.log('Successfully updated AgenticLogisticsTesting.tsx');
