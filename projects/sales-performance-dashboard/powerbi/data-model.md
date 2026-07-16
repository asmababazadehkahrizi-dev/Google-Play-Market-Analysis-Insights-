# Power BI Data Model — Sales Performance Dashboard

> **Note on scope:** as with the other projects in this portfolio, this
> documents the model and measures as they'd be built in Power BI Desktop
> using `data/cleaned/superstore_clean.csv` as the source. No `.pbix` is
> included — Power BI Desktop wasn't available in the build environment.

## Data model

A proper star schema, since this dataset has clear dimensional structure:

**`Orders` (fact)** — one row per order line item: `Order ID`, `Order Date`,
`Sales`, `Profit`, `Discount`, `Quantity`, foreign keys to each dimension.

**`Dim_Customer`** — `Customer ID`, `Customer Name`, `Segment`.
**`Dim_Product`** — `Product ID`, `Product Name`, `Category`, `Sub-Category`.
**`Dim_Geography`** — `Region`, `State`, `City`.
**`Dim_Date`** — standalone calendar table, `CALENDAR ( MIN ( Orders[Order Date] ), MAX ( Orders[Order Date] ) )`, marked as the official Date Table for time intelligence.

In the flat CSV shipped here, these dimensions are denormalized into the
fact table — splitting them out is the first step when rebuilding this in
Power BI Desktop, so slicers and relationships behave correctly at scale.

## DAX measures

```dax
Total Sales := SUM ( Orders[Sales] )

Total Profit := SUM ( Orders[Profit] )

Profit Margin := DIVIDE ( [Total Profit], [Total Sales], 0 )

Orders := DISTINCTCOUNT ( Orders[Order ID] )

Avg Order Value := DIVIDE ( [Total Sales], [Orders], 0 )

Sales YTD := TOTALYTD ( [Total Sales], Dim_Date[Date] )

Sales PY := CALCULATE ( [Total Sales], SAMEPERIODLASTYEAR ( Dim_Date[Date] ) )

Sales YoY % := DIVIDE ( [Total Sales] - [Sales PY], [Sales PY], 0 )

Unprofitable Sub-Category :=
IF ( [Total Profit] < 0, "Loss-making", "Profitable" )
```

## Report pages (as built in the web-chart equivalent shipped on the site)

1. **Overview** — KPI cards (Total Sales, Total Profit, Profit Margin, Avg
   Order Value), sales by region (bar), monthly sales trend (line), sales by
   category (bar), most/least profitable sub-categories (diverging bar).
2. **Discounting & Segments** — average profit margin by discount band (bar),
   sales vs. profit by customer segment (grouped bar).

## Suggested slicers

`Region`, `Category`, `Segment`, `Order Date` (date range) — all filter every
visual via native Power BI cross-filtering.
