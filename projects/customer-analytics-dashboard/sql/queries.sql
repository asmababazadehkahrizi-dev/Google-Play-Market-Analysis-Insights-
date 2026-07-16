-- Customer Analytics Dashboard — Personal Data Analytics Project
-- SQL analysis against data/cleaned/customer_analytics.db
-- (`transactions` = line-item grain, `customer_rfm` = one row per customer
-- with precomputed RFM scores/segment from the Python step)
-- Dialect: SQLite. Run with: sqlite3 ../data/cleaned/customer_analytics.db < queries.sql

-- 1. Headline KPIs
SELECT
    COUNT(DISTINCT CustomerID) AS customers,
    ROUND(SUM(Quantity * UnitPrice), 0) AS total_revenue,
    COUNT(DISTINCT InvoiceNo) AS orders,
    ROUND(SUM(Quantity * UnitPrice) / COUNT(DISTINCT InvoiceNo), 2) AS avg_order_value
FROM transactions;

-- 2. Revenue and customer count by RFM segment, ranked
SELECT
    Segment,
    COUNT(*) AS customers,
    ROUND(SUM(Monetary), 0) AS revenue,
    ROUND(AVG(Frequency), 1) AS avg_orders,
    ROUND(AVG(Recency), 0) AS avg_recency_days,
    RANK() OVER (ORDER BY SUM(Monetary) DESC) AS revenue_rank
FROM customer_rfm
GROUP BY Segment
ORDER BY revenue DESC;

-- 3. Revenue concentration: what share of total revenue comes from the top
--    10% of customers by spend? (classic Pareto check via NTILE)
WITH ranked AS (
    SELECT CustomerID, Monetary, NTILE(10) OVER (ORDER BY Monetary DESC) AS decile
    FROM customer_rfm
)
SELECT
    ROUND(100.0 * SUM(CASE WHEN decile = 1 THEN Monetary ELSE 0 END) / SUM(Monetary), 1) AS top_10pct_revenue_share
FROM ranked;

-- 4. Monthly revenue trend with month-over-month change (LAG window function)
WITH monthly AS (
    SELECT strftime('%Y-%m', InvoiceDate) AS month, SUM(Quantity * UnitPrice) AS revenue
    FROM transactions
    GROUP BY month
)
SELECT
    month,
    ROUND(revenue, 0) AS revenue,
    ROUND(revenue - LAG(revenue) OVER (ORDER BY month), 0) AS mom_change
FROM monthly
ORDER BY month;

-- 5. Top 10 products by revenue
SELECT
    Description,
    SUM(Quantity) AS units_sold,
    ROUND(SUM(Quantity * UnitPrice), 0) AS revenue
FROM transactions
GROUP BY Description
ORDER BY revenue DESC
LIMIT 10;

-- 6. Country-level revenue outside the UK (the dataset is UK-dominated;
--    this isolates international performance)
SELECT
    Country,
    COUNT(DISTINCT CustomerID) AS customers,
    ROUND(SUM(Quantity * UnitPrice), 0) AS revenue
FROM transactions
WHERE Country != 'United Kingdom'
GROUP BY Country
ORDER BY revenue DESC
LIMIT 10;

-- 7. "At Risk" customers worth the most — a ready-to-export outreach list
--    (highest monetary value among customers whose recency has slipped)
SELECT CustomerID, Recency, Frequency, ROUND(Monetary, 0) AS Monetary
FROM customer_rfm
WHERE Segment = 'At Risk'
ORDER BY Monetary DESC
LIMIT 10;
