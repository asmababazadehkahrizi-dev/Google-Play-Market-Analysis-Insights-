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
      "Retail order data from the Sample Superstore dataset, broken down by region, category, and discount level to see where revenue was actually turning into profit.",
    businessProblem:
      "Revenue looked healthy on the surface, but overall margin was thin, and nobody had broken down why. The question was which regions and categories were genuinely profitable once discounting was factored in, rather than just which ones sold the most, and where discounts were being applied without much thought to what they were doing to margin.",
    solution: [
      "Cleaned close to 10,800 order lines from the Sample Superstore dataset in Python and worked out profit margin by discount band.",
      "Wrote SQL using RANK() and a running-total window function to rank regions by revenue and track the monthly sales trend.",
      "Built out the Power BI data model — a fact table plus customer, product, geography, and date dimensions — with the DAX measures behind it.",
    ],
    outcomes: [
      "Margin turns negative past a 20% discount — from 34% with no discount down to -113.9% once discounts hit 50% or more",
      "Three sub-categories lose money outright; Tables is the worst of them, down $17,725 on $207K of sales at a 26.1% average discount",
      "Central is the third-biggest region by sales but has the weakest margin of any region, at just 7.9%",
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
      "Retention campaigns here treated every customer the same — same offer, same channel, same spend — regardless of whether they'd bought once or fifty times. There was no simple way to tell which customers were actually worth protecting, which had already started drifting away, and where a limited retention budget would do the most good.",
    solution: [
      "Scored every customer on recency, frequency, and spend (RFM) in Python, then grouped them into six segments — Champions, Loyal, At Risk, and so on.",
      "Queried the data in SQL with NTILE() to split customers into revenue deciles and LAG() to track month-over-month revenue change.",
      "Carried the same segments into Power BI, with the DAX measures behind them, so the split can be filtered and explored rather than read off a spreadsheet.",
    ],
    outcomes: [
      "The top 10% of customers account for 61.5% of all revenue — £8.89M across 4,338 customers",
      "Champions, just 11% of the customer base, bring in £4.42M on their own — half of total revenue — averaging £9,048 each against £283 for a Hibernating customer",
      "646 customers sit in the 'At Risk' segment, some worth over £44,000 lifetime and still recoverable with the right outreach",
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
      "Every export of this dataset came in messy — inconsistent number formats, duplicate listings, and one row where a scraping error had silently shifted every field along by one column. Cleaning it by hand each time would take hours and still miss things like the shifted row, so the real task was building something repeatable that could catch errors a person would scroll straight past.",
    solution: [
      "Wrote Python functions, not a one-off script, to turn the messy installs, price, and size fields into real numbers that could actually be calculated on.",
      "Tracked down and fixed a scraping bug where one row's fields had all shifted one column to the left, and removed 1,181 duplicate app listings, keeping the most-reviewed version of each.",
      "Ran SQL checks against the cleaned data to confirm ratings fell within a valid range, then modelled the same output for Power BI with the DAX measures behind it.",
    ],
    outcomes: [
      "1,181 duplicate app listings removed, taking the dataset from 10,841 rows down to 9,660, always keeping the most-reviewed copy of each app",
      "One row had corrupted data from the scraping bug — a shifted column that would have silently mislabelled a rating as a category — found and fixed",
      "Zero ratings fall outside the valid 1–5 range in the cleaned data, confirmed by running a check against the database afterwards",
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
      "SQL analysis against the Chinook sample database, answering the kind of one-off questions a BI team gets asked all the time — genre and artist performance, customer concentration, and sales rep performance.",
    businessProblem:
      "Stakeholders kept coming back with one-off questions — top-selling genres, best customers, which rep was carrying the most revenue — and each one turned into a fresh round of manual spreadsheet work. Nothing was reusable, so the same numbers sometimes got recalculated a different way depending on who was asked, with no consistent way to answer the next question that came up.",
    solution: [
      "Pulled together genre, artist, and customer revenue in a handful of SQL queries against the Chinook database, so a question like 'who are our best customers' has one clear, repeatable answer instead of a fresh spreadsheet each time.",
      "Used ranking and running-total logic to show not just who's on top, but how concentrated the revenue actually is — useful for knowing whether the business leans on a handful of big spenders or a broad base.",
      "Checked the sales-rep and monthly figures for anything misleading before treating them as findings, and caught a pattern in the invoice dates that turned out to be an artifact of the sample data rather than a real trend.",
    ],
    outcomes: [
      "Rock accounts for 35.5% of total revenue ($826.65 of $2,328.60) — more than double the next genre",
      "Every customer has already bought a Rock track, so a Rock-focused cross-sell push would reach nobody new; a smaller genre is the better target",
      "Monthly revenue turned out to be near-identical across five years — a quirk of how the sample data was generated, not a real trend, and worth flagging rather than reporting as one",
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
