# Power BI Data Model — HR Analytics Dashboard

> **Note on scope:** this documents the star schema and DAX measures as they
> would be built in Power BI Desktop, using `data/cleaned/employee_attrition_clean.csv`
> as the source. The `.pbix` itself isn't included in this repo — Power BI
> Desktop is Windows-only and wasn't available in the environment this project
> was built in. Everything below is ready to paste directly into a new report:
> load the CSV, build the two tables, then add the measures.

## Data model

A single fact table is sufficient at this scale (1,470 rows, one grain), so
this is a simplified star: one fact table plus one supporting date table.

**`Employees` (fact)** — one row per employee, loaded from
`employee_attrition_clean.csv`. Key columns: `EmployeeNumber` (id), `Attrition`
(0/1), `Department`, `JobRole`, `OverTime`, `MonthlyIncome`, `YearsAtCompany`,
`TenureBand`, `JobSatisfaction`.

**`DateTable`** — a standalone calendar table (`CALENDAR` DAX function) if the
report is extended to trend attrition over time using `DateofHire`/review
dates; not required for the static KPIs below.

## DAX measures

```dax
Headcount := COUNTROWS ( Employees )

Leavers := SUM ( Employees[Attrition] )

Attrition Rate := DIVIDE ( [Leavers], [Headcount], 0 )

Avg Tenure (Years) := AVERAGE ( Employees[YearsAtCompany] )

Avg Monthly Income := AVERAGE ( Employees[MonthlyIncome] )

Attrition Rate — Overtime :=
CALCULATE ( [Attrition Rate], Employees[OverTime] = "Yes" )

Company Avg Attrition Rate :=
CALCULATE ( [Attrition Rate], ALL ( Employees ) )

Above-Average Attrition Role :=
IF ( [Attrition Rate] > [Company Avg Attrition Rate], "Above average", "At/below average" )

At-Risk Headcount :=
CALCULATE (
    [Headcount],
    Employees[OverTime] = "Yes",
    Employees[JobSatisfaction] <= 2,
    Employees[YearsAtCompany] <= 3
)
```

## Report pages (as built in the web-chart equivalent shipped on the site)

1. **Overview** — KPI cards (Headcount, Attrition Rate, Avg Tenure, Avg
   Monthly Income), attrition rate by department (bar), top attrition job
   roles (bar), attrition by overtime (bar).
2. **Tenure & Compensation** — attrition rate by tenure band (line), monthly
   income distribution stayed vs. left (box plot).

## Suggested slicers

`Department`, `JobRole`, `OverTime`, `TenureBand` — all filter every visual
on the page via native Power BI cross-filtering.
