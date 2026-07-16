
### HR Analytics Dashboard — Personal Data Analytics Project

| headcount | leavers | attrition_rate_pct |
|---|---|---|
| 1470 | 237 | 16.1 |

### 2. Attrition rate by department, ranked

| Department | headcount | attrition_rate_pct | attrition_rank |
|---|---|---|---|
| Sales | 446 | 20.6 | 1 |
| Human Resources | 63 | 19.0 | 2 |
| Research & Development | 961 | 13.8 | 3 |

### 3. Job roles with above-average attrition (uses a window function for the

| JobRole | headcount | attrition_rate_pct | company_avg_pct |
|---|---|---|---|
| Sales Representative | 83 | 39.8 | 16.1 |
| Laboratory Technician | 259 | 23.9 | 16.1 |
| Human Resources | 52 | 23.1 | 16.1 |
| Sales Executive | 326 | 17.5 | 16.1 |

### 4. Overtime is the strongest single-field signal in this dataset

| OverTime | headcount | attrition_rate_pct | avg_monthly_income |
|---|---|---|---|
| No | 1054 | 10.4 | 6485.0 |
| Yes | 416 | 30.5 | 6549.0 |

### 5. Attrition by tenure band, with running (cumulative) headcount lost —

| TenureBand | leavers | cumulative_leavers |
|---|---|---|
| 0-2 yrs | 102 | 102 |
| 3-5 yrs | 60 | 162 |
| 6-10 yrs | 55 | 217 |
| 11-20 yrs | 12 | 229 |
| 20+ yrs | 8 | 237 |

### 6. Compensation gap between employees who stayed vs left, by department

| Department | avg_income_stayed | avg_income_left | income_gap |
|---|---|---|---|
| Human Resources | 7346.0 | 3716.0 | 3630.0 |
| Research & Development | 6630.0 | 4108.0 | 2522.0 |
| Sales | 7232.0 | 5908.0 | 1324.0 |

### 7. Flight-risk segment: below-average satisfaction AND overtime AND under

| at_risk_employees | attrition_rate_in_segment_pct |
|---|---|
| 56 | 55.4 |
