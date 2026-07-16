
### Recruitment Analytics Dashboard — Personal Data Analytics Project

| RecruitmentSource | hires | terminations | termination_rate_pct | volume_rank |
|---|---|---|---|---|
| Indeed | 87 | 21 | 24.1 | 1 |
| LinkedIn | 76 | 18 | 23.7 | 2 |
| Google Search | 49 | 30 | 61.2 | 3 |
| Employee Referral | 31 | 5 | 16.1 | 4 |
| Diversity Job Fair | 29 | 16 | 55.2 | 5 |
| CareerBuilder | 23 | 11 | 47.8 | 6 |
| Website | 13 | 1 | 7.7 | 7 |
| Other | 2 | 1 | 50.0 | 8 |
| On-line Web application | 1 | 1 | 100.0 | 9 |

### 2. Source quality: sources with above-average engagement AND below-average

| RecruitmentSource | hires | avg_engagement | termination_rate_pct |
|---|---|---|---|
| LinkedIn | 76 | 4.14 | 23.7 |
| Employee Referral | 31 | 4.19 | 16.1 |
| Website | 13 | 4.22 | 7.7 |

### 3. Hiring trend by year, with year-over-year change (window function LAG)

| HireYear | hires | yoy_change |
|---|---|---|
| 2006 | 1 | None |
| 2007 | 2 | 1 |
| 2008 | 3 | 1 |
| 2009 | 7 | 4 |
| 2010 | 9 | 2 |
| 2011 | 83 | 74 |
| 2012 | 45 | -38 |
| 2013 | 44 | -1 |
| 2014 | 60 | 16 |
| 2015 | 36 | -24 |
| 2016 | 14 | -22 |
| 2017 | 6 | -8 |
| 2018 | 1 | -5 |

### 4. Diversity job fair vs. standard sourcing — hires, termination rate, and

| channel | hires | termination_rate_pct | avg_engagement |
|---|---|---|---|
| Diversity Job Fair | 29 | 55.2 | 4.08 |
| Standard Sourcing | 282 | 31.2 | 4.11 |

### 5. Department headcount with each department's top recruitment source

| Department | headcount | top_source |
|---|---|---|
| Production | 209 | LinkedIn |
| IT/IS | 50 | Indeed |
| Sales | 31 | Indeed |
| Software Engineering | 11 | Indeed |
| Admin Offices | 9 | Diversity Job Fair |
| Executive Office | 1 | Indeed |

### 6. Performance score distribution among currently active employees only

| PerformanceScore | employees | pct_of_active |
|---|---|---|
| Fully Meets | 162 | 78.3 |
| Exceeds | 29 | 14.0 |
| Needs Improvement | 8 | 3.9 |
| PIP | 8 | 3.9 |
