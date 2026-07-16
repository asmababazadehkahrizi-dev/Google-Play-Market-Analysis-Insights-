-- Sales Performance Dashboard — Personal Data Analytics Project
-- SQL analysis against the cleaned `orders` table (data/cleaned/sales_performance.db)
-- Dialect: SQLite. Run with: sqlite3 ../data/cleaned/sales_performance.db < queries.sql

-- 1. Headline KPIs
SELECT
    ROUND(SUM(Sales), 0) AS total_sales,
    ROUND(SUM(Profit), 0) AS total_profit,
    ROUND(100.0 * SUM(Profit) / SUM(Sales), 1) AS profit_margin_pct,
    COUNT(DISTINCT "Order ID") AS orders
FROM orders;

-- 2. Sales and profit by region, ranked by sales
SELECT
    Region,
    ROUND(SUM(Sales), 0) AS sales,
    ROUND(SUM(Profit), 0) AS profit,
    ROUND(100.0 * SUM(Profit) / SUM(Sales), 1) AS margin_pct,
    RANK() OVER (ORDER BY SUM(Sales) DESC) AS sales_rank
FROM orders
GROUP BY Region
ORDER BY sales DESC;

-- 3. Sub-categories that lose money — every one with negative total profit
SELECT
    "Sub-Category",
    ROUND(SUM(Sales), 0) AS sales,
    ROUND(SUM(Profit), 0) AS profit,
    ROUND(AVG(Discount) * 100, 1) AS avg_discount_pct
FROM orders
GROUP BY "Sub-Category"
HAVING SUM(Profit) < 0
ORDER BY profit ASC;

-- 4. Running monthly sales total for the most recent year in the data
--    (window function: cumulative SUM over a running frame)
WITH monthly AS (
    SELECT strftime('%Y-%m', "Order Date") AS month, SUM(Sales) AS sales
    FROM orders
    WHERE "Order Date" >= (SELECT date(MAX("Order Date"), '-11 months') FROM orders)
    GROUP BY month
)
SELECT
    month,
    ROUND(sales, 0) AS sales,
    ROUND(SUM(sales) OVER (ORDER BY month), 0) AS running_total
FROM monthly
ORDER BY month;

-- 5. Top 10 customers by profit contribution (not just revenue — a customer
--    can be high-revenue and still unprofitable after discounts)
SELECT
    "Customer Name",
    COUNT(DISTINCT "Order ID") AS orders,
    ROUND(SUM(Sales), 0) AS sales,
    ROUND(SUM(Profit), 0) AS profit
FROM orders
GROUP BY "Customer Name"
ORDER BY profit DESC
LIMIT 10;

-- 6. Discount band vs. average profit margin — quantifies the discount
--    threshold where orders flip from profitable to loss-making
SELECT
    CASE
        WHEN Discount = 0 THEN '0%'
        WHEN Discount <= 0.1 THEN '1-10%'
        WHEN Discount <= 0.2 THEN '11-20%'
        WHEN Discount <= 0.3 THEN '21-30%'
        WHEN Discount <= 0.5 THEN '31-50%'
        ELSE '50%+'
    END AS discount_band,
    COUNT(*) AS line_items,
    ROUND(AVG(Profit / NULLIF(Sales, 0)) * 100, 1) AS avg_margin_pct
FROM orders
GROUP BY discount_band
ORDER BY MIN(Discount);

-- 7. Ship mode performance: does faster shipping correlate with order value?
SELECT
    "Ship Mode",
    COUNT(*) AS line_items,
    ROUND(AVG(Sales), 0) AS avg_sale_value,
    ROUND(AVG(julianday("Ship Date") - julianday("Order Date")), 1) AS avg_days_to_ship
FROM orders
GROUP BY "Ship Mode"
ORDER BY avg_days_to_ship;
