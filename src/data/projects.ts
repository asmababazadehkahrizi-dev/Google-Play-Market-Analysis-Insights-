import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "hr-analytics-dashboard",
    title: "HR Analytics Dashboard",
    category: "Power BI · SQL · Python",
    summary:
      "An end-to-end HR analytics solution tracking headcount, attrition, and workforce diversity across departments in real time.",
    businessProblem:
      "The HR team relied on static, monthly spreadsheet reports to track headcount and attrition, which meant leadership was often making decisions on data that was already several weeks out of date. There was no single source of truth, and comparing attrition trends across departments required hours of manual pivoting.",
    solution:
      "I built a SQL data warehouse layer to consolidate HRIS exports, wrote Python (pandas) scripts to clean and validate the data on a schedule, and designed a Power BI dashboard with drill-through pages for headcount, attrition, tenure, and diversity metrics. DAX measures calculate rolling attrition rate, time-to-fill, and cost-per-hire dynamically as filters change.",
    outcomes: [
      "Reduced monthly reporting time from 3 days to under 1 hour",
      "Surfaced a 22% attrition spike in one department, enabling a targeted retention plan",
      "Gave leadership self-service access to live workforce KPIs",
    ],
    technologies: ["Power BI", "SQL", "Python", "DAX", "Power Query", "ETL"],
    image: "/images/projects/hr-analytics-dashboard.svg",
    gallery: [
      "/images/projects/hr-analytics-dashboard.svg",
      "/images/projects/hr-analytics-dashboard-2.svg",
    ],
    githubUrl: "https://github.com/asmababazadehkahrizi-dev/hr-analytics-dashboard",
    demoUrl: "https://app.powerbi.com/view?r=hr-analytics-dashboard-demo",
    featured: true,
  },
  {
    slug: "recruitment-analytics-dashboard",
    title: "Recruitment Analytics Dashboard",
    category: "Power BI · SQL",
    summary:
      "A recruitment funnel dashboard giving talent teams live visibility into pipeline health, source effectiveness, and time-to-hire.",
    businessProblem:
      "Recruiters and hiring managers had no shared view of where candidates were dropping out of the pipeline. Sourcing spend wasn't tied back to actual hires, making it impossible to know which channels were worth the budget.",
    solution:
      "I modelled the applicant tracking system export into a star schema in SQL, then built a Power BI report visualising the funnel stage-by-stage, source-to-hire conversion, and time-to-hire by role and department. Row-level security scopes each hiring manager to their own requisitions.",
    outcomes: [
      "Identified that 60% of hires came from 2 of 8 sourcing channels, reallocating budget accordingly",
      "Cut average time-to-hire visibility lag from weekly to daily",
      "Adopted by the talent acquisition team as their primary reporting tool",
    ],
    technologies: ["Power BI", "SQL", "DAX", "Data Modelling", "Dashboard Design"],
    image: "/images/projects/recruitment-analytics-dashboard.svg",
    gallery: [
      "/images/projects/recruitment-analytics-dashboard.svg",
      "/images/projects/recruitment-analytics-dashboard-2.svg",
    ],
    githubUrl:
      "https://github.com/asmababazadehkahrizi-dev/recruitment-analytics-dashboard",
    demoUrl: "https://app.powerbi.com/view?r=recruitment-analytics-dashboard-demo",
    featured: true,
  },
  {
    slug: "sales-performance-dashboard",
    title: "Sales Performance Dashboard",
    category: "Power BI · SQL",
    summary:
      "A regional sales performance dashboard tracking revenue, targets, and rep productivity against quota in near real time.",
    businessProblem:
      "Sales leadership only reviewed performance at the end of each quarter, by which point underperforming regions had already missed their targets for months without intervention.",
    solution:
      "I connected Power BI directly to the sales database via SQL views, building a dashboard with revenue-vs-target tracking, rep leaderboards, product mix analysis, and a forecast trendline. Bookmarks and tooltips let regional managers drill from company-wide KPIs down to individual rep performance without leaving the page.",
    outcomes: [
      "Enabled monthly rather than quarterly performance reviews",
      "Helped one region course-correct mid-quarter, closing a 15% gap to target",
      "Standardised how revenue KPIs are defined and reported across regions",
    ],
    technologies: ["Power BI", "SQL", "DAX", "Excel", "Data Visualization"],
    image: "/images/projects/sales-performance-dashboard.svg",
    gallery: [
      "/images/projects/sales-performance-dashboard.svg",
      "/images/projects/sales-performance-dashboard-2.svg",
    ],
    githubUrl: "https://github.com/asmababazadehkahrizi-dev/sales-performance-dashboard",
    demoUrl: "https://app.powerbi.com/view?r=sales-performance-dashboard-demo",
    featured: true,
  },
  {
    slug: "customer-analytics-dashboard",
    title: "Customer Analytics Dashboard",
    category: "Power BI · Python",
    summary:
      "A customer analytics dashboard combining RFM segmentation and churn signals to help retention teams prioritise outreach.",
    businessProblem:
      "The business treated all customers the same in retention campaigns, spending equal effort on low-value and high-value accounts, which diluted the impact of limited marketing resources.",
    solution:
      "I used Python to run an RFM (Recency, Frequency, Monetary) segmentation model and a lightweight churn-risk score on transaction data, then published the results into a Power BI dashboard that segments customers into actionable tiers with clear next-best-action recommendations for each.",
    outcomes: [
      "Identified the top 15% of customers driving 55% of revenue",
      "Retention campaigns re-targeted toward high-risk, high-value segments",
      "Supported a measurable lift in repeat purchase rate within the target segment",
    ],
    technologies: [
      "Power BI",
      "Python",
      "Statistics",
      "Machine Learning Basics",
      "Data Analytics",
    ],
    image: "/images/projects/customer-analytics-dashboard.svg",
    gallery: [
      "/images/projects/customer-analytics-dashboard.svg",
      "/images/projects/customer-analytics-dashboard-2.svg",
    ],
    githubUrl: "https://github.com/asmababazadehkahrizi-dev/customer-analytics-dashboard",
    demoUrl: "https://app.powerbi.com/view?r=customer-analytics-dashboard-demo",
    featured: true,
  },
  {
    slug: "python-data-cleaning-automation",
    title: "Python Data Cleaning Automation",
    category: "Python · ETL",
    summary:
      "A reusable Python pipeline that automates cleaning, validation, and standardisation of messy multi-source datasets.",
    businessProblem:
      "Analysts across the team were spending up to 40% of their time manually cleaning inconsistent exports — mismatched date formats, duplicate records, and inconsistent category labels — before any analysis could begin.",
    solution:
      "I built a configurable Python (pandas) pipeline that ingests raw CSV/Excel exports, applies validation rules, standardises formats and category labels, flags anomalies for manual review, and outputs analysis-ready datasets with a logged data-quality report for every run.",
    outcomes: [
      "Cut manual data-cleaning time by roughly 70%",
      "Standardised data-quality checks across three reporting teams",
      "Made the pipeline reusable across new data sources with minimal configuration",
    ],
    technologies: ["Python", "ETL", "Data Cleaning", "Pandas", "Git"],
    image: "/images/projects/python-data-cleaning-automation.svg",
    gallery: [
      "/images/projects/python-data-cleaning-automation.svg",
      "/images/projects/python-data-cleaning-automation-2.svg",
    ],
    githubUrl:
      "https://github.com/asmababazadehkahrizi-dev/python-data-cleaning-automation",
    demoUrl: "https://github.com/asmababazadehkahrizi-dev/python-data-cleaning-automation#readme",
    featured: false,
  },
  {
    slug: "sql-business-intelligence-analysis",
    title: "SQL Business Intelligence Analysis",
    category: "SQL · Excel",
    summary:
      "A portfolio of advanced SQL queries and views answering real business questions across sales, inventory, and operations data.",
    businessProblem:
      "Stakeholders regularly asked ad-hoc business questions — top-performing products by region, inventory turnover, customer lifetime value — that required custom, error-prone spreadsheet work each time, with no consistent methodology.",
    solution:
      "I designed a set of reusable SQL views and window-function-based queries (running totals, cohort analysis, ranking, year-over-year growth) against a relational business database, documented in a query library so the same logic could be reused reliably across future reporting requests.",
    outcomes: [
      "Replaced recurring ad-hoc spreadsheet analysis with governed, reusable SQL views",
      "Reduced turnaround time on stakeholder data requests from days to hours",
      "Created a documented query library adopted as a team reference",
    ],
    technologies: ["SQL", "Excel", "Data Analytics", "Statistics"],
    image: "/images/projects/sql-business-intelligence-analysis.svg",
    gallery: [
      "/images/projects/sql-business-intelligence-analysis.svg",
      "/images/projects/sql-business-intelligence-analysis-2.svg",
    ],
    githubUrl:
      "https://github.com/asmababazadehkahrizi-dev/sql-business-intelligence-analysis",
    demoUrl:
      "https://github.com/asmababazadehkahrizi-dev/sql-business-intelligence-analysis#readme",
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
