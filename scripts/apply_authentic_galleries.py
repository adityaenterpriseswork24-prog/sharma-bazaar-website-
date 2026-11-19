import json

STORED_PATH = "src/data/stored-products.json"
INITIAL_TS_PATH = "src/data/initial-products.ts"

with open(STORED_PATH, "r", encoding="utf-8") as f:
    products = json.load(f)

GALLERIES = {
    # Front Load
    "front_load": [
        "/images/products/lg-front_load-front.webp",
        "/images/products/lg-front_load-open.webp",
        "/images/products/lg-front_load-angle.webp"
    ],
    # Semi Automatic
    "semi_auto": [
        "/images/products/lg-semi-front.jpg",
        "/images/products/lg-semi-open.jpg",
        "/images/products/lg-8kg-p8015sgaz-angle.jpg"
    ],
    # Top Load
    "top_load": [
        "/images/products/lg-top-front.jpg",
        "/images/products/lg-top-open.jpg",
        "/images/products/lg-top-detail.jpg"
    ],
    # Double Door Frost Free
    "frost_free": [
        "/images/products/lg-double-door-real.jpg",
        "/images/products/lg-ff-top-detail.jpg",
        "/images/products/lg-ff-bottom-detail.jpg"
    ],
    # Single Door Direct Cool
    "direct_cool": [
        "/images/products/lg-dc-front.jpg",
        "/images/products/lg-185l-single-door.jpg",
        "/images/products/lg-dc-detail.jpg"
    ],
    # Microwaves
    "microwave": [
        "/images/products/lg-28l-microwave.jpg",
        "/images/products/lg-mw-panel-detail.jpg",
        "/images/products/lg-mw-door-detail.jpg"
    ]
}

updated = 0
for p in products:
    pid = p.get("id", "")
    m = p.get("modelNumber", "").upper()
    cat = p.get("category", "")
    sub = p.get("subcategory", "").lower()
    
    if p.get("brand") == "LG":
        if "front load" in sub or m.startswith("FH"):
            p["gallery"] = GALLERIES["front_load"]
            p["imageUrl"] = GALLERIES["front_load"][0]
            updated += 1
        elif "semi" in sub or m.startswith("P"):
            p["gallery"] = GALLERIES["semi_auto"]
            p["imageUrl"] = GALLERIES["semi_auto"][0]
            updated += 1
        elif "top load" in sub or m.startswith("T"):
            p["gallery"] = GALLERIES["top_load"]
            p["imageUrl"] = GALLERIES["top_load"][0]
            updated += 1
        elif cat == "refrigerators":
            if "frost free" in sub or "double door" in sub or m.startswith("GLT") or m.startswith("GLB"):
                p["gallery"] = GALLERIES["frost_free"]
                p["imageUrl"] = GALLERIES["frost_free"][0]
                updated += 1
            else:
                p["gallery"] = GALLERIES["direct_cool"]
                p["imageUrl"] = GALLERIES["direct_cool"][0]
                updated += 1
        elif cat == "microwaves" or m.startswith("M"):
            p["gallery"] = GALLERIES["microwave"]
            p["imageUrl"] = GALLERIES["microwave"][0]
            updated += 1

print(f"Updated {updated} LG products with authentic 3-view galleries.")

with open(STORED_PATH, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

ts_content = f"""import {{ Product }} from '@/types';

export const INITIAL_PRODUCTS: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};
"""

with open(INITIAL_TS_PATH, "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Saved stored-products.json and initial-products.ts.")
