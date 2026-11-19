import json
import os
import glob
import shutil

# 1. Promote haier-165l-angle-60.jpg to haier-165l-interior.jpg
src_haier_interior = "public/images/products/haier-165l-angle-60.jpg"
dst_haier_interior = "public/images/products/haier-165l-interior.jpg"
if os.path.exists(src_haier_interior):
    shutil.copyfile(src_haier_interior, dst_haier_interior)
    print("Created haier-165l-interior.jpg")

# Clean up temp haier angle files
for f in glob.glob("public/images/products/haier-165l-angle-*.jpg"):
    try:
        os.remove(f)
    except Exception:
        pass

# 2. Update stored-products.json
STORED_PATH = "src/data/stored-products.json"
INITIAL_TS_PATH = "src/data/initial-products.ts"

with open(STORED_PATH, "r", encoding="utf-8") as f:
    products = json.load(f)

for p in products:
    pid = p.get("id")
    # Clean out AI images: categories and showroom interior
    cleaned_gallery = [
        img for img in p.get("gallery", [])
        if not img.startswith("/images/categories/") and not img.startswith("/images/showroom/")
    ]
    
    # Ensure primary imageUrl is in gallery
    img_url = p.get("imageUrl")
    if img_url and img_url not in cleaned_gallery:
        cleaned_gallery.insert(0, img_url)

    # Specific authentic secondary angles
    if pid == "haier-9kg-semi-automatic-htw90-196bbk":
        cleaned_gallery = [
            "/images/products/haier-9kg-semi-automatic-washing-machine.jpg",
            "/images/products/haier-9kg-htw90-angle.jpg",
            "/images/products/haier-9kg-htw90-control.png"
        ]
    elif pid == "lg-8kg-5-star-semi-automatic-p8015sgaz":
        cleaned_gallery = [
            "/images/products/lg-8kg-semi-automatic.jpg",
            "/images/products/lg-8kg-p8015sgaz-angle.jpg"
        ]
    elif pid == "haier-165l-1-star-direct-cool-hrd-1851smsa-p":
        cleaned_gallery = [
            "/images/products/haier-165l-single-door.jpg",
            "/images/products/haier-165l-interior.jpg"
        ]

    p["gallery"] = cleaned_gallery
    p["updatedAt"] = "2026-11-19T13:45:00.000Z"

with open(STORED_PATH, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print("Updated stored-products.json: all AI category and showroom images removed from gallery.")

ts_content = f"""import {{ Product }} from '@/types';

export const INITIAL_PRODUCTS: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};
"""

with open(INITIAL_TS_PATH, "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Updated initial-products.ts successfully.")
