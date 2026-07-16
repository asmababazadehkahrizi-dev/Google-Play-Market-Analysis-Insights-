# Power BI Data Model — Data Cleaning Pipeline Quality Report

> **Note on scope:** as with the other projects in this portfolio, this
> documents the model and measures as they'd be built in Power BI Desktop
> using `data/cleaned/googleplaystore_clean.csv` and
> `data/cleaned/data_quality_report.csv` as sources. No `.pbix` is included —
> Power BI Desktop wasn't available in the build environment.

## Data model

**`Apps` (fact)** — one row per app (post-cleaning, post-deduplication):
`App`, `Category`, `Rating`, `Reviews`, `Installs`, `Type`, `Price`,
`SizeMB`, `Content Rating`, `LastUpdated`.

**`QualityReport`** — one row per source column: `column`, `missing_before`,
`missing_after`. Loaded as a standalone table (not related to `Apps`) purely
to drive the before/after data-quality visual — this is a common Power BI
pattern for shipping a "data health" page alongside the business-facing
report.

## DAX measures

```dax
Total Apps := COUNTROWS ( Apps )

Avg Rating := AVERAGE ( Apps[Rating] )

Rated App Coverage := DIVIDE ( COUNTROWS ( FILTER ( Apps, NOT ISBLANK ( Apps[Rating] ) ) ), [Total Apps] )

Free App Share := DIVIDE ( CALCULATE ( [Total Apps], Apps[Type] = "Free" ), [Total Apps] )

Missing Value Reduction :=
VAR TotalBefore = SUM ( QualityReport[missing_before] )
VAR TotalAfter = SUM ( QualityReport[missing_after] )
RETURN DIVIDE ( TotalBefore - TotalAfter, TotalBefore, 0 )
```

## Report pages (as built in the web-chart equivalent shipped on the site)

1. **Quality Report** — KPI cards (Rows In, Rows Out, Duplicates Removed,
   Malformed Rows Fixed), missing values before/after by column (grouped
   bar), top categories by app count, rating distribution (histogram),
   free vs. paid split.
2. **Installs & Size** — average rating by install-volume band, app size vs.
   rating (scatter).

## Suggested slicers

`Category`, `Type`, `Content Rating` — all filter every visual via native
Power BI cross-filtering.
