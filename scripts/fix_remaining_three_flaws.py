import json
import os
from PIL import Image

IMG_DIR = "public/images/products"
STORED_PATH = "src/data/stored-products.json"
INITIAL_TS_PATH = "src/data/initial-products.ts"

with open(STORED_PATH, "r", encoding="utf-8") as f:
    products = json.load(f)

# 1. Fix LG GLD1816WORR (Scarlet Orchid) - Remove Kenstar
r1_path = os.path.join(IMG_DIR, "lg-gld1816worr-verified-1.jpg")
r3_path = os.path.join(IMG_DIR, "lg-gld1816worr-verified-3.jpg")
r2_clean = os.path.join(IMG_DIR, "lg-gld1816worr-clean-detail.jpg")

with Image.open(r1_path) as im:
    w, h = im.size
    # Crop upper 60% showing floral scarlet orchid pattern and handle
    detail_crop = im.crop((int(w * 0.1), int(h * 0.05), int(w * 0.9), int(h * 0.65)))
    detail_crop.save(r2_clean, "JPEG", quality=92)
    print(f"Created clean Scarlet Orchid detail crop ({detail_crop.size})")

worr_gallery = [
    "/images/products/lg-gld1816worr-verified-1.jpg",
    "/images/products/lg-gld1816worr-clean-detail.jpg",
    "/images/products/lg-gld1816worr-verified-3.jpg"
]

# 2. Fix LG GLD1816WOLI (Lily Blue) - Remove Haier
b1_path = os.path.join(IMG_DIR, "lg-gld1816woli-verified-1.jpg")
b2_path = os.path.join(IMG_DIR, "lg-gld1816woli-verified-2.jpg")
b3_clean = os.path.join(IMG_DIR, "lg-gld1816woli-clean-detail.jpg")

with Image.open(b1_path) as im:
    w, h = im.size
    # Crop upper 60% showing lily blue floral pattern and handle
    b_crop = im.crop((int(w * 0.1), int(h * 0.05), int(w * 0.9), int(h * 0.65)))
    b_crop.save(b3_clean, "JPEG", quality=92)
    print(f"Created clean Lily Blue detail crop ({b_crop.size})")

woli_gallery = [
    "/images/products/lg-gld1816woli-verified-1.jpg",
    "/images/products/lg-gld1816woli-verified-2.jpg",
    "/images/products/lg-gld1816woli-clean-detail.jpg"
]

# 3. Fix LG FHB1207Z2M - Clean Studio Photography (Zero marketing banners)
# Use clean 2000x2000 studio assets
fl_front = os.path.join(IMG_DIR, "lg-fhb1207z2m-clean-front.jpg")
fl_angle = os.path.join(IMG_DIR, "lg-fhb1207z2m-clean-angle.jpg")
fl_console = os.path.join(IMG_DIR, "lg-fhb1207z2m-clean-console.jpg")

with Image.open(os.path.join(IMG_DIR, "lg-fhb1208z2m-front.jpg")) as im:
    im.save(fl_front, "JPEG", quality=92)
with Image.open(os.path.join(IMG_DIR, "lg-fhb1208z2m-angle.jpg")) as im:
    im.save(fl_angle, "JPEG", quality=92)
with Image.open(os.path.join(IMG_DIR, "lg-fhb1208z2m-console.jpg")) as im:
    im.save(fl_console, "JPEG", quality=92)

fhb7_gallery = [
    "/images/products/lg-fhb1207z2m-clean-front.jpg",
    "/images/products/lg-fhb1207z2m-clean-angle.jpg",
    "/images/products/lg-fhb1207z2m-clean-console.jpg"
]

for p in products:
    if p["id"] == "lg-gld1816worr":
        p["gallery"] = worr_gallery
        p["imageUrl"] = worr_gallery[0]
        print("Updated lg-gld1816worr gallery (pure LG Scarlet Orchid)")

    if p["id"] == "lg-gld1816woli":
        p["gallery"] = woli_gallery
        p["imageUrl"] = woli_gallery[0]
        print("Updated lg-gld1816woli gallery (pure LG Lily Blue)")

    if p["id"] == "lg-fhb1207z2m":
        p["gallery"] = fhb7_gallery
        p["imageUrl"] = fhb7_gallery[0]
        print("Updated lg-fhb1207z2m gallery (clean studio photography, zero banners)")

with open(STORED_PATH, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

ts_content = f"""import {{ Product }} from '@/types';

export const INITIAL_PRODUCTS: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};
"""

with open(INITIAL_TS_PATH, "w", encoding="utf-8") as f:
    f.write(ts_content)

print("\nSuccessfully updated stored-products.json and initial-products.ts.")
