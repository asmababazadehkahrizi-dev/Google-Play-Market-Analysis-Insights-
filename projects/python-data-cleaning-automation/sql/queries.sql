-- Python Data Cleaning Automation — Personal Data Analytics Project
-- SQL analysis against the cleaned `apps` table (data/cleaned/playstore_apps.db)
-- Dialect: SQLite. Run with: sqlite3 ../data/cleaned/playstore_apps.db < queries.sql

-- 1. Data quality snapshot on the cleaned table (should be ~0 invalid values
--    now that Installs/Price/SizeMB are proper numerics and ratings are
--    bounded 1-5)
SELECT
    COUNT(*) AS total_apps,
    SUM(CASE WHEN Rating IS NULL THEN 1 ELSE 0 END) AS missing_rating,
    SUM(CASE WHEN Rating < 1 OR Rating > 5 THEN 1 ELSE 0 END) AS out_of_range_rating,
    SUM(CASE WHEN SizeMB IS NULL THEN 1 ELSE 0 END) AS missing_size
FROM apps;

-- 2. Top-rated categories with a meaningful sample size (avoids a category
--    with 2 apps and a lucky 5.0 average topping the list)
SELECT
    Category,
    COUNT(*) AS app_count,
    ROUND(AVG(Rating), 2) AS avg_rating
FROM apps
WHERE Rating IS NOT NULL
GROUP BY Category
HAVING COUNT(*) >= 50
ORDER BY avg_rating DESC
LIMIT 10;

-- 3. Install volume vs. rating by category, ranked by total installs
--    (RANK window function)
SELECT
    Category,
    SUM(Installs) AS total_installs,
    ROUND(AVG(Rating), 2) AS avg_rating,
    RANK() OVER (ORDER BY SUM(Installs) DESC) AS install_rank
FROM apps
GROUP BY Category
ORDER BY total_installs DESC
LIMIT 10;

-- 4. Free vs. paid: rating and install comparison
SELECT
    Type,
    COUNT(*) AS apps,
    ROUND(AVG(Rating), 2) AS avg_rating,
    ROUND(AVG(Installs), 0) AS avg_installs
FROM apps
GROUP BY Type;

-- 5. Highest-value paid apps: highly rated AND widely installed despite a
--    price tag (a simple correlated-subquery pattern to find outliers per
--    category)
SELECT a.App, a.Category, a.Price, a.Rating, a.Installs
FROM apps a
WHERE a.Type = 'Paid'
  AND a.Rating >= 4.5
  AND a.Installs >= (
      SELECT AVG(Installs) FROM apps a2 WHERE a2.Category = a.Category AND a2.Type = 'Paid'
  )
ORDER BY a.Installs DESC
LIMIT 10;

-- 6. Content rating distribution — what share of the store targets each
--    audience
SELECT
    "Content Rating",
    COUNT(*) AS apps,
    ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) AS pct_of_store
FROM apps
GROUP BY "Content Rating"
ORDER BY apps DESC;
