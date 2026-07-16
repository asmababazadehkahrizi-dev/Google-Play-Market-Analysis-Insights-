-- Recruitment Analytics Dashboard — Personal Data Analytics Project
-- SQL analysis against the cleaned `hires` table (data/cleaned/recruitment_analytics.db)
-- Dialect: SQLite. Run with: sqlite3 ../data/cleaned/recruitment_analytics.db < queries.sql

-- 1. Hiring volume and termination rate by recruitment source, ranked
SELECT
    RecruitmentSource,
    COUNT(*) AS hires,
    SUM(Terminated) AS terminations,
    ROUND(100.0 * SUM(Terminated) / COUNT(*), 1) AS termination_rate_pct,
    RANK() OVER (ORDER BY COUNT(*) DESC) AS volume_rank
FROM hires
GROUP BY RecruitmentSource
ORDER BY hires DESC;

-- 2. Source quality: sources with above-average engagement AND below-average
--    termination — the "keep investing here" list
WITH source_stats AS (
    SELECT
        RecruitmentSource,
        COUNT(*) AS hires,
        AVG(EngagementSurvey) AS avg_engagement,
        AVG(Terminated) * 100 AS termination_rate_pct
    FROM hires
    GROUP BY RecruitmentSource
    HAVING COUNT(*) >= 10          -- ignore very small-sample sources
),
overall AS (
    SELECT AVG(EngagementSurvey) AS avg_engagement, AVG(Terminated) * 100 AS termination_rate_pct
    FROM hires
)
SELECT s.RecruitmentSource, s.hires, ROUND(s.avg_engagement, 2) AS avg_engagement,
       ROUND(s.termination_rate_pct, 1) AS termination_rate_pct
FROM source_stats s, overall o
WHERE s.avg_engagement >= o.avg_engagement
  AND s.termination_rate_pct <= o.termination_rate_pct
ORDER BY s.hires DESC;

-- 3. Hiring trend by year, with year-over-year change (window function LAG)
SELECT
    HireYear,
    hires,
    hires - LAG(hires) OVER (ORDER BY HireYear) AS yoy_change
FROM (
    SELECT HireYear, COUNT(*) AS hires
    FROM hires
    WHERE HireYear IS NOT NULL
    GROUP BY HireYear
)
ORDER BY HireYear;

-- 4. Diversity job fair vs. standard sourcing — hires, termination rate, and
--    average engagement side by side
SELECT
    CASE WHEN FromDiversityJobFair = 1 THEN 'Diversity Job Fair' ELSE 'Standard Sourcing' END AS channel,
    COUNT(*) AS hires,
    ROUND(100.0 * SUM(Terminated) / COUNT(*), 1) AS termination_rate_pct,
    ROUND(AVG(EngagementSurvey), 2) AS avg_engagement
FROM hires
GROUP BY channel;

-- 5. Department headcount with each department's top recruitment source
--    (a correlated subquery — one of the classic SQL interview patterns)
SELECT
    Department,
    COUNT(*) AS headcount,
    (
        SELECT h2.RecruitmentSource
        FROM hires h2
        WHERE h2.Department = h1.Department
        GROUP BY h2.RecruitmentSource
        ORDER BY COUNT(*) DESC
        LIMIT 1
    ) AS top_source
FROM hires h1
GROUP BY Department
ORDER BY headcount DESC;

-- 6. Performance score distribution among currently active employees only
SELECT
    PerformanceScore,
    COUNT(*) AS employees,
    ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 1) AS pct_of_active
FROM hires
WHERE Terminated = 0
GROUP BY PerformanceScore
ORDER BY employees DESC;
