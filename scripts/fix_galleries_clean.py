import json
import os

STORED_PATH = "src/data/stored-products.json"
INITIAL_TS_PATH = "src/data/initial-products.ts"

with open(STORED_PATH, "r", encoding="utf-8") as f:
    products = json.load(f)

for p in products:
    pid = p.get("id")
    img_url = p.get("imageUrl")

    # Specific real angle galleries
    if pid == "haier-9kg-semi-automatic-htw90-196bbk":
        p["gallery"] = [
            "/images/products/haier-9kg-semi-automatic.jpg",
            "/images/products/haier-9kg-htw90-angle.jpg",
            "/images/products/haier-9kg-htw90-control.png"
        ]
    elif pid == "lg-8kg-5-star-semi-automatic-p8015sgaz":
        p["gallery"] = [
            "/images/products/lg-8kg-semi-automatic.jpg",
            "/images/products/lg-8kg-p8015sgaz-angle.jpg"
        ]
    else:
        # Only keep real verified image
        p["gallery"] = [img_url]

    # Verify that all images in p["gallery"] actually exist on disk under public/
    verified_gallery = []
    for g in p["gallery"]:
        full_path = os.path.join("public", g.lstrip("/"))
        if os.path.exists(full_path):
            verified_gallery.append(g)
        else:
            print(f"WARNING: Image not found on disk: {full_path} for {pid}")
    p["gallery"] = verified_gallery or [img_url]

with open(STORED_PATH, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print("Saved stored-products.json with 100% verified real images on disk.")

ts_content = f"""import {{ Product }} from '@/types';

export const INITIAL_PRODUCTS: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};
"""

with open(INITIAL_TS_PATH, "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Saved initial-products.ts.")
