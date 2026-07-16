# Power BI Data Model — Recruitment Analytics Dashboard

> **Note on scope:** as with the other projects in this portfolio, this
> documents the model and measures as they'd be built in Power BI Desktop
> using `data/cleaned/recruitment_clean.csv` as the source. No `.pbix` is
> included — Power BI Desktop wasn't available in the build environment.

## Data model

**`Hires` (fact)** — one row per hired employee. Key columns:
`EmpID`, `RecruitmentSource`, `Department`, `Terminated` (0/1),
`FromDiversityJobFair` (0/1), `EngagementSurvey`, `EmpSatisfaction`,
`PerformanceScore`, `DateofHire`, `HireYear`.

**`DateTable`** — standalone calendar table for the hires-by-year trend,
built with `CALENDAR ( MIN ( Hires[DateofHire] ), MAX ( Hires[DateofHire] ) )`.

## DAX measures

```dax
Total Hires := COUNTROWS ( Hires )

Terminations := SUM ( Hires[Terminated] )

Termination Rate := DIVIDE ( [Terminations], [Total Hires], 0 )

Avg Engagement Score := AVERAGE ( Hires[EngagementSurvey] )

Company Avg Termination Rate :=
CALCULATE ( [Termination Rate], ALL ( Hires ) )

Company Avg Engagement :=
CALCULATE ( [Avg Engagement Score], ALL ( Hires ) )

High-Quality Source :=
IF (
    [Avg Engagement Score] >= [Company Avg Engagement]
        && [Termination Rate] <= [Company Avg Termination Rate],
    "Invest further", "Review"
)

YoY Hires Change :=
VAR CurrentYearHires = [Total Hires]
VAR PriorYearHires =
    CALCULATE ( [Total Hires], SAMEPERIODLASTYEAR ( DateTable[Date] ) )
RETURN CurrentYearHires - PriorYearHires
```

## Report pages (as built in the web-chart equivalent shipped on the site)

1. **Source Effectiveness** — KPI cards (Total Hires, Active Employees,
   Termination Rate, Top Source), hires by source (bar), termination rate by
   source (bar), hires by year (line), engagement score by source (bar).
2. **Diversity & Department Mix** — diversity job fair vs. standard sourcing
   termination comparison, headcount by department.

## Suggested slicers

`RecruitmentSource`, `Department`, `HireYear`, `FromDiversityJobFair` — all
filter every visual via native Power BI cross-filtering.
