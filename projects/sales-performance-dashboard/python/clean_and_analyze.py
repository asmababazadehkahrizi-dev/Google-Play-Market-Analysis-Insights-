"""
Sales Performance Dashboard — Personal Data Analytics Project
Cleans the public Sample Superstore dataset and analyzes revenue, profit,
and discount performance across region, category, and time.

Dataset: Sample Superstore (public, ~10,800 rows)
Source: https://github.com/leonism/sample-superstore
"""

from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.patches import FancyBboxPatch

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw" / "superstore_raw.csv"
CLEANED = ROOT / "data" / "cleaned"
CHARTS = ROOT / "charts"
CLEANED.mkdir(parents=True, exist_ok=True)
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


# ---------------------------------------------------------------------------
# Load & clean
# ---------------------------------------------------------------------------
df = pd.read_csv(RAW)
df.columns = [c.strip() for c in df.columns]
df = df.drop_duplicates(subset="Row ID")
df["Order Date"] = pd.to_datetime(df["Order Date"], errors="coerce")
df["Ship Date"] = pd.to_datetime(df["Ship Date"], errors="coerce")
df = df.dropna(subset=["Order Date", "Sales", "Profit"])
df["OrderMonth"] = df["Order Date"].dt.to_period("M").astype(str)
df["ProfitMargin"] = df["Profit"] / df["Sales"]

df.to_csv(CLEANED / "superstore_clean.csv", index=False)

# ---------------------------------------------------------------------------
# KPIs & aggregates
# ---------------------------------------------------------------------------
total_sales = df["Sales"].sum()
total_profit = df["Profit"].sum()
margin = total_profit / total_sales * 100
orders = df["Order ID"].nunique()
avg_order_value = total_sales / orders

by_region = df.groupby("Region").agg(sales=("Sales", "sum"), profit=("Profit", "sum")).sort_values("sales", ascending=False)
by_category = df.groupby("Category").agg(sales=("Sales", "sum"), profit=("Profit", "sum")).sort_values("sales", ascending=False)
by_subcat = (
    df.groupby("Sub-Category").agg(sales=("Sales", "sum"), profit=("Profit", "sum"))
    .sort_values("profit")
)
by_month = df.groupby("OrderMonth")["Sales"].sum().sort_index()

by_region.to_csv(CLEANED / "sales_by_region.csv")
by_category.to_csv(CLEANED / "sales_by_category.csv")
by_subcat.to_csv(CLEANED / "profit_by_subcategory.csv")
by_month.to_csv(CLEANED / "sales_by_month.csv")

kpis = pd.DataFrame({
    "metric": ["Total Sales ($)", "Total Profit ($)", "Profit Margin (%)", "Orders", "Avg Order Value ($)"],
    "value": [round(total_sales, 0), round(total_profit, 0), round(margin, 1), orders, round(avg_order_value, 0)],
})
kpis.to_csv(CLEANED / "kpi_summary.csv", index=False)

# ---------------------------------------------------------------------------
# Chart 1 — main dashboard
# ---------------------------------------------------------------------------
fig = plt.figure(figsize=(12, 8), dpi=150)
fig.patch.set_facecolor(SURFACE)
gs = fig.add_gridspec(2, 2, top=0.74, bottom=0.08, height_ratios=[1, 1], hspace=0.55, wspace=0.32)

fig.suptitle("Sales Performance Dashboard — Revenue & Profitability", x=0.045, y=0.975,
             ha="left", fontsize=15, fontweight="bold", color=INK)
fig.text(0.045, 0.935, f"Personal Data Analytics Project · Sample Superstore dataset ({orders:,} orders, {len(df):,} line items)",
          fontsize=9.5, color=MUTED)

kpi_values = [
    ("Total Sales", f"${total_sales/1e6:.2f}M"),
    ("Total Profit", f"${total_profit/1e3:.0f}K"),
    ("Profit Margin", f"{margin:.1f}%"),
    ("Avg Order Value", f"${avg_order_value:.0f}"),
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
region_sorted = by_region.sort_values("sales")
bars = ax1.barh(region_sorted.index, region_sorted["sales"].values / 1000, color=BLUE, height=0.55)
ax1.set_title("Sales by region ($K)", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars, region_sorted["sales"].values):
    ax1.text(bar.get_width() + 5, bar.get_y() + bar.get_height() / 2, f"${v/1000:.0f}K", va="center", fontsize=8.5, color=SECONDARY)
clean_axis(ax1)
ax1.set_xticks([])

ax2 = fig.add_subplot(gs[0, 1])
month_labels = by_month.index[-24:]
month_vals = by_month.values[-24:]
ax2.plot(range(len(month_vals)), month_vals / 1000, color=BLUE, linewidth=1.8)
ax2.fill_between(range(len(month_vals)), month_vals / 1000, color=BLUE, alpha=0.08)
ax2.set_title("Monthly sales trend, last 24 months ($K)", loc="left", fontsize=10.5, color=INK, pad=8)
step = max(1, len(month_labels) // 6)
ax2.set_xticks(range(0, len(month_labels), step))
ax2.set_xticklabels([month_labels[i] for i in range(0, len(month_labels), step)], rotation=45, fontsize=7.5)
clean_axis(ax2)

ax3 = fig.add_subplot(gs[1, 0])
cat_sorted = by_category.sort_values("sales")
bars3 = ax3.barh(cat_sorted.index, cat_sorted["sales"].values / 1000, color=CATEGORICAL[1], height=0.5)
ax3.set_title("Sales by category ($K)", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars3, cat_sorted["sales"].values):
    ax3.text(bar.get_width() + 8, bar.get_y() + bar.get_height() / 2, f"${v/1000:.0f}K", va="center", fontsize=8.5, color=SECONDARY)
clean_axis(ax3)
ax3.set_xticks([])

ax4 = fig.add_subplot(gs[1, 1])
worst = by_subcat.head(4)
best = by_subcat.tail(4)
combined = pd.concat([worst, best]).sort_values("profit")
colors = [RED if v < 0 else GREEN for v in combined["profit"].values]
bars4 = ax4.barh(combined.index, combined["profit"].values / 1000, color=colors, height=0.55)
ax4.axvline(0, color=GRID, linewidth=1)
ax4.set_title("Most & least profitable sub-categories ($K)", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars4, combined["profit"].values):
    offset = 2 if v >= 0 else -2
    ha = "left" if v >= 0 else "right"
    ax4.text(bar.get_width() + offset, bar.get_y() + bar.get_height() / 2, f"${v/1000:.0f}K", va="center", ha=ha, fontsize=8, color=SECONDARY)
clean_axis(ax4)
ax4.set_xticks([])
ax4.tick_params(axis="y", labelsize=8)
pad = max(combined["profit"].values.max(), abs(combined["profit"].values.min())) / 1000 * 0.45
ax4.set_xlim(combined["profit"].values.min() / 1000 - pad, combined["profit"].values.max() / 1000 + pad)

fig.savefig(CHARTS / "01_dashboard_overview.png", bbox_inches="tight")
plt.close(fig)

# ---------------------------------------------------------------------------
# Chart 2 — discount vs profit detail
# ---------------------------------------------------------------------------
fig2, axes = plt.subplots(1, 2, figsize=(12, 5), dpi=150)
fig2.patch.set_facecolor(SURFACE)
fig2.suptitle("Discounting Impact on Profitability", x=0.045, y=1.03, ha="left",
              fontsize=13.5, fontweight="bold", color=INK)

ax = axes[0]
disc_bins = [-0.01, 0, 0.1, 0.2, 0.3, 0.5, 1]
disc_labels = ["0%", "1-10%", "11-20%", "21-30%", "31-50%", "50%+"]
df["DiscountBand"] = pd.cut(df["Discount"], bins=disc_bins, labels=disc_labels)
disc_margin = df.groupby("DiscountBand", observed=True)["ProfitMargin"].mean() * 100
colors = [GREEN if v >= 0 else RED for v in disc_margin.values]
bars = ax.bar(disc_margin.index.astype(str), disc_margin.values, color=colors, width=0.55)
ax.axhline(0, color=GRID, linewidth=1)
ax.set_title("Avg. profit margin by discount band", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars, disc_margin.values):
    ax.text(bar.get_x() + bar.get_width() / 2, v + (1.5 if v >= 0 else -3.5), f"{v:.0f}%", ha="center", fontsize=8.5, color=SECONDARY)
clean_axis(ax)
ax.set_yticks([])

ax = axes[1]
seg = df.groupby("Segment").agg(sales=("Sales", "sum"), profit=("Profit", "sum")).sort_values("sales")
x = range(len(seg))
w = 0.35
ax.bar([i - w/2 for i in x], seg["sales"].values / 1000, width=w, color=BLUE, label="Sales ($K)")
ax.bar([i + w/2 for i in x], seg["profit"].values / 1000, width=w, color=GREEN, label="Profit ($K)")
ax.set_xticks(list(x))
ax.set_xticklabels(seg.index)
ax.set_title("Sales vs. profit by customer segment ($K)", loc="left", fontsize=10.5, color=INK, pad=8)
ax.legend(frameon=False, fontsize=8.5, loc="upper left")
clean_axis(ax)
ax.set_yticks([])

fig2.tight_layout()
fig2.savefig(CHARTS / "02_discount_segment_detail.png", bbox_inches="tight")
plt.close(fig2)

print(f"Total sales: ${total_sales:,.0f} | Total profit: ${total_profit:,.0f} | Margin: {margin:.1f}%")
print("Charts written to", CHARTS)
