import urllib.request
import os
import shutil
import json
from PIL import Image
import io

IMG_DIR = "public/images/products"
STORED_PATH = "src/data/stored-products.json"
INITIAL_TS_PATH = "src/data/initial-products.ts"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# The verified clean Silver Front Load photos
SILVER_FL_PHOTOS = [
    "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/6/q/i/-original-imahmvtwehvgzzfr.jpeg",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/m/z/c/-original-imahmvtw6z8cytzv.jpeg",
    "https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/j/w/o/-resized-original-imahg3v4bpbbgcj3.jpeg"
]

# Download and re-encode with Pillow to ensure 100% valid JPEG
def download_clean_jpeg(url, target_path):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=12) as resp:
        data = resp.read()
    im = Image.open(io.BytesIO(data)).convert("RGB")
    im.save(target_path, "JPEG", quality=92)
    print(f"Saved pristine JPEG {os.path.basename(target_path)} ({im.size})")

silver_fl_models = [
    "lg-fhb1208z2m",
    "lg-fhb1207z2m",
    "lg-fhb1209z2m"
]

with open(STORED_PATH, "r", encoding="utf-8") as f:
    products = json.load(f)

for pid in silver_fl_models:
    print(f"\nSetting clean Silver Front Load photography for {pid}...")
    gallery = []
    for idx, u in enumerate(SILVER_FL_PHOTOS, 1):
        fname = f"{pid}-silver-{idx}.jpg"
        fpath = os.path.join(IMG_DIR, fname)
        download_clean_jpeg(u, fpath)
        gallery.append(f"/images/products/{fname}")
    
    for p in products:
        if p["id"] == pid:
            p["gallery"] = gallery
            p["imageUrl"] = gallery[0]
            print(f"Updated {pid} gallery to {gallery}")

# Re-encode Bosch verified photos to guarantee 100% valid headers
for idx in [1, 2, 3]:
    b_path = os.path.join(IMG_DIR, f"bosch-7kg-5-star-front-load-waj2416sin-verified-{idx}.jpg")
    if os.path.exists(b_path):
        im = Image.open(b_path).convert("RGB")
        im.save(b_path, "JPEG", quality=92)
        print(f"Re-encoded Bosch verified {idx} ({im.size})")

# Clear Next.js image cache
cache_dir = os.path.join(".next", "cache", "images")
if os.path.exists(cache_dir):
    shutil.rmtree(cache_dir)
    print(f"Cleared Next.js image cache directory: {cache_dir}")

with open(STORED_PATH, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

ts_content = f"""import {{ Product }} from '@/types';

export const INITIAL_PRODUCTS: Product[] = {json.dumps(products, indent=2, ensure_ascii=False)};
"""

with open(INITIAL_TS_PATH, "w", encoding="utf-8") as f:
    f.write(ts_content)

print("\nSaved stored-products.json and initial-products.ts.")
