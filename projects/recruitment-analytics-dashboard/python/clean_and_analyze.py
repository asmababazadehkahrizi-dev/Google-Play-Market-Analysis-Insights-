"""
Recruitment Analytics Dashboard — Personal Data Analytics Project
Cleans the public "Human Resources Data Set" (rhuebner/Huebner & Patalano)
and analyzes hiring source effectiveness, quality of hire, and retention
by recruitment channel.

Dataset: Human Resources Data Set (public, 311 rows)
Source: https://www.kaggle.com/datasets/rhuebner/human-resources-data-set
"""

from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.patches import FancyBboxPatch

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw" / "recruitment_raw.csv"
CLEANED = ROOT / "data" / "cleaned"
CHARTS = ROOT / "charts"
CLEANED.mkdir(parents=True, exist_ok=True)
CHARTS.mkdir(parents=True, exist_ok=True)

INK, SECONDARY, MUTED, GRID = "#0b0b0b", "#52514e", "#898781", "#e1e0d9"
SURFACE, CARD = "#ffffff", "#fafafa"
BLUE, GREEN, RED, VIOLET = "#2a78d6", "#008300", "#e34948", "#4a3aa7"
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
for col in ["Department", "Position", "RecruitmentSource", "PerformanceScore", "Sex", "MaritalDesc"]:
    df[col] = df[col].astype(str).str.strip()

df["DateofHire"] = pd.to_datetime(df["DateofHire"], errors="coerce")
df["HireYear"] = df["DateofHire"].dt.year
df["Terminated"] = df["Termd"].astype(int)
df["FromDiversityJobFair"] = df["FromDiversityJobFairID"].astype(int)

# A handful of rows have a blank/placeholder recruitment source; drop those
# rather than let them skew a small (311-row) dataset
df = df[~df["RecruitmentSource"].isin(["", "nan"])]
df = df.drop_duplicates(subset="EmpID")

df.to_csv(CLEANED / "recruitment_clean.csv", index=False)

# ---------------------------------------------------------------------------
# KPIs & aggregates
# ---------------------------------------------------------------------------
total_hires = len(df)
active = (df["Terminated"] == 0).sum()
term_rate = df["Terminated"].mean() * 100
top_source = df["RecruitmentSource"].value_counts().idxmax()

by_source = (
    df.groupby("RecruitmentSource")
    .agg(hires=("EmpID", "count"), termination_rate=("Terminated", "mean"),
         avg_engagement=("EngagementSurvey", "mean"), avg_satisfaction=("EmpSatisfaction", "mean"))
    .assign(termination_rate=lambda d: (d["termination_rate"] * 100).round(1),
            avg_engagement=lambda d: d["avg_engagement"].round(2))
    .sort_values("hires", ascending=False)
)
by_source.to_csv(CLEANED / "source_effectiveness.csv")

by_year = df.groupby("HireYear")["EmpID"].count().rename("hires").dropna()
by_year.to_csv(CLEANED / "hires_by_year.csv")

diversity = (
    df.groupby("FromDiversityJobFair")
    .agg(hires=("EmpID", "count"), termination_rate=("Terminated", "mean"))
    .assign(termination_rate=lambda d: (d["termination_rate"] * 100).round(1))
)
diversity.to_csv(CLEANED / "diversity_job_fair.csv")

kpis = pd.DataFrame({
    "metric": ["Total Hires", "Active Employees", "Termination Rate (%)", "Top Source"],
    "value": [total_hires, active, round(term_rate, 1), top_source],
})
kpis.to_csv(CLEANED / "kpi_summary.csv", index=False)

# ---------------------------------------------------------------------------
# Chart 1 — main dashboard
# ---------------------------------------------------------------------------
fig = plt.figure(figsize=(12, 8), dpi=150)
fig.patch.set_facecolor(SURFACE)
gs = fig.add_gridspec(2, 2, top=0.74, bottom=0.08, height_ratios=[1, 1], hspace=0.55, wspace=0.32)

fig.suptitle("Recruitment Analytics Dashboard — Source Effectiveness", x=0.045, y=0.975,
             ha="left", fontsize=15, fontweight="bold", color=INK)
fig.text(0.045, 0.935, "Personal Data Analytics Project · Human Resources Data Set (311 employees)",
          fontsize=9.5, color=MUTED)

kpi_values = [
    ("Total Hires", f"{total_hires}"),
    ("Active Employees", f"{active}"),
    ("Termination Rate", f"{term_rate:.1f}%"),
    ("Top Source", top_source),
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
    fsize = 14 if len(str(value)) < 10 else 11
    kpi_ax.text(x + 0.035, 0.22, value, transform=kpi_ax.transAxes, fontsize=fsize, fontweight="bold", color=INK)

top_n = by_source.sort_values("hires", ascending=False).head(7)
ax1 = fig.add_subplot(gs[0, 0])
bars = ax1.barh(top_n.index[::-1], top_n["hires"].values[::-1], color=BLUE, height=0.55)
ax1.set_title("Hires by recruitment source", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars, top_n["hires"].values[::-1]):
    ax1.text(bar.get_width() + 0.4, bar.get_y() + bar.get_height() / 2, str(v), va="center", fontsize=8.5, color=SECONDARY)
clean_axis(ax1)
ax1.set_xticks([])
ax1.tick_params(axis="y", labelsize=8)

term_sorted = top_n.sort_values("termination_rate", ascending=False)
ax2 = fig.add_subplot(gs[0, 1])
bars2 = ax2.barh(term_sorted.index[::-1], term_sorted["termination_rate"].values[::-1], color=RED, height=0.55)
ax2.set_title("Termination rate by source", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars2, term_sorted["termination_rate"].values[::-1]):
    ax2.text(bar.get_width() + 0.6, bar.get_y() + bar.get_height() / 2, f"{v:.0f}%", va="center", fontsize=8.5, color=SECONDARY)
clean_axis(ax2)
ax2.set_xticks([])
ax2.tick_params(axis="y", labelsize=8)

ax3 = fig.add_subplot(gs[1, 0])
by_year_sorted = by_year.sort_index()
ax3.plot(by_year_sorted.index.astype(int).astype(str), by_year_sorted.values, marker="o", color=BLUE, linewidth=2)
ax3.fill_between(range(len(by_year_sorted)), by_year_sorted.values, color=BLUE, alpha=0.08)
ax3.set_title("Hires by year", loc="left", fontsize=10.5, color=INK, pad=8)
clean_axis(ax3)
ax3.tick_params(axis="x", labelsize=8, rotation=45)

ax4 = fig.add_subplot(gs[1, 1])
eng_sorted = top_n.sort_values("avg_engagement", ascending=False)
bars4 = ax4.barh(eng_sorted.index[::-1], eng_sorted["avg_engagement"].values[::-1], color=GREEN, height=0.55)
ax4.set_title("Avg. engagement score by source", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars4, eng_sorted["avg_engagement"].values[::-1]):
    ax4.text(bar.get_width() + 0.05, bar.get_y() + bar.get_height() / 2, f"{v:.1f}", va="center", fontsize=8.5, color=SECONDARY)
clean_axis(ax4)
ax4.set_xticks([])
ax4.tick_params(axis="y", labelsize=8)
ax4.set_xlim(0, 5.5)

fig.savefig(CHARTS / "01_dashboard_overview.png", bbox_inches="tight")
plt.close(fig)

# ---------------------------------------------------------------------------
# Chart 2 — diversity job fair + department mix detail
# ---------------------------------------------------------------------------
fig2, axes = plt.subplots(1, 2, figsize=(12, 5), dpi=150)
fig2.patch.set_facecolor(SURFACE)
fig2.suptitle("Diversity Sourcing and Department Mix", x=0.045, y=1.03, ha="left",
              fontsize=13.5, fontweight="bold", color=INK)

ax = axes[0]
labels = ["Standard sourcing", "Diversity job fair"]
vals = [diversity.loc[0, "termination_rate"], diversity.loc[1, "termination_rate"]] if 1 in diversity.index else [diversity.loc[0, "termination_rate"], 0]
counts = [diversity.loc[0, "hires"], diversity.loc[1, "hires"]] if 1 in diversity.index else [diversity.loc[0, "hires"], 0]
bars = ax.bar(labels, vals, color=[BLUE, VIOLET], width=0.5)
for bar, v, c in zip(bars, vals, counts):
    ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.8, f"{v:.0f}%\n(n={c})",
            ha="center", fontsize=9, color=SECONDARY)
ax.set_title("Termination rate: diversity job fair vs. standard sourcing", loc="left", fontsize=10, color=INK, pad=8)
clean_axis(ax)
ax.set_yticks([])
ax.set_ylim(0, max(vals) * 1.6 if max(vals) > 0 else 10)

ax = axes[1]
dept_counts = df["Department"].value_counts().sort_values(ascending=True)
bars = ax.barh(dept_counts.index, dept_counts.values, color=CATEGORICAL[1], height=0.55)
for bar, v in zip(bars, dept_counts.values):
    ax.text(bar.get_width() + 1, bar.get_y() + bar.get_height() / 2, str(v), va="center", fontsize=8.5, color=SECONDARY)
ax.set_title("Headcount by department", loc="left", fontsize=10, color=INK, pad=8)
clean_axis(ax)
ax.set_xticks([])
ax.tick_params(axis="y", labelsize=8)

fig2.tight_layout()
fig2.savefig(CHARTS / "02_diversity_department_detail.png", bbox_inches="tight")
plt.close(fig2)

print("Total hires:", total_hires, "| Termination rate: %.1f%%" % term_rate, "| Top source:", top_source)
print("Charts written to", CHARTS)
