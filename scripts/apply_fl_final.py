import json
import os

STORED_PATH = "src/data/stored-products.json"
INITIAL_TS_PATH = "src/data/initial-products.ts"

with open(STORED_PATH, "r", encoding="utf-8") as f:
    products = json.load(f)

UPDATES = {
    "lg-fhb1207z2m": {
        "title": "LG 7.0 kg 5 Star AI Direct Drive Front Load Washing Machine (Middle Black, 1200 RPM)",
        "gallery": [
            "/images/products/lg-fhb1207z2m-vs-1.jpg",
            "/images/products/lg-fhb1207z2m-vs-2.jpg",
            "/images/products/lg-fhb1207z2m-vs-3.jpg"
        ]
    },
    "lg-fhb1208z2m": {
        "title": "LG 8.0 kg 5 Star AI Direct Drive Front Load Washing Machine (Middle Black, Steam Wash)",
        "gallery": [
            "/images/products/lg-fhb1208z2m-front.jpg",
            "/images/products/lg-fhb1208z2m-angle.jpg",
            "/images/products/lg-fhb1208z2m-console.jpg"
        ]
    },
    "lg-fhb1209z2m": {
        "title": "LG 9.0 kg 5 Star AI Direct Drive Front Load Washing Machine (Black Steel, Steam Wash)",
        "gallery": [
            "/images/products/lg-fhb1209z9b0-verified-1.jpg",
            "/images/products/lg-fhb1209z9b0-verified-2.jpg",
            "/images/products/lg-fhb1209z9b0-verified-3.jpg"
        ]
    },
    "bosch-7kg-5-star-front-load-waj2416sin": {
        "gallery": [
            "/images/products/bosch-7kg-front-load.jpg",
            "/images/products/bosch-7kg-front-load-detail-1.jpg",
            "/images/products/bosch-7kg-front-load-detail-2.jpg"
        ]
    }
}

for p in products:
    pid = p["id"]
    if pid in UPDATES:
        u = UPDATES[pid]
        p["gallery"] = u["gallery"]
        p["imageUrl"] = u["gallery"][0]
        if "title" in u:
            p["title"] = u["title"]
        print(f"Applied verified photography for {pid}")

with open(STORED_PATH, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

ts_content = f"""import {{ Product }} from '@/types';

export const INITIAL_PRODUCTS: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};
"""

with open(INITIAL_TS_PATH, "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Saved stored-products.json and initial-products.ts.")
