import { Project } from "@/types";

const REPO =
  "https://github.com/asmababazadehkahrizi-dev/google-play-market-analysis-insights-";

export const projects: Project[] = [
  {
    slug: "hr-analytics-dashboard",
    title: "HR Analytics Dashboard",
    label: "Personal Data Analytics Project",
    category: "Power BI · SQL · Python",
    summary:
      "An attrition analysis on the IBM HR dataset — where employees are leaving from, what's actually driving it, and who's most at risk of leaving next.",
    businessProblem:
      "Companies often only look at attrition once a year, by which point the pattern has already cost them good people. I wanted to know whether turnover was spread evenly across the business or concentrated in specific teams and conditions, and whether there was a way to flag at-risk employees early enough to act on it, rather than explaining the numbers after they'd already left.",
    solution: [
      "Cleaned the raw employee records and worked out attrition, tenure, and satisfaction metrics in Python (pandas).",
      "Queried the data in SQL against a SQLite database, using window functions like RANK and running totals to rank departments and track attrition by tenure band.",
      "Modelled the same data for Power BI and wrote out the DAX measures, so the analysis can be rebuilt as a live dashboard.",
    ],
    outcomes: [
      "Attrition sits at 16.1% overall — 237 people out of 1,470",
      "Overtime is the biggest single factor: staff working overtime leave at 30.5%, versus 10.4% for everyone else, even though the pay is nearly identical",
      "A small group — overtime, low satisfaction, under three years' tenure, just 56 people — leaves at 55.4%, more than three times the company average",
    ],
    technologies: ["Power BI", "SQL", "Python", "DAX", "Data Cleaning", "Data Visualization"],
    image: "/images/projects/hr-analytics-dashboard.png",
    gallery: [
      "/images/projects/hr-analytics-dashboard.png",
      "/images/projects/hr-analytics-dashboard-2.png",
    ],
    githubUrl: `${REPO}/tree/main/projects/hr-analytics-dashboard`,
    demoUrl: `${REPO}/blob/main/projects/hr-analytics-dashboard/README.md`,
    featured: true,
  },
  {
    slug: "recruitment-analytics-dashboard",
    title: "Recruitment Analytics Dashboard",
    label: "Personal Data Analytics Project",
    category: "Power BI · SQL · Python",
    summary:
      "A look at seven recruitment channels in a public HR dataset — which ones bring in people who stick around, and which just look good on a hiring report.",
    businessProblem:
      "Talent teams often split their budget across half a dozen job boards and channels without much evidence on which ones work. In this dataset, sourcing spend wasn't tied to how long a hire actually stayed — decisions came down to gut feel and channel reputation, not whether that channel's hires were still around a year later.",
    solution: [
      "Cleaned and analysed the Human Resources Data Set (311 employees) in Python, working out hire volume, termination rate, and engagement score by channel.",
      "Used SQL with a RANK() window function to rank channels by volume, plus a correlated subquery to pull out each department's top hiring source.",
      "Mapped the same figures into a Power BI model with DAX measures, so the comparison works as a filterable report rather than a static table.",
    ],
    outcomes: [
      "Indeed and LinkedIn bring in the most people — 87 and 76 hires — more than half the total between them",
      "Employee Referral holds onto people better than any other high-volume channel: a 16.1% termination rate with above-average engagement scores",
      "Google Search ranks third by volume but loses well over half its hires (61.2%) — almost double the company-wide rate",
    ],
    technologies: ["Power BI", "SQL", "Python", "DAX", "Data Analytics"],
    image: "/images/projects/recruitment-analytics-dashboard.png",
    gallery: [
      "/images/projects/recruitment-analytics-dashboard.png",
      "/images/projects/recruitment-analytics-dashboard-2.png",
    ],
    githubUrl: `${REPO}/tree/main/projects/recruitment-analytics-dashboard`,
    demoUrl: `${REPO}/blob/main/projects/recruitment-analytics-dashboard/README.md`,
    featured: true,
  },
  {
    slug: "sales-performance-dashboard",
    title: "Sales Performance Dashboard",
    label: "Personal Data Analytics Project",
    category: "Power BI · SQL · Python",
    summary:
      "A retail order-book analysis on the public Sample Superstore dataset — where revenue comes from, and where discounting quietly destroys margin.",
    businessProblem:
      "Framed as a realistic sales analytics brief: the business has healthy total revenue but wants to understand why overall profit margin is thin, which regions/categories are actually profitable once discounting is accounted for, and where over-discounting is happening.",
    solution:
      "Cleaned and analyzed ~10,800 order lines (Sample Superstore) in Python, wrote SQL with RANK() and a running-total window function for a monthly trend, and documented a full Power BI star schema (fact + customer/product/geography/date dimensions) with DAX measures.",
    outcomes: [
      "Discount above 20% flips orders unprofitable: margin falls from 34% (no discount) to -113.9% at 50%+ discount",
      "Three sub-categories are net loss-makers — Tables alone lose $17,725 on $207K sales at a 26.1% average discount",
      "Central region has the weakest margin (7.9%) despite being the 3rd-largest region by sales",
    ],
    technologies: ["Power BI", "SQL", "Python", "DAX", "Excel", "Data Visualization"],
    image: "/images/projects/sales-performance-dashboard.png",
    gallery: [
      "/images/projects/sales-performance-dashboard.png",
      "/images/projects/sales-performance-dashboard-2.png",
    ],
    githubUrl: `${REPO}/tree/main/projects/sales-performance-dashboard`,
    demoUrl: `${REPO}/blob/main/projects/sales-performance-dashboard/README.md`,
    featured: true,
  },
  {
    slug: "customer-analytics-dashboard",
    title: "Customer Analytics Dashboard",
    label: "Personal Data Analytics Project",
    category: "Power BI · SQL · Python",
    summary:
      "An RFM customer segmentation on 541,909 real transactions (UCI Online Retail) identifying which customers drive revenue — and which are slipping away.",
    businessProblem:
      "Framed as a realistic retention/marketing analytics brief: the business treats all customers roughly the same in retention campaigns, with no shared, data-backed view of which customers are high-value, which are at risk of churning, and where to focus limited retention budget.",
    solution:
      "Built a Python RFM (Recency, Frequency, Monetary) segmentation on the UCI Online Retail dataset, quartile-scored each customer and rule-mapped scores to six named segments, then wrote SQL using NTILE() for decile analysis and LAG() for month-over-month revenue change, with a documented Power BI model on top.",
    outcomes: [
      "The top 10% of customers generate 61.5% of total revenue (£8.89M across 4,338 customers)",
      "Champions (11% of customers) drive £4.42M — half of all revenue — averaging £9,048 revenue per customer vs. £283 for Hibernating customers",
      "646 'At Risk' customers include individuals worth over £44,000 lifetime, still recoverable with the right outreach",
    ],
    technologies: ["Power BI", "SQL", "Python", "Statistics", "Data Analytics", "DAX"],
    image: "/images/projects/customer-analytics-dashboard.png",
    gallery: [
      "/images/projects/customer-analytics-dashboard.png",
      "/images/projects/customer-analytics-dashboard-2.png",
    ],
    githubUrl: `${REPO}/tree/main/projects/customer-analytics-dashboard`,
    demoUrl: `${REPO}/blob/main/projects/customer-analytics-dashboard/README.md`,
    featured: true,
  },
  {
    slug: "python-data-cleaning-automation",
    title: "Python Data Cleaning Automation",
    label: "Personal Data Analytics Project",
    category: "Python · SQL",
    summary:
      "A reusable Python cleaning pipeline built against the notoriously messy Google Play Store Apps dataset, with an auditable before/after data-quality report.",
    businessProblem:
      "Framed as a realistic data engineering brief: analysts spend significant time manually cleaning inconsistent exports before any analysis can start — mismatched formats, duplicate records, and in this dataset's case, a real scraping bug that silently corrupts rows.",
    solution:
      "Wrote importable, testable Python functions (not a one-off script) to parse messy installs/price/size text into numerics, detect and repair a real column-shift scraping bug affecting row-level data integrity, deduplicate 1,181 repeated app listings, and produce an auditable QualityReport — then layered SQL analysis and a documented Power BI model on the cleaned output.",
    outcomes: [
      "1,181 duplicate app listings resolved (10,841 → 9,660 rows), keeping the most-reviewed version of each app",
      "1 confirmed data-corruption row detected and repaired (a column-shift scraping bug that would otherwise silently misread Rating as Category)",
      "0 out-of-range ratings remain post-clean, verified via SQL against the cleaned database",
    ],
    technologies: ["Python", "SQL", "ETL", "Data Cleaning", "Git"],
    image: "/images/projects/python-data-cleaning-automation.png",
    gallery: [
      "/images/projects/python-data-cleaning-automation.png",
      "/images/projects/python-data-cleaning-automation-2.png",
    ],
    githubUrl: `${REPO}/tree/main/projects/python-data-cleaning-automation`,
    demoUrl: `${REPO}/blob/main/projects/python-data-cleaning-automation/README.md`,
    featured: false,
  },
  {
    slug: "sql-business-intelligence-analysis",
    title: "SQL Business Intelligence Analysis",
    label: "Personal Data Analytics Project",
    category: "SQL · Python",
    summary:
      "A SQL query library against the Chinook sample database answering realistic BI questions — genre/artist performance, customer concentration, and sales rep performance.",
    businessProblem:
      "Framed as a realistic BI analyst brief: stakeholders keep asking one-off questions — top genres, best customers, which sales rep manages the most revenue — that previously required custom spreadsheet work each time, with no reusable, documented approach.",
    solution:
      "Wrote a 9-query SQL library against the Chinook relational database covering joins across up to 4 tables, window functions (RANK, running SUM() OVER, LAG), a Pareto-style cumulative-share query, and an anti-join for cross-sell targeting — with every query's real output captured and a documented Power BI model on top.",
    outcomes: [
      "Rock generates 35.5% of total revenue ($826.65 of $2,328.60) — more than 2x the next genre",
      "Every customer has already purchased Rock (0 results from the cross-sell anti-join), so cross-sell should target smaller genres instead",
      "Identified and documented a synthetic-data artifact in the source (near-identical monthly invoice totals across 5 years) rather than reporting a false trend",
    ],
    technologies: ["SQL", "Python", "Data Analytics", "Statistics"],
    image: "/images/projects/sql-business-intelligence-analysis.png",
    gallery: [
      "/images/projects/sql-business-intelligence-analysis.png",
      "/images/projects/sql-business-intelligence-analysis-2.png",
    ],
    githubUrl: `${REPO}/tree/main/projects/sql-business-intelligence-analysis`,
    demoUrl: `${REPO}/blob/main/projects/sql-business-intelligence-analysis/README.md`,
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
