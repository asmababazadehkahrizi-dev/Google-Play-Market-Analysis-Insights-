# Power BI Data Model — Customer Analytics Dashboard

> **Note on scope:** as with the other projects in this portfolio, this
> documents the model and measures as they'd be built in Power BI Desktop
> using the cleaned transaction and RFM tables as sources. No `.pbix` is
> included — Power BI Desktop wasn't available in the build environment.

## Data model

**`Transactions` (fact)** — one row per order line: `InvoiceNo`, `CustomerID`,
`InvoiceDate`, `Quantity`, `UnitPrice`, `Country`. (Not committed to the repo
at full size — see the main README for how to regenerate it.)

**`CustomerRFM`** — one row per customer: `CustomerID`, `Recency`,
`Frequency`, `Monetary`, `R_Score`, `F_Score`, `M_Score`, `Segment`. Computed
in Python (`clean_and_analyze.py`) rather than DAX, since the RFM scoring
logic (quantile-based binning + segment rules) is clearer and more testable
in pandas — Power BI then relates to it as a dimension-like table on
`CustomerID`.

**`Dim_Date`** — standalone calendar table for the monthly revenue trend.

Relationship: `Transactions[CustomerID]` → `CustomerRFM[CustomerID]`
(many-to-one), so every transaction visual can slice by `Segment`.

## DAX measures

```dax
Total Revenue := SUMX ( Transactions, Transactions[Quantity] * Transactions[UnitPrice] )

Customers := DISTINCTCOUNT ( Transactions[CustomerID] )

Orders := DISTINCTCOUNT ( Transactions[InvoiceNo] )

Avg Order Value := DIVIDE ( [Total Revenue], [Orders], 0 )

Revenue — Segment :=
CALCULATE ( [Total Revenue], CustomerRFM[Segment] = SELECTEDVALUE ( CustomerRFM[Segment] ) )

Top-Decile Revenue Share :=
VAR TopDecileCustomers =
    TOPN ( ROUND ( [Customers] * 0.1, 0 ), CustomerRFM, CustomerRFM[Monetary] )
VAR TopDecileRevenue = SUMX ( TopDecileCustomers, CustomerRFM[Monetary] )
RETURN DIVIDE ( TopDecileRevenue, [Total Revenue], 0 )
```

## Report pages (as built in the web-chart equivalent shipped on the site)

1. **Overview** — KPI cards (Total Revenue, Total Customers, Avg Order
   Value, Repeat Purchase Rate), customers by segment (bar), revenue by
   segment (bar), top countries by revenue (bar), recency vs. frequency
   scatter colored by segment.
2. **Segment Value** — average revenue per customer by segment, average
   orders per customer by segment.

## Suggested slicers

`Segment`, `Country`, `InvoiceDate` (date range) — all filter every visual
via native Power BI cross-filtering.
