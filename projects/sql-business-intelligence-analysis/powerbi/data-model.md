# Power BI Data Model — SQL Business Intelligence Analysis

> **Note on scope:** as with the other projects in this portfolio, this
> documents the model and measures as they'd be built in Power BI Desktop
> using `data/cleaned/chinook.sqlite` as the source (Power BI connects to
> SQLite via an ODBC driver, or the tables can be exported to CSV first).
> No `.pbix` is included — Power BI Desktop wasn't available in the build
> environment. This project's primary artifact is the SQL query library
> (`sql/queries.sql`); this model shows how the same logic maps to Power BI.

## Data model

Chinook is already a clean relational schema, so the Power BI model mirrors
it directly as a star: **`InvoiceLine`** (fact, one row per line item) joined
to **`Invoice`**, **`Track`**, **`Album`**, **`Artist`**, **`Genre`**,
**`Customer`**, and **`Employee`** (via `Customer.SupportRepId`).

## DAX measures

```dax
Total Revenue := SUMX ( InvoiceLine, InvoiceLine[UnitPrice] * InvoiceLine[Quantity] )

Orders := DISTINCTCOUNT ( Invoice[InvoiceId] )

Customers := DISTINCTCOUNT ( Invoice[CustomerId] )

Avg Order Value := DIVIDE ( [Total Revenue], [Orders], 0 )

Revenue — Genre :=
CALCULATE ( [Total Revenue], USERELATIONSHIP ( Track[GenreId], Genre[GenreId] ) )

Customer Revenue Rank :=
RANKX ( ALL ( Customer[CustomerId] ), CALCULATE ( [Total Revenue] ) )

Top-20 Customer Revenue Share :=
VAR Top20 = TOPN ( 20, VALUES ( Customer[CustomerId] ), CALCULATE ( [Total Revenue] ) )
VAR Top20Revenue = SUMX ( Top20, CALCULATE ( [Total Revenue] ) )
RETURN DIVIDE ( Top20Revenue, [Total Revenue], 0 )
```

## Report pages (as built in the web-chart equivalent shipped on the site)

1. **Overview** — KPI cards (Total Revenue, Orders, Customers, Avg Order
   Value), revenue by genre (bar), top artists by revenue (bar), revenue by
   country (bar), revenue managed by sales rep (bar).
2. **Customer Concentration** — top 20 customers by lifetime revenue,
   cumulative revenue share across all customers.

## Suggested slicers

`Genre`, `Country`, `SalesRep` — all filter every visual via native Power BI
cross-filtering.

## A data-quality note carried over from the SQL analysis

The invoice dates in this sample database are synthetic — monthly order
counts and totals are near-identical across 5 years, which isn't a real
trend signal (see the main README). Any Power BI report built on this data
should treat time-based visuals (a monthly trend page) as a demonstration of
technique, not of an actual seasonal pattern.
