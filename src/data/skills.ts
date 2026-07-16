import { SkillCategory } from "@/types";

// Sourced directly from Asma's CV — grouped exactly as listed there.
export const skillCategories: SkillCategory[] = [
  {
    category: "Technical Skills",
    skills: [
      "Tableau (Dashboard Development)",
      "SQL (Data Extraction & Querying)",
      "Power BI",
      "Power Query",
      "Advanced Excel (PivotTables, Modelling)",
    ],
  },
  {
    category: "Commercial Analysis",
    skills: [
      "Pricing, Cost & Profitability Analysis",
      "Revenue & Performance Reporting",
      "KPI Tracking",
      "Commercial Decision Support",
    ],
  },
  {
    category: "Core Competencies",
    skills: [
      "Data Consolidation from Multiple Sources",
      "Data Cleaning & Validation",
      "Monthly / Ad Hoc Reporting Cycles",
      "Stakeholder Communication",
      "Managing Inbound Data Requests",
    ],
  },
  {
    category: "Programming & Automation",
    skills: ["Python (Data Analysis)"],
  },
];

export const skillList: string[] = skillCategories.flatMap((group) => group.skills);
