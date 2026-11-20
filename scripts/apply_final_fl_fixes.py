import urllib.request
from PIL import Image
import io
import os
import json

IMG_DIR = "public/images/products"
STORED_PATH = "src/data/stored-products.json"
INITIAL_TS_PATH = "src/data/initial-products.ts"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# 1. Download official Poorvika FHB1208Z2M images
fhb_urls = [
    ("lg-fhb1208z2m-front.jpg", "https://img-prd-pim.poorvika.com/product/Lg-8-0kg-fully-automatic-front-load-washing-machine-inverter-direct-drive-fhb1208z2m-middle-black-Front-View.webp"),
    ("lg-fhb1208z2m-angle.jpg", "https://img-prd-pim.poorvika.com/product/Lg-8-0kg-fully-automatic-front-load-washing-machine-inverter-direct-drive-fhb1208z2m-middle-black-Front-Right-View.webp"),
    ("lg-fhb1208z2m-console.jpg", "https://img-prd-pim.poorvika.com/product/Lg-8-0kg-fully-automatic-front-load-washing-machine-inverter-direct-drive-fhb1208z2m-middle-black-Front-Top-View.webp")
]

for fname, u in fhb_urls:
    req = urllib.request.Request(u, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=12) as resp:
        im = Image.open(io.BytesIO(resp.read())).convert('RGB')
    target = os.path.join(IMG_DIR, fname)
    im.save(target, "JPEG", quality=92)
    print(f"Downloaded and converted {fname} ({im.size})")

with open(STORED_PATH, "r", encoding="utf-8") as f:
    products = json.load(f)

for p in products:
    if p["id"] == "lg-fhb1208z2m":
        p["gallery"] = [
            "/images/products/lg-fhb1208z2m-front.jpg",
            "/images/products/lg-fhb1208z2m-angle.jpg",
            "/images/products/lg-fhb1208z2m-console.jpg"
        ]
        p["imageUrl"] = p["gallery"][0]
        # Also ensure title accurately reflects Middle Black finish
        p["title"] = "LG 8.0 kg 5 Star AI Direct Drive Front Load Washing Machine (Middle Black, Steam Wash)"
        print("Updated lg-fhb1208z2m with Poorvika official studio photos!")

    if p["id"] == "bosch-7kg-5-star-front-load-waj2416sin":
        p["gallery"] = [
            "/images/products/bosch-7kg-front-load.jpg",
            "/images/products/bosch-7kg-front-load-detail-1.jpg",
            "/images/products/bosch-7kg-front-load-detail-2.jpg"
        ]
        p["imageUrl"] = p["gallery"][0]
        print("Restored bosch-7kg-5-star-front-load-waj2416sin verified pristine gallery!")

with open(STORED_PATH, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

ts_content = f"""import {{ Product }} from '@/types';

export const INITIAL_PRODUCTS: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};
"""

with open(INITIAL_TS_PATH, "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Saved stored-products.json and initial-products.ts.")
