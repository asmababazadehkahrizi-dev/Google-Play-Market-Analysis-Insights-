
### Sales Performance Dashboard — Personal Data Analytics Project

| total_sales | total_profit | profit_margin_pct | orders |
|---|---|---|---|
| 2297201.0 | 286397.0 | 12.5 | 5009 |

### 2. Sales and profit by region, ranked by sales

| Region | sales | profit | margin_pct | sales_rank |
|---|---|---|---|---|
| West | 725458.0 | 108418.0 | 14.9 | 1 |
| East | 678781.0 | 91523.0 | 13.5 | 2 |
| Central | 501240.0 | 39706.0 | 7.9 | 3 |
| South | 391722.0 | 46749.0 | 11.9 | 4 |

### 3. Sub-categories that lose money — every one with negative total profit

| Sub-Category | sales | profit | avg_discount_pct |
|---|---|---|---|
| Tables | 206966.0 | -17725.0 | 26.1 |
| Bookcases | 114880.0 | -3473.0 | 21.1 |
| Supplies | 46674.0 | -1189.0 | 7.7 |

### 4. Running monthly sales total for the most recent year in the data

| month | sales | running_total |
|---|---|---|
| 2018-01 | 3749.0 | 3749.0 |
| 2018-02 | 20301.0 | 24050.0 |
| 2018-03 | 58872.0 | 82923.0 |
| 2018-04 | 36522.0 | 119444.0 |
| 2018-05 | 44261.0 | 163705.0 |
| 2018-06 | 52982.0 | 216687.0 |
| 2018-07 | 45264.0 | 261952.0 |
| 2018-08 | 63121.0 | 325072.0 |
| 2018-09 | 87867.0 | 412939.0 |
| 2018-10 | 77777.0 | 490716.0 |
| 2018-11 | 118448.0 | 609164.0 |
| 2018-12 | 83829.0 | 692993.0 |

### 5. Top 10 customers by profit contribution (not just revenue — a customer

| Customer Name | orders | sales | profit |
|---|---|---|---|
| Tamara Chand | 5 | 19052.0 | 8981.0 |
| Raymond Buch | 6 | 15117.0 | 6976.0 |
| Sanjit Chand | 9 | 14142.0 | 5757.0 |
| Hunter Lopez | 6 | 12873.0 | 5622.0 |
| Adrian Barton | 10 | 14474.0 | 5445.0 |
| Tom Ashbrook | 4 | 14596.0 | 4704.0 |
| Christopher Martinez | 4 | 8954.0 | 3900.0 |
| Keith Dawkins | 12 | 8181.0 | 3039.0 |
| Andy Reiter | 6 | 6608.0 | 2885.0 |
| Daniel Raglin | 8 | 8351.0 | 2869.0 |

### 6. Discount band vs. average profit margin — quantifies the discount

| discount_band | line_items | avg_margin_pct |
|---|---|---|
| 0% | 4798 | 34.0 |
| 1-10% | 94 | 15.6 |
| 11-20% | 3709 | 17.5 |
| 21-30% | 227 | -11.5 |
| 31-50% | 310 | -29.6 |
| 50%+ | 856 | -113.9 |

### 7. Ship mode performance: does faster shipping correlate with order value?

| Ship Mode | line_items | avg_sale_value | avg_days_to_ship |
|---|---|---|---|
| Same Day | 543 | 236.0 | 0.0 |
| First Class | 1538 | 228.0 | 2.2 |
| Second Class | 1945 | 236.0 | 3.2 |
| Standard Class | 5968 | 228.0 | 5.0 |
