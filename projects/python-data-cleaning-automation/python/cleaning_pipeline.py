"""
Reusable data-cleaning pipeline — Personal Data Analytics Project.

Built against the public Google Play Store Apps dataset, but the functions
here (numeric-from-text parsing, malformed-row detection, duplicate
resolution, before/after quality reporting) are written to be reusable
against other messy scraped/exported datasets, not one-off for this file.

Dataset: Google Play Store Apps (public, 10,841 rows)
Source: https://www.kaggle.com/datasets/lava18/google-play-store-apps
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from pathlib import Path

import pandas as pd


@dataclass
class QualityReport:
    """Tracks what the pipeline actually changed, row by row and column by
    column, so cleaning is auditable rather than a black box."""

    rows_before: int = 0
    rows_after: int = 0
    malformed_rows_fixed: int = 0
    duplicate_rows_dropped: int = 0
    missing_before: dict = field(default_factory=dict)
    missing_after: dict = field(default_factory=dict)

    def to_frame(self) -> pd.DataFrame:
        cols = sorted(set(self.missing_before) | set(self.missing_after))
        return pd.DataFrame({
            "column": cols,
            "missing_before": [self.missing_before.get(c, 0) for c in cols],
            "missing_after": [self.missing_after.get(c, 0) for c in cols],
        })


def parse_installs(value: str) -> float:
    """'10,000+' -> 10000.0 ; 'Free' / NaN -> NaN"""
    if pd.isna(value):
        return float("nan")
    digits = re.sub(r"[^0-9]", "", str(value))
    return float(digits) if digits else float("nan")


def parse_price(value: str) -> float:
    """'$4.99' -> 4.99 ; '0' -> 0.0"""
    if pd.isna(value):
        return float("nan")
    cleaned = str(value).replace("$", "").strip()
    try:
        return float(cleaned)
    except ValueError:
        return float("nan")


def parse_size_mb(value: str) -> float:
    """'19M' -> 19.0 ; '512k' -> 0.5 ; 'Varies with device' -> NaN"""
    if pd.isna(value):
        return float("nan")
    text = str(value).strip()
    if text.lower() == "varies with device" or text == "":
        return float("nan")
    match = re.match(r"([\d.]+)([kKmM])", text)
    if not match:
        return float("nan")
    number, unit = float(match.group(1)), match.group(2).lower()
    return number / 1024 if unit == "k" else number


def fix_shifted_rows(df: pd.DataFrame) -> tuple[pd.DataFrame, int]:
    """This dataset has a known issue: rows where `Category` is missing from
    the source scrape shift every subsequent column left by one. Detect rows
    where Category isn't a plausible category string (i.e. is numeric) and
    repair the shift by re-inserting a null Category and dropping the
    resulting extra field."""
    fixed = 0
    df = df.copy().astype(object)
    numeric_category_mask = df["Category"].astype(str).str.match(r"^[\d.]+$")
    for idx in df[numeric_category_mask].index:
        row = df.loc[idx].tolist()
        # row is shifted left by one starting at Category (index 1);
        # re-align by inserting a placeholder and dropping the last column
        realigned = [row[0], "UNKNOWN"] + row[1:-1]
        df.loc[idx, df.columns] = realigned
        fixed += 1
    return df, fixed


def clean(raw_path: Path) -> tuple[pd.DataFrame, QualityReport]:
    report = QualityReport()
    df = pd.read_csv(raw_path)
    report.rows_before = len(df)
    report.missing_before = df.isna().sum().to_dict()
    # "Size" is renamed to "SizeMB" during cleaning; carry its *semantic*
    # missing count (blank/NaN + the "Varies with device" placeholder, which
    # is a non-numeric value hiding as if it were data) under the new name
    # so the before/after comparison tracks the same real-world field.
    report.missing_before["SizeMB"] = (
        df["Size"].isna() | (df["Size"].astype(str).str.lower() == "varies with device")
    ).sum()

    df, fixed = fix_shifted_rows(df)
    report.malformed_rows_fixed = fixed

    df["Rating"] = pd.to_numeric(df["Rating"], errors="coerce")
    df["Reviews"] = pd.to_numeric(df["Reviews"], errors="coerce")
    df["Installs"] = df["Installs"].apply(parse_installs)
    df["Price"] = df["Price"].apply(parse_price)
    df["SizeMB"] = df["Size"].apply(parse_size_mb)
    df["LastUpdated"] = pd.to_datetime(df["Last Updated"], errors="coerce")
    df["Category"] = df["Category"].astype(str).str.strip()
    df["Type"] = df["Type"].fillna("Free")

    before_dupes = len(df)
    df = df.sort_values("Reviews", ascending=False).drop_duplicates(subset="App", keep="first")
    report.duplicate_rows_dropped = before_dupes - len(df)

    # Ratings must be within Google Play's valid 1-5 range; anything outside
    # is a scrape error, not a real rating — null it rather than drop the row
    df.loc[(df["Rating"] < 1) | (df["Rating"] > 5), "Rating"] = pd.NA

    df = df.drop(columns=["Size", "Last Updated"])
    df = df.reset_index(drop=True)

    report.rows_after = len(df)
    report.missing_after = df.isna().sum().to_dict()
    return df, report


if __name__ == "__main__":
    ROOT = Path(__file__).resolve().parents[1]
    raw_path = ROOT / "data" / "raw" / "googleplaystore_raw.csv"
    cleaned_df, quality_report = clean(raw_path)

    out_dir = ROOT / "data" / "cleaned"
    out_dir.mkdir(parents=True, exist_ok=True)
    cleaned_df.to_csv(out_dir / "googleplaystore_clean.csv", index=False)
    quality_report.to_frame().to_csv(out_dir / "data_quality_report.csv", index=False)

    print(f"Rows: {quality_report.rows_before} -> {quality_report.rows_after}")
    print(f"Malformed rows repaired: {quality_report.malformed_rows_fixed}")
    print(f"Duplicate app entries dropped: {quality_report.duplicate_rows_dropped}")
