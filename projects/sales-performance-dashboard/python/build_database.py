"""Load the cleaned superstore table into a local SQLite database so the
SQL analysis in ../sql/queries.sql can run against real data."""

import sqlite3
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
df = pd.read_csv(ROOT / "data" / "cleaned" / "superstore_clean.csv")

db_path = ROOT / "data" / "cleaned" / "sales_performance.db"
conn = sqlite3.connect(db_path)
df.to_sql("orders", conn, if_exists="replace", index=False)
conn.close()
print(f"Wrote {len(df)} rows to {db_path}")
