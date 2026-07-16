"""
Customer Analytics Dashboard — Personal Data Analytics Project
Cleans the UCI Online Retail dataset and builds an RFM (Recency, Frequency,
Monetary) customer segmentation to identify high-value and at-risk customers.

Dataset: Online Retail (UCI Machine Learning Repository, ~541,909 rows)
Source: https://archive.ics.uci.edu/dataset/352/online+retail
Run python/download_data.py first to fetch the raw file (not committed, 23MB).
"""

from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.patches import FancyBboxPatch

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw" / "online_retail_raw.xlsx"
CLEANED = ROOT / "data" / "cleaned"
CHARTS = ROOT / "charts"
CLEANED.mkdir(parents=True, exist_ok=True)
CHARTS.mkdir(parents=True, exist_ok=True)

INK, SECONDARY, MUTED, GRID = "#0b0b0b", "#52514e", "#898781", "#e1e0d9"
SURFACE, CARD = "#ffffff", "#fafafa"
BLUE, GREEN, RED = "#2a78d6", "#008300", "#e34948"
CATEGORICAL = ["#2a78d6", "#008300", "#e87ba4", "#eda100", "#1baf7a", "#eb6834", "#4a3aa7", "#e34948"]

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
if not RAW.exists():
    raise SystemExit("Raw file missing — run `python python/download_data.py` first.")

df = pd.read_excel(RAW)
df.columns = [c.strip() for c in df.columns]

df = df.dropna(subset=["CustomerID"])
df["CustomerID"] = df["CustomerID"].astype(int)
df = df[~df["InvoiceNo"].astype(str).str.startswith("C")]  # exclude cancellations
df = df[(df["Quantity"] > 0) & (df["UnitPrice"] > 0)]
df["InvoiceDate"] = pd.to_datetime(df["InvoiceDate"])
df["TotalPrice"] = df["Quantity"] * df["UnitPrice"]
df = df.drop_duplicates()

df.to_csv(CLEANED / "online_retail_clean.csv", index=False)

# ---------------------------------------------------------------------------
# RFM segmentation
# ---------------------------------------------------------------------------
ref_date = df["InvoiceDate"].max() + pd.Timedelta(days=1)

rfm = df.groupby("CustomerID").agg(
    Recency=("InvoiceDate", lambda x: (ref_date - x.max()).days),
    Frequency=("InvoiceNo", "nunique"),
    Monetary=("TotalPrice", "sum"),
).reset_index()

rfm["R_Score"] = pd.qcut(rfm["Recency"], 4, labels=[4, 3, 2, 1]).astype(int)
rfm["F_Score"] = pd.qcut(rfm["Frequency"].rank(method="first"), 4, labels=[1, 2, 3, 4]).astype(int)
rfm["M_Score"] = pd.qcut(rfm["Monetary"], 4, labels=[1, 2, 3, 4]).astype(int)
rfm["RFM_Sum"] = rfm["R_Score"] + rfm["F_Score"] + rfm["M_Score"]


def segment(row):
    if row["R_Score"] >= 4 and row["F_Score"] >= 4 and row["M_Score"] >= 4:
        return "Champions"
    if row["R_Score"] >= 3 and row["F_Score"] >= 3:
        return "Loyal Customers"
    if row["R_Score"] >= 3 and row["F_Score"] <= 2:
        return "Potential Loyalists"
    if row["R_Score"] <= 2 and row["F_Score"] >= 3:
        return "At Risk"
    if row["R_Score"] <= 2 and row["F_Score"] <= 2 and row["M_Score"] >= 3:
        return "Cant Lose Them"
    if row["R_Score"] <= 2 and row["F_Score"] <= 2:
        return "Hibernating"
    return "Needs Attention"


rfm["Segment"] = rfm.apply(segment, axis=1)
rfm.to_csv(CLEANED / "rfm_segments.csv", index=False)

seg_summary = (
    rfm.groupby("Segment")
    .agg(customers=("CustomerID", "count"), revenue=("Monetary", "sum"), avg_frequency=("Frequency", "mean"))
    .sort_values("revenue", ascending=False)
)
seg_summary.to_csv(CLEANED / "segment_summary.csv")

# Fixed color per segment (entity), reused identically across every chart/panel
SEGMENT_COLOR = {seg: CATEGORICAL[i % len(CATEGORICAL)] for i, seg in enumerate(seg_summary.index)}

by_country = df.groupby("Country")["TotalPrice"].sum().sort_values(ascending=False)
by_country.to_csv(CLEANED / "revenue_by_country.csv")

# ---------------------------------------------------------------------------
# KPIs
# ---------------------------------------------------------------------------
total_revenue = df["TotalPrice"].sum()
total_customers = rfm["CustomerID"].nunique()
avg_order_value = df.groupby("InvoiceNo")["TotalPrice"].sum().mean()
repeat_rate = (rfm["Frequency"] > 1).mean() * 100

kpis = pd.DataFrame({
    "metric": ["Total Revenue (£)", "Total Customers", "Avg Order Value (£)", "Repeat Purchase Rate (%)"],
    "value": [round(total_revenue, 0), total_customers, round(avg_order_value, 2), round(repeat_rate, 1)],
})
kpis.to_csv(CLEANED / "kpi_summary.csv", index=False)

# ---------------------------------------------------------------------------
# Chart 1 — main dashboard
# ---------------------------------------------------------------------------
fig = plt.figure(figsize=(12, 8), dpi=150)
fig.patch.set_facecolor(SURFACE)
gs = fig.add_gridspec(2, 2, top=0.74, bottom=0.08, height_ratios=[1, 1], hspace=0.55, wspace=0.32)

fig.suptitle("Customer Analytics Dashboard — RFM Segmentation", x=0.045, y=0.975,
             ha="left", fontsize=15, fontweight="bold", color=INK)
fig.text(0.045, 0.935, f"Personal Data Analytics Project · UCI Online Retail dataset ({total_customers:,} customers)",
          fontsize=9.5, color=MUTED)

kpi_values = [
    ("Total Revenue", f"£{total_revenue/1e6:.2f}M"),
    ("Total Customers", f"{total_customers:,}"),
    ("Avg Order Value", f"£{avg_order_value:.0f}"),
    ("Repeat Purchase Rate", f"{repeat_rate:.1f}%"),
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

seg_sorted = seg_summary.sort_values("customers")
ax1 = fig.add_subplot(gs[0, 0])
bars = ax1.barh(seg_sorted.index, seg_sorted["customers"].values, color=[SEGMENT_COLOR[s] for s in seg_sorted.index], height=0.55)
ax1.set_title("Customers by segment", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars, seg_sorted["customers"].values):
    ax1.text(bar.get_width() + 15, bar.get_y() + bar.get_height() / 2, str(v), va="center", fontsize=8.5, color=SECONDARY)
clean_axis(ax1)
ax1.set_xticks([])
ax1.tick_params(axis="y", labelsize=8)

rev_sorted = seg_summary.sort_values("revenue")
ax2 = fig.add_subplot(gs[0, 1])
bars2 = ax2.barh(rev_sorted.index, rev_sorted["revenue"].values / 1000, color=[SEGMENT_COLOR[s] for s in rev_sorted.index], height=0.55)
ax2.set_title("Revenue by segment (£K)", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars2, rev_sorted["revenue"].values):
    ax2.text(bar.get_width() + 15, bar.get_y() + bar.get_height() / 2, f"£{v/1000:.0f}K", va="center", fontsize=8.5, color=SECONDARY)
clean_axis(ax2)
ax2.set_xticks([])
ax2.tick_params(axis="y", labelsize=8)

ax3 = fig.add_subplot(gs[1, 0])
top_countries = by_country.head(8).sort_values()
bars3 = ax3.barh(top_countries.index, top_countries.values / 1000, color=GREEN, height=0.55)
ax3.set_title("Top countries by revenue (£K)", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars3, top_countries.values):
    ax3.text(bar.get_width() + 15, bar.get_y() + bar.get_height() / 2, f"£{v/1000:.0f}K", va="center", fontsize=8, color=SECONDARY)
clean_axis(ax3)
ax3.set_xticks([])
ax3.tick_params(axis="y", labelsize=7.5)

ax4 = fig.add_subplot(gs[1, 1])
scatter_sample = rfm.sample(min(2000, len(rfm)), random_state=42)
for seg, group in scatter_sample.groupby("Segment"):
    ax4.scatter(group["Recency"], group["Frequency"], s=14, alpha=0.5, color=SEGMENT_COLOR[seg], label=seg, edgecolors="none")
ax4.set_title("Recency vs. frequency by segment", loc="left", fontsize=10.5, color=INK, pad=8)
ax4.set_xlabel("Recency (days since last order)", fontsize=8.5)
ax4.set_ylabel("Frequency (orders)", fontsize=8.5)
ax4.set_ylim(0, scatter_sample["Frequency"].quantile(0.98))
clean_axis(ax4)
ax4.grid(axis="both", visible=True)
ax4.legend(frameon=False, fontsize=6.5, loc="upper right", ncol=2)

fig.savefig(CHARTS / "01_dashboard_overview.png", bbox_inches="tight")
plt.close(fig)

# ---------------------------------------------------------------------------
# Chart 2 — segment detail
# ---------------------------------------------------------------------------
fig2, axes = plt.subplots(1, 2, figsize=(12, 5), dpi=150)
fig2.patch.set_facecolor(SURFACE)
fig2.suptitle("Segment Value and Purchase Behavior", x=0.045, y=1.03, ha="left",
              fontsize=13.5, fontweight="bold", color=INK)

ax = axes[0]
seg_sorted2 = seg_summary.sort_values("revenue", ascending=False)
avg_value = seg_sorted2["revenue"] / seg_sorted2["customers"]
bars = ax.bar(seg_sorted2.index, avg_value.values, color=[SEGMENT_COLOR[s] for s in seg_sorted2.index], width=0.6)
ax.set_title("Avg revenue per customer by segment (£)", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars, avg_value.values):
    ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 20, f"£{v:.0f}", ha="center", fontsize=8, color=SECONDARY)
clean_axis(ax)
ax.set_yticks([])
ax.tick_params(axis="x", labelsize=7.5, rotation=30)

ax = axes[1]
bars = ax.bar(seg_sorted2.index, seg_sorted2["avg_frequency"].values, color=[SEGMENT_COLOR[s] for s in seg_sorted2.index], width=0.6)
ax.set_title("Avg orders per customer by segment", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars, seg_sorted2["avg_frequency"].values):
    ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.3, f"{v:.1f}", ha="center", fontsize=8, color=SECONDARY)
clean_axis(ax)
ax.set_yticks([])
ax.tick_params(axis="x", labelsize=7.5, rotation=30)

fig2.tight_layout()
fig2.savefig(CHARTS / "02_segment_value_detail.png", bbox_inches="tight")
plt.close(fig2)

print(f"Customers: {total_customers:,} | Revenue: £{total_revenue:,.0f} | Repeat rate: {repeat_rate:.1f}%")
print(seg_summary)
print("Charts written to", CHARTS)
