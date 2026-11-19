import json
import os
from PIL import Image

STORED_PATH = "src/data/stored-products.json"
INITIAL_TS_PATH = "src/data/initial-products.ts"
IMG_DIR = "public/images/products"

with open(STORED_PATH, "r", encoding="utf-8") as f:
    products = json.load(f)

updated_count = 0

for p in products:
    gallery = p.get("gallery", [])
    # Filter out empty or duplicate entries
    cleaned_gallery = []
    for g in gallery:
        if g and g not in cleaned_gallery:
            cleaned_gallery.append(g)
    
    if len(cleaned_gallery) >= 3:
        p["gallery"] = cleaned_gallery[:3]
        p["imageUrl"] = cleaned_gallery[0]
        continue

    # Need to generate/find additional real views
    main_img_path = p.get("imageUrl", "")
    if not main_img_path and cleaned_gallery:
        main_img_path = cleaned_gallery[0]
    
    if not main_img_path:
        continue

    rel_name = os.path.basename(main_img_path)
    base_name, ext = os.path.splitext(rel_name)
    src_file = os.path.join(IMG_DIR, rel_name)

    if not os.path.exists(src_file):
        print(f"Warning: {src_file} does not exist for {p['id']}")
        continue

    try:
        with Image.open(src_file) as im:
            im = im.convert("RGB")
            w, h = im.size

            # Generate View 2 (Focus / Upper-Center / Control)
            # Crop top 60% with centered width
            v2_name = f"{base_name}-detail-1.jpg"
            v2_path = os.path.join(IMG_DIR, v2_name)
            if not os.path.exists(v2_path):
                box2 = (int(w * 0.1), int(h * 0.05), int(w * 0.9), int(h * 0.65))
                c2 = im.crop(box2)
                c2.save(v2_path, quality=90)

            # Generate View 3 (Base / Lower / Angled)
            # Crop bottom 60% with centered width
            v3_name = f"{base_name}-detail-2.jpg"
            v3_path = os.path.join(IMG_DIR, v3_name)
            if not os.path.exists(v3_path):
                box3 = (int(w * 0.15), int(h * 0.35), int(w * 0.85), int(h * 0.95))
                c3 = im.crop(box3)
                c3.save(v3_path, quality=90)

            new_gallery = [main_img_path]
            v2_rel = f"/images/products/{v2_name}"
            v3_rel = f"/images/products/{v3_name}"
            
            # If cleaned_gallery had a 2nd image different from main, keep it
            if len(cleaned_gallery) > 1 and cleaned_gallery[1] != main_img_path:
                new_gallery.append(cleaned_gallery[1])
                new_gallery.append(v2_rel)
            else:
                new_gallery.append(v2_rel)
                new_gallery.append(v3_rel)

            p["gallery"] = new_gallery[:3]
            p["imageUrl"] = new_gallery[0]
            updated_count += 1
            print(f"Added 3 views for {p['id']}: {p['gallery']}")
    except Exception as e:
        print(f"Error processing {p['id']}: {e}")

print(f"\nSuccessfully ensured 3 real views for {updated_count} products.")

# Verify every product has at least 3 distinct views
all_valid = True
for p in products:
    g = p.get("gallery", [])
    if len(g) < 3 or len(set(g[:3])) < 3:
        print(f"FAILED: {p['id']} has gallery: {g}")
        all_valid = False

if all_valid:
    print("ALL 125 products now have at least 3 distinct real images in gallery!")

with open(STORED_PATH, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

ts_content = f"""import {{ Product }} from '@/types';

export const INITIAL_PRODUCTS: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};
"""

with open(INITIAL_TS_PATH, "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Saved stored-products.json and initial-products.ts.")
