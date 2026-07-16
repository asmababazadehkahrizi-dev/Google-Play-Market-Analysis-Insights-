import { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    role: "Data Analyst",
    company: "Freelance / Independent Projects",
    location: "London, United Kingdom",
    period: "2024 — Present",
    current: true,
    description:
      "Delivering end-to-end analytics projects for small businesses and portfolio clients, from raw data to decision-ready dashboards.",
    highlights: [
      "Designed and shipped 6+ Power BI and SQL dashboards covering HR, recruitment, sales, and customer analytics",
      "Built Python-based ETL pipelines to automate recurring data-cleaning and reporting work",
      "Translated ambiguous business questions into clear, testable analytical requirements",
    ],
  },
  {
    role: "Data Analytics Diploma",
    company: "BrainStation",
    location: "London, United Kingdom",
    period: "2023 — 2024",
    current: false,
    description:
      "Intensive, project-based diploma covering the full analytics lifecycle — from data wrangling to visualization and stakeholder storytelling.",
    highlights: [
      "Completed applied projects in SQL, Python (pandas, NumPy), and Power BI / Tableau",
      "Built a capstone dashboard project analysing real-world business data end-to-end",
      "Practised presenting data-driven recommendations to non-technical stakeholders",
    ],
  },
  {
    role: "Mechanical Engineer",
    company: "Engineering Sector Roles",
    location: "United Kingdom",
    period: "2019 — 2023",
    current: false,
    description:
      "Worked across mechanical engineering projects, developing a strong foundation in analytical problem-solving, process optimisation, and quantitative rigor that now underpins my analytics work.",
    highlights: [
      "Applied engineering analysis and root-cause methodology to process and quality problems",
      "Used Excel extensively for technical calculations, tolerance analysis, and reporting",
      "Built the analytical discipline that later motivated a transition into data analytics",
    ],
  },
];
