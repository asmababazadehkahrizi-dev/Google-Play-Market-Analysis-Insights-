"""Load the cleaned recruitment table into a local SQLite database so the
SQL analysis in ../sql/queries.sql can run against real data."""

import sqlite3
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
df = pd.read_csv(ROOT / "data" / "cleaned" / "recruitment_clean.csv")

db_path = ROOT / "data" / "cleaned" / "recruitment_analytics.db"
conn = sqlite3.connect(db_path)
df.to_sql("hires", conn, if_exists="replace", index=False)
conn.close()
print(f"Wrote {len(df)} rows to {db_path}")
