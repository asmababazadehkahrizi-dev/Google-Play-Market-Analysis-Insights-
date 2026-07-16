"""
SQL Business Intelligence Analysis — Personal Data Analytics Project
Runs the query library against the Chinook database and renders the results
as dashboard chart images. The SQL in queries.sql is the primary artifact;
this script exists to visualize its output, not to do further analysis.
"""

import sqlite3
from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.patches import FancyBboxPatch

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "cleaned" / "chinook.sqlite"
CHARTS = ROOT / "charts"
CHARTS.mkdir(parents=True, exist_ok=True)

INK, SECONDARY, MUTED, GRID = "#0b0b0b", "#52514e", "#898781", "#e1e0d9"
SURFACE, CARD = "#ffffff", "#fafafa"
BLUE, GREEN, RED = "#2a78d6", "#008300", "#e34948"
CATEGORICAL = ["#2a78d6", "#008300", "#e87ba4", "#eda100", "#1baf7a", "#eb6834", "#4a3aa7"]

plt.rcParams.update(
    {
        "font.family": "DejaVu Sans", "text.color": INK, "axes.edgecolor": GRID,
        "axes.labelcolor": SECONDARY, "xtick.color": MUTED, "ytick.color": MUTED,
        "axes.grid": True, "grid.color": GRID, "grid.linewidth": 0.8,
        "axes.axisbelow": True, "figure.facecolor": SURFACE, "savefig.facecolor": SURFACE,
    }
)


def clean_axis(ax):
    for s in ["top", "right", "left"]:
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color(GRID)
    ax.tick_params(length=0)
    ax.grid(axis="x", visible=False)


conn = sqlite3.connect(DB)

kpis = pd.read_sql("""
    SELECT COUNT(DISTINCT i.InvoiceId) AS orders, COUNT(DISTINCT i.CustomerId) AS customers,
           ROUND(SUM(i.Total), 2) AS total_revenue, ROUND(AVG(i.Total), 2) AS avg_order_value
    FROM Invoice i
""", conn).iloc[0]

genre_rev = pd.read_sql("""
    SELECT g.Name AS Genre, SUM(il.UnitPrice * il.Quantity) AS revenue
    FROM InvoiceLine il
    JOIN Track t ON t.TrackId = il.TrackId
    JOIN Genre g ON g.GenreId = t.GenreId
    GROUP BY g.Name ORDER BY revenue DESC LIMIT 8
""", conn)

artist_rev = pd.read_sql("""
    SELECT ar.Name AS Artist, SUM(il.UnitPrice * il.Quantity) AS revenue
    FROM InvoiceLine il
    JOIN Track t ON t.TrackId = il.TrackId
    JOIN Album al ON al.AlbumId = t.AlbumId
    JOIN Artist ar ON ar.ArtistId = al.ArtistId
    GROUP BY ar.Name ORDER BY revenue DESC LIMIT 8
""", conn)

country_rev = pd.read_sql("""
    SELECT BillingCountry AS Country, SUM(Total) AS revenue
    FROM Invoice GROUP BY Country ORDER BY revenue DESC LIMIT 8
""", conn)

rep_perf = pd.read_sql("""
    SELECT e.FirstName || ' ' || e.LastName AS SalesRep,
           COUNT(DISTINCT c.CustomerId) AS customers_managed,
           SUM(i.Total) AS revenue_managed
    FROM Employee e
    JOIN Customer c ON c.SupportRepId = e.EmployeeId
    JOIN Invoice i ON i.CustomerId = c.CustomerId
    GROUP BY e.EmployeeId ORDER BY revenue_managed DESC
""", conn)

customer_ltv = pd.read_sql("""
    SELECT c.FirstName || ' ' || c.LastName AS Customer, SUM(i.Total) AS revenue
    FROM Customer c JOIN Invoice i ON i.CustomerId = c.CustomerId
    GROUP BY c.CustomerId ORDER BY revenue DESC
""", conn)
conn.close()

# ---------------------------------------------------------------------------
# Chart 1 — main dashboard
# ---------------------------------------------------------------------------
fig = plt.figure(figsize=(12, 8), dpi=150)
fig.patch.set_facecolor(SURFACE)
gs = fig.add_gridspec(2, 2, top=0.74, bottom=0.08, height_ratios=[1, 1], hspace=0.55, wspace=0.32)

fig.suptitle("SQL Business Intelligence Analysis — Chinook Media Store", x=0.045, y=0.975,
             ha="left", fontsize=15, fontweight="bold", color=INK)
fig.text(0.045, 0.935, "Personal Data Analytics Project · Chinook sample database (412 orders, 59 customers)",
          fontsize=9.5, color=MUTED)

kpi_values = [
    ("Total Revenue", f"${kpis['total_revenue']:,.2f}"),
    ("Orders", f"{int(kpis['orders'])}"),
    ("Customers", f"{int(kpis['customers'])}"),
    ("Avg Order Value", f"${kpis['avg_order_value']:.2f}"),
]
kpi_ax = fig.add_axes([0.045, 0.80, 0.91, 0.11])
kpi_ax.axis("off")
n = len(kpi_values)
for i, (label, value) in enumerate(kpi_values):
    x = i / n
    box = FancyBboxPatch((x + 0.01, 0.05), 1 / n - 0.03, 0.9, boxstyle="round,pad=0.02,rounding_size=0.02",
                          linewidth=1, edgecolor=GRID, facecolor=CARD, transform=kpi_ax.transAxes)
    kpi_ax.add_patch(box)
    kpi_ax.text(x + 0.035, 0.62, label, transform=kpi_ax.transAxes, fontsize=8.5, color=MUTED)
    kpi_ax.text(x + 0.035, 0.22, value, transform=kpi_ax.transAxes, fontsize=15, fontweight="bold", color=INK)

ax1 = fig.add_subplot(gs[0, 0])
gr = genre_rev.sort_values("revenue")
bars = ax1.barh(gr["Genre"], gr["revenue"], color=BLUE, height=0.55)
ax1.set_title("Revenue by genre", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars, gr["revenue"]):
    ax1.text(bar.get_width() + 8, bar.get_y() + bar.get_height() / 2, f"${v:.0f}", va="center", fontsize=8, color=SECONDARY)
clean_axis(ax1)
ax1.set_xticks([])
ax1.tick_params(axis="y", labelsize=8)

ax2 = fig.add_subplot(gs[0, 1])
ar_ = artist_rev.sort_values("revenue")
bars2 = ax2.barh(ar_["Artist"], ar_["revenue"], color=CATEGORICAL[1], height=0.55)
ax2.set_title("Top artists by revenue", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars2, ar_["revenue"]):
    ax2.text(bar.get_width() + 1.5, bar.get_y() + bar.get_height() / 2, f"${v:.0f}", va="center", fontsize=8, color=SECONDARY)
clean_axis(ax2)
ax2.set_xticks([])
ax2.tick_params(axis="y", labelsize=8)

ax3 = fig.add_subplot(gs[1, 0])
cr = country_rev.sort_values("revenue")
bars3 = ax3.barh(cr["Country"], cr["revenue"], color=CATEGORICAL[4], height=0.55)
ax3.set_title("Revenue by country", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars3, cr["revenue"]):
    ax3.text(bar.get_width() + 6, bar.get_y() + bar.get_height() / 2, f"${v:.0f}", va="center", fontsize=8, color=SECONDARY)
clean_axis(ax3)
ax3.set_xticks([])
ax3.tick_params(axis="y", labelsize=8)

ax4 = fig.add_subplot(gs[1, 1])
bars4 = ax4.bar(rep_perf["SalesRep"], rep_perf["revenue_managed"], color=CATEGORICAL[3], width=0.5)
ax4.set_title("Revenue managed by sales rep", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars4, rep_perf["revenue_managed"]):
    ax4.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 12, f"${v:.0f}", ha="center", fontsize=8.5, color=SECONDARY)
clean_axis(ax4)
ax4.set_yticks([])
ax4.tick_params(axis="x", labelsize=8, rotation=12)

fig.savefig(CHARTS / "01_dashboard_overview.png", bbox_inches="tight")
plt.close(fig)

# ---------------------------------------------------------------------------
# Chart 2 — customer revenue concentration (Pareto), as two single-axis
# panels rather than a dual-axis combo chart (two y-scales on one plot
# invent an alignment that isn't in the data)
# ---------------------------------------------------------------------------
fig2, axes = plt.subplots(1, 2, figsize=(12, 5), dpi=150)
fig2.patch.set_facecolor(SURFACE)
fig2.suptitle("Customer Revenue Concentration", x=0.045, y=1.03, ha="left",
              fontsize=13.5, fontweight="bold", color=INK)

sorted_ltv = customer_ltv.sort_values("revenue", ascending=False).reset_index(drop=True)
top20 = sorted_ltv.head(20)
cum_pct = sorted_ltv["revenue"].cumsum() / sorted_ltv["revenue"].sum() * 100

ax = axes[0]
ax.bar(range(len(top20)), top20["revenue"], color=BLUE, width=0.7)
ax.set_title("Top 20 customers by lifetime revenue ($)", loc="left", fontsize=10.5, color=INK, pad=8)
ax.set_xlabel("Customers, ranked highest to lowest", fontsize=8.5)
clean_axis(ax)
ax.set_xticks([])

ax = axes[1]
ax.plot(range(len(sorted_ltv)), cum_pct.values, color=RED, linewidth=2)
ax.fill_between(range(len(sorted_ltv)), cum_pct.values, color=RED, alpha=0.08)
ax.set_title("Cumulative % of revenue, all 59 customers", loc="left", fontsize=10.5, color=INK, pad=8)
ax.set_xlabel("Customers, ranked highest to lowest", fontsize=8.5)
ax.set_ylabel("Cumulative % of revenue", fontsize=8.5)
ax.set_ylim(0, 105)
clean_axis(ax)

fig2.tight_layout()
fig2.savefig(CHARTS / "02_customer_concentration.png", bbox_inches="tight")
plt.close(fig2)

print("KPIs:", dict(kpis))
print("Charts written to", CHARTS)
