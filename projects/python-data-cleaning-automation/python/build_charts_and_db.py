"""Builds the dashboard chart images and SQLite database from the cleaned
Google Play Store data — separated from cleaning_pipeline.py so the cleaning
logic stays reusable/importable on its own."""

import sqlite3
from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.patches import FancyBboxPatch

ROOT = Path(__file__).resolve().parents[1]
CLEANED = ROOT / "data" / "cleaned"
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


df = pd.read_csv(CLEANED / "googleplaystore_clean.csv")
quality = pd.read_csv(CLEANED / "data_quality_report.csv")

rows_before, rows_after = 10841, len(df)
dupes_dropped = 1181
malformed_fixed = 1
pct_rated = df["Rating"].notna().mean() * 100

# ---------------------------------------------------------------------------
# Chart 1 — data quality dashboard
# ---------------------------------------------------------------------------
fig = plt.figure(figsize=(12, 8), dpi=150)
fig.patch.set_facecolor(SURFACE)
gs = fig.add_gridspec(2, 2, top=0.74, bottom=0.08, height_ratios=[1, 1], hspace=0.6, wspace=0.32)

fig.suptitle("Data Cleaning Pipeline — Quality Report", x=0.045, y=0.975,
             ha="left", fontsize=15, fontweight="bold", color=INK)
fig.text(0.045, 0.935, "Personal Data Analytics Project · Google Play Store Apps dataset",
          fontsize=9.5, color=MUTED)

kpi_values = [
    ("Rows In", f"{rows_before:,}"),
    ("Rows Out", f"{rows_after:,}"),
    ("Duplicates Removed", f"{dupes_dropped:,}"),
    ("Malformed Rows Fixed", f"{malformed_fixed}"),
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
key_cols = ["Rating", "SizeMB", "Genres", "Current Ver", "Android Ver"]
before_vals = quality.set_index("column").loc[key_cols, "missing_before"]
after_vals = quality.set_index("column").loc[key_cols, "missing_after"]
x = range(len(key_cols))
w = 0.35
ax1.bar([i - w/2 for i in x], before_vals.values, width=w, color=RED, label="Before")
ax1.bar([i + w/2 for i in x], after_vals.values, width=w, color=GREEN, label="After")
ax1.set_xticks(list(x))
ax1.set_xticklabels(key_cols, fontsize=8, rotation=20)
ax1.set_title("Missing values before vs. after cleaning", loc="left", fontsize=10.5, color=INK, pad=8)
ax1.legend(frameon=False, fontsize=8.5)
clean_axis(ax1)

ax2 = fig.add_subplot(gs[0, 1])
top_cats = df["Category"].value_counts().head(8).sort_values()
bars = ax2.barh(top_cats.index, top_cats.values, color=BLUE, height=0.55)
ax2.set_title("Top 8 categories by app count", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars, top_cats.values):
    ax2.text(bar.get_width() + 8, bar.get_y() + bar.get_height() / 2, str(v), va="center", fontsize=8, color=SECONDARY)
clean_axis(ax2)
ax2.set_xticks([])
ax2.tick_params(axis="y", labelsize=7.5)

ax3 = fig.add_subplot(gs[1, 0])
ax3.hist(df["Rating"].dropna(), bins=20, color=CATEGORICAL[1], edgecolor="white", linewidth=0.5)
ax3.set_title(f"Rating distribution ({pct_rated:.0f}% of apps rated)", loc="left", fontsize=10.5, color=INK, pad=8)
clean_axis(ax3)
ax3.set_yticks([])

ax4 = fig.add_subplot(gs[1, 1])
type_counts = df["Type"].value_counts()
bars = ax4.bar(type_counts.index, type_counts.values, color=[BLUE, CATEGORICAL[3]], width=0.5)
ax4.set_title("Free vs. paid apps", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars, type_counts.values):
    ax4.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 100, f"{v:,}", ha="center", fontsize=9, color=SECONDARY)
clean_axis(ax4)
ax4.set_yticks([])

fig.savefig(CHARTS / "01_dashboard_overview.png", bbox_inches="tight")
plt.close(fig)

# ---------------------------------------------------------------------------
# Chart 2 — installs vs rating detail
# ---------------------------------------------------------------------------
fig2, axes = plt.subplots(1, 2, figsize=(12, 5), dpi=150)
fig2.patch.set_facecolor(SURFACE)
fig2.suptitle("Installs, Ratings and App Size", x=0.045, y=1.03, ha="left",
              fontsize=13.5, fontweight="bold", color=INK)

ax = axes[0]
install_bins = [0, 1e4, 1e5, 1e6, 1e7, 1e8, 1.1e9]
install_labels = ["<10K", "10K-100K", "100K-1M", "1M-10M", "10M-100M", "100M+"]
df["InstallBand"] = pd.cut(df["Installs"], bins=install_bins, labels=install_labels)
avg_rating_by_installs = df.groupby("InstallBand", observed=True)["Rating"].mean()
bars = ax.bar(avg_rating_by_installs.index.astype(str), avg_rating_by_installs.values, color=GREEN, width=0.55)
ax.set_title("Avg. rating by install volume", loc="left", fontsize=10.5, color=INK, pad=8)
for bar, v in zip(bars, avg_rating_by_installs.values):
    ax.text(bar.get_x() + bar.get_width() / 2, v + 0.05, f"{v:.2f}", ha="center", fontsize=8.5, color=SECONDARY)
clean_axis(ax)
ax.set_ylim(0, 5.3)
ax.tick_params(axis="x", labelsize=7.5, rotation=25)

ax = axes[1]
size_data = df.dropna(subset=["SizeMB"])
ax.scatter(size_data["SizeMB"], size_data["Rating"], s=8, alpha=0.25, color=BLUE, edgecolors="none")
ax.set_title("App size vs. rating", loc="left", fontsize=10.5, color=INK, pad=8)
ax.set_xlabel("Size (MB)", fontsize=8.5)
ax.set_ylabel("Rating", fontsize=8.5)
clean_axis(ax)
ax.grid(axis="both", visible=True)

fig2.tight_layout()
fig2.savefig(CHARTS / "02_installs_size_detail.png", bbox_inches="tight")
plt.close(fig2)

# ---------------------------------------------------------------------------
# SQLite database for the SQL layer
# ---------------------------------------------------------------------------
db_path = CLEANED / "playstore_apps.db"
conn = sqlite3.connect(db_path)
df.drop(columns=["InstallBand"], errors="ignore").to_sql("apps", conn, if_exists="replace", index=False)
conn.close()

print(f"Charts written to {CHARTS}")
print(f"Database written to {db_path} ({len(df)} rows)")
