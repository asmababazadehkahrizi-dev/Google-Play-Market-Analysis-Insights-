import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Business Intelligence",
    skills: [
      { name: "Power BI", level: 95 },
      { name: "DAX", level: 90 },
      { name: "Power Query", level: 90 },
      { name: "Tableau", level: 80 },
      { name: "Dashboard Design", level: 92 },
    ],
  },
  {
    category: "Data & Programming",
    skills: [
      { name: "SQL", level: 92 },
      { name: "Python", level: 88 },
      { name: "ETL", level: 85 },
      { name: "Data Cleaning", level: 90 },
      { name: "Git & GitHub", level: 80 },
    ],
  },
  {
    category: "Analysis & Statistics",
    skills: [
      { name: "Data Analytics", level: 92 },
      { name: "Statistics", level: 82 },
      { name: "Data Visualization", level: 93 },
      { name: "Machine Learning Basics", level: 65 },
      { name: "Excel", level: 90 },
    ],
  },
];

export const skillList: string[] = [
  "Power BI",
  "SQL",
  "Python",
  "Tableau",
  "Excel",
  "Power Query",
  "DAX",
  "ETL",
  "Data Visualization",
  "Data Analytics",
  "Dashboard Design",
  "Statistics",
  "Machine Learning Basics",
  "Git",
  "GitHub",
];
