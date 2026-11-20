import json

STORED_PATH = "src/data/stored-products.json"
INITIAL_TS_PATH = "src/data/initial-products.ts"

with open(STORED_PATH, "r", encoding="utf-8") as f:
    products = json.load(f)

for p in products:
    # If title is present, copy to name and remove title
    if "title" in p:
        p["name"] = p["title"]
        del p["title"]

with open(STORED_PATH, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

ts_content = f"""import {{ Product }} from '@/types';

export const INITIAL_PRODUCTS: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};
"""

with open(INITIAL_TS_PATH, "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Fixed title -> name in stored-products.json and initial-products.ts.")
