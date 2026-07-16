-- SQL Business Intelligence Analysis — Personal Data Analytics Project
-- Query library against the public Chinook sample database
-- (a digital media store: customers, invoices, tracks, albums, artists, genres)
-- Dialect: SQLite. Run with: sqlite3 ../data/cleaned/chinook.sqlite < queries.sql
-- Source: https://github.com/lerocha/chinook-database

-- 1. Headline KPIs
SELECT
    COUNT(DISTINCT i.InvoiceId) AS orders,
    COUNT(DISTINCT i.CustomerId) AS customers,
    ROUND(SUM(i.Total), 2) AS total_revenue,
    ROUND(AVG(i.Total), 2) AS avg_order_value
FROM Invoice i;

-- 2. Revenue by genre, ranked (RANK window function)
SELECT
    g.Name AS Genre,
    ROUND(SUM(il.UnitPrice * il.Quantity), 2) AS revenue,
    COUNT(DISTINCT il.InvoiceLineId) AS tracks_sold,
    RANK() OVER (ORDER BY SUM(il.UnitPrice * il.Quantity) DESC) AS revenue_rank
FROM InvoiceLine il
JOIN Track t ON t.TrackId = il.TrackId
JOIN Genre g ON g.GenreId = t.GenreId
GROUP BY g.Name
ORDER BY revenue DESC
LIMIT 10;

-- 3. Top 10 artists by revenue (multi-table join: InvoiceLine -> Track -> Album -> Artist)
SELECT
    ar.Name AS Artist,
    ROUND(SUM(il.UnitPrice * il.Quantity), 2) AS revenue,
    COUNT(DISTINCT il.TrackId) AS unique_tracks_sold
FROM InvoiceLine il
JOIN Track t ON t.TrackId = il.TrackId
JOIN Album al ON al.AlbumId = t.AlbumId
JOIN Artist ar ON ar.ArtistId = al.ArtistId
GROUP BY ar.Name
ORDER BY revenue DESC
LIMIT 10;

-- 4. Revenue by country, with each country's share of total revenue
--    (window function for a grand-total denominator alongside grouped rows)
SELECT
    BillingCountry AS Country,
    ROUND(SUM(Total), 2) AS revenue,
    ROUND(100.0 * SUM(Total) / SUM(SUM(Total)) OVER (), 1) AS pct_of_total
FROM Invoice
GROUP BY BillingCountry
ORDER BY revenue DESC
LIMIT 10;

-- 5. Customer lifetime value leaderboard with a running cumulative share
--    (classic Pareto / running-total pattern)
WITH customer_revenue AS (
    SELECT
        c.CustomerId,
        c.FirstName || ' ' || c.LastName AS Customer,
        SUM(i.Total) AS revenue
    FROM Customer c
    JOIN Invoice i ON i.CustomerId = c.CustomerId
    GROUP BY c.CustomerId
)
SELECT
    Customer,
    ROUND(revenue, 2) AS revenue,
    ROUND(SUM(revenue) OVER (ORDER BY revenue DESC) * 100.0 / SUM(revenue) OVER (), 1) AS cumulative_pct
FROM customer_revenue
ORDER BY revenue DESC
LIMIT 10;

-- 6. Monthly revenue trend with month-over-month growth (LAG window function)
WITH monthly AS (
    SELECT strftime('%Y-%m', InvoiceDate) AS month, SUM(Total) AS revenue
    FROM Invoice
    GROUP BY month
)
SELECT
    month,
    ROUND(revenue, 2) AS revenue,
    ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month)) / LAG(revenue) OVER (ORDER BY month), 1) AS mom_growth_pct
FROM monthly
ORDER BY month;

-- 7. Sales rep performance — each support rep's total managed customer
--    revenue (join through Customer.SupportRepId to Employee)
SELECT
    e.FirstName || ' ' || e.LastName AS SalesRep,
    COUNT(DISTINCT c.CustomerId) AS customers_managed,
    ROUND(SUM(i.Total), 2) AS revenue_managed
FROM Employee e
JOIN Customer c ON c.SupportRepId = e.EmployeeId
JOIN Invoice i ON i.CustomerId = c.CustomerId
GROUP BY e.EmployeeId
ORDER BY revenue_managed DESC;

-- 8. Average tracks per invoice by country — a proxy for basket size, not
--    just revenue (business question: do some markets buy more per order?)
SELECT
    i.BillingCountry AS Country,
    COUNT(DISTINCT i.InvoiceId) AS orders,
    ROUND(CAST(COUNT(il.InvoiceLineId) AS FLOAT) / COUNT(DISTINCT i.InvoiceId), 2) AS avg_tracks_per_order
FROM Invoice i
JOIN InvoiceLine il ON il.InvoiceId = i.InvoiceId
GROUP BY i.BillingCountry
HAVING COUNT(DISTINCT i.InvoiceId) >= 5
ORDER BY avg_tracks_per_order DESC
LIMIT 10;

-- 9. Customers who have never bought from the top-selling genre (Rock) —
--    a cross-sell target list (NOT IN / anti-join pattern)
SELECT DISTINCT c.CustomerId, c.FirstName || ' ' || c.LastName AS Customer, c.Country
FROM Customer c
WHERE c.CustomerId NOT IN (
    SELECT DISTINCT i.CustomerId
    FROM Invoice i
    JOIN InvoiceLine il ON il.InvoiceId = i.InvoiceId
    JOIN Track t ON t.TrackId = il.TrackId
    JOIN Genre g ON g.GenreId = t.GenreId
    WHERE g.Name = 'Rock'
)
ORDER BY c.CustomerId
LIMIT 10;
