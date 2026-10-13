export const faqs = [
  {
    id: 1,
    serial: "question 01",
    question: "What is Tableau to Power BI migration and what does it include?",
    answer: "Tableau to Power BI migration is the process of converting complex reporting assets—including Tableau Desktop workbooks (.twbx/.twb), published Server/Cloud dashboards, calculated fields, Level of Detail (LOD) expressions, data extracts (.hyper), and security filters—into native Microsoft Power BI reports, DAX measures, and VertiPaq semantic models. Softree provides end-to-end offshore migration services, from initial dashboard inventory auditing and data model re-architecture to DAX script conversion, visual redesign, parallel quality testing, and end-user onboarding.",
  },
  {
    id: 2,
    serial: "question 02",
    question: "How are complex Tableau calculated fields and LOD expressions converted to Power BI DAX?",
    answer: "Tableau Level of Detail (LOD) expressions (FIXED, INCLUDE, EXCLUDE) calculate values at specific granularities independently of report filters. In Power BI, our BI engineers translate FIXED LODs into DAX CALCULATE functions with ALL or ALLEXCEPT modifiers, INCLUDE LODs using SUMMARIZE or ADDCOLUMNS patterns, and EXCLUDE LODs with ALLSELECTED. Table calculations (LOOKUP, INDEX, RUNNING_TOTAL) are re-engineered using window functions (OFFSET, INDEX, WINDOW) or time-intelligence DAX measures (TOTALYTD, SAMEPERIODLASTYEAR) to ensure 100% metric fidelity and optimal VertiPaq engine execution.",
  },
  {
    id: 3,
    serial: "question 03",
    question: "How do you handle Tableau Data Extracts (.hyper) and live data source connections?",
    answer: "Tableau Data Sources (.tds/.tdsx) and .hyper extracts are modernized into star-schema Power BI semantic models using Power Query (M) for data transformations. Depending on your data volume, latency requirements, and cloud infrastructure, we configure Power BI Import mode, DirectQuery (for real-time warehouse querying in Snowflake, Databricks, or SQL Server), or Direct Lake mode when integrated with Microsoft Fabric and OneLake.",
  },
  {
    id: 4,
    serial: "question 04",
    question: "Can Softree preserve visual interactivity, drill-throughs, and parameters from Tableau?",
    answer: "Yes. Softree maps Tableau parameters, set actions, tooltips, and dashboard actions directly to native Power BI equivalents—such as Field Parameters, Calculation Groups, Drill-through pages, Visual Tooltip pages, and Bookmarks with dynamic slicers. This preserves the exact interactive user experience business stakeholders rely on while leveraging Power BI's modern UI capabilities.",
  },
  {
    id: 5,
    serial: "question 05",
    question: "How is Row-Level Security (RLS) mapped from Tableau Server to Power BI?",
    answer: "Tableau user filters, entitlement tables, and ISMEMBEROF() functions are re-mapped to Power BI Row-Level Security (RLS) and Object-Level Security (OLS) rules using dynamic DAX expressions such as USERPRINCIPALNAME() or USERUSERNAME(). These roles are bound to Microsoft Entra ID (Azure Active Directory) security groups and integrated with Microsoft Purview for centralized organizational governance.",
  },
  {
    id: 6,
    serial: "question 06",
    question: "What cost savings and ROI can organizations expect from migrating Tableau to Power BI?",
    answer: "Migrating from Tableau to Power BI typically yields a 30% to 50% reduction in total cost of ownership (TCO). Organizations eliminate expensive per-user Tableau creator/explorer subscription fees by bundling reporting into existing Microsoft 365 E5 or Power BI Pro/Premium/Fabric capacity licenses, while simplifying IT management through unified Microsoft cloud administration.",
  },
  {
    id: 7,
    serial: "question 07",
    question: "Does Softree offer dedicated offshore Power BI migration developers and teams?",
    answer: "Yes. Softree provides pre-vetted offshore Power BI developers, DAX architects, and BI QA specialists based out of India. Our offshore migration engineers operate as a seamless extension of your internal team or consulting practice, providing daily status syncs, transparent time tracking, white-label project delivery, and cost-effective delivery options.",
  },
  {
    id: 8,
    serial: "question 08",
    question: "What is the typical timeline and phased roadmap for a Tableau to Power BI migration?",
    answer: "Migration timelines depend on workbook inventory, calculation complexity, and data model structure. A pilot migration of 5 to 10 high-value dashboards typically takes 2 to 4 weeks. Offshore migrations follow a phased sprint model: Phase 1 (Audit & Discovery - 1-2 wks), Phase 2 (Semantic Model Architecture & DAX Translation - 2-4 wks), Phase 3 (Visual Redesign & Report Building - 2-4 wks), Phase 4 (Parallel Testing & UAT - 1-2 wks), and Phase 5 (Production Rollout & Tableau Decommissioning).",
  },
];
