
### SQL Business Intelligence Analysis — Personal Data Analytics Project

| orders | customers | total_revenue | avg_order_value |
|---|---|---|---|
| 412 | 59 | 2328.6 | 5.65 |

### 2. Revenue by genre, ranked (RANK window function)

| Genre | revenue | tracks_sold | revenue_rank |
|---|---|---|---|
| Rock | 826.65 | 835 | 1 |
| Latin | 382.14 | 386 | 2 |
| Metal | 261.36 | 264 | 3 |
| Alternative & Punk | 241.56 | 244 | 4 |
| TV Shows | 93.53 | 47 | 5 |
| Jazz | 79.2 | 80 | 6 |
| Blues | 60.39 | 61 | 7 |
| Drama | 57.71 | 29 | 8 |
| R&B/Soul | 40.59 | 41 | 9 |
| Classical | 40.59 | 41 | 9 |

### 3. Top 10 artists by revenue (multi-table join: InvoiceLine -> Track -> Album -> Artist)

| Artist | revenue | unique_tracks_sold |
|---|---|---|
| Iron Maiden | 138.6 | 123 |
| U2 | 105.93 | 91 |
| Metallica | 90.09 | 79 |
| Led Zeppelin | 86.13 | 77 |
| Lost | 81.59 | 40 |
| The Office | 49.75 | 22 |
| Os Paralamas Do Sucesso | 44.55 | 39 |
| Deep Purple | 43.56 | 41 |
| Faith No More | 41.58 | 36 |
| Eric Clapton | 39.6 | 35 |

### 4. Revenue by country, with each country's share of total revenue

| Country | revenue | pct_of_total |
|---|---|---|
| USA | 523.06 | 22.5 |
| Canada | 303.96 | 13.1 |
| France | 195.1 | 8.4 |
| Brazil | 190.1 | 8.2 |
| Germany | 156.48 | 6.7 |
| United Kingdom | 112.86 | 4.8 |
| Czech Republic | 90.24 | 3.9 |
| Portugal | 77.24 | 3.3 |
| India | 75.26 | 3.2 |
| Chile | 46.62 | 2.0 |

### 5. Customer lifetime value leaderboard with a running cumulative share

| Customer | revenue | cumulative_pct |
|---|---|---|
| Helena Holý | 49.62 | 2.1 |
| Richard Cunningham | 47.62 | 4.2 |
| Luis Rojas | 46.62 | 6.2 |
| Ladislav Kovács | 45.62 | 10.1 |
| Hugh O'Reilly | 45.62 | 10.1 |
| Frank Ralston | 43.62 | 15.7 |
| Julia Barnett | 43.62 | 15.7 |
| Fynn Zimmermann | 43.62 | 15.7 |
| Astrid Gruber | 42.62 | 19.4 |
| Victor Stevens | 42.62 | 19.4 |

### 6. Monthly revenue trend with month-over-month growth (LAG window function)

| month | revenue | mom_growth_pct |
|---|---|---|
| 2021-01 | 35.64 | None |
| 2021-02 | 37.62 | 5.6 |
| 2021-03 | 37.62 | 0.0 |
| 2021-04 | 37.62 | 0.0 |
| 2021-05 | 37.62 | 0.0 |
| 2021-06 | 37.62 | 0.0 |
| 2021-07 | 37.62 | 0.0 |
| 2021-08 | 37.62 | 0.0 |
| 2021-09 | 37.62 | 0.0 |
| 2021-10 | 37.62 | 0.0 |
| 2021-11 | 37.62 | 0.0 |
| 2021-12 | 37.62 | 0.0 |
| 2022-01 | 52.62 | 39.9 |
| 2022-02 | 46.62 | -11.4 |
| 2022-03 | 44.62 | -4.3 |

_...45 more rows_

### 7. Sales rep performance — each support rep's total managed customer

| SalesRep | customers_managed | revenue_managed |
|---|---|---|
| Jane Peacock | 21 | 833.04 |
| Margaret Park | 20 | 775.4 |
| Steve Johnson | 18 | 720.16 |

### 8. Average tracks per invoice by country — a proxy for basket size, not

| Country | orders | avg_tracks_per_order |
|---|---|---|
| India | 13 | 5.69 |
| United Kingdom | 21 | 5.43 |
| USA | 91 | 5.43 |
| Sweden | 7 | 5.43 |
| Spain | 7 | 5.43 |
| Portugal | 14 | 5.43 |
| Poland | 7 | 5.43 |
| Norway | 7 | 5.43 |
| Netherlands | 7 | 5.43 |
| Italy | 7 | 5.43 |

### 9. Customers who have never bought from the top-selling genre (Rock) —

| CustomerId | Customer | Country |
|---|---|---|
