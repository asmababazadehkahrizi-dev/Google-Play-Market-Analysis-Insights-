"""
HR Analytics Dashboard — Personal Data Analytics Project
Cleans the IBM HR Analytics Employee Attrition & Performance dataset,
computes attrition KPIs, and exports the dashboard chart images used
in the portfolio and the cleaned tables used by the SQL analysis.

Dataset: IBM HR Analytics Employee Attrition & Performance (public, 1470 rows)
Source: https://github.com/IBM/employee-attrition-aif360
"""

from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.patches import FancyBboxPatch

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw" / "employee_attrition_raw.csv"
CLEANED = ROOT / "data" / "cleaned"
CHARTS = ROOT / "charts"
CLEANED.mkdir(parents=True, exist_ok=True)
CHARTS.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# Shared chart style — validated CVD-safe palette (see /projects/README.md)
# ---------------------------------------------------------------------------
INK = "#0b0b0b"
SECONDARY = "#52514e"
MUTED = "#898781"
GRID = "#e1e0d9"
SURFACE = "#ffffff"
CARD = "#fafafa"
BLUE = "#2a78d6"
GREEN = "#008300"
RED = "#e34948"
CATEGORICAL = ["#2a78d6", "#008300", "#e87ba4", "#eda100", "#1baf7a", "#eb6834", "#4a3aa7"]

plt.rcParams.update(
    {
        "font.family": "DejaVu Sans",
        "text.color": INK,
        "axes.edgecolor": GRID,
        "axes.labelcolor": SECONDARY,
        "xtick.color": MUTED,
        "ytick.color": MUTED,
        "axes.grid": True,
        "grid.color": GRID,
        "grid.linewidth": 0.8,
        "axes.axisbelow": True,
        "figure.facecolor": SURFACE,
        "savefig.facecolor": SURFACE,
    }
)


def clean_axis(ax):
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_visible(False)
    ax.spines["bottom"].set_color(GRID)
    ax.tick_params(length=0)
    ax.grid(axis="x", visible=False)


# ---------------------------------------------------------------------------
# Load & clean
# ---------------------------------------------------------------------------
df = pd.read_csv(RAW)

# Drop constant / non-informative columns typical of this dataset
constant_cols = [c for c in ["EmployeeCount", "Over18", "StandardHours"] if c in df.columns]
df = df.drop(columns=constant_cols)
df = df.drop_duplicates()
df["Attrition"] = df["Attrition"].map({"Yes": 1, "No": 0}).astype(int)

tenure_bins = [-1, 2, 5, 10, 20, 100]
tenure_labels = ["0-2 yrs", "3-5 yrs", "6-10 yrs", "11-20 yrs", "20+ yrs"]
df["TenureBand"] = pd.cut(df["YearsAtCompany"], bins=tenure_bins, labels=tenure_labels)

df.to_csv(CLEANED / "employee_attrition_clean.csv", index=False)

# ---------------------------------------------------------------------------
# KPIs
# ---------------------------------------------------------------------------
headcount = len(df)
attrition_rate = df["Attrition"].mean() * 100
avg_tenure = df["YearsAtCompany"].mean()
avg_income = df["MonthlyIncome"].mean()
overtime_attrition = df.groupby("OverTime")["Attrition"].mean() * 100

kpis = pd.DataFrame(
    {
        "metric": ["Headcount", "Attrition Rate (%)", "Avg Tenure (yrs)", "Avg Monthly Income ($)"],
        "value": [headcount, round(attrition_rate, 1), round(avg_tenure, 1), round(avg_income, 0)],
    }
)
kpis.to_csv(CLEANED / "kpi_summary.csv", index=False)

dept_attrition = (
    df.groupby("Department")["Attrition"].mean().mul(100).round(1).sort_values(ascending=False)
)
role_attrition = (
    df.groupby("JobRole")["Attrition"].mean().mul(100).round(1).sort_values(ascending=False)
)
tenure_attrition = df.groupby("TenureBand", observed=True)["Attrition"].mean().mul(100).round(1)

dept_attrition.to_csv(CLEANED / "attrition_by_department.csv")
role_attrition.to_csv(CLEANED / "attrition_by_role.csv")
tenure_attrition.to_csv(CLEANED / "attrition_by_tenure.csv")

# ---------------------------------------------------------------------------
# Chart 1 — main dashboard (KPI strip + 3 panels)
# ---------------------------------------------------------------------------
fig = plt.figure(figsize=(12, 8), dpi=150)
fig.patch.set_facecolor(SURFACE)
gs = fig.add_gridspec(3, 3, top=0.74, bottom=0.06, height_ratios=[0.6, 1.4, 1.4], hspace=0.7, wspace=0.4)

fig.suptitle("HR Analytics Dashboard — Employee Attrition Overview", x=0.045, y=0.975,
             ha="left", fontsize=15, fontweight="bold", color=INK)
fig.text(0.045, 0.935, "Personal Data Analytics Project · IBM HR Analytics dataset (1,470 employees)",
          fontsize=9.5, color=MUTED)

kpi_values = [
    ("Headcount", f"{headcount:,}"),
    ("Attrition Rate", f"{attrition_rate:.1f}%"),
    ("Avg. Tenure", f"{avg_tenure:.1f} yrs"),
    ("Avg. Monthly Income", f"${avg_income:,.0f}"),
]

# KPI row drawn manually across full width for clean alignment
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

ax1 = fig.add_subplot(gs[1, :])
bars = ax1.barh(dept_attrition.index[::-1], dept_attrition.values[::-1], color=BLUE, height=0.5)
ax1.set_title("Attrition rate by department", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars, dept_attrition.values[::-1]):
    ax1.text(bar.get_width() + 0.4, bar.get_y() + bar.get_height() / 2, f"{v:.1f}%",
              va="center", fontsize=9, color=SECONDARY)
clean_axis(ax1)
ax1.set_xlim(0, max(dept_attrition.values) * 1.25)
ax1.set_xticks([])

ax2 = fig.add_subplot(gs[2, 0:2])
top_roles = role_attrition.head(6)[::-1]
bars2 = ax2.barh(top_roles.index, top_roles.values, color=CATEGORICAL[1], height=0.55)
ax2.set_title("Highest-attrition job roles", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars2, top_roles.values):
    ax2.text(bar.get_width() + 0.5, bar.get_y() + bar.get_height() / 2, f"{v:.1f}%",
              va="center", fontsize=8.5, color=SECONDARY)
clean_axis(ax2)
ax2.set_xticks([])
ax2.tick_params(axis="y", labelsize=8.5)

ax3 = fig.add_subplot(gs[2, 2])
ot_vals = overtime_attrition.reindex(["No", "Yes"])
bars3 = ax3.bar(ot_vals.index, ot_vals.values, color=[BLUE, RED], width=0.5)
ax3.set_title("Attrition by overtime", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars3, ot_vals.values):
    ax3.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.8, f"{v:.1f}%",
              ha="center", fontsize=9, color=SECONDARY)
clean_axis(ax3)
ax3.set_yticks([])
ax3.set_ylim(0, max(ot_vals.values) * 1.35)

fig.savefig(CHARTS / "01_dashboard_overview.png", bbox_inches="tight")
plt.close(fig)

# ---------------------------------------------------------------------------
# Chart 2 — tenure & income detail
# ---------------------------------------------------------------------------
fig2, axes = plt.subplots(1, 2, figsize=(12, 5), dpi=150)
fig2.patch.set_facecolor(SURFACE)
fig2.suptitle("Attrition by Tenure and Income", x=0.045, y=1.02, ha="left",
              fontsize=13.5, fontweight="bold", color=INK)

ax = axes[0]
tb = tenure_attrition.reindex(tenure_labels)
ax.plot(tb.index, tb.values, marker="o", color=BLUE, linewidth=2, markersize=6)
ax.fill_between(range(len(tb)), tb.values, color=BLUE, alpha=0.08)
for i, v in enumerate(tb.values):
    ax.text(i, v + 0.8, f"{v:.1f}%", ha="center", fontsize=8.5, color=SECONDARY)
ax.set_title("Attrition rate by tenure band", loc="left", fontsize=10.5, color=INK, pad=8)
clean_axis(ax)
ax.set_ylim(0, max(tb.values) * 1.3)

ax = axes[1]
stayed = df.loc[df["Attrition"] == 0, "MonthlyIncome"]
left = df.loc[df["Attrition"] == 1, "MonthlyIncome"]
bp = ax.boxplot([stayed, left], tick_labels=["Stayed", "Left"], patch_artist=True, widths=0.45,
                medianprops={"color": INK}, showfliers=False)
for patch, color in zip(bp["boxes"], [BLUE, RED]):
    patch.set_facecolor(color)
    patch.set_alpha(0.25)
    patch.set_edgecolor(color)
ax.set_title("Monthly income distribution", loc="left", fontsize=10.5, color=INK, pad=8)
clean_axis(ax)

fig2.tight_layout()
fig2.savefig(CHARTS / "02_tenure_income_detail.png", bbox_inches="tight")
plt.close(fig2)

print("Cleaned rows:", len(df))
print("Attrition rate: %.2f%%" % attrition_rate)
print("Charts written to", CHARTS)
