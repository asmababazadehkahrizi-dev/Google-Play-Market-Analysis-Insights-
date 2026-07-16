-- HR Analytics Dashboard — Personal Data Analytics Project
-- SQL analysis against the cleaned `employees` table (data/cleaned/hr_analytics.db)
-- Dialect: SQLite. Run with: sqlite3 ../data/cleaned/hr_analytics.db < queries.sql

-- 1. Headline attrition rate
SELECT
    COUNT(*) AS headcount,
    SUM(Attrition) AS leavers,
    ROUND(100.0 * SUM(Attrition) / COUNT(*), 1) AS attrition_rate_pct
FROM employees;

-- 2. Attrition rate by department, ranked
SELECT
    Department,
    COUNT(*) AS headcount,
    ROUND(100.0 * SUM(Attrition) / COUNT(*), 1) AS attrition_rate_pct,
    RANK() OVER (ORDER BY 100.0 * SUM(Attrition) / COUNT(*) DESC) AS attrition_rank
FROM employees
GROUP BY Department
ORDER BY attrition_rate_pct DESC;

-- 3. Job roles with above-average attrition (uses a window function for the
--    company-wide average so every row can compare against it)
WITH company_avg AS (
    SELECT AVG(Attrition) * 100 AS avg_attrition_pct FROM employees
),
role_stats AS (
    SELECT
        JobRole,
        COUNT(*) AS headcount,
        ROUND(100.0 * SUM(Attrition) / COUNT(*), 1) AS attrition_rate_pct
    FROM employees
    GROUP BY JobRole
)
SELECT r.JobRole, r.headcount, r.attrition_rate_pct, ROUND(c.avg_attrition_pct, 1) AS company_avg_pct
FROM role_stats r, company_avg c
WHERE r.attrition_rate_pct > c.avg_attrition_pct
ORDER BY r.attrition_rate_pct DESC;

-- 4. Overtime is the strongest single-field signal in this dataset
SELECT
    OverTime,
    COUNT(*) AS headcount,
    ROUND(100.0 * SUM(Attrition) / COUNT(*), 1) AS attrition_rate_pct,
    ROUND(AVG(MonthlyIncome), 0) AS avg_monthly_income
FROM employees
GROUP BY OverTime;

-- 5. Attrition by tenure band, with running (cumulative) headcount lost —
--    demonstrates a window function for a running total
SELECT
    TenureBand,
    SUM(Attrition) AS leavers,
    SUM(SUM(Attrition)) OVER (ORDER BY
        CASE TenureBand
            WHEN '0-2 yrs' THEN 1 WHEN '3-5 yrs' THEN 2 WHEN '6-10 yrs' THEN 3
            WHEN '11-20 yrs' THEN 4 ELSE 5
        END
    ) AS cumulative_leavers
FROM employees
GROUP BY TenureBand
ORDER BY
    CASE TenureBand
        WHEN '0-2 yrs' THEN 1 WHEN '3-5 yrs' THEN 2 WHEN '6-10 yrs' THEN 3
        WHEN '11-20 yrs' THEN 4 ELSE 5
    END;

-- 6. Compensation gap between employees who stayed vs left, by department
SELECT
    Department,
    ROUND(AVG(CASE WHEN Attrition = 0 THEN MonthlyIncome END), 0) AS avg_income_stayed,
    ROUND(AVG(CASE WHEN Attrition = 1 THEN MonthlyIncome END), 0) AS avg_income_left,
    ROUND(
        AVG(CASE WHEN Attrition = 0 THEN MonthlyIncome END)
        - AVG(CASE WHEN Attrition = 1 THEN MonthlyIncome END), 0
    ) AS income_gap
FROM employees
GROUP BY Department
ORDER BY income_gap DESC;

-- 7. Flight-risk segment: below-average satisfaction AND overtime AND under
--    3 years tenure — the highest-risk combination for retention outreach
SELECT
    COUNT(*) AS at_risk_employees,
    ROUND(100.0 * SUM(Attrition) / COUNT(*), 1) AS attrition_rate_in_segment_pct
FROM employees
WHERE OverTime = 'Yes'
  AND JobSatisfaction <= 2
  AND YearsAtCompany <= 3;
