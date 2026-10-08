export const faqs = [
  {
    id: 1,
    serial: "QUESTION 01",
    question: "What is SQL Server to Microsoft Fabric migration?",
    answer:
      "SQL Server to Microsoft Fabric migration involves modernizing your existing SQL Server databases, analytical workloads, and data pipelines by moving them to the unified Microsoft Fabric platform. This enables seamless analytics, data engineering, and business intelligence capabilities in a scalable cloud environment.",
  },
  {
    id: 2,
    serial: "QUESTION 02",
    question: "What SQL Server workloads can Softree migrate to Microsoft Fabric?",
    answer:
      "Softree can migrate SQL Server databases, schemas, views, stored procedures, and analytical workloads. We also modernize related ETL processes, data integration pipelines, and reporting solutions to fully leverage Fabric's Lakehouse and Data Warehouse architectures.",
  },
  {
    id: 3,
    serial: "QUESTION 03",
    question: "How does Softree assess a SQL Server environment before migration?",
    answer:
      "We begin with a comprehensive discovery phase to evaluate your current SQL Server databases, workload complexities, queries, and system dependencies. This assessment helps us determine the optimal target architecture in Fabric and identify any refactoring requirements for a smooth transition.",
  },
  {
    id: 4,
    serial: "QUESTION 04",
    question: "Will our existing Power BI reports still work after migrating to Fabric?",
    answer:
      "Yes, Microsoft Fabric integrates natively with Power BI. During the migration, we update the data connections to point to the new Fabric endpoints (like DirectLake or SQL analytics endpoints) ensuring your reports and semantic models continue to work with enhanced performance.",
  },
  {
    id: 5,
    serial: "QUESTION 05",
    question: "Does the migration process cause downtime for our analytics environment?",
    answer:
      "We design the migration strategy to minimize downtime. By using phased migrations, parallel environments, and controlled validation steps, we ensure business continuity and only cut over to production once the Fabric environment is fully validated.",
  },
  {
    id: 6,
    serial: "QUESTION 06",
    question: "How does Softree validate data after migrating SQL Server to Microsoft Fabric?",
    answer:
      "Softree performs structured post-migration validation to compare migrated data, schemas, workloads, integrations, and analytical results with the existing SQL Server environment. We validate data accuracy, completeness, functionality, and reporting outputs before production cutover.",
  },
  {
    id: 7,
    serial: "QUESTION 07",
    question: "How does Softree handle security and governance during the migration?",
    answer:
      "Softree considers security and governance throughout the migration lifecycle. We assess existing users, roles, permissions, authentication, access requirements, and data governance needs, then help establish appropriate security and governance practices within the Microsoft Fabric environment.",
  },
  {
    id: 8,
    serial: "QUESTION 08",
    question: "Can Softree provide support after the SQL Server to Microsoft Fabric migration?",
    answer:
      "Yes. Softree can provide post-migration support covering Fabric workload optimization, performance tuning, data validation, issue resolution, governance, and ongoing improvements to help your modernized data platform continue meeting business and analytics requirements.",
  },
];
