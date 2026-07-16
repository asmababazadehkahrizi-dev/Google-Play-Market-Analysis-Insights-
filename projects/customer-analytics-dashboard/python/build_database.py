"""Load the cleaned transaction and RFM tables into a local SQLite database
so the SQL analysis in ../sql/queries.sql can run against real data."""

import sqlite3
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
transactions = pd.read_csv(ROOT / "data" / "cleaned" / "online_retail_clean.csv")
rfm = pd.read_csv(ROOT / "data" / "cleaned" / "rfm_segments.csv")

db_path = ROOT / "data" / "cleaned" / "customer_analytics.db"
conn = sqlite3.connect(db_path)
transactions.to_sql("transactions", conn, if_exists="replace", index=False)
rfm.to_sql("customer_rfm", conn, if_exists="replace", index=False)
conn.close()
print(f"Wrote {len(transactions)} transaction rows and {len(rfm)} customers to {db_path}")
