"""Download the raw UCI Online Retail dataset. Not committed to the repo
(46MB) — run this once before clean_and_analyze.py."""

import urllib.request
from pathlib import Path

URL = "https://raw.githubusercontent.com/sheezanazeer98/Online-Retail-SQL/main/Online%20Retail.csv"
ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "data" / "raw" / "online_retail_raw.xlsx"

DEST.parent.mkdir(parents=True, exist_ok=True)
print(f"Downloading {URL} -> {DEST}")
urllib.request.urlretrieve(URL, DEST)
print("Done. (File is actually an .xlsx despite the .csv source name — read with pd.read_excel.)")
